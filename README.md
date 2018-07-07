---
[![npm version](https://badge.fury.io/js/malta-dev-srv.svg)](http://badge.fury.io/js/malta-dev-srv)
[![Dependencies](https://david-dm.org/fedeghe/malta-dev-srv.svg)](https://david-dm.org/fedeghe/malta-dev-srv)
[![npm downloads](https://img.shields.io/npm/dt/malta-dev-srv.svg)](https://npmjs.org/package/malta-dev-srv)
[![npm downloads](https://img.shields.io/npm/dm/malta-dev-srv.svg)](https://npmjs.org/package/malta-dev-srv)  
---  

This plugin can be started on: **.html**

**It needs to be installed globally**

`> npm i -g malta-dev-srv`  

It starts a really raw simple http server on the host and port needed, default values are the following:
- host: localhost
- port: 3001


Sample usage:  
```
> malta app/views/index.html . -plugins=malta-dev-srv[port:12345,host:\'192.168.2.103\']
```
or in the .json file :
```
{
    ...,
    "app/views/index.html" : "public -plugins=malta-dev-srv",
    ...
}
```
