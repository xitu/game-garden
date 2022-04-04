import 'dart:async';
import 'dart:math';
import 'dart:ui';
import 'package:box2d_flame/box2d.dart';
import 'package:fall_down/game/component/background.dart';
import 'package:fall_down/game/component/ball.dart';
import 'package:fall_down/game/component/dead_line.dart';
import 'package:flame/anchor.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/box2d/box2d_game.dart';
import 'package:flame/components/mixins/tapable.dart';
import 'package:flame/components/text_component.dart';
import 'package:flame/flame.dart';
import 'package:flame/game/game.dart';
import 'package:flame/keyboard.dart';
import 'package:flame/text_config.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sensors/sensors.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supercharged/supercharged.dart';

import 'component/ban.dart';
import 'component/level_up.dart';
import 'component/wall.dart';
import 'overlays/game_over.dart';
import 'overlays/home.dart';
import 'overlays/pause.dart';
import 'overlays/setting.dart';
import 'overlays/view.dart';

enum GameStatus { waiting, playing, pause, gameover }

class MyBox2D extends Box2DComponent {
  MyBox2D()
      : super(
            scale: 100,
            gravity: 0,
            dimensions: Size(
                window.physicalSize.width, window.physicalSize.height * 1000));
  @override
  void initializeWorld() {}
}

class MyGame extends Box2DGame
    with HasTapableComponents, HasWidgetsOverlay, KeyboardEvents {
  Size screenSize;
  double tileSize; //基础尺寸
  List<Ban> bans = [];
  Background bg;

  int boxLength = 15; //一行砖块数-->最终由game决定
  int blankLength = 3; //最大空缺数
  int blankSize = 3; //空缺大小
  int banHeight = 4; //每层砖块高度

  GameStatus gameStatus = GameStatus.waiting;
  View view = View.home;

  int score = 0, coins = 0; //分数
  int bestScore = 0; //最高分数
  int lastLevel = 0; //上一个等级
  bool newRecord = false; //新纪录
  bool paused = false; //暂停游戏
  bool useGravity = false; //重力感应模式
  bool startMoving = false; //开始游戏
  bool catchUp = false; //deadLine接触球开始计时
  double speed = 0.1; //deadline下滑速度
  double topDistance, fallDistance, cameraDistance;
  int totalBansLength = 0; //累计下落障碍物行数
  int screenBansLength = 0; //屏幕容纳障碍物行数
  Color boxColor = Colors.amberAccent;
  List<Color> boxColors = [
    Colors.amberAccent,
    Colors.pink,
    Colors.blueAccent,
    Colors.greenAccent,
    Colors.purpleAccent,
    Colors.amberAccent,
    Colors.deepOrange,
  ];

  Random rnd = Random();
  Function newGame, newHome;
  double sensorX = 0; //x轴传感器状态
  StreamSubscription<dynamic> _stream; //传感器订阅流

  MyGame(Box2DComponent box, {this.newGame, this.newHome}) : super(box);

  Ball ball;
  DeadLine deadLine;
  LevelUp levelUp;
  TextComponent scoreText, coinText, pouseText;

  Future<bool> onWillPop() async {
    if (view == View.home) {
      if (Flame.bgm.isPlaying) Flame.bgm.pause();
      return true;
    }
    if (view == View.setting) {
      setting();
    }
    if (view == View.playing) {
      if (paused) {
        pause();
      } else {
        newHome();
      }
    }
    return false;
  }

  setting() async {
    if (view == View.playing) return;
    if (view == View.setting) {
      view = View.home; //返回首页
      removeWidgetOverlay("setting");
    } else if (view == View.home) {
      view = View.setting; //进入设置页
      addWidgetOverlay("setting", Setting(this)); //添加overlay
    }
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool('useGravity', kIsWeb ? false : useGravity);
  }

  pause() {
    if (view != View.playing) return;
    if (!paused) {
      pauseEngine();
      Flame.bgm.pause();
      addWidgetOverlay("pause", PauseOverlay(this)); //添加overlay
    } else {
      resumeEngine();
      Flame.bgm.resume();
      removeWidgetOverlay("pause");
    }
    paused = !paused;
  }

  speedUp() {
    speed += 0.01;
    lastLevel = score;
    Flame.audio.play('newRecord.mp3');
    if (levelUp == null) {
      levelUp = LevelUp(this, box);
      add(levelUp);
    }
    levelUp.positionY = screenSize.height / 2 - tileSize * banHeight;
    levelUp.sprite = levelUp.levelUpSprite;
    boxColor = boxColors[(score / 20).floor() % boxColors.length];
  }

  newRecordX(bool flag) {
    newRecord = true;
    if (!flag) Flame.audio.play('newRecord.mp3');
    if (levelUp == null) {
      levelUp = LevelUp(this, box);
      add(levelUp);
    }
    levelUp.positionY = screenSize.height / 2 - tileSize * banHeight;
    levelUp.sprite = levelUp.newRecordUpSprite;
  }

  gameOver() async {
    if (gameStatus != GameStatus.gameover) {
      pauseEngine();
      Flame.bgm.pause();
      gameStatus = GameStatus.gameover;
      Flame.audio.play('gameOver.mp3');
      addWidgetOverlay("gameOver", GameOver(this)); //添加overlay
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setInt('bestScore', score > bestScore ? score : bestScore);
    }
  }

  addSensor() {
    speed = 0.06;
    _stream = accelerometerEvents.listen((AccelerometerEvent event) {
      sensorX = event.x;
    });
  }

  initialize() async {
    screenSize = await Flame.util.initialDimensions();
    tileSize = screenSize.width / boxLength;
    resize(screenSize); //初始化画布
    addWidgetOverlay("home", Home(this)); //添加overlay
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bestScore = prefs.getInt('bestScore') ?? 0;
    useGravity = prefs.getBool('useGravity') ?? false;
    if (useGravity && !kIsWeb) addSensor();
  }

  start() async {
    view = View.playing;
    removeWidgetOverlay("home");
    gameStatus = GameStatus.waiting; //开始游戏,等待玩家点击屏幕
    screenSize = await Flame.util.initialDimensions();
    tileSize = screenSize.width / boxLength;
    resize(screenSize); //初始化画布
    createBoundaries(this, box); //创建边界
    bg = Background.level1(this);
    ball = Ball(this, box, Vector2(screenSize.width / 2 - tileSize / 2, 0),
        Size(tileSize, tileSize)); //绑定视图实体

    add(bg);
    bans.clear();
    0
        .rangeTo(screenBansLength - 1)
        .toList()
        .forEach((index) => addBan(tileSize * banHeight * index));
    add(ball);
    deadLine = DeadLine(this, box);
    add(deadLine);

    scoreText = TextComponent('$score',
        config: TextConfig(color: const Color(0xffffffff), fontSize: 16))
      ..anchor = Anchor.topCenter
      ..x = 32.0
      ..y = 32.0;
    coinText = TextComponent('✦ $coins',
        config: TextConfig(color: const Color(0xffffff00), fontSize: 16))
      ..anchor = Anchor.topCenter
      ..x = size.width / 2
      ..y = 32.0;

    pouseText = TextComponent('▐▐',
        config: TextConfig(color: const Color(0xffffffff), fontSize: 14))
      ..anchor = Anchor.topCenter
      ..x = size.width - 32
      ..y = 32.0;

    add(scoreText);
    add(coinText);
    add(pouseText);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bestScore = prefs.getInt('bestScore') ?? 0;
    useGravity = prefs.getBool('useGravity') ?? false;
    if (useGravity && !kIsWeb) addSensor();
    if (!kIsWeb && !Flame.bgm.isPlaying) Flame.bgm.play('bg.mp3');
  }

  @override
  void update(double t) {
    if (bans.isEmpty) return;
    var oldFallDistance = fallDistance;
    super.update(t); //此处fallDistance被更新
    //清空屏幕之外的
    bans.where((b) => b.positionY < 0).toList().forEach((ban) {
      ban.remove(); //删除物理与视图对象
      bans.remove(ban); //删除暂储对象
    });
    if (bans.isEmpty) return;
    //添加
    double lastPositionY;
    while (bans.length < screenBansLength) {
      lastPositionY ??= bans.last.positionY - topDistance;
      lastPositionY += tileSize * banHeight; //box的下一个位置
      addBan(lastPositionY); //添加一个
    }
    //更新levelUp
    if (levelUp != null) {
      levelUp.positionY -= fallDistance - oldFallDistance;
    }
    //更新deadline
    if (deadLine.positionY > ball.positionY - tileSize) {
      deadLine.positionY = ball.positionY - tileSize + 1;
      if (ball.positionY > tileSize * banHeight) gameOver();
    } else if (startMoving) {
      deadLine.positionY -= fallDistance - oldFallDistance - speed * tileSize;
      if (deadLine.positionY > ball.positionY - tileSize) {
        deadLine.positionY = ball.positionY - tileSize + 1;
      }
      if (deadLine.positionY < 0) deadLine.positionY = 0;
      //更新分数
      if (fallDistance > cameraDistance) {
        score =
            ((fallDistance - topDistance) / (tileSize * banHeight)).floor() + 1;
      } else if (ball.body.viewport.getWorldToScreen(ball.body.center).y -
              topDistance >
          0) {
        score = ((ball.body.viewport.getWorldToScreen(ball.body.center).y -
                        topDistance) /
                    (tileSize * banHeight))
                .floor() +
            1;
      }
    }
    var flag = false;
    //更新速度
    if (score > 0 && score % 20 == 0 && lastLevel != score) {
      speedUp();
      flag = true;
    }
    //新纪录
    if (!newRecord && score == bestScore + 1 && score > 10) newRecordX(flag);
    //更新文字
    scoreText.text = '$score';
    coinText.text = '✦ $coins';
    //重力感应操控方向
    if (useGravity &&
        !kIsWeb &&
        ball.body.viewport.getWorldToScreen(ball.body.center).y > topDistance) {
      startMoving = true; //开始游戏
      sensorX > 0 ? ball.startMoveLeft() : ball.stopMoveLeft();
      sensorX < -0 ? ball.startMoveRight() : ball.stopMoveRight();
    }
  }

  addCoin() {
    coins++;
    Flame.audio.play('coin.mp3');
  }

  addBan(double p) {
    bans.add(Ban(this, box, p)); //此时totalBansLength为index
    totalBansLength++;
    add(bans.last);
  }

  void killAll() {
    final markComponents = [];
    for (var c in box.components) {
      if (c is! Box2DComponent) box.remove(c);
    }
    for (var c in components) {
      if (c is! Box2DComponent) markComponents.add(c);
    }
    for (var c in markComponents) {
      components.remove(c);
    }

    //关闭流
    if (useGravity && !kIsWeb) _stream?.cancel();
  }

  @override
  void resize(Size size) {
    super.resize(size);
    //初始化位置
    screenSize = size;
    tileSize = screenSize.width / boxLength;
    topDistance = screenSize.height / 3;
    fallDistance = screenSize.height / 2; //小球连续下落高度
    cameraDistance = screenSize.height / 2; //在视野中央开始激活相机跟随
    screenBansLength = (screenSize.height / (tileSize * banHeight)).floor();
  }

  @override
  void onKeyEvent(event) {
    if (paused || useGravity) return;
    bool isKeyDown = event is RawKeyDownEvent;
    if (event.data.keyLabel == 'ArrowLeft') {
      isKeyDown ? ball.startMoveLeft() : ball.stopMoveLeft();
    }
    if (event.data.keyLabel == 'ArrowRight') {
      isKeyDown ? ball.startMoveRight() : ball.stopMoveRight();
    }
  }

  @override
  void onTapDown(pointerId, TapDownDetails details) {
    if (paused || useGravity) return;
    var p = pouseText.toRect().center;
    if ((details.globalPosition.dx - p.dx).abs() < 32 &&
        (details.globalPosition.dy - p.dy).abs() < 32) {
      pause();
      return;
    }
    if (details.globalPosition.dx < screenSize.width / 2) {
      ball.startMoveLeft();
    } else {
      ball.startMoveRight();
    }
  }

  @override
  void onTapUp(pointerId, TapUpDetails details) {
    if (paused || useGravity) return;
    if (details.globalPosition.dx < screenSize.width / 2) {
      ball.stopMoveLeft();
    } else {
      ball.stopMoveRight();
    }
  }
}
