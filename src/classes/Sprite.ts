import Phaser, { Scene } from "phaser";
import GameScene from "./GameScene";
class Sprite extends Phaser.Physics.Arcade.Sprite {
  private _spriteX: integer = 50;
  private _spriteY: integer = 50;
  private _userName: String;
  private _velocityX: number;
  private _velocityY: number;

  //@ts-ignore
  constructor(scene: GameScene, userName: String) {
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
    this.initState();
    this._userName = userName;
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
  public get userName(): String {
    return this._userName;
  }
  public set userName(value: String) {
    this._userName = value;
  }

  //   Methods

  public initState(): void {
    this.setVelocity(150, 50);
    this.setBounce(1, 0);
    this.setCollideWorldBounds(true);
    this.play("walk");
  }
  public displayText(): void {}
  public update(): void {}
  public messageMoveWithSprite(): void {}
  public randVelocity(): void {}
  public jump(): void {}
  public cooldown(): Number {
    return 0;
  }
  public displayChattext(): void {}
  public chooseANewVelocity(): void {}
}

export default Sprite;
