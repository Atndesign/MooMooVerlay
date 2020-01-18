//Twitch part
var viewersJson = {
    "viewers": [
      {
      }
    ]
  }
ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if( command === "play" ) {
      var canSpawn = true;
      console.log(viewersJson)
      console.log(user)
      if(viewersJson.viewers.length < 1){
            createNPC(creationThis,user)
            viewersJson.viewers.push({name:user});
            return
        }
        viewersJson.viewers.forEach(element => {
            if(element.name == user){
              canSpawn = false;
              return
            }
        });
        if(canSpawn){
            createNPC(creationThis,user)
            viewersJson.viewers.push({name:user});
        }
    }
  }
  ComfyJS.Init( "Atndesign" );
  
    
    
//Game part
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var npcs = []; 
var moveCooldown = 80;
var jumpCooldown = 200;
var creationThis = null;
function preload ()
{

    this.load.spritesheet('cow', "images/assets/sprites/cow/spritesheet-cow.png", {frameWidth: 32, frameHeight: 32})
}

function create ()
{
    creationThis = this;
    createNPC(creationThis, "BOB");
}


function createNPC(method, name){
        var npc = method.physics.add.sprite(400, 100, 'cow',0);
        method.anims.create({
            key: "walk",
            frameRate: 5,
            repeat: -1,
            frames: method.anims.generateFrameNumbers('cow', { start: 0, end: 2 }),
        });
        npc.setVelocity(100, 200);
        npc.setBounce(1, 0);
        npc.setCollideWorldBounds(true);
        npc.play("walk")

        var text = method.add.text(npc.x - 10, npc.y, name, { fontFamily: '"Roboto"' });
        var NPC = {
            "npc": npc,
            "name": text,
            "moveTimer": moveCooldown,
            "jumpTimer": jumpCooldown
        }
        npcs.push(NPC)
}

function update()
{
    npcs.forEach(npc => {
        npc.name.x = npc.npc.x - (npc.name.displayWidth / 2);
        npc.name.y = npc.npc.y - 40;
        npc.moveTimer = cooldownExpired(npc.moveTimer, moveCooldown, "velocity", npc)
        npc.jumpTimer = cooldownExpired(npc.jumpTimer, jumpCooldown, "jump", npc)
    });
}

function cooldownExpired(timer, reset, method, obj){
    if (timer <= 0){
         switch (method){
            case "velocity":
                randVelocity(obj)
                break
            case "jump":
                jump(obj)
                break
        }
        return timer = reset;
       
    }
    else{
        return timer -= 1;
    }
}

function randVelocity(obj){
    var rand = Math.random()
    if(rand >0.50){
        obj.npc.setVelocity(100, 200);
        obj.npc.scaleX = -1
    }
    else{
        obj.npc.setVelocity(-100, 200);
        obj.npc.scaleX = 1
    }
}

function jump(obj){
    var rand = Math.random()
    if(rand >0.50){
        obj.npc.setVelocity(0, -200);

    }
}
