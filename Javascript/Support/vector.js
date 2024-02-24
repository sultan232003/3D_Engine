var vector = {
	x: 1,
	y: 0,
	z: 0,
	w: 0,

	create: function (x, y, z, w) {
		var obj = Object.create(this);
		obj.setX(x);
		obj.setY(y);
		obj.setZ(z);
		obj.setW(w);
		return obj;
	},

	setX: function (value) {
		this.x = value;
	},

	getX: function () {
		return this.x;
	},

	setY: function (value) {
		this.y = value;
	},

	getY: function () {
		return this.y;
	},

	setZ: function (value) {
		this.z = value;
	},

	getZ: function () {
		return this.Z;
	},

	setW: function (value) {
		this.w = value;
	},

	getW: function () {
		return this.w;
	},

	setAngle: function (angle) {
		var length = this.getLength();
		return {

			x: Math.cos(angle) * length,
			y: Math.sin(angle) * length
		}
	},

	fromAngle: function (angle) {
		x = Math.cos(angle) * 1;
		y = Math.sin(angle) * 1
		return { x: x, y: y }
	},

	getAngle: function () {
		return Math.atan2(this.y, this.x);
	},

	setLength: function (length) {
		var angle = this.getAngle();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	},

	getLength: function (p) {
		return Math.sqrt(p.x * p.x + p.y * p.y);
	},

	add: function (v2) {
		return vector.create(this.x + v2.getX(), this.y + v2.getY());
	},

	subtract: function (v2) {
		return vector.create(this.x - v2.getX(), this.y - v2.getY(), this.z - v2.getZ());
	},

	multiply: function (val) {
		return vector.create(this.x * val, this.y * val);
	},

	divide: function (val) {
		return vector.create(this.x / val, this.y / val);
	},

	addTo: function (v2) {
		this.x += v2.x;
		this.y += v2.y;
		this.z += v2.z;
	},

	subtractFrom: function (v2) {
		this.x -= v2.x;
		this.y -= v2.y;
		this.z -= v2.z;
	},

	multiplyBy: function (val) {
		this.x *= val;
		this.y *= val;
		this.z *= val;
	},

	divideBy: function (val) {
		this.x /= val;
		this.y /= val;
		this.z /= val;
	},

	normalize: function (val) {
		let l = vector.getLength(val)
		return val.x / l, val.y / l, val.x / l
	}
};