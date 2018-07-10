const PdfReader = require('pdfreader').PdfReader;
const Rule = require('pdfreader').Rule;

class Metadata {
    constructor() {
        this.reader = new PdfReader();
    }

    handleSignTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleAdminTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleUserTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleMeetingTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleScheduleTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleSubjectTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    handleRetryTag(data) {
        Object.keys(data).forEach(x => console.log(x));
    }

    parsePdf(file) {
        let itemProcessor = Rule.makeItemProcessor([
            Rule.on(/^#SIGN\d{3}#$/).extractRegexpValues().then(this.handleSignTag),
            Rule.on(/^#ADMIN#.+#$/).extractRegexpValues().then(this.handleAdminTag),
            Rule.on(/^#USER\d{3}#.+#$/).extractRegexpValues().then(this.handleUserTag),
            Rule.on(/^#MEETING#.+#$/).extractRegexpValues().then(this.handleMeetingTag),
            Rule.on(/^#SCHEDULE#.+#$/).extractRegexpValues().then(this.handleScheduleTag),
            Rule.on(/^#SUBJECT#.+#$/).extractRegexpValues().then(this.handleSubjectTag),
            Rule.on(/^#RETRY#(\d#){3}$/).extractRegexpValues().then(this.handleRetryTag),
        ]);
        this.reader.parseFileItems(file, function(err, item){
            if (err)
                // callback(err);
                console.log(err);
            else if (!item)
                // callback();
                console.log("empty");
            else if (item)
                // console.log(item.text);
                itemProcessor(item)
        });
    }
}

module.exports = Metadata;
