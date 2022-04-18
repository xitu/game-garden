
import 'dart:math';
import 'dart:ui';

import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flame/timer.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stick_game/bullet.dart';
import 'package:flutter_stick_game/target.dart';
import 'package:flutter_stick_game/text.dart';

class StickGame extends FlameGame with HasDraggables, HasTappables{


  late Timer timer;
  List<BulletComponent> bullets = [];

  final Paint paint = Paint()..color = const Color.fromARGB(255, 35, 36, 38);
  late TargetComponent target;

  bool isRunning = false;
  double seconds = 0;

  late TextComponent score;
  late TextComponent restartText;

  final Path canvasPath = Path();

  final Random random = Random();

  final Vector2 scorePosition = Vector2(40, 40);

  bool isDrag = false;

  @override
  Future<void>? onLoad() async{
    target = TargetComponent(position: Vector2(canvasSize.x/2, canvasSize.y/2));
    score = TextComponent(position: scorePosition.clone(), text: "0", textSize: 30);
    restartText = TextComponent(position: Vector2(canvasSize.x/2, canvasSize.y/2), text: "START", textSize: 50);

    canvasPath.addRect(Rect.fromLTWH(0, 0, canvasSize.x, canvasSize.y));

    timer = Timer(0.1, onTick: () {
      createBullet();
    }, repeat: true);

    return super.onLoad();
  }

  void createBullet() {
    bool isHorizontal = random.nextBool();
    var radius = random.nextInt(10) + 5;
    int x = isHorizontal ? random.nextInt(canvasSize.x.toInt()) : random.nextBool() ? radius : canvasSize.x.toInt() - radius;
    int y = isHorizontal ? random.nextBool() ? radius : canvasSize.y.toInt() - radius : random.nextInt(canvasSize.y.toInt());
    var position = Vector2(x.toDouble(), y.toDouble());
    var angle = atan2(y - target.position.y, x - target.position.x);
    var speed = seconds/10 + 5;
    bullets.add(BulletComponent(position: position, angle: angle, radius: radius.toDouble(), speed: speed));
  }

  void stop(){
    isRunning = false;
    restartText.text = "RESTART";
    score.position.setValues(restartText.position.x, restartText.position.y - 80);
    score.text = "${seconds.toInt()}s";
    score.textSize = 40;
  }

  void restart(){
    isRunning = true;
    bullets.clear();
    target.resetPosition();
    score.position.setValues(scorePosition.x, scorePosition.y);
    score.textSize = 30;
    seconds = 0;
  }

  @override
  void render(Canvas canvas){
    super.render(canvas);

    canvas.drawPath(canvasPath, paint);

    for (var bullet in bullets) {
      bullet.render(canvas);
    }

    target.render(canvas);

    score.render(canvas);
    if(!isRunning){
      restartText.render(canvas);
    }
  }

  @override
  void update(double dt) {
    super.update(dt);
    if(isRunning){
      seconds += dt;
      score.text = "${seconds.toInt()}s";
      timer.update(dt);
      for (var bullet in bullets) {
        if(collisionCheck(bullet)){
          stop();
          return;
        }else{
          bullet.update(dt);
        }
      }
      checkBullets();
    }
  }

  void checkBullets(){
    var removeBullets = <BulletComponent>[];
    for (var bullet in bullets) {
      if(!canvasPath.contains(bullet.position.toOffset())){
        removeBullets.add(bullet);
      }
    }
    bullets.removeWhere((element) => removeBullets.contains(element));
  }

  bool collisionCheck(BulletComponent bullet){
    var tempPath = Path.combine(PathOperation.intersect, target.path, bullet.path);
    return tempPath.getBounds().width > 0;
  }

  @override
  void onDragStart(int pointerId, DragStartInfo info) {
    super.onDragStart(pointerId, info);
    if(target.path.contains(info.eventPosition.game.toOffset())){
      isDrag = true;
    }
  }

  @override
  void onDragUpdate(int pointerId, DragUpdateInfo info) {
    super.onDragUpdate(pointerId, info);
    var eventPosition = info.eventPosition.game;
    if (eventPosition.x < target.radius ||
        eventPosition.x > canvasSize.x - target.radius ||
        eventPosition.y < target.radius ||
        eventPosition.y > canvasSize.y - target.radius) {
      return;
    }

    if(isRunning && isDrag){
      target.onDragUpdate(pointerId, info);
    }
  }

  @override
  void onDragCancel(int pointerId) {
    super.onDragCancel(pointerId);
    isDrag = false;
  }

  @override
  void onDragEnd(int pointerId, DragEndInfo info) {
    super.onDragEnd(pointerId, info);
    isDrag = false;
  }

  @override
  void onTapUp(int pointerId, TapUpInfo info) {
    super.onTapUp(pointerId, info);
    if(!isRunning && restartText.path.contains(info.eventPosition.game.toOffset())){
      restart();
    }
  }

  @override
  void onRemove() {
    isRunning = false;
    timer.stop();
    super.onRemove();
  }
}