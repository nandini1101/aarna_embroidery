"use strict";

const crypto = require('crypto');

var PaytmChecksum = function() {
    this.iv = '@@@@&&&&####$$$$';
};

PaytmChecksum.prototype.encrypt = function(input, key) {
    var cipher = crypto.createCipheriv('AES-128-CBC', key, this.iv);
    var encrypted = cipher.update(input, 'binary', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

PaytmChecksum.prototype.decrypt = function(encrypted, key) {
    var decipher = crypto.createDecipheriv('AES-128-CBC', key, this.iv);
    var decrypted = decipher.update(encrypted, 'base64', 'binary');
    try {
        decrypted += decipher.final('binary');
    } catch (e) {
        console.log(e);
    }
    return decrypted;
};

PaytmChecksum.prototype.genchecksum = function(params, key, cb) {
    var data = this.getStringByParams(params);
    var salt = this.generateRandomString(4);
    var hashString = data + '|' + salt;
    var checksum = this.encrypt(hashString, key);
    checksum += salt;
    cb(undefined, checksum);
};

PaytmChecksum.prototype.genchecksumbystring = function(params, key, cb) {
    var salt = this.generateRandomString(4);
    var hashString = params + '|' + salt;
    var checksum = this.encrypt(hashString, key);
    checksum += salt;
    cb(undefined, checksum);
};

PaytmChecksum.prototype.verifychecksum = function(params, key, checksumhash) {
    var data = this.getStringByParams(params);
    var temp = this.decrypt(checksumhash, key);
    var salt = temp.substr(temp.length - 4);
    var hashString = data + '|' + salt;
    var checksum = this.encrypt(hashString, key);
    return checksum === checksumhash;
};

PaytmChecksum.prototype.verifychecksumbystring = function(params, key, checksumhash) {
    var temp = this.decrypt(checksumhash, key);
    var salt = temp.substr(temp.length - 4);
    var hashString = params + '|' + salt;
    var checksum = this.encrypt(hashString, key);
    return checksum === checksumhash;
};

PaytmChecksum.prototype.getStringByParams = function(params) {
    var data = '';
    var tempKeys = Object.keys(params);
    tempKeys.sort();
    tempKeys.forEach(function(key) {
        var value = params[key] !== 'null' && params[key] !== 'undefined' ? params[key] : '';
        data += value + '|';
    });
    return data.substr(0, data.length - 1);
};

PaytmChecksum.prototype.generateRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, length); // return required number of characters
};

module.exports = new PaytmChecksum();
