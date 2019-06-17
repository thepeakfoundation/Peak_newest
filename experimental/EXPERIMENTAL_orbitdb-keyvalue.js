/*
* EXPERIMENTAL_orbitdb-keyvalue.js
*
* This file is meant for testing the use of OrbitDB for file uploads and downloads.
* OrbitDB is a decentralized database system.
*
* How to use:
*   In Terminal, type node EXPERIMENTAL_orbitdb-keyvalue.js filnavn fil
*   For example: node EXPERIMENTAL_orbitdb-keyvalue.js greatestpornvideo greatestpornvideo.mp4
*
 */

/***********************
 *  Load Dependencies  *
***********************/

var IPFS = require("ipfs");
var OrbitDB = require("orbit-db");
const fs = require('fs');
const buffer = require('buffer');

/***********************
 *  Initialize IPFS    *
 **********************/

const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    }
};

const ipfs = new IPFS(ipfsOptions);


const filename = process.argv.slice(2);
const file = process.argv.slice(3);


/*****************************************
 *  Load script logic when IPFS is ready *
 ****************************************/

ipfs.on('ready', async () => {
    // create OrbitDB instance with IPFS
    const orbitdb = await OrbitDB.createInstance(ipfs);

    // Create and load database with name 'kv_storage', shortened to 'kv'
    const kv = await orbitdb.kvstore('experimentalDB/orbitdb-kv_storage');
    await kv.load();

    // if the file inputted exists...
     fs.access(file, async (error) => {
        if (!error) { // if the file inputted exists
            var hash = await kv.put(filename, file); // upload the file with the associated filename to the database

            console.log("File hash: " + hash) // Log the file hash to the terminal
            var result = await kv.get(filename); // get the file from the database given the filename
            console.log(result); // Log file (key) to terminal
        } if (error) {
            console.error("File does not exist!"); // error if the file doesn't exist
        }
    });
});
