/**
 * Classe permettant d'extraire les données du tag RETRY
 */
class Retry {
    constructor(data) {
        const [offset, occurrences, periodicity] = data.replace('#RETRY#', '').split('#');
        this.offset = offset;
        this.occurrences = occurrences;
        this.periodicity = periodicity;
    }
    
    buildObj() {
        return Object.assign({}, {
            offset: this.offset,
            occurrences: this.occurrences,
            periodicity: this.periodicity
        })
    }
}

module.exports = Retry;
