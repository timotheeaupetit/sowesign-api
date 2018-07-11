const PdfReader = require('pdfreader').PdfReader;
const Rule = require('pdfreader').Rule;

class Metadata {
    constructor() {
        this.reader = new PdfReader();
    }

    handleSignTag(data) {
        console.log(data)
    }

    handleAdminTag(data) {
        console.log(data[0])
    }

    handleUserTag(data) {
        console.log(data)
    }

    handleMeetingTag(data) {
        console.log(data[0])
    }

    handleScheduleTag(data) {
        console.log(data[0])
    }

    handleSubjectTag(data) {
        console.log(data[0])
    }

    handleRetryTag(data) {
        console.log(data[0])
    }

    parsePdf(file) {
        let itemProcessor = Rule.makeItemProcessor([
            Rule.on(/(^#SIGN\d{3}#$)/).extractRegexpValues().accumulateAfterHeading().then(this.handleSignTag),
            Rule.on(/(^#ADMIN#.+#$)/).extractRegexpValues().then(this.handleAdminTag),
            Rule.on(/(^#USER\d{3}#.+#$)/).extractRegexpValues().accumulateAfterHeading().then(this.handleUserTag),
            Rule.on(/(^#MEETING#.+#$)/).extractRegexpValues().then(this.handleMeetingTag),
            Rule.on(/(^#SCHEDULE#.+#$)/).extractRegexpValues().then(this.handleScheduleTag),
            Rule.on(/(^#SUBJECT#.+#$)/).extractRegexpValues().then(this.handleSubjectTag),
            Rule.on(/(^#RETRY#(\d#){3}$)/).extractRegexpValues().then(this.handleRetryTag),
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
