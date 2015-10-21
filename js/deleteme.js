function LatLon(e, t, n) {
    "undefined" == typeof n && (n = 6371), this._lat = "number" == typeof e ? e : "string" == typeof e && "" != e.trim() ? +e : 0 / 0, this._lon = "number" == typeof t ? t : "string" == typeof t && "" != t.trim() ? +t : 0 / 0, this._radius = "number" == typeof n ? n : "string" == typeof n && "" != trim(t) ? +n : 0 / 0
}
LatLon.prototype.distanceTo = function(e, t) {
    "undefined" == typeof t && (t = 4);
    var n = this._radius,
        r = this._lat.toRad(),
        o = this._lon.toRad(),
        i = e._lat.toRad(),
        a = e._lon.toRad(),
        s = i - r,
        l = a - o,
        u = Math.sin(s / 2) * Math.sin(s / 2) + Math.cos(r) * Math.cos(i) * Math.sin(l / 2) * Math.sin(l / 2),
        c = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u)),
        d = n * c;
    return d.toPrecisionFixed(t)
}, LatLon.prototype.bearingTo = function(e) {
    var t = this._lat.toRad(),
        n = e._lat.toRad(),
        r = (e._lon - this._lon).toRad(),
        o = Math.sin(r) * Math.cos(n),
        i = Math.cos(t) * Math.sin(n) - Math.sin(t) * Math.cos(n) * Math.cos(r),
        a = Math.atan2(o, i);
    return (a.toDeg() + 360) % 360
}, LatLon.prototype.finalBearingTo = function(e) {
    var t = e._lat.toRad(),
        n = this._lat.toRad(),
        r = (this._lon - e._lon).toRad(),
        o = Math.sin(r) * Math.cos(n),
        i = Math.cos(t) * Math.sin(n) - Math.sin(t) * Math.cos(n) * Math.cos(r),
        a = Math.atan2(o, i);
    return (a.toDeg() + 180) % 360
}, LatLon.prototype.midpointTo = function(e) {
    lat1 = this._lat.toRad(), lon1 = this._lon.toRad(), lat2 = e._lat.toRad();
    var t = (e._lon - this._lon).toRad(),
        n = Math.cos(lat2) * Math.cos(t),
        r = Math.cos(lat2) * Math.sin(t);
    return lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + n) * (Math.cos(lat1) + n) + r * r)), lon3 = lon1 + Math.atan2(r, Math.cos(lat1) + n), lon3 = (lon3 + 3 * Math.PI) % (2 * Math.PI) - Math.PI, new LatLon(lat3.toDeg(), lon3.toDeg())
}, LatLon.prototype.destinationPoint = function(e, t) {
    t = "number" == typeof t ? t : "string" == typeof t && "" != t.trim() ? +t : 0 / 0, t /= this._radius, e = e.toRad();
    var n = this._lat.toRad(),
        r = this._lon.toRad(),
        o = Math.asin(Math.sin(n) * Math.cos(t) + Math.cos(n) * Math.sin(t) * Math.cos(e)),
        i = r + Math.atan2(Math.sin(e) * Math.sin(t) * Math.cos(n), Math.cos(t) - Math.sin(n) * Math.sin(o));
    return i = (i + 3 * Math.PI) % (2 * Math.PI) - Math.PI, new LatLon(o.toDeg(), i.toDeg())
}, LatLon.intersection = function(e, t, n, r) {
    return t = "number" == typeof t ? t : "string" == typeof t && "" != trim(t) ? +t : 0 / 0, r = "number" == typeof r ? r : "string" == typeof r && "" != trim(r) ? +r : 0 / 0, lat1 = e._lat.toRad(), lon1 = e._lon.toRad(), lat2 = n._lat.toRad(), lon2 = n._lon.toRad(), brng13 = t.toRad(), brng23 = r.toRad(), dLat = lat2 - lat1, dLon = lon2 - lon1, dist12 = 2 * Math.asin(Math.sqrt(Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2))), 0 == dist12 ? null : (brngA = Math.acos((Math.sin(lat2) - Math.sin(lat1) * Math.cos(dist12)) / (Math.sin(dist12) * Math.cos(lat1))), isNaN(brngA) && (brngA = 0), brngB = Math.acos((Math.sin(lat1) - Math.sin(lat2) * Math.cos(dist12)) / (Math.sin(dist12) * Math.cos(lat2))), Math.sin(lon2 - lon1) > 0 ? (brng12 = brngA, brng21 = 2 * Math.PI - brngB) : (brng12 = 2 * Math.PI - brngA, brng21 = brngB), alpha1 = (brng13 - brng12 + Math.PI) % (2 * Math.PI) - Math.PI, alpha2 = (brng21 - brng23 + Math.PI) % (2 * Math.PI) - Math.PI, 0 == Math.sin(alpha1) && 0 == Math.sin(alpha2) ? null : Math.sin(alpha1) * Math.sin(alpha2) < 0 ? null : (alpha3 = Math.acos(-Math.cos(alpha1) * Math.cos(alpha2) + Math.sin(alpha1) * Math.sin(alpha2) * Math.cos(dist12)), dist13 = Math.atan2(Math.sin(dist12) * Math.sin(alpha1) * Math.sin(alpha2), Math.cos(alpha2) + Math.cos(alpha1) * Math.cos(alpha3)), lat3 = Math.asin(Math.sin(lat1) * Math.cos(dist13) + Math.cos(lat1) * Math.sin(dist13) * Math.cos(brng13)), dLon13 = Math.atan2(Math.sin(brng13) * Math.sin(dist13) * Math.cos(lat1), Math.cos(dist13) - Math.sin(lat1) * Math.sin(lat3)), lon3 = lon1 + dLon13, lon3 = (lon3 + 3 * Math.PI) % (2 * Math.PI) - Math.PI, new LatLon(lat3.toDeg(), lon3.toDeg())))
}, LatLon.prototype.rhumbDistanceTo = function(e) {
    var t = this._radius,
        n = this._lat.toRad(),
        r = e._lat.toRad(),
        o = (e._lat - this._lat).toRad(),
        i = Math.abs(e._lon - this._lon).toRad(),
        a = Math.log(Math.tan(r / 2 + Math.PI / 4) / Math.tan(n / 2 + Math.PI / 4)),
        s = isFinite(o / a) ? o / a : Math.cos(n);
    Math.abs(i) > Math.PI && (i = i > 0 ? -(2 * Math.PI - i) : 2 * Math.PI + i);
    var l = Math.sqrt(o * o + s * s * i * i) * t;
    return l.toPrecisionFixed(4)
}, LatLon.prototype.rhumbBearingTo = function(e) {
    var t = this._lat.toRad(),
        n = e._lat.toRad(),
        r = (e._lon - this._lon).toRad(),
        o = Math.log(Math.tan(n / 2 + Math.PI / 4) / Math.tan(t / 2 + Math.PI / 4));
    Math.abs(r) > Math.PI && (r = r > 0 ? -(2 * Math.PI - r) : 2 * Math.PI + r);
    var i = Math.atan2(r, o);
    return (i.toDeg() + 360) % 360
}, LatLon.prototype.rhumbDestinationPoint = function(e, t) {
    var n = this._radius,
        r = parseFloat(t) / n,
        o = this._lat.toRad(),
        i = this._lon.toRad();
    e = e.toRad();
    var a = r * Math.cos(e);
    Math.abs(a) < 1e-10 && (a = 0);
    var s = o + a,
        l = Math.log(Math.tan(s / 2 + Math.PI / 4) / Math.tan(o / 2 + Math.PI / 4)),
        u = isFinite(a / l) ? a / l : Math.cos(o),
        c = r * Math.sin(e) / u;
    return Math.abs(s) > Math.PI / 2 && (s = s > 0 ? Math.PI - s : -Math.PI - s), lon2 = (i + c + 3 * Math.PI) % (2 * Math.PI) - Math.PI, new LatLon(s.toDeg(), lon2.toDeg())
}, LatLon.prototype.rhumbMidpointTo = function(e) {
    lat1 = this._lat.toRad(), lon1 = this._lon.toRad(), lat2 = e._lat.toRad(), lon2 = e._lon.toRad(), Math.abs(lon2 - lon1) > Math.PI && (lon1 += 2 * Math.PI);
    var t = (lat1 + lat2) / 2,
        n = Math.tan(Math.PI / 4 + lat1 / 2),
        r = Math.tan(Math.PI / 4 + lat2 / 2),
        o = Math.tan(Math.PI / 4 + t / 2),
        i = ((lon2 - lon1) * Math.log(o) + lon1 * Math.log(r) - lon2 * Math.log(n)) / Math.log(r / n);
    return isFinite(i) || (i = (lon1 + lon2) / 2), i = (i + 3 * Math.PI) % (2 * Math.PI) - Math.PI, new LatLon(t.toDeg(), i.toDeg())
}, LatLon.prototype.lat = function(e, t) {
    return "undefined" == typeof e ? this._lat : Geo.toLat(this._lat, e, t)
}, LatLon.prototype.lon = function(e, t) {
    return "undefined" == typeof e ? this._lon : Geo.toLon(this._lon, e, t)
}, LatLon.prototype.toString = function(e, t) {
    return "undefined" == typeof e && (e = "dms"), Geo.toLat(this._lat, e, t) + ", " + Geo.toLon(this._lon, e, t)
}, "undefined" == typeof Number.prototype.toRad && (Number.prototype.toRad = function() {
    return this * Math.PI / 180
}), "undefined" == typeof Number.prototype.toDeg && (Number.prototype.toDeg = function() {
    return 180 * this / Math.PI
}), "undefined" == typeof Number.prototype.toPrecisionFixed && (Number.prototype.toPrecisionFixed = function(e) {
    var t = this.toPrecision(e);
    return t = t.replace(/(.+)e\+(.+)/, function(e, t, n) {
        for (t = t.replace(/\./, ""), l = t.length - 1; n-- > l;) t += "0";
        return t
    }), t = t.replace(/(.+)e-(.+)/, function(e, t, n) {
        for (t = t.replace(/\./, ""); n-- > 1;) t = "0" + t;
        return "0." + t
    })
}), "undefined" == typeof String.prototype.trim && (String.prototype.trim = function() {
    return String(this).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}), window.console || (window.console = {
    log: function() {}
});
var Geo = {};
Geo.parseDMS = function(e) {
    if ("object" == typeof n) throw new TypeError("Geo.parseDMS - dmsStr is [DOM?] object");
    if ("number" == typeof e && isFinite(e)) return Number(e);
    var t = String(e).trim().replace(/^-/, "").replace(/[NSEW]$/i, "").split(/[^0-9.,]+/);
    if ("" == t[t.length - 1] && t.splice(t.length - 1), "" == t) return 0 / 0;
    switch (t.length) {
        case 3:
            var n = t[0] / 1 + t[1] / 60 + t[2] / 3600;
            break;
        case 2:
            var n = t[0] / 1 + t[1] / 60;
            break;
        case 1:
            var n = t[0];
            break;
        default:
            return 0 / 0
    }
    return /^-|[WS]$/i.test(e.trim()) && (n = -n), Number(n)
}, Geo.toDMS = function(e, t, n) {
    if ("object" == typeof e) throw new TypeError("Geo.toDMS - deg is [DOM?] object");
    if (isNaN(e)) return null;
    if ("undefined" == typeof t && (t = "dms"), "undefined" == typeof n) switch (t) {
        case "d":
            n = 4;
            break;
        case "dm":
            n = 2;
            break;
        case "dms":
            n = 0;
            break;
        default:
            t = "dms", n = 0
    }
    switch (e = Math.abs(e), t) {
        case "d":
            o = e.toFixed(n), 100 > o && (o = "0" + o), 10 > o && (o = "0" + o), dms = o + "Â°";
            break;
        case "dm":
            var r = (60 * e).toFixed(n),
                o = Math.floor(r / 60),
                i = (r % 60).toFixed(n);
            100 > o && (o = "0" + o), 10 > o && (o = "0" + o), 10 > i && (i = "0" + i), dms = o + "Â°" + i + "â€²";
            break;
        case "dms":
            var a = (3600 * e).toFixed(n),
                o = Math.floor(a / 3600),
                i = Math.floor(a / 60) % 60,
                s = (a % 60).toFixed(n);
            100 > o && (o = "0" + o), 10 > o && (o = "0" + o), 10 > i && (i = "0" + i), 10 > s && (s = "0" + s), dms = o + "Â°" + i + "â€²" + s + "â€³"
    }
    return dms
}, Geo.toLat = function(e, t, n) {
    var r = Geo.toDMS(e, t, n);
    return null == r ? "â€“" : r.slice(1) + (0 > e ? "S" : "N")
}, Geo.toLon = function(e, t, n) {
    var r = Geo.toDMS(e, t, n);
    return null == r ? "â€“" : r + (0 > e ? "W" : "E")
}, Geo.toBrng = function(e, t, n) {
    e = (Number(e) + 360) % 360;
    var r = Geo.toDMS(e, t, n);
    return null == r ? "â€“" : r.replace("360", "0")
}, window.console || (window.console = {
    log: function() {}
}),
function(e, t) {
    function n(e) {
        var t = gt[e] = {};
        return Z.each(e.split(nt), function(e, n) {
            t[n] = !0
        }), t
    }

    function r(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var o = "data-" + n.replace(vt, "-$1").toLowerCase();
            if (r = e.getAttribute(o), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : mt.test(r) ? Z.parseJSON(r) : r
                } catch (i) {}
                Z.data(e, n, r)
            } else r = t
        }
        return r
    }

    function o(e) {
        var t;
        for (t in e)
            if (("data" !== t || !Z.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function i() {
        return !1
    }

    function a() {
        return !0
    }

    function s(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }

    function l(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function u(e, t, n) {
        if (t = t || 0, Z.isFunction(t)) return Z.grep(e, function(e, r) {
            var o = !! t.call(e, r, e);
            return o === n
        });
        if (t.nodeType) return Z.grep(e, function(e, r) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var r = Z.grep(e, function(e) {
                return 1 === e.nodeType
            });
            if (Ht.test(t)) return Z.filter(t, r, !n);
            t = Z.filter(t, r)
        }
        return Z.grep(e, function(e, r) {
            return Z.inArray(e, t) >= 0 === n
        })
    }

    function c(e) {
        var t = Ot.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function d(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function p(e, t) {
        if (1 === t.nodeType && Z.hasData(e)) {
            var n, r, o, i = Z._data(e),
                a = Z._data(t, i),
                s = i.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)
                    for (r = 0, o = s[n].length; o > r; r++) Z.event.add(t, n, s[n][r])
            }
            a.data && (a.data = Z.extend({}, a.data))
        }
    }

    function f(e, t) {
        var n;
        1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), Z.support.html5Clone && e.innerHTML && !Z.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Qt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text), t.removeAttribute(Z.expando))
    }

    function h(e) {
        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
    }

    function g(e) {
        Qt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function m(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, o = bn.length; o--;)
            if (t = bn[o] + n, t in e) return t;
        return r
    }

    function v(e, t) {
        return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
    }

    function y(e, t) {
        for (var n, r, o = [], i = 0, a = e.length; a > i; i++) n = e[i], n.style && (o[i] = Z._data(n, "olddisplay"), t ? (o[i] || "none" !== n.style.display || (n.style.display = ""), "" === n.style.display && v(n) && (o[i] = Z._data(n, "olddisplay", T(n.nodeName)))) : (r = rn(n, "display"), o[i] || "none" === r || Z._data(n, "olddisplay", r)));
        for (i = 0; a > i; i++) n = e[i], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? o[i] || "" : "none"));
        return e
    }

    function b(e, t, n) {
        var r = pn.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function w(e, t, n, r) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, i = 0; 4 > o; o += 2) "margin" === n && (i += Z.css(e, n + yn[o], !0)), r ? ("content" === n && (i -= parseFloat(rn(e, "padding" + yn[o])) || 0), "margin" !== n && (i -= parseFloat(rn(e, "border" + yn[o] + "Width")) || 0)) : (i += parseFloat(rn(e, "padding" + yn[o])) || 0, "padding" !== n && (i += parseFloat(rn(e, "border" + yn[o] + "Width")) || 0));
        return i
    }

    function x(e, t, n) {
        var r = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = !0,
            i = Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing");
        if (0 >= r || null == r) {
            if (r = rn(e, t), (0 > r || null == r) && (r = e.style[t]), fn.test(r)) return r;
            o = i && (Z.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + w(e, t, n || (i ? "border" : "content"), o) + "px"
    }

    function T(e) {
        if (gn[e]) return gn[e];
        var t = Z("<" + e + ">").appendTo(q.body),
            n = t.css("display");
        return t.remove(), ("none" === n || "" === n) && (on = q.body.appendChild(on || Z.extend(q.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), an && on.createElement || (an = (on.contentWindow || on.contentDocument).document, an.write("<!doctype html><html><body>"), an.close()), t = an.body.appendChild(an.createElement(e)), n = rn(t, "display"), q.body.removeChild(on)), gn[e] = n, n
    }

    function M(e, t, n, r) {
        var o;
        if (Z.isArray(t)) Z.each(t, function(t, o) {
            n || Tn.test(e) ? r(e, o) : M(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, r)
        });
        else if (n || "object" !== Z.type(t)) r(e, t);
        else
            for (o in t) M(e + "[" + o + "]", t[o], n, r)
    }

    function N(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, o, i, a = t.toLowerCase().split(nt),
                s = 0,
                l = a.length;
            if (Z.isFunction(n))
                for (; l > s; s++) r = a[s], i = /^\+/.test(r), i && (r = r.substr(1) || "*"), o = e[r] = e[r] || [], o[i ? "unshift" : "push"](n)
        }
    }

    function C(e, n, r, o, i, a) {
        i = i || n.dataTypes[0], a = a || {}, a[i] = !0;
        for (var s, l = e[i], u = 0, c = l ? l.length : 0, d = e === Fn; c > u && (d || !s); u++) s = l[u](n, r, o), "string" == typeof s && (!d || a[s] ? s = t : (n.dataTypes.unshift(s), s = C(e, n, r, o, s, a)));
        return !d && s || a["*"] || (s = C(e, n, r, o, "*", a)), s
    }

    function k(e, n) {
        var r, o, i = Z.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((i[r] ? e : o || (o = {}))[r] = n[r]);
        o && Z.extend(!0, e, o)
    }

    function E(e, n, r) {
        var o, i, a, s, l = e.contents,
            u = e.dataTypes,
            c = e.responseFields;
        for (i in c) i in r && (n[c[i]] = r[i]);
        for (;
            "*" === u[0];) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("content-type"));
        if (o)
            for (i in l)
                if (l[i] && l[i].test(o)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in r) a = u[0];
        else {
            for (i in r) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    a = i;
                    break
                }
                s || (s = i)
            }
            a = a || s
        }
        return a ? (a !== u[0] && u.unshift(a), r[a]) : void 0
    }

    function S(e, t) {
        var n, r, o, i, a = e.dataTypes.slice(),
            s = a[0],
            l = {}, u = 0;
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), a[1])
            for (n in e.converters) l[n.toLowerCase()] = e.converters[n];
        for (; o = a[++u];)
            if ("*" !== o) {
                if ("*" !== s && s !== o) {
                    if (n = l[s + " " + o] || l["* " + o], !n)
                        for (r in l)
                            if (i = r.split(" "), i[1] === o && (n = l[s + " " + i[0]] || l["* " + i[0]])) {
                                n === !0 ? n = l[r] : l[r] !== !0 && (o = i[0], a.splice(u--, 0, o));
                                break
                            }
                    if (n !== !0)
                        if (n && e["throws"]) t = n(t);
                        else try {
                            t = n(t)
                        } catch (c) {
                            return {
                                state: "parsererror",
                                error: n ? c : "No conversion from " + s + " to " + o
                            }
                        }
                }
                s = o
            }
        return {
            state: "success",
            data: t
        }
    }

    function L() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function D() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function A() {
        return setTimeout(function() {
            Vn = t
        }, 0), Vn = Z.now()
    }

    function _(e, t) {
        Z.each(t, function(t, n) {
            for (var r = (tr[t] || []).concat(tr["*"]), o = 0, i = r.length; i > o; o++)
                if (r[o].call(e, t, n)) return
        })
    }

    function j(e, t, n) {
        var r, o = 0,
            i = 0,
            a = er.length,
            s = Z.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                for (var t = Vn || A(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, i = 0, a = u.tweens.length; a > i; i++) u.tweens[i].run(o);
                return s.notifyWith(e, [u, o, n]), 1 > o && a ? n : (s.resolveWith(e, [u]), !1)
            }, u = s.promise({
                elem: e,
                props: Z.extend({}, t),
                opts: Z.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Vn || A(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n, r) {
                    var o = Z.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(o), o
                },
                stop: function(t) {
                    for (var n = 0, r = t ? u.tweens.length : 0; r > n; n++) u.tweens[n].run(1);
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
                }
            }),
            c = u.props;
        for (P(c, u.opts.specialEasing); a > o; o++)
            if (r = er[o].call(u, e, c, u.opts)) return r;
        return _(u, c), Z.isFunction(u.opts.start) && u.opts.start.call(e, u), Z.fx.timer(Z.extend(l, {
            anim: u,
            queue: u.opts.queue,
            elem: e
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function P(e, t) {
        var n, r, o, i, a;
        for (n in e)
            if (r = Z.camelCase(n), o = t[r], i = e[n], Z.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), a = Z.cssHooks[r], a && "expand" in a) {
                i = a.expand(i), delete e[r];
                for (n in i) n in e || (e[n] = i[n], t[n] = o)
            } else t[r] = o
    }

    function I(e, t, n) {
        var r, o, i, a, s, l, u, c, d, p = this,
            f = e.style,
            h = {}, g = [],
            m = e.nodeType && v(e);
        n.queue || (c = Z._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, d = c.empty.fire, c.empty.fire = function() {
            c.unqueued || d()
        }), c.unqueued++, p.always(function() {
            p.always(function() {
                c.unqueued--, Z.queue(e, "fx").length || c.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === Z.css(e, "display") && "none" === Z.css(e, "float") && (Z.support.inlineBlockNeedsLayout && "inline" !== T(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", Z.support.shrinkWrapBlocks || p.done(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], Jn.exec(i)) {
                if (delete t[r], l = l || "toggle" === i, i === (m ? "hide" : "show")) continue;
                g.push(r)
            }
        if (a = g.length) {
            s = Z._data(e, "fxshow") || Z._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), l && (s.hidden = !m), m ? Z(e).show() : p.done(function() {
                Z(e).hide()
            }), p.done(function() {
                var t;
                Z.removeData(e, "fxshow", !0);
                for (t in h) Z.style(e, t, h[t])
            });
            for (r = 0; a > r; r++) o = g[r], u = p.createTween(o, m ? s[o] : 0), h[o] = s[o] || Z.style(e, o), o in s || (s[o] = u.start, m && (u.end = u.start, u.start = "width" === o || "height" === o ? 1 : 0))
        }
    }

    function H(e, t, n, r, o) {
        return new H.prototype.init(e, t, n, r, o)
    }

    function F(e, t) {
        var n, r = {
                height: e
            }, o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = yn[o], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function R(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var O, B, q = e.document,
        W = e.location,
        z = e.navigator,
        X = e.jQuery,
        G = e.$,
        Y = Array.prototype.push,
        U = Array.prototype.slice,
        V = Array.prototype.indexOf,
        Q = Object.prototype.toString,
        J = Object.prototype.hasOwnProperty,
        K = String.prototype.trim,
        Z = function(e, t) {
            return new Z.fn.init(e, t, O)
        }, et = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        tt = /\S/,
        nt = /\s+/,
        rt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ot = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        it = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        at = /^[\],:{}\s]*$/,
        st = /(?:^|:|,)(?:\s*\[)+/g,
        lt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        ut = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        ct = /^-ms-/,
        dt = /-([\da-z])/gi,
        pt = function(e, t) {
            return (t + "").toUpperCase()
        }, ft = function() {
            q.addEventListener ? (q.removeEventListener("DOMContentLoaded", ft, !1), Z.ready()) : "complete" === q.readyState && (q.detachEvent("onreadystatechange", ft), Z.ready())
        }, ht = {};
    Z.fn = Z.prototype = {
        constructor: Z,
        init: function(e, n, r) {
            var o, i, a, s;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if ("string" == typeof e) {
                if (o = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ot.exec(e), !o || !o[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (o[1]) return n = n instanceof Z ? n[0] : n, s = n && n.nodeType ? n.ownerDocument || n : q, e = Z.parseHTML(o[1], s, !0), it.test(o[1]) && Z.isPlainObject(n) && this.attr.call(e, n, !0), Z.merge(this, e);
                if (i = q.getElementById(o[2]), i && i.parentNode) {
                    if (i.id !== o[2]) return r.find(e);
                    this.length = 1, this[0] = i
                }
                return this.context = q, this.selector = e, this
            }
            return Z.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return U.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, n) {
            var r = Z.merge(this.constructor(), e);
            return r.prevObject = this, r.context = this.context, "find" === t ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
        },
        each: function(e, t) {
            return Z.each(this, e, t)
        },
        ready: function(e) {
            return Z.ready.promise().done(e), this
        },
        eq: function(e) {
            return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(U.apply(this, arguments), "slice", U.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(Z.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Y,
        sort: [].sort,
        splice: [].splice
    }, Z.fn.init.prototype = Z.fn, Z.extend = Z.fn.extend = function() {
        var e, n, r, o, i, a, s = arguments[0] || {}, l = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || Z.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++)
            if (null != (e = arguments[l]))
                for (n in e) r = s[n], o = e[n], s !== o && (c && o && (Z.isPlainObject(o) || (i = Z.isArray(o))) ? (i ? (i = !1, a = r && Z.isArray(r) ? r : []) : a = r && Z.isPlainObject(r) ? r : {}, s[n] = Z.extend(c, a, o)) : o !== t && (s[n] = o));
        return s
    }, Z.extend({
        noConflict: function(t) {
            return e.$ === Z && (e.$ = G), t && e.jQuery === Z && (e.jQuery = X), Z
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Z.readyWait++ : Z.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--Z.readyWait : !Z.isReady) {
                if (!q.body) return setTimeout(Z.ready, 1);
                Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (B.resolveWith(q, [Z]), Z.fn.trigger && Z(q).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === Z.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === Z.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? String(e) : ht[Q.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || "object" !== Z.type(e) || e.nodeType || Z.isWindow(e)) return !1;
            try {
                if (e.constructor && !J.call(e, "constructor") && !J.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            var r;
            for (r in e);
            return r === t || J.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            var r;
            return e && "string" == typeof e ? ("boolean" == typeof t && (n = t, t = 0), t = t || q, (r = it.exec(e)) ? [t.createElement(r[1])] : (r = Z.buildFragment([e], t, n ? null : []), Z.merge([], (r.cacheable ? Z.clone(r.fragment) : r.fragment).childNodes))) : null
        },
        parseJSON: function(t) {
            return t && "string" == typeof t ? (t = Z.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : at.test(t.replace(lt, "@").replace(ut, "]").replace(st, "")) ? new Function("return " + t)() : void Z.error("Invalid JSON: " + t)) : null
        },
        parseXML: function(n) {
            var r, o;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (o = new DOMParser, r = o.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch (i) {
                r = t
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || Z.error("Invalid XML: " + n), r
        },
        noop: function() {},
        globalEval: function(t) {
            t && tt.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(ct, "ms-").replace(dt, pt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, n, r) {
            var o, i = 0,
                a = e.length,
                s = a === t || Z.isFunction(e);
            if (r)
                if (s) {
                    for (o in e)
                        if (n.apply(e[o], r) === !1) break
                } else
                    for (; a > i && n.apply(e[i++], r) !== !1;);
                else if (s) {
                for (o in e)
                    if (n.call(e[o], o, e[o]) === !1) break
            } else
                for (; a > i && n.call(e[i], i, e[i++]) !== !1;);
            return e
        },
        trim: K && !K.call("ï»¿Â ") ? function(e) {
            return null == e ? "" : K.call(e)
        } : function(e) {
            return null == e ? "" : (e + "").replace(rt, "")
        },
        makeArray: function(e, t) {
            var n, r = t || [];
            return null != e && (n = Z.type(e), null == e.length || "string" === n || "function" === n || "regexp" === n || Z.isWindow(e) ? Y.call(r, e) : Z.merge(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (V) return V.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                o = e.length,
                i = 0;
            if ("number" == typeof r)
                for (; r > i; i++) e[o++] = n[i];
            else
                for (; n[i] !== t;) e[o++] = n[i++];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            var r, o = [],
                i = 0,
                a = e.length;
            for (n = !! n; a > i; i++) r = !! t(e[i], i), n !== r && o.push(e[i]);
            return o
        },
        map: function(e, n, r) {
            var o, i, a = [],
                s = 0,
                l = e.length,
                u = e instanceof Z || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Z.isArray(e));
            if (u)
                for (; l > s; s++) o = n(e[s], s, r), null != o && (a[a.length] = o);
            else
                for (i in e) o = n(e[i], i, r), null != o && (a[a.length] = o);
            return a.concat.apply([], a)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, o, i;
            return "string" == typeof n && (r = e[n], n = e, e = r), Z.isFunction(e) ? (o = U.call(arguments, 2), i = function() {
                return e.apply(n, o.concat(U.call(arguments)))
            }, i.guid = e.guid = e.guid || Z.guid++, i) : t
        },
        access: function(e, n, r, o, i, a, s) {
            var l, u = null == r,
                c = 0,
                d = e.length;
            if (r && "object" == typeof r) {
                for (c in r) Z.access(e, n, c, r[c], 1, a, o);
                i = 1
            } else if (o !== t) {
                if (l = s === t && Z.isFunction(o), u && (l ? (l = n, n = function(e, t, n) {
                    return l.call(Z(e), n)
                }) : (n.call(e, o), n = null)), n)
                    for (; d > c; c++) n(e[c], r, l ? o.call(e[c], c, n(e[c], r)) : o, s);
                i = 1
            }
            return i ? e : u ? n.call(e) : d ? n(e[0], r) : a
        },
        now: function() {
            return (new Date).getTime()
        }
    }), Z.ready.promise = function(t) {
        if (!B)
            if (B = Z.Deferred(), "complete" === q.readyState) setTimeout(Z.ready, 1);
            else if (q.addEventListener) q.addEventListener("DOMContentLoaded", ft, !1), e.addEventListener("load", Z.ready, !1);
        else {
            q.attachEvent("onreadystatechange", ft), e.attachEvent("onload", Z.ready);
            var n = !1;
            try {
                n = null == e.frameElement && q.documentElement
            } catch (r) {}
            n && n.doScroll && ! function o() {
                if (!Z.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(o, 50)
                    }
                    Z.ready()
                }
            }()
        }
        return B.promise(t)
    }, Z.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        ht["[object " + t + "]"] = t.toLowerCase()
    }), O = Z(q);
    var gt = {};
    Z.Callbacks = function(e) {
        e = "string" == typeof e ? gt[e] || n(e) : Z.extend({}, e);
        var r, o, i, a, s, l, u = [],
            c = !e.once && [],
            d = function(t) {
                for (r = e.memory && t, o = !0, l = a || 0, a = 0, s = u.length, i = !0; u && s > l; l++)
                    if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        r = !1;
                        break
                    }
                i = !1, u && (c ? c.length && d(c.shift()) : r ? u = [] : p.disable())
            }, p = {
                add: function() {
                    if (u) {
                        var t = u.length;
                        ! function n(t) {
                            Z.each(t, function(t, r) {
                                var o = Z.type(r);
                                "function" === o ? e.unique && p.has(r) || u.push(r) : r && r.length && "string" !== o && n(r)
                            })
                        }(arguments), i ? s = u.length : r && (a = t, d(r))
                    }
                    return this
                },
                remove: function() {
                    return u && Z.each(arguments, function(e, t) {
                        for (var n;
                            (n = Z.inArray(t, u, n)) > -1;) u.splice(n, 1), i && (s >= n && s--, l >= n && l--)
                    }), this
                },
                has: function(e) {
                    return Z.inArray(e, u) > -1
                },
                empty: function() {
                    return u = [], this
                },
                disable: function() {
                    return u = c = r = t, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return c = t, r || p.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], !u || o && !c || (i ? c.push(t) : d(t)), this
                },
                fire: function() {
                    return p.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return p
    }, Z.extend({
        Deferred: function(e) {
            var t = [
                ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                ["notify", "progress", Z.Callbacks("memory")]
            ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return Z.Deferred(function(n) {
                            Z.each(t, function(t, r) {
                                var i = r[0],
                                    a = e[t];
                                o[r[1]](Z.isFunction(a) ? function() {
                                    var e = a.apply(this, arguments);
                                    e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[i + "With"](this === o ? n : this, [e])
                                } : n[i])
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? Z.extend(e, r) : r
                    }
                }, o = {};
            return r.pipe = r.then, Z.each(t, function(e, i) {
                var a = i[2],
                    s = i[3];
                r[i[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), o[i[0]] = a.fire, o[i[0] + "With"] = a.fireWith
            }), r.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            var t = 0,
                n = U.call(arguments),
                r = n.length,
                o = 1 !== r || e && Z.isFunction(e.promise) ? r : 0,
                i = 1 === o ? e : Z.Deferred(),
                a = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? U.call(arguments) : r, n === s ? i.notifyWith(t, n) : --o || i.resolveWith(t, n)
                    }
                }, s, l, u;
            if (r > 1)
                for (s = new Array(r), l = new Array(r), u = new Array(r); r > t; t++) n[t] && Z.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(i.reject).progress(a(t, l, s)) : --o;
            return o || i.resolveWith(u, n), i.promise()
        }
    }), Z.support = function() {
        var t, n, r, o, i, a, s, l, u, c, d, p = q.createElement("div");
        if (p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
        o = q.createElement("select"), i = o.appendChild(q.createElement("option")), a = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            leadingWhitespace: 3 === p.firstChild.nodeType,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: "/a" === r.getAttribute("href"),
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !! r.style.cssFloat,
            checkOn: "on" === a.value,
            optSelected: i.selected,
            getSetAttribute: "t" !== p.className,
            enctype: !! q.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== q.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === q.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !i.disabled;
        try {
            delete p.test
        } catch (f) {
            t.deleteExpando = !1
        }
        if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", d = function() {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", d)), a = q.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), p.appendChild(a), s = q.createDocumentFragment(), s.appendChild(p.lastChild), t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, s.removeChild(a), s.appendChild(p), p.attachEvent)
            for (u in {
                submit: !0,
                change: !0,
                focusin: !0
            }) l = "on" + u, c = l in p, c || (p.setAttribute(l, "return;"), c = "function" == typeof p[l]), t[u + "Bubbles"] = c;
        return Z(function() {
            var n, r, o, i, a = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                s = q.getElementsByTagName("body")[0];
            s && (n = q.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", s.insertBefore(n, s.firstChild), r = q.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = r.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === o[0].offsetHeight, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === r.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(r, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width, i = q.createElement("div"), i.style.cssText = r.style.cssText = a, i.style.marginRight = i.style.width = "0", r.style.width = "1px", r.appendChild(i), t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), "undefined" != typeof r.style.zoom && (r.innerHTML = "", r.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === r.offsetWidth, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== r.offsetWidth, n.style.zoom = 1), s.removeChild(n), n = r = o = i = null)
        }), s.removeChild(p), n = r = o = i = a = s = p = null, t
    }();
    var mt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        vt = /([A-Z])/g;
    Z.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (Z.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? Z.cache[e[Z.expando]] : e[Z.expando], !! e && !o(e)
        },
        data: function(e, n, r, o) {
            if (Z.acceptData(e)) {
                var i, a, s = Z.expando,
                    l = "string" == typeof n,
                    u = e.nodeType,
                    c = u ? Z.cache : e,
                    d = u ? e[s] : e[s] && s;
                if (d && c[d] && (o || c[d].data) || !l || r !== t) return d || (u ? e[s] = d = Z.deletedIds.pop() || Z.guid++ : d = s), c[d] || (c[d] = {}, u || (c[d].toJSON = Z.noop)), ("object" == typeof n || "function" == typeof n) && (o ? c[d] = Z.extend(c[d], n) : c[d].data = Z.extend(c[d].data, n)), i = c[d], o || (i.data || (i.data = {}), i = i.data), r !== t && (i[Z.camelCase(n)] = r), l ? (a = i[n], null == a && (a = i[Z.camelCase(n)])) : a = i, a
            }
        },
        removeData: function(e, t, n) {
            if (Z.acceptData(e)) {
                var r, i, a, s = e.nodeType,
                    l = s ? Z.cache : e,
                    u = s ? e[Z.expando] : Z.expando;
                if (l[u]) {
                    if (t && (r = n ? l[u] : l[u].data)) {
                        Z.isArray(t) || (t in r ? t = [t] : (t = Z.camelCase(t), t = t in r ? [t] : t.split(" ")));
                        for (i = 0, a = t.length; a > i; i++) delete r[t[i]];
                        if (!(n ? o : Z.isEmptyObject)(r)) return
                    }(n || (delete l[u].data, o(l[u]))) && (s ? Z.cleanData([e], !0) : Z.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
                }
            }
        },
        _data: function(e, t, n) {
            return Z.data(e, t, n, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && Z.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), Z.fn.extend({
        data: function(e, n) {
            var o, i, a, s, l, u = this[0],
                c = 0,
                d = null;
            if (e === t) {
                if (this.length && (d = Z.data(u), 1 === u.nodeType && !Z._data(u, "parsedAttrs"))) {
                    for (a = u.attributes, l = a.length; l > c; c++) s = a[c].name, s.indexOf("data-") || (s = Z.camelCase(s.substring(5)), r(u, s, d[s]));
                    Z._data(u, "parsedAttrs", !0)
                }
                return d
            }
            return "object" == typeof e ? this.each(function() {
                Z.data(this, e)
            }) : (o = e.split(".", 2), o[1] = o[1] ? "." + o[1] : "", i = o[1] + "!", Z.access(this, function(n) {
                return n === t ? (d = this.triggerHandler("getData" + i, [o[0]]), d === t && u && (d = Z.data(u, e), d = r(u, e, d)), d === t && o[1] ? this.data(o[0]) : d) : (o[1] = n, void this.each(function() {
                    var t = Z(this);
                    t.triggerHandler("setData" + i, o), Z.data(this, e, n), t.triggerHandler("changeData" + i, o)
                }))
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                Z.removeData(this, e)
            })
        }
    }), Z.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = Z._data(e, t), n && (!r || Z.isArray(n) ? r = Z._data(e, t, Z.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = Z.queue(e, t),
                r = n.length,
                o = n.shift(),
                i = Z._queueHooks(e, t),
                a = function() {
                    Z.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, a, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Z._data(e, n) || Z._data(e, n, {
                empty: Z.Callbacks("once memory").add(function() {
                    Z.removeData(e, t + "queue", !0), Z.removeData(e, n, !0)
                })
            })
        }
    }), Z.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? Z.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = Z.queue(this, e, n);
                Z._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && Z.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                Z.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, o = 1,
                i = Z.Deferred(),
                a = this,
                s = this.length,
                l = function() {
                    --o || i.resolveWith(a, [a])
                };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = Z._data(a[s], e + "queueHooks"), r && r.empty && (o++, r.empty.add(l));
            return l(), i.promise(n)
        }
    });
    var yt, bt, wt, xt = /[\t\r\n]/g,
        Tt = /\r/g,
        Mt = /^(?:button|input)$/i,
        Nt = /^(?:button|input|object|select|textarea)$/i,
        Ct = /^a(?:rea|)$/i,
        $t = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        kt = Z.support.getSetAttribute;
    Z.fn.extend({
        attr: function(e, t) {
            return Z.access(this, Z.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                Z.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return Z.access(this, Z.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = Z.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, o, i, a, s;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).addClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e)
                for (t = e.split(nt), n = 0, r = this.length; r > n; n++)
                    if (o = this[n], 1 === o.nodeType)
                        if (o.className || 1 !== t.length) {
                            for (i = " " + o.className + " ", a = 0, s = t.length; s > a; a++) i.indexOf(" " + t[a] + " ") < 0 && (i += t[a] + " ");
                            o.className = Z.trim(i)
                        } else o.className = e;
            return this
        },
        removeClass: function(e) {
            var n, r, o, i, a, s, l;
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).removeClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e || e === t)
                for (n = (e || "").split(nt), s = 0, l = this.length; l > s; s++)
                    if (o = this[s], 1 === o.nodeType && o.className) {
                        for (r = (" " + o.className + " ").replace(xt, " "), i = 0, a = n.length; a > i; i++)
                            for (; r.indexOf(" " + n[i] + " ") >= 0;) r = r.replace(" " + n[i] + " ", " ");
                        o.className = e ? Z.trim(r) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "boolean" == typeof t;
            return this.each(Z.isFunction(e) ? function(n) {
                Z(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n)
                    for (var o, i = 0, a = Z(this), s = t, l = e.split(nt); o = l[i++];) s = r ? s : !a.hasClass(o), a[s ? "addClass" : "removeClass"](o);
                else("undefined" === n || "boolean" === n) && (this.className && Z._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : Z._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xt, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, r, o, i = this[0]; {
                if (arguments.length) return o = Z.isFunction(e), this.each(function(r) {
                    var i, a = Z(this);
                    1 === this.nodeType && (i = o ? e.call(this, r, a.val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), n = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, i, "value") !== t || (this.value = i))
                });
                if (i) return n = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], n && "get" in n && (r = n.get(i, "value")) !== t ? r : (r = i.value, "string" == typeof r ? r.replace(Tt, "") : null == r ? "" : r)
            }
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, o = e.selectedIndex, i = "select-one" === e.type || 0 > o, a = i ? null : [], s = i ? o + 1 : r.length, l = 0 > o ? s : i ? o : 0; s > l; l++)
                        if (n = r[l], !(!n.selected && l !== o || (Z.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                            if (t = Z(n).val(), i) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    var n = Z.makeArray(t);
                    return Z(e).find("option").each(function() {
                        this.selected = Z.inArray(Z(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attrFn: {},
        attr: function(e, n, r, o) {
            var i, a, s, l = e.nodeType;
            if (e && 3 !== l && 8 !== l && 2 !== l) return o && Z.isFunction(Z.fn[n]) ? Z(e)[n](r) : "undefined" == typeof e.getAttribute ? Z.prop(e, n, r) : (s = 1 !== l || !Z.isXMLDoc(e), s && (n = n.toLowerCase(), a = Z.attrHooks[n] || ($t.test(n) ? bt : yt)), r !== t ? null === r ? void Z.removeAttr(e, n) : a && "set" in a && s && (i = a.set(e, r, n)) !== t ? i : (e.setAttribute(n, r + ""), r) : a && "get" in a && s && null !== (i = a.get(e, n)) ? i : (i = e.getAttribute(n), null === i ? t : i))
        },
        removeAttr: function(e, t) {
            var n, r, o, i, a = 0;
            if (t && 1 === e.nodeType)
                for (r = t.split(nt); a < r.length; a++) o = r[a], o && (n = Z.propFix[o] || o, i = $t.test(o), i || Z.attr(e, o, ""), e.removeAttribute(kt ? o : n), i && n in e && (e[n] = !1))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (Mt.test(e.nodeName) && e.parentNode) Z.error("type property can't be changed");
                    else if (!Z.support.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return yt && Z.nodeName(e, "button") ? yt.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, n) {
                    return yt && Z.nodeName(e, "button") ? yt.set(e, t, n) : void(e.value = t)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var o, i, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !Z.isXMLDoc(e), a && (n = Z.propFix[n] || n, i = Z.propHooks[n]), r !== t ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : e[n] = r : i && "get" in i && null !== (o = i.get(e, n)) ? o : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : Nt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), bt = {
        get: function(e, n) {
            var r, o = Z.prop(e, n);
            return o === !0 || "boolean" != typeof o && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t === !1 ? Z.removeAttr(e, n) : (r = Z.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, kt || (wt = {
        name: !0,
        id: !0,
        coords: !0
    }, yt = Z.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (wt[n] ? "" !== r.value : r.specified) ? r.value : t
        },
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = q.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
        }
    }, Z.each(["width", "height"], function(e, t) {
        Z.attrHooks[t] = Z.extend(Z.attrHooks[t], {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        })
    }), Z.attrHooks.contenteditable = {
        get: yt.get,
        set: function(e, t, n) {
            "" === t && (t = "false"), yt.set(e, t, n)
        }
    }), Z.support.hrefNormalized || Z.each(["href", "src", "width", "height"], function(e, n) {
        Z.attrHooks[n] = Z.extend(Z.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return null === r ? t : r
            }
        })
    }), Z.support.style || (Z.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }), Z.support.optSelected || (Z.propHooks.selected = Z.extend(Z.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), Z.support.enctype || (Z.propFix.enctype = "encoding"), Z.support.checkOn || Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = {
            get: function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), Z.each(["radio", "checkbox"], function() {
        Z.valHooks[this] = Z.extend(Z.valHooks[this], {
            set: function(e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
            }
        })
    });
    var Et = /^(?:textarea|input|select)$/i,
        St = /^([^\.]*|)(?:\.(.+)|)$/,
        Lt = /(?:^|\s)hover(\.\S+|)\b/,
        Dt = /^key/,
        At = /^(?:mouse|contextmenu)|click/,
        _t = /^(?:focusinfocus|focusoutblur)$/,
        jt = function(e) {
            return Z.event.special.hover ? e : e.replace(Lt, "mouseenter$1 mouseleave$1")
        };
    Z.event = {
        add: function(e, n, r, o, i) {
            var a, s, l, u, c, d, p, f, h, g, m;
            if (3 !== e.nodeType && 8 !== e.nodeType && n && r && (a = Z._data(e))) {
                for (r.handler && (h = r, r = h.handler, i = h.selector), r.guid || (r.guid = Z.guid++), l = a.events, l || (a.events = l = {}), s = a.handle, s || (a.handle = s = function(e) {
                    return "undefined" == typeof Z || e && Z.event.triggered === e.type ? t : Z.event.dispatch.apply(s.elem, arguments)
                }, s.elem = e), n = Z.trim(jt(n)).split(" "), u = 0; u < n.length; u++) c = St.exec(n[u]) || [], d = c[1], p = (c[2] || "").split(".").sort(), m = Z.event.special[d] || {}, d = (i ? m.delegateType : m.bindType) || d, m = Z.event.special[d] || {}, f = Z.extend({
                    type: d,
                    origType: c[1],
                    data: o,
                    handler: r,
                    guid: r.guid,
                    selector: i,
                    needsContext: i && Z.expr.match.needsContext.test(i),
                    namespace: p.join(".")
                }, h), g = l[d], g || (g = l[d] = [], g.delegateCount = 0, m.setup && m.setup.call(e, o, p, s) !== !1 || (e.addEventListener ? e.addEventListener(d, s, !1) : e.attachEvent && e.attachEvent("on" + d, s))), m.add && (m.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)), i ? g.splice(g.delegateCount++, 0, f) : g.push(f), Z.event.global[d] = !0;
                e = null
            }
        },
        global: {},
        remove: function(e, t, n, r, o) {
            var i, a, s, l, u, c, d, p, f, h, g, m = Z.hasData(e) && Z._data(e);
            if (m && (p = m.events)) {
                for (t = Z.trim(jt(t || "")).split(" "), i = 0; i < t.length; i++)
                    if (a = St.exec(t[i]) || [], s = l = a[1], u = a[2], s) {
                        for (f = Z.event.special[s] || {}, s = (r ? f.delegateType : f.bindType) || s, h = p[s] || [], c = h.length, u = u ? new RegExp("(^|\\.)" + u.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = 0; d < h.length; d++) g = h[d], !o && l !== g.origType || n && n.guid !== g.guid || u && !u.test(g.namespace) || r && r !== g.selector && ("**" !== r || !g.selector) || (h.splice(d--, 1), g.selector && h.delegateCount--, f.remove && f.remove.call(e, g));
                        0 === h.length && c !== h.length && (f.teardown && f.teardown.call(e, u, m.handle) !== !1 || Z.removeEvent(e, s, m.handle), delete p[s])
                    } else
                        for (s in p) Z.event.remove(e, s + t[i], n, r, !0);
                Z.isEmptyObject(p) && (delete m.handle, Z.removeData(e, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, r, o, i) {
            if (!o || 3 !== o.nodeType && 8 !== o.nodeType) {
                var a, s, l, u, c, d, p, f, h, g, m = n.type || n,
                    v = [];
                if (!_t.test(m + Z.event.triggered) && (m.indexOf("!") >= 0 && (m = m.slice(0, -1), s = !0), m.indexOf(".") >= 0 && (v = m.split("."), m = v.shift(), v.sort()), o && !Z.event.customEvent[m] || Z.event.global[m]))
                    if (n = "object" == typeof n ? n[Z.expando] ? n : new Z.Event(m, n) : new Z.Event(m), n.type = m, n.isTrigger = !0, n.exclusive = s, n.namespace = v.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, d = m.indexOf(":") < 0 ? "on" + m : "", o) {
                        if (n.result = t, n.target || (n.target = o), r = null != r ? Z.makeArray(r) : [], r.unshift(n), p = Z.event.special[m] || {}, !p.trigger || p.trigger.apply(o, r) !== !1) {
                            if (h = [
                                [o, p.bindType || m]
                            ], !i && !p.noBubble && !Z.isWindow(o)) {
                                for (g = p.delegateType || m, u = _t.test(g + m) ? o : o.parentNode, c = o; u; u = u.parentNode) h.push([u, g]), c = u;
                                c === (o.ownerDocument || q) && h.push([c.defaultView || c.parentWindow || e, g])
                            }
                            for (l = 0; l < h.length && !n.isPropagationStopped(); l++) u = h[l][0], n.type = h[l][1], f = (Z._data(u, "events") || {})[n.type] && Z._data(u, "handle"), f && f.apply(u, r), f = d && u[d], f && Z.acceptData(u) && f.apply && f.apply(u, r) === !1 && n.preventDefault();
                            return n.type = m, i || n.isDefaultPrevented() || p._default && p._default.apply(o.ownerDocument, r) !== !1 || "click" === m && Z.nodeName(o, "a") || !Z.acceptData(o) || d && o[m] && ("focus" !== m && "blur" !== m || 0 !== n.target.offsetWidth) && !Z.isWindow(o) && (c = o[d], c && (o[d] = null), Z.event.triggered = m, o[m](), Z.event.triggered = t, c && (o[d] = c)), n.result
                        }
                    } else {
                        a = Z.cache;
                        for (l in a) a[l].events && a[l].events[m] && Z.event.trigger(n, r, a[l].handle.elem, !0)
                    }
            }
        },
        dispatch: function(n) {
            n = Z.event.fix(n || e.event);
            var r, o, i, a, s, l, u, c, d, p, f = (Z._data(this, "events") || {})[n.type] || [],
                h = f.delegateCount,
                g = U.call(arguments),
                m = !n.exclusive && !n.namespace,
                v = Z.event.special[n.type] || {}, y = [];
            if (g[0] = n, n.delegateTarget = this, !v.preDispatch || v.preDispatch.call(this, n) !== !1) {
                if (h && (!n.button || "click" !== n.type))
                    for (i = n.target; i != this; i = i.parentNode || this)
                        if (i.disabled !== !0 || "click" !== n.type) {
                            for (s = {}, u = [], r = 0; h > r; r++) c = f[r], d = c.selector, s[d] === t && (s[d] = c.needsContext ? Z(d, this).index(i) >= 0 : Z.find(d, this, null, [i]).length), s[d] && u.push(c);
                            u.length && y.push({
                                elem: i,
                                matches: u
                            })
                        }
                for (f.length > h && y.push({
                    elem: this,
                    matches: f.slice(h)
                }), r = 0; r < y.length && !n.isPropagationStopped(); r++)
                    for (l = y[r], n.currentTarget = l.elem, o = 0; o < l.matches.length && !n.isImmediatePropagationStopped(); o++) c = l.matches[o], (m || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data, n.handleObj = c, a = ((Z.event.special[c.origType] || {}).handle || c.handler).apply(l.elem, g), a !== t && (n.result = a, a === !1 && (n.preventDefault(), n.stopPropagation())));
                return v.postDispatch && v.postDispatch.call(this, n), n.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, o, i, a = n.button,
                    s = n.fromElement;
                return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || q, o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[Z.expando]) return e;
            var t, n, r = e,
                o = Z.event.fixHooks[e.type] || {}, i = o.props ? this.props.concat(o.props) : this.props;
            for (e = Z.Event(r), t = i.length; t;) n = i[--t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || q), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, o.filter ? o.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    Z.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var o = Z.extend(new Z.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? Z.event.trigger(o, null, t) : Z.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
        }
    }, Z.event.handle = Z.event.dispatch, Z.removeEvent = q.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
    }, Z.Event = function(e, t) {
        return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? a : i) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t)
    }, Z.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = a;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = a;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = a, this.stopPropagation()
        },
        isDefaultPrevented: i,
        isPropagationStopped: i,
        isImmediatePropagationStopped: i
    }, Z.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        Z.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    o = e.relatedTarget,
                    i = e.handleObj,
                    a = i.selector;
                return (!o || o !== r && !Z.contains(r, o)) && (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), Z.support.submitBubbles || (Z.event.special.submit = {
        setup: function() {
            return Z.nodeName(this, "form") ? !1 : void Z.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target,
                    r = Z.nodeName(n, "input") || Z.nodeName(n, "button") ? n.form : t;
                r && !Z._data(r, "_submit_attached") && (Z.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), Z._data(r, "_submit_attached", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && Z.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return Z.nodeName(this, "form") ? !1 : void Z.event.remove(this, "._submit")
        }
    }), Z.support.changeBubbles || (Z.event.special.change = {
        setup: function() {
            return Et.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (Z.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), Z.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), Z.event.simulate("change", this, e, !0)
            })), !1) : void Z.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Et.test(t.nodeName) && !Z._data(t, "_change_attached") && (Z.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || Z.event.simulate("change", this.parentNode, e, !0)
                }), Z._data(t, "_change_attached", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return Z.event.remove(this, "._change"), !Et.test(this.nodeName)
        }
    }), Z.support.focusinBubbles || Z.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                Z.event.simulate(t, e.target, Z.event.fix(e), !0)
            };
        Z.event.special[t] = {
            setup: function() {
                0 === n++ && q.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && q.removeEventListener(e, r, !0)
            }
        }
    }), Z.fn.extend({
        on: function(e, n, r, o, a) {
            var s, l;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (l in e) this.on(l, n, r, e[l], a);
                return this
            }
            if (null == r && null == o ? (o = n, r = n = t) : null == o && ("string" == typeof n ? (o = r, r = t) : (o = r, r = n, n = t)), o === !1) o = i;
            else if (!o) return this;
            return 1 === a && (s = o, o = function(e) {
                return Z().off(e), s.apply(this, arguments)
            }, o.guid = s.guid || (s.guid = Z.guid++)), this.each(function() {
                Z.event.add(this, e, o, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var o, a;
            if (e && e.preventDefault && e.handleObj) return o = e.handleObj, Z(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof e) {
                for (a in e) this.off(a, n, e[a]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = i), this.each(function() {
                Z.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            return Z(this.context).on(e, this.selector, t, n), this
        },
        die: function(e, t) {
            return Z(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                Z.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            return this[0] ? Z.event.trigger(e, t, this[0], !0) : void 0
        },
        toggle: function(e) {
            var t = arguments,
                n = e.guid || Z.guid++,
                r = 0,
                o = function(n) {
                    var o = (Z._data(this, "lastToggle" + e.guid) || 0) % r;
                    return Z._data(this, "lastToggle" + e.guid, o + 1), n.preventDefault(), t[o].apply(this, arguments) || !1
                };
            for (o.guid = n; r < t.length;) t[r++].guid = n;
            return this.click(o)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        Z.fn[t] = function(e, n) {
            return null == n && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }, Dt.test(t) && (Z.event.fixHooks[t] = Z.event.keyHooks), At.test(t) && (Z.event.fixHooks[t] = Z.event.mouseHooks)
    }),
    function(e, t) {
        function n(e, t, n, r) {
            n = n || [], t = t || A;
            var o, i, a, s, l = t.nodeType;
            if (!e || "string" != typeof e) return n;
            if (1 !== l && 9 !== l) return [];
            if (a = x(t), !a && !r && (o = rt.exec(e)))
                if (s = o[1]) {
                    if (9 === l) {
                        if (i = t.getElementById(s), !i || !i.parentNode) return n;
                        if (i.id === s) return n.push(i), n
                    } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(s)) && T(t, i) && i.id === s) return n.push(i), n
                } else {
                    if (o[2]) return H.apply(n, F.call(t.getElementsByTagName(e), 0)), n;
                    if ((s = o[3]) && gt && t.getElementsByClassName) return H.apply(n, F.call(t.getElementsByClassName(s), 0)), n
                }
            return g(e.replace(K, "$1"), t, n, r, a)
        }

        function r(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function o(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function i(e) {
            return O(function(t) {
                return t = +t, O(function(n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function a(e, t, n) {
            if (e === t) return n;
            for (var r = e.nextSibling; r;) {
                if (r === t) return -1;
                r = r.nextSibling
            }
            return 1
        }

        function s(e, t) {
            var r, o, i, a, s, l, u, c = W[L][e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, l = [], u = b.preFilter; s;) {
                (!r || (o = et.exec(s))) && (o && (s = s.slice(o[0].length) || s), l.push(i = [])), r = !1, (o = tt.exec(s)) && (i.push(r = new D(o.shift())), s = s.slice(r.length), r.type = o[0].replace(K, " "));
                for (a in b.filter)!(o = ct[a].exec(s)) || u[a] && !(o = u[a](o)) || (i.push(r = new D(o.shift())), s = s.slice(r.length), r.type = a, r.matches = o);
                if (!r) break
            }
            return t ? s.length : s ? n.error(e) : W(e, l).slice(0)
        }

        function l(e, t, n) {
            var r = t.dir,
                o = n && "parentNode" === t.dir,
                i = P++;
            return t.first ? function(t, n, i) {
                for (; t = t[r];)
                    if (o || 1 === t.nodeType) return e(t, n, i)
            } : function(t, n, a) {
                if (a) {
                    for (; t = t[r];)
                        if ((o || 1 === t.nodeType) && e(t, n, a)) return t
                } else
                    for (var s, l = j + " " + i + " ", u = l + v; t = t[r];)
                        if (o || 1 === t.nodeType) {
                            if ((s = t[L]) === u) return t.sizset;
                            if ("string" == typeof s && 0 === s.indexOf(l)) {
                                if (t.sizset) return t
                            } else {
                                if (t[L] = u, e(t, n, a)) return t.sizset = !0, t;
                                t.sizset = !1
                            }
                        }
            }
        }

        function u(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function c(e, t, n, r, o) {
            for (var i, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(i = e[s]) && (!n || n(i, r, o)) && (a.push(i), u && t.push(s));
            return a
        }

        function d(e, t, n, r, o, i) {
            return r && !r[L] && (r = d(r)), o && !o[L] && (o = d(o, i)), O(function(i, a, s, l) {
                var u, d, p, f = [],
                    g = [],
                    m = a.length,
                    v = i || h(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !i && t ? v : c(v, f, e, s, l),
                    b = n ? o || (i ? e : m || r) ? [] : a : y;
                if (n && n(y, b, s, l), r)
                    for (u = c(b, g), r(u, [], s, l), d = u.length; d--;)(p = u[d]) && (b[g[d]] = !(y[g[d]] = p));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], d = b.length; d--;)(p = b[d]) && u.push(y[d] = p);
                            o(null, b = [], u, l)
                        }
                        for (d = b.length; d--;)(p = b[d]) && (u = o ? R.call(i, p) : f[d]) > -1 && (i[u] = !(a[u] = p))
                    }
                } else b = c(b === a ? b.splice(m, b.length) : b), o ? o(null, a, b, l) : H.apply(a, b)
            })
        }

        function p(e) {
            for (var t, n, r, o = e.length, i = b.relative[e[0].type], a = i || b.relative[" "], s = i ? 1 : 0, c = l(function(e) {
                    return e === t
                }, a, !0), f = l(function(e) {
                    return R.call(t, e) > -1
                }, a, !0), h = [
                    function(e, n, r) {
                        return !i && (r || n !== k) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r))
                    }
                ]; o > s; s++)
                if (n = b.relative[e[s].type]) h = [l(u(h), n)];
                else {
                    if (n = b.filter[e[s].type].apply(null, e[s].matches), n[L]) {
                        for (r = ++s; o > r && !b.relative[e[r].type]; r++);
                        return d(s > 1 && u(h), s > 1 && e.slice(0, s - 1).join("").replace(K, "$1"), n, r > s && p(e.slice(s, r)), o > r && p(e = e.slice(r)), o > r && e.join(""))
                    }
                    h.push(n)
                }
            return u(h)
        }

        function f(e, t) {
            var r = t.length > 0,
                o = e.length > 0,
                i = function(a, s, l, u, d) {
                    var p, f, h, g = [],
                        m = 0,
                        y = "0",
                        w = a && [],
                        x = null != d,
                        T = k,
                        M = a || o && b.find.TAG("*", d && s.parentNode || s),
                        N = j += null == T ? 1 : Math.E;
                    for (x && (k = s !== A && s, v = i.el); null != (p = M[y]); y++) {
                        if (o && p) {
                            for (f = 0; h = e[f]; f++)
                                if (h(p, s, l)) {
                                    u.push(p);
                                    break
                                }
                            x && (j = N, v = ++i.el)
                        }
                        r && ((p = !h && p) && m--, a && w.push(p))
                    }
                    if (m += y, r && y !== m) {
                        for (f = 0; h = t[f]; f++) h(w, g, s, l);
                        if (a) {
                            if (m > 0)
                                for (; y--;) w[y] || g[y] || (g[y] = I.call(u));
                            g = c(g)
                        }
                        H.apply(u, g), x && !a && g.length > 0 && m + t.length > 1 && n.uniqueSort(u)
                    }
                    return x && (j = N, k = T), w
                };
            return i.el = 0, r ? O(i) : i
        }

        function h(e, t, r) {
            for (var o = 0, i = t.length; i > o; o++) n(e, t[o], r);
            return r
        }

        function g(e, t, n, r, o) {
            var i, a, l, u, c, d = s(e),
                p = d.length;
            if (!r && 1 === d.length) {
                if (a = d[0] = d[0].slice(0), a.length > 2 && "ID" === (l = a[0]).type && 9 === t.nodeType && !o && b.relative[a[1].type]) {
                    if (t = b.find.ID(l.matches[0].replace(ut, ""), t, o)[0], !t) return n;
                    e = e.slice(a.shift().length)
                }
                for (i = ct.POS.test(e) ? -1 : a.length - 1; i >= 0 && (l = a[i], !b.relative[u = l.type]); i--)
                    if ((c = b.find[u]) && (r = c(l.matches[0].replace(ut, ""), it.test(a[0].type) && t.parentNode || t, o))) {
                        if (a.splice(i, 1), e = r.length && a.join(""), !e) return H.apply(n, F.call(r, 0)), n;
                        break
                    }
            }
            return M(e, d)(r, t, o, n, it.test(e)), n
        }

        function m() {}
        var v, y, b, w, x, T, M, N, C, k, E = !0,
            S = "undefined",
            L = ("sizcache" + Math.random()).replace(".", ""),
            D = String,
            A = e.document,
            _ = A.documentElement,
            j = 0,
            P = 0,
            I = [].pop,
            H = [].push,
            F = [].slice,
            R = [].indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            }, O = function(e, t) {
                return e[L] = null == t || t, e
            }, B = function() {
                var e = {}, t = [];
                return O(function(n, r) {
                    return t.push(n) > b.cacheLength && delete e[t.shift()], e[n + " "] = r
                }, e)
            }, q = B(),
            W = B(),
            z = B(),
            X = "[\\x20\\t\\r\\n\\f]",
            G = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            Y = G.replace("w", "w#"),
            U = "([*^$|!~]?=)",
            V = "\\[" + X + "*(" + G + ")" + X + "*(?:" + U + X + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Y + ")|)|)" + X + "*\\]",
            Q = ":(" + G + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + V + ")|[^:]|\\\\.)*|.*))\\)|)",
            J = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + X + "*((?:-\\d)?\\d*)" + X + "*\\)|)(?=[^-]|$)",
            K = new RegExp("^" + X + "+|((?:^|[^\\\\])(?:\\\\.)*)" + X + "+$", "g"),
            et = new RegExp("^" + X + "*," + X + "*"),
            tt = new RegExp("^" + X + "*([\\x20\\t\\r\\n\\f>+~])" + X + "*"),
            nt = new RegExp(Q),
            rt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            ot = /^:not/,
            it = /[\x20\t\r\n\f]*[+~]/,
            at = /:not\($/,
            st = /h\d/i,
            lt = /input|select|textarea|button/i,
            ut = /\\(?!\\)/g,
            ct = {
                ID: new RegExp("^#(" + G + ")"),
                CLASS: new RegExp("^\\.(" + G + ")"),
                NAME: new RegExp("^\\[name=['\"]?(" + G + ")['\"]?\\]"),
                TAG: new RegExp("^(" + G.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + V),
                PSEUDO: new RegExp("^" + Q),
                POS: new RegExp(J, "i"),
                CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + X + "*(even|odd|(([+-]|)(\\d*)n|)" + X + "*(?:([+-]|)" + X + "*(\\d+)|))" + X + "*\\)|)", "i"),
                needsContext: new RegExp("^" + X + "*[>+~]|" + J, "i")
            }, dt = function(e) {
                var t = A.createElement("div");
                try {
                    return e(t)
                } catch (n) {
                    return !1
                } finally {
                    t = null
                }
            }, pt = dt(function(e) {
                return e.appendChild(A.createComment("")), !e.getElementsByTagName("*").length
            }),
            ft = dt(function(e) {
                return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== S && "#" === e.firstChild.getAttribute("href")
            }),
            ht = dt(function(e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t
            }),
            gt = dt(function(e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
            }),
            mt = dt(function(e) {
                e.id = L + 0, e.innerHTML = "<a name='" + L + "'></a><div name='" + L + "'></div>", _.insertBefore(e, _.firstChild);
                var t = A.getElementsByName && A.getElementsByName(L).length === 2 + A.getElementsByName(L + 0).length;
                return y = !A.getElementById(L), _.removeChild(e), t
            });
        try {
            F.call(_.childNodes, 0)[0].nodeType
        } catch (vt) {
            F = function(e) {
                for (var t, n = []; t = this[e]; e++) n.push(t);
                return n
            }
        }
        n.matches = function(e, t) {
            return n(e, null, null, t)
        }, n.matchesSelector = function(e, t) {
            return n(t, null, null, [e]).length > 0
        }, w = n.getText = function(e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[r]; r++) n += w(t);
            return n
        }, x = n.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, T = n.contains = _.contains ? function(e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode;
            return e === r || !! (r && 1 === r.nodeType && n.contains && n.contains(r))
        } : _.compareDocumentPosition ? function(e, t) {
            return t && !! (16 & e.compareDocumentPosition(t))
        } : function(e, t) {
            for (; t = t.parentNode;)
                if (t === e) return !0;
            return !1
        }, n.attr = function(e, t) {
            var n, r = x(e);
            return r || (t = t.toLowerCase()), (n = b.attrHandle[t]) ? n(e) : r || ht ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? "boolean" == typeof e[t] ? e[t] ? t : null : n.specified ? n.value : null : null)
        }, b = n.selectors = {
            cacheLength: 50,
            createPseudo: O,
            match: ct,
            attrHandle: ft ? {} : {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: y ? function(e, t, n) {
                    if (typeof t.getElementById !== S && !n) {
                        var r = t.getElementById(e);
                        return r && r.parentNode ? [r] : []
                    }
                } : function(e, n, r) {
                    if (typeof n.getElementById !== S && !r) {
                        var o = n.getElementById(e);
                        return o ? o.id === e || typeof o.getAttributeNode !== S && o.getAttributeNode("id").value === e ? [o] : t : []
                    }
                },
                TAG: pt ? function(e, t) {
                    return typeof t.getElementsByTagName !== S ? t.getElementsByTagName(e) : void 0
                } : function(e, t) {
                    var n = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (var r, o = [], i = 0; r = n[i]; i++) 1 === r.nodeType && o.push(r);
                        return o
                    }
                    return n
                },
                NAME: mt && function(e, t) {
                    return typeof t.getElementsByName !== S ? t.getElementsByName(name) : void 0
                },
                CLASS: gt && function(e, t, n) {
                    return typeof t.getElementsByClassName === S || n ? void 0 : t.getElementsByClassName(e)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(ut, ""), e[3] = (e[4] || e[5] || "").replace(ut, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || n.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && n.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n;
                    return ct.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (nt.test(t) && (n = s(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t), e.slice(0, 3))
                }
            },
            filter: {
                ID: y ? function(e) {
                    return e = e.replace(ut, ""),
                    function(t) {
                        return t.getAttribute("id") === e
                    }
                } : function(e) {
                    return e = e.replace(ut, ""),
                    function(t) {
                        var n = typeof t.getAttributeNode !== S && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                },
                TAG: function(e) {
                    return "*" === e ? function() {
                        return !0
                    } : (e = e.replace(ut, "").toLowerCase(), function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function(e) {
                    var t = q[L][e + " "];
                    return t || (t = new RegExp("(^|" + X + ")" + e + "(" + X + "|$)")) && q(e, function(e) {
                        return t.test(e.className || typeof e.getAttribute !== S && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, r) {
                    return function(o, i) {
                        var a = n.attr(o, e);
                        return null == a ? "!=" === t : t ? (a += "", "=" === t ? a === r : "!=" === t ? a !== r : "^=" === t ? r && 0 === a.indexOf(r) : "*=" === t ? r && a.indexOf(r) > -1 : "$=" === t ? r && a.substr(a.length - r.length) === r : "~=" === t ? (" " + a + " ").indexOf(r) > -1 : "|=" === t ? a === r || a.substr(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r) {
                    return "nth" === e ? function(e) {
                        var t, o, i = e.parentNode;
                        if (1 === n && 0 === r) return !0;
                        if (i)
                            for (o = 0, t = i.firstChild; t && (1 !== t.nodeType || (o++, e !== t)); t = t.nextSibling);
                        return o -= r, o === n || o % n === 0 && o / n >= 0
                    } : function(t) {
                        var n = t;
                        switch (e) {
                            case "only":
                            case "first":
                                for (; n = n.previousSibling;)
                                    if (1 === n.nodeType) return !1;
                                if ("first" === e) return !0;
                                n = t;
                            case "last":
                                for (; n = n.nextSibling;)
                                    if (1 === n.nodeType) return !1;
                                return !0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var r, o = b.pseudos[e] || b.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                    return o[L] ? o(t) : o.length > 1 ? (r = [e, e, "", t], b.setFilters.hasOwnProperty(e.toLowerCase()) ? O(function(e, n) {
                        for (var r, i = o(e, t), a = i.length; a--;) r = R.call(e, i[a]), e[r] = !(n[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: O(function(e) {
                    var t = [],
                        n = [],
                        r = M(e.replace(K, "$1"));
                    return r[L] ? O(function(e, t, n, o) {
                        for (var i, a = r(e, null, o, []), s = e.length; s--;)(i = a[s]) && (e[s] = !(t[s] = i))
                    }) : function(e, o, i) {
                        return t[0] = e, r(t, null, i, n), !n.pop()
                    }
                }),
                has: O(function(e) {
                    return function(t) {
                        return n(e, t).length > 0
                    }
                }),
                contains: O(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || w(t)).indexOf(e) > -1
                    }
                }),
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !! e.checked || "option" === t && !! e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                empty: function(e) {
                    var t;
                    for (e = e.firstChild; e;) {
                        if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
                        e = e.nextSibling
                    }
                    return !0
                },
                header: function(e) {
                    return st.test(e.nodeName)
                },
                text: function(e) {
                    var t, n;
                    return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
                },
                radio: r("radio"),
                checkbox: r("checkbox"),
                file: r("file"),
                password: r("password"),
                image: r("image"),
                submit: o("submit"),
                reset: o("reset"),
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                input: function(e) {
                    return lt.test(e.nodeName)
                },
                focus: function(e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: i(function() {
                    return [0]
                }),
                last: i(function(e, t) {
                    return [t - 1]
                }),
                eq: i(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: i(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: i(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: i(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: i(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, N = _.compareDocumentPosition ? function(e, t) {
            return e === t ? (C = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
        } : function(e, t) {
            if (e === t) return C = !0, 0;
            if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
            var n, r, o = [],
                i = [],
                s = e.parentNode,
                l = t.parentNode,
                u = s;
            if (s === l) return a(e, t);
            if (!s) return -1;
            if (!l) return 1;
            for (; u;) o.unshift(u), u = u.parentNode;
            for (u = l; u;) i.unshift(u), u = u.parentNode;
            n = o.length, r = i.length;
            for (var c = 0; n > c && r > c; c++)
                if (o[c] !== i[c]) return a(o[c], i[c]);
            return c === n ? a(e, i[c], -1) : a(o[c], t, 1)
        }, [0, 0].sort(N), E = !C, n.uniqueSort = function(e) {
            var t, n = [],
                r = 1,
                o = 0;
            if (C = E, e.sort(N), C) {
                for (; t = e[r]; r++) t === e[r - 1] && (o = n.push(r));
                for (; o--;) e.splice(n[o], 1)
            }
            return e
        }, n.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, M = n.compile = function(e, t) {
            var n, r = [],
                o = [],
                i = z[L][e + " "];
            if (!i) {
                for (t || (t = s(e)), n = t.length; n--;) i = p(t[n]), i[L] ? r.push(i) : o.push(i);
                i = z(e, f(o, r))
            }
            return i
        }, A.querySelectorAll && ! function() {
            var e, t = g,
                r = /'|\\/g,
                o = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                i = [":focus"],
                a = [":active"],
                l = _.matchesSelector || _.mozMatchesSelector || _.webkitMatchesSelector || _.oMatchesSelector || _.msMatchesSelector;
            dt(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + X + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
            }), dt(function(e) {
                e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + X + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
            }), i = new RegExp(i.join("|")), g = function(e, n, o, a, l) {
                if (!a && !l && !i.test(e)) {
                    var u, c, d = !0,
                        p = L,
                        f = n,
                        h = 9 === n.nodeType && e;
                    if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                        for (u = s(e), (d = n.getAttribute("id")) ? p = d.replace(r, "\\$&") : n.setAttribute("id", p), p = "[id='" + p + "'] ", c = u.length; c--;) u[c] = p + u[c].join("");
                        f = it.test(e) && n.parentNode || n, h = u.join(",")
                    }
                    if (h) try {
                        return H.apply(o, F.call(f.querySelectorAll(h), 0)), o
                    } catch (g) {} finally {
                        d || n.removeAttribute("id")
                    }
                }
                return t(e, n, o, a, l)
            }, l && (dt(function(t) {
                e = l.call(t, "div");
                try {
                    l.call(t, "[test!='']:sizzle"), a.push("!=", Q)
                } catch (n) {}
            }), a = new RegExp(a.join("|")), n.matchesSelector = function(t, r) {
                if (r = r.replace(o, "='$1']"), !x(t) && !a.test(r) && !i.test(r)) try {
                    var s = l.call(t, r);
                    if (s || e || t.document && 11 !== t.document.nodeType) return s
                } catch (u) {}
                return n(r, null, null, [t]).length > 0
            })
        }(), b.pseudos.nth = b.pseudos.eq, b.filters = m.prototype = b.pseudos, b.setFilters = new m, n.attr = Z.attr, Z.find = n, Z.expr = n.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = n.uniqueSort, Z.text = n.getText, Z.isXMLDoc = n.isXML, Z.contains = n.contains
    }(e);
    var Pt = /Until$/,
        It = /^(?:parents|prev(?:Until|All))/,
        Ht = /^.[^:#\[\.,]*$/,
        Ft = Z.expr.match.needsContext,
        Rt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    Z.fn.extend({
        find: function(e) {
            var t, n, r, o, i, a, s = this;
            if ("string" != typeof e) return Z(e).filter(function() {
                for (t = 0, n = s.length; n > t; t++)
                    if (Z.contains(s[t], this)) return !0
            });
            for (a = this.pushStack("", "find", e), t = 0, n = this.length; n > t; t++)
                if (r = a.length, Z.find(e, this[t], a), t > 0)
                    for (o = r; o < a.length; o++)
                        for (i = 0; r > i; i++)
                            if (a[i] === a[o]) {
                                a.splice(o--, 1);
                                break
                            }
            return a
        },
        has: function(e) {
            var t, n = Z(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++)
                    if (Z.contains(this, n[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(u(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(u(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && ("string" == typeof e ? Ft.test(e) ? Z(e, this.context).index(this[0]) >= 0 : Z.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            for (var n, r = 0, o = this.length, i = [], a = Ft.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; o > r; r++)
                for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                    if (a ? a.index(n) > -1 : Z.find.matchesSelector(n, e)) {
                        i.push(n);
                        break
                    }
                    n = n.parentNode
                }
            return i = i.length > 1 ? Z.unique(i) : i, this.pushStack(i, "closest", e)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Z.inArray(this[0], Z(e)) : Z.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? Z(e, t) : Z.makeArray(e && e.nodeType ? [e] : e),
                r = Z.merge(this.get(), n);
            return this.pushStack(s(n[0]) || s(r[0]) ? r : Z.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), Z.fn.andSelf = Z.fn.addBack, Z.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return Z.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return Z.dir(e, "parentNode", n)
        },
        next: function(e) {
            return l(e, "nextSibling")
        },
        prev: function(e) {
            return l(e, "previousSibling")
        },
        nextAll: function(e) {
            return Z.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return Z.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return Z.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return Z.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Z.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Z.sibling(e.firstChild)
        },
        contents: function(e) {
            return Z.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Z.merge([], e.childNodes)
        }
    }, function(e, t) {
        Z.fn[e] = function(n, r) {
            var o = Z.map(this, t, n);
            return Pt.test(e) || (r = n), r && "string" == typeof r && (o = Z.filter(r, o)), o = this.length > 1 && !Rt[e] ? Z.unique(o) : o, this.length > 1 && It.test(e) && (o = o.reverse()), this.pushStack(o, e, U.call(arguments).join(","))
        }
    }), Z.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"), 1 === t.length ? Z.find.matchesSelector(t[0], e) ? [t[0]] : [] : Z.find.matches(e, t)
        },
        dir: function(e, n, r) {
            for (var o = [], i = e[n]; i && 9 !== i.nodeType && (r === t || 1 !== i.nodeType || !Z(i).is(r));) 1 === i.nodeType && o.push(i), i = i[n];
            return o
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Ot = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Bt = / jQuery\d+="(?:null|\d+)"/g,
        qt = /^\s+/,
        Wt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        zt = /<([\w:]+)/,
        Xt = /<tbody/i,
        Gt = /<|&#?\w+;/,
        Yt = /<(?:script|style|link)/i,
        Ut = /<(?:script|object|embed|option|style)/i,
        Vt = new RegExp("<(?:" + Ot + ")[\\s/>]", "i"),
        Qt = /^(?:checkbox|radio)$/,
        Jt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Kt = /\/(java|ecma)script/i,
        Zt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        en = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, tn = c(q),
        nn = tn.appendChild(q.createElement("div"));
    en.optgroup = en.option, en.tbody = en.tfoot = en.colgroup = en.caption = en.thead, en.th = en.td, Z.support.htmlSerialize || (en._default = [1, "X<div>", "</div>"]), Z.fn.extend({
        text: function(e) {
            return Z.access(this, function(e) {
                return e === t ? Z.text(this) : this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (Z.isFunction(e)) return this.each(function(t) {
                Z(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = Z(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(Z.isFunction(e) ? function(t) {
                Z(this).wrapInner(e.call(this, t))
            } : function() {
                var t = Z(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = Z.isFunction(e);
            return this.each(function(n) {
                Z(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (!s(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!s(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = Z.clean(arguments);
                return this.pushStack(Z.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            for (var n, r = 0; null != (n = this[r]); r++)(!e || Z.filter(e, [n]).length) && (t || 1 !== n.nodeType || (Z.cleanData(n.getElementsByTagName("*")), Z.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                for (1 === e.nodeType && Z.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return Z.clone(this, e, t)
            })
        },
        html: function(e) {
            return Z.access(this, function(e) {
                var n = this[0] || {}, r = 0,
                    o = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Bt, "") : t;
                if (!("string" != typeof e || Yt.test(e) || !Z.support.htmlSerialize && Vt.test(e) || !Z.support.leadingWhitespace && qt.test(e) || en[(zt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Wt, "<$1></$2>");
                    try {
                        for (; o > r; r++) n = this[r] || {}, 1 === n.nodeType && (Z.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        n = 0
                    } catch (i) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function(e) {
            return s(this[0]) ? this.length ? this.pushStack(Z(Z.isFunction(e) ? e() : e), "replaceWith", e) : this : Z.isFunction(e) ? this.each(function(t) {
                var n = Z(this),
                    r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : ("string" != typeof e && (e = Z(e).detach()), this.each(function() {
                var t = this.nextSibling,
                    n = this.parentNode;
                Z(this).remove(), t ? Z(t).before(e) : Z(n).append(e)
            }))
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, r) {
            e = [].concat.apply([], e);
            var o, i, a, s, l = 0,
                u = e[0],
                c = [],
                p = this.length;
            if (!Z.support.checkClone && p > 1 && "string" == typeof u && Jt.test(u)) return this.each(function() {
                Z(this).domManip(e, n, r)
            });
            if (Z.isFunction(u)) return this.each(function(o) {
                var i = Z(this);
                e[0] = u.call(this, o, n ? i.html() : t), i.domManip(e, n, r)
            });
            if (this[0]) {
                if (o = Z.buildFragment(e, this, c), a = o.fragment, i = a.firstChild, 1 === a.childNodes.length && (a = i), i)
                    for (n = n && Z.nodeName(i, "tr"), s = o.cacheable || p - 1; p > l; l++) r.call(n && Z.nodeName(this[l], "table") ? d(this[l], "tbody") : this[l], l === s ? a : Z.clone(a, !0, !0));
                a = i = null, c.length && Z.each(c, function(e, t) {
                    t.src ? Z.ajax ? Z.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : Z.error("no ajax") : Z.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Zt, "")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), Z.buildFragment = function(e, n, r) {
        var o, i, a, s = e[0];
        return n = n || q, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, !(1 === e.length && "string" == typeof s && s.length < 512 && n === q && "<" === s.charAt(0)) || Ut.test(s) || !Z.support.checkClone && Jt.test(s) || !Z.support.html5Clone && Vt.test(s) || (i = !0, o = Z.fragments[s], a = o !== t), o || (o = n.createDocumentFragment(), Z.clean(e, n, o, r), i && (Z.fragments[s] = a && o)), {
            fragment: o,
            cacheable: i
        }
    }, Z.fragments = {}, Z.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        Z.fn[e] = function(n) {
            var r, o = 0,
                i = [],
                a = Z(n),
                s = a.length,
                l = 1 === this.length && this[0].parentNode;
            if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === s) return a[t](this[0]), this;
            for (; s > o; o++) r = (o > 0 ? this.clone(!0) : this).get(), Z(a[o])[t](r), i = i.concat(r);
            return this.pushStack(i, e, a.selector)
        }
    }), Z.extend({
        clone: function(e, t, n) {
            var r, o, i, a;
            if (Z.support.html5Clone || Z.isXMLDoc(e) || !Vt.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (nn.innerHTML = e.outerHTML, nn.removeChild(a = nn.firstChild)), !(Z.support.noCloneEvent && Z.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                for (f(e, a), r = h(e), o = h(a), i = 0; r[i]; ++i) o[i] && f(r[i], o[i]);
            if (t && (p(e, a), n))
                for (r = h(e), o = h(a), i = 0; r[i]; ++i) p(r[i], o[i]);
            return r = o = null, a
        },
        clean: function(e, t, n, r) {
            var o, i, a, s, l, u, d, p, f, h, m, v, y = t === q && tn,
                b = [];
            for (t && "undefined" != typeof t.createDocumentFragment || (t = q), o = 0; null != (a = e[o]); o++)
                if ("number" == typeof a && (a += ""), a) {
                    if ("string" == typeof a)
                        if (Gt.test(a)) {
                            for (y = y || c(t), d = t.createElement("div"), y.appendChild(d), a = a.replace(Wt, "<$1></$2>"), s = (zt.exec(a) || ["", ""])[1].toLowerCase(), l = en[s] || en._default, u = l[0], d.innerHTML = l[1] + a + l[2]; u--;) d = d.lastChild;
                            if (!Z.support.tbody)
                                for (p = Xt.test(a), f = "table" !== s || p ? "<table>" !== l[1] || p ? [] : d.childNodes : d.firstChild && d.firstChild.childNodes, i = f.length - 1; i >= 0; --i) Z.nodeName(f[i], "tbody") && !f[i].childNodes.length && f[i].parentNode.removeChild(f[i]);
                            !Z.support.leadingWhitespace && qt.test(a) && d.insertBefore(t.createTextNode(qt.exec(a)[0]), d.firstChild), a = d.childNodes, d.parentNode.removeChild(d)
                        } else a = t.createTextNode(a);
                    a.nodeType ? b.push(a) : Z.merge(b, a)
                }
            if (d && (a = d = y = null), !Z.support.appendChecked)
                for (o = 0; null != (a = b[o]); o++) Z.nodeName(a, "input") ? g(a) : "undefined" != typeof a.getElementsByTagName && Z.grep(a.getElementsByTagName("input"), g);
            if (n)
                for (m = function(e) {
                    return !e.type || Kt.test(e.type) ? r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : void 0
                }, o = 0; null != (a = b[o]); o++) Z.nodeName(a, "script") && m(a) || (n.appendChild(a), "undefined" != typeof a.getElementsByTagName && (v = Z.grep(Z.merge([], a.getElementsByTagName("script")), m), b.splice.apply(b, [o + 1, 0].concat(v)), o += v.length));
            return b
        },
        cleanData: function(e, t) {
            for (var n, r, o, i, a = 0, s = Z.expando, l = Z.cache, u = Z.support.deleteExpando, c = Z.event.special; null != (o = e[a]); a++)
                if ((t || Z.acceptData(o)) && (r = o[s], n = r && l[r])) {
                    if (n.events)
                        for (i in n.events) c[i] ? Z.event.remove(o, i) : Z.removeEvent(o, i, n.handle);
                    l[r] && (delete l[r], u ? delete o[s] : o.removeAttribute ? o.removeAttribute(s) : o[s] = null, Z.deletedIds.push(r))
                }
        }
    }),
    function() {
        var e, t;
        Z.uaMatch = function(e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        }, e = Z.uaMatch(z.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), Z.browser = t, Z.sub = function() {
            function e(t, n) {
                return new e.fn.init(t, n)
            }
            Z.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function n(r, o) {
                return o && o instanceof Z && !(o instanceof e) && (o = e(o)), Z.fn.init.call(this, r, o, t)
            }, e.fn.init.prototype = e.fn;
            var t = e(q);
            return e
        }
    }();
    var rn, on, an, sn = /alpha\([^)]*\)/i,
        ln = /opacity=([^)]*)/,
        un = /^(top|right|bottom|left)$/,
        cn = /^(none|table(?!-c[ea]).+)/,
        dn = /^margin/,
        pn = new RegExp("^(" + et + ")(.*)$", "i"),
        fn = new RegExp("^(" + et + ")(?!px)[a-z%]+$", "i"),
        hn = new RegExp("^([-+])=(" + et + ")", "i"),
        gn = {
            BODY: "block"
        }, mn = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, vn = {
            letterSpacing: 0,
            fontWeight: 400
        }, yn = ["Top", "Right", "Bottom", "Left"],
        bn = ["Webkit", "O", "Moz", "ms"],
        wn = Z.fn.toggle;
    Z.fn.extend({
        css: function(e, n) {
            return Z.access(this, function(e, n, r) {
                return r !== t ? Z.style(e, n, r) : Z.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return y(this, !0)
        },
        hide: function() {
            return y(this)
        },
        toggle: function(e, t) {
            var n = "boolean" == typeof e;
            return Z.isFunction(e) && Z.isFunction(t) ? wn.apply(this, arguments) : this.each(function() {
                (n ? e : v(this)) ? Z(this).show() : Z(this).hide()
            })
        }
    }), Z.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = rn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": Z.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, a, s, l = Z.camelCase(n),
                    u = e.style;
                if (n = Z.cssProps[l] || (Z.cssProps[l] = m(u, l)), s = Z.cssHooks[n] || Z.cssHooks[l], r === t) return s && "get" in s && (i = s.get(e, !1, o)) !== t ? i : u[n];
                if (a = typeof r, "string" === a && (i = hn.exec(r)) && (r = (i[1] + 1) * i[2] + parseFloat(Z.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || Z.cssNumber[l] || (r += "px"), s && "set" in s && (r = s.set(e, r, o)) === t))) try {
                    u[n] = r
                } catch (c) {}
            }
        },
        css: function(e, n, r, o) {
            var i, a, s, l = Z.camelCase(n);
            return n = Z.cssProps[l] || (Z.cssProps[l] = m(e.style, l)), s = Z.cssHooks[n] || Z.cssHooks[l], s && "get" in s && (i = s.get(e, !0, o)), i === t && (i = rn(e, n)), "normal" === i && n in vn && (i = vn[n]), r || o !== t ? (a = parseFloat(i), r || Z.isNumeric(a) ? a || 0 : i) : i
        },
        swap: function(e, t, n) {
            var r, o, i = {};
            for (o in t) i[o] = e.style[o], e.style[o] = t[o];
            r = n.call(e);
            for (o in t) e.style[o] = i[o];
            return r
        }
    }), e.getComputedStyle ? rn = function(t, n) {
        var r, o, i, a, s = e.getComputedStyle(t, null),
            l = t.style;
        return s && (r = s.getPropertyValue(n) || s[n], "" !== r || Z.contains(t.ownerDocument, t) || (r = Z.style(t, n)), fn.test(r) && dn.test(n) && (o = l.width, i = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = r, r = s.width, l.width = o, l.minWidth = i, l.maxWidth = a)), r
    } : q.documentElement.currentStyle && (rn = function(e, t) {
        var n, r, o = e.currentStyle && e.currentStyle[t],
            i = e.style;
        return null == o && i && i[t] && (o = i[t]), fn.test(o) && !un.test(t) && (n = i.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), i.left = "fontSize" === t ? "1em" : o, o = i.pixelLeft + "px", i.left = n, r && (e.runtimeStyle.left = r)), "" === o ? "auto" : o
    }), Z.each(["height", "width"], function(e, t) {
        Z.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && cn.test(rn(e, "display")) ? Z.swap(e, mn, function() {
                    return x(e, t, r)
                }) : x(e, t, r) : void 0
            },
            set: function(e, n, r) {
                return b(e, n, r ? w(e, t, r, Z.support.boxSizing && "border-box" === Z.css(e, "boxSizing")) : 0)
            }
        }
    }), Z.support.opacity || (Z.cssHooks.opacity = {
        get: function(e, t) {
            return ln.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                o = Z.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                i = r && r.filter || n.filter || "";
            n.zoom = 1, t >= 1 && "" === Z.trim(i.replace(sn, "")) && n.removeAttribute && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = sn.test(i) ? i.replace(sn, o) : i + " " + o)
        }
    }), Z(function() {
        Z.support.reliableMarginRight || (Z.cssHooks.marginRight = {
            get: function(e, t) {
                return Z.swap(e, {
                    display: "inline-block"
                }, function() {
                    return t ? rn(e, "marginRight") : void 0
                })
            }
        }), !Z.support.pixelPosition && Z.fn.position && Z.each(["top", "left"], function(e, t) {
            Z.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        var r = rn(e, t);
                        return fn.test(r) ? Z(e).position()[t] + "px" : r
                    }
                }
            }
        })
    }), Z.expr && Z.expr.filters && (Z.expr.filters.hidden = function(e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !Z.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || rn(e, "display"))
    }, Z.expr.filters.visible = function(e) {
        return !Z.expr.filters.hidden(e)
    }), Z.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        Z.cssHooks[e + t] = {
            expand: function(n) {
                var r, o = "string" == typeof n ? n.split(" ") : [n],
                    i = {};
                for (r = 0; 4 > r; r++) i[e + yn[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, dn.test(e) || (Z.cssHooks[e + t].set = b)
    });
    var xn = /%20/g,
        Tn = /\[\]$/,
        Mn = /\r?\n/g,
        Nn = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Cn = /^(?:select|textarea)/i;
    Z.fn.extend({
        serialize: function() {
            return Z.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? Z.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Cn.test(this.nodeName) || Nn.test(this.type))
            }).map(function(e, t) {
                var n = Z(this).val();
                return null == n ? null : Z.isArray(n) ? Z.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(Mn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Mn, "\r\n")
                }
            }).get()
        }
    }), Z.param = function(e, n) {
        var r, o = [],
            i = function(e, t) {
                t = Z.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t && (n = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (r in e) M(r, e[r], n, i);
        return o.join("&").replace(xn, "+")
    };
    var $n, kn, En = /#.*$/,
        Sn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ln = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Dn = /^(?:GET|HEAD)$/,
        An = /^\/\//,
        _n = /\?/,
        jn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Pn = /([?&])_=[^&]*/,
        In = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Hn = Z.fn.load,
        Fn = {}, Rn = {}, On = ["*/"] + ["*"];
    try {
        kn = W.href
    } catch (Bn) {
        kn = q.createElement("a"), kn.href = "", kn = kn.href
    }
    $n = In.exec(kn.toLowerCase()) || [], Z.fn.load = function(e, n, r) {
        if ("string" != typeof e && Hn) return Hn.apply(this, arguments);
        if (!this.length) return this;
        var o, i, a, s = this,
            l = e.indexOf(" ");
        return l >= 0 && (o = e.slice(l, e.length), e = e.slice(0, l)), Z.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (i = "POST"), Z.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: n,
            complete: function(e, t) {
                r && s.each(r, a || [e.responseText, t, e])
            }
        }).done(function(e) {
            a = arguments, s.html(o ? Z("<div>").append(e.replace(jn, "")).find(o) : e)
        }), this
    }, Z.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        Z.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), Z.each(["get", "post"], function(e, n) {
        Z[n] = function(e, r, o, i) {
            return Z.isFunction(r) && (i = i || o, o = r, r = t), Z.ajax({
                type: n,
                url: e,
                data: r,
                success: o,
                dataType: i
            })
        }
    }), Z.extend({
        getScript: function(e, n) {
            return Z.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return Z.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? k(e, Z.ajaxSettings) : (t = e, e = Z.ajaxSettings), k(e, t), e
        },
        ajaxSettings: {
            url: kn,
            isLocal: Ln.test($n[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": On
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": Z.parseJSON,
                "text xml": Z.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: N(Fn),
        ajaxTransport: N(Rn),
        ajax: function(e, n) {
            function r(e, n, r, a) {
                var u, d, y, b, x, M = n;
                2 !== w && (w = 2, l && clearTimeout(l), s = t, i = a || "", T.readyState = e > 0 ? 4 : 0, r && (b = E(p, T, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (x = T.getResponseHeader("Last-Modified"), x && (Z.lastModified[o] = x), x = T.getResponseHeader("Etag"), x && (Z.etag[o] = x)), 304 === e ? (M = "notmodified", u = !0) : (u = S(p, b), M = u.state, d = u.data, y = u.error, u = !y)) : (y = M, (!M || e) && (M = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || M) + "", u ? g.resolveWith(f, [d, M, T]) : g.rejectWith(f, [T, M, y]), T.statusCode(v), v = t, c && h.trigger("ajax" + (u ? "Success" : "Error"), [T, p, u ? d : y]), m.fireWith(f, [T, M]), c && (h.trigger("ajaxComplete", [T, p]), --Z.active || Z.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e, e = t), n = n || {};
            var o, i, a, s, l, u, c, d, p = Z.ajaxSetup({}, n),
                f = p.context || p,
                h = f !== p && (f.nodeType || f instanceof Z) ? Z(f) : Z.event,
                g = Z.Deferred(),
                m = Z.Callbacks("once memory"),
                v = p.statusCode || {}, y = {}, b = {}, w = 0,
                x = "canceled",
                T = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!w) {
                            var n = e.toLowerCase();
                            e = b[n] = b[n] || e, y[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? i : null
                    },
                    getResponseHeader: function(e) {
                        var n;
                        if (2 === w) {
                            if (!a)
                                for (a = {}; n = Sn.exec(i);) a[n[1].toLowerCase()] = n[2];
                            n = a[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function(e) {
                        return w || (p.mimeType = e), this
                    },
                    abort: function(e) {
                        return e = e || x, s && s.abort(e), r(0, e), this
                    }
                };
            if (g.promise(T), T.success = T.done, T.error = T.fail, T.complete = m.add, T.statusCode = function(e) {
                if (e) {
                    var t;
                    if (2 > w)
                        for (t in e) v[t] = [v[t], e[t]];
                    else t = e[T.status], T.always(t)
                }
                return this
            }, p.url = ((e || p.url) + "").replace(En, "").replace(An, $n[1] + "//"), p.dataTypes = Z.trim(p.dataType || "*").toLowerCase().split(nt), null == p.crossDomain && (u = In.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === $n[1] && u[2] === $n[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == ($n[3] || ("http:" === $n[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = Z.param(p.data, p.traditional)), C(Fn, p, n, T), 2 === w) return T;
            if (c = p.global, p.type = p.type.toUpperCase(), p.hasContent = !Dn.test(p.type), c && 0 === Z.active++ && Z.event.trigger("ajaxStart"), !p.hasContent && (p.data && (p.url += (_n.test(p.url) ? "&" : "?") + p.data, delete p.data), o = p.url, p.cache === !1)) {
                var M = Z.now(),
                    N = p.url.replace(Pn, "$1_=" + M);
                p.url = N + (N === p.url ? (_n.test(p.url) ? "&" : "?") + "_=" + M : "")
            }(p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), p.ifModified && (o = o || p.url, Z.lastModified[o] && T.setRequestHeader("If-Modified-Since", Z.lastModified[o]), Z.etag[o] && T.setRequestHeader("If-None-Match", Z.etag[o])), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + On + "; q=0.01" : "") : p.accepts["*"]);
            for (d in p.headers) T.setRequestHeader(d, p.headers[d]);
            if (p.beforeSend && (p.beforeSend.call(f, T, p) === !1 || 2 === w)) return T.abort();
            x = "abort";
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) T[d](p[d]);
            if (s = C(Rn, p, n, T)) {
                T.readyState = 1, c && h.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                    T.abort("timeout")
                }, p.timeout));
                try {
                    w = 1, s.send(y, r)
                } catch (k) {
                    if (!(2 > w)) throw k;
                    r(-1, k)
                }
            } else r(-1, "No Transport");
            return T
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var qn = [],
        Wn = /\?/,
        zn = /(=)\?(?=&|$)|\?\?/,
        Xn = Z.now();
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = qn.pop() || Z.expando + "_" + Xn++;
            return this[e] = !0, e
        }
    }), Z.ajaxPrefilter("json jsonp", function(n, r, o) {
        var i, a, s, l = n.data,
            u = n.url,
            c = n.jsonp !== !1,
            d = c && zn.test(u),
            p = c && !d && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && zn.test(l);
        return "jsonp" === n.dataTypes[0] || d || p ? (i = n.jsonpCallback = Z.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, a = e[i], d ? n.url = u.replace(zn, "$1" + i) : p ? n.data = l.replace(zn, "$1" + i) : c && (n.url += (Wn.test(u) ? "&" : "?") + n.jsonp + "=" + i), n.converters["script json"] = function() {
            return s || Z.error(i + " was not called"), s[0]
        }, n.dataTypes[0] = "json", e[i] = function() {
            s = arguments
        }, o.always(function() {
            e[i] = a, n[i] && (n.jsonpCallback = r.jsonpCallback, qn.push(i)), s && Z.isFunction(a) && a(s[0]), s = a = t
        }), "script") : void 0
    }), Z.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return Z.globalEval(e), e
            }
        }
    }), Z.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), Z.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = q.head || q.getElementsByTagName("head")[0] || q.documentElement;
            return {
                send: function(o, i) {
                    n = q.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, o) {
                        (o || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, o || i(200, "success"))
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Gn, Yn = e.ActiveXObject ? function() {
            for (var e in Gn) Gn[e](0, 1)
        } : !1,
        Un = 0;
    Z.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && L() || D()
    } : L,
    function(e) {
        Z.extend(Z.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        })
    }(Z.ajaxSettings.xhr()), Z.support.ajax && Z.ajaxTransport(function(n) {
        if (!n.crossDomain || Z.support.cors) {
            var r;
            return {
                send: function(o, i) {
                    var a, s, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                        for (s in n.xhrFields) l[s] = n.xhrFields[s];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in o) l.setRequestHeader(s, o[s])
                    } catch (u) {}
                    l.send(n.hasContent && n.data || null), r = function(e, o) {
                        var s, u, c, d, p;
                        try {
                            if (r && (o || 4 === l.readyState))
                                if (r = t, a && (l.onreadystatechange = Z.noop, Yn && delete Gn[a]), o) 4 !== l.readyState && l.abort();
                                else {
                                    s = l.status, c = l.getAllResponseHeaders(), d = {}, p = l.responseXML, p && p.documentElement && (d.xml = p);
                                    try {
                                        d.text = l.responseText
                                    } catch (f) {}
                                    try {
                                        u = l.statusText
                                    } catch (f) {
                                        u = ""
                                    }
                                    s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                }
                        } catch (h) {
                            o || i(-1, h)
                        }
                        d && i(s, u, d, c)
                    }, n.async ? 4 === l.readyState ? setTimeout(r, 0) : (a = ++Un, Yn && (Gn || (Gn = {}, Z(e).unload(Yn)), Gn[a] = r), l.onreadystatechange = r) : r()
                },
                abort: function() {
                    r && r(0, 1)
                }
            }
        }
    });
    var Vn, Qn, Jn = /^(?:toggle|show|hide)$/,
        Kn = new RegExp("^(?:([-+])=|)(" + et + ")([a-z%]*)$", "i"),
        Zn = /queueHooks$/,
        er = [I],
        tr = {
            "*": [
                function(e, t) {
                    var n, r, o = this.createTween(e, t),
                        i = Kn.exec(t),
                        a = o.cur(),
                        s = +a || 0,
                        l = 1,
                        u = 20;
                    if (i) {
                        if (n = +i[2], r = i[3] || (Z.cssNumber[e] ? "" : "px"), "px" !== r && s) {
                            s = Z.css(o.elem, e, !0) || n || 1;
                            do l = l || ".5", s /= l, Z.style(o.elem, e, s + r); while (l !== (l = o.cur() / a) && 1 !== l && --u)
                        }
                        o.unit = r, o.start = s, o.end = i[1] ? s + (i[1] + 1) * n : n
                    }
                    return o
                }
            ]
        };
    Z.Animation = Z.extend(j, {
        tweener: function(e, t) {
            Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, o = e.length; o > r; r++) n = e[r], tr[n] = tr[n] || [], tr[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? er.unshift(e) : er.push(e)
        }
    }), Z.Tween = H, H.prototype = {
        constructor: H,
        init: function(e, t, n, r, o, i) {
            this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (Z.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = H.propHooks[this.prop];
            return e && e.get ? e.get(this) : H.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = H.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : H.propHooks._default.set(this), this
        }
    }, H.prototype.init.prototype = H.prototype, H.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, H.propHooks.scrollTop = H.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, Z.each(["toggle", "show", "hide"], function(e, t) {
        var n = Z.fn[t];
        Z.fn[t] = function(r, o, i) {
            return null == r || "boolean" == typeof r || !e && Z.isFunction(r) && Z.isFunction(o) ? n.apply(this, arguments) : this.animate(F(t, !0), r, o, i)
        }
    }), Z.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(v).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var o = Z.isEmptyObject(e),
                i = Z.speed(t, n, r),
                a = function() {
                    var t = j(this, Z.extend({}, e), i);
                    o && t.stop(!0)
                };
            return o || i.queue === !1 ? this.each(a) : this.queue(i.queue, a)
        },
        stop: function(e, n, r) {
            var o = function(e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    i = Z.timers,
                    a = Z._data(this);
                if (n) a[n] && a[n].stop && o(a[n]);
                else
                    for (n in a) a[n] && a[n].stop && Zn.test(n) && o(a[n]);
                for (n = i.length; n--;) i[n].elem !== this || null != e && i[n].queue !== e || (i[n].anim.stop(r), t = !1, i.splice(n, 1));
                (t || !r) && Z.dequeue(this, e)
            })
        }
    }), Z.each({
        slideDown: F("show"),
        slideUp: F("hide"),
        slideToggle: F("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        Z.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), Z.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: n || !n && t || Z.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !Z.isFunction(t) && t
        };
        return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue)
        }, r
    }, Z.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, Z.timers = [], Z.fx = H.prototype.init, Z.fx.tick = function() {
        var e, n = Z.timers,
            r = 0;
        for (Vn = Z.now(); r < n.length; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || Z.fx.stop(), Vn = t
    }, Z.fx.timer = function(e) {
        e() && Z.timers.push(e) && !Qn && (Qn = setInterval(Z.fx.tick, Z.fx.interval))
    }, Z.fx.interval = 13, Z.fx.stop = function() {
        clearInterval(Qn), Qn = null
    }, Z.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Z.fx.step = {}, Z.expr && Z.expr.filters && (Z.expr.filters.animated = function(e) {
        return Z.grep(Z.timers, function(t) {
            return e === t.elem
        }).length
    });
    var nr = /^(?:body|html)$/i;
    Z.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            Z.offset.setOffset(this, e, t)
        });
        var n, r, o, i, a, s, l, u = {
                top: 0,
                left: 0
            }, c = this[0],
            d = c && c.ownerDocument;
        if (d) return (r = d.body) === c ? Z.offset.bodyOffset(c) : (n = d.documentElement, Z.contains(n, c) ? ("undefined" != typeof c.getBoundingClientRect && (u = c.getBoundingClientRect()), o = R(d), i = n.clientTop || r.clientTop || 0, a = n.clientLeft || r.clientLeft || 0, s = o.pageYOffset || n.scrollTop, l = o.pageXOffset || n.scrollLeft, {
            top: u.top + s - i,
            left: u.left + l - a
        }) : u)
    }, Z.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return Z.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Z.css(e, "marginTop")) || 0, n += parseFloat(Z.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = Z.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var o = Z(e),
                i = o.offset(),
                a = Z.css(e, "top"),
                s = Z.css(e, "left"),
                l = ("absolute" === r || "fixed" === r) && Z.inArray("auto", [a, s]) > -1,
                u = {}, c = {}, d, p;
            l ? (c = o.position(), d = c.top, p = c.left) : (d = parseFloat(a) || 0, p = parseFloat(s) || 0), Z.isFunction(t) && (t = t.call(e, n, i)), null != t.top && (u.top = t.top - i.top + d), null != t.left && (u.left = t.left - i.left + p), "using" in t ? t.using.call(e, u) : o.css(u)
        }
    }, Z.fn.extend({
        position: function() {
            if (this[0]) {
                var e = this[0],
                    t = this.offsetParent(),
                    n = this.offset(),
                    r = nr.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return n.top -= parseFloat(Z.css(e, "marginTop")) || 0, n.left -= parseFloat(Z.css(e, "marginLeft")) || 0, r.top += parseFloat(Z.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(Z.css(t[0], "borderLeftWidth")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || q.body; e && !nr.test(e.nodeName) && "static" === Z.css(e, "position");) e = e.offsetParent;
                return e || q.body
            })
        }
    }), Z.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        Z.fn[e] = function(o) {
            return Z.access(this, function(e, o, i) {
                var a = R(e);
                return i === t ? a ? n in a ? a[n] : a.document.documentElement[o] : e[o] : void(a ? a.scrollTo(r ? Z(a).scrollLeft() : i, r ? i : Z(a).scrollTop()) : e[o] = i)
            }, e, o, arguments.length, null)
        }
    }), Z.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        Z.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, o) {
            Z.fn[o] = function(o, i) {
                var a = arguments.length && (r || "boolean" != typeof o),
                    s = r || (o === !0 || i === !0 ? "margin" : "border");
                return Z.access(this, function(n, r, o) {
                    var i;
                    return Z.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (i = n.documentElement, Math.max(n.body["scroll" + e], i["scroll" + e], n.body["offset" + e], i["offset" + e], i["client" + e])) : o === t ? Z.css(n, r, o, s) : Z.style(n, r, o, s)
                }, n, a ? o : t, a, null)
            }
        })
    }), e.jQuery = e.$ = Z, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return Z
    })
}(window),
function(e, t, n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(r) {
        return n(r, e, t), r.mobile
    }) : n(e.jQuery, e, t)
}(this, document, function(e, t, n, r) {
    ! function(e, t, n, r) {
        function o(e) {
            for (; e && "undefined" != typeof e.originalEvent;) e = e.originalEvent;
            return e
        }

        function i(t, n) {
            var i = t.type,
                a, s, l, u, c, d, p, f, h;
            if (t = e.Event(t), t.type = n, a = t.originalEvent, s = e.event.props, i.search(/^(mouse|click)/) > -1 && (s = S), a)
                for (p = s.length, u; p;) u = s[--p], t[u] = a[u];
            if (i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1), -1 !== i.search(/^touch/) && (l = o(a), i = l.touches, c = l.changedTouches, d = i && i.length ? i[0] : c && c.length ? c[0] : r, d))
                for (f = 0, h = k.length; h > f; f++) u = k[f], t[u] = d[u];
            return t
        }

        function a(t) {
            for (var n = {}, r, o; t;) {
                r = e.data(t, M);
                for (o in r) r[o] && (n[o] = n.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return n
        }

        function s(t, n) {
            for (var r; t;) {
                if (r = e.data(t, M), r && (!n || r[n])) return t;
                t = t.parentNode
            }
            return null
        }

        function l() {
            H = !1
        }

        function u() {
            H = !0
        }

        function c() {
            B = 0, P.length = 0, I = !1, u()
        }

        function d() {
            l()
        }

        function p() {
            f(), D = setTimeout(function() {
                D = 0, c()
            }, e.vmouse.resetTimerDuration)
        }

        function f() {
            D && (clearTimeout(D), D = 0)
        }

        function h(t, n, r) {
            var o;
            return (r && r[t] || !r && s(n.target, t)) && (o = i(n, t), e(n.target).trigger(o)), o
        }

        function g(t) {
            var n = e.data(t.target, N);
            if (!(I || B && B === n)) {
                var r = h("v" + t.type, t);
                r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation())
            }
        }

        function m(t) {
            var n = o(t).touches,
                r, i;
            if (n && 1 === n.length && (r = t.target, i = a(r), i.hasVirtualBinding)) {
                B = O++, e.data(r, N, B), f(), d(), j = !1;
                var s = o(t).touches[0];
                A = s.pageX, _ = s.pageY, h("vmouseover", t, i), h("vmousedown", t, i)
            }
        }

        function v(e) {
            H || (j || h("vmousecancel", e, a(e.target)), j = !0, p())
        }

        function y(t) {
            if (!H) {
                var n = o(t).touches[0],
                    r = j,
                    i = e.vmouse.moveDistanceThreshold,
                    s = a(t.target);
                j = j || Math.abs(n.pageX - A) > i || Math.abs(n.pageY - _) > i, j && !r && h("vmousecancel", t, s), h("vmousemove", t, s), p()
            }
        }

        function b(e) {
            if (!H) {
                u();
                var t = a(e.target),
                    n;
                if (h("vmouseup", e, t), !j) {
                    var r = h("vclick", e, t);
                    r && r.isDefaultPrevented() && (n = o(e).changedTouches[0], P.push({
                        touchID: B,
                        x: n.clientX,
                        y: n.clientY
                    }), I = !0)
                }
                h("vmouseout", e, t), j = !1, p()
            }
        }

        function w(t) {
            var n = e.data(t, M),
                r;
            if (n)
                for (r in n)
                    if (n[r]) return !0;
            return !1
        }

        function x() {}

        function T(t) {
            var n = t.substr(1);
            return {
                setup: function(r, o) {
                    w(this) || e.data(this, M, {});
                    var i = e.data(this, M);
                    i[t] = !0, L[t] = (L[t] || 0) + 1, 1 === L[t] && R.bind(n, g), e(this).bind(n, x), F && (L.touchstart = (L.touchstart || 0) + 1, 1 === L.touchstart && R.bind("touchstart", m).bind("touchend", b).bind("touchmove", y).bind("scroll", v))
                },
                teardown: function(r, o) {
                    --L[t], L[t] || R.unbind(n, g), F && (--L.touchstart, L.touchstart || R.unbind("touchstart", m).unbind("touchmove", y).unbind("touchend", b).unbind("scroll", v));
                    var i = e(this),
                        a = e.data(this, M);
                    a && (a[t] = !1), i.unbind(n, x), w(this) || i.removeData(M)
                }
            }
        }
        var M = "virtualMouseBindings",
            N = "virtualTouchID",
            C = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            k = "clientX clientY pageX pageY screenX screenY".split(" "),
            E = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            S = e.event.props.concat(E),
            L = {}, D = 0,
            A = 0,
            _ = 0,
            j = !1,
            P = [],
            I = !1,
            H = !1,
            F = "addEventListener" in n,
            R = e(n),
            O = 1,
            B = 0,
            q;
        e.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (var W = 0; W < C.length; W++) e.event.special[C[W]] = T(C[W]);
        F && n.addEventListener("click", function(t) {
            var n = P.length,
                r = t.target,
                o, i, a, s, l, u;
            if (n)
                for (o = t.clientX, i = t.clientY, q = e.vmouse.clickDistanceThreshold, a = r; a;) {
                    for (s = 0; n > s; s++)
                        if (l = P[s], u = 0, a === r && Math.abs(l.x - o) < q && Math.abs(l.y - i) < q || e.data(a, N) === l.touchID) return t.preventDefault(), void t.stopPropagation();
                    a = a.parentNode
                }
        }, !0)
    }(e, t, n),
    function(e) {
        e.mobile = {}
    }(e),
    function(e, t) {
        var r = {
            touch: "ontouchend" in n
        };
        e.mobile.support = e.mobile.support || {}, e.extend(e.support, r), e.extend(e.mobile.support, r)
    }(e),
    function(e, t, r) {
        function o(t, n, r) {
            var o = r.type;
            r.type = n, e.event.dispatch.call(t, r), r.type = o
        }
        var i = e(n);
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }, e.attrFn && (e.attrFn[n] = !0)
        });
        var a = e.mobile.support.touch,
            s = "touchmove scroll",
            l = a ? "touchstart" : "mousedown",
            u = a ? "touchend" : "mouseup",
            c = a ? "touchmove" : "mousemove";
        e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function t(e, t) {
                    i = t, o(n, i ? "scrollstart" : "scrollstop", e)
                }
                var n = this,
                    r = e(n),
                    i, a;
                r.bind(s, function(n) {
                    e.event.special.scrollstart.enabled && (i || t(n, !0), clearTimeout(a), a = setTimeout(function() {
                        t(n, !1)
                    }, 50))
                })
            }
        }, e.event.special.tap = {
            tapholdThreshold: 750,
            setup: function() {
                var t = this,
                    n = e(t);
                n.bind("vmousedown", function(r) {
                    function a() {
                        clearTimeout(d)
                    }

                    function s() {
                        a(), n.unbind("vclick", l).unbind("vmouseup", a), i.unbind("vmousecancel", s)
                    }

                    function l(e) {
                        s(), u === e.target && o(t, "tap", e)
                    }
                    if (r.which && 1 !== r.which) return !1;
                    var u = r.target,
                        c = r.originalEvent,
                        d;
                    n.bind("vmouseup", a).bind("vclick", l), i.bind("vmousecancel", s), d = setTimeout(function() {
                        o(t, "taphold", e.Event("taphold", {
                            target: u
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            start: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
                return {
                    time: (new Date).getTime(),
                    coords: [n.pageX, n.pageY],
                    origin: e(t.target)
                }
            },
            stop: function(e) {
                var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                return {
                    time: (new Date).getTime(),
                    coords: [t.pageX, t.pageY]
                }
            },
            handleSwipe: function(t, n) {
                n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && t.origin.trigger("swipe").trigger(t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight")
            },
            setup: function() {
                var t = this,
                    n = e(t);
                n.bind(l, function(t) {
                    function o(t) {
                        i && (a = e.event.special.swipe.stop(t), Math.abs(i.coords[0] - a.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault())
                    }
                    var i = e.event.special.swipe.start(t),
                        a;
                    n.bind(c, o).one(u, function() {
                        n.unbind(c, o), i && a && e.event.special.swipe.handleSwipe(i, a), i = a = r
                    })
                })
            }
        }, e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(n, e.noop)
                }
            }
        })
    }(e, this)
}),
function($) {
    var e = [];
    $.loadImages = function(t, n) {
        t instanceof Array || (t = [t]);
        for (var r = t.length, o = 0, i = 0; r > i; ++i) {
            var a = document.createElement("img");
            a.onload = function() {
                o++, o >= r && $.isFunction(n) && n()
            }, a.src = t[i], e.push(a)
        }
    }
}(jQuery),
function($) {
    $.fn.toggleView = function(e) {
        return this.each(function() {
            function t(e) {
                o ? (o = !1, $(this).removeClass("active"), $(i).slideUp()) : (o = !0, $(this).addClass("active"), $(i).slideDown()), e.preventDefault()
            }
            var n = $.extend({}, e),
                r = this,
                o = !1,
                i = $(r).find(".tray");
            $(r).find("p.toggle a").bind("tap", t)
        })
    }
}(jQuery), $(function() {
    function e() {
        var e = $(window).width();
        if (980 >= e) $("#home-feature").height(e), $("#header").addClass("top"), i && $("#header").addClass("top-with-admin-bar");
        else {
            var t = $(window).height();
            i && (t -= $("#wpadminbar").height()), $("#home-feature").height(t);
            var n = $(window).scrollTop(),
                r = t - $("#header").height();
            n >= r ? ($("#header").addClass("top"), i && $("#header").addClass("top-with-admin-bar")) : $("#header").removeClass("top").removeClass("top-with-admin-bar")
        }
    }

    function t() {
        var e = $("#youtube-video").width(),
            t = Math.ceil(e / 16 * 9);
        $("#youtube-video").css("height", t)
    }

    function n() {
        var e = $(window).height(),
            t = $(window).width();
        t > 980 && (e -= $("#header").height()), i && (e -= $("#wpadminbar").height()), 650 > e && (e = 650), $("#brew-finder").css("height", e), $("#brew-finder").find(".list-middle").css("height", e - 350)
    }

    function r(e, t, n, r) {
        var o = new LatLon(e, t),
            i = new LatLon(n, r),
            a = o.distanceTo(i);
        return .621371 * a
    }

    function o() {
        b++, b >= y && (b = 0), $("#home-feature").css({
            "background-image": "url(" + w[b] + ")"
        })
    }
    var i = $("#wpadminbar").length > 0 ? !0 : !1,
        a, s;
    $("body").hasClass("theme-home") ? ($(window).resize(function() {
        e()
    }), "onorientationchange" in window && (window.addEventListener ? window.addEventListener("orientationchange", function() {
        e()
    }, !1) : window.attachEvent("orientationchange", function() {
        e()
    })), $(window).scroll(function() {
        e()
    }), e()) : i && $("#header").addClass("top-with-admin-bar"), $("#noda-want-at-bar").tap(function() {
        $("#cntctfrm_contact_subject").val("I want NoDa at my neighborhood bar")
    }), $("#noda-want-to-sell").tap(function() {
        $("#cntctfrm_contact_subject").val("I want to sell NoDa in my bar or shop")
    }), $("a[href*=#]").tap(function(e) {
        e.preventDefault();
        var t = this.href.split("#")[1],
            n = $("#" + t).offset(),
            r = void 0 === n ? 0 : n.top - $("#header").height();
        $("html, body").animate({
            scrollTop: r
        }, 250)
    }), $("#people").length > 0 && ($("#people").find(".staff-thumb").tap(function(e) {
        e.preventDefault();
        var t = $(window).width();
        if (t > 980) {
            var n = $(this).hasClass("active");
            if ($("#people .staff-thumb").removeClass("active"), $("#people .staff-feature").slideUp(250), n === !1) {
                var r = $(this).data("feature");
                $(this).addClass("active"), $(r).slideDown(250), setTimeout(function() {
                    var e = $(r).offset(),
                        t = void 0 === e ? 0 : e.top - $("#header").height() - 150;
                    $("html, body").animate({
                        scrollTop: t
                    }, 500)
                }, 250)
            }
        }
    }), $("#people").find(".close").tap(function(e) {
        e.preventDefault(), $("#people .staff-thumb").removeClass("active"), $("#people .staff-feature").slideUp(250)
    })), window.location.href.indexOf("/calendar/") > -1 ? ($("#header .current_page_parent").removeClass("current_page_parent"), $("#menu-item-39").addClass("current-menu-item")) : window.location.href.indexOf("/nodable") > -1 ? ($("#header .current_page_parent").removeClass("current_page_parent"), $("#menu-item-36").addClass("current-menu-item")) : window.location.href.indexOf("/beer/") > -1 && ($("#header .current_page_parent").removeClass("current_page_parent"), $("#menu-item-35").addClass("current-menu-item")), $("#header").toggleView(), $("#beer-toggle").toggleView(), $("#youtube-video").length > 0 && ($(window).resize(t), "onorientationchange" in window && window.addEventListener("orientationchange", t, !1), t());
    var l;
    if ($("#brew-finder").length > 0)
        if ($("#brew-finder").show(), $(window).width() <= 1025) $(".brew-finder-mobile-header").show(), $("#brew-finder").css({
            boxShadow: "none",
            height: "auto"
        }), $("#brew-finder .map").hide(), $("#brew-finder .list-header").hide(), $("#brew-finder .list-middle").css({
            height: "auto",
            overflow: "visible",
            left: 0,
            position: "static",
            top: 0,
            width: "100%"
        }), $("#brew-finder .list-middle .list-content").css({
            "float": "none",
            margin: "40px auto 10px auto"
        }), $("#brew-finder .list-footer").hide(), $("#brew-finder .list-middle .list-content").prepend('<button id="brew-finder-button">Find Nearest Locations</button><p class="or">or</p><form id="zipcode-form"><p><input id="zipcode-input" type="text" name="zipcode" placeholder="Zip Code" maxlength="11" /><button>Search</button></p></form>'), $("#locations-list li").hide(), $("#brew-finder-button").tap(function() {
            $("#locations-list li").hide(), navigator.geolocation ? ($("#zipcode-input").attr("disabled", "disabled").attr("readonly", "readonly"), $("#zipcode-form button").attr("disabled", "disabled"), $("#brew-finder-button").attr("disabled", "disabled"), navigator.geolocation.getCurrentPosition(function(e) {
                $("#locations-list li").hide(), $("#locations-list li").each(function() {
                    var t = r(e.coords.latitude, e.coords.longitude, $(this).data("lat"), $(this).data("lng"));
                    $(this).data("distance", t)
                }), $("#locations-list li").sort(function(e, t) {
                    var n = parseInt(100 * $(e).data("distance")),
                        r = parseInt(100 * $(t).data("distance"));
                    return r > n ? -1 : n > r ? 1 : 0
                }).appendTo("#locations-list"), $("#locations-list li:lt(15)").show(), $("#zipcode-input").removeAttr("disabled").removeAttr("readonly"), $("#zipcode-form button").removeAttr("disabled"), $("#brew-finder-button").removeAttr("disabled")
            })) : window.alert("Sorry, geolocation is not supported by this browser.")
        }), $("#zipcode-form").submit(function(e) {
            e.preventDefault();
            var t = $("#zipcode-input").val(),
                n = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(t);
            if (n) {
                $("#locations-list li").hide(), $("#zipcode-input").attr("disabled", "disabled").attr("readonly", "readonly"), $("#zipcode-form button").attr("disabled", "disabled"), $("#brew-finder-button").attr("disabled", "disabled");
                var o = new window.google.maps.Geocoder;
                o.geocode({
                    address: t
                }, function(e, t) {
                    t === window.google.maps.GeocoderStatus.OK ? ($("#locations-list li").hide(), $("#locations-list li").each(function() {
                        var t = r(e[0].geometry.location.k, e[0].geometry.location.B, $(this).data("lat"), $(this).data("lng"));
                        $(this).data("distance", t)
                    }), $("#locations-list li").sort(function(e, t) {
                        var n = parseInt(100 * $(e).data("distance")),
                            r = parseInt(100 * $(t).data("distance"));
                        return r > n ? -1 : n > r ? 1 : 0
                    }).appendTo("#locations-list"), $("#locations-list li:lt(15)").show(), $("#zipcode-input").removeAttr("disabled").removeAttr("readonly"), $("#zipcode-form button").removeAttr("disabled"), $("#brew-finder-button").removeAttr("disabled")) : (window.alert("There was an error processing the zip code you provided."), $("#zipcode-input").removeAttr("disabled").removeAttr("readonly"), $("#zipcode-form button").removeAttr("disabled"), $("#brew-finder-button").removeAttr("disabled"))
                })
            } else window.alert("Please enter a valid zip code.")
        });
        else {
            $("body.theme-brew-finder").length > 0 && ($(window).resize(n), "onorientationchange" in window && window.addEventListener("orientationchange", n, !1), n()), l = new window.google.maps.Map(document.getElementById("map"), {
                center: new window.google.maps.LatLng(35.2269, -80.8433),
                disableDefaultUI: !0,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                zoom: 11
            });
            var u = new window.google.maps.MarkerImage($("body").data("template-url") + "/assets/img/theme/brew-finder/marker@2x.png", new window.google.maps.Size(26, 31), new window.google.maps.Point(0, 0), new window.google.maps.Point(13, 31), new window.google.maps.Size(26, 31)),
                c = [],
                d = [],
                p = null;
            $("#locations-list li").each(function() {
                var e = new window.google.maps.Marker({
                    animation: window.google.maps.Animation.DROP,
                    position: new window.google.maps.LatLng($(this).data("lat"), $(this).data("lng")),
                    map: l,
                    icon: u
                });
                c[$(this).data("id")] = e;
                var t = "" !== $(this).data("website") ? '<a href="' + $(this).data("website") + '" target="_blank"><strong>' + $(this).data("title") + "</strong></a>" : "<strong>" + $(this).data("title") + "</strong>";
                t += " <br />" + $(this).data("address");
                var n = new window.google.maps.InfoWindow({
                    content: t
                });
                window.google.maps.event.addListener(e, "click", function() {
                    null !== p && (p.close(), p = null), n.open(l, this), p = n
                }), d[$(this).data("id")] = n, $(this).tap(function(e) {
                    null !== p && (p.close(), p = null);
                    var t = d[$(this).data("id")];
                    t.open(l, c[$(this).data("id")]), p = t, l.panTo(new window.google.maps.LatLng($(this).data("lat"), $(this).data("lng")))
                })
            }), google.maps.event.addListener(l, "idle", function(e) {
                var t = l.getBounds(),
                    n = l.getCenter(),
                    o = t.getNorthEast(),
                    i = t.getSouthWest(),
                    a = n.lat(),
                    s = i.lat(),
                    u = o.lat(),
                    c = n.lng(),
                    d = i.lng(),
                    p = o.lng();
                $("#locations-list li").each(function() {
                    var e = $(this).data("lat"),
                        t = $(this).data("lng");
                    e >= s && u >= e && t >= d && p >= t ? $(this).show() : $(this).hide();
                    var n = r(a, c, e, t);
                    $(this).data("distance", n)
                }), $("#locations-list li").sort(function(e, t) {
                    var n = parseInt(100 * $(e).data("distance")),
                        r = parseInt(100 * $(t).data("distance"));
                    return r > n ? -1 : n > r ? 1 : 0
                }).appendTo("#locations-list")
            }), $("#map-form").submit(function(e) {
                e.preventDefault();
                var t = $("#map-input").val(),
                    n = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(t);
                if (n) {
                    $("#map-input").attr("disabled", "disabled").attr("readonly", "readonly"), $("#map-form button").attr("disabled", "disabled");
                    var r = new window.google.maps.Geocoder;
                    r.geocode({
                        address: t
                    }, function(e, t) {
                        t === window.google.maps.GeocoderStatus.OK ? (l.panTo(e[0].geometry.location), l.setZoom(13), $("#map-input").removeAttr("disabled").removeAttr("readonly"), $("#map-form button").removeAttr("disabled")) : (window.alert("There was an error processing the zip code you provided."), $("#map-input").removeAttr("disabled").removeAttr("readonly"), $("#map-form button").removeAttr("disabled"))
                    })
                } else window.alert("Please enter a valid zip code.")
            })
        } else $("#map").length > 0 && (l = new window.google.maps.Map(document.getElementById("map"), {
            center: new window.google.maps.LatLng(35.2269, -80.8433),
            disableDoubleClickZoom: !0,
            draggable: !1,
            keyboardShortcuts: !1,
            mapTypeControlOptions: {
                mapTypeIds: window.google.maps.MapTypeId.ROADMAP
            },
            scrollwheel: !1,
            panControl: !1,
            zoomControl: !1,
            scaleControl: !1,
            streetViewControl: !1,
            zoom: 13
        }));
    if ($("#gallery").length > 0 && $("#gallery h2").tap(function(e) {
        e.preventDefault(), $("#gallery").hasClass("active") ? $("#gallery").removeClass("active") : $("#gallery").addClass("active")
    }), $(".bar").each(function() {
        var e = $(this).data("val") / $(this).data("max") * 100;
        $(this).find(".fill").css("height", e + "%"), $(this).find(".empty").css("height", 100 - e + "%"), $(this).find(".marker").css("bottom", e + "%")
    }), "createTouch" in document) try {
        var f = /:hover/;
        for (a = 0; a < document.styleSheets.length; a++) {
            var h = document.styleSheets[a];
            for (s = h.cssRules.length - 1; s >= 0; s--) {
                var g = h.cssRules[s];
                g.type === window.CSSRule.STYLE_RULE && f.test(g.selectorText) && h.deleteRule(s)
            }
        }
    } catch (m) {}
    $("#menu-item-135 a").length > 0 && $("#menu-item-135 a").prop("target", "_blank");
    var v, y, b, w;
    if ($(window).width() > 1024) {
        for (v = $("body").data("home-features-set"), y = $("body").data("total-home-features"), b = 0, w = [], s = 0; y > s; s++) w.push($("body").data("template-url") + "/assets/img/theme/home-features/" + v + "/" + s + ".jpg");
        o(), $.loadImages(w, function() {
            setInterval(o, 4e3)
        })
    }
    $(document).live("click", "a.google-maps-link", function(e) {
        void 0 !== window._gaq && $(e.target).hasClass("google-maps-link") && window._gaq.push(["_trackEvent", "Google Maps Visitecd"])
    })
});
