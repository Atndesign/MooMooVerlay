import Sprite from "./Sprite";

class Viewer {
  private _username: String;
  private _avatar: Sprite;
  private _xPosition: Number;
  private _yPosition: Number;

  constructor(username: String, avatar: Sprite) {
    this._username = username;
    this._avatar = avatar;
  }

  public get username(): String {
    return this._username;
  }
  public set username(username: String) {
    this._username = username;
  }

  public get avatar(): Sprite {
    return this._avatar;
  }
  public set avatar(avatar: Sprite) {
    this.avatar = avatar;
  }

  public get xPosition(): Number {
    return this._xPosition;
  }
  public set xPosition(x: Number) {
    this._xPosition = x;
  }

  public get yPosition(): Number {
    return this._yPosition;
  }
  public set yPostion(y: Number) {
    this._yPosition = y;
  }

  public displayAmessage(): void {}

  public update(): void {}
}

export default Viewer;
