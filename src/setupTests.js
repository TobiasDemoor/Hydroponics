const { execSync } = require('child_process');
const config = require('config');
const { columns, columnsOrig, sections } = config.get("data");
let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element && element !== sections.main.id)

module.exports = () => {
    for (id of ids) {
        execSync(`cp ${columnsOrig(id)} ${columns(id)}`)
    }
}