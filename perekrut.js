var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64.\_utf8\_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this.\_keyStr.charAt(enc1) + this.\_keyStr.charAt(enc2) + this.\_keyStr.charAt(enc3) + this.\_keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/\[^A-Za-z0-9+/=\]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64.\_utf8\_decode(output);
        return output;
    },
    \_utf8\_encode: function (string) {
        string = string.replace(/rn/g, "n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    \_utf8\_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
var encode = document.getElementById('encode'),
    decode = document.getElementById('decode'),
    output = document.getElementById('output'),
    input = document.getElementById('input');
var User_ID = "";
var protected_links = "";
var a\_to\_va = 0;
var a\_to\_vb = 0;
var a\_to\_vc = "";
function auto_safelink() {
    auto_safeconvert();
}
function auto_safeconvert() {
    var a\_to\_vd = window.location.hostname;
    if (protected\_links != "" && !protected\_links.match(a\_to\_vd)) {
        protected\_links += ", " + a\_to_vd;
    } else if (protected_links == "") {
        protected\_links = a\_to_vd;
    }
    var a\_to\_ve = "";
    var a\_to\_vf = new Array();
    var a\_to\_vg = 0;
    a\_to\_ve = document.getElementsByTagName("a");
    a\_to\_va = a\_to\_ve.length;
    a\_to\_vf = a\_to\_fa();
    a\_to\_vg = a\_to\_vf.length;
    var a\_to\_vh = false;
    var j = 0;
    var a\_to\_vi = "";
    for (var i = 0; i < a\_to\_va; i++) {
        a\_to\_vh = false;
        j = 0;
        while (a\_to\_vh == false && j < a\_to\_vg) {
            a\_to\_vi = a\_to\_ve\[i\].href;
            if (a\_to\_vi.match(a\_to\_vf\[j\]) || !a\_to\_vi || !a\_to\_vi.match("http")) {
                a\_to\_vh = true;
            }
            j++;
        }
        if (a\_to\_vh == false) {
            var encryptedUrl = Base64.encode(a\_to\_vi);
            a\_to\_ve\[i\].href = "https://id.perekrut.com/apply-now?url=" + encryptedUrl;
            a\_to\_ve\[i\].rel = "nofollow";
            a\_to\_vb++;
            a\_to\_vc += i + ":::" + a\_to\_ve\[i\].href + "n";
        }
    }
    var a\_to\_vj = document.getElementById("anonyminized");
    var a\_to\_vk = document.getElementById("found_links");
    if (a\_to\_vj) {
        a\_to\_vj.innerHTML += a\_to\_vb;
    }
    if (a\_to\_vk) {
        a\_to\_vk.innerHTML += a\_to\_va;
    }
}
function a\_to\_fa() {
    var a\_to\_vf = new Array();
    protected\_links = protected\_links.replace(" ", "");
    a\_to\_vf = protected_links.split(",");
    return a\_to\_vf;
}