import { Scene } from "phaser";

import { EVENTS_NAME, GameStatus } from "../../consts";
import { Score, ScoreOperations } from "../../classes/score";
import { Text } from "../../classes/text";
import { gameConfig } from "../../";

export class UIScene extends Scene {
  private score!: Score;
  private gameEndPhrase!: Text;

  private chestLootHandler: () => void;
  private gameEndHandler: (status: GameStatus) => void;

  constructor() {
    super("ui-scene");

    this.chestLootHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);

      if (this.score.getValue() === gameConfig.winScore) {
        this.game.events.emit(EVENTS_NAME.gameEnd, "win");
      }
    };

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
      this.game.scene.pause("game-scene");

      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `失败!\n\n点击屏幕重新开始`
          : `胜利!\n\n点击屏幕重新开始`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");

      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.on("pointerdown", () => {
        this.game.events.off(EVENTS_NAME.chestLoot, this.chestLootHandler);
        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.scene.get("game-scene").scene.restart();
        this.scene.restart();
      });
    };
  }

  create(): void {
    this.score = new Score(this, 20, 20, 0);

    this.initListeners();
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
  }
}
