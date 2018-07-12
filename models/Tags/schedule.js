class Schedule {
    constructor(data) {
        const [date, time, location, url] = data.replace('#SCHEDULE#', '').split('#');
        this.date = date;
        this.time = time;
        this.location = location;
        this.url = url
    }
    
    buildObj() {
        return Object.assign({}, {
            date: this.date,
            time: this.time,
            location: this.location,
            url: this.url
        })
    }
}

module.exports = Schedule;
