const NUM = 3;
const PARTS = NUM * 3 + 1;
const ACTIVE_COLOR = '#5AA5FE';
const ERROR_COLOR = '#DA3300';
function Circle(canvas, number) {
    this.canvas = canvas;
    if (!this.canvas) {
        throw('[Circle] canvas element is expected.');
    }
    this.ctx = canvas.getContext('2d');
    this.number = number;
    this.status = 'default';
    this.radius = Math.round(this.canvas.width / PARTS);
    this.radiusSquare = this.radius * this.radius;
    this.diameter = this.radius * 2;
    this.row = Math.ceil(number / NUM);
    this.col = ((number - 1) % NUM) + 1;
    this.x = this.getX();
    this.y = this.getY();
}
const CircleProto = Circle.prototype;
CircleProto.draw = function () {
    const startX = this.x;
    const startY = this.y;
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#878AA1';

    this.ctx.beginPath();
    this.ctx.arc(startX, startY, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.closePath();
};
CircleProto.drawRich = function (color) {
    const startX = this.x;
    const startY = this.y;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, this.radius / 3, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
};
CircleProto.drawActive = function () {
    this.drawRich(ACTIVE_COLOR);
};
CircleProto.drawError = function () {
    this.drawRich(ERROR_COLOR);
};
CircleProto.getX = function () {
    const m = this.col - 1;
    const n = this.col;
    return m * this.diameter + n * this.radius + this.radius;
};
CircleProto.getY = function () {
    const m = this.row - 1;
    const n = this.row;
    return m * this.diameter + n * this.radius + this.radius;
};
CircleProto.inCircle = function (p) {
    const a = (this.x - p.x);
    const b = (this.y - p.y);
    return (a * a + b * b) < (this.radiusSquare) * 1.1;
};
CircleProto.reset = function () {
};
function Line(canvas) {
    this.canvas = canvas;
    if (!this.canvas) {
        throw('[Line] canvas element is expected.');
    }
    this.ctx = canvas.getContext('2d');
    this.hash = {};
    this.list = [];
}
Line.prototype.add = function (i, circle) {
    if (this.hash[i]) {
        return;
    }
    this.hash[i] = true;
    this.list.push(circle);
    this.draw();
};
Line.prototype.draw = function (color = ACTIVE_COLOR) {
    const first = this.list[0];
    if (!first) {
        return;
    }
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    ctx.strokeStyle = color;
    for (let i = 1; i < this.list.length; i++) {
        const circle = this.list[i];
        ctx.lineTo(circle.x, circle.y);
    }
    ctx.stroke();
};
Line.prototype.drawError = function () {
    this.draw(ERROR_COLOR);
};
Line.prototype.getValue = function () {
    return this.list.map(v => {
        return v.number;
    });
};
Line.prototype.reset = function () {
    this.hash = {};
    this.list = [];
};
export {
    NUM,
    Circle,
    Line
};