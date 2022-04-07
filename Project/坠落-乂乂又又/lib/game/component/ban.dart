import 'dart:math';
import 'dart:ui';

import 'package:box2d_flame/box2d.dart';
import 'package:flame/box2d/box2d_component.dart';
import 'package:flame/components/component.dart';
import 'package:flame/components/composed_component.dart';
import 'package:flame/components/mixins/has_game_ref.dart';
import 'package:flame/components/mixins/resizable.dart';
import 'package:flame/components/mixins/tapable.dart';
import 'package:supercharged/supercharged.dart';

import '../my_game.dart';
import 'box.dart';
import 'coin.dart';

class Ban extends PositionComponent
    with HasGameRef, Tapable, ComposedComponent, Resizable {
  MyGame game;
  bool killed = false; //是否活着

  List<Box> boxs;
  List<Coin> coins;
  double positionY = 0;

  Ban(this.game, Box2DComponent box, double distance) {
    generateBan(box, distance);
  }

  @override
  void update(double t) {
    super.update(t);
    if (boxs.any((e) => e != null)) {
      var body = boxs.firstWhere((e) => e is Box).body; //最后一行的box
      positionY = body.viewport.getWorldToScreen(body.center).y;
    }
  }

  /// 随机取数组中元素
  randomListItem(List items) =>
      items.isEmpty ? null : items[Random().nextInt(items.length)];

  /// 取 positions 中距离 target 最近的 positon
  int closestPosition(List<int> positions, int target) {
    int distance, closestPosition;
    for (var p in positions) {
      int tempDistance = (p - target).abs();
      if (distance == null || tempDistance < distance) {
        distance = tempDistance;
        closestPosition = p;
      }
    }
    return closestPosition;
  }

  /// 创建一条障碍
  generateBan(Box2DComponent box, double p) {
    List<int> blankPositions = [];
    double distance = p + game.topDistance;
    boxs = <Box>[]..length = game.boxLength;
    coins = <Coin>[]..length = game.boxLength;
    if (p == 0) {
      //第一个障碍只有中间一个缺口
      blankPositions = [((game.boxLength - 1) / 2).round()];
    } else {
      //生成随机空缺数
      int blankCounts = Random().nextInt(game.blankLength - 1) + 1; //随机空缺数
      List<int> positions = 0.rangeTo(game.boxLength - 1).toList(); //所有位置
      for (var _ in List.generate(blankCounts, (_) => null)) {
        //随机生成空缺位置
        int blankPosition = randomListItem(positions);
        var closest = closestPosition(blankPositions, blankPosition);
        var safe = closest == null ||
            (blankPosition > closest && closest - blankPosition > 3) ||
            (blankPosition < closest &&
                closest - blankPosition > 3 + game.blankLength);
        if (blankPosition == null || (blankPositions.isNotEmpty && !safe)) {
          //没有剩余的可行位置了
          break;
        }
        for (int tempPosition
            in blankPosition.rangeTo(blankPosition + game.blankSize - 1)) {
          if (tempPosition > -1 && tempPosition < game.boxLength) {
            //可行的空缺位置
            blankPositions.add(tempPosition); //添加空缺位置
            positions.remove(tempPosition); //移除空缺位置
            //移除紧邻空缺右边3个的位置
            for (int i in tempPosition.rangeTo(tempPosition + 3)) {
              positions.remove(i);
            }
            //移除紧邻空缺左边3个的位置
            for (int i in tempPosition.rangeTo(tempPosition - 3)) {
              positions.remove(i);
            }
          }
        }
      }
    }
    //填充空缺位置左右两边
    for (int blank in blankPositions) {
      //左边
      if (blank - 1 > -1 && !blankPositions.contains(blank - 1)) {
        boxs[blank - 1] = Box.right(
            game,
            box,
            Vector2(game.tileSize * (blank - 1), distance),
            Size(game.tileSize, game.tileSize));
      }
      //右边
      if (blank + 1 < game.boxLength && !blankPositions.contains(blank + 1)) {
        boxs[blank + 1] = Box.left(
            game,
            box,
            Vector2(game.tileSize * (blank + 1), distance),
            Size(game.tileSize, game.tileSize));
      }
    }
    List<int> boxPosition = []; //其余位置填充砖块,记录砖块位置
    for (int i in 0.rangeTo(game.boxLength - 1)) {
      if (!blankPositions.contains(i) && boxs[i] == null) {
        boxs[i] = Box.center(game, box, Vector2(game.tileSize * i, distance),
            Size(game.tileSize, game.tileSize));
        boxPosition.add(i);
      }
    }
    //填充金币
    if (p != 0) {
      //生成随机空缺数
      int coinCounts = Random().nextInt(game.blankLength - 1); //随机空缺数
      for (var _ in List.generate(coinCounts, (_) => null)) {
        //随机生成空缺位置
        int coinPosition = randomListItem(boxPosition);
        boxPosition.remove(coinPosition); //空缺位置
        coins[coinPosition] = Coin(
            game,
            box,
            Vector2(game.tileSize * coinPosition, distance - game.tileSize),
            Size(game.tileSize, game.tileSize));
      }
    }
    //添加组件
    for (var c in boxs) {
      if (c != null) add(c);
    }
    for (var c in coins) {
      if (c != null) add(c);
    }
    var body = boxs.firstWhere((e) => e is Box).body; //最后一行的box
    positionY = body.viewport.getWorldToScreen(body.center).y;
  }

  void remove() {
    killed = true;
  }

  /// 判断是否可以被移除了
  @override
  bool destroy() {
    return killed;
  }
}
