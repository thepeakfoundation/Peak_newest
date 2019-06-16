var IPFS = require("ipfs");
var OrbitDB = require("orbit-db");

const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    }
};

const ipfs = new IPFS(ipfsOptions);

const filename = process.argv.slice(2);
const file = process.argv.slice(3);



ipfs.on('ready', async () => {
    const orbitdb = await OrbitDB.createInstance(ipfs);

    // Create / Open a database
    const kv = await orbitdb.kvstore('kv_storage');
    await kv.load();

    const hash = await kv.put(filename, file);
    console.log(hash);

    const result = await kv.get(filename);
    console.log(result);
});