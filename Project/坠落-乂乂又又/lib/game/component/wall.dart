import 'dart:ui';

import 'package:box2d_flame/box2d.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/palette.dart';

import '../my_game.dart';

List<Wall> createBoundaries(MyGame game, Box2DComponent box) {
  final Vector2 screenSize = Vector2(
      game.screenSize.width, box.dimensions.height * box.viewport.scale);
  final Vector2 topLeft = screenSize * 0.0; //(screenSize / 2) * -1;
  final Vector2 bottomRight = screenSize;
  final Vector2 topRight = Vector2(screenSize.x, 0);
  final Vector2 bottomLeft = Vector2(
      0, screenSize.y); //screenSize; // Vector2(topLeft.x, bottomRight.y);

  return [
    Wall(topLeft, topRight, box),
    Wall(topRight, bottomRight, box),
    Wall(bottomRight, bottomLeft, box),
    Wall(bottomLeft, topLeft, box),
  ];
}

class Wall extends BodyComponent {
  Paint paint = BasicPalette.white.paint;
  Vector2 start;
  Vector2 end;

  Wall(this.start, this.end, Box2DComponent box) : super(box) {
    start = viewport.getScreenToWorld(start);
    end = viewport.getScreenToWorld(end);
    _createBody(start, end);
  }

  @override
  void renderPolygon(Canvas canvas, List<Offset> points) {
    dynamic startx = points[0];
    dynamic endx = points[1];
    // startx = viewport.getWorldToScreen(Vector2(startx.dx, startx.dy));
    // endx = viewport.getWorldToScreen(Vector2(endx.dx, endx.dy));
    canvas.drawLine(startx, endx, paint);
    // canvas.drawLine(Offset(startx.x, startx.y), Offset(endx.x, endx.y), paint);
  }

  void _createBody(Vector2 start, Vector2 end) {
    final PolygonShape shape = PolygonShape();
    shape.setAsEdge(start, end);

    final fixtureDef = FixtureDef()
      ..shape = shape
      ..restitution = 0.0
      ..friction = 0.1;

    final bodyDef = BodyDef()
      ..setUserData(this) // To be able to determine object in collision
      ..position = Vector2.zero()
      ..type = BodyType.STATIC;

    body = world.createBody(bodyDef)..createFixtureFromFixtureDef(fixtureDef);
  }
}
