
# usage

``` js
let lb = require('lb')
let { Server, Client } = lb


```

# api

``` js
Server
    startServer
    getBestUnit
    getLowerestUnit
    sendData
    getData

Client
    registerClient
    getInfo
    initInfo
    sendData
    getData
```

## let client = new Client(host, port)

Create a new norcal instance `cal` from:

* `host` - server host to connect
* `port` - server port to use

## let server = new Server(host, port)
## server.startServer()
* `host` - server host to connect
* `port` - server port to use


# install

To get the command-line tool:

```
npm install -g lb
```

To get the library:

```
npm install lb
```

# license

BSD