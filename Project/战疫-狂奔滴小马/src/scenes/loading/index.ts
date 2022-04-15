import { Scene } from "phaser";

export class LoadingScene extends Scene {
  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";

    // PLAYER LOADING
    this.load.image("king", "sprites/king.png");
    this.load.atlas(
      "a-king",
      "spritesheets/a-king_withmask.png",
      "spritesheets/a-king_atlas.json"
    );
    this.load.atlas(
      "lizard",
      "spritesheets/lizard.png",
      "spritesheets/lizard.json"
    );

    // MAP LOADING
    this.load.image({
      key: "Grass",
      url: "tilemaps/json/Grass.png",
    });
    this.load.image({
      key: "Fences",
      url: "tilemaps/json/Fences.png",
    });

    this.load.tilemapTiledJSON("tilemapGrass", "tilemaps/json/Grass.json");

    this.load.spritesheet("water", "spritesheets/Water.png", {
      frameWidth: 64,
      frameHeight: 16,
    });

    this.load.spritesheet("food", "spritesheets/food.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(): void {
    this.scene.start("game-scene", {
      name: "level1",
    });
    this.scene.start("ui-scene");
  }
}
