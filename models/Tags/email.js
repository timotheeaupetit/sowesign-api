class Email {
    constructor(data) {
        const [subject, content] = data.replace('#SUBJECT#', '').split('#');
        this.subject = subject;
        this.content = content;
    }
    
    buildObj() {
        return Object.assign({}, {
            subject: this.subject,
            content: this.content
        });
    }
}

module.exports = Email;
