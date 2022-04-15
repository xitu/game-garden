import { Text } from "./text";

export enum ScoreOperations {
  INCREASE,
  DECREASE,
  SET_VALUE,
}

export class Score extends Text {
  private scoreValue: number;

  constructor(scene: Phaser.Scene, x: number, y: number, initScore = 0) {
    super(scene, x, y, `得分: ${initScore}`);

    scene.add.existing(this);

    this.scoreValue = initScore;
  }

  public changeValue(operation: ScoreOperations, value: number): void {
    switch (operation) {
      case ScoreOperations.INCREASE:
        this.scoreValue += value;
        break;
      case ScoreOperations.DECREASE:
        this.scoreValue -= value;
        break;
      case ScoreOperations.SET_VALUE:
        this.scoreValue = value;
        break;
      default:
        break;
    }

    this.setText(`得分: ${this.scoreValue}`);
  }

  public getValue(): number {
    return this.scoreValue;
  }
}
