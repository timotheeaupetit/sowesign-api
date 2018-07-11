class Sign {
    constructor(item, page) {
        this.coord_x1 = item.x;
        this.coord_x2 = item.x + item.w;
        this.coord_y = item.y;
        this.page = page;
        this.tag = item.text.replace(/#/g, '').trim()
    }
    
    buildObj() {
        return Object.assign({}, {
            tag: this.tag,
            location: {
                page: this.page,
                upper_left_corner: {
                    x: this.coord_x1,
                    y: this.coord_y
                },
                upper_right_corner: {
                    x: this.coord_x2,
                    y: this.coord_y
                }
            }
        });
    }
}

module.exports = Sign;
