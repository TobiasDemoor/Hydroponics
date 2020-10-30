const fs = require('fs');
const path = require('path')

function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {
        const dir = path.dirname(filePath);

        const watcher = fs.watch(dir, function (eventType, filename) {
            const split = filename.split('.')
            if (eventType === "change" && split[1] === "response") {
                clearTimeout(timer);
                watcher.close();
                fs.unlink(filename, () => {})
                resolve(split[0]);
            }
        });

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);
    });
}

fs.writeFile("codigo.txt", "bien", err => {
    if (err) console.error(err)
})

checkExistsWithTimeout(".", 2000).then(console.log).catch(console.error)
