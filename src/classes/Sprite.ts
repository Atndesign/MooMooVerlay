import Phaser, { Scene } from "phaser";
import GameScene from "./GameScene";
class Sprite extends Phaser.Physics.Arcade.Sprite {
  private _spriteX: integer;
  private _spriteY: integer;
  private _userName: String;

  constructor(scene: GameScene, userName: String) {
    const x = Math.floor(Math.random() * innerWidth);
    const y = 100;
    super(scene, x, y, "cow");
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

  public initState(): void {}
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
