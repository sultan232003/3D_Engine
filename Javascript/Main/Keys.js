let clicked_index
Tool.forEach(tool => {
    tool.addEventListener("click", function () {
        clicked_index = [...this.parentElement.children].indexOf(this)
    })
});

class KeyTool {
    constructor(tool_name, control_key) {
        this.tool_name = tool_name
        this.control_key = control_key
        this.key_count = 0
    }

    update() {
        this.index_val = Array.from(Tool).indexOf(this.tool_name)
        this.tool_name.addEventListener("click", () => {
            Tool.forEach(tool => {
                tool.classList.remove("active")
            });
        })

        Toolbar.addEventListener("click", () => {
            if (!this.index_val == clicked_index) {
                this.key_count = 0
            }
        })

        this.tool_name.addEventListener("click", (e) => {
            this.key_count++
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

const move = new KeyTool(Move_tool, "m")
const rotate = new KeyTool(Rotate_tool, "s")
const origin = new KeyTool(Origin_tool, "o")
move.update()
rotate.update()
origin.update()
