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
    this.velocityX = 100;
    this.velocityY = 100;
    this.moveCooldownReset = 100 + Math.random() * 40;
    this.jumpCoolDownReset = 100 + Math.random() * 50;
    this.moveCooldown = this.moveCooldownReset;
    this.jumpCoolDown = this.jumpCoolDownReset;
    this.canDisplayMsg = true;

    this.setVelocity(this.velocityX, this.velocityY);
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
    this.msg = this.scene.add
      .text(this.x - 10, this.y, "", {
        fontFamily: '"Roboto"',
        align: "center",
        fill: "black",
        backgroundColor: "#ffffff",
        wordWrap: { width: 250, useAdvancedWrap: true },
      })
      .setPadding(16);
    this.msgTriangle = this.scene.add.triangle(
      this.msg.x,
      this.msg.y,
      10,
      0,
      0,
      10,
      -10,
      0,
      0xffffff
    );
    this.msg.setAlpha(0);
    this.msgTriangle.setAlpha(0);
  }
  update() {
    this.text.x = this.x - this.text.displayWidth / 2;
    this.text.y = this.y - 35;
    if (this.msg !== null || this.msg !== undefined) {
      this.msg.x = this.x - this.msg.displayWidth / 2;
      this.msg.y = this.y - 35 - this.msg.displayHeight;
    }
    this.moveCooldown = this.cooldown(
      this.moveCooldown,
      this.moveCooldownReset,
      "velocity"
    );
    this.jumpCoolDown = this.cooldown(
      this.jumpCoolDown,
      this.jumpCoolDownReset,
      "jump"
    );
    this.msgTriangle.setX(this.msg.x + this.msg.displayWidth / 2 + 10);
    this.msgTriangle.setY(this.text.y);
  }
  randVelocity() {
    var rand = Math.random();
    if (rand > 0.5) {
      this.setVelocityX(Math.abs(this.velocityX));
      this.scaleX = -1;
    } else {
      this.setVelocity(-Math.abs(this.velocityX), 200);
      this.scaleX = 1;
    }
    return;
  }
  jump() {
    var rand = Math.random();
    if (rand > 0.5) {
      this.setVelocity(0, -200);
    }
    return;
  }
  cooldown(timer, reset, method) {
    if (timer <= 0) {
      switch (method) {
        case "velocity":
          this.randVelocity();
          break;
        case "jump":
          this.jump();
          break;
      }
      return (timer = reset);
    } else {
      return (timer -= 1);
    }
  }
  displayChatText(text) {
    if (this.canDisplayMsg) {
      this.canDisplayMsg = false;
      this.scene.tweens.add({
        targets: this.msg,
        alpha: 1,
        yoyo: false,
        repeat: 0,
        ease: "Sine.easeInOut",
      });
      this.scene.tweens.add({
        targets: this.msgTriangle,
        alpha: 1,
        yoyo: false,
        repeat: 0,
        ease: "Sine.easeInOut",
      });
      this.msg.setText(text);
      setTimeout(() => {
        this.scene.tweens.add({
          targets: this.msg,
          alpha: 0,
          yoyo: false,
          repeat: 0,
          ease: "Sine.easeInOut",
        });
        this.scene.tweens.add({
          targets: this.msgTriangle,
          alpha: 0,
          yoyo: false,
          repeat: 0,
          ease: "Sine.easeInOut",
        });
      }, 2000);
      setTimeout(() => {
        this.canDisplayMsg = true;
      }, 5000);
    }
  }
}
