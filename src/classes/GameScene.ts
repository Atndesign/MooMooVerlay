import Phaser from "phaser";
import GameMode from "./GameMode";
class GameScene extends Phaser.Scene {
  currentGameMode: GameMode;
  gameModes: Array<GameMode> = [];

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

  public preload(): void {}
  public create(): void {}
  public getUrlVar(): Array<Number> {
    return [];
  }
  public createAViewer(username: String): void {}
  public update(): void {}
  public reinitStates(): void {}
  public toggleGameMode(gamemode: GameMode): void {}
}

export default GameScene;
