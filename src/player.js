(function(window, THREE) {
  var exports = window;
  var width = window.innerWidth;
  var height = window.innerHeight;

  // geometric form of the player
  var playerpoints = [
    new THREE.Vector3(50, 0, 0),
    new THREE.Vector3(-50, 0, 0),
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(0, 100, 0)
  ];

  var shieldpoints = [
    new THREE.Vector3(0, 0, 60),
    new THREE.Vector3(50, 50, 0),
    new THREE.Vector3(50, -50, 0),
    new THREE.Vector3(-50, 50, 0),
    new THREE.Vector3(-50, -50, 0),
    new THREE.Vector3(0, 75, 0),
    new THREE.Vector3(0, -75, 0),
    new THREE.Vector3(-75, 0, 0),
    new THREE.Vector3(75, 0, 0),
    new THREE.Vector3(0, 0, -60)
  ];

  var shieldMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0.3,
    color: 0x11EE11
  });

  var darkMaterial = new THREE.MeshLambertMaterial({
    color: 0xbbbbbb
  });

  var wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    wireframe: true
  });

  var multiMaterial = [darkMaterial, wireframeMaterial];

  var manager = new THREE.LoadingManager();
  var imgloader = new THREE.ImageLoader(manager);
  var objloader = new THREE.OBJLoader(manager);

  exports.Player = function() {
    this.resetPosition();
    this.children[0].castShadow = true;
    this.children[0].receiveShadow = true;
    this.children[1].castShadow = true;
    this.children[1].receiveShadow = true;

    this.shield = false;

    this.shield = THREE.SceneUtils.createMultiMaterialObject(
      new THREE.ConvexGeometry(shieldpoints), [shieldMaterial, wireframeMaterial]
    );

    this.shield.scale.x = 1.1;
    this.shield.scale.y = 1.1;
    this.shield.scale.z = 1.1;

    this.shield.position.y = 30;
    this.shield.position.z = 10;

    this.add(this.shield);
    this.shield.children[0].visible = false;
    this.shield.children[1].visible = false;


    // load real model
    var self = this;
    var texture = THREE.ImageUtils.loadTexture('../models/glyder/color.png');
    var specular = THREE.ImageUtils.loadTexture('../models/glyder/specular.png');

    objloader.load('../models/glyder/model.obj', function(object) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
          child.material.specularMap = specular;
          child.material.specular = new THREE.Color('grey');
        }
      });

      object.position.y = 30;
      object.position.z = 25;
      object.scale.x = 3;
      object.scale.y = 3;
      object.scale.z = 3;
      object.rotation.x = Math.PI / 2;
      object.rotation.y = Math.PI / -2;

      self.model = object;
    });
  };

  exports.Player.prototype = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(playerpoints), multiMaterial);

  exports.Player.prototype.getHit = function(obs) {
    if (obs.type === "shield") {
      if(!this.invincible){
        this.addShield();
        setTimeout(function() {
          this.removeShield();
        }.bind(this), 10000);
        obs.parent.remove(obs);
        return false;
      }
    }else{
      if(this.invincible){
        obs.parent.destroy(obs);
      }
    }
    return !this.invincible;
  };

  exports.Player.prototype.flickerShield = function(state, cb) {
    for (var i = 200; i < 2200; i += 200) {
      state = !state;

      setTimeout(function(state) {
        this.shield.children[0].visible = state;
        this.shield.children[1].visible = state;
      }.bind(this, state), i);
    }
    setTimeout(cb, 2200);
  };

  exports.Player.prototype.addShield = function() {
    this.invincible = true;
    this.shield.children[0].visible = true;
    this.shield.children[1].visible = true;
  };

  exports.Player.prototype.removeShield = function() {
    this.flickerShield(false, function () {
      this.invincible = false;
    }.bind(this));
  };

  exports.Player.prototype.left = function() {
    if (this.position.x > width / -2 + 100) {
      this.position.x -= 29;
      this.rotation.y -= 0.03;
    } else if (this.position.x > width / -2 + 50) {
      this.position.x -= 0.3;
      this.rotation.y -= 0.001;
    }
  };

  exports.Player.prototype.right = function() {
    if (this.position.x < width / 2 - 100) {
      this.position.x += 29;
      this.rotation.y += 0.03;
    } else if (this.position.x < width / 2 - 50) {
      this.position.x += 0.3;
      this.rotation.y += 0.001;
    }
  };

  exports.Player.prototype.toMesh = function() {
    this.children[0].visible = true;
    this.children[1].visible = true;
    if (this.model) {
      this.remove(this.model);
    }
  };

  exports.Player.prototype.toModel = function() {
    this.children[0].visible = false;
    this.children[1].visible = false;
    this.add(this.model);
  };

  exports.Player.prototype.resetPosition = function() {
    this.position.z = 35;
    this.position.y = -20;
    this.position.x = -50;
    this.rotation.x = 0;
    this.rotation.y = 0;
    this.rotation.z = Math.PI * 1.5;

  };

}(window, window.THREE));
