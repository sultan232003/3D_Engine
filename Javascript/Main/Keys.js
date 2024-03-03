class KeyTool {
    constructor(tool_name, control_key) {
        this.tool_name = tool_name
        this.control_key = control_key
        this.key_count = 0
        this.click = false
    }
    update() {
        this.tool_name.addEventListener("click", () => {
            this.index_val = Array.prototype.indexOf.call(Toolbar.children, this.tool_name)
            Tool.forEach(tool => {
                tool.classList.remove("active")
            });
        })

        this.tool_name.addEventListener("click", (e) => {
            this.click = true
            this.key_count++
            print(this.key_count)
            if (this.key_count == 1) {
                this.tool_name.classList.add("active")
            } else if (this.key_count == 2) {
                this.tool_name.classList.remove("active")
                this.key_count = 0
            }
        })

        document.addEventListener("keydown", () => {
            if (Command_Key_List.includes(keypressed)) {
                Tool.forEach(tool => {
                    tool.classList.remove("active")
                });
            }
        })

        document.addEventListener("keyup", (e) => {
            // print(e.key)
            if (e.key == this.control_key) {
                this.key_count++
            } else { this.key_count = 0 }
            if (this.key_count == 1) {
                this.tool_name.classList.add("active")
            } else if (this.key_count == 2) {
                this.tool_name.classList.remove("active")
                this.key_count = 0
            }
        })
    }
}

//  MAKE IT SO THAT YOU DONT HAVE TO DOUBLE CLICK A TOOL TO ACTIVATE IT //


const move = new KeyTool(Move_tool, "m")
const rotate = new KeyTool(Rotate_tool, "s")
move.update()
rotate.update()