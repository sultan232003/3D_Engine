const Toolbar = document.getElementById("toolbar")
const Move_tool = document.getElementById("move_tool")
const Rotate_tool = document.getElementById("rotate_tool")
const Origin_tool = document.getElementById("origin_tool")
const Tool = document.querySelectorAll(".tool")

let camera = vector.create(0, 0, 1, 0)

let up = vector.create(0, 1, 0)
// let camera2 = vector.create(0, 0, 0)
let lookdir = vector.create(0, 0, 1)
let vTarget = vector.create()
vTarget.x = camera.x + lookdir.x
vTarget.y = camera.y + lookdir.y
vTarget.z = camera.z + lookdir.z
let mat_camera
let mat_view = new Matrix(4, 4)

document.addEventListener("keydown", (e) => {
    // print(keypressed_code)
    switch (keypressed_code) {
        case 76: // LEFT -L-
            camera.x += 0.05
            break;
        case 82: // RIGHT -R-
            camera.x -= 0.05
            break;
        case 85: // UP -U-
            camera.y += 0.05
            break;
        case 68: // DOWN -D-
            camera.y -= 0.05
            break;
        case 70: // FORWARD -F-
            camera.z -= 0.05
            break;
        case 66: // BACK -B-
            camera.z += 0.05
            break;
    }
})

const point_at = (pos, target, up) => {
    let forward = vector.create()
    forward.x = target.x = pos.x
    forward.y = target.y = pos.y
    forward.z = target.z = pos.z
    let forward_length = sqrt(forward.x * forward.x + forward.y * forward.y + forward.z * forward.z)
    forward.x = forward.x / forward_length
    forward.y = forward.y / forward_length
    forward.z = forward.z / forward_length

    let a = vector.create()
    a.x = forward.x * (up.x * forward.x) + (up.y * forward.y) + (up.z * forward.z)
    a.y = forward.y * (up.x * forward.x) + (up.y * forward.y) + (up.z * forward.z)
    a.z = forward.z * (up.x * forward.x) + (up.y * forward.y) + (up.z * forward.z)
    let new_up = vector.create()
    new_up.x = up.x - a.x
    new_up.y = up.y - a.y
    new_up.z = up.z - a.z
    let new_up_length = sqrt(new_up.x * new_up.x + new_up.y * new_up.y + new_up.z * new_up.z)
    new_up.x = up.x / new_up_length
    new_up.y = up.y / new_up_length
    new_up.z = up.z / new_up_length

    let newRight = vector.create()
    newRight.x = new_up.y * forward.z - new_up.z * forward.y;
    newRight.y = new_up.z * forward.x - new_up.x * forward.z;
    newRight.z = new_up.x * forward.y - new_up.y * forward.x;

    let dimension = new Matrix(4, 4)
    dimension.matrix_val[0][0] = newRight.x;
    dimension.matrix_val[0][1] = newRight.y;
    dimension.matrix_val[0][2] = newRight.z;
    dimension.matrix_val[0][3] = 0;
    dimension.matrix_val[1][0] = new_up.x;
    dimension.matrix_val[1][1] = new_up.y;
    dimension.matrix_val[1][2] = new_up.z;
    dimension.matrix_val[1][3] = 0;
    dimension.matrix_val[2][0] = forward.x;
    dimension.matrix_val[2][1] = forward.y;
    dimension.matrix_val[2][2] = forward.z;
    dimension.matrix_val[2][3] = 0;
    dimension.matrix_val[3][0] = pos.x;
    dimension.matrix_val[3][1] = pos.y;
    dimension.matrix_val[3][2] = pos.z;
    dimension.matrix_val[3][3] = 1;
    return dimension;
}

const Matrix_QuickInverse = (val) => {
    let quickInverse = new Matrix(4, 4)
    quickInverse.matrix_val[0][0] = val.matrix_val[0][0];
    quickInverse.matrix_val[0][1] = val.matrix_val[1][0];
    quickInverse.matrix_val[0][2] = val.matrix_val[2][0];
    quickInverse.matrix_val[0][3] = 0;
    quickInverse.matrix_val[1][0] = val.matrix_val[0][1];
    quickInverse.matrix_val[1][1] = val.matrix_val[1][1];
    quickInverse.matrix_val[1][2] = val.matrix_val[2][1];
    quickInverse.matrix_val[1][3] = 0;
    quickInverse.matrix_val[2][0] = val.matrix_val[0][2];
    quickInverse.matrix_val[2][1] = val.matrix_val[1][2];
    quickInverse.matrix_val[2][2] = val.matrix_val[2][2];
    quickInverse.matrix_val[2][3] = 0;
    quickInverse.matrix_val[3][0] = -(val.matrix_val[3][0] * quickInverse.matrix_val[0][0] + val.matrix_val[3][1] * quickInverse.matrix_val[1][0] + val.matrix_val[3][2] * quickInverse.matrix_val[2][0]);
    quickInverse.matrix_val[3][1] = -(val.matrix_val[3][0] * quickInverse.matrix_val[0][1] + val.matrix_val[3][1] * quickInverse.matrix_val[1][1] + val.matrix_val[3][2] * quickInverse.matrix_val[2][1]);
    quickInverse.matrix_val[3][2] = -(val.matrix_val[3][0] * quickInverse.matrix_val[0][2] + val.matrix_val[3][1] * quickInverse.matrix_val[1][2] + val.matrix_val[3][2] * quickInverse.matrix_val[2][2]);
    quickInverse.matrix_val[3][3] = 1;
    return quickInverse;
}


class create {
    constructor(x, y, z, scale_X, scale_Y, scale_Z, rotate_X, rotate_Y, rotate_Z, model, stroke, filled) {
        this.origin_x = x
        this.origin_y = y
        this.origin_z = z
        this.x = this.origin_x
        this.y = this.origin_y
        this.z = this.origin_z
        this.scale_X = scale_X
        this.scale_y = scale_Y
        this.scale_Z = scale_Z
        this.rotate_X = rotate_X
        this.rotate_Y = rotate_Y
        this.rotate_Z = rotate_Z
        this.model = model
        this.line1 = vector.create()
        this.line2 = vector.create()
        this.normal = vector.create()
        this.dist = 2
        this.l
        this.l2
        this.model_vertex = []
        this.model_edges = []
        this.dotproduct
        this.offset = vector.create()
        this.stroke = stroke || false
        this.filled = filled || false
        this.index = 1
        this.hover = false
        this.selected_drag = false
        this.selected_move = false
        this.selected_rotate = false
        this.selected_drag_rotate = false
        this.selected_origin = false
        this.selected_drag_origin = false
        this.hover_distance


        // let light = vector.create(0, 0, 100, 0)
        this.model_mat = new Matrix(this.model.length / 4, 4, model)
        for (let i = 0; i < this.model_mat.matrix_val.length; i++) {
            if (this.model_mat.matrix_val[i][0] == "v") {
                this.model_vertex.push(
                    Matrix.vec_to_mat(vector.create(this.model_mat.matrix_val[i][1], this.model_mat.matrix_val[i][2], this.model_mat.matrix_val[i][3], 1)))
            }
        }
        for (let i = 0; i < this.model_mat.matrix_val.length; i++) {
            if (this.model_mat.matrix_val[i][0] == "f") {
                this.model_edges.push([this.model_mat.matrix_val[i][1], this.model_mat.matrix_val[i][2], this.model_mat.matrix_val[i][3]]
                )
            }
        }
        this.see = []
        for (let i = 0; i < this.model_vertex.length; i++) {
            this.see.push(new Matrix(4, 1))

        }
        this.check = []
    }

    show() {
        mat_camera = point_at(camera, vTarget, up)
        mat_view = Matrix_QuickInverse(mat_camera)

        for (let i = 0; i < this.model_edges.length; i++) {
            if (i < this.model_vertex.length) {
                this.model_vertex[i] = Matrix.rotate_X_Y_Z_T_S(this.model_vertex[i], this.rotate_X, this.rotate_Y, this.rotate_Z, this.x, this.y, this.z, this.scale_X, this.scale_y, this.scale_Z)
                this.see[i].matrix_val[0][0] = this.model_vertex[i].x
                this.see[i].matrix_val[1][0] = this.model_vertex[i].y
                this.see[i].matrix_val[2][0] = this.model_vertex[i].z
                this.see[i].matrix_val[3][0] = this.model_vertex[i].w
                this.check[i] = mat_view.mat_mul(this.see[i])
            }
        }
        for (let i = 0; i < this.model_edges.length; i++) {
            this.line1.x = this.check[this.model_edges[i][1]].matrix_val[0][0] - this.check[this.model_edges[i][0]].matrix_val[0][0]
            this.line1.y = this.check[this.model_edges[i][1]].matrix_val[1][0] - this.check[this.model_edges[i][0]].matrix_val[1][0]
            this.line1.z = this.check[this.model_edges[i][1]].matrix_val[2][0] - this.check[this.model_edges[i][0]].matrix_val[2][0]
            this.line2.x = this.check[this.model_edges[i][2]].matrix_val[0][0] - this.check[this.model_edges[i][0]].matrix_val[0][0]
            this.line2.y = this.check[this.model_edges[i][2]].matrix_val[1][0] - this.check[this.model_edges[i][0]].matrix_val[1][0]
            this.line2.z = this.check[this.model_edges[i][2]].matrix_val[2][0] - this.check[this.model_edges[i][0]].matrix_val[2][0]
            this.normal.x = this.line1.y * this.line2.z - this.line1.z * this.line2.y;
            this.normal.y = this.line1.z * this.line2.x - this.line1.x * this.line2.z;
            this.normal.z = this.line1.x * this.line2.y - this.line1.y * this.line2.x;
            this.l = sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y + this.normal.z * this.normal.z);
            this.normal.x /= this.l; this.normal.y /= this.l; this.normal.z /= this.l;
            if (this.normal.z > 0) {
                // if (this.normal.x * this.model_vertex[0].x - camera.x +
                //     this.normal.y * this.model_vertex[0].y - camera.y +
                //     this.normal.z * this.model_vertex[0].z - camera.z < 0) {
                this.l2 = sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
                light.x /= this.l2; light.y /= this.l2; light.z /= this.l2;
                this.dotproduct = abs(this.normal.x * light.x + this.normal.y * light.y + this.normal.z * light.z) * 10
                ctx.beginPath()
                ctx.moveTo(this.check[this.model_edges[i][0]].matrix_val[0][0], this.check[this.model_edges[i][0]].matrix_val[1][0])
                ctx.lineTo(this.check[this.model_edges[i][1]].matrix_val[0][0], this.check[this.model_edges[i][1]].matrix_val[1][0])
                ctx.lineTo(this.check[this.model_edges[i][2]].matrix_val[0][0], this.check[this.model_edges[i][2]].matrix_val[1][0])
                ctx.lineTo(this.check[this.model_edges[i][0]].matrix_val[0][0], this.check[this.model_edges[i][0]].matrix_val[1][0])
                if (this.stroke == true) {
                    ctx.stroke()
                    ctx.strokeStyle = "white"
                }
                if (this.filled == true) {
                    ctx.fillStyle = rgbToHex(this.dotproduct, this.dotproduct, this.dotproduct)
                    ctx.fill()
                    ctx.closePath()
                }
            }
        }
        text(8, "#ffffff", "Selected_Drag : " + this.selected_drag, this.x + this.scale_X + 5, this.y + this.scale_y, 1)
        text(8, "#ffffff", "Selected_Move : " + this.selected_move, this.x + this.scale_X + 5, this.y + this.scale_y - 12, 1)
        text(8, "#ffffff", "Selected_Rotate : " + this.selected_rotate, this.x + this.scale_X + 5, this.y + this.scale_y - 24, 1)
        text(8, "#ffffff", "Selected_Drag_Rotate : " + this.selected_drag_rotate, this.x + this.scale_X + 5, this.y + this.scale_y - 36, 1)
        text(8, "#ffffff", "Selected_Origin : " + this.selected_origin, this.x + this.scale_X + 5, this.y + this.scale_y - 48, 1)
        text(8, "#ffffff", "Selected_Drag_Origin : " + this.selected_drag_origin, this.x + this.scale_X + 5, this.y + this.scale_y - 60, 1)
    }

    move() {
        document.addEventListener("keydown", (e) => {
            if (this.selected_move) {
                switch (keypressed) {
                    case "ArrowUp":
                        this.y -= 5
                        break;
                    case "ArrowDown":
                        this.y += 5
                        break;
                    case "ArrowLeft":
                        this.x -= 5
                        break;
                    case "ArrowRight":
                        this.x += 5
                        break;
                }
            }
            if (this.selected_rotate) {
                switch (keypressed) {
                    case "ArrowUp":
                        if (e.shiftKey) {
                            this.rotate_Z -= 0.05
                        }
                        else {
                            this.rotate_X -= 0.05
                        }
                        break;
                    case "ArrowDown":
                        if (e.shiftKey) {
                            this.rotate_Z += 0.05
                        } else {
                            this.rotate_X += 0.05
                        }
                        break;
                    case "ArrowLeft":
                        this.rotate_Y += 0.05
                        break;
                    case "ArrowRight":
                        this.rotate_Y -= 0.05
                        break;
                }
            }
        })
        return
    }

    updateMove() {
        if (Move_tool.classList.contains("active")) {
            this.hover_distance = utils.findhover(mouseX - centerX, mouseY - centerY, this.x, this.y)
            this.hover = utils.checkhover(this.hover_distance, this.scale_X)
            document.addEventListener("mousedown", (e) => {
                if (this.hover) {
                    this.selected_drag = true
                    this.offset.x = (mouseX - centerX) - this.x
                    this.offset.y = (mouseY - centerY) - this.y
                }
            })
            document.addEventListener("mouseup", (e) => {
                this.selected_drag = false
            })
            document.addEventListener("click", (e) => {
                this.selected_move = utils.checkclick(this.hover, this.selected_move)
            })
        } else {
            this.hover = false
            this.selected_drag = false
            this.selected_move = false
        }

        document.addEventListener("mousemove", () => {
            if (this.selected_drag) {
                if (keypressed == "y") {
                    this.y = (mouseY - centerY) - this.offset.y
                } else if (keypressed == "x") {
                    this.x = (mouseX - centerX) - this.offset.x
                } else {
                    this.x = (mouseX - centerX) - this.offset.x
                    this.y = (mouseY - centerY) - this.offset.y
                }
            }
        })
    }

    updateRotate() {
        if (Rotate_tool.classList.contains("active")) {
            this.hover_distance = utils.findhover(mouseX - centerX, mouseY - centerY, this.x, this.y)
            this.hover = utils.checkhover(this.hover_distance, this.scale_X)
            document.addEventListener("mousedown", () => {
                if (this.hover) {
                    this.selected_drag_rotate = true
                }
            })
            document.addEventListener("mouseup", (e) => {
                this.selected_drag_rotate = false
            })
            document.addEventListener("click", (e) => {
                this.selected_rotate = utils.checkclick(this.hover, this.selected_rotate)
            })
        } else {
            this.selected_rotate = false
            this.selected_drag_rotate = false
        }

        document.addEventListener("mousemove", () => {
            if (this.selected_drag_rotate) {
                if (keypressed == "y") {
                    this.rotate_Y = (mouseX - centerX) / 57.5
                } else if (keypressed == "x") {
                    this.rotate_X = (mouseY - centerY) / 57.5
                } else {
                    this.rotate_Z = findAngleBetween(this.x, this.y, mouseX - centerX, mouseY - centerY) / 57.5
                }
            }
        })
    }

    updateOrigin(){
        if (Origin_tool.classList.contains("active")){
            this.hover_distance = utils.findhover(mouseX - centerX, mouseY - centerY, this.x, this.y)
            this.hover = utils.checkhover(this.hover_distance, this.scale_X)
            document.addEventListener("mousedown", () => {
                if (this.hover) {
                    this.selected_drag_origin = true
                }
            })
            document.addEventListener("mouseup", (e) => {
                this.selected_drag_origin = false
            })
            document.addEventListener("click", (e) => {
                this.selected_origin = utils.checkclick(this.hover, this.selected_origin)
            })
        } else {
            this.selected_origin = false
            this.selected_drag_origin = false
        }
    }

    track() {
        if (this.hover) {
            drawCircle(this.x, this.y, this.scale_X, "#ffffff", 1, false)
        }
    }
}
