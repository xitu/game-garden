
import 'dart:ui';

import 'package:flame/game.dart';
import 'package:flutter/material.dart';

class TextComponent{
  final Vector2 position;
  String text;
  final Color textColor;
  double textSize;

  final Path path = Path();

  TextComponent({required this.position, required this.text, this.textColor = Colors.white, this.textSize = 40});


  void render(Canvas canvas){
    var textPainter = TextPainter(
        text: TextSpan(
            text: text,
            style: TextStyle(fontSize: textSize, color: textColor)),
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr);
    textPainter.layout(); // 进行布局
    textPainter.paint(canvas, Offset(position.x - textPainter.width / 2 , position.y - textPainter.height/2)); // 进行绘制
    path.reset();
    path.addRect(Rect.fromLTWH(position.x - textPainter.width / 2, position.y - textPainter.height/2, textPainter.width, textPainter.height));
  }

}