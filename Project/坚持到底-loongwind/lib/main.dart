import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stick_game/stick_game.dart';
import 'package:flutter_stick_game/test.dart';

void main() {
  final game = StickGame();
  runApp(GameWidget(game: game));
}