(function(window, THREE) {
  var exports = window;
  var width = window.innerWidth;

  var START_SPEED = 18;
  var MAX_SPEED = 40;
  var ACC = 0.02;

  exports.Obstacles = function(player) {
    this.player = player;

    this.speed = START_SPEED;

    this.addCube();

    this.toLight();
  };

  exports.Obstacles.prototype = new THREE.Object3D();

  exports.Obstacles.prototype.addCube = function() {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(150, 125, 100), new THREE.MeshLambertMaterial({
      color: 0x339933
    }));
    cube.position.x = 0;
    cube.position.z = -20;
    cube.position.y = -20;
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.add(cube);
  };

  exports.Obstacles.prototype.toDark = function() {
    this.materials = [
      new THREE.MeshLambertMaterial({
        color: 0x665544
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      })
    ];
  };

  exports.Obstacles.prototype.toLight = function() {
    this.materials = [
      new THREE.MeshLambertMaterial({
        color: 0x333333
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      })
    ];
  };

  exports.Obstacles.prototype.createOne = function() {
    var points = [],
      i;
    for (i = 0; i < 30; i++) {
      points.push(randomPointInSphere(50));
    }

    var object = THREE.SceneUtils.createMultiMaterialObject(
      new THREE.ConvexGeometry(points), this.materials
    );
    object.position.set(Math.random() * width - width / 2, -this.position.y + 2000, 60);
    this.add(object);
  };

  exports.Obstacles.prototype.cleanUp = function(all) {
    this.children.forEach(function(obj) {
      if (all || obj.position.y < -this.position.y - 700) {
        this.remove(obj);
        if (obj.children.length > 1) {
          obj.children[0].geometry.dispose();
          obj.children[1].geometry.dispose();
        }
      }
    }.bind(this));
  };

  exports.Obstacles.prototype.reset = function() {
    this.cleanUp(true);
    this.position.y = 0;
    this.addCube();
    this.speed = START_SPEED;
  };

  exports.Obstacles.prototype.accelerate = function() {
    if (this.speed < MAX_SPEED) {
      this.speed += ACC;
    }
  };

  exports.Obstacles.prototype.move = function() {
    this.accelerate();
    this.position.y -= this.speed;
  };

  exports.Obstacles.prototype.checkCollision = function() {
    return this.player.children.some(function(child) {
      if (!child.geometry) return false;
      var orig = this.player.position.clone(),
        vertexIndex;
      for (vertexIndex = 0; vertexIndex < child.geometry.vertices.length; vertexIndex++) {
        var localVertex = child.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(this.player.matrix);
        var directionVector = globalVertex.sub(this.player.position);

        var ray = new THREE.Raycaster(orig, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(this.children, true);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
          return true;
        }
      }
    }.bind(this));
  };

}(window, window.THREE));
