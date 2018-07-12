class Admin {
    constructor(data) {
        const [lastName, firstName, email] = data.replace('#ADMIN#', '').split('#');
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
    }
    
    buildObj() {
        return Object.assign({}, {
            last_name: this.lastName,
            first_name: this.firstName,
            email: this.email
        })
    }
}

module.exports = Admin;
