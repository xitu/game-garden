import 'dart:ui';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/sprite.dart';

import '../my_game.dart';

class LevelUp extends SpriteComponent {
  MyGame game;
  Box2DComponent box;
  double positionY = 0;
  Sprite get levelUpSprite => Sprite('levelUp.png');
  Sprite get newRecordUpSprite => Sprite('newRecord.png');

  LevelUp(this.game, this.box) {
    width = game.screenSize.width;
    height = game.screenSize.width / 715 * 154;
    sprite = levelUpSprite;
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
