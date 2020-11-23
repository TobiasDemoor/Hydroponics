const { execSync } = require('child_process');
const config = require('config');
const { sections } = config.get("data");

let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element)

module.exports = () => {
    for (id of ids) {
        execSync(`cp ./testFiles/logs/${id}.json ./testFiles/logs/${id}.test.json`)
    }
}
