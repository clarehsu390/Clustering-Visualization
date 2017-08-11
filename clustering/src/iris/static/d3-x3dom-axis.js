! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(t.d3_x3dom_axis = t.d3_x3dom_axis || {})
}(this, function(t) {
    "use strict";

    function n(t, n, e) {
        function l(a) {
            function l(t) {
                var n;
                switch (t) {
                    case "x":
                        n = [1, 0, 0];
                        break;
                    case "y":
                        n = [0, 1, 0];
                        break;
                    case "z":
                        n = [0, 0, 1]
                }
                return n
            }

            function d(t) {
                var n;
                switch (t) {
                    case "x":
                        n = [1, 1, 0, Math.PI];
                        break;
                    case "y":
                        n = [0, 0, 0, 0];
                        break;
                    case "z":
                        n = [0, 1, 1, Math.PI]
                }
                return n
            }
            var f, m, h, k, g = null == c ? e.ticks ? e.ticks.apply(e, o) : e.domain() : c,
                y = null == s ? e.tickFormat ? e.tickFormat.apply(e, o) : r : s,
                x = e.range(),
                b = x[0],
                v = x[x.length - 1],
                j = a.selection ? a.selection() : a;
            f = l(t), h = l(n), m = d(t), k = d(n);
            var A = j.selectAll("transform").data([null]),
                z = j.selectAll(".tick").data(g, e).order(),
                L = z.exit(),
                _ = z.enter().append("transform").attr("translation", function(t) {
                    return f.map(function(n) {
                        return e(t) * n
                    }).join(" ")
                }).attr("class", "tick"),
                D = z.select(".tickLine"),
                F = z.select("billboard");
            A = A.merge(A.enter().append("transform").attr("rotation", m.join(" ")).attr("translation", f.map(function(t) {
                return t * (b + v) / 2
            }).join(" ")).append("shape").call(i).attr("class", "domain")), z = z.merge(_), D = D.merge(_.append("transform"));
            var I = _.append("transform");
            I.attr("translation", h.map(function(t) {
                return -t * p
            })).append("billboard").attr("axisOfRotation", "0 0 0").append("shape").call(i).append("text").attr("string", y).append("fontstyle").attr("size", 1).attr("family", "SANS").attr("style", "BOLD").attr("justify", "MIDDLE "), F = F.merge(I), L.remove(), A.append("cylinder").attr("radius", .1).attr("height", v - b), D.attr("translation", h.map(function(t) {
                return t * u / 2
            }).join(" ")).attr("rotation", k.join(" ")).attr("class", "tickLine").append("shape").call(i).append("cylinder").attr("radius", .05).attr("height", u)
        }
        var o = [],
            c = null,
            s = null,
            u = 1,
            p = 1;
        return l.scale = function(t) {
            return arguments.length ? (e = t, l) : e
        }, l.ticks = function() {
            return o = a.call(arguments), l
        }, l.tickArguments = function(t) {
            return arguments.length ? (o = null == t ? [] : a.call(t), l) : o.slice()
        }, l.tickValues = function(t) {
            return arguments.length ? (c = null == t ? null : a.call(t), l) : c && c.slice()
        }, l.tickFormat = function(t) {
            return arguments.length ? (s = t, l) : s
        }, l.tickSize = function(t) {
            return arguments.length ? (u = +t, l) : u
        }, l.tickPadding = function(t) {
            return arguments.length ? (p = +t, l) : p
        }, l
    }
    var e = "0.0.1",
        a = Array.prototype.slice,
        r = function(t) {
            return t
        },
        i = function(t, n) {
            return t.append("appearance").append("material").attr("diffuseColor", n || "black"), t
        };
    t.version = e, t.x3domAxis = n
});