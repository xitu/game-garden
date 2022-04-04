import 'dart:ui';

import 'package:box2d_flame/box2d.dart';
import 'package:flame/anchor.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/sprite.dart';

import '../my_game.dart';

class Coin extends SpriteComponent {
  Size size;
  MyGame game;
  bool killed = false;
  Sprite get coinSprite => Sprite('coin.png');

  final Box2DComponent box;
  CoinBody body; //绑定的物理实体

  Coin(this.game, this.box, Vector2 position, this.size) {
    width = size.width;
    height = size.height;
    sprite = coinSprite;
    anchor = Anchor.center; //中部画图
    body =
        CoinBody(box, position + Vector2(width / 2, height / 2), size); //物理实体
  }

  /// 判断是否可以被移除了
  @override
  bool destroy() {
    return killed;
  }

  @override
  void update(double dt) {
    super.update(dt);
    if (((body.viewport.getWorldToScreen(body.center).x -
                    game.ball.body.viewport
                        .getWorldToScreen(game.ball.body.center)
                        .x)
                .abs() <
            size.width * 1.1) &&
        (body.viewport.getWorldToScreen(body.center).y -
                    game.ball.body.viewport
                        .getWorldToScreen(game.ball.body.center)
                        .y)
                .abs() <
            size.height * 1.1) {
      killed = true;
      game.addCoin();
    }
  }

  @override
  void render(Canvas canvas) {
    final position = body.viewport.getWorldToScreen(body.center);
    // - Vector2(0, game.cameraDistance - game.topDistance);
    // canvas.save();
    // // canvas.translate(size.width / 2, size.height / 2);
    // body.render(canvas);
    // canvas.restore();
    canvas.save();
    canvas.translate(position.x, position.y);
    super.render(canvas);
    canvas.restore();
  }
}

class CoinBody extends BodyComponent {
  CoinBody(Box2DComponent box, Vector2 position, Size size) : super(box) {
    position = viewport.getScreenToWorld(position); //转化为物理位置
    _createCoin(position, size.width / 2);
  }

  void _createCoin(Vector2 position, double radius) {
    CircleShape shape = CircleShape()..radius = radius / box.viewport.scale;

    final fixtureDef = FixtureDef()
      ..shape = shape
      ..density = 0.00001
      ..restitution = 0.0
      ..friction = 0.0;

    final bodyDef = BodyDef()
      ..setUserData(this) //检测碰撞
      ..position = position
      ..fixedRotation = true
      ..type = BodyType.DYNAMIC;

    body = world.createBody(bodyDef)..createFixtureFromFixtureDef(fixtureDef);
  }

  @override
  void renderCircle(Canvas canvas, Offset center, double radius) {
    final Paint paint = Paint()..color = const Color.fromARGB(255, 0, 0, 0);
    canvas.drawCircle(center, radius, paint);
  }
}
