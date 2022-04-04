import 'dart:ui';

import 'package:box2d_flame/box2d.dart';
import 'package:flame/anchor.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/sprite.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';

import '../my_game.dart';

class Box extends SpriteComponent {
  Size size;
  MyGame game;
  Sprite get centerSprite => Sprite('ban_box.png');
  Sprite get leftSprite => Sprite('ban_edge_left.png');
  Sprite get rightSprite => Sprite('ban_edge_right.png');

  final Box2DComponent box;
  BoxBody body; //绑定的物理实体

  Box.left(this.game, this.box, Vector2 position, this.size) {
    width = size.width / 2;
    height = size.height;
    sprite = leftSprite;
    anchor = Anchor.centerRight; //右部画图
    body = BoxBody.left(
        game, box, position + Vector2(height, height / 2), height / 2); //物理实体
  }
  Box.right(this.game, this.box, Vector2 position, this.size) {
    width = size.width / 2;
    height = size.height;
    sprite = rightSprite;
    anchor = Anchor.centerLeft; //左部画图
    body = BoxBody.right(
        game, box, position + Vector2(0, height / 2), height / 2); //物理实体
  }
  Box.center(this.game, this.box, Vector2 position, this.size) {
    width = size.width;
    height = size.height;
    sprite = centerSprite;
    anchor = Anchor.center; //中部画图
    body = BoxBody.center(
        game, box, position + Vector2(width / 2, height / 2), size); //物理实体
  }

  @override
  Rect toRect() => Rect.fromLTWH(x - anchor.relativePosition.dx * width,
      y - anchor.relativePosition.dy * height, width, height);

  @override
  void render(Canvas canvas) {
    final position = body.viewport.getWorldToScreen(body.center);
    if (kIsWeb) {
      canvas.save();
      body.render(canvas);
      canvas.restore();
    } else {
      canvas.save();
      canvas.translate(
          position.x - (anchor == Anchor.centerRight ? width : 0), position.y);
      prepareCanvas(canvas);
      canvas.drawAtlas(
        sprite.image,
        [
          RSTransform.fromComponents(
            scale: height / sprite.image.height.toDouble(),
            anchorX: 0,
            anchorY: 0,
            rotation: 0,
            translateX: 0,
            translateY: 0,
          )
        ],
        [
          Rect.fromLTWH(0, 0, sprite.image.width.toDouble(),
              sprite.image.height.toDouble())
        ],
        [game.boxColor],
        BlendMode.dstATop,
        null,
        Paint(),
      );
      canvas.restore();
    }
  }
}

class BoxBody extends BodyComponent {
  MyGame game;
  BoxBody(this.game, Box2DComponent box, Vector2 position, size) : super(box) {
    position =
        viewport.getScreenToWorld(Vector2(position.x, position.y)); //转化为物理位置
    _createBox(position, size);
  }

  BoxBody.center(this.game, Box2DComponent box, Vector2 position, Size size)
      : super(box) {
    position = viewport.getScreenToWorld(position); //转化为物理位置
    _createBox(position, size);
  }

  BoxBody.left(this.game, Box2DComponent box, Vector2 position, double size)
      : super(box) {
    position = viewport.getScreenToWorld(position); //转化为物理位置
    _createBox(position, size);
  }

  BoxBody.right(this.game, Box2DComponent box, Vector2 position, double size)
      : super(box) {
    position = viewport.getScreenToWorld(position); //转化为物理位置
    _createBox(position, size);
  }

  void _createBox(Vector2 position, size) {
    Shape shape;
    if (size is Size) {
      shape = PolygonShape()
        ..setAsBoxXY(size.width / 2 / box.viewport.scale,
            size.height / 2 / box.viewport.scale);
    } else {
      shape = CircleShape()..radius = size / box.viewport.scale;
    }

    final fixtureDef = FixtureDef()
      ..shape = shape
      ..density = 1.0
      ..restitution = 0.0
      ..friction = 0.1;

    final bodyDef = BodyDef()
      ..setUserData(this) //检测碰撞
      ..position = position
      ..fixedRotation = true
      ..linearDamping = 5
      ..type = BodyType.STATIC;

    body = world.createBody(bodyDef)..createFixtureFromFixtureDef(fixtureDef);
  }

  @override
  void renderPolygon(Canvas canvas, List<Offset> points) {
    final path = Path()..addPolygon(points, true);
    final Paint paint = Paint()..color = game.boxColor.withOpacity(0.6); 
    canvas.drawPath(path, paint);
  }

  @override
  void renderCircle(Canvas canvas, Offset center, double radius) {
    final Paint paint = Paint()..color = game.boxColor.withOpacity(0.6);
    canvas.drawCircle(center, radius, paint);
  }
}
