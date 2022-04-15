import { Scene } from "phaser";

import { EVENTS_NAME, GameStatus } from "../consts";
import { Actor } from "./actor";
import { Text } from "./text";

export class Player extends Actor {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private hpValue: Text;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "king");

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    //this.keySpace = this.scene.input.keyboard.addKey(32);

    // this.keySpace.on('down', (event: KeyboardEvent) => {
    //   this.anims.play('attack', true);
    //   this.scene.game.events.emit(EVENTS_NAME.attack);
    // });
    // this.on("destroy", () => {
    //   this.keySpace.removeAllListeners();
    // });

    this.hpValue = new Text(
      this.scene,
      this.x,
      this.y - this.height,
      this.hp.toString()
    )
      .setFontSize(12)
      .setOrigin(0.8, 0.5);

    // PHYSICS
    this.getBody().setSize(30, 30);
    this.getBody().setOffset(8, 0);

    // ANIMATIONS
    this.initAnimations();
  }

  update(): void {
    this.getBody().setVelocity(0);

    if (this.cursors.up.isDown) {
      this.body.velocity.y = -110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -110;
      this.checkFlip();
      this.getBody().setOffset(48, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }

    if (this.cursors.down.isDown) {
      this.body.velocity.y = 110;
      !this.anims.isPlaying && this.anims.play("run", true);
    }

    if (this.cursors.right.isDown) {
      this.body.velocity.x = 110;
      this.checkFlip();
      this.getBody().setOffset(15, 15);
      !this.anims.isPlaying && this.anims.play("run", true);
    }

    if (this.cursors.space.isDown) {
      this.anims.play("attack", true);
      this.scene.game.events.emit(EVENTS_NAME.attack);
    }

    this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
    this.hpValue.setOrigin(0.8, 0.5);
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNames("a-king", {
        prefix: "run-",
        end: 7,
      }),
      frameRate: 8,
    });

    this.scene.anims.create({
      key: "attack",
      frames: this.scene.anims.generateFrameNames("a-king", {
        prefix: "attack-",
        end: 2,
      }),
      frameRate: 8,
    });
  }

  public addHP(): void {
    this.hp = this.hp + 10;
    this.hpValue.setText(this.hp.toString());
  }

  public getDamage(value?: number): void {
    super.getDamage(value);
    this.hpValue.setText(this.hp.toString());

    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }
  }
}
