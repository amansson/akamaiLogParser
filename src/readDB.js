'use strict';

const PouchDB = require('pouchdb');
const db = new PouchDB('parse');

// Get a document
function getDoc() {
    return db.get('c66dabb3-34b8-4b2a-ba41-427415a4fafe')
        .then((doc) => {
            return doc.docs[0]
        }).catch((err) => {
            console.error(err);
        });
}

// Get all documents
function getAllDoc() {
    db.allDocs({ include_docs: true, descending: true }, (err, doc) => {

        doc.rows.forEach(e => {
            console.log(e.doc);
        });

    }).catch((err) => {
        console.error(err);
    });
}

// Get info on DB
function infoDb() {
    db.info().then(function (info) {
        console.log(info);
    });
}

module.exports = {
    getDoc
}
