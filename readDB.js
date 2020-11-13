'use strict';

const PouchDB = require('pouchdb');

const db = new PouchDB('parse');

// Get a document
function getDoc() {
    db.get('47efe291-c888-4cd7-ae32-d12710c91b01').then((doc) => {
        console.log(`${doc.endpoint}, ${doc.date}, ${doc.ref}`);
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
    });;
}

getAllDoc();