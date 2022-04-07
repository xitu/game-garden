import 'dart:ui';

import 'package:flame/components/component.dart';
import 'package:flame/sprite.dart';

import '../my_game.dart';

class Background extends SpriteComponent {

  Background.level1(MyGame game) {
    resize(game.screenSize);
    sprite = Sprite('bg.jpg');
  }

  @override
  void resize(Size size) {
    width = size.width;
    height = size.height;
  }
}
