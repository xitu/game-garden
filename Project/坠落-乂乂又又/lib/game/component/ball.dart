import 'dart:ui';

import 'package:box2d_flame/box2d.dart';
import 'package:flame/anchor.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/palette.dart';
import 'package:flame/sprite.dart';

import '../my_game.dart';

class Ball extends SpriteComponent {
  Size size;
  MyGame game;
  double positionY = 0;
  bool movingLeft = false, movingRight = false;
  Sprite get idleSprite => Sprite('ball.png');

  final Box2DComponent box;
  BallBody body; //绑定的物理实体

  Ball(this.game, this.box, Vector2 position, this.size) {
    width = size.width * 2;
    height = size.height * 2;
    sprite = idleSprite;
    anchor = Anchor.center; //中部画图
    body = BallBody(
        box, position + Vector2(size.width / 2, size.height / 2), size); //物理实体
    positionY = body.viewport.getWorldToScreen(body.center).y;
  }

  @override
  void render(Canvas canvas) {
    final position = body.viewport.getWorldToScreen(body.center);
    // -Vector2(0, game.cameraDistance - game.topDistance);
    //bodyComponent.center的视图位置
    // 1-1/3-1/2此为调整的视图对象渲染位置，距顶部1/3高度

    canvas.save();
    // canvas.translate(size.width / 2, size.height / 2);
    body.render(canvas);
    canvas.restore();

    canvas.save();
    canvas.translate(position.x, position.y);
    super.render(canvas);
    canvas.restore();
  }

  @override
  void update(double dt) {
    super.update(dt);
    positionY = body.viewport.getWorldToScreen(body.center).y;
    if (positionY > game.cameraDistance) {
      //一定要让物体来到视野中再开始相机跟踪，否则小球位置会出现瞬移
      box.cameraFollow(body, vertical: .0);
      game.fallDistance += positionY - game.cameraDistance;
    }
    var v = body.body.linearVelocity;
    if (movingLeft) {
      body.body.applyLinearImpulse(
          Vector2(
              5 *
                  (5 + v.x) /
                  5 *
                  -body.gravity * //重力加速度
                  body.density * //密度
                  3.14 * //pi
                  (size.width / 2 / box.viewport.scale) *
                  (size.width / 2 / box.viewport.scale) * //r^2
                  body.force, //水平力与重力的比值
              0),
          body.center,
          true);
    }
    if (movingRight) {
      body.body.applyLinearImpulse(
          Vector2(
              5 *
                  (5 - v.x) /
                  5 *
                  body.gravity * //重力加速度
                  body.density * //密度
                  3.14 * //pi
                  (size.width / 2 / box.viewport.scale) *
                  (size.width / 2 / box.viewport.scale) * //r^2
                  body.force, //水平力与重力的比值
              0),
          body.center,
          true); //施加外力 --> body.center物理位置
    }
    //向下的恒定冲量
    body.body.applyLinearImpulse(
        Vector2(
            0,
            -body.gravity * //重力加速度
                body.density * //密度
                3.14 * //pi
                (size.width / 2 / box.viewport.scale) *
                (size.width / 2 / box.viewport.scale) //r^2
            ),
        body.center,
        true); //施加外力 --> body.center物理位置
  }

  void startMoveLeft() {
    game.startMoving = true;
    movingRight = false;
    movingLeft = true;
  }

  void startMoveRight() {
    game.startMoving = true;
    movingLeft = false;
    movingRight = true;
  }

  void stopMoveLeft() {
    movingLeft = false;
  }

  void stopMoveRight() {
    movingRight = false;
  }
}

class BallBody extends BodyComponent {
  double density = 1.0; //密度
  double gravity = 0.3; //重力大小
  double force = 6 / 16; //水平外力与重力的比值
  Paint paint = BasicPalette.white.paint;

  BallBody(Box2DComponent box, Vector2 position, Size size) : super(box) {
    position = viewport.getScreenToWorld(position); //转化为物理位置
    _createBall(position, size.width / 2);
  }

  void _createBall(Vector2 position, double radius) {
    final CircleShape shape = CircleShape();
    shape.radius = radius / box.viewport.scale;

    final fixtureDef = FixtureDef()
      ..shape = shape
      ..density = density
      ..restitution = 0.1
      ..friction = 0.0001;

    final bodyDef = BodyDef()
      ..setUserData(this) //检测碰撞
      ..position = position
      ..fixedRotation = true
      ..type = BodyType.DYNAMIC;

    body = world.createBody(bodyDef)..createFixtureFromFixtureDef(fixtureDef);
  }

  @override
  void renderCircle(Canvas canvas, Offset center, double radius) {
    final Paint paint = Paint()
      ..color = const Color.fromARGB(255, 255, 255, 255);
    canvas.drawCircle(center, radius, paint);
  }
}
