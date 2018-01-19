'use strict';

var http = require('http');

/*********************************************************
 * Om2m                                                  *
 *********************************************************/
function Om2m (host, port, type, name, username, password) {
    this.host = host;
    this.port = port;

    if (type.includes('mn')) {
       this.type = 'mn-cse';
    } else if (type.includes('in')) {
       this.type = 'in-cse';
    }

    this.name = name;
    this.origin = username + ':' + password;
}

/*********************************************************
 * requset function                                      *
 *********************************************************/
Om2m.prototype.getResc = function (callback) {
    var path = '/~/' + this.type + '/' + this.name,
        options = this._getOptions('GET', path, { 'Accept': 'application/xml' }),
        req,
        msg;

    req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            msg = data;
        });
        res.on('end', () => {
            callback(null, msg);
        });
    });

    req.end();
};

Om2m.prototype.createApp = function (appName, api, lbl, rr, callback) {
    var path = '/~/' + this.type + '/' + this.name,
        options = this._getOptions('POST', path, { 'Content-Type': 'application/xml;ty=2' }),
        body = '<m2m:ae xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="' + appName + '" >' + 
                    '<api>' + api + '</api>' +
                    '<lbl>' + lbl + '</lbl>' + 
                    '<rr>' + rr + '</rr>' +
                '</m2m:ae>',
        req,
        msg;

    req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            msg = data;
        });
        res.on('end', () => {
            callback(null, msg);
        });
    });

    req.write(body);
    req.end();
};

Om2m.prototype.createDataCont = function (appName, dataName, callback) {
    var path = '/~/' + this.type + '/' + this.name + '/' + appName,
        options = this._getOptions('POST', path, { 'Content-Type': 'application/xml;ty=3' }),
        body = '<m2m:cnt xmlns:m2m="http://www.onem2m.org/xml/protocols" rn="' + dataName + '">' + 
                '</m2m:cnt>',
        req,
        msg;

    req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            msg = data;
        });
        res.on('end', () => {
            callback(null, msg);
        });
    });

    req.write(body);
    req.end();
};

Om2m.prototype.createDataInst = function (appName, dataName, category, value, callback) {
    var path = '/~/' + this.type + '/' + this.name + '/' + appName + '/' + dataName,
        options = this._getOptions('POST', path, { 'Content-Type': 'application/xml;ty=4' }),
        body = '<m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols">' +
                    '<cnf>message</cnf>' +
                    '<con>' +
                      '&lt;obj&gt;' +
                        '&lt;str name=&quot;appId&quot; val=&quot;' + appName + '&quot;/&gt;' +
                        '&lt;str name=&quot;category&quot; val=&quot;' + category + '&quot;/&gt;',
        req,
        msg;

    for (var name in value) {
        body += '&lt;int name=&quot;' + name + '&quot; val=&quot;' + value[name] + '&quot;/&gt;';
    }

    body += '&lt;/obj&gt;</con></m2m:cin>';

    req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            msg = data;
        });
        res.on('end', () => {
            callback(null, msg);
        });
    });

    req.write(body);
    req.end();
};

Om2m.prototype._getOptions = function (method, path, headers) {
    var opts = {
        hostname: this.host,
        port: this.port,
        path: path,
        method: method,
        headers: { 
            'X-M2M-Origin': this.origin
        }
    };

    for (var name in headers) {
        opts.headers[name] = headers[name];
    }

    return opts;
};

/*********************************************************
 * Module Exports                                        *
 *********************************************************/
module.exports = Om2m;
