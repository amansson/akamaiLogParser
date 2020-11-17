'use strict';

const fs = require('fs');
const PouchDB = require('pouchdb');
const db = new PouchDB('parse');

function loadFile(file) {
    return new Promise((resolve, reject) => {

        let obj;
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) 
                reject(err);

            data = JSON.parse(data);
            resolve(data);
        });
    });
}

loadFile('log.json')
    .then(res => {
        console.log(res);
        db.post(res).then((res) => {
            console.log("Document inserted OK");
        }).catch((err) => {
            console.error(err);
        });
    })
    .catch(err => console.error(err));
