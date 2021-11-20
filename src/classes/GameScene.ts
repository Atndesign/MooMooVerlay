//@ts-nocheck
import Phaser from "phaser";
import GameMode from "./GameMode";
import Viewer from "./Viewer";
import cowTileSheet from "/assets/spritesheet-cow.png";
class GameScene extends Phaser.Scene {
  currentGameMode: GameMode;
  gameModes: Array<GameMode> = [];
  viewers: Array<Viewer> = [];

  constructor() {
    super({
      key: "play",
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
    });
  }
  public preload(): void {
    this.load.spritesheet("cow", cowTileSheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  public create(): void {
    this.createAViewer("Atn");
    this.createAViewer("Spanky");
    this.createAViewer("Anami");
    this.createAViewer("Smile");
  }
  public getUrlVar(): Array<Number> {
    return [];
  }
  public createAViewer(username: String): void {
    this.viewers.push(new Viewer(username, this));
  }
  public update(): void {
    this.viewers.forEach((viewer) => {
      viewer.update();
    });
  }
  public reinitStates(): void {}
  public toggleGameMode(gamemode: GameMode): void {}
}

export default GameScene;
