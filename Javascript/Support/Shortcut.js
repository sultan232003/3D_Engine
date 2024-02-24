const print = (value) => {
    console.log(value)
}

const table = (value) => {
    console.table(value)
}
const clear = () => {
    console.clear()
}
const sin = (value) => {
    return Math.sin(value)
}
const asin = (value) => {
    return Math.asin(value)
}
const sinh = (value) => {
    return Math.sinh(value)
}
const asinh = (value) => {
    return Math.asinh(value)
}
const cos = (value) => {
    return Math.cos(value)
}
const cosh = (value) => {
    return Math.cosh(value)
}
const acos = (value) => {
    return Math.acos(value)
}
const acosh = (value) => {
    return Math.acosh(value)
}
const tan = (value) => {
    return Math.tan(value)
}
const tanh = (value) => {
    return Math.tanh(value)
}
const atan = (value) => {
    return Math.atan(value)
}
const atan2 = (value) => {
    return Math.atan2(value)
}
const atanh = (value) => {
    return Math.atanh(value)
}
const ceil = (value) => {
    return Math.ceil(value)
}
const floor = (value) => {
    return Math.floor(value)
}
const sqrt = (value) => {
    return Math.sqrt(value)
}
const abs = (value) => {
    return Math.abs(value)
}
const pi = Math.PI

const random = (value) => {
    return Math.random() * value
}

const Angle = (angle) => {
    return ((2 * pi) / 360) * angle

}

const randomColor = () => {
    let r = floor(Math.random() * 255)
    let g = floor(Math.random() * 255)
    let b = floor(Math.random() * 255)
    return "rgb(" + r + "," + g + "," + b + ")"
}

let mouseX
let mouseY
let mouse_down = false
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

document.addEventListener("mousedown", (e) => {
    mouse_down = true
})
document.addEventListener("mouseup", (e) => {
    mouse_down = false
})

const createSlider = (min, max, default_val) => {
    const slide = document.createElement("input")
    slide.setAttribute("type", "range")
    slide.setAttribute("min", min)
    slide.setAttribute("max", max)
    slide.setAttribute("value", default_val)
    document.body.appendChild(slide)

}

const facing = (angle, length, point_x, point_y) => {
    f_x = Math.cos(angle) * length + point_x;
    f_y = Math.sin(angle) * length + point_y;
    return {
        x: f_x,
        y: f_y
    }
}

let keypressed
let keypressed_code
document.addEventListener("keydown", (e) => {
    keypressed = e.key
    keypressed_code = e.keyCode
})
document.addEventListener("keyup", (e) => {
    keypressed = undefined
    keypressed_code = undefined
})

const rgbToHex = (r, g, b) => {
    let r_val = floor(r)
    let g_val = floor(g)
    let b_val = floor(b)
    return ("#" + r_val.toString(16) + g_val.toString(16) + b_val.toString(16));
}

const textToDeci = (text, want_array) => {
    let result = text.toLowerCase()
    let result_array = []
    for (let i = 0; i < result.length; i++) {
        if (want_array) {
            result_array.push(result.charCodeAt(i) - 96)
        } else {
            print(result.charCodeAt(i) - 96)
        }
    }
    if (want_array) {
        print(result_array)
    }
}

const textToBinary = (text, want_array) => {
    let small_text = text.toLowerCase()
    let result_array = []
    for (let i = 0; i < small_text.length; i++) {
        result = small_text.charCodeAt(i) - 96
        binary_result = result.toString(2)
        if (want_array) {
            result_array.push(binary_result)
        } else {
            print(binary_result)
        }
    }
    if (want_array) {
        print(result_array)
    }
}

let revolution_degree = 0
const revolution = (fromX, fromY, toX, toY, want_degree) => {
    let b = (toX - centerX) - fromX
    let p = (toY - centerY) - fromY
    if ((mouseX - centerX) < 0 && (mouseY - centerY) < 0) {
        revolution_degree = utils.radsToDegrees(abs(atan(p / b)))
    } else if ((mouseX - centerX) > 0 && (mouseY - centerY) < 0) {
        revolution_degree = 90 + (90 - utils.radsToDegrees(abs(atan(p / b))))
    } else if ((mouseX - centerX) > 0 && (mouseY - centerY) > 0) {
        revolution_degree = utils.radsToDegrees(abs(atan(p / b))) + 180
    } else if ((mouseX - centerX) < 0 && (mouseY - centerY) > 0) {
        revolution_degree = 270 + (90 - utils.radsToDegrees(abs(atan(p / b))))
    }
    if (want_degree == true) {
        return revolution_degree
    } else {
        return utils.degreesToRads(revolution_degree);
    }
}
