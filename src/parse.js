'use strict';

const regexp = /^(?<ip>[^ ]*?) - - (?<date>\[[\w\W]+\]) "(?<method>\w+) (?<endpoint>[\w\W]*?) .*" (?<status>\d+) (?<size>\d+) "(?<ref>[\w\W]*?)".*"-"$/;

const fs = require('fs');
const readline = require('readline');

function convert(file) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];
        let obj = {}; 

        reader.on('line', line => {
            let matchResult = line.match(regexp);
            obj = matchResult.groups;
            obj = JSON.parse(JSON.stringify(obj));
            array.push(obj);
        });

        reader.on('close', () => resolve(array));
    });
}

convert('log.txt')

    .then(res => {
        const writeStream = fs.createWriteStream('log.json');
        const pathName = writeStream.path;

        // write each value of the array on the file breaking line
        writeStream.write('{"docs":[');
        res.forEach(value => writeStream.write(`${JSON.stringify(value)},\n`));
        writeStream.write(']}');

        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            console.log(`wrote all the array data to file ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });

        // close the stream
        writeStream.end();
    })
    .catch(err => console.error(err));
