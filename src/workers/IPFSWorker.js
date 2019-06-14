const IPFS = require('ipfs');
const node = new IPFS();

var userID;


// TODO: mute nonsense and only print user ID
node.on('ready', () => {
    node.id(async function (err, identity) {
        if (err) {
            throw err
        }
        userID = identity.id;
        console.log("Node is up and running at nodeID " + userID);
    });
});

