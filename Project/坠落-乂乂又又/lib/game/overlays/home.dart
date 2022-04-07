import 'package:fall_down/about/about_page.dart';
import 'package:flutter/material.dart';

import '../my_game.dart';

class Home extends StatefulWidget {
  final MyGame game;
  const Home(this.game, {Key key}) : super(key: key);
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: null,
          child: SizedBox(
              width: widget.game.screenSize.width,
              height: widget.game.screenSize.height,
              child: Column(
                children: <Widget>[
                  const Expanded(flex: 2, child: SizedBox()),
                  const Text(
                    '坠 落',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 64,
                        fontWeight: FontWeight.bold),
                  ),
                  const Expanded(flex: 1, child: SizedBox()),
                  GestureDetector(
                    onTap: widget.game.newGame,
                    child: const Text(
                      '开始游戏',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  const Expanded(flex: 1, child: SizedBox()),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      IconButton(
                        iconSize: 48,
                        icon: const Icon(
                          Icons.info,
                          color: Colors.white,
                          size: 48,
                        ),
                        onPressed: () async {
                          //关于
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const AboutPage()),
                          );
                        },
                      ),
                      IconButton(
                        iconSize: 48,
                        icon: const Icon(
                          Icons.settings,
                          color: Colors.white,
                          size: 48,
                        ),
                        onPressed: widget.game.setting,
                      )
                    ],
                  ),
                  const Expanded(flex: 1, child: SizedBox()),
                ],
              )),
        ));
  }
}
