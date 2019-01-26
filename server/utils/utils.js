/**
 * Created by Desenvolvimento 03 on 23/02/2017.
 */

exports.buffToStr = function (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};

exports.strToBuff = function (str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};
