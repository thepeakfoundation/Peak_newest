

var PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-orbit"));

var IPFS = require("ipfs");
var OrbitDB = require("orbit-db");

const ipfsOptions = {
  EXPERIMENTAL: {
      pubsub: true
  }
};

let database_ID;
let database_path;

const ipfs = new IPFS(ipfsOptions);

ipfs.on('error', (e) => console.error(e));
ipfs.on('ready', async () => {
    const orbitdb = await OrbitDB.createInstance(ipfs);

    const db = new PouchDB('orbit_store');
    db.load(orbitdb).then(function () {
        console.log("Hey, it works!");

        database_ID = db.address.root;
        database_path = db.address.path;

        console.log("DB address: " + database_ID);
        console.log("DB path: " + "/" + database_path);
    });

});