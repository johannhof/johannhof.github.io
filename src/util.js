(function(window, THREE) {
  var exports = window;

  exports.randomPointInSphere = function(radius) {
    return new THREE.Vector3(
      (Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius, (Math.random() - 0.5) * 2 * radius
    );
  };

  exports.formatTime = function(minutes, seconds) {
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  };

}(window, window.THREE))
