(function(window) {

  var exports = window;

  exports.Timer = function(display) {
    this.display = display;
    this.reset();
  };

  exports.Timer.prototype.reset = function () {
    this.startTime = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.display.innerHTML = formatTime(0, 0);
  };

  exports.Timer.prototype.getScore = function () {
    return this.minutes * 60 + this.seconds;
  };

  exports.Timer.prototype.tick = function(time) {
    if (!this.startTime) {
      this.startTime = time;
    }

    if ((time - this.startTime) % 1000 <= 50 && (time - this.startTime) % 1000 >= -50) {
      this.seconds = Math.round((time - this.startTime) / 1000);
      if (this.seconds > 59) {
        this.seconds = 0;
        this.startTime = time;
        this.minutes++;
      }
      this.display.innerHTML = formatTime(this.minutes, this.seconds);
    }

    // TODO performance?
    return this.getScore();
  };

}(window));
