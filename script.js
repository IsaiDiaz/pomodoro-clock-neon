class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerLabel: "Session",
      breakLength: 5,
      sessionLength: 25,
      sessionMin: 25,
      sessionSeg: 0,
      play: false,
      intervalId: "",
      changeTimer: false };

    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.changeTimerState = this.changeTimerState.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.handleChangeTimer = this.handleChangeTimer.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
  }
  incrementSession() {
    let increment = this.state.sessionLength + 1 > 60 ? 60 : this.state.sessionLength + 1;
    this.setState({
      sessionLength: increment, sessionMin: increment });

  }
  decrementSession() {
    let decrement = this.state.sessionLength - 1 < 1 ? 1 : this.state.sessionLength - 1;this.setState({
      sessionLength: decrement, sessionMin: decrement });

  }
  incrementBreak() {
    this.setState(state => {
      return { breakLength: state.breakLength + 1 > 60 ? 60 : state.breakLength + 1 };
    });
  }
  decrementBreak() {
    this.setState(state => {
      return { breakLength: state.breakLength - 1 < 1 ? 1 : state.breakLength - 1 };
    });
  }
  reset() {
    if (this.state.intervalId !== "") {
      this.stopCountDown();
    }
    let audio = document.getElementById("beep");
    audio.pause();
    audio.load();
    this.setState({
      timerLabel: "Session",
      breakLength: 5,
      sessionLength: 25,
      sessionMin: 25,
      sessionSeg: 0,
      play: false,
      intervalId: "" });

    $(".timer-session-area").addClass("paused");
    $(".timer-session-area").removeClass("active");
    $(".timer-session-area").removeClass("break-time");
  }
  changeTimerState() {
    if (this.state.play) {
      this.setState({
        play: false });

      $(".timer-session-area").addClass("paused");
      $(".timer-session-area").removeClass("active");
      $(".timer-session-area").removeClass("break-time");
      if (this.state.intervalId !== "") {
        this.stopCountDown();
      }
    } else {
      this.setState({
        play: true });

      if (this.state.timerLabel === "Session") {
        $(".timer-session-area").addClass("active");
        $(".timer-session-area").removeClass("paused");
        $(".timer-session-area").removeClass("break-time");
      } else {
        $(".timer-session-area").addClass("break-time");
        $(".timer-session-area").removeClass("paused");
        $(".timer-session-area").removeClass("active");
      }
      if (this.state.intervalId === "")
      this.beginCountDown();
    }
  }
  handleChangeTimer() {
    let seg = this.state.sessionSeg - 1 < 0 ? 59 : this.state.sessionSeg - 1;
    let min = this.state.sessionSeg - 1 < 0 ? this.state.sessionMin - 1 : this.state.sessionMin;
    if (!this.state.changeTimer) {
      if (min === 0 && seg === 0) {
        this.setState({
          sessionSeg: seg, sessionMin: min, changeTimer: true });

      } else {
        this.setState({
          sessionSeg: seg, sessionMin: min });

      }
    } else {
      this.playAlarm();
      this.changeTimer();
    }
  }
  beginCountDown() {
    var intervalId = setInterval(this.handleChangeTimer, 1000);

    this.setState({
      intervalId: intervalId });

  }
  stopCountDown() {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: "" });

  }
  playAlarm() {
    let audio = document.getElementById("beep");
    audio.play();
  }
  changeTimer() {
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    if (this.state.timerLabel === "Session") {
      this.setState({
        sessionSeg: 0, sessionMin: breakLength, timerLabel: "Break", changeTimer: false });

      $(".timer-session-area").addClass("break-time");
      $(".timer-session-area").removeClass("active");
      $(".timer-session-area").removeClass("paused");
    } else {
      this.setState({
        sessionSeg: 0, sessionMin: sessionLength, timerLabel: "Session", changeTimer: false });

      $(".timer-session-area").addClass("active");
      $(".timer-session-area").removeClass("paused");
      $(".timer-session-area").removeClass("break-time");
    }
  }
  render() {
    let min = this.state.sessionMin + "";
    let seg = this.state.sessionSeg + "";
    if (min.length < 2) {
      min = "0" + min;
    }
    if (seg.length < 2) {
      seg = "0" + seg;
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "clock" }, /*#__PURE__*/
      React.createElement("div", { className: "control-area" }, /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("button", { className: "control-button", id: "break-decrement", title: "decrement break", onClick: this.decrementBreak }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-arrow-down" })), /*#__PURE__*/

      React.createElement("span", { id: "break-length", className: "control-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("button", { className: "control-button", id: "break-increment", title: "increment break", onClick: this.incrementBreak }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-arrow-up" }))), /*#__PURE__*/


      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("button", { className: "control-button", id: "session-decrement", title: "decrement session", onClick: this.decrementSession }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-arrow-down" })), /*#__PURE__*/

      React.createElement("span", { id: "session-length", className: "control-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("button", { className: "control-button", id: "session-increment", title: "increment session", onClick: this.incrementSession }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-arrow-up" })))), /*#__PURE__*/



      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { className: "timer-session-area paused" }, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, this.state.timerLabel), /*#__PURE__*/
      React.createElement("p", { id: "time-left" }, min, ":", seg)), /*#__PURE__*/

      React.createElement("div", { className: "timer-control-area" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", className: "control-button", title: "play/pause", onClick: this.changeTimerState }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-play" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-pause" })), /*#__PURE__*/

      React.createElement("button", { id: "reset", className: "control-button", title: "reset", onClick: this.reset }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-solid fa-arrow-rotate-left" })))), /*#__PURE__*/



      React.createElement("p", { id: "credits" }, "Made By: ", /*#__PURE__*/React.createElement("a", { href: "https://www.facebook.com/Isai.Diaz.Soza/", target: "_blanck" }, "Jos\xE9 Isa\xED D\xEDaz Soza")), /*#__PURE__*/
      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("root"));