(function (window, THREE) {
  var exports = window;

  exports.Scene = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    // LIGHTING
    var ambientLight = new THREE.AmbientLight(0x111111);
    this.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(1000, 2000, 1500);
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowDarkness = 0.3;
    spotLight.shadowCameraFov = 30;
    this.add(spotLight);

    var texture = THREE.ImageUtils.loadTexture( "../stars.jpg" );

    var hemisphereLight = new THREE.HemisphereLight(0xcccccc, 0xcccccc, 1);
    this.add(hemisphereLight);

    // STARS
    this.stars = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 3, height * 3),
      new THREE.MeshBasicMaterial({
        map : texture
      })
    );
    this.stars.position.z = -220;
    this.stars.position.y = height * 1.6;
    this.stars.rotation.x = Math.PI * 0.1;

    // PLANE
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height * 100),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );
    this.plane.receiveShadow = true;
    this.plane.position.z = 0;

    // initialize with white
    this.toWhite();
  };

  exports.Scene.prototype = new THREE.Scene();

  exports.Scene.prototype.toWhite = function () {
    this.fog = new THREE.Fog(0xffffff, 600, 3000);
    this.remove(this.stars);
    this.add(this.plane);
  };

  exports.Scene.prototype.toBlack = function () {
    this.fog = new THREE.Fog(0x111111, 200, 4000);
    this.remove(this.plane);
    this.add(this.stars);
  };


}(window, window.THREE));
