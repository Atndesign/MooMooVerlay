import Phaser from "phaser";
import Moo from "./sprites/Moo.js";
import cowTiletSheet from "/assets/spritesheet-cow.png";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: true,
        },
      },
    });
    this.viewers = [];
  }
  preload() {
    this.load.spritesheet("cow", cowTiletSheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.viewers.push(new Moo(this, "Lorem"));
  }

  update() {
    this.viewers.forEach((viewer) => {
      viewer.update();
    });
  }
}
