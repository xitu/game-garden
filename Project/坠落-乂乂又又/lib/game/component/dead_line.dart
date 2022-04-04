import 'dart:ui';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/sprite.dart';

import '../my_game.dart';

class DeadLine extends SpriteComponent {
  MyGame game;
  Box2DComponent box;
  double positionY = 0;
  Sprite get coinSprite => Sprite('deadLine.png');

  DeadLine(this.game, this.box) {
    width = game.screenSize.width;
    height = game.screenSize.width / 20;
    sprite = coinSprite;
    // anchor = Anchor.center; //中部画图
    // positonY = 0;
  }

  @override
  void render(Canvas canvas) {
    canvas.save();
    canvas.translate(0, positionY);
    prepareCanvas(canvas);
    sprite.render(canvas,
        width: width, height: height, overridePaint: overridePaint);
    canvas.restore();
  }
}
