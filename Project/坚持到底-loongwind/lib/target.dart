

import 'dart:ui';

import 'package:flame/input.dart';
import 'package:flutter/material.dart';

class TargetComponent{
  final Vector2 position;
  final Vector2 originPosition;
  final double radius;
  final Paint paint = Paint()..color = Colors.greenAccent;
  late Path path = Path()
    ..addOval(Rect.fromLTWH(position.x - radius, position.y - radius, radius * 2, radius * 2));

  TargetComponent({required this.position, this.radius = 20}) : originPosition = Vector2(position.x, position.y);


  void render(Canvas canvas){
    canvas.drawCircle(position.toOffset(), radius, paint);
  }

  void onDragUpdate(int pointerId, DragUpdateInfo info) {
    var eventPosition = info.eventPosition.game;
    position.setValues(eventPosition.x, eventPosition.y);
    _updatePath();
  }

  void resetPosition(){
    position.setValues(originPosition.x, originPosition.y);
    _updatePath();
  }

  void _updatePath() {
    path.reset();
    path.addOval(Rect.fromLTWH(position.x - radius, position.y - radius, radius * 2, radius * 2));
  }

}