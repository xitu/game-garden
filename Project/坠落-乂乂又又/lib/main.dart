import 'package:flame/flame.dart';
import 'package:flame_splash_screen/flame_splash_screen.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'game/my_game.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const MaterialApp(
      title: '坠落',
      home: MainPage(),
    ),
  );
  //全屏&竖屏
  if (!kIsWeb) {
    await Flame.util.fullScreen();
    await Flame.util.setOrientation(DeviceOrientation.portraitUp);
  }
}

class MainPage extends StatefulWidget {
  const MainPage({Key key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  MyGame game;
  bool start = false;
  MyBox2D box = MyBox2D();

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero).then((_) async {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const SplashScreenGame()),
      ).then((value) {
        // if (!kIsWeb && !Flame.bgm.isPlaying) Flame.bgm.play('bg.mp3');
      });
      await init();
    });
  }

  init() async {
    game = MyGame(box, newGame: newGame, newHome: newHome);
    await Flame.images.loadAll([
      'ball.png',
      'ban_box.png',
      'ban_edge_left.png',
      'ban_edge_right.png',
      'coin.png',
      'bg.jpg',
      'levelUp.png',
      'newRecord.png',
      'best.png',
      'score.png',
      'pause.png',
      'setting.png',
      'done.png'
    ]); //加载贴图
    if (!kIsWeb) {
      await Flame.bgm.loadAll([
        'bg.mp3',
        'coin.mp3',
        'catchUp.mp3',
        'gameOver.mp3',
        'newRecord.mp3'
      ]);
    } //加载音频
    await game.initialize();
    setState(() {
      start = true;
    });
  }

  newHome() async {
    setState(() {
      start = false;
    });
    game.killAll();
    game.pauseEngine();
    game = MyGame(box, newGame: newGame, newHome: newHome);
    await game.initialize();
    // Flame.bgm.play('bg.mp3');
    setState(() {
      start = true;
    });
  }

  newGame() async {
    setState(() {
      start = false;
    });
    game.killAll();
    game.pauseEngine();
    for (var e in box.components) {
      box.remove(e);
    }
    box = MyBox2D();
    game = MyGame(box, newGame: newGame, newHome: newHome);
    await game.start();
    // if (!Flame.bgm.isPlaying) Flame.bgm.play('bg.mp3');
    setState(() {
      start = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: game?.onWillPop,
        child: Scaffold(
            backgroundColor: const Color(0xff000000),
            body: start ? game.widget : Container()));
  }
}

class SplashScreenGame extends StatefulWidget {
  const SplashScreenGame({Key key}) : super(key: key);

  @override
  _SplashScreenGameState createState() => _SplashScreenGameState();
}

class _SplashScreenGameState extends State<SplashScreenGame> {
  FlameSplashController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlameSplashScreen(
        theme: FlameSplashTheme.dark,
        onFinish: (context) => Navigator.pop(context),
      ),
    );
  }
}
