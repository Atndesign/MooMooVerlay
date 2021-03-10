import Phaser from "phaser";

export default class Moo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, name = "") {
    var x = Math.floor(Math.random() * innerWidth);
    var y = 100;
    super(scene, x, y, "cow");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.anims.create({
      key: "walk",
      frameRate: 5,
      repeat: -1,
      frames: scene.anims.generateFrameNumbers("cow", {
        start: 0,
        end: 2,
      }),
    });
    this.setVelocity(100, 200);
    this.setBounce(1, 0);
    this.setCollideWorldBounds(true);
    this.play("walk");
    this.name = "";
    this.name = name;
    this.text = scene.add.text(this.x - 10, this.y, name, {
      fontFamily: '"Roboto"',
      align: "center",
      fill: "white",
    });
  }
  update() {
    this.text.x = this.x - this.text.displayWidth / 2;
    this.text.y = this.y - 35;
  }
}
