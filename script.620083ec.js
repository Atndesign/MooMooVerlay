parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xKzN":[function(require,module,exports) {
var e={viewers:[{}]};function a(){var e={};window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,t,r){e[t]=r});return e}ComfyJS.onCommand=function(a,t,r,n,i){if("play"===t){var s=!0;if(e.viewers.length<1)return p(o,a),void e.viewers.push({name:a});e.viewers.forEach(function(e){e.name!=a||(s=!1)}),s&&(p(o,a),e.viewers.push({name:a}))}},ComfyJS.Init(a().channel);var t={type:Phaser.AUTO,width:800,height:600,transparent:!0,physics:{default:"arcade",arcade:{gravity:{y:200}}},scene:{preload:m,create:h,update:f}},r=new Phaser.Game(t),n=[],i=80,s=200,o=null,c=["cow","horse","chicken"];function m(){this.load.spritesheet("cow","./images/assets/sprites/cow/spritesheet-cow.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("horse","./images/assets/sprites/cow/horse.png",{frameWidth:32,frameHeight:32}),this.load.spritesheet("chicken","./images/assets/sprites/cow/chick.png",{frameWidth:32,frameHeight:32})}function h(){p(o=this,"Moo Moo")}function p(e,a){var t=e.physics.add.sprite(400,100,y(),0);e.anims.create({key:"walk",frameRate:5,repeat:-1,frames:e.anims.generateFrameNumbers("cow",{start:0,end:2})}),e.anims.create({key:"walk",frameRate:5,repeat:-1,frames:e.anims.generateFrameNumbers("chicken",{start:0,end:1})}),e.anims.create({key:"walk",frameRate:5,repeat:-1,frames:e.anims.generateFrameNumbers("horse",{start:0,end:2})}),t.setVelocity(100,200),t.setBounce(1,0),t.setCollideWorldBounds(!0),t.play("walk");var r={npc:t,name:e.add.text(t.x-10,t.y,a,{fontFamily:'"Roboto"'}),moveTimer:i,jumpTimer:s};n.push(r)}function f(){n.forEach(function(e){e.name.x=e.npc.x-e.name.displayWidth/2,e.name.y=e.npc.y-40,e.moveTimer=u(e.moveTimer,i,"velocity",e),e.jumpTimer=u(e.jumpTimer,s,"jump",e)})}function u(e,a,t,r){if(e<=0){switch(t){case"velocity":l(r);break;case"jump":d(r)}return a}return e-1}function l(e){Math.random()>.5?(e.npc.setVelocity(100,200),e.npc.scaleX=-1):(e.npc.setVelocity(-100,200),e.npc.scaleX=1)}function d(e){Math.random()>.5&&e.npc.setVelocity(0,-200)}function y(){var e=Math.floor(Math.random()*c.length);return c[e]}
},{}]},{},["xKzN"], null)
//# sourceMappingURL=/script.620083ec.js.map