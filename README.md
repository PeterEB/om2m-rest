# om2m-rest
oneM2M REST api.

[![NPM](https://nodei.co/npm/om2m-rest.png?downloads=true)](https://nodei.co/npm/om2m-rest/)  

[![npm](https://img.shields.io/npm/v/om2m-rest.svg?maxAge=2592000)](https://www.npmjs.com/package/om2m-rest)
[![npm](https://img.shields.io/npm/l/om2m-rest.svg?maxAge=2592000)](https://www.npmjs.com/package/om2m-rest)

<br />

## Documentation  

Please visit the [Wiki](https://github.com/PeterEB/om2m-rest/wiki).

<br />

## Overview

oneM2M REST api.

<br />

## Installation

> $ npm install om2m-rest --save

<br />

## Usage

```js
var Om2m = require('om2m-rest');

// initialize om2m configuration 
var om2m = new Om2m('192.168.1.112', 8282, 'mn-ces', 'my-mn', 'admin', 'admin');

// create your application 
om2m.createApp('MY_SENSOR', 'my_sensor', 'Type/sensor', false, function (err, msg) {
    console.log(msg);
});

// create your container 
om2m.createCont('MY_SENSOR', 'DATA', 10, function (err, msg) {
    console.log(msg);
});

// create your content instance 
om2m.createDataInst('MY_SENSOR', 'DATA', temperature, { sensorValue: 25.6 }, function (err, msg) {
    console.log(msg);
});
```

<br />

## License

Licensed under [MIT](https://github.com/PeterEB/om2m-rest/blob/master/LICENSE).
