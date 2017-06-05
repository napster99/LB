
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

## let unit = server.getLowerestUnit()
* back data {'192.168.1.1:6969' : {'cpu' : 42, 'mem':5432232}}
 
## let unit = server.getBestUnit()
* back data {'192.168.1.1:6969' : {'cpu' : 42, 'mem':5432232}}

# install

To get the command-line tool:

```
npm install -g lb_
```

To get the library:

```
npm install lb_
```
# version 
1.0.0
# license



BSD