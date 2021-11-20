import Phaser from "phaser";
import GameScene from "./classes/GameScene";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  title: "Phaser 3 with Parcel 📦",
  transparent: false,
  url: "https://github.com/samme/phaser-parcel",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"],
  },
  scene: [GameScene],
};
