class Structute {
    constructor () {
        this.origin = vector.create(0,0,0,0)
        this.point_x = this.point_x
        this.point_y = this.point_y
        this.point_z = this.point_z
        this.new_point_x = this.point_x
        this.new_point_y
        this.new_point_z
    }
    
    update_origin(){
        this.new_point_x = this.point_x - this.origin
        this.new_point_y = this.point_y - this.origin
        this.new_point_z = this.point_z - this.origin
    }
}