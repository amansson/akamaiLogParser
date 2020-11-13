'use strict';

const fs = require('fs');
const PouchDB = require('pouchdb');

const db = new PouchDB('parse');


function loadFile(file) {
    return new Promise((resolve, reject) => {

        // let obj;
        // const loadedFile = fs.readFile(file, () => {

        //     obj = JSON.parse(data);

        // });

        let obj;
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) 
                reject(err);

            
            data = JSON.parse(data);
            resolve(data);
        });

        // console.log(obj);

        // loadedFile.on('error', reject);
        // loadedFile.on('close', () => resolve(obj));
    });
}

// fs.readFile('log.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');

loadFile('log.json')
    .then(res => {

        console.log(res);
        // write each value of the array on the file breaking line
        db.post(res).then((res) => {
            console.log("Document inserted OK");
        }).catch((err) => {
            console.log('There was an error.');
            console.error(err);
        });

        // close the stream
        // writeStream.end();
    })
    .catch(err => console.error(err));
