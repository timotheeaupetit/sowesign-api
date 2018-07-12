class User {
    constructor(data) {
        const [tag, lastName, firstName, organization, email] = data.replace('#', '').split('#');
        this.tag = tag;
        this.lastName = lastName;
        this.firstName = firstName;
        this.organization = organization;
        this.email = email;
    }

    buildObj() {
        return Object.assign({}, {
            tag: this.tag,
            last_name: this.lastName,
            first_name: this.firstName,
            organisation: this.organization,
            email: this.email
        })
    }
}

module.exports = User;
