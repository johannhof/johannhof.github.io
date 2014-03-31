(function(window, THREE) {
  var document = window.document;
  var localStorage = window.localStorage;
  var height = window.innerHeight;
  var width = window.innerWidth;

  if (width < 1024) {
    return;
  }

  var ingame = false;

  var timeDisplay = document.getElementById("time");
  var about = document.getElementById("about");
  var buttons = document.getElementById("buttons");
  var gameover = document.getElementById("gameover");
  var projects = document.getElementById("projects");
  var playButton = document.getElementById("play-button");
  var personalBest = document.getElementById("personal-best");
  var restartButton = document.getElementById("restart-button");

  // show game elements after they had their first animation
  setTimeout(function() {
    buttons.style.visibility = "visible";
    timeDisplay.style.visibility = "visible";
    personalBest.style.visibility = "visible";
  }, 1000);

  var scene = new Scene();

  var player = new Player();
  scene.add(player);

  var obstacles = new Obstacles(player);
  scene.add(obstacles);

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.rotation.x = 0.9;
  camera.position.z = 1000;
  camera.position.y = -700;

  var renderer = new THREE.WebGLRenderer({
    //clearAlpha: 1,
    //alpha : true,
    antialias: true
  });
  renderer.setClearColor(0xfcfcfc, 1);
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  //renderer.shadowMapType = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  var timer = new Timer(timeDisplay);

  function render() {
    renderer.render(scene, camera);
  }

  function changeToBlack() {
    document.body.style.color = "white";

    player.toModel();
    obstacles.toDark();
    scene.toBlack();
    renderer.setClearColor(0x111111, 0);
  }

  function changeToWhite() {
    document.body.style.color = "black";
    document.body.style.backgroundImage = 'none';

    player.toMesh();
    obstacles.toLight();
    scene.toWhite();
    renderer.setClearColor(0xfcfcfc, 1);
  }

  function lose() {
    gameover.style.display = "block";
    about.style.opacity = "1";
    projects.style.opacity = "1";
    ingame = false;
  }

  function move(time) {
    obstacles.cleanUp();
    obstacles.move();

    var t = timer.tick(time);

    if(t === 10){
      changeToBlack();
    }

    if(t === 60){
      changeToWhite();
    }

    if(t === 75){
      changeToBlack();
    }

    if (ingame && Math.random() * 1000 < 30) {
      obstacles.createOne();
    }

    if (obstacles.checkCollision()) {
      var score = timer.getScore();
      if (!(localStorage.racer_best && localStorage.racer_best > score)) {
        localStorage.racer_best = score;
      }
      lose();
    } else {
      window.requestAnimationFrame(move);
    }

    render();
  }

  function player2() {
    if (player.position.y <= 80) {
      window.requestAnimationFrame(player2);
      player.position.y += 5;
      render();
    } else {
      buttons.style.opacity = "1";
      setTimeout(function() {
        buttons.style.opacity = "0";
      }, 5000);

      window.requestAnimationFrame(move);
    }
  }

  function player1() {
    if (player.rotation.z <= 0 || player.rotation.z >= 0.1) {
      window.requestAnimationFrame(player1);
      player.rotateZ(0.03);
      player.position.z += 0.7;
      player.position.x += 1;
      render();
    } else {
      window.requestAnimationFrame(player2);
    }
  }

  window.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37: // left button
        if (ingame) {
          player.left();
        }
        return false;
      case 39: // right button
        if (ingame) {
          player.right();
        }
        return false;
    }
  };

  playButton.onclick = function() {
    if (ingame) return;
    ingame = true;
    this.style.display = "none";
    about.style.opacity = "0.1";
    projects.style.opacity = "0.1";
    timeDisplay.style.opacity = "1";
    personalBest.style.opacity = "1";
    player1();
  }

  function start() {
    if (localStorage.racer_best) {
      var best = parseInt(localStorage.racer_best, 10);
      var minutes = Math.floor(best / 60);
      var seconds = best - minutes * 60;
      personalBest.innerHTML = formatTime(minutes, seconds);
    }
    render();
  }

  restartButton.onclick = function() {
    changeToWhite();

    player.resetPosition();
    obstacles.reset();

    timer = new Timer(timeDisplay);

    gameover.style.display = "none";
    playButton.style.display = "block";

    start();
  };

  start();

}(window, THREE));
