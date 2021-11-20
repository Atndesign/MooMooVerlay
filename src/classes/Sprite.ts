import Phaser, { Scene } from "phaser";
import GameScene from "./GameScene";
class Sprite extends Phaser.Physics.Arcade.Sprite {
  private _spriteX: integer = 50;
  private _spriteY: integer = 50;
  private _userName: string = "";
  private velocityX: number = 100;
  private velocityY: number = 100;
  private msg;
  private text;
  private canDisplayMsg: boolean = true;
  private msgTriangle;
  private jumpCoolDownReset: number;
  private moveCooldown: number;
  private jumpCoolDown: number;
  private moveCooldownReset: number;
  isBig: any;
  //@ts-ignore
  constructor(scene: GameScene, userName: string) {
    const x = Math.floor(Math.random() * innerWidth);
    const y = 100;
    super(scene, x, y, "cow");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.anims.create({
      key: "walk",
      frameRate: 5,
      duration: 5,
      repeat: -1,
      frames: scene.anims.generateFrameNumbers("cow", {
        start: 0,
        end: 2,
      }),
    });
    this._userName = userName;
    this.initState();
  }

  public get spriteX(): integer {
    return this._spriteX;
  }
  public set spriteX(value: integer) {
    this._spriteX = value;
  }
  public get spriteY(): integer {
    return this._spriteY;
  }
  public set spriteY(value: integer) {
    this._spriteY = value;
  }
  public get userName(): string {
    return this._userName;
  }
  public set userName(value: string) {
    this._userName = value;
  }

  //   Methods

  public initState(): void {
    this.setVelocity(150, 50);
    this.setBounce(1, 0);
    this.setCollideWorldBounds(true);
    this.play("walk");
    this.moveCooldownReset = 400 + Math.random() * 40;
    this.jumpCoolDownReset = 400 + Math.random() * 50;
    this.moveCooldown = this.moveCooldownReset;
    this.jumpCoolDown = this.jumpCoolDownReset;
    this.displayText();
  }
  public displayText(): void {
    this.text = this.scene.add.text(this.x - 10, this.y, this._userName, {
      fontFamily: '"Roboto"',
      align: "center",
      //@ts-ignore
      fill: "white",
    });
    this.msg = this.scene.add
      .text(this.x - 10, this.y, "", {
        fontFamily: '"Roboto"',
        align: "center",
        //@ts-ignore
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
  public update(): void {
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
    this.messageMoveWithSprite();
  }
  public messageMoveWithSprite(): void {
    this.text.x = this.x - this.text.displayWidth / 2;
    this.text.y = this.y - 35;
    if (this.msg !== null || this.msg !== undefined) {
      this.msg.x = this.x - this.msg.displayWidth / 2;
      this.msg.y = this.y - 35 - this.msg.displayHeight;
    }
    this.msgTriangle.setX(this.msg.x + this.msg.displayWidth / 2 + 10);
    this.msgTriangle.setY(this.text.y);
  }
  public randVelocity(): void {
    var rand = Math.random();
    if (rand > 0.5) {
      this.setVelocityX(Math.abs(this.velocityX));
      this.scaleX = -1;
    } else {
      this.setVelocity(-Math.abs(this.velocityX), 200);
      this.scaleX = 1;
    }
  }
  public jump(): void {
    var rand = Math.random();
    if (rand > 0.5) {
      this.setVelocity(this.velocityX, -200);
    }
    return;
  }
  public cooldown(timer: number, reset: number, method: string): number {
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
  public makeEmBig(): void {
    if (!this.isBig) {
      this.isBig = true;
      this.scene.tweens.add({
        targets: this,
        scaleX: 10,
        scaleY: 10,
        yoyo: false,
        repeat: 0,
        ease: "Sine.easeInOut",
      });
      setTimeout(() => {
        this.scene.tweens.add({
          targets: this,
          scaleX: 1,
          scaleY: 1,
          yoyo: false,
          repeat: 0,
          ease: "Sine.easeInOut",
        });
      }, 1500);
      setTimeout(() => {
        this.isBig = false;
      }, 15000);
    }
  }
  public displayChatText(text: String): void {
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
  public chooseANewVelocity(): void {
    this.body.velocity.x = 500;
    this.body.velocity.y = -500;
  }
}

export default Sprite;
