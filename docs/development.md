# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop ccscore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/ccscore-node.git
git clone git@github.com:<yourusername>/ccscore-lib.git
```

To develop ccs or to compile from source:

```bash
git clone git@github.com:<yourusername>/ccscoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See ccs documentation for building ccs on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download ccs distribution, you'll need to compile ccsd from source, and setup your configuration to use that version.


We now will setup symlinks in `ccscore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf ccscore-lib
ln -s ~/ccscore-lib
rm -rf ccsd-rpc
ln -s ~/ccsd-rpc
```

And if you're compiling or developing ccscoin:
```bash
cd ../bin
ln -sf ~/ccs/src/ccsd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd ccscore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/ccsd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/ccsd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch ccscore-node.json
touch package.json
```

Edit `ccscore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "ccsd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "ccsd": {
      "spawn": {
        "datadir": "/home/<youruser>/.ccs",
        "exec": "/home/<youruser>/ccs/src/ccsd"
      }
    }
  }
}
```

**Note**: To install services [ccs-insight-api](https://github.com/ccsproject/insight-api) and [ccs-explorer](https://github.com/ccsproject/ccs-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/ccscore-lib
ln -s ~/ccscore-node
ln -s ~/ccs-insight-api
ln -s ~/ccs-explorer
```

Make sure that the `<datadir>/ccs.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../ccscore-node/bin/ccscore-node start
```