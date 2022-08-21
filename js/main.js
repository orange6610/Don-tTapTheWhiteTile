window.onload = function () {
  //   alert("111111");
  //定义游戏状态，0为初始，1为进行中，2为暂停，3为失败
  var clock = null;
  var state = 0;
  var speed = 2; //初始下落速度
  var con = document.querySelector(".container");

  //初始化
  function init() {
    console.log("state:" + state);
    if (state == 3) {
      // window.location.reload();
      console.log(clock);
      return;
    }
    for (var i = 0; i < 4; i++) {
      createRow();
    }
    document.querySelector(".main").addEventListener("click", function (ev) {
      // console.log("init");
      // console.log(ev);
      judge(ev);
    });
  }
  //start()启动
  function start() {
    // console.log("start");
    clock = setInterval(function () {
      move();
    }, 30);
  }

  //点击事件的判断
  function judge(ev) {
    if (state == 2 || state == 3) {
      return;
    }
    if (ev.target.className.indexOf("black") == -1) {
      over();
    } else {
      ev.target.className = "block";
      ev.target.parentNode.pass = 1;
      score();
    }
  }
  //动画
  function move() {
    // console.log("move");
    // var con = document.querySelector(".container");
    var top = parseInt(window.getComputedStyle(con, null)["top"]);
    // console.log(top, speed);
    if (speed + top > 0) top = 0;
    else {
      top += speed; //调节下降速度
      con.style.top = top + "px";
    }
    // console.log(top, speed);
    // console.log(con.style.top);
    if (top == 0) {
      createRow();
      con.style.top = "-100px";
      dropRow();
    } else if (top == speed - 100) {
      var rows = con.childNodes;
      if (rows.length == 5 && rows[4].pass !== 1) {
        over();
      }
    }
  }

  //游戏结束
  function over() {
    clearInterval(clock);
    state = 3;
    var overGame = document.querySelector(".over");
    overGame.style.display = "block";
    var btn1 = document.querySelector("#btn1");
    btn1.addEventListener("click", function () {
      // console.log(222);
      window.location.reload();
    });
  }
  // over();

  //计分 每获得10分加速一次
  function score() {
    var score = document.querySelector(".score");
    var newScore = parseInt(score.innerHTML) + 1;
    score.innerHTML = newScore;
    // console.log(newScore);
    if (newScore % 10 == 0) {
      speedBlock();
    }
  }
  //加速 20封顶
  function speedBlock() {
    if (speed == 20) {
      return;
    }
    speed++;
  }

  //随机生成一行白块 四个中一个黑的
  function creatBlock() {
    var arr = ["block", "block", "block", "block"];
    var i = Math.floor(Math.random() * 4);
    arr[i] = "block black";
    return arr;
  }
  //   var arr = creatBlock();
  //   console.log(arr);

  //创建一个div，并且为他设置class值
  function createDiv(className) {
    var div = document.createElement("div");
    div.className = className;
    return div;
  }
  //创建div.row
  function createRow() {
    // var con = document.querySelector(".container");
    var row = createDiv("row");
    var classes = creatBlock();
    // console.log(classes);
    // console.log(classes[0], classes[1], classes[2], classes[3]);
    for (var i = 0; i < 4; i++) {
      row.appendChild(createDiv(classes[i]));
    }
    // console.log(row);
    // console.log(con);
    if (con.firstChild == null) {
      con.appendChild(row);
    } else {
      con.insertBefore(row, con.firstChild);
    }
  }
  //删除最后一行
  function dropRow() {
    if (con.childNodes.length == 6) con.removeChild(con.lastChild);
  }

  //开始按钮 加速按钮和暂停按钮
  var btn2 = document.querySelector("#btn2"); //加速
  var btn3 = document.querySelector("#btn3"); //暂停
  var btn4 = document.querySelector("#btn4"); //开始
  btn2.addEventListener("click", function () {
    speedBlock();
    // console.log(speed);
  });
  btn3.addEventListener("click", function () {
    if (state == 3) return;
    clearInterval(clock);
    state = 2;
  });
  btn4.addEventListener("click", function () {
    if (state == 2) {
      // console.log(1111);
      state = 1;
      start();
    }
  });
  init();
  start();
};
