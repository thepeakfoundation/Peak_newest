/*
* EXPERIMENTAL_pouchdb-orbit.js
*
* This file is meant for testing the use of PouchDB with OrbitDB plugin for file uploads and downloads.
* OrbitDB is a decentralized database system. PouchDB is also that but different.
*
* How to use:
*   In Terminal, type node EXPERIMENTAL_pouchdb-orbit.js
*
 */

/***********************
 *  Load Dependencies  *
 ***********************/
var PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-orbit"));

var IPFS = require("ipfs");
var OrbitDB = require("orbit-db");


/***********************
 *  Initialize IPFS    *
 **********************/

// IPFS options
const ipfsOptions = {
  EXPERIMENTAL: {
      pubsub: true
  }
};

const ipfs = new IPFS(ipfsOptions);

// make these values globally accessible
let database_ID;
let database_path;


ipfs.on('error', (e) => console.error(e));
ipfs.on('ready', async () => {
    const orbitdb = await OrbitDB.createInstance(ipfs);

    const db = new PouchDB('experimentalDB/pouchdb-orbit_store');
    db.load(orbitdb).then(function () {
        console.log("Hey, it works!");

        database_ID = db.address.root;
        database_path = db.address.path;

        console.log("DB address: " + database_ID);
        console.log("DB path: " + "/" + database_path);
    });

    // TODO: add put and get functions

});