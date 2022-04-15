import { Math, Scene } from "phaser";

import { EVENTS_NAME } from "../consts";
import { Actor } from "./actor";
import { Player } from "./player";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const randomDirection = (exclude: Direction) => {
  let newDirection = Phaser.Math.Between(0, 3);
  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3);
  }

  return newDirection;
};

export class Enemy extends Actor {
  private direction = Direction.RIGHT;
  private moveEvent: Phaser.Time.TimerEvent;

  private target: Player;
  private AGRESSOR_RADIUS = 100;
  private attackHandler: () => void;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;

    // ADD TO SCENE
    //scene.add.existing(this);
    //scene.physics.add.existing(this);

    // PHYSICS MODEL
    //this.getBody().setSize(16, 16);
    //this.getBody().setOffset(0, 0);

    // ANIMATIONS
    this.anims.play("lizard-idle");

    this.attackHandler = () => {
      if (
        Math.Distance.BetweenPoints(
          { x: this.x, y: this.y },
          { x: this.target.x, y: this.target.y }
        ) < this.target.width
      ) {
        this.getDamage();
        this.disableBody(true, false);

        this.scene.time.delayedCall(300, () => {
          this.destroy();
        });
      }
    };

    // EVENTS
    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on("destroy", () => {
      this.scene.game.events.removeListener(
        EVENTS_NAME.attack,
        this.attackHandler
      );
    });

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction);
      },
      loop: true,
    });
  }

  destroy(fromScene?: boolean) {
    this.moveEvent.destroy();

    super.destroy(fromScene);
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);

    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
    } else {
      const speed = 50;

      switch (this.direction) {
        case Direction.UP:
          this.getBody().setVelocity(0, -speed);
          break;

        case Direction.DOWN:
          this.getBody().setVelocity(0, speed);
          break;

        case Direction.LEFT:
          this.getBody().setVelocity(-speed, 0);
          break;

        case Direction.RIGHT:
          this.getBody().setVelocity(speed, 0);
          break;
      }
    }
  }

  update(): void {}

  public setTarget(target: Player): void {
    this.target = target;
  }
}
