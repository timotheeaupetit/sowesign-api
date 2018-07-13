const PdfReader = require('pdfreader').PdfReader;

// Chargement des classes nécessaires à la transformation des différents tags
const Admin = require('./Tags/admin');
const Email = require('./Tags/email');
const Meeting = require('./Tags/meeting');
const Retry = require('./Tags/retry');
const Schedule = require('./Tags/schedule');
const Sign = require('./Tags/sign');
const User = require('./Tags/user');

/**
 * Cette classe permet d'extraire les tags d'un document pdf
 */
class Scraper {
    constructor() {
        this.reader = new PdfReader();
        this.tags = {}; // objet qui sera renvoyé une foi l'extraction finie
        this.signatures = []; // array qui contiendra chaque tag de signature
        this.users = []; // array qui contiendra chaque tag de user
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag SIGN
     */
    handleSignTag(item, page) {
        const signature = new Sign(item, page).buildObj();
        this.signatures.push(signature);
        Object.assign(this.tags, {
            signatures: this.signatures
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag ADMIN
     */
    handleAdminTag(tag) {
        Object.assign(this.tags, {
            admin: new Admin(tag).buildObj()
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag USER
     */
    handleUserTag(tag) {
        const user = new User(tag).buildObj();
        this.users.push(user);
        Object.assign(this.tags, {
            users: this.users
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag MEETING
     */
    handleMeetingTag(tag) {
        Object.assign(this.tags, {
            meeting: new Meeting(tag).buildObj()
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag SCHEDULE
     */
    handleScheduleTag(tag) {
        Object.assign(this.tags, {
            schedule: new Schedule(tag).buildObj()
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag SUBJECT
     */
    handleEmailTag(tag) {
        Object.assign(this.tags, {
            email: new Email(tag).buildObj()
        });
    }

    /**
     * Permet de lancer l'extraction des données concernant un tag RETRY
     */
    handleRetryTag(tag) {
        Object.assign(this.tags, {
            retry: new Retry(tag).buildObj()
        });
    }

    /**
     * Fonction principale de la classe, permettant de parcourir tous les éléments du pdf,
     * et de différencier les traitements selon le type de tag.
     */
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
