import Phaser from "phaser";
import PlayScene from "./PlayScene";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  title: "Phaser 3 with Parcel 📦",
  // transparent: true,
  url: "https://github.com/samme/phaser-parcel",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"],
  },
  scene: [PlayScene],
};
