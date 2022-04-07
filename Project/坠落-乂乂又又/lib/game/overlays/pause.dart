import 'package:flutter/material.dart';

import '../my_game.dart';

class PauseOverlay extends StatefulWidget {
  final MyGame game;
  const PauseOverlay(this.game, {Key key}) : super(key: key);
  @override
  _PauseOverlayState createState() => _PauseOverlayState();
}

class _PauseOverlayState extends State<PauseOverlay> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black54,
        body: GestureDetector(
            behavior: HitTestBehavior.translucent,
            onTap: widget.game.pause,
            child: SizedBox(
              width: widget.game.screenSize.width,
              height: widget.game.screenSize.height,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  const Text(
                    '游戏已暂停',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.bold),
                  ),
                  GestureDetector(
                    onTap: widget.game.pause,
                    child: const Text('继续',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  GestureDetector(
                    onTap: widget.game.newHome,
                    child: const Text('回主页',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            )));
  }
}
