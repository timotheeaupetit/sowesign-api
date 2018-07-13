/**
 * Classe permettant d'extraire les données du tag MEETING
 */
class Meeting {
    constructor(data) {
        const [subject, description] = data.replace('#MEETING#', '').split('#');
        this.subject = subject;
        this.description = description;
    }

    buildObj() {
        return Object.assign({}, {
            subject: this.subject,
            description: this.description
        });
    }
}

module.exports = Meeting;
