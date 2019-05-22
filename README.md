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
- **host**: localhost
- **port**: 3001
- **folder**: the one where malta is started from



So for example if we want to start it automatically at (first) build, using _public_ as webRoot, with a specific ip on a specific port:  
```
> malta app/views/index.html public -plugins=malta-dev-srv[port:12345,host:\'192.168.2.103\',folder:\"public\"]
```
or in the .json file :
```
{
    ...,
    "app/views/index.html" : "public -plugins=malta-dev-srv[folder:\"public\"]",
    ...
}
```

From v 1.1.0 it is also possible to serve what previously was served thx to a single entry point mechanism (like for example an .htaccess file for apache).  
In that case there are two more informations that need to be given to the plugin: 
- the entry point, using the `staticEp` param
- static/free paths, using the `staticFree` param (pipe separated paths)  
for example:
```
{
    ...
    "source/index.html" :  ". -plugins=malta-dev-srv[staticEp:'index.html',staticFree:'app|media']",
    ...
}
```
