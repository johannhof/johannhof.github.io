(function(window, THREE) {
  var document = window.document;
  var localStorage = window.localStorage;
  var width = window.innerWidth;
  var height = window.innerHeight;
  if(width < 1024){
    return;
  }
  var speed;
  var ingame = false;
  var intervals = [];

  var timeDisplay = document.getElementById("time");
  var personalBest = document.getElementById("personal-best");
  var buttons = document.getElementById("buttons");

  // show game elements after they had their first animation
  setTimeout(function() {
    buttons.style.visibility = "visible";
    timeDisplay.style.visibility = "visible";
    personalBest.style.visibility = "visible";
  }, 1000);

  function randomPointInSphere(radius) {
    return new THREE.Vector3(
      (Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius
    );
  }

  var obstacles, scene, Player;

  function initScene() {
    width = window.innerWidth;
    height = window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 1000, 2700);

    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(1000, 2000, 1500);
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowDarkness = 0.3;
    spotLight.shadowCameraFov = 30;
    scene.add(spotLight);

    var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa, 1);
    scene.add(hemisphereLight);

    obstacles = new THREE.Object3D();
    scene.add(obstacles);

    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height * 100),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      })
    );

    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);

    var playerpoints = [
      new THREE.Vector3(50, 0, 0),
      new THREE.Vector3(-50, 0, 0),
      new THREE.Vector3(0, 0, 50),
      new THREE.Vector3(0, 100, 0)
    ];

    var darkMaterial = new THREE.MeshLambertMaterial({
      color: 0xbbbbbb
    });
    var wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x007700,
      wireframe: true
    });
    var multiMaterial = [darkMaterial, wireframeMaterial];
    Player = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(playerpoints), multiMaterial);
    Player.position.z = 35;
    Player.position.y = -20;
    Player.position.x = -50;
    Player.rotation.z = Math.PI * 1.5;
    Player.children[0].castShadow = true;
    Player.children[0].receiveShadow = true;
    Player.children[1].castShadow = true;
    Player.children[1].receiveShadow = true;
    scene.add(Player);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(150, 125, 100), new THREE.MeshLambertMaterial({
      color: 0x339933
    }));
    cube.position.x = 0;
    cube.position.z = -20;
    cube.position.y = -20;
    cube.castShadow = true;
    cube.receiveShadow = true;
    obstacles.add(cube);
  }

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.rotation.x = 0.9;
  camera.position.z = 1000;
  camera.position.y = -700;

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    clearColor: 0xfcfcfc,
    clearAlpha: 1
  });
  renderer.setClearColor(0xfcfcfc, 1);
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  //renderer.shadowMapType = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  var render = function render() {
    renderer.render(scene, camera);
  };

  var materials = [
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

  function createObstacle() {
    if (!ingame) {
      return;
    }
    var points = [],
      i;
    for (i = 0; i < 30; i++) {
      points.push(randomPointInSphere(50));
    }

    var object = THREE.SceneUtils.createMultiMaterialObject(new THREE.ConvexGeometry(points), materials);
    object.position.set(Math.random() * width - width / 2, -obstacles.position.y + 2000, 60);
    obstacles.add(object);
    render();
  }

  // add subtle ambient lighting
  function removeObstacles() {
    obstacles.children.forEach(function(obj) {
      if (obj.position.y < -obstacles.position.y - 700) {
        obstacles.remove(obj);
        if (obj.children.length > 1) {
          obj.children[0].geometry.dispose();
          obj.children[1].geometry.dispose();
        }
      }
    });
  }

  function checkCollision() {
    return Player.children.some(function(child) {
      var orig = Player.position.clone(), vertexIndex;
      for (vertexIndex = 0; vertexIndex < child.geometry.vertices.length; vertexIndex++) {
        var localVertex = child.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(Player.matrix);
        var directionVector = globalVertex.sub(Player.position);

        var ray = new THREE.Raycaster(orig, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(obstacles.children, true);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
          return true;
        }
      }
    });
  }

  function lose() {
    document.getElementById("gameover").style.display = "block";
    document.getElementById("about").style.color = "rgba(0,0,0,1)";
    document.getElementById("projects").style.color = "rgba(0,0,0,1)";
    ingame = false;
  }

  var startTime;
  var minutes = 0;
  var seconds = 0;

  function formatTime(minutes, seconds){
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }

  function displayTime(minutes, seconds) {
    timeDisplay.innerText = formatTime(minutes, seconds);
  }

  function move(time) {

    if (!startTime) {
      startTime = time;
    }

    removeObstacles();

    obstacles.position.y -= speed;
    if(speed < 31){
      speed += 0.013;
    }
    if (speed % 5 <= 0.01 && speed % 5 >= -0.01) {
      intervals.push(setInterval(createObstacle, 1000));
    }
    if ((time - startTime) % 1000 <= 50 && (time - startTime) % 1000 >= -50) {
      seconds = Math.round((time - startTime) / 1000);
      if (seconds > 59) {
        seconds = 0;
        startTime = time;
        minutes++;
      }
      displayTime(minutes, seconds);
    }

    if (checkCollision()) {
      startTime = undefined;
      var score = minutes * 60 + seconds;
      if(!(localStorage.racer_best && localStorage.racer_best > score)){
        localStorage.racer_best = score;
      }
      minutes = 0;
      lose();
    } else {
      window.requestAnimationFrame(move);
    }

    render();
  }


  function player2() {
    if (Player.position.y <= 80) {
      window.requestAnimationFrame(player2);
      Player.position.y += 5;
      render();
    } else {
      intervals.push(setInterval(createObstacle, 1000));
      buttons.style.opacity = "1";
      setTimeout(function () {
        buttons.style.opacity = "0";
      }, 5000);

      window.requestAnimationFrame(move);
    }
  }

  function player1() {
    if (Player.rotation.z <= 0 || Player.rotation.z >= 0.1) {
      window.requestAnimationFrame(player1);
      Player.rotateZ(0.03);
      Player.position.z += 0.7;
      Player.position.x += 1;
      render();
    } else {
      window.requestAnimationFrame(player2);
    }
  }

  window.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37: // left button
        if (!ingame) return;
        if (Player.position.x > width / -2 + 100) {
          Player.position.x -= 29;
          Player.rotation.y -= 0.03;
        } else if (Player.position.x > width / -2 + 50) {
          Player.position.x -= 0.3;
          Player.rotation.y -= 0.001;
        }
        window.requestAnimationFrame(render);
        return false;
      case 39: // right button
        if (!ingame) return;
        if (Player.position.x < width / 2 - 100) {
          Player.position.x += 29;
          Player.rotation.y += 0.03;
        } else if (Player.position.x < width / 2 - 50) {
          Player.position.x += 0.3;
          Player.rotation.y += 0.001;
        }
        window.requestAnimationFrame(render);
        return false;
    }
  };

  document.getElementById("play-button").onclick = function() {
    if (ingame) return;
    ingame = true;
    this.style.display = "none";
    document.getElementById("about").style.color = "rgba(0,0,0,0.1)";
    document.getElementById("projects").style.color = "rgba(0,0,0,0.1)";
    time.style.color = "rgba(0,0,0,1)";
    personalBest.style.color = "rgba(70,70,70,1)";
    player1();
  }

  function start() {
    if(localStorage.racer_best){
      var best = parseInt(localStorage.racer_best, 10);
      var minutes = Math.floor(best / 60);
      var seconds = best - minutes * 60;
      personalBest.innerHTML = formatTime(minutes, seconds);
    }
    speed = 14;
    displayTime(0, 0);
    intervals.forEach(clearInterval);
    intervals = [];
    initScene();
    render();
  }

  document.getElementById("restart-button").onclick = function() {
    document.getElementById("gameover").style.display = "none";
    document.getElementById("play-button").style.display = "block";
    start();
  };

  start();

}(window, THREE));
