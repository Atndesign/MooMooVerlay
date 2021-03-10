import Phaser from "phaser";

export default class Moo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    var x = 50;
    var y = 100;
    super(scene, x, y, "cow");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setVelocity(100, 200);
    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
    this.play("walk");
  }
  create() {
    scene.anims.create({
      key: "walk",
      frameRate: 5,
      repeat: -1,
      frames: scene.anims.generateFrameNumbers("cow", {
        start: 0,
        end: 2,
      }),
    });
  }
  update() {}
}
