import 'package:flutter/material.dart';

import '../my_game.dart';

class GameOver extends StatefulWidget {
  final MyGame game;
  const GameOver(this.game, {Key key}) : super(key: key);
  @override
  _GameOverState createState() => _GameOverState();
}

class _GameOverState extends State<GameOver> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black54,
        body: GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: null,
            child: SizedBox(
              width: widget.game.screenSize.width,
              height: widget.game.screenSize.height,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const Expanded(flex: 2, child: SizedBox()),
                  GestureDetector(
                    onTap: widget.game.setting,
                    child: Image.asset(
                      'assets/images/score.png',
                      width: 220,
                      height: 120,
                    ),
                  ),
                  Text(
                    '${widget.game.score}',
                    style: const TextStyle(
                        color: Colors.blueAccent,
                        fontSize: 48,
                        fontWeight: FontWeight.bold),
                  ),
                  Text(
                    '✦ ${widget.game.coins}',
                    style: const TextStyle(
                        color: Colors.yellow,
                        fontSize: 32,
                        fontWeight: FontWeight.bold),
                  ),
                  widget.game.bestScore < 1
                      ? const SizedBox()
                      : GestureDetector(
                          onTap: widget.game.setting,
                          child: Image.asset(
                            'assets/images/best.png',
                            width: 220,
                            height: 80,
                          ),
                        ),
                  widget.game.bestScore < 1
                      ? const SizedBox()
                      : Text(
                          '${widget.game.bestScore}',
                          style: const TextStyle(
                              color: Colors.purpleAccent,
                              fontSize: 48,
                              fontWeight: FontWeight.bold),
                        ),
                  const Expanded(flex: 2, child: SizedBox()),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      IconButton(
                        iconSize: 64,
                        icon: const Icon(
                          Icons.home,
                          color: Colors.white,
                          size: 64,
                        ),
                        onPressed: widget.game.newHome, //返回首页
                      ),
                      IconButton(
                        iconSize: 64,
                        icon: const Icon(
                          Icons.refresh,
                          color: Colors.white,
                          size: 64,
                        ),
                        onPressed: widget.game.newGame,
                      ),
                    ],
                  ),
                  const Expanded(flex: 1, child: SizedBox()),
                ],
              ),
            )));
  }
}
