  export function getBubble() {
    let canvas = document.getElementById('canvas-bubble')
    let ctx = (<any>canvas).getContext('2d');
    let width = (<any>canvas).width = window.innerWidth;
    let height = (<any>canvas).height = window.innerHeight * 0.2;
    let particleCount = 100;
    let particles = [];
    let g = 10;

    function init() {
        for (var i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        var newParticle = new Particle();
        newParticle.initialize();
        particles.push(newParticle);
    }

    function Particle() {
        this.initialize = function() {
            this.x = Math.random() * width;
            this.y = Math.random() * height + height;
            this.v = 5 + Math.random() * 5;
            this.s = 5 + Math.random() * 5;
        }

        this.update = function() {
            this.x += Math.sin(this.s);
            this.s -= 0.1;
            this.y -= this.v * 0.5;
            if (this.isOutOfBounds()) {
                this.initialize();
            }
        }

        this.draw = function() {
            ctx.fillRect(this.x, this.y, this.s, this.s);
            ctx.fillStyle = "#FFF";
            ctx.fill();
        }

        this.isOutOfBounds = function() {
            return ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height));
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);

    function resize() {
        width = (<any>canvas).width = window.innerWidth;
        height = (<any>canvas).height = window.innerHeight;
    }

    init();
    render();
}

export function getWave() {
    // 兼容的requestAnimationFrame函数
let requestAnimationFrame = (function () {
    return window.requestAnimationFrame || webkitRequestAnimationFrame || function (
      callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  })();

  // 封装设置canvas大小的函数
  let setCanvasSize = function () {
    (<any>canvas).width = (<any>canvas).parentNode.offsetWidth;
  }

  // 获取canvas相关
  let canvas = document.querySelector('#canvas-wave');
  let ctx = (<any>canvas).getContext('2d');
  setCanvasSize();

  // 一些变量
  let boHeight = (<any>canvas).height / 30; // 顶峰高度
  let posHeight = (<any>canvas).height / 3; // 最低高度
  let step = 0; // 初始角度
  let colors = ['rgba(0, 150, 138, 0.6)', 'rgba(0, 150, 138, 0.3)', 'rgba(0, 150, 138, 0.1)'];

  // 绘制函数
  let paint = function () {
    ctx.clearRect(0, 0, (<any>canvas).width, (<any>canvas).height); // 清空画布
    step += 1; // 角度

    // 遍历colors数组，进行绘制
    colors.forEach((item, index) => {
      ctx.fillStyle = item; // 画笔的颜色
      let angle = (step + index * 100) * Math.PI / 60; // 相差的角度
      let deltaHeight = Math.sin(angle) * boHeight; // 线条左边的起点
      let deltaHeightRight = Math.cos(angle) * boHeight; //线条右边的终点
      ctx.beginPath();
      ctx.moveTo(0, posHeight + deltaHeight);
      ctx.bezierCurveTo((<any>canvas).width / 2, (posHeight + deltaHeight - boHeight) * 2, (<any>canvas).width * 2, (posHeight +
        deltaHeightRight - boHeight) / 2, (<any>canvas).width, (posHeight + deltaHeightRight) / 2); // 绘制贝塞尔曲线
      ctx.lineTo((<any>canvas).width, (<any>canvas).height); // 防止右侧出现空隙
      ctx.lineTo(0, (<any>canvas).height); // 防止左侧出现空隙
      ctx.closePath();
      ctx.fill();
    })

    requestAnimationFrame(paint); // 自调
  }

  // 调用绘制函数
  paint();

  // 响应式
  window.onresize = setCanvasSize;
}