import ComfyJS from "comfy.js";
import Phaser from "phaser";
import Moo from "./sprites/Moo.js";
import cowTiletSheet from "/assets/spritesheet-cow.png";

export default class PlayScene extends Phaser.Scene {
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
    this.gameModes = ["avatar", "drop"];
    this.currentGameMode = this.gameModes[0];
    this.viewers = [];
    this.contestants = [];
    this.viewersJson = {
      viewers: [{}],
    };
    ComfyJS.Init(this.getUrlVars()["channel"]);
  }
  preload() {
    this.load.spritesheet("cow", cowTiletSheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    for (let nbr = 0; nbr < 10; nbr++) {
      this.viewers.push(new Moo(this, "MooMoo"));
    }

    setTimeout(() => {
      this.enableDrop();
    }, 5000);
    ComfyJS.onCommand = (user, command, message, flags, extra) => {
      if (command === "play") {
        var canSpawn = true;
        if (this.viewersJson.viewers.length < 1) {
          canSpawn = true;
        }
        this.viewersJson.viewers.forEach((element) => {
          if (element.name == user) {
            canSpawn = false;
          }
        });
        if (canSpawn) {
          this.createViewer(user);
          this.viewersJson.viewers.push({ name: user });
          return;
        }
      }
    };
    ComfyJS.onChat = (user, message, flags, extra) => {
      var values = this.viewersJson.viewers.map(function (o) {
        return o.name;
      });
      let index = values.indexOf(user);
      if (index >= 0) {
        this.viewers[index - 1].displayChatText(message);
      }
    };
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

  createViewer(userName) {
    this.viewers.push(new Moo(this, userName));
  }

  update() {
    this.viewers.forEach((viewer, index) => {
      viewer.update();
    });

    if (this.currentGameMode === this.gameModes[1]) {
      this.contestants.forEach((player, index) => {
        player.update();
        let indexToRemove = player.checkIfDead();

        if (indexToRemove) {
          if (index > -1 && this.contestants.length > 0) {
            let players = this.contestants;
            players.splice(index, 1);
          }
          if (this.contestants.length <= 0) {
            this.add.text(
              800 / 2,
              600 / 2,
              `The winner is ${player.getName()}`,
              {
                fontFamily: '"Roboto"',
                align: "center",
              }
            );
            player.tint = 0x00ff00;
            setTimeout(() => {
              this.currentGameMode = this.gameModes[0];
            });
          }
        }
      });
    }
  }

  enableDrop() {
    this.viewers.forEach((viewer) => {
      this.contestants.push(viewer);
    });
    this.currentGameMode = this.gameModes[1];
    this.viewers.forEach((viewer) => {
      viewer.changeGameMode(1);
      viewer.startDrop(Math.floor(Math.random() * 800), 0);
    });
  }
}
