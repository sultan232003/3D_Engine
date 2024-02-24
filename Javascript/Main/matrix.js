class Matrix {
    constructor(rows, cols, matrix_data) {
        this.rows = rows
        this.cols = cols
        this.matrix_val = []
        this.matrix_data = matrix_data
        let matrix = []
        let k = -1
        if (this.matrix_data == undefined) {
            for (let i = 0; i < this.rows; i++) {
                this.matrix_val[i] = []
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] = 0
                }
            }
        } else {
            if (this.matrix_data.length < this.cols * this.rows) {
                print(+"THE LENGTH OF THE MATRIX DATA SHOULD BE " + this.cols * this.rows)
                return undefined
            } else {
                for (let i = 0; i < matrix_data.length; i++) {
                    if (i % cols === 0) {
                        k++;
                        matrix[k] = [];
                    }
                    matrix[k].push(matrix_data[i]);
                }
                for (let i = 0; i < this.rows; i++) {
                    this.matrix_val[i] = []
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix_val[i][j] = matrix[i][j]
                    }
                }
            }
        }
    }

    static array_to_mat(matrix_data, cols) {
        var matrix = []
        let result = new Matrix(matrix_data.length / cols, cols)
        let k = -1
        for (let i = 0; i < matrix_data.length; i++) {
            if (i % cols === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(matrix_data[i]);
        }
        for (let i = 0; i < this.rows; i++) {
            this.matrix_val[i] = []
            for (let j = 0; j < this.cols; j++) {
                result.matrix_val[i][j] = matrix[i][j]
            }
        }
    }

    static vec_to_mat(value) {
        let result = new Matrix(4, 1)
        result.matrix_val[0][0] = value.x
        result.matrix_val[1][0] = value.y
        result.matrix_val[2][0] = value.z
        result.matrix_val[3][0] = value.w
        return result
    }

    static mat_to_vec(value) {
        let result = vector.create()
        result.x = value.matrix_val[0][0]
        result.y = value.matrix_val[1][0]
        if (value.length > 2) {
            result.z = value.matrix_val[2][0]
            result.w = value.matrix_val[3][0]
        } else {
            return result

        }

    }

    mat_random() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix_val[i][j] = floor(random(10))
            }
        }
    }

    mat_mul(value) {
        if (value instanceof Matrix) {
            if (this.cols != value.rows) {
                print("cols of A must be equal to rows of B")
                return undefined
            } else {
                let result = new Matrix(this.rows, value.cols)
                for (let i = 0; i < result.rows; i++) {
                    for (let j = 0; j < result.cols; j++) {
                        let sum = 0
                        for (let k = 0; k < this.cols; k++) {
                            sum += this.matrix_val[i][k] * value.matrix_val[k][j]
                        }
                        result.matrix_val[i][j] = sum
                    }
                }
                return result
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] *= value
                }
            }
        }
    }

    mat_add(value) {
        if (value instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] += value.matrix_val[i][j]
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] += value
                }
            }
        }
    }

    mat_sub(value) {
        if (value instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] -= value.matrix_val[i][j]
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] -= value
                }
            }
        }
    }

    mat_div(value) {
        if (value instanceof Matrix) {
            print("Matrix cannot be divided by another Matrix")
            return undefined
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix_val[i][j] /= value
                }
            }
        }
    }

    transpose() {
        let result = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix_val[j][i] = this.matrix_val[i][j]
            }
        }
        return result
    }

    static grid(width) {
        for (let i = 0; i < (canvas_width / 2) / width; i++) {
            drawline4val(i * width, -canvas_height / 2, i * width, canvas_height / 2, "white", 0.1)
            drawline4val(-i * width, -canvas_height / 2, -i * width, canvas_height / 2, "white", 0.1)
        }
        for (let i = 0; i < (canvas_height / 2) / width; i++) {
            drawline4val(-canvas_width / 2, width * i, canvas_width / 2, width * i, "white", 0.1)
            drawline4val(-canvas_width / 2, -width * i, canvas_width / 2, -width * i, "white", 0.1)
        }
        drawline4val(-canvas_width / 2, 0, canvas_width / 2, 0, "red", 0.2)
        drawline4val(0, -canvas_height / 2, 0, canvas_height / 2, "blue", 0.2)
        drawCircle(0, 0, 2, "white")
    }

    print_mat() {
        table(this.matrix_val)
    }
    static print_mat(value) {
        table(value)
    }

    //  TRANSLATION

    static translate(x, y, z, value) {
        let translation = new Matrix(4, 4)
        translation.matrix_val[0][0] = 1
        translation.matrix_val[0][3] = x
        translation.matrix_val[1][1] = 1
        translation.matrix_val[1][3] = y
        translation.matrix_val[2][2] = 1
        translation.matrix_val[2][3] = z
        translation.matrix_val[3][3] = 1
        let result = translation.mat_mul(value)
        return result
    }

    //  SCALE

    static scale(scale_val_X, scale_val_Y, scale_val_Z, value) {
        let scaling = new Matrix(4, 4)
        scaling.matrix_val[0][0] = scale_val_X
        scaling.matrix_val[1][1] = scale_val_Y
        scaling.matrix_val[2][2] = scale_val_Z
        scaling.matrix_val[3][3] = 1
        let result = scaling.mat_mul(value)
        return result
    }

    //  ROTATION

    static rotateZ(value, rotate) {
        let rotateZ = new Matrix(4, 4, [cos(rotate), -sin(rotate), 0, 0, sin(rotate), cos(rotate), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        let result = rotateZ.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateY(value, rotate) {
        let rotateY = new Matrix(4, 4, [cos(rotate), 0, sin(rotate), 0, 0, 1, 0, 0, -sin(rotate), 0, cos(rotate), 0, 0, 0, 0, 1])
        let result = rotateY.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }
    static rotateX(value, rotate) {
        let rotateX = new Matrix(4, 4, [1, 0, 0, 0, 0, cos(rotate), -sin(rotate), 0, 0, sin(rotate), cos(rotate), 0, 0, 0, 0, 1])
        let result = rotateX.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXYZ(value, rotate) {
        let rotateXYZ = new Matrix(4, 4, [cos(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * sin(rotate) - sin(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * cos(rotate) + sin(rotate) * sin(rotate),
            0,
        sin(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * sin(rotate) + cos(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * cos(rotate) - cos(rotate) * sin(rotate),
            0,
        -sin(rotate),
        cos(rotate) * sin(rotate),
        cos(rotate) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let result = rotateXYZ.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Y_Z(value, rotation_X, rotation_Y, rotation_Z) {
        let rotate_X_Y_Z = new Matrix(4, 4, [cos(rotation_X) * cos(rotation_Y),
        cos(rotation_X) * sin(rotation_Y) * sin(rotation_Z) - sin(rotation_X) * cos(rotation_Z),
        cos(rotation_X) * sin(rotation_Y) * cos(rotation_Z) + sin(rotation_X) * sin(rotation_Z),
            0,
        sin(rotation_X) * cos(rotation_Y),
        sin(rotation_X) * sin(rotation_Y) * sin(rotation_Z) + cos(rotation_X) * cos(rotation_Z),
        sin(rotation_X) * sin(rotation_Y) * cos(rotation_Z) - cos(rotation_X) * sin(rotation_Z),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(rotation_Z),
        cos(rotation_Y) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let result = rotate_X_Y_Z.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXY(value, rotate) {
        let rotateXY = new Matrix(4, 4, [cos(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * sin(0) - sin(rotate) * cos(0),
        cos(rotate) * sin(rotate) * cos(0) + sin(rotate) * sin(0),
            0,
        sin(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * sin(0) + cos(rotate) * cos(0),
        sin(rotate) * sin(rotate) * cos(0) - cos(rotate) * sin(0),
            0,
        -sin(rotate),
        cos(rotate) * sin(0),
        cos(rotate) * cos(0),
            0,
            0,
            0,
            0,
            1])
        let result = rotateXY.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Y(value, rotation_X, rotation_Y) {
        let rotate_X_Y = new Matrix(4, 4, [cos(rotation_X) * cos(rotation_Y),
        cos(rotation_X) * sin(rotation_Y) * sin(0) - sin(rotation_X) * cos(0),
        cos(rotation_X) * sin(rotation_Y) * cos(0) + sin(rotation_X) * sin(0),
            0,
        sin(rotation_X) * cos(rotation_Y),
        sin(rotation_X) * sin(rotation_Y) * sin(0) + cos(rotation_X) * cos(0),
        sin(rotation_X) * sin(rotation_Y) * cos(0) - cos(rotation_X) * sin(0),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(0),
        cos(rotation_Y) * cos(0),
            0,
            0,
            0,
            0,
            1])
        let result = rotate_X_Y.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateYZ(value, rotate) {
        let rotateYZ = new Matrix(4, 4, [cos(0) * cos(rotate),
        cos(0) * sin(rotate) * sin(rotate) - sin(0) * cos(rotate),
        cos(0) * sin(rotate) * cos(rotate) + sin(0) * sin(rotate),
            0,
        sin(0) * cos(rotate),
        sin(0) * sin(rotate) * sin(rotate) + cos(0) * cos(rotate),
        sin(0) * sin(rotate) * cos(rotate) - cos(0) * sin(rotate),
            0,
        -sin(rotate),
        cos(rotate) * sin(rotate),
        cos(rotate) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let result = rotateYZ.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_Y_Z(value, rotation_Y, rotation_Z) {
        let rotate_Y_Z = new Matrix(4, 4, [cos(0) * cos(rotation_Y),
        cos(0) * sin(rotation_Y) * sin(rotation_Z) - sin(0) * cos(rotation_Z),
        cos(0) * sin(rotation_Y) * cos(rotation_Z) + sin(0) * sin(rotation_Z),
            0,
        sin(0) * cos(rotation_Y),
        sin(0) * sin(rotation_Y) * sin(rotation_Z) + cos(0) * cos(rotation_Z),
        sin(0) * sin(rotation_Y) * cos(rotation_Z) - cos(0) * sin(rotation_Z),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(rotation_Z),
        cos(rotation_Y) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let result = rotate_Y_Z.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXZ(value, rotate) {
        let rotateXZ = new Matrix(4, 4, [cos(rotate) * cos(0),
        cos(rotate) * sin(0) * sin(rotate) - sin(rotate) * cos(rotate),
        cos(rotate) * sin(0) * cos(rotate) + sin(rotate) * sin(rotate),
            0,
        sin(rotate) * cos(0),
        sin(rotate) * sin(0) * sin(rotate) + cos(rotate) * cos(rotate),
        sin(rotate) * sin(0) * cos(rotate) - cos(rotate) * sin(rotate),
            0,
        -sin(0),
        cos(0) * sin(rotate),
        cos(0) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let result = rotateXZ.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Z(value, rotation_X, rotation_Z) {
        let rotate_X_Z = new Matrix(4, 4, [cos(rotation_X) * cos(0),
        cos(rotation_X) * sin(0) * sin(rotation_Z) - sin(rotation_X) * cos(rotation_Z),
        cos(rotation_X) * sin(0) * cos(rotation_Z) + sin(rotation_X) * sin(rotation_Z),
            0,
        sin(rotation_X) * cos(0),
        sin(rotation_X) * sin(0) * sin(rotation_Z) + cos(rotation_X) * cos(rotation_Z),
        sin(rotation_X) * sin(0) * cos(rotation_Z) - cos(rotation_X) * sin(rotation_Z),
            0,
        -sin(0),
        cos(0) * sin(rotation_Z),
        cos(0) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let result = rotate_X_Z.mat_mul(value)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    //  ROTATION AND TRANSLATION TOGETHER

    static rotateZ_T(value, rotate, x, y, z) {
        let rotateZ_T = new Matrix(4, 4, [cos(rotate), -sin(rotate), 0, 0, sin(rotate), cos(rotate), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        let vector_rotate = rotateZ_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateY_T(value, rotation_Y, x, y, z) {
        let rotateY_T = new Matrix(4, 4, [cos(rotation_Y), 0, sin(rotation_Y), 0, 0, 1, 0, 0, -sin(rotation_Y), 0, cos(rotation_Y), 0, 0, 0, 0, 1])
        let vector_rotate = rotateY_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }
    static rotateX_T(value, rotation_X, x, y, z) {
        let rotateX_T = new Matrix(4, 4, [1, 0, 0, 0, 0, cos(rotation_X), -sin(rotation_X), 0, 0, sin(rotation_X), cos(rotation_X), 0, 0, 0, 0, 1])
        let vector_rotate = rotateX_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXYZ_T(value, rotate, x, y, z) {
        let rotateXYZ_T = new Matrix(4, 4, [cos(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * sin(rotate) - sin(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * cos(rotate) + sin(rotate) * sin(rotate),
            0,
        sin(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * sin(rotate) + cos(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * cos(rotate) - cos(rotate) * sin(rotate),
            0,
        -sin(rotate),
        cos(rotate) * sin(rotate),
        cos(rotate) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotateXYZ_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Y_Z_T(value, rotation_X, rotation_Y, rotation_Z, x, y, z) {
        let rotate_X_Y_Z_T = new Matrix(4, 4, [cos(rotation_X) * cos(rotation_Y),
        cos(rotation_X) * sin(rotation_Y) * sin(rotation_Z) - sin(rotation_X) * cos(rotation_Z),
        cos(rotation_X) * sin(rotation_Y) * cos(rotation_Z) + sin(rotation_X) * sin(rotation_Z),
            0,
        sin(rotation_X) * cos(rotation_Y),
        sin(rotation_X) * sin(rotation_Y) * sin(rotation_Z) + cos(rotation_X) * cos(rotation_Z),
        sin(rotation_X) * sin(rotation_Y) * cos(rotation_Z) - cos(rotation_X) * sin(rotation_Z),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(rotation_Z),
        cos(rotation_Y) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotate_X_Y_Z_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXY_T(value, rotate, x, y, z) {
        let rotateXY_T = new Matrix(4, 4, [cos(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * sin(0) - sin(rotate) * cos(0),
        cos(rotate) * sin(rotate) * cos(0) + sin(rotate) * sin(0),
            0,
        sin(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * sin(0) + cos(rotate) * cos(0),
        sin(rotate) * sin(rotate) * cos(0) - cos(rotate) * sin(0),
            0,
        -sin(rotate),
        cos(rotate) * sin(0),
        cos(rotate) * cos(0),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotateXY_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Y_T(value, rotation_X, rotation_Y, x, y, z) {
        let rotate_X_Y_T = new Matrix(4, 4, [cos(rotation_X) * cos(rotation_Y),
        cos(rotation_X) * sin(rotation_Y) * sin(0) - sin(rotation_X) * cos(0),
        cos(rotation_X) * sin(rotation_Y) * cos(0) + sin(rotation_X) * sin(0),
            0,
        sin(rotation_X) * cos(rotation_Y),
        sin(rotation_X) * sin(rotation_Y) * sin(0) + cos(rotation_X) * cos(0),
        sin(rotation_X) * sin(rotation_Y) * cos(0) - cos(rotation_X) * sin(0),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(0),
        cos(rotation_Y) * cos(0),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotate_X_Y_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateYZ_T(value, rotate, x, y, z) {
        let rotateYZ_T = new Matrix(4, 4, [cos(0) * cos(rotate),
        cos(0) * sin(rotate) * sin(rotate) - sin(0) * cos(rotate),
        cos(0) * sin(rotate) * cos(rotate) + sin(0) * sin(rotate),
            0,
        sin(0) * cos(rotate),
        sin(0) * sin(rotate) * sin(rotate) + cos(0) * cos(rotate),
        sin(0) * sin(rotate) * cos(rotate) - cos(0) * sin(rotate),
            0,
        -sin(rotate),
        cos(rotate) * sin(rotate),
        cos(rotate) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotateYZ_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_Y_Z_T(value, rotation_Y, rotation_Z, x, y, z) {
        let rotate_Y_Z_T = new Matrix(4, 4, [cos(0) * cos(rotation_Y),
        cos(0) * sin(rotation_Y) * sin(rotation_Z) - sin(0) * cos(rotation_Z),
        cos(0) * sin(rotation_Y) * cos(rotation_Z) + sin(0) * sin(rotation_Z),
            0,
        sin(0) * cos(rotation_Y),
        sin(0) * sin(rotation_Y) * sin(rotation_Z) + cos(0) * cos(rotation_Z),
        sin(0) * sin(rotation_Y) * cos(rotation_Z) - cos(0) * sin(rotation_Z),
            0,
        -sin(rotation_Y),
        cos(rotation_Y) * sin(rotation_Z),
        cos(rotation_Y) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotate_Y_Z_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotateXZ_T(value, rotate, x, y, z) {
        let rotateXZ_T = new Matrix(4, 4, [cos(rotate) * cos(0),
        cos(rotate) * sin(0) * sin(rotate) - sin(rotate) * cos(rotate),
        cos(rotate) * sin(0) * cos(rotate) + sin(rotate) * sin(rotate),
            0,
        sin(rotate) * cos(0),
        sin(rotate) * sin(0) * sin(rotate) + cos(rotate) * cos(rotate),
        sin(rotate) * sin(0) * cos(rotate) - cos(rotate) * sin(rotate),
            0,
        -sin(0),
        cos(0) * sin(rotate),
        cos(0) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotateXZ_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    static rotate_X_Z_T(value, rotation_X, rotation_Z, x, y, z) {
        let rotate_X_Z_T = new Matrix(4, 4, [cos(rotation_X) * cos(0),
        cos(rotation_X) * sin(0) * sin(rotation_Z) - sin(rotation_X) * cos(rotation_Z),
        cos(rotation_X) * sin(0) * cos(rotation_Z) + sin(rotation_X) * sin(rotation_Z),
            0,
        sin(rotation_X) * cos(0),
        sin(rotation_X) * sin(0) * sin(rotation_Z) + cos(rotation_X) * cos(rotation_Z),
        sin(rotation_X) * sin(0) * cos(rotation_Z) - cos(rotation_X) * sin(rotation_Z),
            0,
        -sin(0),
        cos(0) * sin(rotation_Z),
        cos(0) * cos(rotation_Z),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotate_X_Z_T.mat_mul(value)
        let result = Matrix.translate(x, y, z, vector_rotate)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    //  ROTATION AND TRANSLATION AND SCALE TOGETHER

    static rotateXYZ_T_S(value, rotate, x, y, z, scale_val) {
        let rotateXYZ_T_S = new Matrix(4, 4, [cos(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * sin(rotate) - sin(rotate) * cos(rotate),
        cos(rotate) * sin(rotate) * cos(rotate) + sin(rotate) * sin(rotate),
            0,
        sin(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * sin(rotate) + cos(rotate) * cos(rotate),
        sin(rotate) * sin(rotate) * cos(rotate) - cos(rotate) * sin(rotate),
            0,
        -sin(rotate),
        cos(rotate) * sin(rotate),
        cos(rotate) * cos(rotate),
            0,
            0,
            0,
            0,
            1])
        let vector_rotate = rotateXYZ_T_S.mat_mul(value)
        let vector_scale = Matrix.scale(scale_val, scale_val, scale_val, vector_rotate)
        let result = Matrix.translate(x, y, z, vector_scale)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

    // static rotate_X_Y_Z_T_S(value, rotation_X, rotation_Y, rotation_Z, x, y, z, scale_val) {
    //     let rotate_X_Y_Z_T_S = new Matrix(4, 4,
    //         [cos(rotation_Z) * cos(rotation_Y),
    //         cos(rotation_Z) * sin(rotation_Y) * sin(rotation_X) - sin(rotation_Z) * cos(rotation_X),
    //         cos(rotation_Z) * sin(rotation_Y) * cos(rotation_X) + sin(rotation_Z) * sin(rotation_X),
    //             0,
    //         sin(rotation_Z) * cos(rotation_Y),
    //         sin(rotation_Z) * sin(rotation_Y) * sin(rotation_X) + cos(rotation_Z) * cos(rotation_X),
    //         sin(rotation_Z) * sin(rotation_Y) * cos(rotation_X) - cos(rotation_Z) * sin(rotation_X),
    //             0,
    //         -sin(rotation_Y),
    //         cos(rotation_Y) * sin(rotation_X),
    //         cos(rotation_Y) * cos(rotation_X),
    //             0,
    //             0,
    //             0,
    //             0,
    //             1])
    //     let result = rotate_X_Y_Z_T_S.mat_mul(value)
    //     value.x = result.matrix_val[0][0] * scale_val + x
    //     value.y = result.matrix_val[1][0] * scale_val + y
    //     value.z = result.matrix_val[2][0] * scale_val + z
    //     value.w = 1
    //     return value
    // }

    static rotate_X_Y_Z_T_S(value, rotation_X, rotation_Y, rotation_Z, x, y, z, scale_val_X, scale_val_Y, scale_val_Z) {
        let rotate_X_Y_Z_T_S = new Matrix(4, 4,
            [cos(rotation_Z) * cos(rotation_Y),
            cos(rotation_Z) * sin(rotation_Y) * sin(rotation_X) - sin(rotation_Z) * cos(rotation_X),
            cos(rotation_Z) * sin(rotation_Y) * cos(rotation_X) + sin(rotation_Z) * sin(rotation_X),
                0,
            sin(rotation_Z) * cos(rotation_Y),
            sin(rotation_Z) * sin(rotation_Y) * sin(rotation_X) + cos(rotation_Z) * cos(rotation_X),
            sin(rotation_Z) * sin(rotation_Y) * cos(rotation_X) - cos(rotation_Z) * sin(rotation_X),
                0,
            -sin(rotation_Y),
            cos(rotation_Y) * sin(rotation_X),
            cos(rotation_Y) * cos(rotation_X),
                0,
                0,
                0,
                0,
                1])
        let vector_rotate = rotate_X_Y_Z_T_S.mat_mul(value)
        let vector_scale = Matrix.scale(scale_val_X, scale_val_Y, scale_val_Z, vector_rotate)
        let result = Matrix.translate(x, y, z, vector_scale)
        let project = new Matrix(4, 4)
        let fNear = 1;
        let fFar = 10;
        let fFov = 90;
        let fAspectRatio = 400 / 400;
        // let fAspectRatio = canvas_width / canvas_height;
        let fFovRad = 1 / tan(fFov * 0.5 / 180.0 * 3.14159);
        project.matrix_val[0][0] = (fAspectRatio * fFovRad);
        project.matrix_val[1][1] = (fFovRad);
        project.matrix_val[2][2] = -fFar / (fFar - fNear);
        project.matrix_val[3][2] = -fFar * fNear / (fFar - fNear);
        project.matrix_val[2][3] = -1;
        project.matrix_val[3][3] = 0;
        let test = project.mat_mul(result)
        value.x = test.matrix_val[0][0]
        value.y = test.matrix_val[1][0]
        value.z = test.matrix_val[2][0]
        value.w = 1
        return value
    }

    static projection(value) {
        let fNear = 100;
        let fFar = 1000;
        let fFov = 90;
        let fAspectRatio = 400 / 400;
        // let fAspectRatio = canvas_width / canvas_height;
        let fFovRad = 1 / tan(fFov * 0.5 / 180.0 * 3.14159);
        project.matrix_val[0][0] = (fAspectRatio * fFovRad) / result.matrix_val[2];
        project.matrix_val[1][1] = (fFovRad) / result.matrix_val[2];
        project.matrix_val[2][2] = (fFar / (fFar - fNear)) / result.matrix_val[2];
        project.matrix_val[3][2] = (-fFar * fNear) / (fFar - fNear);
        project.matrix_val[2][3] = 1;
        project.matrix_val[3][3] = 0;
        let result = projection.mat_mul(value)
        // print(projection)
        value.x = result.matrix_val[0][0]
        value.y = result.matrix_val[1][0]
        value.z = result.matrix_val[2][0]
        value.w = 1
        return value
    }

}