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
    ComfyJS.Init(this.getUrlVars()["channel"]);
  }
  public preload(): void {
    this.load.spritesheet("cow", cowTileSheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  public getUrlVars(): Array<Object> {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }
  public create(): void {
    this.createAViewer("Moo Moo");
    ComfyJS.onCommand = (user, command) => {
      if (command === "moobig") {
        this.viewers.forEach((viewer) => {
          viewer.makeEmBig();
        });
      }
      if (command === "bounce") {
        this.enableDrop();
      }
      if (command === "bounce") {
      }
    };

    ComfyJS.onChat = (user, message) => {
      // console.log(this.viewers);

      var values = this.viewers.map(function (o) {
        return o.username;
      });
      let index = values.indexOf(user);
      if (index >= 0) {
        this.viewers[index].displayAmessage(message);
        return;
      }
      var canSpawn = true;
      if (this.viewers.length < 1) {
        canSpawn = true;
      }
      this.viewers.forEach((element) => {
        if (element.name == user) {
          canSpawn = false;
        }
      });
      if (canSpawn) {
        this.createAViewer(user);
        return;
      }
    };
  }
  public createAViewer(username: String): void {
    this.viewers.push(new Viewer(username, this));
  }
  public update(): void {
    this.viewers.forEach((viewer) => {
      viewer.update();
    });
  }

  public makeEmBig(): void {
    if (!this.isBig) {
      this.isBig = true;
      this.scene.tweens.add(
        {
          targets: this,
          scaleX: 10,
          scaleY: 10,
          yoyo: false,
          repeat: 0,
          ease: "Sine.easeInOut",
        },
        500
      );
      setTimeout(() => {
        this.scene.tweens.add(
          {
            targets: this,
            scaleX: 1,
            scaleY: 1,
            yoyo: false,
            repeat: 0,
            ease: "Sine.easeInOut",
          },
          500
        );
      }, 1500);
      setTimeout(() => {
        this.isBig = false;
      }, 15000);
    }
  }

  public reinitStates(): void {}
  public toggleGameMode(gamemode: GameMode): void {}
}

export default GameScene;
