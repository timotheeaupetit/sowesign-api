const PdfReader = require('pdfreader').PdfReader;
const Admin = require('./Tags/admin');
const Email = require('./Tags/email');
const Meeting = require('./Tags/meeting');
const Retry = require('./Tags/retry');
const Schedule = require('./Tags/schedule');
const Sign = require('./Tags/sign');
const User = require('./Tags/user');

class Scraper {
    constructor() {
        this.reader = new PdfReader();
        this.tags = {};
        this.signatures = [];
        this.users = [];
    }

    handleSignTag(item, page) {
        const signature = new Sign(item, page).buildObj();
        this.signatures.push(signature);
        Object.assign(this.tags, {
            signatures: this.signatures
        });
    }

    handleAdminTag(tag) {
        Object.assign(this.tags, {
            admin: new Admin(tag).buildObj()
        });
    }

    handleUserTag(tag) {
        const user = new User(tag).buildObj();
        this.users.push(user);
        Object.assign(this.tags, {
            users: this.users
        });
    }

    handleMeetingTag(tag) {
        Object.assign(this.tags, {
            meeting: new Meeting(tag).buildObj()
        });
    }

    handleScheduleTag(tag) {
        Object.assign(this.tags, {
            schedule: new Schedule(tag).buildObj()
        });
    }

    handleEmailTag(tag) {
        Object.assign(this.tags, {
            email: new Email(tag).buildObj()
        });
    }

    handleRetryTag(tag) {
        Object.assign(this.tags, {
            retry: new Retry(tag).buildObj()
        });
    }

    extractTags(file, callback) {
        const self = this;
        let page = 0;

        const signRegex = RegExp(/(#SIGN\d{3}#)/);
        const userRegex = RegExp(/(#USER\d{3}#.+#)/);
        const adminRegex = RegExp(/#ADMIN#(.+#)/);
        const meetingRegex = RegExp(/#MEETING#(.+#)/);
        const scheduleRegex = RegExp(/#SCHEDULE#(.+#)/);
        const emailRegex = RegExp(/#SUBJECT#(.+#)/);
        const retryRegex = RegExp(/#RETRY#((\d#){3})/);

        this.reader.parseFileItems(file, function(err, item){
            if (err) {
                callback(err);
            }
            else if (!item) {
                callback(self.tags);
            }
            else if (item) {
                const chunk = item.text;
                
                if (item.page) {
                    page = parseInt(item.page);
                }
                
                if (signRegex.test(chunk)) {
                    self.handleSignTag(item, page)
                }
                else if (userRegex.test(chunk)) {
                    self.handleUserTag(chunk)
                }
                else if (adminRegex.test(chunk)) {
                    self.handleAdminTag(chunk)
                }
                else if (meetingRegex.test(chunk)) {
                    self.handleMeetingTag(chunk)
                }
                else if (scheduleRegex.test(chunk)) {
                    self.handleScheduleTag(chunk)
                }
                else if (emailRegex.test(chunk)) {
                    self.handleEmailTag(chunk)
                }
                else if (retryRegex.test(chunk)) {
                    self.handleRetryTag(chunk)
                }
                console.log(item.text);
            }
        });
    }
}

module.exports = Scraper;
