import { use } from "matter";
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
    this.viewers = [];
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
    for (let index = 0; index < 5; index++) {
      this.viewers.push(new Moo(this, "userName"));
    }
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
    this.viewers.forEach((viewer) => {
      viewer.update();
    });
  }
}
