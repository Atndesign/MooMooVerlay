// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"javascripts/script.js":[function(require,module,exports) {
//Twitch part
var viewersJson = {
  "viewers": [{}]
};

ComfyJS.onCommand = function (user, command, message, flags, extra) {
  if (command === "play") {
    var canSpawn = true;

    if (viewersJson.viewers.length < 1) {
      createNPC(creationThis, user);
      viewersJson.viewers.push({
        name: user
      });
      console.log("Appear");
      return;
    }

    viewersJson.viewers.forEach(function (element) {
      if (element.name == user) {
        canSpawn = false;
        return;
      }
    });

    if (canSpawn) {
      createNPC(creationThis, user);
      viewersJson.viewers.push({
        name: user
      });
    }
  }
};

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
} //   ComfyJS.Init( getUrlVars()["channel"] );


ComfyJS.Init("Atndesign"); //Game part

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      }
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
var sprites = ["cow", "horse", "chicken"];
var animations = ["walkcow", "walkhorse", "walkchicken"];

function preload() {
  this.load.spritesheet('cow', "./images/assets/sprites/cow/spritesheet-cow.png", {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.spritesheet('horse', "./images/assets/sprites/horse/horse.png", {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.spritesheet('chicken', "./images/assets/sprites/chicken/chick.png", {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create() {
  creationThis = this;
  createNPC(creationThis, "Moo Moo");
}

function createNPC(method, name) {
  var npc = method.physics.add.sprite(400, 100, pickRandomSprite().sprites, 0);
  console.log(npc);
  method.anims.create({
    key: "walkcow",
    frameRate: 5,
    repeat: -1,
    frames: method.anims.generateFrameNumbers('cow', {
      start: 0,
      end: 2
    })
  });
  method.anims.create({
    key: "walkchicken",
    frameRate: 3,
    repeat: -1,
    frames: method.anims.generateFrameNumbers('chicken', {
      start: 0,
      end: 1
    })
  });
  method.anims.create({
    key: "walkhorse",
    frameRate: 5,
    repeat: -1,
    frames: method.anims.generateFrameNumbers('horse', {
      start: 0,
      end: 2
    })
  });
  npc.setVelocity(100, 200);
  npc.setBounce(1, 0);
  npc.setCollideWorldBounds(true);
  npc.play(pickRandomSprite().animation);
  var text = method.add.text(npc.x - 10, npc.y, name, {
    fontFamily: '"Roboto"'
  });
  var NPC = {
    "npc": npc,
    "name": text,
    "moveTimer": moveCooldown,
    "jumpTimer": jumpCooldown
  };
  npcs.push(NPC);
}

function update() {
  npcs.forEach(function (npc) {
    npc.name.x = npc.npc.x - npc.name.displayWidth / 2;
    npc.name.y = npc.npc.y - 40;
    npc.moveTimer = cooldownExpired(npc.moveTimer, moveCooldown, "velocity", npc);
    npc.jumpTimer = cooldownExpired(npc.jumpTimer, jumpCooldown, "jump", npc);
  });
}

function cooldownExpired(timer, reset, method, obj) {
  if (timer <= 0) {
    switch (method) {
      case "velocity":
        randVelocity(obj);
        break;

      case "jump":
        jump(obj);
        break;
    }

    return timer = reset;
  } else {
    return timer -= 1;
  }
}

function randVelocity(obj) {
  var rand = Math.random();

  if (rand > 0.50) {
    obj.npc.setVelocity(100, 200);
    obj.npc.scaleX = -1;
  } else {
    obj.npc.setVelocity(-100, 200);
    obj.npc.scaleX = 1;
  }
}

function jump(obj) {
  var rand = Math.random();

  if (rand > 0.50) {
    obj.npc.setVelocity(0, -200);
  }
}

function pickRandomSprite() {
  var rand = Math.floor(Math.random() * sprites.length);
  return {
    sprites: sprites[rand],
    animation: animations[rand]
  };
}
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14615" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascripts/script.js"], null)
//# sourceMappingURL=/script.e0c41d2c.js.map