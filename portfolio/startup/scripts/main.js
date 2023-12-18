! function(t) {
    var updFunction;

    function e(e, n) {
        function o() {
            g.on("DOMMouseScroll mousewheel", function(e) {
                var i = t(this),
                    s = this.scrollTop,
                    a = this.scrollHeight,
                    n = i.height(),
                    o = "DOMMouseScroll" == e.type ? -40 * e.originalEvent.detail : e.originalEvent.wheelDelta,
                    r = o > 0;
                (r ? 0 === s : s === a - n) && e.preventDefault()
            })
        }

        function r(i, s) {
            e["scroll" + s.Dir](0);
            var a = n.prefix + "bar" + s.suffix,
                o = e.children("." + a);
            o.length || (o = t(n.barHtml).addClass(a).appendTo(e)), o.on("mousedown touchstart", function(t) {
                t.preventDefault();
                var e = g["scroll" + s.Dir](),
                    a = t[s.clientAxis] || t.originalEvent.changedTouches && t.originalEvent.changedTouches[0][s.clientAxis],
                    n = h(i, s).ratio;
                y.on("mousemove.custom-scroll touchmove.custom-scroll", function(t) {
                    t.preventDefault();
                    var i = t[s.clientAxis] || t.originalEvent.changedTouches && t.originalEvent.changedTouches[0][s.clientAxis];
                    g["scroll" + s.Dir](e + (i - a) / n)
                }), y.on("mouseup.custom-scroll touchend.custom-scroll", function() {
                    y.off(".custom-scroll")
                })
            }), N[i] = o
        }

        function h(t, i) {
            var s = 0 | g.prop("scroll" + i.Dim),
                a = e["inner" + i.Dim](),
                o = g["inner" + i.Dim](),
                r = a - n["offset" + i.Dir] - n["offset" + i.Dir2];
            f["x" == t ? "y" : "x"] || (r -= n["track" + i.Dim]);
            var h = Math.max(r * a / s | 0, n["barMin" + i.Dim]),
                l = (r - h) / (s - o);
            return {
                ratio: l,
                dim: a,
                scroll: r,
                total: s,
                bar: h
            }
        }

        function l() {
            t.each(p, d)
        }

        function d(t, i) {
            var s = h(t, i);
            if (s.total) {
                var a = g["scroll" + i.Dir]();
                if (m[t].scrollPos !== a || m[t].scroll !== s.scroll || m[t].total !== s.total) {
                    m[t] = s, m[t].scrollPos = a;
                    var o = s.bar >= s.scroll;
                    o !== f[t] && (e.toggleClass(n.prefix + "hidden" + i.suffix, o), f[t] = o);
                    var r = a * s.ratio;
                    0 > r && (r = 0), r > s.scroll - s.bar && (r = s.scroll - s.bar), N[t][i.dim](s.bar).css(i.dir, n["offset" + i.Dir] + r)
                }
            }
        }

        function c() {
            t.each(p, function(t) {
                N[t].remove()
            }), e.removeClass(n.prefix + "container").removeData("custom-scroll").css({
                padding: "",
                maxHeight: ""
            }), g.contents().appendTo(e), g.remove()
        }
        var u = e.data("custom-scroll");
        n = u ? u.options : t.extend({}, i, n);
        var p = {},
            m = {},
            f = {
                x: +n.vertical,
                y: +n.horizontal
            };
        if (n.horizontal && (p.x = a, m.x = {}), n.vertical && (p.y = s, m.y = {}), e.hasClass(n.prefix + "container") && u) return u.updateBars(), u;
        var g = e.children("." + n.prefix + "inner");
        g.length || (g = e.wrapInner('<div class="' + n.prefix + 'inner"></div>').children()), e.addClass(n.prefix + "container");
        var v = t('<div class="' + n.prefix + 'inner" />').width(100).height(100).appendTo("body").css({
                overflow: "scroll"
            })[0],
            b = v.offsetWidth - v.clientWidth,
            x = v.offsetHeight - v.clientHeight;
        v.parentElement.removeChild(v), n.vertical ? (g.css({
            paddingLeft: e.css("paddingLeft"),
            paddingRight: e.css("paddingRight"),
            marginRight: -b + "px"
        }), e.css({
            paddingLeft: 0,
            paddingRight: 0
        })) : g.css({
            overflowY: "hidden"
        }), n.horizontal ? (g.css({
            marginBottom: -x + "px",
            paddingBottom: x + "px"
        }), e.css({
            paddingTop: 0,
            paddingBottom: 0
        })) : g.css({
            overflowX: "hidden"
        });
        var C = e.css("maxHeight");
        parseInt(C) && (e.css("maxHeight", "none"), g.css("maxHeight", C)), e.scrollTop(0);
        var y = t("body"),
            N = {};
        t.each(p, r), g.on("scroll", l), l(), n.preventParentScroll && o();
        var w = {
            $container: e,
            $bar: N.y,
            $barX: N.x,
            $inner: g,
            destroy: c,
            updateBars: l,
            options: n
        };
        updFunction = function() {
            t.each(p, r), g.on("scroll", l), l(), n.preventParentScroll && o();
        }

        return e.data("custom-scroll", w), w
    }
    t.fn.customScroll = function(s) {
        this.length ? "destroy" === s ? (this.each(function() {
            var e = t(this).data("custom-scroll");
            e && e.destroy()
        }), this) : 1 === this.length ? e(this, s) : void this.each(function() {
            e(t(this), s)
        }) : t.extend(i, s);

        return {
            update: updFunction
        }
    };
    var i = {
            prefix: "custom-scroll_",
            barMinHeight: 10,
            barMinWidth: 10,
            offsetTop: 0,
            offsetBottom: 0,
            offsetLeft: 0,
            offsetRight: 0,
            trackWidth: 10,
            trackHeight: 10,
            barHtml: "<div />",
            vertical: !0,
            horizontal: !0,
            preventParentScroll: !0
        },
        s = {
            dim: "height",
            Dim: "Height",
            dir: "top",
            Dir: "Top",
            dir2: "bottom",
            Dir2: "Bottom",
            clientAxis: "clientY",
            suffix: "-y"
        },
        a = {
            dim: "width",
            Dim: "Width",
            dir: "left",
            Dir: "Left",
            dir2: "right",
            Dir2: "Right",
            clientAxis: "clientX",
            suffix: "-x"
        }
}
(jQuery), ! function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(this, function(t) {
    ! function(t) {
        "use strict";

        function e(e) {
            var i = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return t.each(i, function() {
                e = e.replace(this.re, this.ch)
            }), e
        }

        function i(t) {
            var e = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                i = "(?:" + Object.keys(e).join("|") + ")",
                s = new RegExp(i),
                a = new RegExp(i, "g"),
                n = null == t ? "" : "" + t;
            return s.test(n) ? n.replace(a, function(t) {
                return e[t]
            }) : n
        }

        function s(e, i) {
            var s = arguments,
                n = e,
                o = i;
            [].shift.apply(s);
            var r, h = this.each(function() {
                var e = t(this);
                if (e.is("select")) {
                    var i = e.data("selectpicker"),
                        h = "object" == typeof n && n;
                    if (i) {
                        if (h)
                            for (var l in h) h.hasOwnProperty(l) && (i.options[l] = h[l])
                    } else {
                        var d = t.extend({}, a.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), h);
                        d.template = t.extend({}, a.DEFAULTS.template, t.fn.selectpicker.defaults ? t.fn.selectpicker.defaults.template : {}, e.data().template, h.template), e.data("selectpicker", i = new a(this, d, o))
                    }
                    "string" == typeof n && (r = i[n] instanceof Function ? i[n].apply(i, s) : i.options[n])
                }
            });
            return "undefined" != typeof r ? r : h
        }
        String.prototype.includes || ! function() {
            var t = {}.toString,
                e = function() {
                    try {
                        var t = {},
                            e = Object.defineProperty,
                            i = e(t, t, t) && e
                    } catch (s) {}
                    return i
                }(),
                i = "".indexOf,
                s = function(e) {
                    if (null == this) throw new TypeError;
                    var s = String(this);
                    if (e && "[object RegExp]" == t.call(e)) throw new TypeError;
                    var a = s.length,
                        n = String(e),
                        o = n.length,
                        r = arguments.length > 1 ? arguments[1] : void 0,
                        h = r ? Number(r) : 0;
                    h != h && (h = 0);
                    var l = Math.min(Math.max(h, 0), a);
                    return o + l > a ? !1 : -1 != i.call(s, n, h)
                };
            e ? e(String.prototype, "includes", {
                value: s,
                configurable: !0,
                writable: !0
            }) : String.prototype.includes = s
        }(), String.prototype.startsWith || ! function() {
            var t = function() {
                    try {
                        var t = {},
                            e = Object.defineProperty,
                            i = e(t, t, t) && e
                    } catch (s) {}
                    return i
                }(),
                e = {}.toString,
                i = function(t) {
                    if (null == this) throw new TypeError;
                    var i = String(this);
                    if (t && "[object RegExp]" == e.call(t)) throw new TypeError;
                    var s = i.length,
                        a = String(t),
                        n = a.length,
                        o = arguments.length > 1 ? arguments[1] : void 0,
                        r = o ? Number(o) : 0;
                    r != r && (r = 0);
                    var h = Math.min(Math.max(r, 0), s);
                    if (n + h > s) return !1;
                    for (var l = -1; ++l < n;)
                        if (i.charCodeAt(h + l) != a.charCodeAt(l)) return !1;
                    return !0
                };
            t ? t(String.prototype, "startsWith", {
                value: i,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = i
        }(), Object.keys || (Object.keys = function(t, e, i) {
            i = [];
            for (e in t) i.hasOwnProperty.call(t, e) && i.push(e);
            return i
        }), t.fn.triggerNative = function(t) {
            var e, i = this[0];
            i.dispatchEvent ? ("function" == typeof Event ? e = new Event(t, {
                bubbles: !0
            }) : (e = document.createEvent("Event"), e.initEvent(t, !0, !1)), i.dispatchEvent(e)) : (i.fireEvent && (e = document.createEventObject(), e.eventType = t, i.fireEvent("on" + t, e)), this.trigger(t))
        }, t.expr[":"].icontains = function(e, i, s) {
            var a = t(e),
                n = (a.data("tokens") || a.text()).toUpperCase();
            return n.includes(s[3].toUpperCase())
        }, t.expr[":"].ibegins = function(e, i, s) {
            var a = t(e),
                n = (a.data("tokens") || a.text()).toUpperCase();
            return n.startsWith(s[3].toUpperCase())
        }, t.expr[":"].aicontains = function(e, i, s) {
            var a = t(e),
                n = (a.data("tokens") || a.data("normalizedText") || a.text()).toUpperCase();
            return n.includes(s[3].toUpperCase())
        }, t.expr[":"].aibegins = function(e, i, s) {
            var a = t(e),
                n = (a.data("tokens") || a.data("normalizedText") || a.text()).toUpperCase();
            return n.startsWith(s[3].toUpperCase())
        };
        var a = function(e, i, s) {
            s && (s.stopPropagation(), s.preventDefault()), this.$element = t(e), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = a.prototype.val, this.render = a.prototype.render, this.refresh = a.prototype.refresh, this.setStyle = a.prototype.setStyle, this.selectAll = a.prototype.selectAll, this.deselectAll = a.prototype.deselectAll, this.destroy = a.prototype.destroy, this.remove = a.prototype.remove, this.show = a.prototype.show, this.hide = a.prototype.hide, this.init()
        };
        a.VERSION = "1.7.7", a.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(t, e) {
                return 1 == t ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function(t, e) {
                return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1
        }, a.prototype = {
            constructor: a,
            init: function() {
                var e = this,
                    i = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function(t) {
                    t.preventDefault(), e.$button.focus()
                })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function(t) {
                        e.$element.trigger("hide.bs.select", t)
                    },
                    "hidden.bs.dropdown": function(t) {
                        e.$element.trigger("hidden.bs.select", t)
                    },
                    "show.bs.dropdown": function(t) {
                        e.$element.trigger("show.bs.select", t)
                    },
                    "shown.bs.dropdown": function(t) {
                        e.$element.trigger("shown.bs.select", t)
                    }
                }), setTimeout(function() {
                    e.$element.trigger("loaded.bs.select")
                })
            },
            createDropdown: function() {
                var e = this.multiple ? " show-tick" : "",
                    s = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    a = this.autofocus ? " autofocus" : "",
                    n = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    o = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                    r = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    h = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    l = '<div class="btn-group bootstrap-select' + e + s + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + a + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + n + o + r + '<ul class="dropdown-menu inner" role="menu"></ul>' + h + "</div></div>";
                return t(l)
            },
            createView: function() {
                var t = this.createDropdown(),
                    e = this.createLi();
                return t.find("ul")[0].innerHTML = e, t
            },
            reloadLi: function() {
                this.destroyLi();
                var t = this.createLi();
                this.$menuInner[0].innerHTML = t
            },
            destroyLi: function() {
                this.$menu.find("li").remove()
            },
            createLi: function() {
                var s = this,
                    a = [],
                    n = 0,
                    o = document.createElement("option"),
                    r = -1,
                    h = function(t, e, i, s) {
                        return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof s & null !== s ? 'data-optgroup="' + s + '"' : "") + ">" + t + "</li>"
                    },
                    l = function(t, a, n, o) {
                        return '<a tabindex="0"' + ("undefined" != typeof a ? ' class="' + a + '"' : "") + ("undefined" != typeof n ? ' style="' + n + '"' : "") + (s.options.liveSearchNormalize ? ' data-normalized-text="' + e(i(t)) + '"' : "") + ("undefined" != typeof o || null !== o ? ' data-tokens="' + o + '"' : "") + ">" + t + '<span class="' + s.options.iconBase + " " + s.options.tickIcon + ' check-mark"></span></a>'
                    };
                if (this.options.title && !this.multiple && (r--, !this.$element.find(".bs-title-option").length)) {
                    var d = this.$element[0];
                    o.className = "bs-title-option", o.appendChild(document.createTextNode(this.options.title)), o.value = "", d.insertBefore(o, d.firstChild), void 0 === t(d.options[d.selectedIndex]).attr("selected") && (o.selected = !0)
                }
                return this.$element.find("option").each(function(e) {
                    var i = t(this);
                    if (r++, !i.hasClass("bs-title-option")) {
                        var o = this.className || "",
                            d = this.style.cssText,
                            c = i.data("content") ? i.data("content") : i.html(),
                            u = i.data("tokens") ? i.data("tokens") : null,
                            p = "undefined" != typeof i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : "",
                            m = "undefined" != typeof i.data("icon") ? '<span class="' + s.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
                            f = this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled;
                        if ("" !== m && f && (m = "<span>" + m + "</span>"), s.options.hideDisabled && f) return void r--;
                        if (i.data("content") || (c = m + '<span class="text">' + c + p + "</span>"), "OPTGROUP" === this.parentNode.tagName && i.data("divider") !== !0) {
                            var g = " " + this.parentNode.className || "";
                            if (0 === i.index()) {
                                n += 1;
                                var v = this.parentNode.label,
                                    b = "undefined" != typeof i.parent().data("subtext") ? '<small class="text-muted">' + i.parent().data("subtext") + "</small>" : "",
                                    x = i.parent().data("icon") ? '<span class="' + s.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "";
                                v = x + '<span class="text">' + v + b + "</span>", 0 !== e && a.length > 0 && (r++, a.push(h("", null, "divider", n + "div"))), r++, a.push(h(v, null, "dropdown-header" + g, n))
                            }
                            a.push(h(l(c, "opt " + o + g, d, u), e, "", n))
                        } else i.data("divider") === !0 ? a.push(h("", e, "divider")) : i.data("hidden") === !0 ? a.push(h(l(c, o, d, u), e, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (r++, a.push(h("", null, "divider", n + "div"))), a.push(h(l(c, o, d, u), e)));
                        s.liObj[e] = r
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), a.join("")
            },
            findLis: function() {
                return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
            },
            render: function(e) {
                var i, s = this;
                e !== !1 && this.$element.find("option").each(function(t) {
                    var e = s.findLis().eq(s.liObj[t]);
                    s.setDisabled(t, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, e), s.setSelected(t, this.selected, e)
                }), this.tabIndex();
                var a = this.$element.find("option").map(function() {
                        if (this.selected) {
                            if (s.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                            var e, i = t(this),
                                a = i.data("icon") && s.options.showIcon ? '<i class="' + s.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                            return e = s.options.showSubtext && i.data("subtext") && !s.multiple ? ' <small class="text-muted">' + i.data("subtext") + "</small>" : "", "undefined" != typeof i.attr("title") ? i.attr("title") : i.data("content") && s.options.showContent ? i.data("content") : a + i.html() + e
                        }
                    }).toArray(),
                    n = this.multiple ? a.join(this.options.multipleSeparator) : a[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var o = this.options.selectedTextFormat.split(">");
                    if (o.length > 1 && a.length > o[1] || 1 == o.length && a.length >= 2) {
                        i = this.options.hideDisabled ? ", [disabled]" : "";
                        var r = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + i).length,
                            h = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(a.length, r) : this.options.countSelectedText;
                        n = h.replace("{0}", a.length.toString()).replace("{1}", r.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (n = this.options.title), n || (n = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", t.trim(n.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(n), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function(t, e) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var i = t ? t : this.options.style;
                "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
            },
            liHeight: function(e) {
                if (e || this.options.size !== !1 && !this.sizeInfo) {
                    var i = document.createElement("div"),
                        s = document.createElement("div"),
                        a = document.createElement("ul"),
                        n = document.createElement("li"),
                        o = document.createElement("li"),
                        r = document.createElement("a"),
                        h = document.createElement("span"),
                        l = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        d = this.options.liveSearch ? document.createElement("div") : null,
                        c = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        u = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (h.className = "text", i.className = this.$menu[0].parentNode.className + " open", s.className = "dropdown-menu open", a.className = "dropdown-menu inner", n.className = "divider", h.appendChild(document.createTextNode("Inner text")), r.appendChild(h), o.appendChild(r), a.appendChild(o), a.appendChild(n), l && s.appendChild(l), d) {
                        var p = document.createElement("span");
                        d.className = "bs-searchbox", p.className = "form-control", d.appendChild(p), s.appendChild(d)
                    }
                    c && s.appendChild(c), s.appendChild(a), u && s.appendChild(u), i.appendChild(s), document.body.appendChild(i);
                    var m = r.offsetHeight,
                        f = l ? l.offsetHeight : 0,
                        g = d ? d.offsetHeight : 0,
                        v = c ? c.offsetHeight : 0,
                        b = u ? u.offsetHeight : 0,
                        x = t(n).outerHeight(!0),
                        C = "function" == typeof getComputedStyle ? getComputedStyle(s) : !1,
                        y = C ? null : t(s),
                        N = parseInt(C ? C.paddingTop : y.css("paddingTop")) + parseInt(C ? C.paddingBottom : y.css("paddingBottom")) + parseInt(C ? C.borderTopWidth : y.css("borderTopWidth")) + parseInt(C ? C.borderBottomWidth : y.css("borderBottomWidth")),
                        w = N + parseInt(C ? C.marginTop : y.css("marginTop")) + parseInt(C ? C.marginBottom : y.css("marginBottom")) + 2;
                    document.body.removeChild(i), this.sizeInfo = {
                        liHeight: m,
                        headerHeight: f,
                        searchHeight: g,
                        actionsHeight: v,
                        doneButtonHeight: b,
                        dividerHeight: x,
                        menuPadding: N,
                        menuExtras: w
                    }
                }
            },
            setSize: function() {
                if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
                    var e, i, s, a, n = this,
                        o = this.$menu,
                        r = this.$menuInner,
                        h = t(window),
                        l = this.$newElement[0].offsetHeight,
                        d = this.sizeInfo.liHeight,
                        c = this.sizeInfo.headerHeight,
                        u = this.sizeInfo.searchHeight,
                        p = this.sizeInfo.actionsHeight,
                        m = this.sizeInfo.doneButtonHeight,
                        f = this.sizeInfo.dividerHeight,
                        g = this.sizeInfo.menuPadding,
                        v = this.sizeInfo.menuExtras,
                        b = this.options.hideDisabled ? ".disabled" : "",
                        x = function() {
                            s = n.$newElement.offset().top - h.scrollTop(), a = h.height() - s - l
                        };
                    if (x(), "auto" === this.options.size) {
                        var C = function() {
                            var h, l = function(e, i) {
                                    return function(s) {
                                        return i ? s.classList ? s.classList.contains(e) : t(s).hasClass(e) : !(s.classList ? s.classList.contains(e) : t(s).hasClass(e))
                                    }
                                },
                                f = n.$menuInner[0].getElementsByTagName("li"),
                                b = Array.prototype.filter ? Array.prototype.filter.call(f, l("hidden", !1)) : n.$lis.not(".hidden"),
                                C = Array.prototype.filter ? Array.prototype.filter.call(b, l("dropdown-header", !0)) : b.filter(".dropdown-header");
                            x(), e = a - v, n.options.container ? (o.data("height") || o.data("height", o.height()), i = o.data("height")) : i = o.height(), n.options.dropupAuto && n.$newElement.toggleClass("dropup", s > a && i > e - v), n.$newElement.hasClass("dropup") && (e = s - v), h = b.length + C.length > 3 ? 3 * d + v - 2 : 0, o.css({
                                "max-height": e + "px",
                                overflow: "hidden",
                                "min-height": h + c + u + p + m + "px"
                            }), r.css({
                                "max-height": e - c - u - p - m - g + "px",
                                "overflow-y": "auto",
                                "min-height": Math.max(h - g, 0) + "px"
                            })
                        };
                        C(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", C), h.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", C)
                    } else if (this.options.size && "auto" != this.options.size && this.$lis.not(b).length > this.options.size) {
                        var y = this.$lis.not(".divider").not(b).children().slice(0, this.options.size).last().parent().index(),
                            N = this.$lis.slice(0, y + 1).filter(".divider").length;
                        e = d * this.options.size + N * f + g, n.options.container ? (o.data("height") || o.data("height", o.height()), i = o.data("height")) : i = o.height(), n.options.dropupAuto && this.$newElement.toggleClass("dropup", s > a && i > e - v), o.css({
                            "max-height": e + c + u + p + m + "px",
                            overflow: "hidden",
                            "min-height": ""
                        }), r.css({
                            "max-height": e - g + "px",
                            "overflow-y": "auto",
                            "min-height": ""
                        })
                    }
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var t = this.$menu.parent().clone().appendTo("body"),
                        e = this.options.container ? this.$newElement.clone().appendTo("body") : t,
                        i = t.children(".dropdown-menu").outerWidth(),
                        s = e.css("width", "auto").children("button").outerWidth();
                    t.remove(), e.remove(), this.$newElement.css("width", Math.max(i, s) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function() {
                this.$bsContainer = t('<div class="bs-container" />');
                var e, i, s = this,
                    a = function(t) {
                        s.$bsContainer.addClass(t.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, s.$bsContainer.css({
                            top: e.top + i,
                            left: e.left,
                            width: t[0].offsetWidth
                        })
                    };
                this.$newElement.on("click", function() {
                    var e = t(this);
                    s.isDisabled() || (a(e), s.$bsContainer.appendTo(s.options.container).toggleClass("open", !e.hasClass("open")).append(s.$menu))
                }), t(window).on("resize scroll", function() {
                    a(s.$newElement)
                }), this.$element.on("hide.bs.select", function() {
                    s.$menu.data("height", s.$menu.height()), s.$bsContainer.detach()
                })
            },
            setSelected: function(t, e, i) {
                i || (i = this.findLis().eq(this.liObj[t])), i.toggleClass("selected", e)
            },
            setDisabled: function(t, e, i) {
                i || (i = this.findLis().eq(this.liObj[t])), e ? i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
            },
            isDisabled: function() {
                return this.$element[0].disabled
            },
            checkDisabled: function() {
                var t = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                    return !t.isDisabled()
                })
            },
            tabIndex: function() {
                this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
            },
            clickListener: function() {
                var e = this,
                    i = t(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(t) {
                    t.stopPropagation()
                }), i.data("spaceSelect", !1), this.$button.on("keyup", function(t) {
                    /(32)/.test(t.keyCode.toString(10)) && i.data("spaceSelect") && (t.preventDefault(), i.data("spaceSelect", !1))
                }), this.$newElement.on("click", function() {
                    e.setSize(), e.$element.on("shown.bs.select", function() {
                        if (e.options.liveSearch || e.multiple) {
                            if (!e.multiple) {
                                var t = e.liObj[e.$element[0].selectedIndex];
                                if ("number" != typeof t || e.options.size === !1) return;
                                var i = e.$lis.eq(t)[0].offsetTop - e.$menuInner[0].offsetTop;
                                i = i - e.$menuInner[0].offsetHeight / 2 + e.sizeInfo.liHeight / 2, e.$menuInner[0].scrollTop = i
                            }
                        } else e.$menuInner.find(".selected a").focus()
                    })
                }), this.$menuInner.on("click", "li a", function(i) {
                    var s = t(this),
                        a = s.parent().data("originalIndex"),
                        n = e.$element.val(),
                        o = e.$element.prop("selectedIndex");
                    if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !s.parent().hasClass("disabled")) {
                        var r = e.$element.find("option"),
                            h = r.eq(a),
                            l = h.prop("selected"),
                            d = h.parent("optgroup"),
                            c = e.options.maxOptions,
                            u = d.data("maxOptions") || !1;
                        if (e.multiple) {
                            if (h.prop("selected", !l), e.setSelected(a, !l), s.blur(), c !== !1 || u !== !1) {
                                var p = c < r.filter(":selected").length,
                                    m = u < d.find("option:selected").length;
                                if (c && p || u && m)
                                    if (c && 1 == c) r.prop("selected", !1), h.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(a, !0);
                                    else if (u && 1 == u) {
                                    d.find("option:selected").prop("selected", !1), h.prop("selected", !0);
                                    var f = s.parent().data("optgroup");
                                    e.$menuInner.find('[data-optgroup="' + f + '"]').removeClass("selected"), e.setSelected(a, !0)
                                } else {
                                    var g = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(c, u) : e.options.maxOptionsText,
                                        v = g[0].replace("{n}", c),
                                        b = g[1].replace("{n}", u),
                                        x = t('<div class="notify"></div>');
                                    g[2] && (v = v.replace("{var}", g[2][c > 1 ? 0 : 1]), b = b.replace("{var}", g[2][u > 1 ? 0 : 1])), h.prop("selected", !1), e.$menu.append(x), c && p && (x.append(t("<div>" + v + "</div>")), e.$element.trigger("maxReached.bs.select")), u && m && (x.append(t("<div>" + b + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                        e.setSelected(a, !1)
                                    }, 10), x.delay(750).fadeOut(300, function() {
                                        t(this).remove()
                                    })
                                }
                            }
                        } else r.prop("selected", !1), h.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(a, !0);
                        e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (n != e.$element.val() && e.multiple || o != e.$element.prop("selectedIndex") && !e.multiple) && (e.$element.triggerNative("change"), e.$element.trigger("changed.bs.select", [a, h.prop("selected"), l]))
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(i) {
                    i.currentTarget == this && (i.preventDefault(), i.stopPropagation(), e.options.liveSearch && !t(i.target).hasClass("close") ? e.$searchbox.focus() : e.$button.focus())
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function(t) {
                    t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
                }), this.$menu.on("click", ".popover-title .close", function() {
                    e.$button.click()
                }), this.$searchbox.on("click", function(t) {
                    t.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function(i) {
                    e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.triggerNative("change")
                }), this.$element.change(function() {
                    e.render(!1)
                })
            },
            liveSearchListener: function() {
                var s = this,
                    a = t('<li class="no-results"></li>');
                this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                    s.$menuInner.find(".active").removeClass("active"), s.$searchbox.val() && (s.$searchbox.val(""), s.$lis.not(".is-hidden").removeClass("hidden"), a.parent().length && a.remove()), s.multiple || s.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
                        s.$searchbox.focus()
                    }, 10)
                }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
                    t.stopPropagation()
                }), this.$searchbox.on("input propertychange", function() {
                    if (s.$searchbox.val()) {
                        var n = s.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        n = s.options.liveSearchNormalize ? n.not(":a" + s._searchStyle() + '("' + e(s.$searchbox.val()) + '")') : n.not(":" + s._searchStyle() + '("' + s.$searchbox.val() + '")'), n.parent().addClass("hidden"), s.$lis.filter(".dropdown-header").each(function() {
                            var e = t(this),
                                i = e.data("optgroup");
                            0 === s.$lis.filter("[data-optgroup=" + i + "]").not(e).not(".hidden").length && (e.addClass("hidden"), s.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                        });
                        var o = s.$lis.not(".hidden");
                        o.each(function(e) {
                            var i = t(this);
                            i.hasClass("divider") && (i.index() === o.first().index() || i.index() === o.last().index() || o.eq(e + 1).hasClass("divider")) && i.addClass("hidden")
                        }), s.$lis.not(".hidden, .no-results").length ? a.parent().length && a.remove() : (a.parent().length && a.remove(), a.html(s.options.noneResultsText.replace("{0}", '"' + i(s.$searchbox.val()) + '"')).show(), s.$menuInner.append(a))
                    } else s.$lis.not(".is-hidden").removeClass("hidden"), a.parent().length && a.remove();
                    s.$lis.filter(".active").removeClass("active"), s.$searchbox.val() && s.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), t(this).focus()
                })
            },
            _searchStyle: function() {
                var t = {
                    begins: "ibegins",
                    startsWith: "ibegins"
                };
                return t[this.options.liveSearchStyle] || "icontains"
            },
            val: function(t) {
                return "undefined" != typeof t ? (this.$element.val(t), this.render(), this.$element) : this.$element.val()
            },
            changeAll: function(e) {
                "undefined" == typeof e && (e = !0), this.findLis();
                for (var i = this.$element.find("option"), s = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", e), a = s.length, n = [], o = 0; a > o; o++) {
                    var r = s[o].getAttribute("data-original-index");
                    n[n.length] = i.eq(r)[0]
                }
                t(n).prop("selected", e), this.render(!1)
            },
            selectAll: function() {
                return this.changeAll(!0)
            },
            deselectAll: function() {
                return this.changeAll(!1)
            },
            keydown: function(i) {
                var s, a, n, o, r, h, l, d, c, u = t(this),
                    p = u.is("input") ? u.parent().parent() : u.parent(),
                    m = p.data("this"),
                    f = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    g = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (m.options.liveSearch && (p = u.parent().parent()), m.options.container && (p = m.$menu), s = t("[role=menu] li", p), c = m.$menu.parent().hasClass("open"), !c && (i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105 || i.keyCode >= 65 && i.keyCode <= 90) && (m.options.container ? m.$newElement.trigger("click") : (m.setSize(), m.$menu.parent().addClass("open"), c = !0), m.$searchbox.focus()), m.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && c && 0 === m.$menu.find(".active").length && (i.preventDefault(), m.$menu.parent().removeClass("open"), m.options.container && m.$newElement.removeClass("open"), m.$button.focus()), s = t("[role=menu] li" + f, p), u.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === s.filter(".active").length && (s = m.$menuInner.find("li"), s = m.options.liveSearchNormalize ? s.filter(":a" + m._searchStyle() + "(" + e(g[i.keyCode]) + ")") : s.filter(":" + m._searchStyle() + "(" + g[i.keyCode] + ")"))), s.length) {
                    if (/(38|40)/.test(i.keyCode.toString(10))) a = s.index(s.find("a").filter(":focus").parent()), o = s.filter(f).first().index(), r = s.filter(f).last().index(), n = s.eq(a).nextAll(f).eq(0).index(), h = s.eq(a).prevAll(f).eq(0).index(), l = s.eq(n).prevAll(f).eq(0).index(), m.options.liveSearch && (s.each(function(e) {
                        t(this).hasClass("disabled") || t(this).data("index", e)
                    }), a = s.index(s.filter(".active")), o = s.first().data("index"), r = s.last().data("index"), n = s.eq(a).nextAll().eq(0).data("index"), h = s.eq(a).prevAll().eq(0).data("index"), l = s.eq(n).prevAll().eq(0).data("index")), d = u.data("prevIndex"), 38 == i.keyCode ? (m.options.liveSearch && a--, a != l && a > h && (a = h), o > a && (a = o), a == d && (a = r)) : 40 == i.keyCode && (m.options.liveSearch && a++, -1 == a && (a = 0), a != l && n > a && (a = n), a > r && (a = r), a == d && (a = o)), u.data("prevIndex", a), m.options.liveSearch ? (i.preventDefault(), u.hasClass("dropdown-toggle") || (s.removeClass("active").eq(a).addClass("active").children("a").focus(), u.focus())) : s.eq(a).children("a").focus();
                    else if (!u.is("input")) {
                        var v, b, x = [];
                        s.each(function() {
                            t(this).hasClass("disabled") || t.trim(t(this).children("a").text().toLowerCase()).substring(0, 1) == g[i.keyCode] && x.push(t(this).index());
                        }), v = t(document).data("keycount"), v++, t(document).data("keycount", v), b = t.trim(t(":focus").text().toLowerCase()).substring(0, 1), b != g[i.keyCode] ? (v = 1, t(document).data("keycount", v)) : v >= x.length && (t(document).data("keycount", 0), v > x.length && (v = 1)), s.eq(x[v - 1]).children("a").focus()
                    }
                    if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && m.options.selectOnTab) && c) {
                        if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(), m.options.liveSearch) /(32)/.test(i.keyCode.toString(10)) || (m.$menuInner.find(".active a").click(), u.focus());
                        else {
                            var C = t(":focus");
                            C.click(), C.focus(), i.preventDefault(), t(document).data("spaceSelect", !0)
                        }
                        t(document).data("keycount", 0)
                    }(/(^9$|27)/.test(i.keyCode.toString(10)) && c && (m.multiple || m.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !c) && (m.$menu.parent().removeClass("open"), m.options.container && m.$newElement.removeClass("open"), m.$button.focus())
                }
            },
            mobile: function() {
                this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
            },
            refresh: function() {
                this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
            },
            hide: function() {
                this.$newElement.hide()
            },
            show: function() {
                this.$newElement.show()
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function() {
                this.$newElement.remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
            }
        };
        var n = t.fn.selectpicker;
        t.fn.selectpicker = s, t.fn.selectpicker.Constructor = a, t.fn.selectpicker.noConflict = function() {
            return t.fn.selectpicker = n, this
        }, t(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', a.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(t) {
            t.stopPropagation()
        }), t(window).on("load.bs.select.data-api", function() {
            t(".selectpicker").each(function() {
                var e = t(this);
                s.call(e, e.data())
            })
        })
    }(t)
}),
function() {
    var t;
    window.AmCharts ? t = window.AmCharts : (t = {}, window.AmCharts = t, t.themes = {}, t.maps = {}, t.inheriting = {}, t.charts = [], t.onReadyArray = [], t.useUTC = !1, t.updateRate = 30, t.uid = 0, t.lang = {}, t.translations = {}, t.mapTranslations = {}, t.windows = {}, t.initHandlers = []), t.Class = function(e) {
        var i = function() {
            arguments[0] !== t.inheriting && (this.events = {}, this.construct.apply(this, arguments))
        };
        e.inherits ? (i.prototype = new e.inherits(t.inheriting), i.base = e.inherits.prototype, delete e.inherits) : (i.prototype.createEvents = function() {
            for (var t = 0, e = arguments.length; e > t; t++) this.events[arguments[t]] = []
        }, i.prototype.listenTo = function(t, e, i) {
            this.removeListener(t, e, i), t.events[e].push({
                handler: i,
                scope: this
            })
        }, i.prototype.addListener = function(t, e, i) {
            this.removeListener(this, t, e), this.events[t].push({
                handler: e,
                scope: i
            })
        }, i.prototype.removeListener = function(t, e, i) {
            if (t && t.events)
                for (t = t.events[e], e = t.length - 1; e >= 0; e--) t[e].handler === i && t.splice(e, 1)
        }, i.prototype.fire = function(t, e) {
            for (var i = this.events[t], s = 0, a = i.length; a > s; s++) {
                var n = i[s];
                n.handler.call(n.scope, e)
            }
        });
        for (var s in e) i.prototype[s] = e[s];
        return i
    }, t.addChart = function(e) {
        t.updateInt || (t.updateInt = setInterval(function() {
            t.update()
        }, Math.round(1e3 / t.updateRate))), t.charts.push(e)
    }, t.removeChart = function(e) {
        for (var i = t.charts, s = i.length - 1; s >= 0; s--) i[s] == e && i.splice(s, 1);
        0 === i.length && t.updateInt && (clearInterval(t.updateInt), t.updateInt = NaN)
    }, t.isModern = !0, t.getIEVersion = function() {
        var t, e, i = 0;
        return "Microsoft Internet Explorer" == navigator.appName && (t = navigator.userAgent, e = /MSIE ([0-9]{1,}[.0-9]{0,})/, null !== e.exec(t) && (i = parseFloat(RegExp.$1))), i
    }, t.applyLang = function(e, i) {
        var s = t.translations;
        i.dayNames = t.extend({}, t.dayNames), i.shortDayNames = t.extend({}, t.shortDayNames), i.monthNames = t.extend({}, t.monthNames), i.shortMonthNames = t.extend({}, t.shortMonthNames), i.amString = "am", i.pmString = "pm", s && (s = s[e]) && (t.lang = s, s.monthNames && (i.dayNames = t.extend({}, s.dayNames), i.shortDayNames = t.extend({}, s.shortDayNames), i.monthNames = t.extend({}, s.monthNames), i.shortMonthNames = t.extend({}, s.shortMonthNames)), s.am && (i.amString = s.am), s.pm && (i.pmString = s.pm))
    }, t.IEversion = t.getIEVersion(), 9 > t.IEversion && 0 < t.IEversion && (t.isModern = !1, t.isIE = !0), t.dx = 0, t.dy = 0, (document.addEventListener || window.opera) && (t.isNN = !0, t.isIE = !1, t.dx = .5, t.dy = .5), document.attachEvent && (t.isNN = !1, t.isIE = !0, t.isModern || (t.dx = 0, t.dy = 0)), window.chrome && (t.chrome = !0), t.handleMouseUp = function(e) {
        for (var i = t.charts, s = 0; s < i.length; s++) {
            var a = i[s];
            a && a.handleReleaseOutside && a.handleReleaseOutside(e)
        }
    }, t.handleMouseMove = function(e) {
        for (var i = t.charts, s = 0; s < i.length; s++) {
            var a = i[s];
            a && a.handleMouseMove && a.handleMouseMove(e)
        }
    }, t.handleWheel = function(e) {
        for (var i = t.charts, s = 0; s < i.length; s++) {
            var a = i[s];
            if (a && a.mouseIsOver) {
                a.mouseWheelScrollEnabled || a.mouseWheelZoomEnabled ? a.handleWheel && a.handleWheel(e) : e.stopPropagation && e.stopPropagation();
                break
            }
        }
    }, t.resetMouseOver = function() {
        for (var e = t.charts, i = 0; i < e.length; i++) {
            var s = e[i];
            s && (s.mouseIsOver = !1)
        }
    }, t.ready = function(e) {
        t.onReadyArray.push(e)
    }, t.handleLoad = function() {
        t.isReady = !0;
        for (var e = t.onReadyArray, i = 0; i < e.length; i++) {
            var s = e[i];
            isNaN(t.processDelay) ? s() : setTimeout(s, t.processDelay * i)
        }
    }, t.addInitHandler = function(e, i) {
        t.initHandlers.push({
            method: e,
            types: i
        })
    }, t.callInitHandler = function(e) {
        var i = t.initHandlers;
        if (t.initHandlers)
            for (var s = 0; s < i.length; s++) {
                var a = i[s];
                a.types ? t.isInArray(a.types, e.type) && a.method(e) : a.method(e)
            }
    }, t.getUniqueId = function() {
        return t.uid++, "AmChartsEl-" + t.uid
    }, t.isNN && (document.addEventListener("mousemove", t.handleMouseMove, !0), document.addEventListener("mouseup", t.handleMouseUp, !0), window.addEventListener("load", t.handleLoad, !0), window.addEventListener("DOMMouseScroll", t.handleWheel, !0), document.addEventListener("mousewheel", t.handleWheel, !0)), t.isIE && (document.attachEvent("onmousemove", t.handleMouseMove), document.attachEvent("onmouseup", t.handleMouseUp), window.attachEvent("onload", t.handleLoad)), t.clear = function() {
        var e = t.charts;
        if (e)
            for (var i = e.length - 1; i >= 0; i--) e[i].clear();
        t.updateInt && clearInterval(t.updateInt), t.charts = [], t.isNN && (document.removeEventListener("mousemove", t.handleMouseMove, !0), document.removeEventListener("mouseup", t.handleMouseUp, !0), window.removeEventListener("load", t.handleLoad, !0), window.removeEventListener("DOMMouseScroll", t.handleWheel, !0), document.removeEventListener("mousewheel", t.handleWheel, !0)), t.isIE && (document.detachEvent("onmousemove", t.handleMouseMove), document.detachEvent("onmouseup", t.handleMouseUp), window.detachEvent("onload", t.handleLoad))
    }, t.makeChart = function(e, i, s) {
        var a = i.type,
            n = i.theme;
        t.isString(n) && (n = t.themes[n], i.theme = n);
        var o;
        switch (a) {
            case "serial":
                o = new t.AmSerialChart(n);
                break;
            case "xy":
                o = new t.AmXYChart(n);
                break;
            case "pie":
                o = new t.AmPieChart(n);
                break;
            case "radar":
                o = new t.AmRadarChart(n);
                break;
            case "gauge":
                o = new t.AmAngularGauge(n);
                break;
            case "funnel":
                o = new t.AmFunnelChart(n);
                break;
            case "map":
                o = new t.AmMap(n);
                break;
            case "stock":
                o = new t.AmStockChart(n);
                break;
            case "gantt":
                o = new t.AmGanttChart(n)
        }
        return t.extend(o, i), t.isReady ? isNaN(s) ? o.write(e) : setTimeout(function() {
            t.realWrite(o, e)
        }, s) : t.ready(function() {
            isNaN(s) ? o.write(e) : setTimeout(function() {
                t.realWrite(o, e)
            }, s)
        }), o
    }, t.realWrite = function(t, e) {
        t.write(e)
    }, t.updateCount = 0, t.validateAt = Math.round(t.updateRate / 5), t.update = function() {
        var e = t.charts;
        t.updateCount++;
        var i = !1;
        if (t.updateCount == t.validateAt && (i = !0, t.updateCount = 0), e)
            for (var s = 0; s < e.length; s++) e[s].update && e[s].update(), i && e[s].autoResize && e[s].validateSize && e[s].validateSize()
    }, t.bezierX = 3, t.bezierY = 6
}(),
function() {
    var t = window.AmCharts;
    t.toBoolean = function(t, e) {
        if (void 0 === t) return e;
        switch (String(t).toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return !0;
            case "false":
            case "no":
            case "0":
            case null:
                return !1;
            default:
                return Boolean(t)
        }
    }, t.removeFromArray = function(t, e) {
        var i;
        if (void 0 !== e && void 0 !== t)
            for (i = t.length - 1; i >= 0; i--) t[i] == e && t.splice(i, 1)
    }, t.getPath = function() {
        var t = document.getElementsByTagName("script");
        if (t)
            for (var e = 0; e < t.length; e++) {
                var i = t[e].src;
                if (-1 !== i.search(/\/(amcharts|ammap)\.js/)) return i.replace(/\/(amcharts|ammap)\.js.*/, "/")
            }
    }, t.normalizeUrl = function(t) {
        return "" !== t && -1 === t.search(/\/$/) ? t + "/" : t
    }, t.isAbsolute = function(t) {
        return 0 === t.search(/^http[s]?:|^\//)
    }, t.isInArray = function(t, e) {
        for (var i = 0; i < t.length; i++)
            if (t[i] == e) return !0;
        return !1
    }, t.getDecimals = function(t) {
        var e = 0;
        return isNaN(t) || (t = String(t), -1 != t.indexOf("e-") ? e = Number(t.split("-")[1]) : -1 != t.indexOf(".") && (e = t.split(".")[1].length)), e
    }, t.wordwrap = function(e, i, s, a) {
        var n, o, r, h;
        if (e += "", 1 > i) return e;
        for (n = -1, e = (h = e.split(/\r\n|\n|\r/)).length; ++n < e; h[n] += r) {
            for (r = h[n], h[n] = ""; r.length > i; h[n] += t.trim(r.slice(0, o)) + ((r = r.slice(o)).length ? s : "")) o = 2 == a || (o = r.slice(0, i + 1).match(/\S*(\s)?$/))[1] ? i : o.input.length - o[0].length || 1 == a && i || o.input.length + (o = r.slice(i).match(/^\S*/))[0].length;
            r = t.trim(r)
        }
        return h.join(s)
    }, t.trim = function(t) {
        return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }, t.wrappedText = function(e, i, s, a, n, o, r, h) {
        var l = t.text(e, i, s, a, n, o, r);
        if (l) {
            var d = l.getBBox();
            if (d.width > h) {
                var c = "\n";
                t.isModern || (c = "<br>"), h = Math.floor(h / (d.width / i.length)), h > 2 && (h -= 2), i = t.wordwrap(i, h, c, !0), l.remove(), l = t.text(e, i, s, a, n, o, r)
            }
        }
        return l
    }, t.getStyle = function(t, e) {
        var i = "";
        return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (e = e.replace(/\-(\w)/g, function(t, e) {
            return e.toUpperCase()
        }), i = t.currentStyle[e]), i
    }, t.removePx = function(t) {
        return void 0 !== t ? Number(t.substring(0, t.length - 2)) : void 0
    }, t.getURL = function(e, i) {
        if (e)
            if ("_self" != i && i)
                if ("_top" == i && window.top) window.top.location.href = e;
                else if ("_parent" == i && window.parent) window.parent.location.href = e;
        else if ("_blank" == i) window.open(e);
        else {
            var s = document.getElementsByName(i)[0];
            s ? s.src = e : (s = t.windows[i]) && s.opener && !s.opener.closed ? s.location.href = e : t.windows[i] = window.open(e)
        } else window.location.href = e
    }, t.ifArray = function(t) {
        return t && "object" == typeof t && 0 < t.length ? !0 : !1
    }, t.callMethod = function(t, e) {
        var i;
        for (i = 0; i < e.length; i++) {
            var s = e[i];
            if (s) {
                s[t] && s[t]();
                var a = s.length;
                if (a > 0) {
                    var n;
                    for (n = 0; a > n; n++) {
                        var o = s[n];
                        o && o[t] && o[t]()
                    }
                }
            }
        }
    }, t.toNumber = function(t) {
        return "number" == typeof t ? t : Number(String(t).replace(/[^0-9\-.]+/g, ""))
    }, t.toColor = function(t) {
        if ("" !== t && void 0 !== t)
            if (-1 != t.indexOf(",")) {
                t = t.split(",");
                var e;
                for (e = 0; e < t.length; e++) {
                    var i = t[e].substring(t[e].length - 6, t[e].length);
                    t[e] = "#" + i
                }
            } else t = t.substring(t.length - 6, t.length), t = "#" + t;
        return t
    }, t.toCoordinate = function(t, e, i) {
        var s;
        return void 0 !== t && (t = String(t), i && e > i && (e = i), s = Number(t), -1 != t.indexOf("!") && (s = e - Number(t.substr(1))), -1 != t.indexOf("%") && (s = e * Number(t.substr(0, t.length - 1)) / 100)), s
    }, t.fitToBounds = function(t, e, i) {
        return e > t && (t = e), t > i && (t = i), t
    }, t.isDefined = function(t) {
        return void 0 === t ? !1 : !0
    }, t.stripNumbers = function(t) {
        return t.replace(/[0-9]+/g, "")
    }, t.roundTo = function(t, e) {
        if (0 > e) return t;
        var i = Math.pow(10, e);
        return Math.round(t * i) / i
    }, t.toFixed = function(t, e) {
        var i = String(Math.round(t * Math.pow(10, e)));
        if (e > 0) {
            var s = i.length;
            if (e > s) {
                var a;
                for (a = 0; e - s > a; a++) i = "0" + i
            }
            return s = i.substring(0, i.length - e), "" === s && (s = 0), s + "." + i.substring(i.length - e, i.length)
        }
        return String(i)
    }, t.formatDuration = function(e, i, s, a, n, o) {
        var r = t.intervals,
            h = o.decimalSeparator;
        if (e >= r[i].contains) {
            var l = e - Math.floor(e / r[i].contains) * r[i].contains;
            return "ss" == i ? (l = t.formatNumber(l, o), 1 == l.split(h)[0].length && (l = "0" + l)) : l = t.roundTo(l, o.precision), ("mm" == i || "hh" == i) && 10 > l && (l = "0" + l), s = l + "" + a[i] + s, e = Math.floor(e / r[i].contains), i = r[i].nextInterval, t.formatDuration(e, i, s, a, n, o)
        }
        if ("ss" == i && (e = t.formatNumber(e, o), 1 == e.split(h)[0].length && (e = "0" + e)), ("mm" == i || "hh" == i) && 10 > e && (e = "0" + e), s = e + "" + a[i] + s, r[n].count > r[i].count)
            for (e = r[i].count; e < r[n].count; e++) i = r[i].nextInterval, "ss" == i || "mm" == i || "hh" == i ? s = "00" + a[i] + s : "DD" == i && (s = "0" + a[i] + s);
        return ":" == s.charAt(s.length - 1) && (s = s.substring(0, s.length - 1)), s
    }, t.formatNumber = function(e, i, s, a, n) {
        e = t.roundTo(e, i.precision), isNaN(s) && (s = i.precision);
        var o = i.decimalSeparator;
        i = i.thousandsSeparator;
        var r;
        r = 0 > e ? "-" : "", e = Math.abs(e);
        var h = String(e),
            l = !1; - 1 != h.indexOf("e") && (l = !0), s >= 0 && !l && (h = t.toFixed(e, s));
        var d = "";
        if (l) d = h;
        else {
            var c, h = h.split("."),
                l = String(h[0]);
            for (c = l.length; c >= 0; c -= 3) d = c != l.length ? 0 !== c ? l.substring(c - 3, c) + i + d : l.substring(c - 3, c) + d : l.substring(c - 3, c);
            void 0 !== h[1] && (d = d + o + h[1]), void 0 !== s && s > 0 && "0" != d && (d = t.addZeroes(d, o, s))
        }
        return d = r + d, "" === r && !0 === a && 0 !== e && (d = "+" + d), !0 === n && (d += "%"), d
    }, t.addZeroes = function(e, i, s) {
        return e = e.split(i), void 0 === e[1] && s > 0 && (e[1] = "0"), e[1].length < s ? (e[1] += "0", t.addZeroes(e[0] + i + e[1], i, s)) : void 0 !== e[1] ? e[0] + i + e[1] : e[0]
    }, t.scientificToNormal = function(t) {
        var e;
        t = String(t).split("e");
        var i;
        if ("-" == t[1].substr(0, 1)) {
            for (e = "0.", i = 0; i < Math.abs(Number(t[1])) - 1; i++) e += "0";
            e += t[0].split(".").join("")
        } else {
            var s = 0;
            for (e = t[0].split("."), e[1] && (s = e[1].length), e = t[0].split(".").join(""), i = 0; i < Math.abs(Number(t[1])) - s; i++) e += "0"
        }
        return e
    }, t.toScientific = function(t, e) {
        if (0 === t) return "0";
        var i = Math.floor(Math.log(Math.abs(t)) * Math.LOG10E),
            s = String(s).split(".").join(e);
        return String(s) + "e" + i
    }, t.randomColor = function() {
        return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
    }, t.hitTest = function(e, i, s) {
        var a = !1,
            n = e.x,
            o = e.x + e.width,
            r = e.y,
            h = e.y + e.height,
            l = t.isInRectangle;
        return a || (a = l(n, r, i)), a || (a = l(n, h, i)), a || (a = l(o, r, i)), a || (a = l(o, h, i)), a || !0 === s || (a = t.hitTest(i, e, !0)), a
    }, t.isInRectangle = function(t, e, i) {
        return t >= i.x - 5 && t <= i.x + i.width + 5 && e >= i.y - 5 && e <= i.y + i.height + 5 ? !0 : !1
    }, t.isPercents = function(t) {
        return -1 != String(t).indexOf("%") ? !0 : void 0
    }, t.findPosX = function(t) {
        var e = t,
            i = t.offsetLeft;
        if (t.offsetParent) {
            for (; t = t.offsetParent;) i += t.offsetLeft;
            for (;
                (e = e.parentNode) && e != document.body;) i -= e.scrollLeft || 0
        }
        return i
    }, t.findPosY = function(t) {
        var e = t,
            i = t.offsetTop;
        if (t.offsetParent) {
            for (; t = t.offsetParent;) i += t.offsetTop;
            for (;
                (e = e.parentNode) && e != document.body;) i -= e.scrollTop || 0
        }
        return i
    }, t.findIfFixed = function(e) {
        if (e.offsetParent)
            for (; e = e.offsetParent;)
                if ("fixed" == t.getStyle(e, "position")) return !0;
        return !1
    }, t.findIfAuto = function(e) {
        return e.style && "auto" == t.getStyle(e, "overflow") ? !0 : e.parentNode ? t.findIfAuto(e.parentNode) : !1
    }, t.findScrollLeft = function(e, i) {
        return e.scrollLeft && (i += e.scrollLeft), e.parentNode ? t.findScrollLeft(e.parentNode, i) : i
    }, t.findScrollTop = function(e, i) {
        return e.scrollTop && (i += e.scrollTop), e.parentNode ? t.findScrollTop(e.parentNode, i) : i
    }, t.formatValue = function(e, i, s, a, n, o, r, h) {
        if (i) {
            void 0 === n && (n = "");
            var l;
            for (l = 0; l < s.length; l++) {
                var d = s[l],
                    c = i[d];
                void 0 !== c && (c = o ? t.addPrefix(c, h, r, a) : t.formatNumber(c, a), e = e.replace(new RegExp("\\[\\[" + n + d + "\\]\\]", "g"), c))
            }
        }
        return e
    }, t.formatDataContextValue = function(t, e) {
        if (t) {
            var i, s = t.match(/\[\[.*?\]\]/g);
            for (i = 0; i < s.length; i++) {
                var a = s[i],
                    a = a.substr(2, a.length - 4);
                void 0 !== e[a] && (t = t.replace(new RegExp("\\[\\[" + a + "\\]\\]", "g"), e[a]))
            }
        }
        return t
    }, t.massReplace = function(t, e) {
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var s = e[i];
                void 0 === s && (s = ""), t = t.replace(i, s)
            }
        return t
    }, t.cleanFromEmpty = function(t) {
        return t.replace(/\[\[[^\]]*\]\]/g, "")
    }, t.addPrefix = function(e, i, s, a, n) {
        var o, r, h, l = t.formatNumber(e, a),
            d = "";
        if (0 === e) return "0";
        if (0 > e && (d = "-"), e = Math.abs(e), e > 1) {
            for (o = i.length - 1; o > -1; o--)
                if (e >= i[o].number && (r = e / i[o].number, h = Number(a.precision), 1 > h && (h = 1), s = t.roundTo(r, h), h = t.formatNumber(s, {
                        precision: -1,
                        decimalSeparator: a.decimalSeparator,
                        thousandsSeparator: a.thousandsSeparator
                    }), !n || r == s)) {
                    l = d + "" + h + i[o].prefix;
                    break
                }
        } else
            for (o = 0; o < s.length; o++)
                if (e <= s[o].number) {
                    r = e / s[o].number, h = Math.abs(Math.floor(Math.log(r) * Math.LOG10E)), r = t.roundTo(r, h), l = d + "" + r + s[o].prefix;
                    break
                } return l
    }, t.remove = function(t) {
        t && t.remove()
    }, t.getEffect = function(t) {
        return ">" == t && (t = "easeOutSine"), "<" == t && (t = "easeInSine"), "elastic" == t && (t = "easeOutElastic"), t
    }, t.getObjById = function(t, e) {
        var i, s;
        for (s = 0; s < t.length; s++) {
            var a = t[s];
            a.id == e && (i = a)
        }
        return i
    }, t.applyTheme = function(e, i, s) {
        i || (i = t.theme), i && i[s] && t.extend(e, i[s])
    }, t.isString = function(t) {
        return "string" == typeof t ? !0 : !1
    }, t.extend = function(t, e, i) {
        var s;
        t || (t = {});
        for (s in e) i ? t.hasOwnProperty(s) || (t[s] = e[s]) : t[s] = e[s];
        return t
    }, t.copyProperties = function(t, e) {
        for (var i in t) t.hasOwnProperty(i) && "events" != i && void 0 !== t[i] && "function" != typeof t[i] && "cname" != i && (e[i] = t[i])
    }, t.processObject = function(e, i, s, a) {
        if (!1 == e instanceof i && (e = a ? t.extend(new i(s), e) : t.extend(e, new i(s), !0), e.listeners))
            for (var n in e.listeners) i = e.listeners[n], e.addListener(i.event, i.method);
        return e
    }, t.fixNewLines = function(t) {
        var e = RegExp("\\n", "g");
        return t && (t = t.replace(e, "<br />")), t
    }, t.fixBrakes = function(e) {
        if (t.isModern) {
            var i = RegExp("<br>", "g");
            e && (e = e.replace(i, "\n"))
        } else e = t.fixNewLines(e);
        return e
    }, t.deleteObject = function(e, i) {
        if (e && ((void 0 === i || null === i) && (i = 20), 0 !== i))
            if ("[object Array]" === Object.prototype.toString.call(e))
                for (var s = 0; s < e.length; s++) t.deleteObject(e[s], i - 1), e[s] = null;
            else if (e && !e.tagName) try {
            for (s in e) e[s] && ("object" == typeof e[s] && t.deleteObject(e[s], i - 1), "function" != typeof e[s] && (e[s] = null))
        } catch (a) {}
    }, t.bounce = function(t, e, i, s, a) {
        return (e /= a) < 1 / 2.75 ? 7.5625 * s * e * e + i : 2 / 2.75 > e ? s * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : 2.5 / 2.75 > e ? s * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : s * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
    }, t.easeInOutQuad = function(t, e, i, s, a) {
        return e /= a / 2, 1 > e ? s / 2 * e * e + i : (e--, -s / 2 * (e * (e - 2) - 1) + i)
    }, t.easeInSine = function(t, e, i, s, a) {
        return -s * Math.cos(e / a * (Math.PI / 2)) + s + i
    }, t.easeOutSine = function(t, e, i, s, a) {
        return s * Math.sin(e / a * (Math.PI / 2)) + i
    }, t.easeOutElastic = function(t, e, i, s, a) {
        t = 1.70158;
        var n = 0,
            o = s;
        return 0 === e ? i : 1 == (e /= a) ? i + s : (n || (n = .3 * a), o < Math.abs(s) ? (o = s, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(s / o), o * Math.pow(2, -10 * e) * Math.sin(2 * (e * a - t) * Math.PI / n) + s + i)
    }, t.fixStepE = function(e) {
        e = e.toExponential(0).split("e");
        var i = Number(e[1]);
        return 9 == Number(e[0]) && i++, t.generateNumber(1, i)
    }, t.generateNumber = function(t, e) {
        var i, s = "";
        i = 0 > e ? Math.abs(e) - 1 : Math.abs(e);
        var a;
        for (a = 0; i > a; a++) s += "0";
        return 0 > e ? Number("0." + s + String(t)) : Number(String(t) + s)
    }, t.setCN = function(t, e, i, s) {
        if (t.addClassNames && e && (e = e.node) && i) {
            var a = e.getAttribute("class");
            t = t.classNamePrefix + "-", s && (t = ""), a ? e.setAttribute("class", a + " " + t + i) : e.setAttribute("class", t + i)
        }
    }, t.parseDefs = function(e, i) {
        for (var s in e) {
            var a = typeof e[s];
            if (0 < e[s].length && "object" == a)
                for (var n = 0; n < e[s].length; n++) a = document.createElementNS(t.SVG_NS, s), i.appendChild(a), t.parseDefs(e[s][n], a);
            else "object" == a ? (a = document.createElementNS(t.SVG_NS, s), i.appendChild(a), t.parseDefs(e[s], a)) : i.setAttribute(s, e[s])
        }
    }
}(),
function() {
    var t = window.AmCharts;
    t.AxisBase = t.Class({
        construct: function(e) {
            this.createEvents("clickItem", "rollOverItem", "rollOutItem"), this.viY = this.viX = this.titleDY = this.y = this.x = this.dy = this.dx = 0, this.axisThickness = 1, this.axisColor = "#000000", this.axisAlpha = 1, this.gridCount = this.tickLength = 5, this.gridAlpha = .15, this.gridThickness = 1, this.gridColor = "#000000", this.dashLength = 0, this.labelFrequency = 1, this.showLastLabel = this.showFirstLabel = !0, this.fillColor = "#FFFFFF", this.fillAlpha = 0, this.labelsEnabled = !0, this.labelRotation = 0, this.autoGridCount = !0, this.offset = 0, this.guides = [], this.visible = !0, this.counter = 0, this.guides = [], this.ignoreAxisWidth = this.inside = !1, this.minHorizontalGap = 75, this.minVerticalGap = 35, this.titleBold = !0, this.minorGridEnabled = !1, this.minorGridAlpha = .07, this.autoWrap = !1, this.titleAlign = "middle", this.labelOffset = 0, this.bcn = "axis-", this.centerLabels = !1, this.periods = [{
                period: "ss",
                count: 1
            }, {
                period: "ss",
                count: 5
            }, {
                period: "ss",
                count: 10
            }, {
                period: "ss",
                count: 30
            }, {
                period: "mm",
                count: 1
            }, {
                period: "mm",
                count: 5
            }, {
                period: "mm",
                count: 10
            }, {
                period: "mm",
                count: 30
            }, {
                period: "hh",
                count: 1
            }, {
                period: "hh",
                count: 3
            }, {
                period: "hh",
                count: 6
            }, {
                period: "hh",
                count: 12
            }, {
                period: "DD",
                count: 1
            }, {
                period: "DD",
                count: 2
            }, {
                period: "DD",
                count: 3
            }, {
                period: "DD",
                count: 4
            }, {
                period: "DD",
                count: 5
            }, {
                period: "WW",
                count: 1
            }, {
                period: "MM",
                count: 1
            }, {
                period: "MM",
                count: 2
            }, {
                period: "MM",
                count: 3
            }, {
                period: "MM",
                count: 6
            }, {
                period: "YYYY",
                count: 1
            }, {
                period: "YYYY",
                count: 2
            }, {
                period: "YYYY",
                count: 5
            }, {
                period: "YYYY",
                count: 10
            }, {
                period: "YYYY",
                count: 50
            }, {
                period: "YYYY",
                count: 100
            }], this.dateFormats = [{
                period: "fff",
                format: "JJ:NN:SS"
            }, {
                period: "ss",
                format: "JJ:NN:SS"
            }, {
                period: "mm",
                format: "JJ:NN"
            }, {
                period: "hh",
                format: "JJ:NN"
            }, {
                period: "DD",
                format: "MMM DD"
            }, {
                period: "WW",
                format: "MMM DD"
            }, {
                period: "MM",
                format: "MMM"
            }, {
                period: "YYYY",
                format: "YYYY"
            }], this.nextPeriod = {
                fff: "ss",
                ss: "mm",
                mm: "hh",
                hh: "DD",
                DD: "MM",
                MM: "YYYY"
            }, t.applyTheme(this, e, "AxisBase")
        },
        zoom: function(t, e) {
            this.start = t, this.end = e, this.dataChanged = !0, this.draw()
        },
        fixAxisPosition: function() {
            var t = this.position;
            "H" == this.orientation ? ("left" == t && (t = "bottom"), "right" == t && (t = "top")) : ("bottom" == t && (t = "left"), "top" == t && (t = "right")), this.position = t
        },
        draw: function() {
            var t = this.chart;
            this.allLabels = [], this.counter = 0, this.destroy(), this.fixAxisPosition(), this.labels = [];
            var e = t.container,
                i = e.set();
            t.gridSet.push(i), this.set = i, e = e.set(), t.axesLabelsSet.push(e), this.labelsSet = e, this.axisLine = new this.axisRenderer(this), this.autoGridCount ? ("V" == this.orientation ? (t = this.height / this.minVerticalGap, 3 > t && (t = 3)) : t = this.width / this.minHorizontalGap, this.gridCountR = Math.max(t, 1)) : this.gridCountR = this.gridCount, this.axisWidth = this.axisLine.axisWidth, this.addTitle()
        },
        setOrientation: function(t) {
            this.orientation = t ? "H" : "V"
        },
        addTitle: function() {
            var e = this.title;
            if (this.titleLabel = null, e) {
                var i = this.chart,
                    s = this.titleColor;
                void 0 === s && (s = i.color);
                var a = this.titleFontSize;
                isNaN(a) && (a = i.fontSize + 1), e = t.text(i.container, e, s, i.fontFamily, a, this.titleAlign, this.titleBold), t.setCN(i, e, this.bcn + "title"), this.titleLabel = e
            }
        },
        positionTitle: function() {
            var e = this.titleLabel;
            if (e) {
                var i, s, a = this.labelsSet,
                    n = {};
                0 < a.length() ? n = a.getBBox() : (n.x = 0, n.y = 0, n.width = this.viW, n.height = this.viH, t.VML && (n.y += this.y, n.x += this.x)), a.push(e);
                var a = n.x,
                    o = n.y;
                t.VML && (this.rotate ? a -= this.x : o -= this.y);
                var r = n.width,
                    n = n.height,
                    h = this.viW,
                    l = this.viH,
                    d = 0,
                    c = e.getBBox().height / 2,
                    u = this.inside,
                    p = this.titleAlign;
                switch (this.position) {
                    case "top":
                        i = "left" == p ? -1 : "right" == p ? h : h / 2, s = o - 10 - c;
                        break;
                    case "bottom":
                        i = "left" == p ? -1 : "right" == p ? h : h / 2, s = o + n + 10 + c;
                        break;
                    case "left":
                        i = a - 10 - c, u && (i -= 5), d = -90, s = ("left" == p ? l + 1 : "right" == p ? -1 : l / 2) + this.titleDY;
                        break;
                    case "right":
                        i = a + r + 10 + c, u && (i += 7), s = ("left" == p ? l + 2 : "right" == p ? -2 : l / 2) + this.titleDY, d = -90
                }
                this.marginsChanged ? (e.translate(i, s), this.tx = i, this.ty = s) : e.translate(this.tx, this.ty), this.marginsChanged = !1, isNaN(this.titleRotation) || (d = this.titleRotation), 0 !== d && e.rotate(d)
            }
        },
        pushAxisItem: function(t, e) {
            var i = this,
                s = t.graphics();
            0 < s.length() && (e ? i.labelsSet.push(s) : i.set.push(s)), (s = t.getLabel()) && (this.labelsSet.push(s), s.click(function(e) {
                i.handleMouse(e, t, "clickItem")
            }).mouseover(function(e) {
                i.handleMouse(e, t, "rollOverItem")
            }).mouseout(function(e) {
                i.handleMouse(e, t, "rollOutItem")
            }))
        },
        handleMouse: function(t, e, i) {
            this.fire(i, {
                type: i,
                value: e.value,
                serialDataItem: e.serialDataItem,
                axis: this,
                target: e.label,
                chart: this.chart,
                event: t
            })
        },
        addGuide: function(e) {
            for (var i = this.guides, s = !1, a = i.length, n = 0; n < i.length; n++) i[n] == e && (s = !0, a = n);
            e = t.processObject(e, t.Guide, this.theme), e.id || (e.id = "guideAuto" + a + "_" + (new Date).getTime()), s || i.push(e)
        },
        removeGuide: function(t) {
            var e, i = this.guides;
            for (e = 0; e < i.length; e++) i[e] == t && i.splice(e, 1)
        },
        handleGuideOver: function(t) {
            clearTimeout(this.chart.hoverInt);
            var e = t.graphics.getBBox(),
                i = this.x + e.x + e.width / 2,
                e = this.y + e.y + e.height / 2,
                s = t.fillColor;
            void 0 === s && (s = t.lineColor), this.chart.showBalloon(t.balloonText, s, !0, i, e)
        },
        handleGuideOut: function() {
            this.chart.hideBalloon()
        },
        addEventListeners: function(t, e) {
            var i = this;
            t.mouseover(function() {
                i.handleGuideOver(e)
            }), t.touchstart(function() {
                i.handleGuideOver(e)
            }), t.mouseout(function() {
                i.handleGuideOut(e)
            })
        },
        getBBox: function() {
            var e = this.labelsSet.getBBox();
            return t.VML || (e = {
                x: e.x + this.x,
                y: e.y + this.y,
                width: e.width,
                height: e.height
            }), e
        },
        destroy: function() {
            t.remove(this.set), t.remove(this.labelsSet);
            var e = this.axisLine;
            e && t.remove(e.set), t.remove(this.grid0)
        },
        chooseMinorFrequency: function(t) {
            for (var e = 10; e > 0; e--)
                if (t / e == Math.round(t / e)) return t / e
        },
        parseDatesDraw: function() {
            var e, i, s, a, n, o, r, h = this.chart,
                l = this.showFirstLabel,
                d = this.showLastLabel,
                c = "",
                u = t.extractPeriod(this.minPeriod),
                p = t.getPeriodDuration(u.period, u.count),
                m = this.firstDayOfWeek,
                f = this.boldPeriodBeginning;
            e = this.minorGridEnabled;
            var g, v, b = this.gridAlpha,
                x = this.choosePeriod(0),
                C = x.period,
                x = x.count,
                y = t.getPeriodDuration(C, x);
            p > y && (C = u.period, x = u.count, y = p), u = C, "WW" == u && (u = "DD"), this.stepWidth = this.getStepWidth(this.timeDifference);
            var N = Math.ceil(this.timeDifference / y) + 5,
                w = s = t.resetDateToMin(new Date(this.startTime - y), C, x, m).getTime();
            (u == C && 1 == x && this.centerLabelOnFullPeriod || this.autoWrap || this.centerLabels) && (n = y * this.stepWidth, this.autoWrap && !this.centerLabels && (n = -n)), this.cellWidth = p * this.stepWidth, o = Math.round(s / y), p = -1, o / 2 == Math.round(o / 2) && (p = -2, s -= y), o = this.firstTime;
            var S = 0,
                A = 0;
            if (e && x > 1 && (g = this.chooseMinorFrequency(x), v = t.getPeriodDuration(C, g)), 0 < this.gridCountR)
                for (N - 5 - p > this.autoRotateCount && !isNaN(this.autoRotateAngle) && (this.labelRotationR = this.autoRotateAngle), e = p; N >= e; e++) {
                    if (r = o + y * (e + Math.floor((w - o) / y)) - S, "DD" == C && (r += 36e5), r = t.resetDateToMin(new Date(r), C, x, m).getTime(), "MM" == C && (i = (r - s) / y, (r - s) / y >= 1.5 && (r = r - (i - 1) * y + t.getPeriodDuration("DD", 3), r = t.resetDateToMin(new Date(r), C, 1).getTime(), S += y)), i = (r - this.startTime) * this.stepWidth, "radar" == h.type) {
                        if (0 > i || i > this.axisWidth) continue;
                        i = this.y + (this.axisWidth - i)
                    } else this.rotate ? (i += this.x - this.viX, "date" == this.type && "middle" == this.gridPosition && (A = -y * this.stepWidth / 2)) : i = "date" == this.type ? this.axisWidth - i + (this.y - this.viY) : i + (this.y - this.viY);
                    if (c = !1, this.nextPeriod[u] && (c = this.checkPeriodChange(this.nextPeriod[u], 1, r, s, u)), s = !1, c && this.markPeriodChange ? (c = this.dateFormatsObject[this.nextPeriod[u]], this.twoLineMode && (c = this.dateFormatsObject[u] + "\n" + c, c = t.fixBrakes(c)), s = !0) : c = this.dateFormatsObject[u], f || (s = !1), this.currentDateFormat = c, c = t.formatDate(new Date(r), c, h), (e == p && !l || e == N && !d) && (c = " "), this.labelFunction && (c = this.labelFunction(c, new Date(r), this, C, x, a).toString()), this.boldLabels && (s = !0), a = new this.axisItemRenderer(this, i, c, !1, n, A, !1, s), this.pushAxisItem(a), a = s = r, !isNaN(g))
                        for (i = 1; x > i; i += g) this.gridAlpha = this.minorGridAlpha, c = r + v * i, c = t.resetDateToMin(new Date(c), C, g, m).getTime(), c = new this.axisItemRenderer(this, (c - this.startTime) * this.stepWidth, void 0, void 0, void 0, void 0, void 0, void 0, void 0, !0), this.pushAxisItem(c);
                    this.gridAlpha = b
                }
        },
        choosePeriod: function(e) {
            var i = t.getPeriodDuration(this.periods[e].period, this.periods[e].count),
                s = this.periods;
            return this.timeDifference < i && e > 0 ? s[e - 1] : Math.ceil(this.timeDifference / i) <= this.gridCountR ? s[e] : e + 1 < s.length ? this.choosePeriod(e + 1) : s[e]
        },
        getStepWidth: function(t) {
            var e;
            return this.startOnAxis ? (e = this.axisWidth / (t - 1), 1 == t && (e = this.axisWidth)) : e = this.axisWidth / t, e
        },
        timeZoom: function(t, e) {
            this.startTime = t, this.endTime = e
        },
        minDuration: function() {
            var e = t.extractPeriod(this.minPeriod);
            return t.getPeriodDuration(e.period, e.count)
        },
        checkPeriodChange: function(e, i, s, a, n) {
            s = new Date(s);
            var o = new Date(a),
                r = this.firstDayOfWeek;
            return a = i, "DD" == e && (i = 1), s = t.resetDateToMin(s, e, i, r).getTime(), i = t.resetDateToMin(o, e, i, r).getTime(), "DD" == e && "hh" != n && s - i < t.getPeriodDuration(e, a) ? !1 : s != i ? !0 : !1
        },
        generateDFObject: function() {
            this.dateFormatsObject = {};
            var t;
            for (t = 0; t < this.dateFormats.length; t++) {
                var e = this.dateFormats[t];
                this.dateFormatsObject[e.period] = e.format
            }
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.ValueAxis = t.Class({
        inherits: t.AxisBase,
        construct: function(e) {
            this.cname = "ValueAxis", this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed"), t.ValueAxis.base.construct.call(this, e), this.dataChanged = !0, this.stackType = "none", this.position = "left", this.unitPosition = "right", this.includeAllValues = this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1, this.durationUnits = {
                DD: "d. ",
                hh: ":",
                mm: ":",
                ss: ""
            }, this.scrollbar = !1, this.baseValue = 0, this.radarCategoriesEnabled = !0, this.gridType = "polygons", this.useScientificNotation = !1, this.axisTitleOffset = 10, this.pointPosition = "axis", this.minMaxMultiplier = 1, this.logGridLimit = 2, this.totalTextOffset = this.treatZeroAs = 0, this.minPeriod = "ss", t.applyTheme(this, e, this.cname)
        },
        updateData: function() {
            0 >= this.gridCountR && (this.gridCountR = 1), this.totals = [], this.data = this.chart.chartData;
            var e = this.chart;
            "xy" != e.type && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step")), this.recalculateToPercents && this.recalculate(), this.synchronizationMultiplier && this.synchronizeWith ? (t.isString(this.synchronizeWith) && (this.synchronizeWith = e.getValueAxisById(this.synchronizeWith)), this.synchronizeWith && (this.synchronizeWithAxis(this.synchronizeWith), this.foundGraphs = !0)) : (this.foundGraphs = !1, this.getMinMax())
        },
        draw: function() {
            t.ValueAxis.base.draw.call(this);
            var e = this.chart,
                i = this.set;
            this.labelRotationR = this.labelRotation, t.setCN(e, this.set, "value-axis value-axis-" + this.id), t.setCN(e, this.labelsSet, "value-axis value-axis-" + this.id), t.setCN(e, this.axisLine.axisSet, "value-axis value-axis-" + this.id);
            var s = this.type;
            if ("duration" == s && (this.duration = "ss"), !0 === this.dataChanged && (this.updateData(), this.dataChanged = !1), "date" == s && (this.logarithmic = !1, this.min = this.minRR, this.max = this.maxRR, this.getDateMinMax()), this.logarithmic) {
                var a = this.treatZeroAs,
                    n = this.getMin(0, this.data.length - 1);
                if (this.minReal < n && (this.minReal = n), isNaN(this.minReal) && (this.minReal = n), a > 0 && 0 === n && (this.minReal = n = a), 0 >= n || 0 >= this.minimum) return void this.fire("logarithmicAxisFailed", {
                    type: "logarithmicAxisFailed",
                    chart: e
                })
            }
            this.grid0 = null;
            var o, r, h = e.dx,
                l = e.dy,
                a = !1,
                n = this.logarithmic;
            if (isNaN(this.min) || isNaN(this.max) || !this.foundGraphs || 1 / 0 == this.min || -(1 / 0) == this.max) a = !0;
            else {
                var d = this.labelFrequency,
                    c = this.showFirstLabel,
                    u = this.showLastLabel,
                    p = 1;
                o = 0, this.minCalc = this.min, this.maxCalc = this.max, this.strictMinMax && (isNaN(this.minimum) || (this.min = this.minimum), isNaN(this.maximum) || (this.max = this.maximum)), isNaN(this.minZoom) || (this.min = this.minZoom), isNaN(this.maxZoom) || (this.max = this.maxZoom);
                var m, f = Math.round((this.maxCalc - this.minCalc) / this.step) + 1;
                !0 === n ? (m = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / m, m > this.logGridLimit && (f = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, o = Math.round(Math.log(this.minReal) * Math.LOG10E), f > this.gridCountR && (p = Math.ceil(f / this.gridCountR)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
                var g = 0;
                1 > this.step && -1 < this.step && (g = t.getDecimals(this.step)), this.integersOnly && (g = 0), g > this.maxDecCount && (g = this.maxDecCount);
                var v = this.precision;
                isNaN(v) || (g = v), this.max = t.roundTo(this.max, this.maxDecCount), this.min = t.roundTo(this.min, this.maxDecCount), r = {}, r.precision = g, r.decimalSeparator = e.nf.decimalSeparator, r.thousandsSeparator = e.nf.thousandsSeparator, this.numberFormatter = r;
                var b, x = this.guides,
                    C = x.length;
                if (C > 0) {
                    var y = this.fillAlpha;
                    for (r = this.fillAlpha = 0; C > r; r++) {
                        var N = x[r],
                            w = NaN,
                            S = N.above;
                        isNaN(N.toValue) || (w = this.getCoordinate(N.toValue), b = new this.axisItemRenderer(this, w, "", !0, NaN, NaN, N), this.pushAxisItem(b, S));
                        var A = NaN;
                        isNaN(N.value) || (A = this.getCoordinate(N.value), b = new this.axisItemRenderer(this, A, N.label, !0, NaN, (w - A) / 2, N), this.pushAxisItem(b, S)), isNaN(w) && (A -= 3, w = A + 3), isNaN(w - A) || (b = new this.guideFillRenderer(this, A, w, N), this.pushAxisItem(b, S), b = b.graphics(), N.graphics = b, N.balloonText && this.addEventListeners(b, N))
                    }
                    this.fillAlpha = y
                }
                for (this.exponential = !1, r = o; f > r; r += p) x = t.roundTo(this.step * r + this.min, g), -1 != String(x).indexOf("e") && (this.exponential = !0);
                this.duration && (this.maxInterval = t.getMaxInterval(this.max, this.duration));
                var M, g = this.step,
                    x = this.minorGridAlpha;
                if (this.minorGridEnabled && (M = this.getMinorGridStep(g, this.stepWidth * g)), "date" == s) this.generateDFObject(), this.timeDifference = this.max - this.min, this.maxTime = this.lastTime = this.max, this.startTime = this.firstTime = this.min, this.parseDatesDraw();
                else
                    for (f >= this.autoRotateCount && !isNaN(this.autoRotateAngle) && (this.labelRotationR = this.autoRotateAngle),
                        r = o; f > r; r += p)
                        if (s = g * r + this.minCalc, n && this.max - this.min > 10 * this.min && (s -= this.min), s = t.roundTo(s, this.maxDecCount + 1), (!this.integersOnly || Math.round(s) == s) && (isNaN(v) || Number(t.toFixed(s, v)) == s)) {
                            !0 === n && (0 === s && (s = this.minReal), m > this.logGridLimit && (s = Math.pow(10, r))), b = this.formatValue(s, !1, r), Math.round(r / d) != r / d && (b = void 0), (0 === r && !c || r == f - 1 && !u) && (b = " "), o = this.getCoordinate(s);
                            var D;
                            if (this.rotate && this.autoWrap && (D = this.stepWidth * g - 10), b = new this.axisItemRenderer(this, o, b, void 0, D, void 0, void 0, this.boldLabels), this.pushAxisItem(b), s == this.baseValue && "radar" != e.type) {
                                var T, k, y = this.viW,
                                    N = this.viH;
                                b = this.viX, C = this.viY, "H" == this.orientation ? o >= 0 && y + 1 >= o && (T = [o, o, o + h], k = [N, 0, l]) : o >= 0 && N + 1 >= o && (T = [0, y, y + h], k = [o, o, o + l]), T && (o = t.fitToBounds(2 * this.gridAlpha, 0, 1), isNaN(this.zeroGridAlpha) || (o = this.zeroGridAlpha), o = t.line(e.container, T, k, this.gridColor, o, 1, this.dashLength), o.translate(b, C), this.grid0 = o, e.axesSet.push(o), o.toBack(), t.setCN(e, o, this.bcn + "zero-grid-" + this.id), t.setCN(e, o, this.bcn + "zero-grid"))
                            }
                            if (!isNaN(M) && x > 0 && f - 1 > r) {
                                for (o = this.gridAlpha, this.gridAlpha = this.minorGridAlpha, b = 1; g / M > b; b++) C = this.getCoordinate(s + M * b), C = new this.axisItemRenderer(this, C, "", !1, 0, 0, !1, !1, 0, !0), this.pushAxisItem(C);
                                this.gridAlpha = o
                            }
                        }
                m = this.baseValue, this.min > this.baseValue && this.max > this.baseValue && (m = this.min), this.min < this.baseValue && this.max < this.baseValue && (m = this.max), n && m < this.minReal && (m = this.minReal), this.baseCoord = this.getCoordinate(m), m = {
                    type: "axisChanged",
                    target: this,
                    chart: e
                }, m.min = n ? this.minReal : this.min, m.max = this.max, this.fire("axisChanged", m), this.axisCreated = !0
            }
            n = this.axisLine.set, m = this.labelsSet, this.positionTitle(), "radar" != e.type ? (e = this.viX, M = this.viY, i.translate(e, M), m.translate(e, M)) : n.toFront(), !this.visible || a ? (i.hide(), n.hide(), m.hide()) : (i.show(), n.show(), m.show()), this.axisY = this.y - this.viY, this.axisX = this.x - this.viX
        },
        getDateMinMax: function() {
            this.minimumDate && (this.minimumDate instanceof Date || (this.minimumDate = t.getDate(this.minimumDate, this.chart.dataDateFormat, "fff")), this.min = this.minimumDate.getTime()), this.maximumDate && (this.maximumDate instanceof Date || (this.maximumDate = t.getDate(this.maximumDate, this.chart.dataDateFormat, "fff")), this.max = this.maximumDate.getTime())
        },
        formatValue: function(e, i, s) {
            var a = this.exponential,
                n = this.logarithmic,
                o = this.numberFormatter,
                r = this.chart;
            return !0 === this.logarithmic && (a = -1 != String(e).indexOf("e") ? !0 : !1), this.useScientificNotation && (a = !0), this.usePrefixes && (a = !1), a ? (s = -1 == String(e).indexOf("e") ? e.toExponential(15) : String(e), a = s.split("e"), s = Number(a[0]), a = Number(a[1]), s = t.roundTo(s, 14), 10 == s && (s = 1, a += 1), s = s + "e" + a, 0 === e && (s = "0"), 1 == e && (s = "1")) : (n && (a = String(e).split("."), a[1] ? (o.precision = a[1].length, 0 > s && (o.precision = Math.abs(s)), i && e > 1 && (o.precision = 0)) : o.precision = -1), s = this.usePrefixes ? t.addPrefix(e, r.prefixesOfBigNumbers, r.prefixesOfSmallNumbers, o, !i) : t.formatNumber(e, o, o.precision)), this.duration && (i && (o.precision = 0), s = t.formatDuration(e, this.duration, "", this.durationUnits, this.maxInterval, o)), "date" == this.type && (s = t.formatDate(new Date(e), this.currentDateFormat, r)), this.recalculateToPercents ? s += "%" : (i = this.unit) && (s = "left" == this.unitPosition ? i + s : s + i), this.labelFunction && (s = "date" == this.type ? this.labelFunction(s, new Date(e), this).toString() : this.labelFunction(e, s, this).toString()), s
        },
        getMinorGridStep: function(t, e) {
            var i = [5, 4, 2];
            60 > e && i.shift();
            for (var s = Math.floor(Math.log(Math.abs(t)) * Math.LOG10E), a = 0; a < i.length; a++) {
                var n = t / i[a],
                    o = Math.floor(Math.log(Math.abs(n)) * Math.LOG10E);
                if (!(1 < Math.abs(s - o)))
                    if (1 > t) {
                        if (o = Math.pow(10, -o) * n, o == Math.round(o)) return n
                    } else if (n == Math.round(n)) return n
            }
        },
        stackGraphs: function(e) {
            var i = this.stackType;
            "stacked" == i && (i = "regular"), "line" == i && (i = "none"), "100% stacked" == i && (i = "100%"), this.stackType = i;
            var s, a, n, o, r, h = [],
                l = [],
                d = [],
                c = [],
                u = this.chart.graphs,
                p = this.baseValue,
                m = !1;
            if (("line" == e || "step" == e || "smoothedLine" == e) && (m = !0), m && ("regular" == i || "100%" == i))
                for (r = 0; r < u.length; r++) o = u[r], o.hidden || (n = o.type, o.chart == this.chart && o.valueAxis == this && e == n && o.stackable && (a && (o.stackGraph = a), a = o));
            for (a = this.start; a <= this.end; a++) {
                var f = 0;
                for (r = 0; r < u.length; r++)
                    if (o = u[r], o.hidden) o.newStack && (d[a] = NaN, l[a] = NaN);
                    else if (n = o.type, o.chart == this.chart && o.valueAxis == this && e == n && o.stackable)
                    if (n = this.data[a].axes[this.id].graphs[o.id], s = n.values.value, isNaN(s)) o.newStack && (d[a] = NaN, l[a] = NaN);
                    else {
                        var g = t.getDecimals(s);
                        g > f && (f = g), isNaN(c[a]) ? c[a] = Math.abs(s) : c[a] += Math.abs(s), c[a] = t.roundTo(c[a], f), g = o.fillToGraph, m && g && (g = this.data[a].axes[this.id].graphs[g.id]) && (n.values.open = g.values.value), "regular" == i && (m && (isNaN(h[a]) ? (h[a] = s, n.values.close = s, n.values.open = this.baseValue) : (isNaN(s) ? n.values.close = h[a] : n.values.close = s + h[a], n.values.open = h[a], h[a] = n.values.close)), "column" == e && (o.newStack && (d[a] = NaN, l[a] = NaN), n.values.close = s, 0 > s ? (n.values.close = s, isNaN(l[a]) ? n.values.open = p : (n.values.close += l[a], n.values.open = l[a]), l[a] = n.values.close) : (n.values.close = s, isNaN(d[a]) ? n.values.open = p : (n.values.close += d[a], n.values.open = d[a]), d[a] = n.values.close)))
                    }
            }
            for (a = this.start; a <= this.end; a++)
                for (r = 0; r < u.length; r++) o = u[r], o.hidden ? o.newStack && (d[a] = NaN, l[a] = NaN) : (n = o.type, o.chart == this.chart && o.valueAxis == this && e == n && o.stackable && (n = this.data[a].axes[this.id].graphs[o.id], s = n.values.value, isNaN(s) || (h = s / c[a] * 100, n.values.percents = h, n.values.total = c[a], o.newStack && (d[a] = NaN, l[a] = NaN), "100%" == i && (isNaN(l[a]) && (l[a] = 0), isNaN(d[a]) && (d[a] = 0), 0 > h ? (n.values.close = t.fitToBounds(h + l[a], -100, 100), n.values.open = l[a], l[a] = n.values.close) : (n.values.close = t.fitToBounds(h + d[a], -100, 100), n.values.open = d[a], d[a] = n.values.close)))))
        },
        recalculate: function() {
            var e, i = this.chart,
                s = i.graphs;
            for (e = 0; e < s.length; e++) {
                var a = s[e];
                if (a.valueAxis == this) {
                    var n = "value";
                    ("candlestick" == a.type || "ohlc" == a.type) && (n = "open");
                    var o, r, h = this.end + 2,
                        h = t.fitToBounds(this.end + 1, 0, this.data.length - 1),
                        l = this.start;
                    l > 0 && l--;
                    var d;
                    if (r = this.start, a.compareFromStart && (r = 0), !isNaN(i.startTime) && (d = i.categoryAxis)) {
                        var c = d.minDuration(),
                            c = new Date(i.startTime + c / 2),
                            u = t.resetDateToMin(new Date(i.startTime), d.minPeriod).getTime();
                        t.resetDateToMin(new Date(c), d.minPeriod).getTime() > u && r++
                    }
                    for ((d = i.recalculateFromDate) && (d = t.getDate(d, i.dataDateFormat, "fff"), r = i.getClosestIndex(i.chartData, "time", d.getTime(), !0, 0, i.chartData.length), h = i.chartData.length - 1), d = r; h >= d && (r = this.data[d].axes[this.id].graphs[a.id], o = r.values[n], a.recalculateValue && (o = r.dataContext[a.valueField + a.recalculateValue]), isNaN(o)); d++);
                    for (this.recBaseValue = o, n = l; h >= n; n++) {
                        r = this.data[n].axes[this.id].graphs[a.id], r.percents = {};
                        var p, l = r.values;
                        for (p in l) r.percents[p] = "percents" != p ? l[p] / o * 100 - 100 : l[p]
                    }
                }
            }
        },
        getMinMax: function() {
            var e, i = !1,
                s = this.chart,
                a = s.graphs;
            for (e = 0; e < a.length; e++) {
                var n = a[e].type;
                ("line" == n || "step" == n || "smoothedLine" == n) && this.expandMinMax && (i = !0)
            }
            if (i && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++), "serial" == s.type && (!0 !== s.categoryAxis.parseDates || i || this.end < this.data.length - 1 && this.end++), this.includeAllValues && (this.start = 0, this.end = this.data.length - 1), i = this.minMaxMultiplier, this.min = this.getMin(this.start, this.end), this.max = this.getMax(), this.minRR = this.min, this.maxRR = this.max, i = (this.max - this.min) * (i - 1), this.min -= i, this.max += i, i = this.guides.length, this.includeGuidesInMinMax && i > 0)
                for (s = 0; i > s; s++) a = this.guides[s], a.toValue < this.min && (this.min = a.toValue), a.value < this.min && (this.min = a.value), a.toValue > this.max && (this.max = a.toValue), a.value > this.max && (this.max = a.value);
            isNaN(this.minimum) || (this.min = this.minimum), isNaN(this.maximum) || (this.max = this.maximum), "date" == this.type && this.getDateMinMax(), this.min > this.max && (i = this.max, this.max = this.min, this.min = i), isNaN(this.minTemp) || (this.min = this.minTemp), isNaN(this.maxTemp) || (this.max = this.maxTemp), this.minReal = this.min, this.maxReal = this.max, 0 === this.min && 0 === this.max && (this.max = 9), this.min > this.max && (this.min = this.max - 1), i = this.min, s = this.max, a = this.max - this.min, e = 0 === a ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / e) * e + e), isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / e) * e - e), 0 > this.min && i >= 0 && (this.min = 0), 0 < this.max && 0 >= s && (this.max = 0), "100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100), a = this.max - this.min, e = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, this.step = Math.ceil(a / this.gridCountR / e) * e, a = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), a = t.fixStepE(a), e = Math.ceil(this.step / a), e > 5 && (e = 10), 5 >= e && e > 2 && (e = 5), this.step = Math.ceil(this.step / (a * e)) * a * e, 1 > a ? (this.maxDecCount = Math.abs(Math.log(Math.abs(a)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = t.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0, this.min = this.step * Math.floor(this.min / this.step), this.max = this.step * Math.ceil(this.max / this.step), 0 > this.min && i >= 0 && (this.min = 0), 0 < this.max && 0 >= s && (this.max = 0), 1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal)), a = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E)), 0 === this.min && (this.minReal = a), 0 === this.min && 1 < this.minReal && (this.minReal = 1), 0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min), this.logarithmic && (2 < Math.log(s) * Math.LOG10E - Math.log(i) * Math.LOG10E ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(i)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(s)) * Math.LOG10E))) : (i = Math.pow(10, Math.floor(Math.log(Math.abs(i)) * Math.LOG10E)) / 10, Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10 < i && (this.minReal = this.min = 10 * i)))
        },
        getMin: function(t, e) {
            var i, s;
            for (s = t; e >= s; s++) {
                var a, n = this.data[s].axes[this.id].graphs;
                for (a in n)
                    if (n.hasOwnProperty(a)) {
                        var o = this.chart.getGraphById(a);
                        if (o.includeInMinMax && (!o.hidden || this.includeHidden)) {
                            isNaN(i) && (i = 1 / 0), this.foundGraphs = !0, o = n[a].values, this.recalculateToPercents && (o = n[a].percents);
                            var r;
                            if (this.minMaxField) r = o[this.minMaxField], i > r && (i = r);
                            else
                                for (var h in o) o.hasOwnProperty(h) && "percents" != h && "total" != h && (r = o[h], i > r && (i = r))
                        }
                    }
            }
            return i
        },
        getMax: function() {
            var t, e;
            for (e = this.start; e <= this.end; e++) {
                var i, s = this.data[e].axes[this.id].graphs;
                for (i in s)
                    if (s.hasOwnProperty(i)) {
                        var a = this.chart.getGraphById(i);
                        if (a.includeInMinMax && (!a.hidden || this.includeHidden)) {
                            isNaN(t) && (t = -(1 / 0)), this.foundGraphs = !0, a = s[i].values, this.recalculateToPercents && (a = s[i].percents);
                            var n;
                            if (this.minMaxField) n = a[this.minMaxField], n > t && (t = n);
                            else
                                for (var o in a) a.hasOwnProperty(o) && "percents" != o && "total" != o && (n = a[o], n > t && (t = n))
                        }
                    }
            }
            return t
        },
        dispatchZoomEvent: function(t, e) {
            var i = {
                type: "axisZoomed",
                startValue: t,
                endValue: e,
                target: this,
                chart: this.chart
            };
            this.fire(i.type, i)
        },
        zoomOut: function() {
            var t = this.chart;
            "xy" != t.type && (this.maxZoom = this.minZoom = void 0, t.updateAfterValueZoom())
        },
        zoomToValues: function(t, e) {
            var i = this.chart;
            "xy" == i.type ? (t > e && (i = e, e = t, t = i), t < this.min && (t = this.min), e > this.max && (e = this.max), i = {
                type: "axisSelfZoomed"
            }, i.chart = this.chart, i.valueAxis = this, i.multiplier = this.axisWidth / Math.abs(this.getCoordinate(e) - this.getCoordinate(t)), i.startValue = t, i.endValue = e, i.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(t) : this.getCoordinate(e) : this.reversed ? this.getCoordinate(e) : this.getCoordinate(t), this.fire(i.type, i)) : (this.minZoom = t, this.maxZoom = e, i.updateAfterValueZoom())
        },
        coordinateToValue: function(t) {
            if (isNaN(t)) return NaN;
            var e = this.axisWidth,
                i = this.stepWidth,
                s = this.reversed,
                a = this.rotate,
                n = this.min,
                o = this.minReal;
            return !0 === this.logarithmic ? Math.pow(10, (a ? !0 === s ? (e - t) / i : t / i : !0 === s ? t / i : (e - t) / i) + Math.log(o) * Math.LOG10E) : !0 === s ? a ? n - (t - e) / i : t / i + n : a ? t / i + n : n - (t - e) / i
        },
        getCoordinate: function(t, e) {
            if (isNaN(t)) return NaN;
            var i = this.rotate,
                s = this.reversed,
                a = this.axisWidth,
                n = this.stepWidth,
                o = this.min,
                r = this.minReal;
            return !0 === this.logarithmic ? (0 === t && (t = this.treatZeroAs), o = Math.log(t) * Math.LOG10E - Math.log(r) * Math.LOG10E, i = i ? !0 === s ? a - n * o : n * o : !0 === s ? n * o : a - n * o) : i = !0 === s ? i ? a - n * (t - o) : n * (t - o) : i ? n * (t - o) : a - n * (t - o), i = this.rotate ? i + (this.x - this.viX) : i + (this.y - this.viY), 1e7 < Math.abs(i) && (i = i / Math.abs(i) * 1e7), e || (i = Math.round(i)), i
        },
        synchronizeWithAxis: function(t) {
            this.synchronizeWith = t, this.listenTo(this.synchronizeWith, "axisChanged", this.handleSynchronization)
        },
        handleSynchronization: function() {
            if (this.synchronizeWith) {
                t.isString(this.synchronizeWith) && (this.synchronizeWith = this.chart.getValueAxisById(this.synchronizeWith));
                var e = this.synchronizeWith,
                    i = e.min,
                    s = e.max,
                    e = e.step,
                    a = this.synchronizationMultiplier;
                a && (this.min = i * a, this.max = s * a, this.step = e * a, i = Math.abs(Math.log(Math.abs(Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)))) * Math.LOG10E), this.maxDecCount = i = Math.round(i), this.draw())
            }
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.RecAxis = t.Class({
        construct: function(e) {
            var i = e.chart,
                s = e.axisThickness,
                a = e.axisColor,
                n = e.axisAlpha,
                o = e.offset,
                r = e.dx,
                h = e.dy,
                l = e.viX,
                d = e.viY,
                c = e.viH,
                u = e.viW,
                p = i.container;
            "H" == e.orientation ? (a = t.line(p, [0, u], [0, 0], a, n, s), this.axisWidth = e.width, "bottom" == e.position ? (h = s / 2 + o + c + d - 1, s = l) : (h = -s / 2 - o + d + h, s = r + l)) : (this.axisWidth = e.height, "right" == e.position ? (a = t.line(p, [0, 0, -r], [0, c, c - h], a, n, s), h = d + h, s = s / 2 + o + r + u + l - 1) : (a = t.line(p, [0, 0], [0, c], a, n, s), h = d, s = -s / 2 - o + l)), a.translate(s, h), s = i.container.set(), s.push(a), i.axesSet.push(s), t.setCN(i, a, e.bcn + "line"), this.axisSet = s, this.set = a
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.RecItem = t.Class({
        construct: function(e, i, s, a, n, o, r, h, l, d, c, u) {
            i = Math.round(i);
            var p = e.chart;
            this.value = s, void 0 == s && (s = ""), l || (l = 0), void 0 == a && (a = !0);
            var m = p.fontFamily,
                f = e.fontSize;
            void 0 == f && (f = p.fontSize);
            var g = e.color;
            void 0 == g && (g = p.color), void 0 !== c && (g = c);
            var v = e.chart.container,
                b = v.set();
            this.set = b;
            var x = e.axisThickness,
                C = e.axisColor,
                y = e.axisAlpha,
                N = e.tickLength,
                w = e.gridAlpha,
                S = e.gridThickness,
                A = e.gridColor,
                M = e.dashLength,
                D = e.fillColor,
                T = e.fillAlpha,
                k = e.labelsEnabled;
            c = e.labelRotationR;
            var B, L, O = e.counter,
                R = e.inside,
                I = e.labelOffset,
                E = e.dx,
                z = e.dy,
                F = e.orientation,
                P = e.position,
                G = e.previousCoord,
                $ = e.viH,
                W = e.viW,
                H = e.offset;
            r ? (void 0 !== r.id && (u = p.classNamePrefix + "-guide-" + r.id), k = !0, isNaN(r.tickLength) || (N = r.tickLength), void 0 != r.lineColor && (A = r.lineColor), void 0 != r.color && (g = r.color), isNaN(r.lineAlpha) || (w = r.lineAlpha), isNaN(r.dashLength) || (M = r.dashLength), isNaN(r.lineThickness) || (S = r.lineThickness), !0 === r.inside && (R = !0, H > 0 && (H = 0)), isNaN(r.labelRotation) || (c = r.labelRotation), isNaN(r.fontSize) || (f = r.fontSize), r.position && (P = r.position), void 0 !== r.boldLabel && (h = r.boldLabel), isNaN(r.labelOffset) || (I = r.labelOffset)) : "" === s && (N = 0), d && !isNaN(e.minorTickLength) && (N = e.minorTickLength);
            var Y = "start";
            n > 0 && (Y = "middle"), e.centerLabels && (Y = "middle");
            var V, X, j = c * Math.PI / 180,
                U = 0,
                _ = 0,
                Z = 0,
                q = V = 0,
                Q = 0;
            "V" == F && (c = 0);
            var J;
            k && "" !== s && (J = e.autoWrap && 0 === c ? t.wrappedText(v, s, g, m, f, Y, h, Math.abs(n), 0) : t.text(v, s, g, m, f, Y, h), Y = J.getBBox(), q = Y.width, Q = Y.height), "H" == F ? (i >= 0 && W + 1 >= i && (N > 0 && y > 0 && W + 1 >= i + l && (B = t.line(v, [i + l, i + l], [0, N], C, y, S), b.push(B)), w > 0 && (L = t.line(v, [i, i + E, i + E], [$, $ + z, z], A, w, S, M), b.push(L))), _ = 0, U = i, r && 90 == c && R && (U -= f), !1 === a ? (Y = "start", _ = "bottom" == P ? R ? _ + N : _ - N : R ? _ - N : _ + N, U += 3, n > 0 && (U += n / 2 - 3, Y = "middle"), c > 0 && (Y = "middle")) : Y = "middle", 1 == O && T > 0 && !r && !d && W > G && (a = t.fitToBounds(i, 0, W), G = t.fitToBounds(G, 0, W), V = a - G, V > 0 && (X = t.rect(v, V, e.height, D, T), X.translate(a - V + E, z), b.push(X))), "bottom" == P ? (_ += $ + f / 2 + H, R ? (c > 0 ? (_ = $ - q / 2 * Math.sin(j) - N - 3, U += q / 2 * Math.cos(j) - 4 + 2) : 0 > c ? (_ = $ + q * Math.sin(j) - N - 3 + 2, U += -q * Math.cos(j) - Q * Math.sin(j) - 4) : _ -= N + f + 3 + 3, _ -= I) : (c > 0 ? (_ = $ + q / 2 * Math.sin(j) + N + 3, U -= q / 2 * Math.cos(j)) : 0 > c ? (_ = $ + N + 3 - q / 2 * Math.sin(j) + 2, U += q / 2 * Math.cos(j)) : _ += N + x + 3 + 3, _ += I)) : (_ += z + f / 2 - H, U += E, R ? (c > 0 ? (_ = q / 2 * Math.sin(j) + N + 3, U -= q / 2 * Math.cos(j)) : _ += N + 3, _ += I) : (c > 0 ? (_ = -(q / 2) * Math.sin(j) - N - 6, U += q / 2 * Math.cos(j)) : _ -= N + f + 3 + x + 3, _ -= I)), "bottom" == P ? V = (R ? $ - N - 1 : $ + x - 1) + H : (Z = E, V = (R ? z : z - N - x + 1) - H), o && (U += o), o = U, c > 0 && (o += q / 2 * Math.cos(j)), J && (f = 0, R && (f = q / 2 * Math.cos(j)), o + f > W + 2 || 0 > o) && (J.remove(), J = null)) : (i >= 0 && $ + 1 >= i && (N > 0 && y > 0 && $ + 1 >= i + l && (B = t.line(v, [0, N + 1], [i + l, i + l], C, y, S), b.push(B)), w > 0 && (L = t.line(v, [0, E, W + E], [i, i + z, i + z], A, w, S, M), b.push(L))), Y = "end", (!0 === R && "left" == P || !1 === R && "right" == P) && (Y = "start"), _ = i - Q / 2 + 2, 1 == O && T > 0 && !r && !d && (a = t.fitToBounds(i, 0, $), G = t.fitToBounds(G, 0, $), j = a - G, X = t.polygon(v, [0, e.width, e.width, 0], [0, 0, j, j], D, T), X.translate(E, a - j + z), b.push(X)), _ += f / 2, "right" == P ? (U += E + W + H, _ += z, R ? (o || (_ -= f / 2 + 3), U = U - (N + 4) - I) : (U += N + 4 + x, _ -= 2, U += I)) : R ? (U += N + 4 - H, o || (_ -= f / 2 + 3), r && (U += E, _ += z), U += I) : (U += -N - x - 4 - 2 - H, _ -= 2, U -= I), B && ("right" == P ? (Z += E + H + W - 1, V += z, Z = R ? Z - x : Z + x) : (Z -= H, R || (Z -= N + x))), o && (_ += o), R = -3, "right" == P && (R += z), J && (_ > $ + 1 || R > _) && (J.remove(), J = null)), B && (B.translate(Z, V), t.setCN(p, B, e.bcn + "tick"), t.setCN(p, B, u, !0), r && t.setCN(p, B, "guide")), !1 === e.visible && (B && B.remove(), J && (J.remove(), J = null)), J && (J.attr({
                "text-anchor": Y
            }), J.translate(U, _, NaN, !0), 0 !== c && J.rotate(-c, e.chart.backgroundColor), e.allLabels.push(J), this.label = J, t.setCN(p, J, e.bcn + "label"), t.setCN(p, J, u, !0), r && t.setCN(p, J, "guide")), L && (t.setCN(p, L, e.bcn + "grid"), t.setCN(p, L, u, !0), r && t.setCN(p, L, "guide")), X && (t.setCN(p, X, e.bcn + "fill"), t.setCN(p, X, u, !0)), d ? L && t.setCN(p, L, e.bcn + "grid-minor") : (e.counter = 0 === O ? 1 : 0, e.previousCoord = i), 0 === this.set.node.childNodes.length && this.set.remove()
        },
        graphics: function() {
            return this.set
        },
        getLabel: function() {
            return this.label
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.RecFill = t.Class({
        construct: function(e, i, s, a) {
            var n = e.dx,
                o = e.dy,
                r = e.orientation,
                h = 0;
            if (i > s) {
                var l = i;
                i = s, s = l
            }
            var d = a.fillAlpha;
            isNaN(d) && (d = 0);
            var l = e.chart.container,
                c = a.fillColor;
            "V" == r ? (i = t.fitToBounds(i, 0, e.viH), s = t.fitToBounds(s, 0, e.viH)) : (i = t.fitToBounds(i, 0, e.viW), s = t.fitToBounds(s, 0, e.viW)), s -= i, isNaN(s) && (s = 4, h = 2, d = 0), 0 > s && "object" == typeof c && (c = c.join(",").split(",").reverse()), "V" == r ? (r = t.rect(l, e.viW, s, c, d), r.translate(n, i - h + o)) : (r = t.rect(l, s, e.viH, c, d), r.translate(i - h + n, o)), t.setCN(e.chart, r, "guide-fill"), a.id && t.setCN(e.chart, r, "guide-fill-" + a.id), this.set = l.set([r])
        },
        graphics: function() {
            return this.set
        },
        getLabel: function() {}
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmChart = t.Class({
        construct: function(e) {
            this.svgIcons = this.tapToActivate = !0, this.theme = e, this.classNamePrefix = "amcharts", this.addClassNames = !1, this.version = "3.17.3", t.addChart(this), this.createEvents("dataUpdated", "init", "rendered", "drawn", "failed", "resized"), this.height = this.width = "100%", this.dataChanged = !0, this.chartCreated = !1, this.previousWidth = this.previousHeight = 0, this.backgroundColor = "#FFFFFF", this.borderAlpha = this.backgroundAlpha = 0, this.color = this.borderColor = "#000000", this.fontFamily = "Verdana", this.fontSize = 11, this.usePrefixes = !1, this.autoResize = !0, this.autoDisplay = !1, this.addCodeCredits = !0, this.precision = -1, this.percentPrecision = 2, this.decimalSeparator = ".", this.thousandsSeparator = ",", this.labels = [], this.allLabels = [], this.titles = [], this.marginRight = this.marginLeft = this.autoMarginOffset = 0, this.timeOuts = [], this.creditsPosition = "top-left";
            var i = document.createElement("div"),
                s = i.style;
            s.overflow = "hidden", s.position = "relative", s.textAlign = "left", this.chartDiv = i, i = document.createElement("div"), s = i.style, s.overflow = "hidden", s.position = "relative", s.textAlign = "left", this.legendDiv = i, this.titleHeight = 0, this.hideBalloonTime = 150, this.handDrawScatter = 2, this.handDrawThickness = 1, this.prefixesOfBigNumbers = [{
                number: 1e3,
                prefix: "k"
            }, {
                number: 1e6,
                prefix: "M"
            }, {
                number: 1e9,
                prefix: "G"
            }, {
                number: 1e12,
                prefix: "T"
            }, {
                number: 1e15,
                prefix: "P"
            }, {
                number: 1e18,
                prefix: "E"
            }, {
                number: 1e21,
                prefix: "Z"
            }, {
                number: 1e24,
                prefix: "Y"
            }], this.prefixesOfSmallNumbers = [{
                number: 1e-24,
                prefix: "y"
            }, {
                number: 1e-21,
                prefix: "z"
            }, {
                number: 1e-18,
                prefix: "a"
            }, {
                number: 1e-15,
                prefix: "f"
            }, {
                number: 1e-12,
                prefix: "p"
            }, {
                number: 1e-9,
                prefix: "n"
            }, {
                number: 1e-6,
                prefix: "μ"
            }, {
                number: .001,
                prefix: "m"
            }], this.panEventsEnabled = !0, this.product = "amcharts", this.animations = [], this.balloon = new t.AmBalloon(this.theme), this.balloon.chart = this, t.applyTheme(this, e, "AmChart")
        },
        drawChart: function() {
            0 < this.realWidth && 0 < this.realHeight && (this.drawBackground(), this.redrawLabels(), this.drawTitles(), this.brr(), this.renderFix(), this.chartDiv && (this.boundingRect = this.chartDiv.getBoundingClientRect()))
        },
        drawBackground: function() {
            t.remove(this.background);
            var e = this.container,
                i = this.backgroundColor,
                s = this.backgroundAlpha,
                a = this.set;
            t.isModern || 0 !== s || (s = .001);
            var n = this.updateWidth();
            this.realWidth = n;
            var o = this.updateHeight();
            this.realHeight = o, i = t.polygon(e, [0, n - 1, n - 1, 0], [0, 0, o - 1, o - 1], i, s, 1, this.borderColor, this.borderAlpha), t.setCN(this, i, "bg"), this.background = i, a.push(i), (i = this.backgroundImage) && (e = e.image(i, 0, 0, n, o), t.setCN(this, i, "bg-image"), this.bgImg = e, a.push(e))
        },
        drawTitles: function(e) {
            var i = this.titles;
            if (this.titleHeight = 0, t.ifArray(i)) {
                var s, a = 20;
                for (s = 0; s < i.length; s++) {
                    var n = i[s],
                        n = t.processObject(n, t.Title, this.theme);
                    if (!1 !== n.enabled) {
                        var o = n.color;
                        void 0 === o && (o = this.color);
                        var r = n.size;
                        isNaN(r) && (r = this.fontSize + 2), isNaN(n.alpha);
                        var h = this.marginLeft,
                            o = t.wrappedText(this.container, n.text, o, this.fontFamily, r, "middle", !1, this.divRealWidth - 32);
                        o.translate(h + (this.realWidth - this.marginRight - h) / 2, a), o.node.style.pointerEvents = "none", n.sprite = o, t.setCN(this, o, "title"), n.id && t.setCN(this, o, "title-" + n.id), h = !0, void 0 !== n.bold && (h = n.bold), h && o.attr({
                            "font-weight": "bold"
                        }), o.attr({
                            opacity: n.alpha
                        }), a += o.getBBox().height + 5, e ? o.remove() : this.freeLabelsSet.push(o)
                    }
                }
                this.titleHeight = a - 10
            }
        },
        write: function(e) {
            if (e = "object" != typeof e ? document.getElementById(e) : e) {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                this.div = e, e.style.overflow = "hidden", e.style.textAlign = "left";
                var i = this.chartDiv,
                    s = this.legendDiv,
                    a = this.legend,
                    n = s.style,
                    o = i.style;
                this.measure(), this.previousHeight = this.divRealHeight, this.previousWidth = this.divRealWidth;
                var r, h = document.createElement("div");
                r = h.style, r.position = "relative", this.containerDiv = h, h.className = this.classNamePrefix + "-main-div", i.className = this.classNamePrefix + "-chart-div", e.appendChild(h);
                var l = this.exportConfig;
                if (l && t.AmExport && !this.AmExport && (this.AmExport = new t.AmExport(this, l)), this.amExport && t.AmExport && (this.AmExport = t.extend(this.amExport, new t.AmExport(this), !0)), this.AmExport && this.AmExport.init && this.AmExport.init(), a)
                    if (a = this.addLegend(a, a.divId), a.enabled) switch (a.position) {
                        case "bottom":
                            h.appendChild(i), h.appendChild(s);
                            break;
                        case "top":
                            h.appendChild(s), h.appendChild(i);
                            break;
                        case "absolute":
                            r.width = e.style.width, r.height = e.style.height, n.position = "absolute", o.position = "absolute", void 0 !== a.left && (n.left = a.left + "px"), void 0 !== a.right && (n.right = a.right + "px"), void 0 !== a.top && (n.top = a.top + "px"), void 0 !== a.bottom && (n.bottom = a.bottom + "px"), a.marginLeft = 0, a.marginRight = 0, h.appendChild(i), h.appendChild(s);
                            break;
                        case "right":
                            r.width = e.style.width, r.height = e.style.height, n.position = "relative", o.position = "absolute", h.appendChild(i), h.appendChild(s);
                            break;
                        case "left":
                            r.width = e.style.width, r.height = e.style.height, n.position = "absolute", o.position = "relative", h.appendChild(i), h.appendChild(s);
                            break;
                        case "outside":
                            h.appendChild(i)
                    } else h.appendChild(i);
                    else h.appendChild(i);
                this.listenersAdded || (this.addListeners(), this.listenersAdded = !0), this.initChart()
            }
        },
        createLabelsSet: function() {
            t.remove(this.labelsSet), this.labelsSet = this.container.set(), this.freeLabelsSet.push(this.labelsSet)
        },
        initChart: function() {
            if (this.listeners)
                for (var e in this.listeners) {
                    var i = this.listeners[e];
                    this.addListener(i.event, i.method)
                }
            window.AmCharts_path && (this.path = window.AmCharts_path), void 0 === this.path && (this.path = t.getPath()), void 0 === this.path && (this.path = "amcharts/"), this.path = t.normalizeUrl(this.path), void 0 === this.pathToImages && (this.pathToImages = this.path + "images/"), this.initHC || (t.callInitHandler(this), this.initHC = !0), t.applyLang(this.language, this), (e = this.numberFormatter) && (isNaN(e.precision) || (this.precision = e.precision), void 0 !== e.thousandsSeparator && (this.thousandsSeparator = e.thousandsSeparator), void 0 !== e.decimalSeparator && (this.decimalSeparator = e.decimalSeparator)), (e = this.percentFormatter) && !isNaN(e.precision) && (this.percentPrecision = e.precision), this.nf = {
                precision: this.precision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            }, this.pf = {
                precision: this.percentPrecision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            }, this.destroy(), (e = this.container) ? (e.container.innerHTML = "", e.width = this.realWidth, e.height = this.realHeight, e.addDefs(this), this.chartDiv.appendChild(e.container)) : e = new t.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this), this.container = e, this.extension = ".png", this.svgIcons && t.SVG && (this.extension = ".svg"), this.checkDisplay(), e.chart = this, t.VML || t.SVG ? (e.handDrawn = this.handDrawn, e.handDrawScatter = this.handDrawScatter, e.handDrawThickness = this.handDrawThickness, this.set && this.set.remove(), this.set = e.set(), this.gridSet && this.gridSet.remove(), this.gridSet = e.set(), this.cursorLineSet && this.cursorLineSet.remove(), this.cursorLineSet = e.set(), this.graphsBehindSet && this.graphsBehindSet.remove(), this.graphsBehindSet = e.set(), this.bulletBehindSet && this.bulletBehindSet.remove(), this.bulletBehindSet = e.set(), this.columnSet && this.columnSet.remove(), this.columnSet = e.set(), this.graphsSet && this.graphsSet.remove(), this.graphsSet = e.set(), this.trendLinesSet && this.trendLinesSet.remove(), this.trendLinesSet = e.set(), this.axesSet && this.axesSet.remove(), this.axesSet = e.set(), this.cursorSet && this.cursorSet.remove(), this.cursorSet = e.set(), this.scrollbarsSet && this.scrollbarsSet.remove(), this.scrollbarsSet = e.set(), this.bulletSet && this.bulletSet.remove(), this.bulletSet = e.set(), this.freeLabelsSet && this.freeLabelsSet.remove(), this.axesLabelsSet && this.axesLabelsSet.remove(), this.axesLabelsSet = e.set(), this.freeLabelsSet = e.set(), this.balloonsSet && this.balloonsSet.remove(), this.balloonsSet = e.set(), this.zoomButtonSet && this.zoomButtonSet.remove(), this.zbSet && (this.zbSet.remove(), this.zbSet = null), this.zoomButtonSet = e.set(), this.linkSet && this.linkSet.remove(), this.linkSet = e.set()) : this.fire("failed", {
                type: "failed",
                chart: this
            })
        },
        premeasure: function() {
            var t = this.div;
            if (t) {
                this.boundingRect = this.chartDiv.getBoundingClientRect();
                var e = t.offsetWidth,
                    i = t.offsetHeight;
                t.clientHeight && (e = t.clientWidth, i = t.clientHeight), (e != this.mw || i != this.mh) && (this.mw = e, this.mh = i, this.measure())
            }
        },
        measure: function() {
            var e = this.div;
            if (e) {
                var i = this.chartDiv,
                    s = e.offsetWidth,
                    a = e.offsetHeight,
                    n = this.container;
                e.clientHeight && (s = e.clientWidth, a = e.clientHeight);
                var o = t.removePx(t.getStyle(e, "padding-left")),
                    r = t.removePx(t.getStyle(e, "padding-right")),
                    h = t.removePx(t.getStyle(e, "padding-top")),
                    l = t.removePx(t.getStyle(e, "padding-bottom"));
                isNaN(o) || (s -= o), isNaN(r) || (s -= r), isNaN(h) || (a -= h), isNaN(l) || (a -= l), o = e.style, e = o.width, o = o.height, -1 != e.indexOf("px") && (s = t.removePx(e)), -1 != o.indexOf("px") && (a = t.removePx(o)), a = Math.round(a), s = Math.round(s), e = Math.round(t.toCoordinate(this.width, s)), o = Math.round(t.toCoordinate(this.height, a)), (s != this.previousWidth || a != this.previousHeight) && e > 0 && o > 0 && (i.style.width = e + "px", i.style.height = o + "px", i.style.padding = 0, n && n.setSize(e, o), this.balloon = t.processObject(this.balloon, t.AmBalloon, this.theme), this.balloon.setBounds(2, 2, e - 2, o)), this.balloon.chart = this, this.realWidth = e, this.realHeight = o, this.divRealWidth = s, this.divRealHeight = a
            }
        },
        checkDisplay: function() {
            if (this.autoDisplay && this.container) {
                var e = t.rect(this.container, 10, 10),
                    i = e.getBBox();
                0 === i.width && 0 === i.height && (this.divRealHeight = this.divRealWidth = this.realHeight = this.realWidth = 0, this.previousWidth = this.previousHeight = NaN), e.remove()
            }
        },
        destroy: function() {
            this.chartDiv.innerHTML = "", this.clearTimeOuts(), this.legend && this.legend.destroy()
        },
        clearTimeOuts: function() {
            var t = this.timeOuts;
            if (t) {
                var e;
                for (e = 0; e < t.length; e++) clearTimeout(t[e])
            }
            this.timeOuts = []
        },
        clear: function(e) {
            if (t.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]), this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null, this.clearTimeOuts(), this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv)), e || t.removeChart(this), e = this.div)
                for (; e.firstChild;) e.removeChild(e.firstChild);
            this.legend && this.legend.destroy()
        },
        setMouseCursor: function(e) {
            "auto" == e && t.isNN && (e = "default"), this.chartDiv.style.cursor = e, this.legendDiv.style.cursor = e
        },
        redrawLabels: function() {
            this.labels = [];
            var t = this.allLabels;
            this.createLabelsSet();
            var e;
            for (e = 0; e < t.length; e++) this.drawLabel(t[e])
        },
        drawLabel: function(e) {
            if (this.container && !1 !== e.enabled) {
                e = t.processObject(e, t.Label, this.theme);
                var i = e.y,
                    s = e.text,
                    a = e.align,
                    n = e.size,
                    o = e.color,
                    r = e.rotation,
                    h = e.alpha,
                    l = e.bold,
                    d = t.toCoordinate(e.x, this.realWidth),
                    i = t.toCoordinate(i, this.realHeight);
                d || (d = 0), i || (i = 0), void 0 === o && (o = this.color), isNaN(n) && (n = this.fontSize), a || (a = "start"), "left" == a && (a = "start"), "right" == a && (a = "end"), "center" == a && (a = "middle", r ? i = this.realHeight - i + i / 2 : d = this.realWidth / 2 - d), void 0 === h && (h = 1), void 0 === r && (r = 0), i += n / 2, s = t.text(this.container, s, o, this.fontFamily, n, a, l, h), s.translate(d, i), t.setCN(this, s, "label"), e.id && t.setCN(this, s, "label-" + e.id), 0 !== r && s.rotate(r), e.url ? (s.setAttr("cursor", "pointer"), s.click(function() {
                    t.getURL(e.url)
                })) : s.node.style.pointerEvents = "none", this.labelsSet.push(s), this.labels.push(s)
            }
        },
        addLabel: function(t, e, i, s, a, n, o, r, h, l) {
            t = {
                x: t,
                y: e,
                text: i,
                align: s,
                size: a,
                color: n,
                alpha: r,
                rotation: o,
                bold: h,
                url: l,
                enabled: !0
            }, this.container && this.drawLabel(t), this.allLabels.push(t)
        },
        clearLabels: function() {
            var t, e = this.labels;
            for (t = e.length - 1; t >= 0; t--) e[t].remove();
            this.labels = [], this.allLabels = []
        },
        updateHeight: function() {
            var t = this.divRealHeight,
                e = this.legend;
            if (e) {
                var i = this.legendDiv.offsetHeight,
                    e = e.position;
                ("top" == e || "bottom" == e) && (t -= i, (0 > t || isNaN(t)) && (t = 0), this.chartDiv.style.height = t + "px")
            }
            return t
        },
        updateWidth: function() {
            var t = this.divRealWidth,
                e = this.divRealHeight,
                i = this.legend;
            if (i) {
                var s = this.legendDiv,
                    a = s.offsetWidth;
                isNaN(i.width) || (a = i.width), i.ieW && (a = i.ieW);
                var n = s.offsetHeight,
                    s = s.style,
                    o = this.chartDiv.style,
                    i = i.position;
                ("right" == i || "left" == i) && (t -= a, (0 > t || isNaN(t)) && (t = 0), o.width = t + "px", this.balloon.setBounds(2, 2, t - 2, this.realHeight), "left" == i ? (o.left = a + "px", s.left = "0px") : (o.left = "0px", s.left = t + "px"), e > n && (s.top = (e - n) / 2 + "px"))
            }
            return t
        },
        getTitleHeight: function() {
            return this.drawTitles(!0), this.titleHeight
        },
        addTitle: function(t, e, i, s, a) {
            return isNaN(e) && (e = this.fontSize + 2), t = {
                text: t,
                size: e,
                color: i,
                alpha: s,
                bold: a,
                enabled: !0
            }, this.titles.push(t), t
        },
        handleWheel: function(t) {
            var e = 0;
            t || (t = window.event), t.wheelDelta ? e = t.wheelDelta / 120 : t.detail && (e = -t.detail / 3), e && this.handleWheelReal(e, t.shiftKey), t.preventDefault && t.preventDefault()
        },
        handleWheelReal: function() {},
        handleDocTouchStart: function() {
            this.hideBalloonReal(), this.handleMouseMove(), this.tmx = this.mouseX, this.tmy = this.mouseY
        },
        handleDocTouchEnd: function() {
            -.5 < this.tmx && this.tmx < this.divRealWidth + 1 && 0 < this.tmy && this.tmy < this.divRealHeight ? (this.handleMouseMove(), 4 > Math.abs(this.mouseX - this.tmx) && 4 > Math.abs(this.mouseY - this.tmy) && (this.tapped = !0)) : this.tapped = !1
        },
        addListeners: function() {
            var t = this,
                e = t.chartDiv;
            document.addEventListener ? (t.panEventsEnabled && (e.style.msTouchAction = "none"), "ontouchstart" in document.documentElement && (e.addEventListener("touchstart", function(e) {
                t.handleTouchStart.call(t, e)
            }, !0), e.addEventListener("touchmove", function(e) {
                t.handleMouseMove.call(t, e)
            }, !0), e.addEventListener("touchend", function(e) {
                t.handleTouchEnd.call(t, e)
            }, !0), document.addEventListener("touchstart", function(e) {
                t.handleDocTouchStart.call(t, e)
            }), document.addEventListener("touchend", function(e) {
                t.handleDocTouchEnd.call(t, e)
            })), e.addEventListener("mousedown", function(e) {
                t.mouseIsOver = !0, t.handleMouseMove.call(t, e), t.handleMouseDown.call(t, e)
            }, !0), e.addEventListener("mouseover", function(e) {
                t.handleMouseOver.call(t, e)
            }, !0), e.addEventListener("mouseout", function(e) {
                t.handleMouseOut.call(t, e)
            }, !0)) : (e.attachEvent("onmousedown", function(e) {
                t.handleMouseDown.call(t, e)
            }), e.attachEvent("onmouseover", function(e) {
                t.handleMouseOver.call(t, e)
            }), e.attachEvent("onmouseout", function(e) {
                t.handleMouseOut.call(t, e)
            }))
        },
        dispDUpd: function() {
            if (!this.skipEvents) {
                var t;
                this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, t = "dataUpdated", this.fire(t, {
                    type: t,
                    chart: this
                })), this.chartCreated || (this.chartCreated = !0,
                    t = "init", this.fire(t, {
                        type: t,
                        chart: this
                    })), this.chartRendered || (t = "rendered", this.fire(t, {
                    type: t,
                    chart: this
                }), this.chartRendered = !0), t = "drawn", this.fire(t, {
                    type: t,
                    chart: this
                })
            }
            this.skipEvents = !1
        },
        validateSize: function() {
            var t = this;
            if (t.premeasure(), t.checkDisplay(), t.divRealWidth != t.previousWidth || t.divRealHeight != t.previousHeight) {
                var e = t.legend;
                if (0 < t.realWidth && 0 < t.realHeight) {
                    if (t.sizeChanged = !0, e) {
                        t.legendInitTO && clearTimeout(t.legendInitTO);
                        var i = setTimeout(function() {
                            e.invalidateSize()
                        }, 10);
                        t.timeOuts.push(i), t.legendInitTO = i
                    }
                    "xy" != t.type ? t.marginsUpdated = !1 : (t.marginsUpdated = !0, t.selfZoom = !0), clearTimeout(t.initTO), i = setTimeout(function() {
                        t.initChart()
                    }, 10), t.timeOuts.push(i), t.initTO = i
                }
                t.fire("resized", {
                    type: "resized",
                    chart: t
                }), t.renderFix(), e && e.renderFix && e.renderFix(), t.previousHeight = t.divRealHeight, t.previousWidth = t.divRealWidth
            }
        },
        invalidateSize: function() {
            this.previousHeight = this.previousWidth = NaN, this.invalidateSizeReal()
        },
        invalidateSizeReal: function() {
            var t = this;
            t.marginsUpdated = !1, clearTimeout(t.validateTO);
            var e = setTimeout(function() {
                t.validateSize()
            }, 5);
            t.timeOuts.push(e), t.validateTO = e
        },
        validateData: function(t) {
            this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(t))
        },
        validateNow: function(t, e) {
            this.initTO && clearTimeout(this.initTO), t && (this.dataChanged = !0, this.marginsUpdated = !1), this.skipEvents = e, this.chartRendered = !1, this.write(this.div)
        },
        showItem: function(t) {
            t.hidden = !1, this.initChart()
        },
        hideItem: function(t) {
            t.hidden = !0, this.initChart()
        },
        hideBalloon: function() {
            var t = this;
            clearTimeout(t.hoverInt), clearTimeout(t.balloonTO), t.hoverInt = setTimeout(function() {
                t.hideBalloonReal.call(t)
            }, t.hideBalloonTime)
        },
        cleanChart: function() {},
        hideBalloonReal: function() {
            var t = this.balloon;
            t && t.hide()
        },
        showBalloon: function(t, e, i, s, a) {
            var n = this;
            clearTimeout(n.balloonTO), clearTimeout(n.hoverInt), n.balloonTO = setTimeout(function() {
                n.showBalloonReal.call(n, t, e, i, s, a)
            }, 1)
        },
        showBalloonReal: function(t, e, i, s, a) {
            this.handleMouseMove();
            var n = this.balloon;
            n.enabled && (n.followCursor(!1), n.changeColor(e), !i || n.fixedPosition ? (n.setPosition(s, a), isNaN(s) || isNaN(a) ? n.followCursor(!0) : n.followCursor(!1)) : n.followCursor(!0), t && n.showBalloon(t))
        },
        handleMouseOver: function() {
            this.outTO && clearTimeout(this.outTO), t.resetMouseOver(), this.mouseIsOver = !0
        },
        handleMouseOut: function() {
            var t = this;
            t.outTO && clearTimeout(t.outTO), t.outTO = setTimeout(function() {
                t.handleMouseOutReal()
            }, 10)
        },
        handleMouseOutReal: function() {
            t.resetMouseOver(), this.mouseIsOver = !1
        },
        handleMouseMove: function(t) {
            if (t || (t = window.event), t) {
                if (t.touches) {
                    if (t = t.touches.item(0), !t) return
                } else this.wasTouched = !1;
                this.boundingRect && t.clientX && (this.mouseX = t.clientX - this.boundingRect.left, this.mouseY = t.clientY - this.boundingRect.top)
            }
        },
        handleTouchStart: function(t) {
            this.hideBalloonReal(), t && (t.touches && this.tapToActivate && !this.tapped || !this.panRequired) || (this.handleMouseMove(t), this.handleMouseDown(t))
        },
        handleTouchEnd: function(e) {
            this.wasTouched = !0, this.handleMouseMove(e), t.resetMouseOver(), this.handleReleaseOutside(e)
        },
        handleReleaseOutside: function() {},
        handleMouseDown: function(e) {
            t.resetMouseOver(), this.mouseIsOver = !0, e && e.preventDefault && (this.panEventsEnabled ? e.preventDefault() : e.touches || e.preventDefault())
        },
        addLegend: function(e, i) {
            e = t.processObject(e, t.AmLegend, this.theme), e.divId = i, e.ieW = 0;
            var s;
            return s = "object" != typeof i && i ? document.getElementById(i) : i, this.legend = e, e.chart = this, s ? (e.div = s, e.position = "outside", e.autoMargins = !1) : e.div = this.legendDiv, e
        },
        removeLegend: function() {
            this.legend = void 0, this.legendDiv.innerHTML = ""
        },
        handleResize: function() {
            (t.isPercents(this.width) || t.isPercents(this.height)) && this.invalidateSizeReal(), this.renderFix()
        },
        renderFix: function() {
            if (!t.VML) {
                var e = this.container;
                e && e.renderFix()
            }
        },
        getSVG: function() {
            return t.hasSVG ? this.container : void 0
        },
        animate: function(e, i, s, a, n, o, r) {
            return e["an_" + i] && t.removeFromArray(this.animations, e["an_" + i]), s = {
                obj: e,
                frame: 0,
                attribute: i,
                from: s,
                to: a,
                time: n,
                effect: o,
                suffix: r
            }, e["an_" + i] = s, this.animations.push(s), s
        },
        setLegendData: function(t) {
            var e = this.legend;
            e && e.setData(t)
        },
        stopAnim: function(e) {
            t.removeFromArray(this.animations, e)
        },
        updateAnimations: function() {
            var e;
            if (this.container && this.container.update(), this.animations)
                for (e = this.animations.length - 1; e >= 0; e--) {
                    var i = this.animations[e],
                        s = 1e3 * i.time / t.updateRate,
                        a = i.frame + 1,
                        n = i.obj,
                        o = i.attribute;
                    if (s >= a) {
                        i.frame++;
                        var r = Number(i.from),
                            h = Number(i.to) - r,
                            s = t[i.effect](0, a, r, h, s);
                        0 === h ? (this.animations.splice(e, 1), n.node.style[o] = Number(i.to) + i.suffix) : n.node.style[o] = s + i.suffix
                    } else n.node.style[o] = Number(i.to) + i.suffix, this.animations.splice(e, 1)
                }
        },
        update: function() {
            this.updateAnimations()
        },
        inIframe: function() {
            try {
                return window.self !== window.top
            } catch (t) {
                return !0
            }
        },
        brr: function() {
            if (!this.hideCredits) {
                var t, e = "amcharts.com",
                    i = window.location.hostname.split(".");
                if (2 <= i.length && (t = i[i.length - 2] + "." + i[i.length - 1]), this.amLink && (i = this.amLink.parentNode) && i.removeChild(this.amLink), i = this.creditsPosition, t != e || !0 === this.inIframe()) {
                    var e = "http://www." + e,
                        s = t = 0,
                        a = this.realWidth,
                        n = this.realHeight,
                        o = this.type;
                    ("serial" == o || "xy" == o || "gantt" == o) && (t = this.marginLeftReal, s = this.marginTopReal, a = t + this.plotAreaWidth, n = s + this.plotAreaHeight);
                    var o = e + "/javascript-charts/",
                        r = "JavaScript charts",
                        h = "JS chart by amCharts";
                    "ammap" == this.product && (o = e + "/javascript-maps/", r = "Interactive JavaScript maps", h = "JS map by amCharts"), e = document.createElement("a"), h = document.createTextNode(h), e.setAttribute("href", o), e.setAttribute("title", r), e.appendChild(h), this.chartDiv.appendChild(e), this.amLink = e, o = e.style, o.position = "absolute", o.textDecoration = "none", o.color = this.color, o.fontFamily = this.fontFamily, o.fontSize = this.fontSize + "px", o.opacity = .7, o.display = "block";
                    var r = e.offsetWidth,
                        e = e.offsetHeight,
                        h = 5 + t,
                        l = s + 5;
                    "bottom-left" == i && (h = 5 + t, l = n - e - 3), "bottom-right" == i && (h = a - r - 5, l = n - e - 3), "top-right" == i && (h = a - r - 5, l = s + 5), o.left = h + "px", o.top = l + "px"
                }
            }
        }
    }), t.Slice = t.Class({
        construct: function() {}
    }), t.SerialDataItem = t.Class({
        construct: function() {}
    }), t.GraphDataItem = t.Class({
        construct: function() {}
    }), t.Guide = t.Class({
        construct: function(e) {
            this.cname = "Guide", t.applyTheme(this, e, this.cname)
        }
    }), t.Title = t.Class({
        construct: function(e) {
            this.cname = "Title", t.applyTheme(this, e, this.cname)
        }
    }), t.Label = t.Class({
        construct: function(e) {
            this.cname = "Label", t.applyTheme(this, e, this.cname)
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmGraph = t.Class({
        construct: function(e) {
            this.cname = "AmGraph", this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph"), this.type = "line", this.stackable = !0, this.columnCount = 1, this.columnIndex = 0, this.centerCustomBullets = this.showBalloon = !0, this.maxBulletSize = 50, this.minBulletSize = 4, this.balloonText = "[[value]]", this.hidden = this.scrollbar = this.animationPlayed = !1, this.pointPosition = "middle", this.depthCount = 1, this.includeInMinMax = !0, this.negativeBase = 0, this.visibleInLegend = !0, this.showAllValueLabels = !1, this.showBulletsAt = this.showBalloonAt = "close", this.lineThickness = 1, this.dashLength = 0, this.connect = !0, this.lineAlpha = 1, this.bullet = "none", this.bulletBorderThickness = 2, this.bulletBorderAlpha = 0, this.bulletAlpha = 1, this.bulletSize = 8, this.cornerRadiusTop = this.hideBulletsCount = this.bulletOffset = 0, this.cursorBulletAlpha = 1, this.gradientOrientation = "vertical", this.dy = this.dx = 0, this.periodValue = "", this.clustered = !0, this.periodSpan = 1, this.y = this.x = 0, this.switchable = !0, this.tcc = this.minDistance = 1, this.labelRotation = 0, this.labelAnchor = "auto", this.labelOffset = 3, this.bcn = "graph-", this.dateFormat = "MMM DD, YYYY", this.noRounding = !0, t.applyTheme(this, e, this.cname)
        },
        draw: function() {
            var e = this.chart,
                i = e.type;
            isNaN(this.precision) || (this.numberFormatter ? this.numberFormatter.precision = this.precision : this.numberFormatter = {
                precision: this.precision,
                decimalSeparator: e.decimalSeparator,
                thousandsSeparator: e.thousandsSeparator
            });
            var s = e.container;
            this.container = s, this.destroy();
            var a = s.set(),
                n = s.set();
            this.behindColumns ? (e.graphsBehindSet.push(a), e.bulletBehindSet.push(n)) : (e.graphsSet.push(a), e.bulletSet.push(n));
            var o = this.bulletAxis;
            if (t.isString(o) && (this.bulletAxis = e.getValueAxisById(o)), this.bulletSet = n, !this.scrollbar) {
                var o = e.marginLeftReal,
                    r = e.marginTopReal;
                a.translate(o, r), n.translate(o, r)
            }
            s = s.set(), t.remove(this.columnsSet), a.push(s), this.set = a, t.setCN(e, a, "graph-" + this.type), t.setCN(e, a, "graph-" + this.id), t.setCN(e, n, "graph-" + this.type), t.setCN(e, n, "graph-" + this.id), this.columnsSet = s, this.columnsArray = [], this.ownColumns = [], this.allBullets = [], this.animationArray = [], a = this.labelPosition, a || (n = this.valueAxis.stackType, a = "top", "column" == this.type && (e.rotate && (a = "right"), "100%" == n || "regular" == n) && (a = "middle"), this.labelPosition = a), t.ifArray(this.data) && (e = !1, "xy" == i ? this.xAxis.axisCreated && this.yAxis.axisCreated && (e = !0) : this.valueAxis.axisCreated && (e = !0), !this.hidden && e && this.createGraph())
        },
        createGraph: function() {
            var e = this,
                i = e.chart;
            e.startAlpha = i.startAlpha, e.seqAn = i.sequencedAnimation, e.baseCoord = e.valueAxis.baseCoord, void 0 === e.fillAlphas && (e.fillAlphas = 0), e.bulletColorR = e.bulletColor, void 0 === e.bulletColorR && (e.bulletColorR = e.lineColorR, e.bulletColorNegative = e.negativeLineColor), void 0 === e.bulletAlpha && (e.bulletAlpha = e.lineAlpha), ("step" == s || t.VML) && (e.noRounding = !1);
            var s = i.type;
            if ("gantt" == s && (s = "serial"), clearTimeout(e.playedTO), !isNaN(e.valueAxis.min) && !isNaN(e.valueAxis.max)) {
                switch (s) {
                    case "serial":
                        e.categoryAxis && (e.createSerialGraph(), "candlestick" == e.type && 1 > e.valueAxis.minMaxMultiplier && e.positiveClip(e.set));
                        break;
                    case "radar":
                        e.createRadarGraph();
                        break;
                    case "xy":
                        e.createXYGraph(), e.positiveClip(e.set)
                }
                e.playedTO = setTimeout(function() {
                    e.setAnimationPlayed.call(e)
                }, 500 * e.chart.startDuration)
            }
        },
        setAnimationPlayed: function() {
            this.animationPlayed = !0
        },
        createXYGraph: function() {
            var t = [],
                e = [],
                i = this.xAxis,
                s = this.yAxis;
            this.pmh = s.viH + 1, this.pmw = i.viW + 1, this.pmy = this.pmx = 0;
            var a;
            for (a = this.start; a <= this.end; a++) {
                var n = this.data[a].axes[i.id].graphs[this.id],
                    o = n.values,
                    r = o.x,
                    h = o.y,
                    o = i.getCoordinate(r, this.noRounding),
                    l = s.getCoordinate(h, this.noRounding);
                !isNaN(r) && !isNaN(h) && (t.push(o), e.push(l), n.x = o, n.y = l, r = this.createBullet(n, o, l, a), h = this.labelText) && (n = this.createLabel(n, o, l, h), this.positionLabel(o, l, n, r), this.allBullets.push(n))
            }
            this.drawLineGraph(t, e), this.launchAnimation()
        },
        createRadarGraph: function() {
            var t, e, i, s, a, n = this.valueAxis.stackType,
                o = [],
                r = [],
                h = [],
                l = [];
            for (a = this.start; a <= this.end; a++) {
                var d, c, u = this.data[a].axes[this.valueAxis.id].graphs[this.id];
                if ("none" == n || "3d" == n ? d = u.values.value : (d = u.values.close, c = u.values.open), isNaN(d)) this.connect || (this.drawLineGraph(o, r, h, l), o = [], r = [], h = [], l = []);
                else {
                    var p = this.y - (this.valueAxis.getCoordinate(d, this.noRounding) - this.height),
                        p = p * this.valueAxis.rMultiplier,
                        m = 180 - 360 / (this.end - this.start + 1) * a;
                    if ("middle" == this.valueAxis.pointPosition && (m -= 180 / (this.end - this.start + 1)), d = p * Math.sin(m / 180 * Math.PI), p *= Math.cos(m / 180 * Math.PI), o.push(d), r.push(p), !isNaN(c)) {
                        var f = this.y - (this.valueAxis.getCoordinate(c, this.noRounding) - this.height),
                            f = f * this.valueAxis.rMultiplier,
                            g = f * Math.sin(m / 180 * Math.PI),
                            m = f * Math.cos(m / 180 * Math.PI);
                        h.push(g), l.push(m), isNaN(i) && (i = g), isNaN(s) && (s = m)
                    }
                    m = this.createBullet(u, d, p, a), u.x = d, u.y = p, (g = this.labelText) && (u = this.createLabel(u, d, p, g), this.positionLabel(d, p, u, m), this.allBullets.push(u)), isNaN(t) && (t = d), isNaN(e) && (e = p)
                }
            }
            o.push(t), r.push(e), isNaN(i) || (h.push(i), l.push(s)), this.drawLineGraph(o, r, h, l), this.launchAnimation()
        },
        positionLabel: function(t, e, i, s) {
            var a = "middle",
                n = !1,
                o = this.labelPosition,
                r = i.getBBox();
            if (s) {
                var h = s.graphDataItem,
                    l = this.chart.rotate,
                    d = h.isNegative,
                    c = this.chart,
                    u = this.valueAxis;
                switch (e -= r.height / 4 / 2, void 0 !== h.labelIsNegative && (d = h.labelIsNegative), o) {
                    case "top":
                        o = l ? "top" : d ? "bottom" : "top";
                        break;
                    case "right":
                        o = l && d ? "left" : "right";
                        break;
                    case "bottom":
                        o = l ? "bottom" : d ? "top" : "bottom";
                        break;
                    case "left":
                        o = l && d ? "right" : "left"
                }
                var p = h.columnGraphics,
                    m = 0,
                    f = 0;
                p && (m = p.x, f = p.y);
                var g = this.labelOffset;
                switch (o) {
                    case "top":
                        e = u.reversed ? e + (s.size / 2 + r.height / 2 + g) : e - (s.size / 2 + r.height / 2 + g);
                        break;
                    case "right":
                        a = "start", t += s.size / 2 + g;
                        break;
                    case "bottom":
                        e = u.reversed ? e - (s.size / 2 + r.height / 2 + g) : e + (s.size / 2 + r.height / 2 + g);
                        break;
                    case "left":
                        a = "end", t -= s.size / 2 + g;
                        break;
                    case "inside":
                        "column" == this.type && (n = !0, l ? d ? (a = "end", t = m - 3 - g) : (a = "start", t = m + 3 + g) : e = d ? f + 7 + g : f - 10 - g);
                        break;
                    case "middle":
                        "column" == this.type && (n = !0, l ? t -= (t - m) / 2 + g - 3 : e -= (e - f) / 2 + g - 3)
                }
                return "auto" != this.labelAnchor && (a = this.labelAnchor), i.attr({
                    "text-anchor": a
                }), this.labelRotation && i.rotate(this.labelRotation), i.translate(t, e), r = i.getBBox(), !this.showAllValueLabels && p && n && (r.height > h.columnHeight || r.width > h.columnWidth) && (i.remove(), i = !1), !i || "serial" != c.type && "gantt" != c.type || (l ? (0 > e || e > this.height) && (i.remove(), i = !1) : (0 > t || t > this.width) && (i.remove(), i = !1)), i
            }
        },
        getGradRotation: function() {
            var t = 270;
            return "horizontal" == this.gradientOrientation && (t = 0), this.gradientRotation = t
        },
        createSerialGraph: function() {
            this.dashLengthSwitched = this.fillColorsSwitched = this.lineColorSwitched = void 0;
            var e = this.chart,
                i = this.id,
                s = this.index,
                a = this.data,
                n = this.chart.container,
                o = this.valueAxis,
                r = this.type,
                h = this.columnWidthReal,
                l = this.showBulletsAt;
            isNaN(this.columnWidth) || (h = this.columnWidth), isNaN(h) && (h = .8);
            var d, c, u, p, m, f = this.useNegativeColorIfDown,
                g = this.width,
                v = this.height,
                b = this.y,
                x = this.rotate,
                C = this.columnCount,
                y = t.toCoordinate(this.cornerRadiusTop, h / 2),
                N = this.connect,
                w = [],
                S = [],
                A = this.chart.graphs.length,
                M = this.dx / this.tcc,
                D = this.dy / this.tcc,
                T = o.stackType,
                k = this.start,
                B = this.end,
                L = this.scrollbar,
                O = "graph-column-";
            L && (O = "scrollbar-graph-column-");
            var R, I = this.categoryAxis,
                E = this.baseCoord,
                z = this.negativeBase,
                F = this.columnIndex,
                P = this.lineThickness,
                G = this.lineAlpha,
                $ = this.lineColorR,
                W = this.dashLength,
                H = this.set,
                Y = this.getGradRotation(),
                V = this.chart.columnSpacing,
                X = I.cellWidth,
                j = (X * h - C) / C;
            V > j && (V = j);
            var U, _, Z, q, Q, J, K, tt = v + 1,
                et = g + 1,
                it = 0,
                st = 0,
                at = this.fillColorsR,
                nt = this.negativeFillColors,
                ot = this.negativeLineColor,
                rt = this.fillAlphas,
                ht = this.negativeFillAlphas;
            "object" == typeof rt && (rt = rt[0]), "object" == typeof ht && (ht = ht[0]);
            var lt = this.noRounding;
            "step" == r && (lt = !1);
            var dt = o.getCoordinate(o.min);
            if (o.logarithmic && (dt = o.getCoordinate(o.minReal)), this.minCoord = dt, this.resetBullet && (this.bullet = "none"), !(L || "line" != r && "smoothedLine" != r && "step" != r || (1 == a.length && "step" != r && "none" == this.bullet && (this.bullet = "round", this.resetBullet = !0), !nt && void 0 == ot || f))) {
                var ct = z;
                ct > o.max && (ct = o.max), ct < o.min && (ct = o.min), o.logarithmic && (ct = o.minReal);
                var ut = o.getCoordinate(ct),
                    pt = o.getCoordinate(o.max);
                x ? (tt = v, et = Math.abs(pt - ut) + 1, q = v, Q = Math.abs(dt - ut) + 1, K = st = 0, o.reversed ? (it = 0, J = ut) : (it = ut, J = 0)) : (et = g, tt = Math.abs(pt - ut) + 1, Q = g, q = Math.abs(dt - ut) + 1, J = it = 0, o.reversed ? (K = b, st = ut) : K = ut + 1)
            }
            var mt = Math.round;
            this.pmx = mt(it), this.pmy = mt(st), this.pmh = mt(tt), this.pmw = mt(et), this.nmx = mt(J), this.nmy = mt(K), this.nmh = mt(q), this.nmw = mt(Q), t.isModern || (this.nmy = this.nmx = 0, this.nmh = this.height), this.clustered || (C = 1), h = "column" == r ? (X * h - V * (C - 1)) / C : X * h, 1 > h && (h = 1);
            var ft = this.fixedColumnWidth;
            isNaN(ft) || (h = ft);
            var gt;
            if ("line" == r || "step" == r || "smoothedLine" == r) {
                if (k > 0) {
                    for (gt = k - 1; gt > -1; gt--)
                        if (U = a[gt], _ = U.axes[o.id].graphs[i], Z = _.values.value, !isNaN(Z)) {
                            k = gt;
                            break
                        }
                    if (this.lineColorField)
                        for (gt = k; gt > -1; gt--)
                            if (U = a[gt], _ = U.axes[o.id].graphs[i], _.lineColor) {
                                this.bulletColorSwitched = this.lineColorSwitched = _.lineColor;
                                break
                            }
                    if (this.fillColorsField)
                        for (gt = k; gt > -1; gt--)
                            if (U = a[gt], _ = U.axes[o.id].graphs[i], _.fillColors) {
                                this.fillColorsSwitched = _.fillColors;
                                break
                            }
                    if (this.dashLengthField)
                        for (gt = k; gt > -1; gt--)
                            if (U = a[gt], _ = U.axes[o.id].graphs[i], !isNaN(_.dashLength)) {
                                this.dashLengthSwitched = _.dashLength;
                                break
                            }
                }
                if (B < a.length - 1)
                    for (gt = B + 1; gt < a.length; gt++)
                        if (U = a[gt], _ = U.axes[o.id].graphs[i], Z = _.values.value, !isNaN(Z)) {
                            B = gt;
                            break
                        }
            }
            B < a.length - 1 && B++;
            var vt = [],
                bt = [],
                xt = !1;
            ("line" == r || "step" == r || "smoothedLine" == r) && (this.stackable && "regular" == T || "100%" == T || this.fillToGraph) && (xt = !0);
            var Ct = this.noStepRisers,
                yt = -1e3,
                Nt = -1e3,
                wt = this.minDistance,
                St = !0,
                At = !1,
                Mt = 0,
                Dt = 0;
            for (gt = k; B >= gt; gt++) {
                U = a[gt], _ = U.axes[o.id].graphs[i], _.index = gt;
                var Tt, kt = NaN;
                if (f && void 0 == this.openField)
                    for (var Bt = gt + 1; Bt < a.length && (!a[Bt] || !(Tt = a[gt + 1].axes[o.id].graphs[i]) || !Tt.values || (kt = Tt.values.value, isNaN(kt))); Bt++);
                var Lt, Ot, Rt, It, Et, zt, Ft = NaN,
                    Pt = NaN,
                    Gt = NaN,
                    $t = NaN,
                    Wt = NaN,
                    Ht = NaN,
                    Yt = NaN,
                    Vt = NaN,
                    Xt = NaN,
                    jt = NaN,
                    Ut = NaN,
                    _t = NaN,
                    Zt = NaN,
                    qt = NaN,
                    Qt = NaN,
                    Jt = NaN,
                    Kt = NaN,
                    te = void 0,
                    ee = at,
                    ie = rt,
                    se = $,
                    ae = this.proCandlesticks,
                    ne = this.topRadius,
                    oe = this.pattern;
                void 0 != _.pattern && (oe = _.pattern), isNaN(_.alpha) || (ie = _.alpha), isNaN(_.dashLength) || (W = _.dashLength);
                var re = _.values;
                if (o.recalculateToPercents && (re = _.percents), re) {
                    if (qt = this.stackable && "none" != T && "3d" != T ? re.close : re.value, ("candlestick" == r || "ohlc" == r) && (qt = re.close, Jt = re.low, Yt = o.getCoordinate(Jt), Qt = re.high, Xt = o.getCoordinate(Qt)), Kt = re.open, Gt = o.getCoordinate(qt, lt), isNaN(Kt) || (Wt = o.getCoordinate(Kt, lt), f && "regular" != T && "100%" != T && (kt = Kt, Kt = Wt = NaN)), f && (void 0 == this.openField ? Tt && (Tt.isNegative = qt > kt ? !0 : !1, isNaN(kt) && (_.isNegative = !St)) : _.isNegative = kt > qt ? !0 : !1), !L) switch (this.showBalloonAt) {
                        case "close":
                            _.y = Gt;
                            break;
                        case "open":
                            _.y = Wt;
                            break;
                        case "high":
                            _.y = Xt;
                            break;
                        case "low":
                            _.y = Yt
                    }
                    var Ft = U.x[I.id],
                        he = this.periodSpan - 1;
                    "step" != r || isNaN(U.cellWidth) || (X = U.cellWidth);
                    var le = Math.floor(X / 2) + Math.floor(he * X / 2),
                        de = le,
                        ce = 0;
                    if ("left" == this.stepDirection && (ce = (2 * X + he * X) / 2, Ft -= ce), "center" == this.stepDirection && (ce = X / 2, Ft -= ce), "start" == this.pointPosition && (Ft -= X / 2 + Math.floor(he * X / 2), le = 0, de = Math.floor(X) + Math.floor(he * X)), "end" == this.pointPosition && (Ft += X / 2 + Math.floor(he * X / 2), le = Math.floor(X) + Math.floor(he * X), de = 0), Ct) {
                        var ue = this.columnWidth;
                        isNaN(ue) || (le *= ue, de *= ue)
                    }
                    L || (_.x = Ft), -1e5 > Ft && (Ft = -1e5), Ft > g + 1e5 && (Ft = g + 1e5), x ? (Pt = Gt, $t = Wt, Wt = Gt = Ft, isNaN(Kt) && !this.fillToGraph && ($t = E), Ht = Yt, Vt = Xt) : ($t = Pt = Ft, isNaN(Kt) && !this.fillToGraph && (Wt = E)), (!ae && Kt > qt || ae && R > qt) && (_.isNegative = !0, nt && (ee = nt), ht && (ie = ht), void 0 != ot && (se = ot)), At = !1, isNaN(qt) || (f ? qt > kt ? (St && (At = !0), St = !1) : (St || (At = !0), St = !0) : _.isNegative = z > qt ? !0 : !1, R = qt);
                    var pe = !1;
                    switch (L && e.chartScrollbar.ignoreCustomColors && (pe = !0), pe || (void 0 != _.color && (ee = _.color), _.fillColors && (ee = _.fillColors)), r) {
                        case "line":
                            isNaN(qt) ? N || (this.drawLineGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = []) : ((Math.abs(Pt - yt) >= wt || Math.abs(Gt - Nt) >= wt) && (w.push(Pt), S.push(Gt), yt = Pt, Nt = Gt), jt = Pt, Ut = Gt, _t = Pt, Zt = Gt, !xt || isNaN(Wt) || isNaN($t) || (vt.push($t), bt.push(Wt)), (At || void 0 != _.lineColor || void 0 != _.fillColors || !isNaN(_.dashLength)) && (this.drawLineGraph(w, S, vt, bt), w = [Pt], S = [Gt], vt = [], bt = [], !xt || isNaN(Wt) || isNaN($t) || (vt.push($t), bt.push(Wt)), f ? St ? (this.lineColorSwitched = $, this.fillColorsSwitched = at) : (this.lineColorSwitched = ot, this.fillColorsSwitched = nt) : (this.lineColorSwitched = _.lineColor, this.fillColorsSwitched = _.fillColors), this.dashLengthSwitched = _.dashLength), _.gap && (this.drawLineGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = []));
                            break;
                        case "smoothedLine":
                            isNaN(qt) ? N || (this.drawSmoothedGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = []) : ((Math.abs(Pt - yt) >= wt || Math.abs(Gt - Nt) >= wt) && (w.push(Pt), S.push(Gt), yt = Pt, Nt = Gt), jt = Pt, Ut = Gt, _t = Pt, Zt = Gt, !xt || isNaN(Wt) || isNaN($t) || (vt.push($t), bt.push(Wt)), void 0 == _.lineColor && void 0 == _.fillColors && isNaN(_.dashLength) || (this.drawSmoothedGraph(w, S, vt, bt), w = [Pt], S = [Gt], vt = [], bt = [], !xt || isNaN(Wt) || isNaN($t) || (vt.push($t), bt.push(Wt)), this.lineColorSwitched = _.lineColor, this.fillColorsSwitched = _.fillColors, this.dashLengthSwitched = _.dashLength), _.gap && (this.drawSmoothedGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = []));
                            break;
                        case "step":
                            if (isNaN(qt)) N || ((1 >= this.periodSpan || 1 < this.periodSpan && Pt - d > le + de) && (d = c = NaN), this.drawLineGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = []);
                            else {
                                if (x ? (isNaN(d) || (w.push(d), S.push(Gt - le)), S.push(Gt - le), w.push(Pt), S.push(Gt + de), w.push(Pt), !xt || isNaN(Wt) || isNaN($t) || (isNaN(u) || (vt.push(u), bt.push(Wt - le)), vt.push($t), bt.push(Wt - le), vt.push($t), bt.push(Wt + de))) : (isNaN(c) || (S.push(c), w.push(Pt - le)), w.push(Pt - le), S.push(Gt), w.push(Pt + de), S.push(Gt), !xt || isNaN(Wt) || isNaN($t) || (isNaN(p) || (vt.push($t - le), bt.push(p)), vt.push($t - le), bt.push(Wt), vt.push($t + de), bt.push(Wt))), d = Pt, c = Gt, u = $t, p = Wt, jt = Pt, Ut = Gt, _t = Pt, Zt = Gt, At || void 0 != _.lineColor || void 0 != _.fillColors || !isNaN(_.dashLength)) {
                                    var me = w[w.length - 2],
                                        fe = S[S.length - 2];
                                    w.pop(), S.pop(), this.drawLineGraph(w, S, vt, bt), w = [me], S = [fe], x ? (S.push(Gt + de), w.push(Pt)) : (w.push(Pt + de), S.push(Gt)), vt = [], bt = [], this.lineColorSwitched = _.lineColor, this.fillColorsSwitched = _.fillColors, this.dashLengthSwitched = _.dashLength, f && (St ? (this.lineColorSwitched = $, this.fillColorsSwitched = at) : (this.lineColorSwitched = ot, this.fillColorsSwitched = nt))
                                }(Ct || _.gap) && (d = c = NaN, this.drawLineGraph(w, S, vt, bt), w = [], S = [], vt = [], bt = [])
                            }
                            break;
                        case "column":
                            if (Et = se, void 0 != _.lineColor && (Et = _.lineColor), !isNaN(qt)) {
                                f || (_.isNegative = z > qt ? !0 : !1), _.isNegative && (nt && (ee = nt), void 0 != ot && (Et = ot));
                                var ge = o.min,
                                    ve = o.max;
                                if (!(ge > qt && ge > Kt || qt > ve && Kt > ve)) {
                                    var be;
                                    if (x) {
                                        "3d" == T ? (Ot = Gt - (C / 2 - this.depthCount + 1) * (h + V) + V / 2 + D * F, Lt = $t + M * F, be = F) : (Ot = Math.floor(Gt - (C / 2 - F) * (h + V) + V / 2), Lt = $t, be = 0), Rt = h, jt = Pt, Ut = Ot + h / 2, _t = Pt, Zt = Ot + h / 2, Ot + Rt > v + be * D && (Rt = v - Ot + be * D), be * D > Ot && (Rt += Ot, Ot = be * D), It = Pt - $t;
                                        var xe = Lt;
                                        Lt = t.fitToBounds(Lt, 0, g), It += xe - Lt, It = t.fitToBounds(It, -Lt, g - Lt + M * F), _.labelIsNegative = 0 > It ? !0 : !1, isNaN(U.percentWidthValue) || (Rt = this.height * U.percentWidthValue / 100, Ot = Dt, Dt += Rt, Ut = Ot + Rt / 2), v > Ot && Rt > 0 && (te = new t.Cuboid(n, It, Rt, M - e.d3x, D - e.d3y, ee, ie, P, Et, G, Y, y, x, W, oe, ne, O), _.columnWidth = Math.abs(It), _.columnHeight = Math.abs(Rt))
                                    } else {
                                        "3d" == T ? (Lt = Pt - (C / 2 - this.depthCount + 1) * (h + V) + V / 2 + M * F, Ot = Wt + D * F, be = F) : (Lt = Pt - (C / 2 - F) * (h + V) + V / 2, Ot = Wt, be = 0), Rt = h, jt = Lt + h / 2, Ut = Gt, _t = Lt + h / 2, Zt = Gt, Lt + Rt > g + be * M && (Rt = g - Lt + be * M), be * M > Lt && (Rt += Lt - be * M, Lt = be * M), It = Gt - Wt, _.labelIsNegative = It > 0 ? !0 : !1;
                                        var Ce = Ot;
                                        Ot = t.fitToBounds(Ot, this.dy, v), It += Ce - Ot, It = t.fitToBounds(It, -Ot + D * F, v - Ot), isNaN(U.percentWidthValue) || (Rt = this.width * U.percentWidthValue / 100, Lt = Mt, Mt += Rt, jt = Lt + Rt / 2), g + F * M > Lt && Rt > 0 && (this.showOnAxis && (Ot -= D / 2), te = new t.Cuboid(n, Rt, It, M - e.d3x, D - e.d3y, ee, ie, P, Et, this.lineAlpha, Y, y, x, W, oe, ne, O), _.columnHeight = Math.abs(It), _.columnWidth = Math.abs(Rt))
                                    }
                                }
                                te && (zt = te.set, t.setCN(e, te.set, "graph-" + this.type), t.setCN(e, te.set, "graph-" + this.id), _.className && t.setCN(e, te.set, _.className, !0), _.columnGraphics = zt, zt.translate(Lt, Ot), this.columnsSet.push(zt), (_.url || this.showHandOnHover) && zt.setAttr("cursor", "pointer"), !L) && ("none" == T && (m = x ? (this.end + 1 - gt) * A - s : A * gt + s), "3d" == T && (x ? (m = (this.end + 1 - gt) * A - s - 1e3 * this.depthCount, jt += M * this.columnIndex, _t += M * this.columnIndex, _.y += M * this.columnIndex) : (m = (A - s) * (gt + 1) + 1e3 * this.depthCount, Ut += D * this.columnIndex, Zt += D * this.columnIndex, _.y += D * this.columnIndex)), ("regular" == T || "100%" == T) && (m = x ? 0 < re.value ? (this.end + 1 - gt) * A + s : (this.end + 1 - gt) * A - s : 0 < re.value ? A * gt + s : A * gt - s), this.columnsArray.push({
                                    column: te,
                                    depth: m
                                }), _.x = x ? Ot + Rt / 2 : Lt + Rt / 2, this.ownColumns.push(te), this.animateColumns(te, gt, Pt, $t, Gt, Wt), this.addListeners(zt, _))
                            }
                            break;
                        case "candlestick":
                            if (!isNaN(Kt) && !isNaN(qt)) {
                                var ye, Ne;
                                if (Et = se, void 0 != _.lineColor && (Et = _.lineColor), x) {
                                    if (Ot = Gt - h / 2, Lt = $t, Rt = h, Ot + Rt > v && (Rt = v - Ot), 0 > Ot && (Rt += Ot, Ot = 0), v > Ot && Rt > 0) {
                                        var we, Se;
                                        qt > Kt ? (we = [Pt, Vt], Se = [$t, Ht]) : (we = [$t, Vt], Se = [Pt, Ht]), !isNaN(Vt) && !isNaN(Ht) && v > Gt && Gt > 0 && (ye = t.line(n, we, [Gt, Gt], Et, G, P), Ne = t.line(n, Se, [Gt, Gt], Et, G, P)), It = Pt - $t, te = new t.Cuboid(n, It, Rt, M, D, ee, rt, P, Et, G, Y, y, x, W, oe, ne, O)
                                    }
                                } else if (Lt = Pt - h / 2, Ot = Wt + P / 2, Rt = h, Lt + Rt > g && (Rt = g - Lt), 0 > Lt && (Rt += Lt, Lt = 0), It = Gt - Wt, g > Lt && Rt > 0) {
                                    ae && qt >= Kt && (ie = 0);
                                    var Ae, Me, te = new t.Cuboid(n, Rt, It, M, D, ee, ie, P, Et, G, Y, y, x, W, oe, ne, O);
                                    qt > Kt ? (Ae = [Gt, Xt], Me = [Wt, Yt]) : (Ae = [Wt, Xt], Me = [Gt, Yt]), !isNaN(Xt) && !isNaN(Yt) && g > Pt && Pt > 0 && (ye = t.line(n, [Pt, Pt], Ae, Et, G, P), Ne = t.line(n, [Pt, Pt], Me, Et, G, P), t.setCN(e, ye, this.bcn + "line-high"), _.className && t.setCN(e, ye, _.className, !0), t.setCN(e, Ne, this.bcn + "line-low"), _.className && t.setCN(e, Ne, _.className, !0))
                                }
                                te && (zt = te.set, _.columnGraphics = zt, H.push(zt), zt.translate(Lt, Ot - P / 2), (_.url || this.showHandOnHover) && zt.setAttr("cursor", "pointer"), ye && (H.push(ye), H.push(Ne)), jt = Pt, Ut = Gt, x ? (Zt = Gt, _t = Pt, "open" == l && (_t = $t), "high" == l && (_t = Vt), "low" == l && (_t = Ht)) : (Zt = Gt, "open" == l && (Zt = Wt), "high" == l && (Zt = Xt), "low" == l && (Zt = Yt), _t = Pt), L || (_.x = x ? Ot + Rt / 2 : Lt + Rt / 2, this.animateColumns(te, gt, Pt, $t, Gt, Wt), this.addListeners(zt, _)))
                            }
                            break;
                        case "ohlc":
                            if (!(isNaN(Kt) || isNaN(Qt) || isNaN(Jt) || isNaN(qt))) {
                                var De = n.set();
                                H.push(De), Kt > qt && (_.isNegative = !0, void 0 != ot && (se = ot));
                                var Te, ke, Be;
                                if (x) {
                                    var Le = Gt - h / 2,
                                        Le = t.fitToBounds(Le, 0, v),
                                        Oe = t.fitToBounds(Gt, 0, v),
                                        Re = Gt + h / 2,
                                        Re = t.fitToBounds(Re, 0, v);
                                    ke = t.line(n, [$t, $t], [Le, Oe], se, G, P, W), Gt > 0 && v > Gt && (Te = t.line(n, [Ht, Vt], [Gt, Gt], se, G, P, W)), Be = t.line(n, [Pt, Pt], [Oe, Re], se, G, P, W), Zt = Gt, _t = Pt, "open" == l && (_t = $t), "high" == l && (_t = Vt), "low" == l && (_t = Ht)
                                } else {
                                    var Ie = Pt - h / 2,
                                        Ie = t.fitToBounds(Ie, 0, g),
                                        Ee = t.fitToBounds(Pt, 0, g),
                                        ze = Pt + h / 2,
                                        ze = t.fitToBounds(ze, 0, g);
                                    ke = t.line(n, [Ie, Ee], [Wt, Wt], se, G, P, W), Pt > 0 && g > Pt && (Te = t.line(n, [Pt, Pt], [Yt, Xt], se, G, P, W)), Be = t.line(n, [Ee, ze], [Gt, Gt], se, G, P, W), Zt = Gt, "open" == l && (Zt = Wt), "high" == l && (Zt = Xt), "low" == l && (Zt = Yt), _t = Pt
                                }
                                H.push(ke), H.push(Te), H.push(Be), t.setCN(e, ke, this.bcn + "stroke-open"), t.setCN(e, Be, this.bcn + "stroke-close"), t.setCN(e, Te, this.bcn + "stroke"), _.className && t.setCN(e, De, _.className, !0), jt = Pt, Ut = Gt
                            }
                    }
                    if (!L && !isNaN(qt)) {
                        var Fe = this.hideBulletsCount;
                        if (this.end - this.start <= Fe || 0 === Fe) {
                            var Pe = this.createBullet(_, _t, Zt, gt),
                                Ge = this.labelText;
                            if (Ge && Pe) {
                                var $e = this.createLabel(_, _t, Zt, Ge);
                                ($e = this.positionLabel(jt, Ut, $e, Pe, Rt, It)) && this.allBullets.push($e)
                            }
                            if ("regular" == T || "100%" == T) {
                                var We = o.totalText;
                                if (We) {
                                    var He = this.createLabel(_, 0, 0, We, o.totalTextColor);
                                    t.setCN(e, He, this.bcn + "label-total"), this.allBullets.push(He);
                                    var Ye, Ve, Xe = He.getBBox(),
                                        je = Xe.width,
                                        Ue = Xe.height,
                                        _e = o.totalTextOffset,
                                        Ze = o.totals[gt];
                                    Ze && Ze.remove();
                                    var qe = 0;
                                    "column" != r && (qe = this.bulletSize), x ? (Ve = Ut, Ye = 0 > qt ? Pt - je / 2 - 2 - qe - _e : Pt + je / 2 + 3 + qe + _e) : (Ye = jt, Ve = 0 > qt ? Gt + Ue / 2 + qe + _e : Gt - Ue / 2 - 3 - qe - _e), He.translate(Ye, Ve), o.totals[gt] = He, x ? (0 > Ve || Ve > v) && He.remove() : (0 > Ye || Ye > g) && He.remove()
                                }
                            }
                        }
                    }
                }
            }("line" == r || "step" == r || "smoothedLine" == r) && ("smoothedLine" == r ? this.drawSmoothedGraph(w, S, vt, bt) : this.drawLineGraph(w, S, vt, bt), L || this.launchAnimation()), this.bulletsHidden && this.hideBullets(), this.customBulletsHidden && this.hideCustomBullets()
        },
        animateColumns: function(t, e) {
            var i = this,
                s = i.chart.startDuration;
            s > 0 && !i.animationPlayed && (i.seqAn ? (t.set.hide(), i.animationArray.push(t), s = setTimeout(function() {
                i.animate.call(i)
            }, s / (i.end - i.start + 1) * (e - i.start) * 1e3), i.timeOuts.push(s)) : i.animate(t))
        },
        createLabel: function(e, i, s, a, n) {
            var o = this.chart,
                r = e.labelColor;
            r || (r = this.color), r || (r = o.color), n && (r = n), n = this.fontSize, void 0 === n && (this.fontSize = n = o.fontSize);
            var h = this.labelFunction;
            return a = o.formatString(a, e), a = t.cleanFromEmpty(a), h && (a = h(e, a)), e = t.text(this.container, a, r, o.fontFamily, n), e.node.style.pointerEvents = "none", t.setCN(o, e, this.bcn + "label"), e.translate(i, s), this.bulletSet.push(e), e
        },
        positiveClip: function(t) {
            t.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
        },
        negativeClip: function(t) {
            t.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
        },
        drawLineGraph: function(e, i, s, a) {
            var n = this;
            if (1 < e.length) {
                var o = n.noRounding,
                    r = n.set,
                    h = n.chart,
                    l = n.container,
                    d = l.set(),
                    c = l.set();
                r.push(c), r.push(d);
                var u = n.lineAlpha,
                    p = n.lineThickness,
                    r = n.fillAlphas,
                    m = n.lineColorR,
                    f = n.negativeLineAlpha;
                isNaN(f) && (f = u);
                var g = n.lineColorSwitched;
                g && (m = g);
                var g = n.fillColorsR,
                    v = n.fillColorsSwitched;
                v && (g = v);
                var b = n.dashLength;
                (v = n.dashLengthSwitched) && (b = v);
                var v = n.negativeLineColor,
                    x = n.negativeFillColors,
                    C = n.negativeFillAlphas,
                    y = n.baseCoord;
                0 !== n.negativeBase && (y = n.valueAxis.getCoordinate(n.negativeBase), y > n.height && (y = n.height), 0 > y && (y = 0)), u = t.line(l, e, i, m, u, p, b, !1, !0, o), t.setCN(h, u, n.bcn + "stroke"), d.push(u), d.click(function(t) {
                    n.handleGraphEvent(t, "clickGraph")
                }).mouseover(function(t) {
                    n.handleGraphEvent(t, "rollOverGraph")
                }).mouseout(function(t) {
                    n.handleGraphEvent(t, "rollOutGraph")
                }), void 0 === v || n.useNegativeColorIfDown || (p = t.line(l, e, i, v, f, p, b, !1, !0, o), t.setCN(h, p, n.bcn + "stroke"), t.setCN(h, p, n.bcn + "stroke-negative"), c.push(p)), (r > 0 || C > 0) && (p = e.join(";").split(";"), f = i.join(";").split(";"), u = h.type, "serial" == u || "radar" == u ? 0 < s.length ? (s.reverse(), a.reverse(), p = e.concat(s), f = i.concat(a)) : "radar" == u ? (f.push(0), p.push(0)) : n.rotate ? (f.push(f[f.length - 1]), p.push(y), f.push(f[0]), p.push(y), f.push(f[0]), p.push(p[0])) : (p.push(p[p.length - 1]), f.push(y), p.push(p[0]), f.push(y), p.push(e[0]), f.push(f[0])) : "xy" == u && (i = n.fillToAxis) && (t.isString(i) && (i = h.getValueAxisById(i)), "H" == i.orientation ? (y = "top" == i.position ? 0 : i.viH, p.push(p[p.length - 1]), f.push(y), p.push(p[0]), f.push(y), p.push(e[0]), f.push(f[0])) : (y = "left" == i.position ? 0 : i.viW, f.push(f[f.length - 1]), p.push(y), f.push(f[0]), p.push(y), f.push(f[0]), p.push(p[0]))), e = n.gradientRotation, r > 0 && (i = t.polygon(l, p, f, g, r, 1, "#000", 0, e, o), i.pattern(n.pattern, NaN, h.path), t.setCN(h, i, n.bcn + "fill"), d.push(i)), (x || void 0 !== v) && (isNaN(C) && (C = r), x || (x = v), o = t.polygon(l, p, f, x, C, 1, "#000", 0, e, o), t.setCN(h, o, n.bcn + "fill"), t.setCN(h, o, n.bcn + "fill-negative"), o.pattern(n.pattern, NaN, h.path), c.push(o), c.click(function(t) {
                    n.handleGraphEvent(t, "clickGraph")
                }).mouseover(function(t) {
                    n.handleGraphEvent(t, "rollOverGraph")
                }).mouseout(function(t) {
                    n.handleGraphEvent(t, "rollOutGraph")
                }))), n.applyMask(c, d)
            }
        },
        applyMask: function(t, e) {
            var i = t.length();
            "serial" != this.chart.type || this.scrollbar || (this.positiveClip(e), i > 0 && this.negativeClip(t))
        },
        drawSmoothedGraph: function(e, i, s, a) {
            if (1 < e.length) {
                var n = this.set,
                    o = this.chart,
                    r = this.container,
                    h = r.set(),
                    l = r.set();
                n.push(l), n.push(h);
                var d = this.lineAlpha,
                    c = this.lineThickness,
                    n = this.dashLength,
                    u = this.fillAlphas,
                    p = this.lineColorR,
                    m = this.fillColorsR,
                    f = this.negativeLineColor,
                    g = this.negativeFillColors,
                    v = this.negativeFillAlphas,
                    b = this.baseCoord,
                    x = this.lineColorSwitched;
                x && (p = x), (x = this.fillColorsSwitched) && (m = x), x = this.negativeLineAlpha, isNaN(x) && (x = d), d = new t.Bezier(r, e, i, p, d, c, m, 0, n), t.setCN(o, d, this.bcn + "stroke"), h.push(d.path), void 0 !== f && (c = new t.Bezier(r, e, i, f, x, c, m, 0, n), t.setCN(o, c, this.bcn + "stroke"), t.setCN(o, c, this.bcn + "stroke-negative"), l.push(c.path)), u > 0 && (d = e.join(";").split(";"), p = i.join(";").split(";"), c = "", 0 < s.length ? (s.push("M"), a.push("M"), s.reverse(), a.reverse(), d = e.concat(s), p = i.concat(a)) : (this.rotate ? (c += " L" + b + "," + i[i.length - 1], c += " L" + b + "," + i[0]) : (c += " L" + e[e.length - 1] + "," + b, c += " L" + e[0] + "," + b), c += " L" + e[0] + "," + i[0]), s = new t.Bezier(r, d, p, NaN, 0, 0, m, u, n, c), t.setCN(o, s, this.bcn + "fill"), s.path.pattern(this.pattern, NaN, o.path), h.push(s.path), g || void 0 !== f) && (v || (v = u), g || (g = f), e = new t.Bezier(r, e, i, NaN, 0, 0, g, v, n, c), e.path.pattern(this.pattern, NaN, o.path), t.setCN(o, e, this.bcn + "fill"), t.setCN(o, e, this.bcn + "fill-negative"), l.push(e.path)), this.applyMask(l, h)
            }
        },
        launchAnimation: function() {
            var e = this,
                i = e.chart.startDuration;
            if (i > 0 && !e.animationPlayed) {
                var s = e.set,
                    a = e.bulletSet;
                t.VML || (s.attr({
                    opacity: e.startAlpha
                }), a.attr({
                    opacity: e.startAlpha
                })), s.hide(), a.hide(), e.seqAn ? (i = setTimeout(function() {
                    e.animateGraphs.call(e)
                }, e.index * i * 1e3), e.timeOuts.push(i)) : e.animateGraphs()
            }
        },
        animateGraphs: function() {
            var t = this.chart,
                e = this.set,
                i = this.bulletSet,
                s = this.x,
                a = this.y;
            e.show(), i.show();
            var n = t.startDuration,
                t = t.startEffect;
            e && (this.rotate ? (e.translate(-1e3, a), i.translate(-1e3, a)) : (e.translate(s, -1e3), i.translate(s, -1e3)), e.animate({
                opacity: 1,
                translate: s + "," + a
            }, n, t), i.animate({
                opacity: 1,
                translate: s + "," + a
            }, n, t))
        },
        animate: function(e) {
            var i = this.chart,
                s = this.animationArray;
            !e && 0 < s.length && (e = s[0], s.shift()), s = t[t.getEffect(i.startEffect)], i = i.startDuration, e && (this.rotate ? e.animateWidth(i, s) : e.animateHeight(i, s), e.set.show())
        },
        legendKeyColor: function() {
            var t = this.legendColor,
                e = this.lineAlpha;
            return void 0 === t && (t = this.lineColorR, 0 === e && (e = this.fillColorsR) && (t = "object" == typeof e ? e[0] : e)), t
        },
        legendKeyAlpha: function() {
            var t = this.legendAlpha;
            return void 0 === t && (t = this.lineAlpha, this.fillAlphas > t && (t = this.fillAlphas), 0 === t && (t = this.bulletAlpha), 0 === t && (t = 1)), t
        },
        createBullet: function(e, i, s) {
            if (!isNaN(i) && !isNaN(s)) {
                var a = this.chart,
                    n = this.container,
                    o = this.bulletOffset,
                    r = this.bulletSize;
                isNaN(e.bulletSize) || (r = e.bulletSize);
                var h = e.values.value,
                    l = this.maxValue,
                    d = this.minValue,
                    c = this.maxBulletSize,
                    u = this.minBulletSize;
                isNaN(l) || (isNaN(h) || (r = (h - d) / (l - d) * (c - u) + u), d == l && (r = c)), l = r, this.bulletAxis && (r = e.values.error, isNaN(r) || (h = r), r = this.bulletAxis.stepWidth * h), r < this.minBulletSize && (r = this.minBulletSize),
                    this.rotate ? i = e.isNegative ? i - o : i + o : s = e.isNegative ? s + o : s - o;
                var p, u = this.bulletColorR;
                e.lineColor && (this.bulletColorSwitched = e.lineColor), this.bulletColorSwitched && (u = this.bulletColorSwitched), e.isNegative && void 0 !== this.bulletColorNegative && (u = this.bulletColorNegative), void 0 !== e.color && (u = e.color);
                var m;
                "xy" == a.type && this.valueField && (m = this.pattern, e.pattern && (m = e.pattern)), o = this.bullet, e.bullet && (o = e.bullet);
                var h = this.bulletBorderThickness,
                    d = this.bulletBorderColorR,
                    c = this.bulletBorderAlpha,
                    f = this.bulletAlpha;
                d || (d = u), this.useLineColorForBulletBorder && (d = this.lineColorR, this.lineColorSwitched && (d = this.lineColorSwitched));
                var g = e.alpha;
                return isNaN(g) || (f = g), ("none" != this.bullet || e.bullet) && (p = t.bullet(n, o, r, u, f, h, d, c, l, 0, m, a.path)), (this.customBullet || e.customBullet) && (m = this.customBullet, e.customBullet && (m = e.customBullet), m && (p && p.remove(), "function" == typeof m ? (m = new m, m.chart = a, e.bulletConfig && (m.availableSpace = s, m.graph = this, m.graphDataItem = e, m.bulletY = s, e.bulletConfig.minCoord = this.minCoord - s, m.bulletConfig = e.bulletConfig), m.write(n), p && m.showBullet && m.set.push(p), e.customBulletGraphics = m.cset, p = m.set) : (p = n.set(), n = n.image(m, 0, 0, r, r), p.push(n), this.centerCustomBullets && n.translate(-r / 2, -r / 2)))), p && ((e.url || this.showHandOnHover) && p.setAttr("cursor", "pointer"), ("serial" == a.type || "gantt" == a.type) && (-.5 > i - 0 || i - 0 > this.width || -r / 2 > s || s - 0 > this.height) && (p.remove(), p = null), p && (this.bulletSet.push(p), p.translate(i, s), this.addListeners(p, e), this.allBullets.push(p)), e.bx = i, e.by = s, t.setCN(a, p, this.bcn + "bullet"), e.className && t.setCN(a, p, e.className, !0)), p ? (p.size = r || 0, e.bulletGraphics = p) : p = {
                    size: 0
                }, p.graphDataItem = e, p
            }
        },
        showBullets: function() {
            var t, e = this.allBullets;
            for (this.bulletsHidden = !1, t = 0; t < e.length; t++) e[t].show()
        },
        hideBullets: function() {
            var t, e = this.allBullets;
            for (this.bulletsHidden = !0, t = 0; t < e.length; t++) e[t].hide()
        },
        showCustomBullets: function() {
            var t, e = this.allBullets;
            for (this.customBulletsHidden = !1, t = 0; t < e.length; t++) {
                var i = e[t].graphDataItem;
                i.customBulletGraphics && i.customBulletGraphics.show()
            }
        },
        hideCustomBullets: function() {
            var t, e = this.allBullets;
            for (this.customBulletsHidden = !0, t = 0; t < e.length; t++) {
                var i = e[t].graphDataItem;
                i.customBulletGraphics && i.customBulletGraphics.hide()
            }
        },
        addListeners: function(t, e) {
            var i = this;
            t.mouseover(function(t) {
                i.handleRollOver(e, t)
            }).mouseout(function(t) {
                i.handleRollOut(e, t)
            }).touchend(function(t) {
                i.handleRollOver(e, t), i.chart.panEventsEnabled && i.handleClick(e, t)
            }).touchstart(function(t) {
                i.handleRollOver(e, t)
            }).click(function(t) {
                i.handleClick(e, t)
            }).dblclick(function(t) {
                i.handleDoubleClick(e, t)
            }).contextmenu(function(t) {
                i.handleRightClick(e, t)
            })
        },
        handleRollOver: function(e, i) {
            if (e) {
                var s = this.chart,
                    a = {
                        type: "rollOverGraphItem",
                        item: e,
                        index: e.index,
                        graph: this,
                        target: this,
                        chart: this.chart,
                        event: i
                    };
                if (this.fire("rollOverGraphItem", a), s.fire("rollOverGraphItem", a), clearTimeout(s.hoverInt), a = this.showBalloon, !s.chartCursor || "serial" != s.type && "gantt" != s.type || (a = !1, !s.chartCursor.valueBalloonsEnabled && this.showBalloon && (a = !0)), a) {
                    var a = s.formatString(this.balloonText, e, !0),
                        n = this.balloonFunction;
                    n && (a = n(e, e.graph)), a = t.cleanFromEmpty(a), n = s.getBalloonColor(this, e), s.balloon.showBullet = !1, s.balloon.pointerOrientation = "V";
                    var o = e.x,
                        r = e.y;
                    s.rotate && (o = e.y, r = e.x), "" !== a ? s.showBalloon(a, n, !0, o + s.marginLeftReal, r + s.marginTopReal) : this.chart.hideBalloonReal()
                } else this.chart.hideBalloonReal()
            }
            this.handleGraphEvent(i, "rollOverGraph")
        },
        handleRollOut: function(t, e) {
            if (this.chart.hideBalloon(), t) {
                var i = {
                    type: "rollOutGraphItem",
                    item: t,
                    index: t.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: e
                };
                this.fire("rollOutGraphItem", i), this.chart.fire("rollOutGraphItem", i)
            }
            this.handleGraphEvent(e, "rollOutGraph")
        },
        handleClick: function(e, i) {
            if (e) {
                var s = {
                    type: "clickGraphItem",
                    item: e,
                    index: e.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: i
                };
                this.fire("clickGraphItem", s), this.chart.fire("clickGraphItem", s), t.getURL(e.url, this.urlTarget)
            }
            this.handleGraphEvent(i, "clickGraph")
        },
        handleGraphEvent: function(t, e) {
            var i = {
                type: e,
                graph: this,
                target: this,
                chart: this.chart,
                event: t
            };
            this.fire(e, i), this.chart.fire(e, i)
        },
        handleRightClick: function(t, e) {
            if (t) {
                var i = {
                    type: "rightClickGraphItem",
                    item: t,
                    index: t.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: e
                };
                this.fire("rightClickGraphItem", i), this.chart.fire("rightClickGraphItem", i)
            }
        },
        handleDoubleClick: function(t, e) {
            if (t) {
                var i = {
                    type: "doubleClickGraphItem",
                    item: t,
                    index: t.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: e
                };
                this.fire("doubleClickGraphItem", i), this.chart.fire("doubleClickGraphItem", i)
            }
        },
        zoom: function(t, e) {
            this.start = t, this.end = e, this.draw()
        },
        changeOpacity: function(t) {
            var e = this.set;
            if (e && e.setAttr("opacity", t), e = this.ownColumns) {
                var i;
                for (i = 0; i < e.length; i++) {
                    var s = e[i].set;
                    s && s.setAttr("opacity", t)
                }
            }(e = this.bulletSet) && e.setAttr("opacity", t)
        },
        destroy: function() {
            t.remove(this.set), t.remove(this.bulletSet);
            var e = this.timeOuts;
            if (e) {
                var i;
                for (i = 0; i < e.length; i++) clearTimeout(e[i])
            }
            this.timeOuts = []
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.ChartCursor = t.Class({
        construct: function(e) {
            this.cname = "ChartCursor", this.createEvents("changed", "zoomed", "onHideCursor", "draw", "selected", "moved"), this.enabled = !0, this.cursorAlpha = 1, this.selectionAlpha = .2, this.cursorColor = "#CC0000", this.categoryBalloonAlpha = 1, this.color = "#FFFFFF", this.type = "cursor", this.zoomed = !1, this.zoomable = !0, this.pan = !1, this.categoryBalloonDateFormat = "MMM DD, YYYY", this.categoryBalloonText = "[[category]]", this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0, this.rolledOver = !1, this.cursorPosition = "middle", this.bulletsEnabled = this.skipZoomDispatch = !1, this.bulletSize = 8, this.selectWithoutZooming = this.oneBalloonOnly = !1, this.graphBulletSize = 1.7, this.animationDuration = .3, this.zooming = !1, this.adjustment = 0, this.avoidBalloonOverlapping = !0, this.leaveCursor = !1, this.leaveAfterTouch = !0, t.applyTheme(this, e, this.cname)
        },
        draw: function() {
            this.destroy();
            var e = this.chart;
            e.panRequired = !0;
            var i = e.container;
            this.rotate = e.rotate, this.container = i, i = i.set(), i.translate(this.x, this.y), this.set = i, e.cursorSet.push(i), i = new t.AmBalloon, i.className = "category", i.chart = e, this.categoryBalloon = i, t.copyProperties(e.balloon, i), i.cornerRadius = 0, i.shadowAlpha = 0, i.borderThickness = 1, i.borderAlpha = 1, i.showBullet = !1;
            var s = this.categoryBalloonColor;
            if (void 0 === s && (s = this.cursorColor), i.fillColor = s, i.balloonColor = s, i.fillAlpha = this.categoryBalloonAlpha, i.borderColor = s, i.color = this.color, s = this.valueLineAxis, t.isString(s) && (s = e.getValueAxisById(s)), s || (s = e.valueAxes[0]), this.valueLineAxis = s, this.valueLineBalloonEnabled && (this.vaBalloon = s = new t.AmBalloon, t.copyProperties(i, s), s.animationDuration = 0, this.rotate || (s.pointerOrientation = "H")), this.rotate && (i.pointerOrientation = "H"), this.extraWidth = 0, this.prevX = [], this.prevY = [], this.prevTX = [], this.prevTY = [], this.valueBalloonsEnabled)
                for (i = 0; i < e.graphs.length; i++) s = new t.AmBalloon, s.className = e.graphs[i].id, s.chart = e, t.copyProperties(e.balloon, s), e.graphs[i].valueBalloon = s;
            "cursor" == this.type ? this.createCursor() : this.createCrosshair()
        },
        updateData: function() {
            var t = this.chart;
            this.data = t.chartData, this.firstTime = t.firstTime, this.lastTime = t.lastTime
        },
        createCursor: function() {
            var e, i, s, a, n = this.chart,
                o = this.cursorAlpha,
                r = n.categoryAxis,
                h = this.categoryBalloon;
            s = n.dx, a = n.dy;
            var l = this.width,
                d = this.height,
                c = n.rotate;
            h.pointerWidth = r.tickLength, c ? (e = [0, l, l + s], i = [0, 0, a], s = [s, 0, 0], a = [a, 0, d]) : (e = [s, 0, 0], i = [a, 0, d], s = [0, l, l + s], a = [0, 0, a]), e = t.line(this.container, e, i, this.cursorColor, o, 1), t.setCN(n, e, "cursor-line"), this.line = e, e.node.style.pointerEvents = "none", (i = this.fullRectSet) ? (i.push(e), i.translate(this.x, this.y)) : this.set.push(e), this.valueLineEnabled && (e = this.valueLineAlpha, isNaN(e) || (o = e), o = t.line(this.container, s, a, this.cursorColor, o, 1), o.node.style.pointerEvents = "none", t.setCN(n, o, "cursor-value-line"), this.vLine = o, this.set.push(o)), this.setBalloonBounds(h, r, c), (n = this.vaBalloon) && this.setBalloonBounds(n, this.valueLineAxis, !c), this.hideCursor()
        },
        createCrosshair: function() {
            var e = this.cursorAlpha,
                i = this.container,
                s = t.line(i, [0, 0], [0, this.height], this.cursorColor, e, 1),
                e = t.line(i, [0, this.width], [0, 0], this.cursorColor, e, 1);
            t.setCN(this.chart, s, "cursor-line"), t.setCN(this.chart, e, "cursor-line"), this.set.push(s), this.set.push(e), this.vLine = s, this.hLine = e, this.hideCursor()
        },
        update: function() {
            var t = this.chart;
            if (t)
                if (t.mouseIsOver) {
                    var e = t.mouseX - this.x,
                        i = t.mouseY - this.y;
                    e > -.5 && e < this.width + 1 && i > 0 && i < this.height ? ((this.valueLineEnabled || this.valueLineBalloonEnabled) && this.updateVLine(e, i), this.setPosition(), this.drawing ? this.rolledOver || t.setMouseCursor("crosshair") : this.pan && (this.rolledOver || t.setMouseCursor("move")), this.rolledOver = !0) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
                } else this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
        },
        updateVLine: function(t, e) {
            var i = this.vLine,
                s = this.vaBalloon;
            if ((i || s) && !this.panning && !this.drawing) {
                i && i.show();
                var a, n = this.valueLineAxis,
                    o = this.rotate;
                if (o ? (i && i.translate(t, 0), n && (a = n.coordinateToValue(t)), i = t) : (i && i.translate(0, e), n && (a = n.coordinateToValue(e)), i = e - 1), s && !isNaN(a) && this.prevLineValue != a) {
                    var r = n.formatValue(a, !0);
                    this.setBalloonPosition(s, n, i, !o), s.showBalloon(r)
                }
                this.prevLineValue = a
            }
        },
        getMousePosition: function() {
            var t, e = this.width,
                i = this.height;
            return t = this.chart, this.rotate ? (t = t.mouseY - this.y, 0 > t && (t = 0), t > i && (t = i)) : (t = t.mouseX - this.x - 1, 0 > t && (t = 0), t > e && (t = e)), t
        },
        updateCrosshair: function() {
            var e = this.chart,
                i = e.mouseX - this.x,
                s = e.mouseY - this.y,
                a = this.vLine,
                n = this.hLine,
                i = t.fitToBounds(i, 0, this.width),
                s = t.fitToBounds(s, 0, this.height);
            a && 0 < this.cursorAlpha && (a.show(), n.show(), a.translate(i, 0), n.translate(0, s)), this.zooming && (e.hideXScrollbar && (i = NaN), e.hideYScrollbar && (s = NaN), this.updateSelectionSize(i, s)), this.fireMoved(), e.mouseIsOver || this.zooming || this.hideCursor()
        },
        fireMoved: function() {
            var t = this.chart,
                e = {
                    type: "moved",
                    target: this
                };
            e.chart = t, e.zooming = this.zooming, e.x = t.mouseX - this.x, e.y = t.mouseY - this.y, this.fire("moved", e)
        },
        updateSelectionSize: function(e, i) {
            t.remove(this.selection);
            var s = this.selectionPosX,
                a = this.selectionPosY,
                n = 0,
                o = 0,
                r = this.width,
                h = this.height;
            isNaN(e) || (s > e && (n = e, r = s - e), e > s && (n = s, r = e - s), s == e && (n = e, r = 0), r += this.extraWidth, n -= this.extraWidth / 2), isNaN(i) || (a > i && (o = i, h = a - i), i > a && (o = a, h = i - a), a == i && (o = i, h = 0), h += this.extraWidth, o -= this.extraWidth / 2), r > 0 && h > 0 && (s = t.rect(this.container, r, h, this.cursorColor, this.selectionAlpha), t.setCN(this.chart, s, "cursor-selection"), s.translate(n + this.x, o + this.y), this.selection = s)
        },
        arrangeBalloons: function() {
            var t = this.valueBalloons,
                e = this.x,
                i = this.y,
                s = this.height + i;
            t.sort(this.compareY);
            var a;
            for (a = 0; a < t.length; a++) {
                var n = t[a].balloon;
                n.setBounds(e, i, e + this.width, s), n.prevX = this.prevX[a], n.prevY = this.prevY[a], n.prevTX = this.prevTX[a], n.prevTY = this.prevTY[a], n.draw(), s = n.yPos - 3
            }
            this.arrangeBalloons2()
        },
        compareY: function(t, e) {
            return t.yy < e.yy ? 1 : -1
        },
        arrangeBalloons2: function() {
            var t = this.valueBalloons;
            t.reverse();
            var e, i, s, a = this.x,
                n = t.length;
            for (s = 0; n > s; s++) {
                var o = t[s].balloon;
                e = o.bottom;
                var r = o.bottom - o.yPos,
                    h = n - s - 1;
                s > 0 && i + 3 > e - r && (o.setBounds(a, i + 3, a + this.width, i + r + 3), o.prevX = this.prevX[h], o.prevY = this.prevY[h], o.prevTX = this.prevTX[h], o.prevTY = this.prevTY[h], o.draw()), o.set && o.set.show(), this.prevX[h] = o.prevX, this.prevY[h] = o.prevY, this.prevTX[h] = o.prevTX, this.prevTY[h] = o.prevTY, i = o.bottom
            }
        },
        showBullets: function() {
            t.remove(this.allBullets);
            var e = this.container,
                i = e.set();
            this.set.push(i), this.set.show(), this.allBullets = i;
            var s, i = this.chart.graphs;
            for (s = 0; s < i.length; s++) {
                var a = i[s];
                if (!a.hidden && a.balloonText) {
                    var n = this.data[this.index].axes[a.valueAxis.id].graphs[a.id],
                        o = n.y;
                    if (!isNaN(o)) {
                        var r, h;
                        r = n.x, this.rotate ? (h = o, o = r) : h = r, a = t.circle(e, this.bulletSize / 2, this.chart.getBalloonColor(a, n, !0), a.cursorBulletAlpha), a.translate(h, o), this.allBullets.push(a)
                    }
                }
            }
        },
        destroy: function() {
            this.clear(), t.remove(this.selection), this.selection = null;
            var e = this.categoryBalloon;
            e && e.destroy(), (e = this.vaBalloon) && e.destroy(), this.destroyValueBalloons(), t.remove(this.set)
        },
        clear: function() {},
        destroyValueBalloons: function() {
            var t = this.valueBalloons;
            if (t) {
                var e;
                for (e = 0; e < t.length; e++) t[e].balloon.hide()
            }
        },
        zoom: function(e, i, s, a) {
            var n = this.chart;
            this.destroyValueBalloons(), this.zooming = !1;
            var o;
            if (this.rotate ? this.selectionPosY = o = n.mouseY : this.selectionPosX = o = n.mouseX, this.start = e, this.end = i, this.startTime = s, this.endTime = a, this.zoomed = !0, a = n.categoryAxis, o = this.rotate, i = this.width, s = this.height, e = a.stepWidth, this.fullWidth) {
                var r = 1;
                a.parseDates && !a.equalSpacing && (r = a.minDuration()), o ? this.extraWidth = s = e * r : (this.extraWidth = i = e * r, this.categoryBalloon.minWidth = i), this.line && this.line.remove(), this.line = t.rect(this.container, i, s, this.cursorColor, this.cursorAlpha, 0), this.line.node.style.pointerEvents = "none", t.setCN(n, this.line, "cursor-fill"), this.fullRectSet && this.fullRectSet.push(this.line)
            }
            this.stepWidth = e, this.tempVal = this.valueBalloonsEnabled, this.valueBalloonsEnabled = !1, this.setPosition(), this.valueBalloonsEnabled = this.tempVal, this.hideCursor(), this.hideReal()
        },
        hideObj: function(t) {
            t && t.hide()
        },
        hideCursor: function(t) {
            void 0 === t && (t = !0), this.leaveCursor ? this.hideValueBalloon() : (this.hideReal(), t && this.fire("onHideCursor", {
                type: "onHideCursor",
                chart: this.chart,
                target: this
            }), this.drawing || this.chart.setMouseCursor("auto"), this.normalizeBulletSize())
        },
        hideValueBalloon: function() {
            this.hideObj(this.vaBalloon), this.hideObj(this.vLine), this.hideObj(this.hLine)
        },
        hideReal: function() {
            this.hideObj(this.set), this.hideObj(this.categoryBalloon), this.hideObj(this.line), this.hideObj(this.vLine), this.hideObj(this.hLine), this.hideValueBalloon(), this.hideObj(this.allBullets), this.destroyValueBalloons(), this.selectWithoutZooming || t.remove(this.selection), this.previousIndex = NaN
        },
        setPosition: function(e, i, s, a) {
            void 0 === i && (i = !0), "cursor" == this.type ? (this.tempPosition = NaN, t.ifArray(this.data) && (isNaN(e) && (e = this.getMousePosition()), (e != this.previousMousePosition || !0 === this.zoomed || this.oneBalloonOnly) && !isNaN(e) && ("mouse" == this.cursorPosition && (this.tempPosition = e), isNaN(s) && (s = this.chart.categoryAxis.xToIndex(e)), s != this.previousIndex || this.zoomed || "mouse" == this.cursorPosition || this.oneBalloonOnly) && (this.updateCursor(s, i, a), this.zoomed = !1), this.previousMousePosition = e)) : this.updateCrosshair()
        },
        normalizeBulletSize: function() {
            var t = this.resizedBullets;
            if (t)
                for (var e = 0; e < t.length; e++) {
                    var i = t[e],
                        s = i.bulletGraphics;
                    s && (s.translate(i.bx, i.by, 1), i = i.graph, isNaN(this.graphBulletAlpha) || (s.setAttr("fill-opacity", i.bulletAlpha), s.setAttr("stroke-opacity", i.bulletBorderAlpha)))
                }
        },
        updateCursor: function(e, i, s) {
            var a = this.chart,
                n = this.fullWidth,
                o = a.mouseX - this.x,
                r = a.mouseY - this.y;
            if (this.drawingNow && (t.remove(this.drawingLine), this.drawingLine = t.line(this.container, [this.x + this.drawStartX, this.x + o], [this.y + this.drawStartY, this.y + r], this.cursorColor, 1, 1)), this.enabled) {
                void 0 === i && (i = !0), this.index = e += this.adjustment;
                var h, l = a.categoryAxis,
                    d = a.dx,
                    c = a.dy,
                    u = this.x + 1,
                    p = this.y + 1,
                    m = this.width,
                    f = this.height,
                    g = this.data[e];
                if (this.data[e + 1] && (h = this.data[e + 1]), this.fireMoved(), g) {
                    var v = g.x[l.id],
                        b = a.rotate,
                        x = this.stepWidth,
                        C = this.categoryBalloon,
                        y = this.firstTime,
                        N = this.lastTime,
                        w = this.cursorPosition,
                        S = this.zooming,
                        A = this.panning,
                        M = a.graphs;
                    if (a.mouseIsOver || S || A || this.forceShow)
                        if (this.forceShow = !1, A) {
                            i = this.panClickPos, e = this.panClickEndTime;
                            var a = this.panClickStartTime,
                                S = this.panClickEnd,
                                D = this.panClickStart,
                                o = (b ? i - r : i - o) / x;
                            (!l.parseDates || l.equalSpacing) && (o = Math.round(o)), 0 !== o && (i = {
                                type: "zoomed",
                                target: this
                            }, i.chart = this.chart, l.parseDates && !l.equalSpacing ? (e + o > N && (o = N - e), y > a + o && (o = y - a), i.start = Math.round(a + o), i.end = Math.round(e + o), this.fire(i.type, i)) : S + o >= this.data.length || 0 > D + o || (i.start = D + o, i.end = S + o, this.fire(i.type, i)))
                        } else {
                            if ("start" == w ? v -= l.cellWidth / 2 : "mouse" == w && (a.mouseIsOver ? v = b ? r - 2 : o - 2 : isNaN(this.tempPosition) || (v = this.tempPosition - 2)), b) {
                                if (0 > v) {
                                    if (!S) return void this.hideCursor();
                                    v = 0
                                }
                                if (v > f + 1) {
                                    if (!S) return void this.hideCursor();
                                    v = f + 1
                                }

                            } else {
                                if (0 > v) {
                                    if (!S) return void this.hideCursor();
                                    v = 0
                                }
                                if (v > m) {
                                    if (!S) return void this.hideCursor();
                                    v = m
                                }
                            }
                            if (y = this.line, 0 < this.cursorAlpha && (b ? (N = 0, x = v + c, n && (x -= l.cellWidth / 2)) : (N = v, x = 0, n && (N -= l.cellWidth / 2)), w = this.animationDuration, w > 0 && !this.zooming ? isNaN(this.previousX) ? y.translate(N, x) : (y.translate(this.previousX, this.previousY), y.animate({
                                    translate: N + "," + x
                                }, w, "easeOutSine")) : y.translate(N, x), this.previousX = N, this.previousY = x, y.show()), this.linePos = b ? v + c : v, S && (n && y.hide(), b ? this.updateSelectionSize(NaN, v) : this.updateSelectionSize(v, NaN)), N = !0, S && (N = !1), this.categoryBalloonEnabled && N && (this.setBalloonPosition(C, l, v, b), (y = this.categoryBalloonFunction) ? C.showBalloon(y(g.category)) : (y = v = "", l.parseDates ? (v = t.formatDate(g.category, this.categoryBalloonDateFormat, a), l = t.changeDate(new Date(g.category), a.categoryAxis.minPeriod, 1), y = t.formatDate(l, this.categoryBalloonDateFormat, a), -1 != v.indexOf("fff") && (v = t.formatMilliseconds(v, g.category), y = t.formatMilliseconds(y, l))) : (v = t.fixNewLines(g.category), h && (y = t.fixNewLines(h.category))), l = this.categoryBalloonText.replace(/\[\[category\]\]/g, String(v)), l = l.replace(/\[\[toCategory\]\]/g, String(y)), C.showBalloon(l))), M && this.bulletsEnabled && this.showBullets(), this.oneBalloonOnly) {
                                for (v = 1 / 0, l = 0; l < M.length; l++) C = M[l], C.showBalloon && !C.hidden && C.balloonText && (h = g.axes[C.valueAxis.id].graphs[C.id], y = h.y, "top" == C.showBalloonAt && (y = 0), "bottom" == C.showBalloonAt && (y = this.height), isNaN(y) || (b ? Math.abs(o - y) < v && (v = Math.abs(o - y), D = C) : Math.abs(r - y) < v && (v = Math.abs(r - y), D = C)));
                                this.mostCloseGraph && (D = this.mostCloseGraph)
                            }
                            if (!s && (e != this.previousIndex || D != this.previousMostCloseGraph) && (this.normalizeBulletSize(), this.destroyValueBalloons(), this.resizedBullets = [], M && this.valueBalloonsEnabled && N && a.balloon.enabled)) {
                                for (this.valueBalloons = s = [], l = 0; l < M.length; l++)
                                    if (C = M[l], y = NaN, (!this.oneBalloonOnly || C == D) && C.showBalloon && !C.hidden && C.balloonText && ("step" == C.type && "left" == C.stepDirection && (g = this.data[e + 1]), g)) {
                                        if ((h = g.axes[C.valueAxis.id].graphs[C.id]) && (y = h.y), "top" == C.showBalloonAt && (y = 0), "bottom" == C.showBalloonAt && (y = this.height), this.showNextAvailable && isNaN(y) && e + 1 < this.data.length)
                                            for (N = e + 1; N < this.data.length && (!(v = this.data[N]) || (h = v.axes[C.valueAxis.id].graphs[C.id], y = h.y, isNaN(y))); N++);
                                        isNaN(y) || (v = h.x, x = !0, b ? (N = y, (0 > v || v > f) && (x = !1)) : (N = v, v = y, (0 > N || N > m + d + 1) && (x = !1), (-2 > y || y > f) && (x = !1)), x && (x = this.graphBulletSize, n = this.graphBulletAlpha, 1 == x && isNaN(n) || !t.isModern || !(c = h.bulletGraphics) || (c.translate(h.bx, h.by, x), this.resizedBullets.push(h), isNaN(n) || (c.setAttr("fill-opacity", n), c.setAttr("stroke-opacity", n))), x = C.valueBalloon, n = a.getBalloonColor(C, h), x.setBounds(u, p, u + m, p + f), x.pointerOrientation = "H", c = this.balloonPointerOrientation, "vertical" == c && (x.pointerOrientation = "V"), "horizontal" == c && (x.pointerOrientation = "H"), x.changeColor(n), void 0 !== C.balloonAlpha && (x.fillAlpha = C.balloonAlpha), void 0 !== C.balloonTextColor && (x.color = C.balloonTextColor), x.setPosition(N + u, v + p), N = a.formatString(C.balloonText, h, !0), (v = C.balloonFunction) && (N = v(h, C).toString()), "" !== N && (b ? x.showBalloon(N) : (x.text = N, x.show = !0), s.push({
                                            yy: y,
                                            balloon: x
                                        })), !b && x.set && (x.set.hide(), C = x.textDiv) && (C.style.visibility = "hidden")))
                                    }
                                this.avoidBalloonOverlapping && this.arrangeBalloons()
                            }
                            i ? (i = {
                                type: "changed"
                            }, i.index = e, i.chart = this.chart, i.zooming = S, i.mostCloseGraph = D, i.position = b ? r : o, i.target = this, a.fire("changed", i), this.fire("changed", i), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, a.updateLegendValues(e)), this.previousIndex = e, this.previousMostCloseGraph = D
                        }
                }
            } else this.hideCursor()
        },
        setBalloonPosition: function(t, e, i, s) {
            var a = e.position,
                n = e.inside;
            e = e.axisThickness;
            var o = this.chart,
                r = o.dx,
                o = o.dy,
                h = this.x,
                l = this.y,
                d = this.width,
                c = this.height;
            s ? (n && ("right" == a ? t.setBounds(h, l + o, h + d + r, l + i + o) : t.setBounds(h, l + o, h + d + r, l + i)), "right" == a ? n ? t.setPosition(h + d + r, l + i + o) : t.setPosition(h + d + r + e, l + i + o) : n ? t.setPosition(h, l + i) : t.setPosition(h - e, l + i)) : "top" == a ? n ? t.setPosition(h + i + r, l + o) : t.setPosition(h + i + r, l + o - e + 1) : n ? t.setPosition(h + i, l + c) : t.setPosition(h + i, l + c + e - 1)
        },
        setBalloonBounds: function(t, e, i) {
            var s = e.position,
                a = e.inside,
                n = e.axisThickness,
                o = e.tickLength,
                r = this.chart,
                h = r.dx,
                r = r.dy,
                l = this.x,
                d = this.y,
                c = this.width,
                u = this.height;
            i ? (a && (t.pointerWidth = 0), "right" == s ? a ? t.setBounds(l, d + r, l + c + h, d + u + r) : t.setBounds(l + c + h + n, d + r, l + c + 1e3, d + u + r) : a ? t.setBounds(l, d, c + l, u + d) : t.setBounds(-1e3, -1e3, l - o - n, d + u + 15)) : (t.maxWidth = c, e.parseDates && (o = 0, t.pointerWidth = 0), "top" == s ? a ? t.setBounds(l + h, d + r, c + h + l, u + d) : t.setBounds(l + h, -1e3, c + h + l, d + r - o - n) : a ? t.setBounds(l, d, c + l, u + d - o) : t.setBounds(l, d + u + o + n - 1, l + c, d + u + o + n))
        },
        enableDrawing: function(t) {
            this.enabled = !t, this.hideCursor(), this.rolledOver = !1, this.drawing = t
        },
        isZooming: function(t) {
            t && t != this.zooming && this.handleMouseDown("fake"), t || t == this.zooming || this.handleMouseUp()
        },
        handleMouseOut: function() {
            if (this.enabled)
                if (this.zooming) this.setPosition();
                else {
                    this.index = void 0;
                    var t = {
                        type: "changed",
                        index: void 0,
                        target: this
                    };
                    t.chart = this.chart, this.leaveCursor || this.fire("changed", t), this.chart.wasTouched && this.leaveAfterTouch || this.hideCursor()
                }
        },
        handleReleaseOutside: function() {
            this.handleMouseUp()
        },
        handleMouseUp: function() {
            var e, i = this.chart,
                s = this.data;
            if (i) {
                var a = i.mouseX - this.x,
                    n = i.mouseY - this.y;
                if (this.drawingNow) {
                    this.drawingNow = !1, t.remove(this.drawingLine), e = this.drawStartX;
                    var o = this.drawStartY;
                    (2 < Math.abs(e - a) || 2 < Math.abs(o - n)) && (e = {
                        type: "draw",
                        target: this,
                        chart: i,
                        initialX: e,
                        initialY: o,
                        finalX: a,
                        finalY: n
                    }, this.fire(e.type, e))
                }
                if (this.enabled && 0 < s.length) {
                    if (this.pan) this.rolledOver = !1;
                    else if (this.zoomable && this.zooming) {
                        if (e = this.selectWithoutZooming ? {
                                type: "selected"
                            } : {
                                type: "zoomed"
                            }, e.target = this, e.chart = i, "cursor" == this.type) this.rotate ? this.selectionPosY = n : this.selectionPosX = n = a, 4 > Math.abs(n - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (e.end = this.fromIndex, e.start = this.index) : (e.end = this.index, e.start = this.fromIndex), n = i.categoryAxis, n.parseDates && !n.equalSpacing && (s[e.start] && (e.start = s[e.start].time), s[e.end] && (e.end = i.getEndTime(s[e.end].time))), this.skipZoomDispatch || this.fire(e.type, e));
                        else {
                            var r = this.initialMouseX,
                                h = this.initialMouseY;
                            3 > Math.abs(a - r) && 3 > Math.abs(n - h) || (s = Math.min(r, a), o = Math.min(h, n), a = Math.abs(r - a), n = Math.abs(h - n), i.hideXScrollbar && (s = 0, a = this.width), i.hideYScrollbar && (o = 0, n = this.height), e.selectionHeight = n, e.selectionWidth = a, e.selectionY = o, e.selectionX = s, this.skipZoomDispatch || this.fire(e.type, e))
                        }
                        this.selectWithoutZooming || t.remove(this.selection)
                    }
                    this.skipZoomDispatch = !1
                }
            }
            this.panning = this.zooming = !1
        },
        showCursorAt: function(t) {
            var e = this.chart.categoryAxis;
            t = e.parseDates ? e.dateToCoordinate(t) : e.categoryToCoordinate(t), this.previousMousePosition = NaN, this.forceShow = !0, this.setPosition(t, !1)
        },
        clearSelection: function() {
            t.remove(this.selection)
        },
        handleMouseDown: function(e) {
            if (this.zoomable || this.pan || this.drawing) {
                var i = this.rotate,
                    s = this.chart,
                    a = s.mouseX - this.x,
                    n = s.mouseY - this.y;
                (a > 0 && a < this.width && n > 0 && n < this.height || "fake" == e) && (this.setPosition(), this.selectWithoutZooming && t.remove(this.selection), this.drawing ? (this.drawStartY = n, this.drawStartX = a, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, s.setMouseCursor("move"), this.panning = !0, this.panClickPos = i ? n : a, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, i ? (this.initialMouse = n, this.selectionPosY = this.linePos) : (this.initialMouse = a, this.selectionPosX = this.linePos)) : (this.initialMouseX = a, this.initialMouseY = n, this.selectionPosX = a, this.selectionPosY = n), this.zooming = !0))
            }
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.SimpleChartScrollbar = t.Class({
        construct: function(e) {
            this.createEvents("zoomed"), this.backgroundColor = "#D4D4D4", this.backgroundAlpha = 1, this.selectedBackgroundColor = "#EFEFEF", this.scrollDuration = this.selectedBackgroundAlpha = 1, this.resizeEnabled = !0, this.hideResizeGrips = !1, this.scrollbarHeight = 20, this.updateOnReleaseOnly = !1, 9 > document.documentMode && (this.updateOnReleaseOnly = !0), this.dragIconHeight = this.dragIconWidth = 35, this.dragIcon = "dragIconRoundBig", t.applyTheme(this, e, "SimpleChartScrollbar")
        },
        draw: function() {
            var e = this;
            if (e.destroy(), e.enabled) {
                var i = e.chart.container,
                    s = e.rotate,
                    a = e.chart;
                a.panRequired = !0;
                var n = i.set();
                e.set = n, a.scrollbarsSet.push(n);
                var o, r;
                if (s ? (o = e.scrollbarHeight, r = a.plotAreaHeight) : (r = e.scrollbarHeight, o = a.plotAreaWidth), e.width = o, (e.height = r) && o) {
                    var h = t.rect(i, o, r, e.backgroundColor, e.backgroundAlpha, 1, e.backgroundColor, e.backgroundAlpha);
                    t.setCN(a, h, "scrollbar-bg"), e.bg = h, n.push(h), h = t.rect(i, o, r, "#000", .005), n.push(h), e.invisibleBg = h, h.click(function() {
                        e.handleBgClick()
                    }).mouseover(function() {
                        e.handleMouseOver()
                    }).mouseout(function() {
                        e.handleMouseOut()
                    }).touchend(function() {
                        e.handleBgClick()
                    }), h = t.rect(i, o, r, e.selectedBackgroundColor, e.selectedBackgroundAlpha), t.setCN(a, h, "scrollbar-bg-selected"), e.selectedBG = h, n.push(h), o = t.rect(i, o, r, "#000", .005), e.dragger = o, n.push(o), o.mousedown(function(t) {
                        e.handleDragStart(t)
                    }).mouseup(function() {
                        e.handleDragStop()
                    }).mouseover(function() {
                        e.handleDraggerOver()
                    }).mouseout(function() {
                        e.handleMouseOut()
                    }).touchstart(function(t) {
                        e.handleDragStart(t)
                    }).touchend(function() {
                        e.handleDragStop()
                    }), o = a.pathToImages, r = e.dragIcon.replace(/\.[a-z]*$/i, ""), s ? (h = o + r + "H" + a.extension, o = e.dragIconWidth, s = e.dragIconHeight) : (h = o + r + a.extension, s = e.dragIconWidth, o = e.dragIconHeight), r = i.image(h, 0, 0, s, o), t.setCN(a, r, "scrollbar-grip-left"), h = i.image(h, 0, 0, s, o), t.setCN(a, h, "scrollbar-grip-right");
                    var l = 10,
                        d = 20;
                    a.panEventsEnabled && (l = 25, d = e.scrollbarHeight);
                    var c = t.rect(i, l, d, "#000", .005),
                        u = t.rect(i, l, d, "#000", .005);
                    u.translate(-(l - s) / 2, -(d - o) / 2), c.translate(-(l - s) / 2, -(d - o) / 2), s = i.set([r, u]), i = i.set([h, c]), e.iconLeft = s, n.push(e.iconLeft), e.iconRight = i, n.push(i), s.mousedown(function() {
                        e.leftDragStart()
                    }).mouseup(function() {
                        e.leftDragStop()
                    }).mouseover(function() {
                        e.iconRollOver()
                    }).mouseout(function() {
                        e.iconRollOut()
                    }).touchstart(function() {
                        e.leftDragStart()
                    }).touchend(function() {
                        e.leftDragStop()
                    }), i.mousedown(function() {
                        e.rightDragStart()
                    }).mouseup(function() {
                        e.rightDragStop()
                    }).mouseover(function() {
                        e.iconRollOver()
                    }).mouseout(function() {
                        e.iconRollOut()
                    }).touchstart(function() {
                        e.rightDragStart()
                    }).touchend(function() {
                        e.rightDragStop()
                    }), t.ifArray(a.chartData) ? n.show() : n.hide(), e.hideDragIcons(), e.clipDragger(!1)
                }
                n.translate(e.x, e.y), n.node.style.msTouchAction = "none"
            }
        },
        updateScrollbarSize: function(t, e) {
            t = Math.round(t), e = Math.round(e);
            var i, s, a, n, o = this.dragger;
            this.rotate ? (i = 0, s = t, a = this.width + 1, n = e - t, o.setAttr("height", e - t), o.setAttr("y", s)) : (i = t, s = 0, a = e - t, n = this.height + 1, o.setAttr("width", e - t), o.setAttr("x", i)), this.clipAndUpdate(i, s, a, n)
        },
        update: function() {
            var t, e, i, s = !1,
                a = this.x,
                n = this.y,
                o = this.dragger,
                r = this.getDBox();
            if (r) {
                e = r.x + a, i = r.y + n;
                var h = r.width,
                    r = r.height,
                    l = this.rotate,
                    d = this.chart,
                    c = this.width,
                    u = this.height,
                    p = d.mouseX,
                    m = d.mouseY;
                t = this.initialMouse, this.forceClip && this.clipDragger(!0), d.mouseIsOver && (this.dragging && (d = this.initialCoord, l ? (t = d + (m - t), 0 > t && (t = 0), d = u - r, t > d && (t = d), o.setAttr("y", t)) : (t = d + (p - t), 0 > t && (t = 0), d = c - h, t > d && (t = d), o.setAttr("x", t)), this.clipDragger(!0)), this.resizingRight && (l ? (t = m - i, t + i > u + n && (t = u - i + n), 0 > t ? (this.resizingRight = !1, s = this.resizingLeft = !0) : (0 === t && (t = .1), o.setAttr("height", t))) : (t = p - e, t + e > c + a && (t = c - e + a), 0 > t ? (this.resizingRight = !1, s = this.resizingLeft = !0) : (0 === t && (t = .1), o.setAttr("width", t))), this.clipDragger(!0)), this.resizingLeft && (l ? (e = i, i = m, n > i && (i = n), i > u + n && (i = u + n), t = !0 === s ? e - i : r + e - i, 0 > t ? (this.resizingRight = !0, this.resizingLeft = !1, o.setAttr("y", e + r - n)) : (0 === t && (t = .1), o.setAttr("y", i - n), o.setAttr("height", t))) : (i = p, a > i && (i = a), i > c + a && (i = c + a), t = !0 === s ? e - i : h + e - i, 0 > t ? (this.resizingRight = !0, this.resizingLeft = !1, o.setAttr("x", e + h - a)) : (0 === t && (t = .1), o.setAttr("x", i - a), o.setAttr("width", t))), this.clipDragger(!0)))
            }
        },
        stopForceClip: function() {
            this.forceClip = !1
        },
        clipDragger: function(t) {
            var e = this.getDBox();
            if (e) {
                var i = e.x,
                    s = e.y,
                    a = e.width,
                    e = e.height,
                    n = !1;
                this.rotate ? (i = 0, a = this.width + 1, (this.clipY != s || this.clipH != e) && (n = !0)) : (s = 0, e = this.height + 1, (this.clipX != i || this.clipW != a) && (n = !0)), n && (this.clipAndUpdate(i, s, a, e), t && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
            }
        },
        maskGraphs: function() {},
        clipAndUpdate: function(t, e, i, s) {
            this.clipX = t, this.clipY = e, this.clipW = i, this.clipH = s, this.selectedBG.clipRect(t, e, i, s), this.updateDragIconPositions(), this.maskGraphs(t, e, i, s)
        },
        dispatchScrollbarEvent: function() {
            if (this.skipEvent) this.skipEvent = !1;
            else {
                var t = this.chart;
                t.hideBalloon();
                var e = this.getDBox(),
                    i = e.x,
                    s = e.y,
                    a = e.width,
                    e = e.height;
                this.rotate ? (i = s, a = this.height / e) : a = this.width / a, t = {
                    type: "zoomed",
                    position: i,
                    chart: t,
                    target: this,
                    multiplier: a
                }, this.fire(t.type, t)
            }
        },
        updateDragIconPositions: function() {
            var t, e, i = this.getDBox(),
                s = i.x,
                a = i.y,
                n = this.iconLeft,
                o = this.iconRight,
                r = this.scrollbarHeight;
            this.rotate ? (t = this.dragIconWidth, e = this.dragIconHeight, n.translate((r - e) / 2, a - t / 2), o.translate((r - e) / 2, a + i.height - t / 2)) : (t = this.dragIconHeight, e = this.dragIconWidth, n.translate(s - e / 2, (r - t) / 2), o.translate(s - e / 2 + i.width, (r - t) / 2))
        },
        showDragIcons: function() {
            this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
        },
        hideDragIcons: function() {
            this.resizingLeft || this.resizingRight || this.dragging || ((this.hideResizeGrips || !this.resizeEnabled) && (this.iconLeft.hide(), this.iconRight.hide()), this.removeCursors())
        },
        removeCursors: function() {
            this.chart.setMouseCursor("auto")
        },
        relativeZoom: function(t, e) {
            this.enabled && (this.dragger.stop(), this.multiplier = t, this.position = e, this.updateScrollbarSize(e, this.rotate ? e + this.height / t : e + this.width / t), this.clipDragger())
        },
        destroy: function() {
            this.clear(), t.remove(this.set), t.remove(this.iconRight), t.remove(this.iconLeft)
        },
        clear: function() {},
        handleDragStart: function() {
            if (this.enabled) {
                var t = this.chart;
                this.dragger.stop(), this.removeCursors(), this.dragging = !0;
                var e = this.getDBox();
                this.rotate ? (this.initialCoord = e.y, this.initialMouse = t.mouseY) : (this.initialCoord = e.x, this.initialMouse = t.mouseX)
            }
        },
        handleDragStop: function() {
            this.updateOnReleaseOnly && (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent()), this.dragging = !1, this.mouseIsOver && this.removeCursors(), this.update()
        },
        handleDraggerOver: function() {
            this.handleMouseOver()
        },
        leftDragStart: function() {
            this.dragger.stop(), this.resizingLeft = !0
        },
        leftDragStop: function() {
            this.resizingLeft = !1, this.mouseIsOver || this.removeCursors(), this.updateOnRelease()
        },
        rightDragStart: function() {
            this.dragger.stop(), this.resizingRight = !0
        },
        rightDragStop: function() {
            this.resizingRight = !1, this.mouseIsOver || this.removeCursors(), this.updateOnRelease()
        },
        iconRollOut: function() {
            this.removeCursors()
        },
        iconRollOver: function() {
            this.rotate ? this.chart.setMouseCursor("ns-resize") : this.chart.setMouseCursor("ew-resize"), this.handleMouseOver()
        },
        getDBox: function() {
            return this.dragger ? this.dragger.getBBox() : void 0
        },
        handleBgClick: function() {
            var e = this;
            if (!e.resizingRight && !e.resizingLeft) {
                e.zooming = !0;
                var i, s, a = e.scrollDuration,
                    n = e.dragger;
                i = e.getDBox();
                var o = i.height,
                    r = i.width;
                s = e.chart;
                var h = e.y,
                    l = e.x,
                    d = e.rotate;
                d ? (i = "y", s = s.mouseY - o / 2 - h, s = t.fitToBounds(s, 0, e.height - o)) : (i = "x", s = s.mouseX - r / 2 - l, s = t.fitToBounds(s, 0, e.width - r)), e.updateOnReleaseOnly ? (e.skipEvent = !1, n.setAttr(i, s), e.dispatchScrollbarEvent(), e.clipDragger()) : (s = Math.round(s), d ? n.animate({
                    y: s
                }, a, ">") : n.animate({
                    x: s
                }, a, ">"), e.forceClip = !0, clearTimeout(e.forceTO), e.forceTO = setTimeout(function() {
                    e.stopForceClip.call(e)
                }, 5e3 * a))
            }
        },
        updateOnRelease: function() {
            this.updateOnReleaseOnly && (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent())
        },
        handleReleaseOutside: function() {
            this.set && ((this.resizingLeft || this.resizingRight || this.dragging) && (this.updateOnRelease(), this.removeCursors()), this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1, this.hideDragIcons(), this.update())
        },
        handleMouseOver: function() {
            this.mouseIsOver = !0, this.showDragIcons()
        },
        handleMouseOut: function() {
            this.mouseIsOver = !1, this.hideDragIcons()
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.ChartScrollbar = t.Class({
        inherits: t.SimpleChartScrollbar,
        construct: function(e) {
            this.cname = "ChartScrollbar", t.ChartScrollbar.base.construct.call(this, e), this.enabled = !0, this.graphLineColor = "#BBBBBB", this.graphLineAlpha = 0, this.graphFillColor = "#BBBBBB", this.graphFillAlpha = 1, this.selectedGraphLineColor = "#888888", this.selectedGraphLineAlpha = 0,
                this.selectedGraphFillColor = "#888888", this.selectedGraphFillAlpha = 1, this.gridCount = 0, this.gridColor = "#FFFFFF", this.gridAlpha = .7, this.skipEvent = this.autoGridCount = !1, this.color = "#FFFFFF", this.scrollbarCreated = !1, this.offset = 0, this.oppositeAxis = !0, t.applyTheme(this, e, this.cname)
        },
        init: function() {
            var e = this.categoryAxis,
                i = this.chart;
            if (e || (this.categoryAxis = e = new t.CategoryAxis), e.chart = i, e.id = "scrollbar", e.dateFormats = i.categoryAxis.dateFormats, e.markPeriodChange = i.categoryAxis.markPeriodChange, e.boldPeriodBeginning = i.categoryAxis.boldPeriodBeginning, e.labelFunction = i.categoryAxis.labelFunction, e.axisItemRenderer = t.RecItem, e.axisRenderer = t.RecAxis, e.guideFillRenderer = t.RecFill, e.inside = !0, e.fontSize = this.fontSize, e.tickLength = 0, e.axisAlpha = 0, t.isString(this.graph) && (this.graph = t.getObjById(i.graphs, this.graph)), e = this.graph) {
                var s = this.valueAxis;
                s || (this.valueAxis = s = new t.ValueAxis, s.visible = !1, s.scrollbar = !0, s.axisItemRenderer = t.RecItem, s.axisRenderer = t.RecAxis, s.guideFillRenderer = t.RecFill, s.labelsEnabled = !1, s.chart = i), i = this.unselectedGraph, i || (i = new t.AmGraph, i.scrollbar = !0, this.unselectedGraph = i, i.negativeBase = e.negativeBase, i.noStepRisers = e.noStepRisers), i = this.selectedGraph, i || (i = new t.AmGraph, i.scrollbar = !0, this.selectedGraph = i, i.negativeBase = e.negativeBase, i.noStepRisers = e.noStepRisers)
            }
            this.scrollbarCreated = !0
        },
        draw: function() {
            var e = this;
            if (t.ChartScrollbar.base.draw.call(e), e.enabled) {
                e.scrollbarCreated || e.init();
                var i = e.chart,
                    s = i.chartData,
                    a = e.categoryAxis,
                    n = e.rotate,
                    o = e.x,
                    r = e.y,
                    h = e.width,
                    l = e.height,
                    d = i.categoryAxis,
                    c = e.set;
                if (a.setOrientation(!n), a.parseDates = d.parseDates, a.rotate = n, a.equalSpacing = d.equalSpacing, a.minPeriod = d.minPeriod, a.startOnAxis = d.startOnAxis, a.viW = h, a.viH = l, a.width = h, a.height = l, a.gridCount = e.gridCount, a.gridColor = e.gridColor, a.gridAlpha = e.gridAlpha, a.color = e.color, a.tickLength = 0, a.axisAlpha = 0, a.autoGridCount = e.autoGridCount, a.parseDates && !a.equalSpacing && a.timeZoom(i.firstTime, i.lastTime), a.zoom(0, s.length - 1), d = e.graph) {
                    var u = e.valueAxis,
                        p = d.valueAxis;
                    u.id = p.id, u.rotate = n, u.setOrientation(n), u.width = h, u.height = l, u.viW = h, u.viH = l, u.dataProvider = s, u.reversed = p.reversed, u.logarithmic = p.logarithmic, u.gridAlpha = 0, u.axisAlpha = 0, c.push(u.set), n ? (u.y = r, u.x = 0) : (u.x = o, u.y = 0);
                    var m, o = 1 / 0,
                        r = -(1 / 0);
                    for (m = 0; m < s.length; m++) {
                        var f, g = s[m].axes[p.id].graphs[d.id].values;
                        for (f in g)
                            if (g.hasOwnProperty(f) && "percents" != f && "total" != f) {
                                var v = g[f];
                                o > v && (o = v), v > r && (r = v)
                            }
                    }
                    1 / 0 != o && (u.minimum = o), -(1 / 0) != r && (u.maximum = r + .1 * (r - o)), o == r && (--u.minimum, u.maximum += 1), void 0 !== e.minimum && (u.minimum = e.minimum), void 0 !== e.maximum && (u.maximum = e.maximum), u.zoom(0, s.length - 1), f = e.unselectedGraph, f.id = d.id, f.bcn = "scrollbar-graph-", f.rotate = n, f.chart = i, f.data = s, f.valueAxis = u, f.chart = d.chart, f.categoryAxis = e.categoryAxis, f.periodSpan = d.periodSpan, f.valueField = d.valueField, f.openField = d.openField, f.closeField = d.closeField, f.highField = d.highField, f.lowField = d.lowField, f.lineAlpha = e.graphLineAlpha, f.lineColorR = e.graphLineColor, f.fillAlphas = e.graphFillAlpha, f.fillColorsR = e.graphFillColor, f.connect = d.connect, f.hidden = d.hidden, f.width = h, f.height = l, f.pointPosition = d.pointPosition, f.stepDirection = d.stepDirection, f.periodSpan = d.periodSpan, p = e.selectedGraph, p.id = d.id, p.bcn = f.bcn + "selected-", p.rotate = n, p.chart = i, p.data = s, p.valueAxis = u, p.chart = d.chart, p.categoryAxis = a, p.periodSpan = d.periodSpan, p.valueField = d.valueField, p.openField = d.openField, p.closeField = d.closeField, p.highField = d.highField, p.lowField = d.lowField, p.lineAlpha = e.selectedGraphLineAlpha, p.lineColorR = e.selectedGraphLineColor, p.fillAlphas = e.selectedGraphFillAlpha, p.fillColorsR = e.selectedGraphFillColor, p.connect = d.connect, p.hidden = d.hidden, p.width = h, p.height = l, p.pointPosition = d.pointPosition, p.stepDirection = d.stepDirection, p.periodSpan = d.periodSpan, i = e.graphType, i || (i = d.type), f.type = i, p.type = i, s = s.length - 1, f.zoom(0, s), p.zoom(0, s), p.set.click(function() {
                        e.handleBackgroundClick()
                    }).mouseover(function() {
                        e.handleMouseOver()
                    }).mouseout(function() {
                        e.handleMouseOut()
                    }), f.set.click(function() {
                        e.handleBackgroundClick()
                    }).mouseover(function() {
                        e.handleMouseOver()
                    }).mouseout(function() {
                        e.handleMouseOut()
                    }), c.push(f.set), c.push(p.set)
                }
                c.push(a.set), c.push(a.labelsSet), e.bg.toBack(), e.invisibleBg.toFront(), e.dragger.toFront(), e.iconLeft.toFront(), e.iconRight.toFront()
            }
        },
        timeZoom: function(e, i, s) {
            this.startTime = e, this.endTime = i, this.timeDifference = i - e, this.skipEvent = !t.toBoolean(s), this.zoomScrollbar(), this.skipEvent || this.dispatchScrollbarEvent()
        },
        zoom: function(t, e) {
            this.start = t, this.end = e, this.skipEvent = !0, this.zoomScrollbar()
        },
        dispatchScrollbarEvent: function() {
            if (this.skipEvent) this.skipEvent = !1;
            else {
                var t, e, i = this.chart.chartData,
                    s = this.dragger.getBBox();
                t = s.x;
                var a = s.y,
                    n = s.width,
                    s = s.height,
                    o = this.chart;
                this.rotate ? (t = a, e = s) : e = n, n = {
                    type: "zoomed",
                    target: this
                }, n.chart = o;
                var r = this.categoryAxis,
                    h = this.stepWidth,
                    a = o.minSelectedTime,
                    s = !1;
                r.parseDates && !r.equalSpacing ? (i = o.lastTime, o = o.firstTime, r = Math.round(t / h) + o, t = this.dragging ? r + this.timeDifference : Math.round((t + e) / h) + o, r > t && (r = t), a > 0 && a > t - r && (t = Math.round(r + (t - r) / 2), s = Math.round(a / 2), r = t - s, t += s, s = !0), t > i && (t = i), r > t - a && (r = t - a), o > r && (r = o), r + a > t && (t = r + a), (r != this.startTime || t != this.endTime) && (this.startTime = r, this.endTime = t, n.start = r, n.end = t, n.startDate = new Date(r), n.endDate = new Date(t), this.fire(n.type, n))) : (r.startOnAxis || (t += h / 2), e -= this.stepWidth / 2, a = r.xToIndex(t), t = r.xToIndex(t + e), (a != this.start || this.end != t) && (r.startOnAxis && (this.resizingRight && a == t && t++, this.resizingLeft && a == t && (a > 0 ? a-- : t = 1)), this.start = a, this.end = this.dragging ? this.start + this.difference : t, n.start = this.start, n.end = this.end, r.parseDates && (i[this.start] && (n.startDate = new Date(i[this.start].time)), i[this.end] && (n.endDate = new Date(i[this.end].time))), this.fire(n.type, n))), s && this.zoomScrollbar()
            }
        },
        zoomScrollbar: function() {
            var t, e;
            t = this.chart;
            var i = t.chartData,
                s = this.categoryAxis;
            s.parseDates && !s.equalSpacing ? (i = s.stepWidth, s = t.firstTime, t = i * (this.startTime - s), e = i * (this.endTime - s)) : (t = i[this.start].x[s.id], e = i[this.end].x[s.id], i = s.stepWidth, s.startOnAxis || (s = i / 2, t -= s, e += s)), this.stepWidth = i, this.updateScrollbarSize(t, e)
        },
        maskGraphs: function(t, e, i, s) {
            var a = this.selectedGraph;
            a && a.set.clipRect(t, e, i, s)
        },
        handleDragStart: function() {
            t.ChartScrollbar.base.handleDragStart.call(this), this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0)
        },
        handleBackgroundClick: function() {
            t.ChartScrollbar.base.handleBackgroundClick.call(this), this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmBalloon = t.Class({
        construct: function(e) {
            this.cname = "AmBalloon", this.enabled = !0, this.fillColor = "#FFFFFF", this.fillAlpha = .8, this.borderThickness = 2, this.borderColor = "#FFFFFF", this.borderAlpha = 1, this.cornerRadius = 0, this.maxWidth = 220, this.horizontalPadding = 8, this.verticalPadding = 4, this.pointerWidth = 6, this.pointerOrientation = "V", this.color = "#000000", this.adjustBorderColor = !0, this.show = this.follow = this.showBullet = !1, this.bulletSize = 3, this.shadowAlpha = .4, this.shadowColor = "#000000", this.fadeOutDuration = this.animationDuration = .3, this.fixedPosition = !0, this.offsetY = 6, this.offsetX = 1, this.textAlign = "center", this.disableMouseEvents = !0, this.deltaSignX = this.deltaSignY = 1, t.isModern || (this.offsetY *= 1.5), t.applyTheme(this, e, this.cname)
        },
        draw: function() {
            var e = this.pointToX,
                i = this.pointToY,
                s = this.chart;
            if (t.VML && (this.fadeOutDuration = 0), this.xAnim && s.stopAnim(this.xAnim), this.yAnim && s.stopAnim(this.yAnim), !isNaN(e)) {
                var a = this.follow,
                    n = s.container,
                    o = this.set;
                if (t.remove(o), this.removeDiv(), o = n.set(), o.node.style.pointerEvents = "none", this.set = o, s.balloonsSet.push(o), this.show) {
                    var r = this.l,
                        h = this.t,
                        l = this.r,
                        d = this.b,
                        c = this.balloonColor,
                        u = this.fillColor,
                        p = this.borderColor,
                        m = u;
                    void 0 != c && (this.adjustBorderColor ? m = p = c : u = c);
                    var f = this.horizontalPadding,
                        g = this.verticalPadding,
                        v = this.pointerWidth,
                        b = this.pointerOrientation,
                        x = this.cornerRadius,
                        C = s.fontFamily,
                        y = this.fontSize;
                    void 0 == y && (y = s.fontSize);
                    var c = document.createElement("div"),
                        N = s.classNamePrefix;
                    c.className = N + "-balloon-div", this.className && (c.className = c.className + " " + N + "-balloon-div-" + this.className), N = c.style, this.disableMouseEvents && (N.pointerEvents = "none"), N.position = "absolute";
                    var w = this.minWidth,
                        S = "";
                    isNaN(w) || (S = "min-width:" + (w - 2 * f) + "px; "), c.innerHTML = '<div style="text-align:' + this.textAlign + "; " + S + "max-width:" + this.maxWidth + "px; font-size:" + y + "px; color:" + this.color + "; font-family:" + C + '">' + this.text + "</div>", s.chartDiv.appendChild(c), this.textDiv = c, y = c.offsetWidth, C = c.offsetHeight, c.clientHeight && (y = c.clientWidth, C = c.clientHeight), C += 2 * g, S = y + 2 * f, !isNaN(w) && w > S && (S = w), window.opera && (C += 2);
                    var A = !1,
                        y = this.offsetY;
                    s.handDrawn && (y += s.handDrawScatter + 2), "H" != b ? (w = e - S / 2, h + C + 10 > i && "down" != b ? (A = !0, a && (i += y), y = i + v, this.deltaSignY = -1) : (a && (i -= y), y = i - C - v, this.deltaSignY = 1)) : (2 * v > C && (v = C / 2), y = i - C / 2, r + (l - r) / 2 > e ? (w = e + v, this.deltaSignX = -1) : (w = e - S - v, this.deltaSignX = 1)), y + C >= d && (y = d - C), h > y && (y = h), r > w && (w = r), w + S > l && (w = l - S);
                    var M, h = y + g,
                        d = w + f,
                        g = this.shadowAlpha,
                        D = this.shadowColor,
                        f = this.borderThickness,
                        T = this.bulletSize;
                    x > 0 || 0 === v ? (g > 0 && (e = t.rect(n, S, C, u, 0, f + 1, D, g, this.cornerRadius), t.isModern ? e.translate(1, 1) : e.translate(4, 4), o.push(e)), u = t.rect(n, S, C, u, this.fillAlpha, f, p, this.borderAlpha, this.cornerRadius), this.showBullet && (M = t.circle(n, T, m, this.fillAlpha), o.push(M))) : (m = [], x = [], "H" != b ? (r = e - w, r > S - v && (r = S - v), v > r && (r = v), m = [0, r - v, e - w, r + v, S, S, 0, 0], x = A ? [0, 0, i - y, 0, 0, C, C, 0] : [C, C, i - y, C, C, 0, 0, C]) : (m = i - y, m > C - v && (m = C - v), v > m && (m = v), x = [0, m - v, i - y, m + v, C, C, 0, 0], m = r + (l - r) / 2 > e ? [0, 0, e > w ? 0 : e - w, 0, 0, S, S, 0] : [S, S, w + S > e ? S : e - w, S, S, 0, 0, S]), g > 0 && (e = t.polygon(n, m, x, u, 0, f, D, g), e.translate(1, 1), o.push(e)), u = t.polygon(n, m, x, u, this.fillAlpha, f, p, this.borderAlpha)), this.bg = u, o.push(u), u.toFront(), t.setCN(s, u, "balloon-bg"), this.className && t.setCN(s, u, "balloon-bg-" + this.className), n = 1 * this.deltaSignX, N.left = d + "px", N.top = h + "px", o.translate(w - n, y), u = u.getBBox(), this.bottom = y + C + 1, this.yPos = u.y + y, M && M.translate(this.pointToX - w + n, i - y), i = this.animationDuration, 0 < this.animationDuration && !a && !isNaN(this.prevX) && (o.translate(this.prevX, this.prevY), o.animate({
                        translate: w - n + "," + y
                    }, i, "easeOutSine"), c && (N.left = this.prevTX + "px", N.top = this.prevTY + "px", this.xAnim = s.animate({
                        node: c
                    }, "left", this.prevTX, d, i, "easeOutSine", "px"), this.yAnim = s.animate({
                        node: c
                    }, "top", this.prevTY, h, i, "easeOutSine", "px"))), this.prevX = w - n, this.prevY = y, this.prevTX = d, this.prevTY = h
                }
            }
        },
        followMouse: function() {
            if (this.follow && this.show) {
                var t = this.chart.mouseX - this.offsetX * this.deltaSignX,
                    e = this.chart.mouseY;
                if (this.pointToX = t, this.pointToY = e, t != this.previousX || e != this.previousY)
                    if (this.previousX = t, this.previousY = e, 0 === this.cornerRadius) this.draw();
                    else {
                        var i = this.set;
                        if (i) {
                            var s = i.getBBox(),
                                t = t - s.width / 2,
                                a = e - s.height - 10;
                            t < this.l && (t = this.l), t > this.r - s.width && (t = this.r - s.width), a < this.t && (a = e + 10), i.translate(t, a), e = this.textDiv.style, e.left = t + this.horizontalPadding + "px", e.top = a + this.verticalPadding + "px"
                        }
                    }
            }
        },
        changeColor: function(t) {
            this.balloonColor = t
        },
        setBounds: function(t, e, i, s) {
            this.l = t, this.t = e, this.r = i, this.b = s, this.destroyTO && clearTimeout(this.destroyTO)
        },
        showBalloon: function(t) {
            this.text = t, this.show = !0, this.destroyTO && clearTimeout(this.destroyTO), t = this.chart, this.fadeAnim1 && t.stopAnim(this.fadeAnim1), this.fadeAnim2 && t.stopAnim(this.fadeAnim2), this.draw()
        },
        hide: function(t) {
            var e = this;
            isNaN(t) && (t = e.fadeOutDuration);
            var i = e.chart;
            if (t > 0) {
                e.destroyTO && clearTimeout(e.destroyTO), e.destroyTO = setTimeout(function() {
                    e.destroy.call(e)
                }, 1e3 * t), e.follow = !1, e.show = !1;
                var s = e.set;
                s && (s.setAttr("opacity", e.fillAlpha), e.fadeAnim1 = s.animate({
                    opacity: 0
                }, t, "easeInSine")), e.textDiv && (e.fadeAnim2 = i.animate({
                    node: e.textDiv
                }, "opacity", 1, 0, t, "easeInSine", ""))
            } else e.show = !1, e.follow = !1, e.destroy()
        },
        setPosition: function(t, e, i) {
            this.pointToX = t, this.pointToY = e, i && (t == this.previousX && e == this.previousY || this.draw()), this.previousX = t, this.previousY = e
        },
        followCursor: function(t) {
            var e = this;
            (e.follow = t) ? (e.pShowBullet = e.showBullet, e.showBullet = !1) : void 0 !== e.pShowBullet && (e.showBullet = e.pShowBullet), clearInterval(e.interval);
            var i = e.chart.mouseX,
                s = e.chart.mouseY;
            !isNaN(i) && t && (e.pointToX = i - e.offsetX * e.deltaSignX, e.pointToY = s, e.followMouse(), e.interval = setInterval(function() {
                e.followMouse.call(e)
            }, 40))
        },
        removeDiv: function() {
            if (this.textDiv) {
                var t = this.textDiv.parentNode;
                t && t.removeChild(this.textDiv)
            }
        },
        destroy: function() {
            clearInterval(this.interval), t.remove(this.set), this.removeDiv(), this.set = null
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmCoordinateChart = t.Class({
        inherits: t.AmChart,
        construct: function(e) {
            t.AmCoordinateChart.base.construct.call(this, e), this.theme = e, this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph"), this.startAlpha = 1, this.startDuration = 0, this.startEffect = "elastic", this.sequencedAnimation = !0, this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" "), this.balloonDateFormat = "MMM DD, YYYY", this.valueAxes = [], this.graphs = [], this.guides = [], this.gridAboveGraphs = !1, t.applyTheme(this, e, "AmCoordinateChart")
        },
        initChart: function() {
            t.AmCoordinateChart.base.initChart.call(this);
            var e = this.categoryAxis;
            e && (this.categoryAxis = t.processObject(e, t.CategoryAxis, this.theme)), this.processValueAxes(), this.createValueAxes(), this.processGraphs(), this.processGuides(), t.VML && (this.startAlpha = 1), this.setLegendData(this.graphs), this.gridAboveGraphs && this.gridSet.toFront()
        },
        createValueAxes: function() {
            if (0 === this.valueAxes.length) {
                var e = new t.ValueAxis;
                this.addValueAxis(e)
            }
        },
        parseData: function() {
            this.processValueAxes(), this.processGraphs()
        },
        parseSerialData: function(e) {
            var i, s = this.graphs,
                a = {},
                n = this.seriesIdField;
            if (n || (n = this.categoryField), this.chartData = [], e) {
                var o, r, h, l, d = !1,
                    c = this.categoryAxis;
                c && (d = c.parseDates, r = c.forceShowField, l = c.classNameField, h = c.labelColorField, o = c.categoryFunction);
                var u, p, m, f = {};
                d && (i = t.extractPeriod(c.minPeriod), u = i.period, p = i.count, m = t.getPeriodDuration(u, p));
                var g = {};
                this.lookupTable = g;
                var v, b = this.dataDateFormat,
                    x = {};
                for (v = 0; v < e.length; v++) {
                    var C = {},
                        y = e[v];
                    if (i = y[this.categoryField], C.dataContext = y, C.category = o ? o(i, y, c) : String(i), r && (C.forceShow = y[r]), l && (C.className = y[l]), h && (C.labelColor = y[h]), g[y[n]] = C, !d || (c.categoryFunction ? i = c.categoryFunction(i, y, c) : (!b || i instanceof Date || (i = i.toString() + " |"), i = t.getDate(i, b, c.minPeriod)), i = t.resetDateToMin(i, u, p, c.firstDayOfWeek), C.category = i, C.time = i.getTime(), !isNaN(C.time))) {
                        var N = this.valueAxes;
                        C.axes = {}, C.x = {};
                        var w;
                        for (w = 0; w < N.length; w++) {
                            var S = N[w].id;
                            C.axes[S] = {}, C.axes[S].graphs = {};
                            var A;
                            for (A = 0; A < s.length; A++) {
                                i = s[A];
                                var M = i.id,
                                    D = 1.1;
                                isNaN(i.gapPeriod) || (D = i.gapPeriod);
                                var T = i.periodValue;
                                if (i.valueAxis.id == S) {
                                    C.axes[S].graphs[M] = {};
                                    var k = {};
                                    k.index = v;
                                    var B = y;
                                    i.dataProvider && (B = a), k.values = this.processValues(B, i, T), !i.connect && x && x[M] && D > 0 && C.time - f[M] >= m * D && (x[M].gap = !0), this.processFields(i, k, B), k.category = C.category, k.serialDataItem = C, k.graph = i, C.axes[S].graphs[M] = k, f[M] = C.time, x[M] = k
                                }
                            }
                        }
                        this.chartData[v] = C
                    }
                }
            }
            for (e = 0; e < s.length; e++) i = s[e], i.dataProvider && this.parseGraphData(i)
        },
        processValues: function(e, i, s) {
            var a, n = {},
                o = !1;
            "candlestick" != i.type && "ohlc" != i.type || "" === s || (o = !0);
            for (var r = "value error open close low high".split(" "), h = 0; h < r.length; h++) {
                var l = r[h];
                "value" != l && "error" != l && o && (s = l.charAt(0).toUpperCase() + l.slice(1));
                var d = e[i[l + "Field"] + s];
                null !== d && (a = Number(d), isNaN(a) || (n[l] = a), "date" == i.valueAxis.type && void 0 !== d && (a = t.getDate(d, i.chart.dataDateFormat), n[l] = a.getTime()))
            }
            return n
        },
        parseGraphData: function(t) {
            var e = t.dataProvider,
                i = t.seriesIdField;
            i || (i = this.seriesIdField), i || (i = this.categoryField);
            var s;
            for (s = 0; s < e.length; s++) {
                var a = e[s],
                    n = this.lookupTable[String(a[i])],
                    o = t.valueAxis.id;
                n && (o = n.axes[o].graphs[t.id], o.serialDataItem = n, o.values = this.processValues(a, t, t.periodValue), this.processFields(t, o, a))
            }
        },
        addValueAxis: function(t) {
            t.chart = this, this.valueAxes.push(t), this.validateData()
        },
        removeValueAxesAndGraphs: function() {
            var t, e = this.valueAxes;
            for (t = e.length - 1; t > -1; t--) this.removeValueAxis(e[t])
        },
        removeValueAxis: function(t) {
            var e, i = this.graphs;
            for (e = i.length - 1; e >= 0; e--) {
                var s = i[e];
                s && s.valueAxis == t && this.removeGraph(s)
            }
            for (i = this.valueAxes, e = i.length - 1; e >= 0; e--) i[e] == t && i.splice(e, 1);
            this.validateData()
        },
        addGraph: function(t) {
            this.graphs.push(t), this.chooseGraphColor(t, this.graphs.length - 1), this.validateData()
        },
        removeGraph: function(t) {
            var e, i = this.graphs;
            for (e = i.length - 1; e >= 0; e--) i[e] == t && (i.splice(e, 1), t.destroy());
            this.validateData()
        },
        processValueAxes: function() {
            var e, i = this.valueAxes;
            for (e = 0; e < i.length; e++) {
                var s = i[e],
                    s = t.processObject(s, t.ValueAxis, this.theme);
                i[e] = s, s.chart = this, s.id || (s.id = "valueAxisAuto" + e + "_" + (new Date).getTime()), void 0 === s.usePrefixes && (s.usePrefixes = this.usePrefixes)
            }
        },
        processGuides: function() {
            var e = this.guides,
                i = this.categoryAxis;
            if (e)
                for (var s = 0; s < e.length; s++) {
                    var a = e[s];
                    (void 0 !== a.category || void 0 !== a.date) && i && i.addGuide(a), a.id || (a.id = "guideAuto" + s + "_" + (new Date).getTime());
                    var n = a.valueAxis;
                    n ? (t.isString(n) && (n = this.getValueAxisById(n)), n ? n.addGuide(a) : this.valueAxes[0].addGuide(a)) : isNaN(a.value) || this.valueAxes[0].addGuide(a)
                }
        },
        processGraphs: function() {
            var e, i = this.graphs;
            for (e = 0; e < i.length; e++) {
                var s = i[e],
                    s = t.processObject(s, t.AmGraph, this.theme);
                i[e] = s, this.chooseGraphColor(s, e), s.chart = this, t.isString(s.valueAxis) && (s.valueAxis = this.getValueAxisById(s.valueAxis)), s.valueAxis || (s.valueAxis = this.valueAxes[0]), s.id || (s.id = "graphAuto" + e + "_" + (new Date).getTime())
            }
        },
        formatString: function(e, i, s) {
            var a = i.graph,
                n = a.valueAxis;
            return n.duration && i.values.value && (n = t.formatDuration(i.values.value, n.duration, "", n.durationUnits, n.maxInterval, n.numberFormatter), e = e.split("[[value]]").join(n)), e = t.massReplace(e, {
                "[[title]]": a.title,
                "[[description]]": i.description
            }), e = s ? t.fixNewLines(e) : t.fixBrakes(e), e = t.cleanFromEmpty(e)
        },
        getBalloonColor: function(e, i, s) {
            var a = e.lineColor,
                n = e.balloonColor;
            return s && (n = a), s = e.fillColorsR, "object" == typeof s ? a = s[0] : void 0 !== s && (a = s), i.isNegative && (s = e.negativeLineColor, e = e.negativeFillColors, "object" == typeof e ? s = e[0] : void 0 !== e && (s = e), void 0 !== s && (a = s)), void 0 !== i.color && (a = i.color), void 0 !== i.lineColor && (a = i.lineColor), i = i.fillColors, void 0 !== i && (a = i, t.ifArray(i) && (a = i[0])), void 0 === n && (n = a), n
        },
        getGraphById: function(e) {
            return t.getObjById(this.graphs, e)
        },
        getValueAxisById: function(e) {
            return t.getObjById(this.valueAxes, e)
        },
        processFields: function(e, i, s) {
            if (e.itemColors) {
                var a = e.itemColors,
                    n = i.index;
                i.color = n < a.length ? a[n] : t.randomColor()
            }
            for (a = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" "), n = 0; n < a.length; n++) {
                var o = a[n],
                    r = e[o + "Field"];
                r && (r = s[r], t.isDefined(r) && (i[o] = r))
            }
            i.dataContext = s
        },
        chooseGraphColor: function(e, i) {
            if (e.lineColor) e.lineColorR = e.lineColor;
            else {
                var s;
                s = this.colors.length > i ? this.colors[i] : e.lineColorR ? e.lineColorR : t.randomColor(), e.lineColorR = s
            }
            e.fillColorsR = e.fillColors ? e.fillColors : e.lineColorR, e.bulletBorderColorR = e.bulletBorderColor ? e.bulletBorderColor : e.useLineColorForBulletBorder ? e.lineColorR : e.bulletColor, e.bulletColorR = e.bulletColor ? e.bulletColor : e.lineColorR, (s = this.patterns) && (e.pattern = s[i])
        },
        handleLegendEvent: function(t) {
            var e = t.type;
            if (t = t.dataItem, !this.legend.data && t) {
                var i = t.hidden,
                    s = t.showBalloon;
                switch (e) {
                    case "clickMarker":
                        this.textClickEnabled && (s ? this.hideGraphsBalloon(t) : this.showGraphsBalloon(t));
                        break;
                    case "clickLabel":
                        s ? this.hideGraphsBalloon(t) : this.showGraphsBalloon(t);
                        break;
                    case "rollOverItem":
                        i || this.highlightGraph(t);
                        break;
                    case "rollOutItem":
                        i || this.unhighlightGraph();
                        break;
                    case "hideItem":
                        this.hideGraph(t);
                        break;
                    case "showItem":
                        this.showGraph(t)
                }
            }
        },
        highlightGraph: function(t) {
            var e, i = this.graphs,
                s = .2;
            if (this.legend && (s = this.legend.rollOverGraphAlpha), 1 != s)
                for (e = 0; e < i.length; e++) {
                    var a = i[e];
                    a != t && a.changeOpacity(s)
                }
        },
        unhighlightGraph: function() {
            var t;
            if (this.legend && (t = this.legend.rollOverGraphAlpha), 1 != t) {
                t = this.graphs;
                var e;
                for (e = 0; e < t.length; e++) t[e].changeOpacity(1)
            }
        },
        showGraph: function(t) {
            t.switchable && (t.hidden = !1, this.dataChanged = !0, "xy" != this.type && (this.marginsUpdated = !1), this.chartCreated && this.initChart())
        },
        hideGraph: function(t) {
            t.switchable && (this.dataChanged = !0, "xy" != this.type && (this.marginsUpdated = !1), t.hidden = !0, this.chartCreated && this.initChart())
        },
        hideGraphsBalloon: function(t) {
            t.showBalloon = !1, this.updateLegend()
        },
        showGraphsBalloon: function(t) {
            t.showBalloon = !0, this.updateLegend()
        },
        updateLegend: function() {
            this.legend && this.legend.invalidateSize()
        },
        resetAnimation: function() {
            var t = this.graphs;
            if (t) {
                var e;
                for (e = 0; e < t.length; e++) t[e].animationPlayed = !1
            }
        },
        animateAgain: function() {
            this.resetAnimation(), this.validateNow()
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmSlicedChart = t.Class({
        inherits: t.AmChart,
        construct: function(e) {
            this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice", "rightClickSlice"), t.AmSlicedChart.base.construct.call(this, e), this.colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" "), this.alpha = 1, this.groupPercent = 0, this.groupedTitle = "Other", this.groupedPulled = !1, this.groupedAlpha = 1, this.marginLeft = 0, this.marginBottom = this.marginTop = 10, this.marginRight = 0, this.hoverAlpha = 1, this.outlineColor = "#FFFFFF", this.outlineAlpha = 0, this.outlineThickness = 1, this.startAlpha = 0, this.startDuration = 1, this.startEffect = "bounce", this.sequencedAnimation = !0, this.pullOutDuration = 1, this.pullOutEffect = "bounce", this.pullOnHover = this.pullOutOnlyOne = !1, this.labelsEnabled = !0, this.labelTickColor = "#000000", this.labelTickAlpha = .2, this.hideLabelsPercent = 0, this.urlTarget = "_self", this.autoMarginOffset = 10, this.gradientRatio = [], this.maxLabelWidth = 200, t.applyTheme(this, e, "AmSlicedChart")
        },
        initChart: function() {
            t.AmSlicedChart.base.initChart.call(this), this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.setLegendData(this.chartData)), this.drawChart()
        },
        handleLegendEvent: function(t) {
            var e = t.type,
                i = t.dataItem,
                s = this.legend;
            if (!s.data && i) {
                var a = i.hidden;
                switch (t = t.event, e) {
                    case "clickMarker":
                        a || s.switchable || this.clickSlice(i, t);
                        break;
                    case "clickLabel":
                        a || this.clickSlice(i, t, !1);
                        break;
                    case "rollOverItem":
                        a || this.rollOverSlice(i, !1, t);
                        break;
                    case "rollOutItem":
                        a || this.rollOutSlice(i, t);
                        break;
                    case "hideItem":
                        this.hideSlice(i, t);
                        break;
                    case "showItem":
                        this.showSlice(i, t)
                }
            }
        },
        invalidateVisibility: function() {
            this.recalculatePercents(), this.initChart();
            var t = this.legend;
            t && t.invalidateSize()
        },
        addEventListeners: function(t, e) {
            var i = this;
            t.mouseover(function(t) {
                i.rollOverSlice(e, !0, t)
            }).mouseout(function(t) {
                i.rollOutSlice(e, t)
            }).touchend(function(t) {
                i.rollOverSlice(e, t)
            }).touchstart(function(t) {}).mouseup(function(t) {
                i.clickSlice(e, t)
            }).contextmenu(function(t) {
                i.handleRightClick(e, t)
            })
        },
        formatString: function(e, i, s) {
            e = t.formatValue(e, i, ["value"], this.nf, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
            var a = this.pf.precision;
            return isNaN(this.tempPrec) || (this.pf.precision = this.tempPrec), e = t.formatValue(e, i, ["percents"], this.pf), e = t.massReplace(e, {
                "[[title]]": i.title,
                "[[description]]": i.description
            }), this.pf.precision = a, -1 != e.indexOf("[[") && (e = t.formatDataContextValue(e, i.dataContext)), e = s ? t.fixNewLines(e) : t.fixBrakes(e), e = t.cleanFromEmpty(e)
        },
        startSlices: function() {
            var t;
            for (t = 0; t < this.chartData.length; t++) 0 < this.startDuration && this.sequencedAnimation ? this.setStartTO(t) : this.startSlice(this.chartData[t])
        },
        setStartTO: function(t) {
            var e = this;
            t = setTimeout(function() {
                e.startSequenced.call(e)
            }, e.startDuration / e.chartData.length * 500 * t), e.timeOuts.push(t)
        },
        pullSlices: function(t) {
            var e, i = this.chartData;
            for (e = 0; e < i.length; e++) {
                var s = i[e];
                s.pulled && this.pullSlice(s, 1, t)
            }
        },
        startSequenced: function() {
            var t, e = this.chartData;
            for (t = 0; t < e.length; t++)
                if (!e[t].started) {
                    this.startSlice(this.chartData[t]);
                    break
                }
        },
        startSlice: function(t) {
            t.started = !0;
            var e = t.wedge,
                i = this.startDuration,
                s = t.labelSet;
            e && i > 0 && (0 < t.alpha && e.show(), e.translate(t.startX, t.startY), e.animate({
                opacity: 1,
                translate: "0,0"
            }, i, this.startEffect)), s && i > 0 && (0 < t.alpha && s.show(), s.translate(t.startX, t.startY), s.animate({
                opacity: 1,
                translate: "0,0"
            }, i, this.startEffect))
        },
        showLabels: function() {
            var t, e = this.chartData;
            for (t = 0; t < e.length; t++) {
                var i = e[t];
                if (0 < i.alpha) {
                    var s = i.label;
                    s && s.show(), (i = i.tick) && i.show()
                }
            }
        },
        showSlice: function(t) {
            isNaN(t) ? t.hidden = !1 : this.chartData[t].hidden = !1, this.invalidateVisibility()
        },
        hideSlice: function(t) {
            isNaN(t) ? t.hidden = !0 : this.chartData[t].hidden = !0, this.hideBalloon(), this.invalidateVisibility()
        },
        rollOverSlice: function(e, i, s) {
            if (isNaN(e) || (e = this.chartData[e]), clearTimeout(this.hoverInt), !e.hidden) {
                this.pullOnHover && this.pullSlice(e, 1), 1 > this.hoverAlpha && e.wedge && e.wedge.attr({
                    opacity: this.hoverAlpha
                });
                var a = e.balloonX,
                    n = e.balloonY;
                e.pulled && (a += e.pullX, n += e.pullY);
                var o = this.formatString(this.balloonText, e, !0),
                    r = this.balloonFunction;
                r && (o = r(e, o)), r = t.adjustLuminosity(e.color, -.15), o ? this.showBalloon(o, r, i, a, n) : this.hideBalloon(), 0 === e.value && this.hideBalloon(), e = {
                    type: "rollOverSlice",
                    dataItem: e,
                    chart: this,
                    event: s
                }, this.fire(e.type, e)
            }
        },
        rollOutSlice: function(t, e) {
            isNaN(t) || (t = this.chartData[t]), t.wedge && t.wedge.attr({
                opacity: 1
            }), this.hideBalloon();
            var i = {
                type: "rollOutSlice",
                dataItem: t,
                chart: this,
                event: e
            };
            this.fire(i.type, i)
        },
        clickSlice: function(e, i, s) {
            isNaN(e) || (e = this.chartData[e]), e.pulled ? this.pullSlice(e, 0) : this.pullSlice(e, 1), t.getURL(e.url, this.urlTarget), s || (e = {
                type: "clickSlice",
                dataItem: e,
                chart: this,
                event: i
            }, this.fire(e.type, e))
        },
        handleRightClick: function(t, e) {
            isNaN(t) || (t = this.chartData[t]);
            var i = {
                type: "rightClickSlice",
                dataItem: t,
                chart: this,
                event: e
            };
            this.fire(i.type, i)
        },
        drawTicks: function() {
            var e, i = this.chartData;
            for (e = 0; e < i.length; e++) {
                var s = i[e];
                if (s.label && !s.skipTick) {
                    var a = s.ty,
                        a = t.line(this.container, [s.tx0, s.tx, s.tx2], [s.ty0, a, a], this.labelTickColor, this.labelTickAlpha);
                    t.setCN(this, a, this.type + "-tick"), t.setCN(this, a, s.className, !0), s.tick = a, s.wedge.push(a)
                }
            }
        },
        initialStart: function() {
            var t = this,
                e = t.startDuration,
                i = setTimeout(function() {
                    t.showLabels.call(t)
                }, 1e3 * e);
            t.timeOuts.push(i), t.chartCreated ? t.pullSlices(!0) : (t.startSlices(), e > 0 ? (e = setTimeout(function() {
                t.pullSlices.call(t)
            }, 1200 * e), t.timeOuts.push(e)) : t.pullSlices(!0))
        },
        pullSlice: function(t, e, i) {
            var s = this.pullOutDuration;
            !0 === i && (s = 0), (i = t.wedge) && (s > 0 ? (i.animate({
                translate: e * t.pullX + "," + e * t.pullY
            }, s, this.pullOutEffect), t.labelSet && t.labelSet.animate({
                translate: e * t.pullX + "," + e * t.pullY
            }, s, this.pullOutEffect)) : (t.labelSet && t.labelSet.translate(e * t.pullX, e * t.pullY), i.translate(e * t.pullX, e * t.pullY))), 1 == e ? (t.pulled = !0, this.pullOutOnlyOne && this.pullInAll(t.index), t = {
                type: "pullOutSlice",
                dataItem: t,
                chart: this
            }) : (t.pulled = !1, t = {
                type: "pullInSlice",
                dataItem: t,
                chart: this
            }), this.fire(t.type, t)
        },
        pullInAll: function(t) {
            var e, i = this.chartData;
            for (e = 0; e < this.chartData.length; e++) e != t && i[e].pulled && this.pullSlice(i[e], 0)
        },
        pullOutAll: function() {
            var t, e = this.chartData;
            for (t = 0; t < e.length; t++) e[t].pulled || this.pullSlice(e[t], 1)
        },
        parseData: function() {
            var e = [];
            this.chartData = e;
            var i = this.dataProvider;
            if (isNaN(this.pieAlpha) || (this.alpha = this.pieAlpha), void 0 !== i) {
                var s, a, n, o = i.length,
                    r = 0;
                for (s = 0; o > s; s++) {
                    a = {};
                    var h = i[s];
                    a.dataContext = h, null !== h[this.valueField] && (a.value = Number(h[this.valueField])), (n = h[this.titleField]) || (n = ""), a.title = n, a.pulled = t.toBoolean(h[this.pulledField], !1), (n = h[this.descriptionField]) || (n = ""), a.description = n, a.labelRadius = Number(h[this.labelRadiusField]), a.switchable = !0, a.className = h[this.classNameField], a.url = h[this.urlField], n = h[this.patternField], !n && this.patterns && (n = this.patterns[s]), a.pattern = n, a.visibleInLegend = t.toBoolean(h[this.visibleInLegendField], !0), n = h[this.alphaField], a.alpha = void 0 !== n ? Number(n) : this.alpha, n = h[this.colorField], void 0 !== n && (a.color = n), a.labelColor = t.toColor(h[this.labelColorField]), r += a.value, a.hidden = !1, e[s] = a
                }
                for (s = i = 0; o > s; s++) a = e[s], a.percents = a.value / r * 100, a.percents < this.groupPercent && i++;
                for (i > 1 && (this.groupValue = 0, this.removeSmallSlices(), e.push({
                        title: this.groupedTitle,
                        value: this.groupValue,
                        percents: this.groupValue / r * 100,
                        pulled: this.groupedPulled,
                        color: this.groupedColor,
                        url: this.groupedUrl,
                        description: this.groupedDescription,
                        alpha: this.groupedAlpha,
                        pattern: this.groupedPattern,
                        className: this.groupedClassName,
                        dataContext: {}
                    })), o = this.baseColor, o || (o = this.pieBaseColor), r = this.brightnessStep, r || (r = this.pieBrightnessStep), s = 0; s < e.length; s++) o ? n = t.adjustLuminosity(o, s * r / 100) : (n = this.colors[s], void 0 === n && (n = t.randomColor())), void 0 === e[s].color && (e[s].color = n);
                this.recalculatePercents()
            }
        },
        recalculatePercents: function() {
            var t, e, i = this.chartData,
                s = 0;
            for (t = 0; t < i.length; t++) e = i[t], !e.hidden && 0 < e.value && (s += e.value);
            for (t = 0; t < i.length; t++) e = this.chartData[t], e.percents = !e.hidden && 0 < e.value ? 100 * e.value / s : 0
        },
        removeSmallSlices: function() {
            var t, e = this.chartData;
            for (t = e.length - 1; t >= 0; t--) e[t].percents < this.groupPercent && (this.groupValue += e[t].value, e.splice(t, 1))
        },
        animateAgain: function() {
            var t = this;
            t.startSlices();
            for (var e = 0; e < t.chartData.length; e++) {
                var i = t.chartData[e];
                i.started = !1;
                var s = i.wedge;
                s && s.translate(i.startX, i.startY), (s = i.labelSet) && s.translate(i.startX, i.startY)
            }
            e = t.startDuration, e > 0 ? (e = setTimeout(function() {
                t.pullSlices.call(t)
            }, 1200 * e), t.timeOuts.push(e)) : t.pullSlices()
        },
        measureMaxLabel: function() {
            var e, i = this.chartData,
                s = 0;
            for (e = 0; e < i.length; e++) {
                var a = i[e],
                    n = this.formatString(this.labelText, a),
                    o = this.labelFunction;
                o && (n = o(a, n)), a = t.text(this.container, n, this.color, this.fontFamily, this.fontSize), n = a.getBBox().width, n > s && (s = n), a.remove()
            }
            return s
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmRectangularChart = t.Class({
        inherits: t.AmCoordinateChart,
        construct: function(e) {
            t.AmRectangularChart.base.construct.call(this, e), this.theme = e, this.createEvents("zoomed"), this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20, this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0, this.heightMultiplier = this.widthMultiplier = 1, this.plotAreaFillColors = "#FFFFFF", this.plotAreaFillAlphas = 0, this.plotAreaBorderColor = "#000000", this.plotAreaBorderAlpha = 0, this.zoomOutButtonImageSize = 19, this.zoomOutButtonImage = "lens", this.zoomOutText = "Show all", this.zoomOutButtonColor = "#e5e5e5", this.zoomOutButtonAlpha = 0, this.zoomOutButtonRollOverAlpha = 1, this.zoomOutButtonPadding = 8, this.trendLines = [], this.autoMargins = !0, this.marginsUpdated = !1, this.autoMarginOffset = 10, t.applyTheme(this, e, "AmRectangularChart")
        },
        initChart: function() {
            t.AmRectangularChart.base.initChart.call(this), this.updateDxy();
            var e = !0;
            !this.marginsUpdated && this.autoMargins && (this.resetMargins(), e = !1), this.processScrollbars(), this.updateMargins(), this.updatePlotArea(), this.updateScrollbars(), this.updateTrendLines(), this.updateChartCursor(), this.updateValueAxes(), e && (this.scrollbarOnly || this.updateGraphs())
        },
        drawChart: function() {
            if (t.AmRectangularChart.base.drawChart.call(this), this.drawPlotArea(), t.ifArray(this.chartData)) {
                var e = this.chartCursor;
                e && e.draw()
            }
        },
        resetMargins: function() {
            var t, e = {};
            if ("xy" == this.type) {
                var i = this.xAxes,
                    s = this.yAxes;
                for (t = 0; t < i.length; t++) {
                    var a = i[t];
                    a.ignoreAxisWidth || (a.setOrientation(!0), a.fixAxisPosition(), e[a.position] = !0)
                }
                for (t = 0; t < s.length; t++) i = s[t], i.ignoreAxisWidth || (i.setOrientation(!1), i.fixAxisPosition(), e[i.position] = !0)
            } else {
                for (s = this.valueAxes, t = 0; t < s.length; t++) i = s[t], i.ignoreAxisWidth || (i.setOrientation(this.rotate), i.fixAxisPosition(), e[i.position] = !0);
                (t = this.categoryAxis) && !t.ignoreAxisWidth && (t.setOrientation(!this.rotate), t.fixAxisPosition(), t.fixAxisPosition(), e[t.position] = !0)
            }
            e.left && (this.marginLeft = 0), e.right && (this.marginRight = 0), e.top && (this.marginTop = 0), e.bottom && (this.marginBottom = 0), this.fixMargins = e
        },
        measureMargins: function() {
            var t, e = this.valueAxes,
                i = this.autoMarginOffset,
                s = this.fixMargins,
                a = this.realWidth,
                n = this.realHeight,
                o = i,
                r = i,
                h = a;
            t = n;
            var l;
            for (l = 0; l < e.length; l++) e[l].handleSynchronization(), t = this.getAxisBounds(e[l], o, h, r, t), o = Math.round(t.l), h = Math.round(t.r), r = Math.round(t.t), t = Math.round(t.b);
            (e = this.categoryAxis) && (t = this.getAxisBounds(e, o, h, r, t),
                o = Math.round(t.l), h = Math.round(t.r), r = Math.round(t.t), t = Math.round(t.b)), s.left && i > o && (this.marginLeft = Math.round(-o + i)), s.right && h >= a - i && (this.marginRight = Math.round(h - a + i)), s.top && r < i + this.titleHeight && (this.marginTop = Math.round(this.marginTop - r + i + this.titleHeight)), s.bottom && t > n - i && (this.marginBottom = Math.round(this.marginBottom + t - n + i)), this.initChart()
        },
        getAxisBounds: function(t, e, i, s, a) {
            if (!t.ignoreAxisWidth) {
                var n = t.labelsSet,
                    o = t.tickLength;
                if (t.inside && (o = 0), n) switch (n = t.getBBox(), t.position) {
                    case "top":
                        t = n.y, s > t && (s = t);
                        break;
                    case "bottom":
                        t = n.y + n.height, t > a && (a = t);
                        break;
                    case "right":
                        t = n.x + n.width + o + 3, t > i && (i = t);
                        break;
                    case "left":
                        t = n.x - o, e > t && (e = t)
                }
            }
            return {
                l: e,
                t: s,
                r: i,
                b: a
            }
        },
        drawZoomOutButton: function() {
            var e = this;
            if (!e.zbSet) {
                var i = e.container.set();
                e.zoomButtonSet.push(i);
                var s = e.color,
                    a = e.fontSize,
                    n = e.zoomOutButtonImageSize,
                    o = e.zoomOutButtonImage.replace(/\.[a-z]*$/i, ""),
                    r = t.lang.zoomOutText || e.zoomOutText,
                    h = e.zoomOutButtonColor,
                    l = e.zoomOutButtonAlpha,
                    d = e.zoomOutButtonFontSize,
                    c = e.zoomOutButtonPadding;
                isNaN(d) || (a = d), (d = e.zoomOutButtonFontColor) && (s = d);
                var u, d = e.zoomOutButton;
                d && (d.fontSize && (a = d.fontSize), d.color && (s = d.color), d.backgroundColor && (h = d.backgroundColor), isNaN(d.backgroundAlpha) || (e.zoomOutButtonRollOverAlpha = d.backgroundAlpha));
                var p = d = 0;
                for (void 0 !== e.pathToImages && o && (u = e.container.image(e.pathToImages + o + e.extension, 0, 0, n, n), t.setCN(e, u, "zoom-out-image"), i.push(u), u = u.getBBox(), d = u.width + 5), void 0 !== r && (s = t.text(e.container, r, s, e.fontFamily, a, "start"), t.setCN(e, s, "zoom-out-label"), a = s.getBBox(), p = u ? u.height / 2 - 3 : a.height / 2, s.translate(d, p), i.push(s)), u = i.getBBox(), s = 1, t.isModern || (s = 0), h = t.rect(e.container, u.width + 2 * c + 5, u.height + 2 * c - 2, h, 1, 1, h, s), h.setAttr("opacity", l), h.translate(-c, -c), t.setCN(e, h, "zoom-out-bg"), i.push(h), h.toBack(), e.zbBG = h, u = h.getBBox(), i.translate(e.marginLeftReal + e.plotAreaWidth - u.width + c, e.marginTopReal + c), i.hide(), i.mouseover(function() {
                        e.rollOverZB()
                    }).mouseout(function() {
                        e.rollOutZB()
                    }).click(function() {
                        e.clickZB()
                    }).touchstart(function() {
                        e.rollOverZB()
                    }).touchend(function() {
                        e.rollOutZB(), e.clickZB()
                    }), l = 0; l < i.length; l++) i[l].attr({
                    cursor: "pointer"
                });
                e.zbSet = i
            }
        },
        rollOverZB: function() {
            this.rolledOverZB = !0, this.zbBG.setAttr("opacity", this.zoomOutButtonRollOverAlpha)
        },
        rollOutZB: function() {
            this.rolledOverZB = !1, this.zbBG.setAttr("opacity", this.zoomOutButtonAlpha)
        },
        clickZB: function() {
            this.rolledOverZB = !1, this.zoomOut()
        },
        zoomOut: function() {
            this.updateScrollbar = !0, this.zoom()
        },
        drawPlotArea: function() {
            var e = this.dx,
                i = this.dy,
                s = this.marginLeftReal,
                a = this.marginTopReal,
                n = this.plotAreaWidth - 1,
                o = this.plotAreaHeight - 1,
                r = this.plotAreaFillColors,
                h = this.plotAreaFillAlphas,
                l = this.plotAreaBorderColor,
                d = this.plotAreaBorderAlpha;
            "object" == typeof h && (h = h[0]), r = t.polygon(this.container, [0, n, n, 0, 0], [0, 0, o, o, 0], r, h, 1, l, d, this.plotAreaGradientAngle), t.setCN(this, r, "plot-area"), r.translate(s + e, a + i), this.set.push(r), 0 !== e && 0 !== i && (r = this.plotAreaFillColors, "object" == typeof r && (r = r[0]), r = t.adjustLuminosity(r, -.15), n = t.polygon(this.container, [0, e, n + e, n, 0], [0, i, i, 0, 0], r, h, 1, l, d), t.setCN(this, n, "plot-area-bottom"), n.translate(s, a + o), this.set.push(n), e = t.polygon(this.container, [0, 0, e, e, 0], [0, o, o + i, i, 0], r, h, 1, l, d), t.setCN(this, e, "plot-area-left"), e.translate(s, a), this.set.push(e)), (s = this.bbset) && this.scrollbarOnly && s.remove()
        },
        updatePlotArea: function() {
            var t = this.updateWidth(),
                e = this.updateHeight(),
                i = this.container;
            this.realWidth = t, this.realWidth = e, i && this.container.setSize(t, e), t = t - this.marginLeftReal - this.marginRightReal - this.dx, e = e - this.marginTopReal - this.marginBottomReal, 1 > t && (t = 1), 1 > e && (e = 1), this.plotAreaWidth = Math.round(t), this.plotAreaHeight = Math.round(e)
        },
        updateDxy: function() {
            this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180)), this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180)), this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180)), this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180))
        },
        updateMargins: function() {
            var t = this.getTitleHeight();
            this.titleHeight = t, this.marginTopReal = this.marginTop - this.dy, this.fixMargins && !this.fixMargins.top && (this.marginTopReal += t), this.marginBottomReal = this.marginBottom, this.marginLeftReal = this.marginLeft, this.marginRightReal = this.marginRight
        },
        updateValueAxes: function() {
            var e, i = this.valueAxes,
                s = this.marginLeftReal,
                a = this.marginTopReal,
                n = this.plotAreaHeight,
                o = this.plotAreaWidth;
            for (e = 0; e < i.length; e++) {
                var r = i[e];
                r.axisRenderer = t.RecAxis, r.guideFillRenderer = t.RecFill, r.axisItemRenderer = t.RecItem, r.dx = this.dx, r.dy = this.dy, r.viW = o - 1, r.viH = n - 1, r.marginsChanged = !0, r.viX = s, r.viY = a, this.updateObjectSize(r)
            }
        },
        updateObjectSize: function(t) {
            t.width = (this.plotAreaWidth - 1) * this.widthMultiplier, t.height = (this.plotAreaHeight - 1) * this.heightMultiplier, t.x = this.marginLeftReal + this.horizontalPosition, t.y = this.marginTopReal + this.verticalPosition
        },
        updateGraphs: function() {
            var t, e = this.graphs;
            for (t = 0; t < e.length; t++) {
                var i = e[t];
                i.x = this.marginLeftReal + this.horizontalPosition, i.y = this.marginTopReal + this.verticalPosition, i.width = this.plotAreaWidth * this.widthMultiplier, i.height = this.plotAreaHeight * this.heightMultiplier, i.index = t, i.dx = this.dx, i.dy = this.dy, i.rotate = this.rotate
            }
        },
        updateChartCursor: function() {
            var e = this.chartCursor;
            e && (e = t.processObject(e, t.ChartCursor, this.theme), this.addChartCursor(e), e.x = this.marginLeftReal, e.y = this.marginTopReal, e.width = this.plotAreaWidth - 1, e.height = this.plotAreaHeight - 1, e.chart = this)
        },
        processScrollbars: function() {
            var e = this.chartScrollbar;
            e && (e = t.processObject(e, t.ChartScrollbar, this.theme), this.addChartScrollbar(e))
        },
        updateScrollbars: function() {},
        addChartCursor: function(e) {
            t.callMethod("destroy", [this.chartCursor]), e && (this.listenTo(e, "changed", this.handleCursorChange), this.listenTo(e, "zoomed", this.handleCursorZoom)), this.chartCursor = e
        },
        removeChartCursor: function() {
            t.callMethod("destroy", [this.chartCursor]), this.chartCursor = null
        },
        zoomTrendLines: function() {
            var t, e = this.trendLines;
            for (t = 0; t < e.length; t++) {
                var i = e[t];
                i.valueAxis.recalculateToPercents ? i.set && i.set.hide() : (i.x = this.marginLeftReal + this.horizontalPosition, i.y = this.marginTopReal + this.verticalPosition, i.draw())
            }
        },
        addTrendLine: function(t) {
            this.trendLines.push(t)
        },
        removeTrendLine: function(t) {
            var e, i = this.trendLines;
            for (e = i.length - 1; e >= 0; e--) i[e] == t && i.splice(e, 1)
        },
        adjustMargins: function(t, e) {
            var i = t.position,
                s = t.scrollbarHeight + t.offset;
            t.enabled && ("top" == i ? e ? this.marginLeftReal += s : this.marginTopReal += s : e ? this.marginRightReal += s : this.marginBottomReal += s)
        },
        getScrollbarPosition: function(t, e, i) {
            var s = "bottom",
                a = "top";
            t.oppositeAxis || (a = s, s = "top"), t.position = e ? "bottom" == i || "left" == i ? s : a : "top" == i || "right" == i ? s : a
        },
        updateChartScrollbar: function(t, e) {
            if (t) {
                t.rotate = e;
                var i = this.marginTopReal,
                    s = this.marginLeftReal,
                    a = t.scrollbarHeight,
                    n = this.dx,
                    o = this.dy,
                    r = t.offset;
                "top" == t.position ? e ? (t.y = i, t.x = s - a - r) : (t.y = i - a + o - r, t.x = s + n) : e ? (t.y = i + o, t.x = s + this.plotAreaWidth + n + r) : (t.y = i + this.plotAreaHeight + r, t.x = this.marginLeftReal)
            }
        },
        showZB: function(t) {
            var e = this.zbSet;
            t && (e = this.zoomOutText, "" !== e && e && this.drawZoomOutButton()), (e = this.zbSet) && (this.zoomButtonSet.push(e), t ? e.show() : e.hide(), this.rollOutZB())
        },
        handleReleaseOutside: function(e) {
            t.AmRectangularChart.base.handleReleaseOutside.call(this, e), (e = this.chartCursor) && e.handleReleaseOutside && e.handleReleaseOutside()
        },
        handleMouseDown: function(e) {
            t.AmRectangularChart.base.handleMouseDown.call(this, e);
            var i = this.chartCursor;
            i && i.handleMouseDown && !this.rolledOverZB && i.handleMouseDown(e)
        },
        handleCursorChange: function() {},
        update: function() {
            t.AmRectangularChart.base.update.call(this), this.chartCursor && this.chartCursor.update && this.chartCursor.update()
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.TrendLine = t.Class({
        construct: function(e) {
            this.cname = "TrendLine", this.createEvents("click"), this.isProtected = !1, this.dashLength = 0, this.lineColor = "#00CC00", this.lineThickness = this.lineAlpha = 1, t.applyTheme(this, e, this.cname)
        },
        draw: function() {
            var e = this;
            e.destroy();
            var i, s, a, n, o = e.chart,
                r = o.container,
                h = e.categoryAxis,
                l = e.initialDate,
                d = e.initialCategory,
                c = e.finalDate,
                u = e.finalCategory,
                p = e.valueAxis,
                m = e.valueAxisX,
                f = e.initialXValue,
                g = e.finalXValue,
                v = e.initialValue,
                b = e.finalValue,
                x = p.recalculateToPercents,
                C = o.dataDateFormat;
            h && (l && (l = t.getDate(l, C, "fff"), e.initialDate = l, i = h.dateToCoordinate(l)), d && (i = h.categoryToCoordinate(d)), c && (c = t.getDate(c, C, "fff"), e.finalDate = c, s = h.dateToCoordinate(c)), u && (s = h.categoryToCoordinate(u))), m && !x && (isNaN(f) || (i = m.getCoordinate(f)), isNaN(g) || (s = m.getCoordinate(g))), p && !x && (isNaN(v) || (a = p.getCoordinate(v)), isNaN(b) || (n = p.getCoordinate(b))), isNaN(i) || isNaN(s) || isNaN(a) || isNaN(a) || (o.rotate ? (h = [a, n], n = [i, s]) : (h = [i, s], n = [a, n]), l = e.lineColor, a = t.line(r, h, n, l, e.lineAlpha, e.lineThickness, e.dashLength), i = h, s = n, u = h[1] - h[0], p = n[1] - n[0], 0 === u && (u = .01), 0 === p && (p = .01), d = u / Math.abs(u), c = p / Math.abs(p), p = 90 * Math.PI / 180 - Math.asin(u / (u * p / Math.abs(u * p) * Math.sqrt(Math.pow(u, 2) + Math.pow(p, 2)))), u = Math.abs(5 * Math.cos(p)), p = Math.abs(5 * Math.sin(p)), i.push(h[1] - d * p, h[0] - d * p), s.push(n[1] + c * u, n[0] + c * u), n = t.polygon(r, i, s, l, .005, 0), r = r.set([n, a]), r.translate(o.marginLeftReal, o.marginTopReal), o.trendLinesSet.push(r), t.setCN(o, a, "trend-line"), t.setCN(o, a, "trend-line-" + e.id), e.line = a, e.set = r, (a = e.initialImage) && (a = t.processObject(a, t.Image, e.theme), a.chart = o, a.draw(), a.translate(i[0] + a.offsetX, s[0] + a.offsetY), r.push(a.set)), (a = e.finalImage) && (a = t.processObject(a, t.Image, e.theme), a.chart = o, a.draw(), a.translate(i[1] + a.offsetX, s[1] + a.offsetY), r.push(a.set)), n.mouseup(function() {
                e.handleLineClick()
            }).mouseover(function() {
                e.handleLineOver()
            }).mouseout(function() {
                e.handleLineOut()
            }), n.touchend && n.touchend(function() {
                e.handleLineClick()
            }), r.clipRect(0, 0, o.plotAreaWidth, o.plotAreaHeight))
        },
        handleLineClick: function() {
            var t = {
                type: "click",
                trendLine: this,
                chart: this.chart
            };
            this.fire(t.type, t)
        },
        handleLineOver: function() {
            var t = this.rollOverColor;
            void 0 !== t && this.line.attr({
                stroke: t
            })
        },
        handleLineOut: function() {
            this.line.attr({
                stroke: this.lineColor
            })
        },
        destroy: function() {
            t.remove(this.set)
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.Image = t.Class({
        construct: function(e) {
            this.cname = "Image", this.height = this.width = 20, this.rotation = this.offsetY = this.offsetX = 0, this.balloonColor = this.color = "#000000", this.opacity = 1, t.applyTheme(this, e, this.cname)
        },
        draw: function() {
            var t = this;
            t.set && t.set.remove();
            var e = t.chart.container;
            t.set = e.set();
            var i, s;
            t.url ? (i = e.image(t.url, 0, 0, t.width, t.height), s = 1) : t.svgPath && (i = e.path(t.svgPath), i.setAttr("fill", t.color), i.setAttr("stroke", t.outlineColor), e = i.getBBox(), s = Math.min(t.width / e.width, t.height / e.height)), i && (i.setAttr("opacity", t.opacity), t.set.rotate(t.rotation), i.translate(-t.width / 2, -t.height / 2, s), t.balloonText && i.mouseover(function(e) {
                t.chart.showBalloon(t.balloonText, t.balloonColor, !0)
            }).mouseout(function(e) {
                t.chart.hideBalloon()
            }).touchend(function(e) {
                t.chart.hideBalloon()
            }).touchstart(function(e) {
                t.chart.showBalloon(t.balloonText, t.balloonColor, !0)
            }), t.set.push(i))
        },
        translate: function(t, e) {
            this.set && this.set.translate(t, e)
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.circle = function(e, i, s, a, n, o, r, h, l) {
        return 0 >= i && (i = .001), (void 0 == n || 0 === n) && (n = .01), void 0 === o && (o = "#000000"), void 0 === r && (r = 0), a = {
            fill: s,
            stroke: o,
            "fill-opacity": a,
            "stroke-width": n,
            "stroke-opacity": r
        }, e = isNaN(l) ? e.circle(0, 0, i).attr(a) : e.ellipse(0, 0, i, l).attr(a), h && e.gradient("radialGradient", [s, t.adjustLuminosity(s, -.6)]), e
    }, t.text = function(e, i, s, a, n, o, r, h) {
        return o || (o = "middle"), "right" == o && (o = "end"), "left" == o && (o = "start"), isNaN(h) && (h = 1), void 0 !== i && (i = String(i), t.isIE && !t.isModern && (i = i.replace("&amp;", "&"), i = i.replace("&", "&amp;"))), s = {
            fill: s,
            "font-family": a,
            "font-size": n + "px",
            opacity: h
        }, !0 === r && (s["font-weight"] = "bold"), s["text-anchor"] = o, e.text(i, s)
    }, t.polygon = function(e, i, s, a, n, o, r, h, l, d, c) {
        isNaN(o) && (o = .01), isNaN(h) && (h = n);
        var u = a,
            p = !1;
        for ("object" == typeof u && 1 < u.length && (p = !0, u = u[0]), void 0 === r && (r = u), n = {
                fill: u,
                stroke: r,
                "fill-opacity": n,
                "stroke-width": o,
                "stroke-opacity": h
            }, void 0 !== c && c > 0 && (n["stroke-dasharray"] = c), c = t.dx, o = t.dy, e.handDrawn && (s = t.makeHD(i, s, e.handDrawScatter), i = s[0], s = s[1]), r = Math.round, d && (r = Number), d = "M" + (r(i[0]) + c) + "," + (r(s[0]) + o), h = 1; h < i.length; h++) d += " L" + (r(i[h]) + c) + "," + (r(s[h]) + o);
        return e = e.path(d + " Z").attr(n), p && e.gradient("linearGradient", a, l), e
    }, t.rect = function(e, i, s, a, n, o, r, h, l, d, c) {
        if (isNaN(i) || isNaN(s)) return e.set();
        isNaN(o) && (o = 0), void 0 === l && (l = 0), void 0 === d && (d = 270), isNaN(n) && (n = 0);
        var u = a,
            p = !1;
        "object" == typeof u && (u = u[0], p = !0), void 0 === r && (r = u), void 0 === h && (h = n), i = Math.round(i), s = Math.round(s);
        var m = 0,
            f = 0;
        return 0 > i && (i = Math.abs(i), m = -i), 0 > s && (s = Math.abs(s), f = -s), m += t.dx, f += t.dy, n = {
            fill: u,
            stroke: r,
            "fill-opacity": n,
            "stroke-opacity": h
        }, void 0 !== c && c > 0 && (n["stroke-dasharray"] = c), e = e.rect(m, f, i, s, l, o).attr(n), p && e.gradient("linearGradient", a, d), e
    }, t.bullet = function(e, i, s, a, n, o, r, h, l, d, c, u, p) {
        var m;
        switch ("circle" == i && (i = "round"), i) {
            case "round":
                m = t.circle(e, s / 2, a, n, o, r, h);
                break;
            case "square":
                m = t.polygon(e, [-s / 2, s / 2, s / 2, -s / 2], [s / 2, s / 2, -s / 2, -s / 2], a, n, o, r, h, d - 180, void 0, p);
                break;
            case "rectangle":
                m = t.polygon(e, [-s, s, s, -s], [s / 2, s / 2, -s / 2, -s / 2], a, n, o, r, h, d - 180, void 0, p);
                break;
            case "diamond":
                m = t.polygon(e, [-s / 2, 0, s / 2, 0], [0, -s / 2, 0, s / 2], a, n, o, r, h);
                break;
            case "triangleUp":
                m = t.triangle(e, s, 0, a, n, o, r, h);
                break;
            case "triangleDown":
                m = t.triangle(e, s, 180, a, n, o, r, h);
                break;
            case "triangleLeft":
                m = t.triangle(e, s, 270, a, n, o, r, h);
                break;
            case "triangleRight":
                m = t.triangle(e, s, 90, a, n, o, r, h);
                break;
            case "bubble":
                m = t.circle(e, s / 2, a, n, o, r, h, !0);
                break;
            case "line":
                m = t.line(e, [-s / 2, s / 2], [0, 0], a, n, o, r, h);
                break;
            case "yError":
                m = e.set(), m.push(t.line(e, [0, 0], [-s / 2, s / 2], a, n, o)), m.push(t.line(e, [-l, l], [-s / 2, -s / 2], a, n, o)), m.push(t.line(e, [-l, l], [s / 2, s / 2], a, n, o));
                break;
            case "xError":
                m = e.set(), m.push(t.line(e, [-s / 2, s / 2], [0, 0], a, n, o)), m.push(t.line(e, [-s / 2, -s / 2], [-l, l], a, n, o)), m.push(t.line(e, [s / 2, s / 2], [-l, l], a, n, o))
        }
        return m && m.pattern(c, NaN, u), m
    }, t.triangle = function(t, e, i, s, a, n, o, r) {
        (void 0 === n || 0 === n) && (n = 1), void 0 === o && (o = "#000"), void 0 === r && (r = 0), s = {
            fill: s,
            stroke: o,
            "fill-opacity": a,
            "stroke-width": n,
            "stroke-opacity": r
        }, e /= 2;
        var h;
        return 0 === i && (h = " M" + -e + "," + e + " L0," + -e + " L" + e + "," + e + " Z"), 180 == i && (h = " M" + -e + "," + -e + " L0," + e + " L" + e + "," + -e + " Z"), 90 == i && (h = " M" + -e + "," + -e + " L" + e + ",0 L" + -e + "," + e + " Z"), 270 == i && (h = " M" + -e + ",0 L" + e + "," + e + " L" + e + "," + -e + " Z"), t.path(h).attr(s)
    }, t.line = function(e, i, s, a, n, o, r, h, l, d, c) {
        if (e.handDrawn && !c) return t.handDrawnLine(e, i, s, a, n, o, r, h, l, d, c);
        for (o = {
                fill: "none",
                "stroke-width": o
            }, void 0 !== r && r > 0 && (o["stroke-dasharray"] = r), isNaN(n) || (o["stroke-opacity"] = n), a && (o.stroke = a), a = Math.round, d && (a = Number), d = t.dx, n = t.dy, r = "M" + (a(i[0]) + d) + "," + (a(s[0]) + n), h = 1; h < i.length; h++) r += " L" + (a(i[h]) + d) + "," + (a(s[h]) + n);
        return t.VML ? e.path(r, void 0, !0).attr(o) : (l && (r += " M0,0 L0,0"), e.path(r).attr(o))
    }, t.makeHD = function(t, e, i) {
        for (var s = [], a = [], n = 1; n < t.length; n++)
            for (var o = Number(t[n - 1]), r = Number(e[n - 1]), h = Number(t[n]), l = Number(e[n]), d = Math.round(Math.sqrt(Math.pow(h - o, 2) + Math.pow(l - r, 2)) / 50) + 1, h = (h - o) / d, l = (l - r) / d, c = 0; d >= c; c++) {
                var u = o + c * h + Math.random() * i,
                    p = r + c * l + Math.random() * i;
                s.push(u), a.push(p)
            }
        return [s, a]
    }, t.handDrawnLine = function(e, i, s, a, n, o, r, h, l, d) {
        var c, u = e.set();
        for (c = 1; c < i.length; c++)
            for (var p = [i[c - 1], i[c]], m = [s[c - 1], s[c]], m = t.makeHD(p, m, e.handDrawScatter), p = m[0], m = m[1], f = 1; f < p.length; f++) u.push(t.line(e, [p[f - 1], p[f]], [m[f - 1], m[f]], a, n, o + Math.random() * e.handDrawThickness - e.handDrawThickness / 2, r, h, l, d, !0));
        return u
    }, t.doNothing = function(t) {
        return t
    }, t.wedge = function(e, i, s, a, n, o, r, h, l, d, c, u, p) {
        var m = Math.round;
        o = m(o), r = m(r), h = m(h);
        var f = m(r / o * h),
            g = t.VML,
            v = 359.5 + o / 100;
        v > 359.94 && (v = 359.94), n >= v && (n = v);
        var b = 1 / 180 * Math.PI,
            v = i + Math.sin(a * b) * h,
            x = s - Math.cos(a * b) * f,
            C = i + Math.sin(a * b) * o,
            y = s - Math.cos(a * b) * r,
            N = i + Math.sin((a + n) * b) * o,
            w = s - Math.cos((a + n) * b) * r,
            S = i + Math.sin((a + n) * b) * h,
            b = s - Math.cos((a + n) * b) * f,
            A = {
                fill: t.adjustLuminosity(d.fill, -.2),
                "stroke-opacity": 0,
                "fill-opacity": d["fill-opacity"]
            },
            M = 0;
        180 < Math.abs(n) && (M = 1), a = e.set();
        var D;
        g && (v = m(10 * v), C = m(10 * C), N = m(10 * N), S = m(10 * S), x = m(10 * x), y = m(10 * y), w = m(10 * w), b = m(10 * b), i = m(10 * i), l = m(10 * l), s = m(10 * s), o *= 10, r *= 10, h *= 10, f *= 10, 1 > Math.abs(n) && 1 >= Math.abs(N - C) && 1 >= Math.abs(w - y) && (D = !0)), n = "";
        var T;
        if (u && (A["fill-opacity"] = 0, A["stroke-opacity"] = d["stroke-opacity"] / 2, A.stroke = d.stroke), l > 0) {
            T = " M" + v + "," + (x + l) + " L" + C + "," + (y + l), g ? (D || (T += " A" + (i - o) + "," + (l + s - r) + "," + (i + o) + "," + (l + s + r) + "," + C + "," + (y + l) + "," + N + "," + (w + l)), T += " L" + S + "," + (b + l), h > 0 && (D || (T += " B" + (i - h) + "," + (l + s - f) + "," + (i + h) + "," + (l + s + f) + "," + S + "," + (l + b) + "," + v + "," + (l + x)))) : (T += " A" + o + "," + r + ",0," + M + ",1," + N + "," + (w + l) + " L" + S + "," + (b + l), h > 0 && (T += " A" + h + "," + f + ",0," + M + ",0," + v + "," + (x + l))), T += " Z";
            var k = l;
            g && (k /= 10);
            for (var B = 0; k > B; B += 10) {
                var L = e.path(T, void 0, void 0, "1000,1000").attr(A);
                a.push(L), L.translate(0, -B)
            }
            T = e.path(" M" + v + "," + x + " L" + v + "," + (x + l) + " L" + C + "," + (y + l) + " L" + C + "," + y + " L" + v + "," + x + " Z", void 0, void 0, "1000,1000").attr(A), l = e.path(" M" + N + "," + w + " L" + N + "," + (w + l) + " L" + S + "," + (b + l) + " L" + S + "," + b + " L" + N + "," + w + " Z", void 0, void 0, "1000,1000").attr(A), a.push(T), a.push(l)
        }
        if (g ? (D || (n = " A" + m(i - o) + "," + m(s - r) + "," + m(i + o) + "," + m(s + r) + "," + m(C) + "," + m(y) + "," + m(N) + "," + m(w)), o = " M" + m(v) + "," + m(x) + " L" + m(C) + "," + m(y) + n + " L" + m(S) + "," + m(b)) : o = " M" + v + "," + x + " L" + C + "," + y + (" A" + o + "," + r + ",0," + M + ",1," + N + "," + w) + " L" + S + "," + b, h > 0 && (g ? D || (o += " B" + (i - h) + "," + (s - f) + "," + (i + h) + "," + (s + f) + "," + S + "," + b + "," + v + "," + x) : o += " A" + h + "," + f + ",0," + M + ",0," + v + "," + x), e.handDrawn && (i = t.line(e, [v, C], [x, y], d.stroke, d.thickness * Math.random() * e.handDrawThickness, d["stroke-opacity"]), a.push(i)), e = e.path(o + " Z", void 0, void 0, "1000,1000").attr(d), c) {
            for (i = [], s = 0; s < c.length; s++) i.push(t.adjustLuminosity(d.fill, c[s]));
            0 < i.length && e.gradient("linearGradient", i)
        }
        return e.pattern(u, NaN, p), a.wedge = e, a.push(e), a
    }, t.rgb2hex = function(t) {
        return (t = t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === t.length ? "#" + ("0" + parseInt(t[1], 10).toString(16)).slice(-2) + ("0" + parseInt(t[2], 10).toString(16)).slice(-2) + ("0" + parseInt(t[3], 10).toString(16)).slice(-2) : ""
    }, t.adjustLuminosity = function(e, i) {
        e && -1 != e.indexOf("rgb") && (e = t.rgb2hex(e)), e = String(e).replace(/[^0-9a-f]/gi, ""), 6 > e.length && (e = String(e[0]) + String(e[0]) + String(e[1]) + String(e[1]) + String(e[2]) + String(e[2])), i = i || 0;
        var s, a, n = "#";
        for (a = 0; 3 > a; a++) s = parseInt(e.substr(2 * a, 2), 16), s = Math.round(Math.min(Math.max(0, s + s * i), 255)).toString(16), n += ("00" + s).substr(s.length);
        return n
    }
}(),
function() {
    var t = window.AmCharts;
    t.Bezier = t.Class({
        construct: function(e, i, s, a, n, o, r, h, l, d) {
            for ("object" == typeof r && (r = r[0]), "object" == typeof h && (h = h[0]), 0 === h && (r = "none"), o = {
                    fill: r,
                    "fill-opacity": h,
                    "stroke-width": o
                }, void 0 !== l && l > 0 && (o["stroke-dasharray"] = l), isNaN(n) || (o["stroke-opacity"] = n), a && (o.stroke = a), a = "M" + Math.round(i[0]) + "," + Math.round(s[0]), n = [], l = 0; l < i.length; l++) n.push({
                x: Number(i[l]),
                y: Number(s[l])
            });
            1 < n.length && (i = this.interpolate(n), a += this.drawBeziers(i)), d ? a += d : t.VML || (a += "M0,0 L0,0"), this.path = e.path(a).attr(o), this.node = this.path.node
        },
        interpolate: function(e) {
            var i = [];
            i.push({
                x: e[0].x,
                y: e[0].y
            });
            var s = e[1].x - e[0].x,
                a = e[1].y - e[0].y,
                n = t.bezierX,
                o = t.bezierY;
            i.push({
                x: e[0].x + s / n,
                y: e[0].y + a / o
            });
            var r;
            for (r = 1; r < e.length - 1; r++) {
                var h = e[r - 1],
                    l = e[r],
                    a = e[r + 1];
                isNaN(a.x) && (a = l), isNaN(l.x) && (l = h), isNaN(h.x) && (h = l), s = a.x - l.x, a = a.y - h.y, h = l.x - h.x, h > s && (h = s), i.push({
                    x: l.x - h / n,
                    y: l.y - a / o
                }), i.push({
                    x: l.x,
                    y: l.y
                }), i.push({
                    x: l.x + h / n,
                    y: l.y + a / o
                })
            }
            return a = e[e.length - 1].y - e[e.length - 2].y, s = e[e.length - 1].x - e[e.length - 2].x, i.push({
                x: e[e.length - 1].x - s / n,
                y: e[e.length - 1].y - a / o
            }), i.push({
                x: e[e.length - 1].x,
                y: e[e.length - 1].y
            }), i
        },
        drawBeziers: function(t) {
            var e, i = "";
            for (e = 0; e < (t.length - 1) / 3; e++) i += this.drawBezierMidpoint(t[3 * e], t[3 * e + 1], t[3 * e + 2], t[3 * e + 3]);
            return i
        },
        drawBezierMidpoint: function(t, e, i, s) {
            var a = Math.round,
                n = this.getPointOnSegment(t, e, .75),
                o = this.getPointOnSegment(s, i, .75),
                r = (s.x - t.x) / 16,
                h = (s.y - t.y) / 16,
                l = this.getPointOnSegment(t, e, .375);
            return t = this.getPointOnSegment(n, o, .375), t.x -= r, t.y -= h, e = this.getPointOnSegment(o, n, .375), e.x += r, e.y += h, i = this.getPointOnSegment(s, i, .375), r = this.getMiddle(l, t), n = this.getMiddle(n, o), o = this.getMiddle(e, i), l = " Q" + a(l.x) + "," + a(l.y) + "," + a(r.x) + "," + a(r.y), l += " Q" + a(t.x) + "," + a(t.y) + "," + a(n.x) + "," + a(n.y), l += " Q" + a(e.x) + "," + a(e.y) + "," + a(o.x) + "," + a(o.y), l += " Q" + a(i.x) + "," + a(i.y) + "," + a(s.x) + "," + a(s.y)
        },
        getMiddle: function(t, e) {
            return {
                x: (t.x + e.x) / 2,
                y: (t.y + e.y) / 2
            }
        },
        getPointOnSegment: function(t, e, i) {
            return {
                x: t.x + (e.x - t.x) * i,
                y: t.y + (e.y - t.y) * i
            }
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmDraw = t.Class({
        construct: function(e, i, s, a) {
            t.SVG_NS = "http://www.w3.org/2000/svg", t.SVG_XLINK = "http://www.w3.org/1999/xlink", t.hasSVG = !!document.createElementNS && !!document.createElementNS(t.SVG_NS, "svg").createSVGRect, 1 > i && (i = 10), 1 > s && (s = 10), this.div = e, this.width = i, this.height = s, this.rBin = document.createElement("div"), t.hasSVG ? (t.SVG = !0, i = this.createSvgElement("svg"), e.appendChild(i), this.container = i, this.addDefs(a), this.R = new t.SVGRenderer(this)) : t.isIE && t.VMLRenderer && (t.VML = !0, t.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (i = document.createStyleSheet(), i.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), t.vmlStyleSheet = i) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = e, this.R = new t.VMLRenderer(this, a), this.R.disableSelection(e))
        },
        createSvgElement: function(e) {
            return document.createElementNS(t.SVG_NS, e)
        },
        circle: function(e, i, s, a) {
            var n = new t.AmDObject("circle", this);
            return n.attr({
                r: s,
                cx: e,
                cy: i
            }), this.addToContainer(n.node, a), n
        },
        ellipse: function(e, i, s, a, n) {
            var o = new t.AmDObject("ellipse", this);
            return o.attr({
                rx: s,
                ry: a,
                cx: e,
                cy: i
            }), this.addToContainer(o.node, n), o
        },
        setSize: function(t, e) {
            t > 0 && e > 0 && (this.container.style.width = t + "px", this.container.style.height = e + "px")
        },
        rect: function(e, i, s, a, n, o, r) {
            var h = new t.AmDObject("rect", this);
            return t.VML && (n = Math.round(100 * n / Math.min(s, a)), s += 2 * o, a += 2 * o, h.bw = o, h.node.style.marginLeft = -o, h.node.style.marginTop = -o), 1 > s && (s = 1), 1 > a && (a = 1), h.attr({
                x: e,
                y: i,
                width: s,
                height: a,
                rx: n,
                ry: n,
                "stroke-width": o
            }), this.addToContainer(h.node, r), h
        },
        image: function(e, i, s, a, n, o) {
            var r = new t.AmDObject("image", this);
            return r.attr({
                x: i,
                y: s,
                width: a,
                height: n
            }), this.R.path(r, e), this.addToContainer(r.node, o), r
        },
        addToContainer: function(t, e) {
            e || (e = this.container), e.appendChild(t)
        },
        text: function(t, e, i) {
            return this.R.text(t, e, i)
        },
        path: function(e, i, s, a) {
            var n = new t.AmDObject("path", this);
            return a || (a = "100,100"), n.attr({
                cs: a
            }), s ? n.attr({
                dd: e
            }) : n.attr({
                d: e
            }), this.addToContainer(n.node, i), n
        },
        set: function(t) {
            return this.R.set(t)
        },
        remove: function(t) {
            if (t) {
                var e = this.rBin;
                e.appendChild(t), e.innerHTML = ""
            }
        },
        renderFix: function() {
            var t = this.container,
                e = t.style;
            e.top = "0px", e.left = "0px";
            try {
                var i = t.getBoundingClientRect(),
                    s = i.left - Math.round(i.left),
                    a = i.top - Math.round(i.top);
                s && (e.left = s + "px"), a && (e.top = a + "px")
            } catch (n) {}
        },
        update: function() {
            this.R.update()
        },
        addDefs: function(e) {
            if (t.hasSVG) {
                var i = this.createSvgElement("desc"),
                    s = this.container;
                s.setAttribute("version", "1.1"), s.style.position = "absolute", this.setSize(this.width, this.height), t.rtl && (s.setAttribute("direction", "rtl"), s.style.left = "auto", s.style.right = "0px"), e.addCodeCredits && i.appendChild(document.createTextNode("JavaScript chart by amCharts " + e.version)), s.appendChild(i), e.defs && (i = this.createSvgElement("defs"), s.appendChild(i), t.parseDefs(e.defs, i), this.defs = i)
            }
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.AmDObject = t.Class({
        construct: function(t, e) {
            this.D = e, this.R = e.R, this.node = this.R.create(this, t), this.y = this.x = 0, this.scale = 1
        },
        attr: function(t) {
            return this.R.attr(this, t), this
        },
        getAttr: function(t) {
            return this.node.getAttribute(t)
        },
        setAttr: function(t, e) {
            return this.R.setAttr(this, t, e), this
        },
        clipRect: function(t, e, i, s) {
            this.R.clipRect(this, t, e, i, s)
        },
        translate: function(t, e, i, s) {
            s || (t = Math.round(t), e = Math.round(e)), this.R.move(this, t, e, i), this.x = t, this.y = e, this.scale = i, this.angle && this.rotate(this.angle)
        },
        rotate: function(t, e) {
            this.R.rotate(this, t, e), this.angle = t
        },
        animate: function(e, i, s) {
            for (var a in e)
                if (e.hasOwnProperty(a)) {
                    var n = a,
                        o = e[a];
                    s = t.getEffect(s), this.R.animate(this, n, o, i, s)
                }
        },
        push: function(t) {
            if (t) {
                var e = this.node;
                e.appendChild(t.node);
                var i = t.clipPath;
                i && e.appendChild(i), (t = t.grad) && e.appendChild(t)
            }
        },
        text: function(t) {
            this.R.setText(this, t)
        },
        remove: function() {
            this.R.remove(this)
        },
        clear: function() {
            var t = this.node;
            if (t.hasChildNodes())
                for (; 1 <= t.childNodes.length;) t.removeChild(t.firstChild)
        },
        hide: function() {
            this.setAttr("visibility", "hidden")
        },
        show: function() {
            this.setAttr("visibility", "visible")
        },
        getBBox: function() {
            return this.R.getBBox(this)
        },
        toFront: function() {
            var t = this.node;
            if (t) {
                this.prevNextNode = t.nextSibling;
                var e = t.parentNode;
                e && e.appendChild(t)
            }
        },
        toPrevious: function() {
            var t = this.node;
            t && this.prevNextNode && (t = t.parentNode) && t.insertBefore(this.prevNextNode, null)
        },
        toBack: function() {
            var t = this.node;
            if (t) {
                this.prevNextNode = t.nextSibling;
                var e = t.parentNode;
                if (e) {
                    var i = e.firstChild;
                    i && e.insertBefore(t, i)
                }
            }
        },
        mouseover: function(t) {
            return this.R.addListener(this, "mouseover", t), this
        },
        mouseout: function(t) {
            return this.R.addListener(this, "mouseout", t), this
        },
        click: function(t) {
            return this.R.addListener(this, "click", t), this
        },
        dblclick: function(t) {
            return this.R.addListener(this, "dblclick", t), this
        },
        mousedown: function(t) {
            return this.R.addListener(this, "mousedown", t), this
        },
        mouseup: function(t) {
            return this.R.addListener(this, "mouseup", t), this
        },
        touchstart: function(t) {
            return this.R.addListener(this, "touchstart", t), this
        },
        touchend: function(t) {
            return this.R.addListener(this, "touchend", t), this
        },
        contextmenu: function(t) {
            return this.node.addEventListener ? this.node.addEventListener("contextmenu", t, !0) : this.R.addListener(this, "contextmenu", t), this
        },
        stop: function() {
            t.removeFromArray(this.R.animations, this.an_x), t.removeFromArray(this.R.animations, this.an_y)
        },
        length: function() {
            return this.node.childNodes.length
        },
        gradient: function(t, e, i) {
            this.R.gradient(this, t, e, i)
        },
        pattern: function(t, e, i) {
            t && this.R.pattern(this, t, e, i)
        }
    })
}(),
function() {
    var t = window.AmCharts;
    t.VMLRenderer = t.Class({
        construct: function(t, e) {
            this.chart = e, this.D = t, this.cNames = {
                circle: "oval",
                ellipse: "oval",
                rect: "roundrect",
                path: "shape"
            }, this.styleMap = {
                x: "left",
                y: "top",
                width: "width",
                height: "height",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                visibility: "visibility"
            }
        },
        create: function(t, e) {
            var i;
            if ("group" == e) i = document.createElement("div"), t.type = "div";
            else if ("text" == e) i = document.createElement("div"), t.type = "text";
            else if ("image" == e) i = document.createElement("img"), t.type = "image";
            else {
                t.type = "shape", t.shapeType = this.cNames[e], i = document.createElement("amvml:" + this.cNames[e]);
                var s = document.createElement("amvml:stroke");
                i.appendChild(s), t.stroke = s;
                var a = document.createElement("amvml:fill");
                i.appendChild(a), t.fill = a, a.className = "amvml", s.className = "amvml", i.className = "amvml"
            }
            return i.style.position = "absolute", i.style.top = 0, i.style.left = 0, i
        },
        path: function(t, e) {
            t.node.setAttribute("src", e)
        },
        setAttr: function(e, i, s) {
            if (void 0 !== s) {
                var a;
                8 === document.documentMode && (a = !0);
                var n = e.node,
                    o = e.type,
                    r = n.style;
                "r" == i && (r.width = 2 * s, r.height = 2 * s), "oval" == e.shapeType && ("rx" == i && (r.width = 2 * s), "ry" == i && (r.height = 2 * s)), "roundrect" == e.shapeType && ("width" != i && "height" != i || --s), "cursor" == i && (r.cursor = s), "cx" == i && (r.left = s - t.removePx(r.width) / 2), "cy" == i && (r.top = s - t.removePx(r.height) / 2);
                var h = this.styleMap[i];
                if ("width" == h && 0 > s && (s = 0), void 0 !== h && (r[h] = s), "text" == o && ("text-anchor" == i && (e.anchor = s, h = n.clientWidth, "end" == s && (r.marginLeft = -h + "px"), "middle" == s && (r.marginLeft = -(h / 2) + "px", r.textAlign = "center"), "start" == s && (r.marginLeft = "0px")), "fill" == i && (r.color = s), "font-weight" == i && (r.fontWeight = s)), r = e.children)
                    for (h = 0; h < r.length; h++) r[h].setAttr(i, s);
                "shape" == o && ("cs" == i && (n.style.width = "100px", n.style.height = "100px", n.setAttribute("coordsize", s)), "d" == i && n.setAttribute("path", this.svgPathToVml(s)), "dd" == i && n.setAttribute("path", s), o = e.stroke, e = e.fill, "stroke" == i && (a ? o.color = s : o.setAttribute("color", s)), "stroke-width" == i && (a ? o.weight = s : o.setAttribute("weight", s)), "stroke-opacity" == i && (a ? o.opacity = s : o.setAttribute("opacity", s)), "stroke-dasharray" == i && (r = "solid", s > 0 && 3 > s && (r = "dot"), s >= 3 && 6 >= s && (r = "dash"), s > 6 && (r = "longdash"), a ? o.dashstyle = r : o.setAttribute("dashstyle", r)), ("fill-opacity" == i || "opacity" == i) && (0 === s ? a ? e.on = !1 : e.setAttribute("on", !1) : a ? e.opacity = s : e.setAttribute("opacity", s)), "fill" == i && (a ? e.color = s : e.setAttribute("color", s)), "rx" == i && (a ? n.arcSize = s + "%" : n.setAttribute("arcsize", s + "%")))
            }
        },
        attr: function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && this.setAttr(t, i, e[i])
        },
        text: function(e, i, s) {
            var a = new t.AmDObject("text", this.D),
                n = a.node;
            return n.style.whiteSpace = "pre", n.innerHTML = e, this.D.addToContainer(n, s), this.attr(a, i), a
        },
        getBBox: function(t) {
            return this.getBox(t.node)
        },
        getBox: function(t) {
            var e, i = t.offsetLeft,
                s = t.offsetTop,
                a = t.offsetWidth,
                n = t.offsetHeight;
            if (t.hasChildNodes()) {
                var o, r, h;
                for (h = 0; h < t.childNodes.length; h++) {
                    e = this.getBox(t.childNodes[h]);
                    var l = e.x;
                    isNaN(l) || (isNaN(o) ? o = l : o > l && (o = l));
                    var d = e.y;
                    isNaN(d) || (isNaN(r) ? r = d : r > d && (r = d)), l = e.width + l, isNaN(l) || (a = Math.max(a, l)), e = e.height + d, isNaN(e) || (n = Math.max(n, e))
                }
                0 > o && (i += o), 0 > r && (s += r)
            }
            return {
                x: i,
                y: s,
                width: a,
                height: n
            }
        },
        setText: function(t, e) {
            var i = t.node;
            i && (i.innerHTML = e), this.setAttr(t, "text-anchor", t.anchor)
        },
        addListener: function(t, e, i) {
            t.node["on" + e] = i
        },
        move: function(e, i, s) {
            var a = e.node,
                n = a.style;
            "text" == e.type && (s -= t.removePx(n.fontSize) / 2 - 1), "oval" == e.shapeType && (i -= t.removePx(n.width) / 2, s -= t.removePx(n.height) / 2), e = e.bw, isNaN(e) || (i -= e, s -= e), isNaN(i) || isNaN(s) || (a.style.left = i + "px", a.style.top = s + "px")
        },
        svgPathToVml: function(t) {
            var e = t.split(" ");
            t = "";
            var i, s, a = Math.round;
            for (s = 0; s < e.length; s++) {
                var n = e[s],
                    o = n.substring(0, 1),
                    n = n.substring(1),
                    r = n.split(","),
                    h = a(r[0]) + "," + a(r[1]);
                if ("M" == o && (t += " m " + h), "L" == o && (t += " l " + h), "Z" == o && (t += " x e"), "Q" == o) {
                    var l = i.length,
                        d = i[l - 1],
                        c = r[0],
                        u = r[1],
                        h = r[2],
                        p = r[3];
                    i = a(i[l - 2] / 3 + 2 / 3 * c), d = a(d / 3 + 2 / 3 * u), c = a(2 / 3 * c + h / 3), u = a(2 / 3 * u + p / 3), t += " c " + i + "," + d + "," + c + "," + u + "," + h + "," + p
                }
                "A" == o && (t += " wa " + n), "B" == o && (t += " at " + n), i = r
            }
            return t
        },
        animate: function(t, e, i, s, a) {
            var n = t.node,
                o = this.chart;
            if ("translate" == e) {
                e = i.split(","), i = e[1];
                var r = n.offsetTop;
                o.animate(t, "left", n.offsetLeft, e[0], s, a, "px"), o.animate(t, "top", r, i, s, a, "px")
            }
        },
        clipRect: function(t, e, i, s, a) {
            t = t.node, 0 === e && 0 === i ? (t.style.width = s + "px", t.style.height = a + "px", t.style.overflow = "hidden") : t.style.clip = "rect(" + i + "px " + (e + s) + "px " + (i + a) + "px " + e + "px)"
        },
        rotate: function(e, i, s) {
            if (0 !== Number(i)) {
                var a = e.node;
                e = a.style, s || (s = this.getBGColor(a.parentNode)), e.backgroundColor = s, e.paddingLeft = 1, s = i * Math.PI / 180;
                var n = Math.cos(s),
                    o = Math.sin(s),
                    r = t.removePx(e.left),
                    h = t.removePx(e.top),
                    l = a.offsetWidth,
                    a = a.offsetHeight;
                i /= Math.abs(i), e.left = r + l / 2 - l / 2 * Math.cos(s) - i * a / 2 * Math.sin(s) + 3, e.top = h - i * l / 2 * Math.sin(s) + i * a / 2 * Math.sin(s), e.cssText = e.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + n + "', M12='" + -o + "', M21='" + o + "', M22='" + n + "', sizingmethod='auto expand');"
            }
        },
        getBGColor: function(t) {
            var e = "#FFFFFF";
            if (t.style) {
                var i = t.style.backgroundColor;
                "" !== i ? e = i : t.parentNode && (e = this.getBGColor(t.parentNode))
            }
            return e
        },
        set: function(e) {
            var i = new t.AmDObject("group", this.D);
            if (this.D.container.appendChild(i.node), e) {
                var s;
                for (s = 0; s < e.length; s++) i.push(e[s])
            }
            return i
        },
        gradient: function(t, e, i, s) {
            var a = "";
            "radialGradient" == e && (e = "gradientradial", i.reverse()), "linearGradient" == e && (e = "gradient");
            var n;
            for (n = 0; n < i.length; n++) a += Math.round(100 * n / (i.length - 1)) + "% " + i[n], n < i.length - 1 && (a += ",");
            t = t.fill, 90 == s ? s = 0 : 270 == s ? s = 180 : 180 == s ? s = 90 : 0 === s && (s = 270), 8 === document.documentMode ? (t.type = e, t.angle = s) : (t.setAttribute("type", e), t.setAttribute("angle", s)), a && (t.colors.value = a)
        },
        remove: function(t) {
            t.clipPath && this.D.remove(t.clipPath), this.D.remove(t.node)
        },
        disableSelection: function(t) {
            void 0 !== typeof t.onselectstart && (t.onselectstart = function() {
                return !1
            }), t.style.cursor = "default"
        },
        pattern: function(e, i, s, a) {
            s = e.node, e = e.fill;
            var n = "none";
            i.color && (n = i.color), s.fillColor = n, i = i.url, t.isAbsolute(i) || (i = a + i), 8 === document.documentMode ? (e.type = "tile", e.src = i) : (e.setAttribute("type", "tile"), e.setAttribute("src", i))
        },
        update: function() {}
    })
}(),
function() {
    var t = window.AmCharts;
    t.SVGRenderer = t.Class({
        construct: function(t) {
            this.D = t, this.animations = []
        },
        create: function(e, i) {
            return document.createElementNS(t.SVG_NS, i);
        },
        attr: function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && this.setAttr(t, i, e[i])
        },
        setAttr: function(t, e, i) {
            void 0 !== i && t.node.setAttribute(e, i)
        },
        animate: function(e, i, s, a, n) {
            var o = e.node;
            e["an_" + i] && t.removeFromArray(this.animations, e["an_" + i]), "translate" == i ? (o = (o = o.getAttribute("transform")) ? String(o).substring(10, o.length - 1) : "0,0", o = o.split(", ").join(" "), o = o.split(" ").join(","), 0 === o && (o = "0,0")) : o = Number(o.getAttribute(i)), s = {
                obj: e,
                frame: 0,
                attribute: i,
                from: o,
                to: s,
                time: a,
                effect: n
            }, this.animations.push(s), e["an_" + i] = s
        },
        update: function() {
            var e, i = this.animations;
            for (e = i.length - 1; e >= 0; e--) {
                var s, a, n, o = i[e],
                    r = 1e3 * o.time / t.updateRate,
                    h = o.frame + 1,
                    l = o.obj,
                    d = o.attribute;
                r >= h ? (o.frame++, "translate" == d ? (s = o.from.split(","), d = Number(s[0]), s = Number(s[1]), isNaN(s) && (s = 0), a = o.to.split(","), n = Number(a[0]), a = Number(a[1]), n = 0 === n - d ? n : Math.round(t[o.effect](0, h, d, n - d, r)), o = 0 === a - s ? a : Math.round(t[o.effect](0, h, s, a - s, r)), d = "transform", o = "translate(" + n + "," + o + ")") : (a = Number(o.from), s = Number(o.to), n = s - a, o = t[o.effect](0, h, a, n, r), isNaN(o) && (o = s), 0 === n && this.animations.splice(e, 1)), this.setAttr(l, d, o)) : ("translate" == d ? (a = o.to.split(","), n = Number(a[0]), a = Number(a[1]), l.translate(n, a)) : (s = Number(o.to), this.setAttr(l, d, s)), this.animations.splice(e, 1))
            }
        },
        getBBox: function(t) {
            if (t = t.node) try {
                return t.getBBox()
            } catch (e) {}
            return {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        },
        path: function(e, i) {
            e.node.setAttributeNS(t.SVG_XLINK, "xlink:href", i)
        },
        clipRect: function(e, i, s, a, n) {
            var o = e.node,
                r = e.clipPath;
            r && this.D.remove(r);
            var h = o.parentNode;
            h && (o = document.createElementNS(t.SVG_NS, "clipPath"), r = t.getUniqueId(), o.setAttribute("id", r), this.D.rect(i, s, a, n, 0, 0, o), h.appendChild(o), i = "#", t.baseHref && !t.isIE && (i = this.removeTarget(window.location.href) + i), this.setAttr(e, "clip-path", "url(" + i + r + ")"), this.clipPathC++, e.clipPath = o)
        },
        text: function(e, i, s) {
            var a = new t.AmDObject("text", this.D);
            e = String(e).split("\n");
            var n, o = t.removePx(i["font-size"]);
            for (n = 0; n < e.length; n++) {
                var r = this.create(null, "tspan");
                r.appendChild(document.createTextNode(e[n])), r.setAttribute("y", (o + 2) * n + Math.round(o / 2)), r.setAttribute("x", 0), a.node.appendChild(r)
            }
            return a.node.setAttribute("y", Math.round(o / 2)), this.attr(a, i), this.D.addToContainer(a.node, s), a
        },
        setText: function(t, e) {
            var i = t.node;
            i && (i.removeChild(i.firstChild), i.appendChild(document.createTextNode(e)))
        },
        move: function(t, e, i, s) {
            isNaN(e) && (e = 0), isNaN(i) && (i = 0), e = "translate(" + e + "," + i + ")", s && (e = e + " scale(" + s + ")"), this.setAttr(t, "transform", e)
        },
        rotate: function(t, e) {
            var i = t.node.getAttribute("transform"),
                s = "rotate(" + e + ")";
            i && (s = i + " " + s), this.setAttr(t, "transform", s)
        },
        set: function(e) {
            var i = new t.AmDObject("g", this.D);
            if (this.D.container.appendChild(i.node), e) {
                var s;
                for (s = 0; s < e.length; s++) i.push(e[s])
            }
            return i
        },
        addListener: function(t, e, i) {
            t.node["on" + e] = i
        },
        gradient: function(e, i, s, a) {
            var n = e.node,
                o = e.grad;
            if (o && this.D.remove(o), i = document.createElementNS(t.SVG_NS, i), o = t.getUniqueId(), i.setAttribute("id", o), !isNaN(a)) {
                var r = 0,
                    h = 0,
                    l = 0,
                    d = 0;
                90 == a ? l = 100 : 270 == a ? d = 100 : 180 == a ? r = 100 : 0 === a && (h = 100), i.setAttribute("x1", r + "%"), i.setAttribute("x2", h + "%"), i.setAttribute("y1", l + "%"), i.setAttribute("y2", d + "%")
            }
            for (a = 0; a < s.length; a++) r = document.createElementNS(t.SVG_NS, "stop"), h = 100 * a / (s.length - 1), 0 === a && (h = 0), r.setAttribute("offset", h + "%"), r.setAttribute("stop-color", s[a]), i.appendChild(r);
            n.parentNode.appendChild(i), s = "#", t.baseHref && !t.isIE && (s = this.removeTarget(window.location.href) + s), n.setAttribute("fill", "url(" + s + o + ")"), e.grad = i
        },
        removeTarget: function(t) {
            return t.split("#")[0]
        },
        pattern: function(e, i, s, a) {
            var n = e.node;
            isNaN(s) && (s = 1);
            var o = e.patternNode;
            o && this.D.remove(o);
            var o = document.createElementNS(t.SVG_NS, "pattern"),
                r = t.getUniqueId(),
                h = i;
            i.url && (h = i.url), t.isAbsolute(h) || (h = a + h), a = Number(i.width), isNaN(a) && (a = 4);
            var l = Number(i.height);
            isNaN(l) && (l = 4), a /= s, l /= s, s = i.x, isNaN(s) && (s = 0);
            var d = -Math.random() * Number(i.randomX);
            isNaN(d) || (s = d), d = i.y, isNaN(d) && (d = 0);
            var c = -Math.random() * Number(i.randomY);
            isNaN(c) || (d = c), o.setAttribute("id", r), o.setAttribute("width", a), o.setAttribute("height", l), o.setAttribute("patternUnits", "userSpaceOnUse"), o.setAttribute("xlink:href", h), i.color && (c = document.createElementNS(t.SVG_NS, "rect"), c.setAttributeNS(null, "height", a), c.setAttributeNS(null, "width", l), c.setAttributeNS(null, "fill", i.color), o.appendChild(c)), this.D.image(h, 0, 0, a, l, o).translate(s, d), h = "#", t.baseHref && !t.isIE && (h = this.removeTarget(window.location.href) + h), n.setAttribute("fill", "url(" + h + r + ")"), e.patternNode = o, n.parentNode.appendChild(o)
        },
        remove: function(t) {
            t.clipPath && this.D.remove(t.clipPath), t.grad && this.D.remove(t.grad), t.patternNode && this.D.remove(t.patternNode), this.D.remove(t.node)
        }
    })
}(), AmCharts.AmDSet = AmCharts.Class({
        construct: function(t) {
            this.create("g")
        },
        attr: function(t) {
            this.R.attr(this.node, t)
        },
        move: function(t, e) {
            this.R.move(this.node, t, e)
        }
    }),
    function() {
        var t = window.AmCharts;
        t.AmLegend = t.Class({
            construct: function(e) {
                this.enabled = !0, this.cname = "AmLegend", this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel"), this.position = "bottom", this.borderColor = this.color = "#000000", this.borderAlpha = 0, this.markerLabelGap = 5, this.verticalGap = 10, this.align = "left", this.horizontalGap = 0, this.spacing = 10, this.markerDisabledColor = "#AAB3B3", this.markerType = "square", this.markerSize = 16, this.markerBorderThickness = this.markerBorderAlpha = 1, this.marginBottom = this.marginTop = 0, this.marginLeft = this.marginRight = 20, this.autoMargins = !0, this.valueWidth = 50, this.switchable = !0, this.switchType = "x", this.switchColor = "#FFFFFF", this.rollOverColor = "#CC0000", this.reversedOrder = !1, this.labelText = "[[title]]", this.valueText = "[[value]]", this.useMarkerColorForLabels = !1, this.rollOverGraphAlpha = 1, this.textClickEnabled = !1, this.equalWidths = !0, this.backgroundColor = "#FFFFFF", this.backgroundAlpha = 0, this.useGraphSettings = !1, this.showEntries = !0, t.applyTheme(this, e, this.cname)
            },
            setData: function(t) {
                this.legendData = t, this.invalidateSize()
            },
            invalidateSize: function() {
                this.destroy(), this.entries = [], this.valueLabels = [];
                var e = this.legendData;
                this.enabled && (t.ifArray(e) || t.ifArray(this.data)) && this.drawLegend()
            },
            drawLegend: function() {
                var e = this.chart,
                    i = this.position,
                    s = this.width,
                    a = e.divRealWidth,
                    n = e.divRealHeight,
                    o = this.div,
                    r = this.legendData;
                if (this.data && (r = this.data), isNaN(this.fontSize) && (this.fontSize = e.fontSize), "right" == i || "left" == i) this.maxColumns = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10);
                else if (this.autoMargins) {
                    this.marginRight = e.marginRight, this.marginLeft = e.marginLeft;
                    var h = e.autoMarginOffset;
                    "bottom" == i ? (this.marginBottom = h, this.marginTop = 0) : (this.marginTop = h, this.marginBottom = 0)
                }
                if (s = void 0 !== s ? t.toCoordinate(s, a) : "right" != i && "left" != i ? e.realWidth : 0 < this.ieW ? this.ieW : e.realWidth, "outside" == i ? (s = o.offsetWidth, n = o.offsetHeight, o.clientHeight && (s = o.clientWidth, n = o.clientHeight)) : (isNaN(s) || (o.style.width = s + "px"), o.className = "amChartsLegend " + e.classNamePrefix + "-legend-div"), this.divWidth = s, (i = this.container) ? (i.container.innerHTML = "", o.appendChild(i.container), i.width = s, i.height = n, i.setSize(s, n), i.addDefs(e)) : i = new t.AmDraw(o, s, n, e), this.container = i, this.lx = 0, this.ly = 8, n = this.markerSize, n > this.fontSize && (this.ly = n / 2 - 1), n > 0 && (this.lx += n + this.markerLabelGap), this.titleWidth = 0, (n = this.title) && (n = t.text(this.container, n, this.color, e.fontFamily, this.fontSize, "start", !0), t.setCN(e, n, "legend-title"), n.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), e = n.getBBox(), this.titleWidth = e.width + 15, this.titleHeight = e.height + 6), this.index = this.maxLabelWidth = 0, this.showEntries) {
                    for (e = 0; e < r.length; e++) this.createEntry(r[e]);
                    for (e = this.index = 0; e < r.length; e++) this.createValue(r[e])
                }
                this.arrangeEntries(), this.updateValues()
            },
            arrangeEntries: function() {
                var e = this.position,
                    i = this.marginLeft + this.titleWidth,
                    s = this.marginRight,
                    a = this.marginTop,
                    n = this.marginBottom,
                    o = this.horizontalGap,
                    r = this.div,
                    h = this.divWidth,
                    l = this.maxColumns,
                    d = this.verticalGap,
                    c = this.spacing,
                    u = h - s - i,
                    p = 0,
                    m = 0,
                    f = this.container;
                this.set && this.set.remove();
                var g = f.set();
                this.set = g;
                var v = f.set();
                g.push(v);
                var b, x, C = this.entries;
                for (x = 0; x < C.length; x++) {
                    b = C[x].getBBox();
                    var y = b.width;
                    y > p && (p = y), b = b.height, b > m && (m = b)
                }
                var y = m = 0,
                    N = o,
                    w = 0,
                    S = 0;
                for (x = 0; x < C.length; x++) {
                    var A = C[x];
                    this.reversedOrder && (A = C[C.length - x - 1]), b = A.getBBox();
                    var M;
                    this.equalWidths ? M = y * (p + c + this.markerLabelGap) : (M = N, N = N + b.width + o + c), b.height > S && (S = b.height), M + b.width > u && x > 0 && 0 !== y && (m++, M = y = 0, N = M + b.width + o + c, w = w + S + d, S = 0), A.translate(M, w), y++, !isNaN(l) && y >= l && (y = 0, m++, w = w + S + d, N = o, S = 0), v.push(A)
                }
                b = v.getBBox(), l = b.height + 2 * d - 1, "left" == e || "right" == e ? (c = b.width + 2 * o, h = c + i + s, r.style.width = h + "px", this.ieW = h) : c = h - i - s - 1, s = t.polygon(this.container, [0, c, c, 0], [0, 0, l, l], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha), t.setCN(this.chart, s, "legend-bg"), g.push(s), g.translate(i, a), s.toBack(), i = o, ("top" == e || "bottom" == e || "absolute" == e || "outside" == e) && ("center" == this.align ? i = o + (c - b.width) / 2 : "right" == this.align && (i = o + c - b.width)), v.translate(i, d + 1), this.titleHeight > l && (l = this.titleHeight), e = l + a + n + 1, 0 > e && (e = 0), e > this.chart.divRealHeight && (r.style.top = "0px"), r.style.height = Math.round(e) + "px", f.setSize(this.divWidth, e)
            },
            createEntry: function(e) {
                if (!1 !== e.visibleInLegend) {
                    var i = this.chart,
                        s = e.markerType;
                    e.legendEntryWidth = this.markerSize, s || (s = this.markerType);
                    var a = e.color,
                        n = e.alpha;
                    e.legendKeyColor && (a = e.legendKeyColor()), e.legendKeyAlpha && (n = e.legendKeyAlpha());
                    var o;
                    !0 === e.hidden && (o = a = this.markerDisabledColor);
                    var r = e.pattern,
                        h = e.customMarker;
                    h || (h = this.customMarker);
                    var l = this.container,
                        d = this.markerSize,
                        c = 0,
                        u = 0,
                        p = d / 2;
                    if (this.useGraphSettings) {
                        if (s = e.type, this.switchType = void 0, "line" == s || "step" == s || "smoothedLine" == s || "ohlc" == s) r = l.set(), e.hidden || (a = e.lineColorR, o = e.bulletBorderColorR), c = t.line(l, [0, 2 * d], [d / 2, d / 2], a, e.lineAlpha, e.lineThickness, e.dashLength), t.setCN(i, c, "graph-stroke"), r.push(c), e.bullet && (e.hidden || (a = e.bulletColorR), c = t.bullet(l, e.bullet, e.bulletSize, a, e.bulletAlpha, e.bulletBorderThickness, o, e.bulletBorderAlpha)) && (t.setCN(i, c, "graph-bullet"), c.translate(d + 1, d / 2), r.push(c)), p = 0, c = d, u = d / 3;
                        else {
                            var m;
                            e.getGradRotation && (m = e.getGradRotation(), 0 === m && (m = 180)), c = e.fillColorsR, !0 === e.hidden && (c = a), (r = this.createMarker("rectangle", c, e.fillAlphas, e.lineThickness, a, e.lineAlpha, m, r, e.dashLength)) && (p = d, r.translate(p, d / 2)), c = d
                        }
                        t.setCN(i, r, "graph-" + s), t.setCN(i, r, "graph-" + e.id)
                    } else if (h) r = l.image(h, 0, 0, d, d);
                    else {
                        var f;
                        isNaN(this.gradientRotation) || (f = 180 + this.gradientRotation), (r = this.createMarker(s, a, n, void 0, void 0, void 0, f, r)) && r.translate(d / 2, d / 2)
                    }
                    t.setCN(i, r, "legend-marker"), this.addListeners(r, e), l = l.set([r]), this.switchable && e.switchable && l.setAttr("cursor", "pointer"), void 0 !== e.id && t.setCN(i, l, "legend-item-" + e.id), t.setCN(i, l, e.className, !0), (o = this.switchType) && "none" != o && d > 0 && ("x" == o ? (m = this.createX(), m.translate(d / 2, d / 2)) : m = this.createV(), m.dItem = e, !0 !== e.hidden ? "x" == o ? m.hide() : m.show() : "x" != o && m.hide(), this.switchable || m.hide(), this.addListeners(m, e), e.legendSwitch = m, l.push(m), t.setCN(i, m, "legend-switch")), o = this.color, e.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (o = this.selectedColor), this.useMarkerColorForLabels && (o = a), !0 === e.hidden && (o = this.markerDisabledColor), a = t.massReplace(this.labelText, {
                        "[[title]]": e.title
                    }), m = this.fontSize, r && (m >= d && r.translate(p, d / 2 + this.ly - m / 2 + (m + 2 - d) / 2 - u), e.legendEntryWidth = r.getBBox().width);
                    var g;
                    a && (a = t.fixBrakes(a), e.legendTextReal = a, g = this.labelWidth, g = isNaN(g) ? t.text(this.container, a, o, i.fontFamily, m, "start") : t.wrappedText(this.container, a, o, i.fontFamily, m, "start", !1, g, 0), t.setCN(i, g, "legend-label"), g.translate(this.lx + c, this.ly), l.push(g), i = g.getBBox().width, this.maxLabelWidth < i && (this.maxLabelWidth = i)), this.entries[this.index] = l, e.legendEntry = this.entries[this.index], e.legendLabel = g, this.index++
                }
            },
            addListeners: function(t, e) {
                var i = this;
                t && t.mouseover(function(t) {
                    i.rollOverMarker(e, t)
                }).mouseout(function(t) {
                    i.rollOutMarker(e, t)
                }).click(function(t) {
                    i.clickMarker(e, t)
                })
            },
            rollOverMarker: function(t, e) {
                this.switchable && this.dispatch("rollOverMarker", t, e), this.dispatch("rollOverItem", t, e)
            },
            rollOutMarker: function(t, e) {
                this.switchable && this.dispatch("rollOutMarker", t, e), this.dispatch("rollOutItem", t, e)
            },
            clickMarker: function(t, e) {
                this.switchable && (!0 === t.hidden ? this.dispatch("showItem", t, e) : this.dispatch("hideItem", t, e)), this.dispatch("clickMarker", t, e)
            },
            rollOverLabel: function(t, e) {
                t.hidden || (this.textClickEnabled && t.legendLabel && t.legendLabel.attr({
                    fill: this.rollOverColor
                }), this.dispatch("rollOverItem", t, e))
            },
            rollOutLabel: function(t, e) {
                if (!t.hidden) {
                    if (this.textClickEnabled && t.legendLabel) {
                        var i = this.color;
                        void 0 !== this.selectedColor && t.showBalloon && (i = this.selectedColor), this.useMarkerColorForLabels && (i = t.lineColor, void 0 === i && (i = t.color)), t.legendLabel.attr({
                            fill: i
                        })
                    }
                    this.dispatch("rollOutItem", t, e)
                }
            },
            clickLabel: function(t, e) {
                this.textClickEnabled ? t.hidden || this.dispatch("clickLabel", t, e) : this.switchable && (!0 === t.hidden ? this.dispatch("showItem", t, e) : this.dispatch("hideItem", t, e))
            },
            dispatch: function(t, e, i) {
                e = {
                    type: t,
                    dataItem: e,
                    target: this,
                    event: i,
                    chart: this.chart
                }, this.chart && this.chart.handleLegendEvent(e), this.fire(t, e)
            },
            createValue: function(e) {
                var i = this,
                    s = i.fontSize,
                    a = i.chart;
                if (!1 !== e.visibleInLegend) {
                    var n = i.maxLabelWidth;
                    i.forceWidth && (n = i.labelWidth), i.equalWidths || (i.valueAlign = "left"), "left" == i.valueAlign && (n = e.legendEntry.getBBox().width);
                    var o = n;
                    if (i.valueText && 0 < i.valueWidth) {
                        var r = i.color;
                        i.useMarkerColorForValues && (r = e.color, e.legendKeyColor && (r = e.legendKeyColor())), !0 === e.hidden && (r = i.markerDisabledColor);
                        var h = i.valueText,
                            n = n + i.lx + i.markerLabelGap + i.valueWidth,
                            l = "end";
                        "left" == i.valueAlign && (n -= i.valueWidth, l = "start"), r = t.text(i.container, h, r, i.chart.fontFamily, s, l), t.setCN(a, r, "legend-value"), r.translate(n, i.ly), i.entries[i.index].push(r), o += i.valueWidth + 2 * i.markerLabelGap, r.dItem = e, i.valueLabels.push(r)
                    }
                    i.index++, a = i.markerSize, s + 7 > a && (a = s + 7, t.VML && (a += 3)), s = i.container.rect(e.legendEntryWidth, 0, o, a, 0, 0).attr({
                        stroke: "none",
                        fill: "#fff",
                        "fill-opacity": .005
                    }), s.dItem = e, i.entries[i.index - 1].push(s), s.mouseover(function(t) {
                        i.rollOverLabel(e, t)
                    }).mouseout(function(t) {
                        i.rollOutLabel(e, t)
                    }).click(function(t) {
                        i.clickLabel(e, t)
                    })
                }
            },
            createV: function() {
                var e = this.markerSize;
                return t.polygon(this.container, [e / 5, e / 2, e - e / 5, e / 2], [e / 3, e - e / 5, e / 5, e / 1.7], this.switchColor)
            },
            createX: function() {
                var e = (this.markerSize - 4) / 2,
                    i = {
                        stroke: this.switchColor,
                        "stroke-width": 3
                    },
                    s = this.container,
                    a = t.line(s, [-e, e], [-e, e]).attr(i),
                    e = t.line(s, [-e, e], [e, -e]).attr(i);
                return this.container.set([a, e])
            },
            createMarker: function(e, i, s, a, n, o, r, h, l) {
                var d = this.markerSize,
                    c = this.container;
                return n || (n = this.markerBorderColor), n || (n = i), isNaN(a) && (a = this.markerBorderThickness), isNaN(o) && (o = this.markerBorderAlpha), t.bullet(c, e, d, i, s, a, n, o, d, r, h, this.chart.path, l)
            },
            validateNow: function() {
                this.invalidateSize()
            },
            updateValues: function() {
                var e, i = this.valueLabels,
                    s = this.chart,
                    a = this.data;
                for (e = 0; e < i.length; e++) {
                    var n = i[e],
                        o = n.dItem,
                        r = " ";
                    if (a) o.value ? n.text(o.value) : n.text("");
                    else {
                        var h;
                        if (void 0 !== o.type) {
                            h = o.currentDataItem;
                            var l = this.periodValueText;
                            o.legendPeriodValueText && (l = o.legendPeriodValueText), h ? (r = this.valueText, o.legendValueText && (r = o.legendValueText), r = s.formatString(r, h)) : l && s.formatPeriodString && (l = t.massReplace(l, {
                                "[[title]]": o.title
                            }), r = s.formatPeriodString(l, o))
                        } else r = s.formatString(this.valueText, o);
                        (l = this.valueFunction) && (h && (o = h), r = l(o, r)), n.text(r)
                    }
                }
            },
            renderFix: function() {
                if (!t.VML && this.enabled) {
                    var e = this.container;
                    e && e.renderFix()
                }
            },
            destroy: function() {
                this.div.innerHTML = "", t.remove(this.set)
            }
        })
    }(),
    function() {
        var t = window.AmCharts;
        t.formatMilliseconds = function(t, e) {
            if (-1 != t.indexOf("fff")) {
                var i = e.getMilliseconds(),
                    s = String(i);
                10 > i && (s = "00" + i), i >= 10 && 100 > i && (s = "0" + i), t = t.replace(/fff/g, s)
            }
            return t
        }, t.extractPeriod = function(e) {
            var i = t.stripNumbers(e),
                s = 1;
            return i != e && (s = Number(e.slice(0, e.indexOf(i)))), {
                period: i,
                count: s
            }
        }, t.getDate = function(e, i, s) {
            return e instanceof Date ? t.newDate(e, s) : i && isNaN(e) ? t.stringToDate(e, i) : new Date(e)
        }, t.daysInMonth = function(t) {
            return new Date(t.getYear(), t.getMonth() + 1, 0).getDate()
        }, t.newDate = function(t, e) {
            return e && -1 == e.indexOf("fff") ? new Date(t) : new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds())
        }, t.resetDateToMin = function(e, i, s, a) {
            void 0 === a && (a = 1);
            var n, o, r, h, l, d, c;
            switch (t.useUTC ? (n = e.getUTCFullYear(), o = e.getUTCMonth(), r = e.getUTCDate(), h = e.getUTCHours(), l = e.getUTCMinutes(), d = e.getUTCSeconds(), c = e.getUTCMilliseconds(), e = e.getUTCDay()) : (n = e.getFullYear(), o = e.getMonth(), r = e.getDate(), h = e.getHours(), l = e.getMinutes(), d = e.getSeconds(), c = e.getMilliseconds(), e = e.getDay()), i) {
                case "YYYY":
                    n = Math.floor(n / s) * s, o = 0, r = 1, c = d = l = h = 0;
                    break;
                case "MM":
                    o = Math.floor(o / s) * s, r = 1, c = d = l = h = 0;
                    break;
                case "WW":
                    r = e >= a ? r - e + a : r - (7 + e) + a, c = d = l = h = 0;
                    break;
                case "DD":
                    c = d = l = h = 0;
                    break;
                case "hh":
                    h = Math.floor(h / s) * s, c = d = l = 0;
                    break;
                case "mm":
                    l = Math.floor(l / s) * s, c = d = 0;
                    break;
                case "ss":
                    d = Math.floor(d / s) * s, c = 0;
                    break;
                case "fff":
                    c = Math.floor(c / s) * s
            }
            return t.useUTC ? (e = new Date, e.setUTCFullYear(n, o, r), e.setUTCHours(h, l, d, c)) : e = new Date(n, o, r, h, l, d, c), e
        }, t.getPeriodDuration = function(t, e) {
            void 0 === e && (e = 1);
            var i;
            switch (t) {
                case "YYYY":
                    i = 316224e5;
                    break;
                case "MM":
                    i = 26784e5;
                    break;
                case "WW":
                    i = 6048e5;
                    break;
                case "DD":
                    i = 864e5;
                    break;
                case "hh":
                    i = 36e5;
                    break;
                case "mm":
                    i = 6e4;
                    break;
                case "ss":
                    i = 1e3;
                    break;
                case "fff":
                    i = 1
            }
            return i * e
        }, t.intervals = {
            s: {
                nextInterval: "ss",
                contains: 1e3
            },
            ss: {
                nextInterval: "mm",
                contains: 60,
                count: 0
            },
            mm: {
                nextInterval: "hh",
                contains: 60,
                count: 1
            },
            hh: {
                nextInterval: "DD",
                contains: 24,
                count: 2
            },
            DD: {
                nextInterval: "",
                contains: 1 / 0,
                count: 3
            }
        }, t.getMaxInterval = function(e, i) {
            var s = t.intervals;
            return e >= s[i].contains ? (e = Math.round(e / s[i].contains), i = s[i].nextInterval, t.getMaxInterval(e, i)) : "ss" == i ? s[i].nextInterval : i
        }, t.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), t.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" "), t.monthNames = "January February March April May June July August September October November December".split(" "), t.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), t.getWeekNumber = function(t) {
            t = new Date(t), t.setHours(0, 0, 0), t.setDate(t.getDate() + 4 - (t.getDay() || 7));
            var e = new Date(t.getFullYear(), 0, 1);
            return Math.ceil(((t - e) / 864e5 + 1) / 7)
        }, t.stringToDate = function(e, i) {
            var s = {},
                a = [{
                    pattern: "YYYY",
                    period: "year"
                }, {
                    pattern: "YY",
                    period: "year"
                }, {
                    pattern: "MM",
                    period: "month"
                }, {
                    pattern: "M",
                    period: "month"
                }, {
                    pattern: "DD",
                    period: "date"
                }, {
                    pattern: "D",
                    period: "date"
                }, {
                    pattern: "JJ",
                    period: "hours"
                }, {
                    pattern: "J",
                    period: "hours"
                }, {
                    pattern: "HH",
                    period: "hours"
                }, {
                    pattern: "H",
                    period: "hours"
                }, {
                    pattern: "KK",
                    period: "hours"
                }, {
                    pattern: "K",
                    period: "hours"
                }, {
                    pattern: "LL",
                    period: "hours"
                }, {
                    pattern: "L",
                    period: "hours"
                }, {
                    pattern: "NN",
                    period: "minutes"
                }, {
                    pattern: "N",
                    period: "minutes"
                }, {
                    pattern: "SS",
                    period: "seconds"
                }, {
                    pattern: "S",
                    period: "seconds"
                }, {
                    pattern: "QQQ",
                    period: "milliseconds"
                }, {
                    pattern: "QQ",
                    period: "milliseconds"
                }, {
                    pattern: "Q",
                    period: "milliseconds"
                }],
                n = !0,
                o = i.indexOf("AA"); - 1 != o && (e.substr(o, 2), "pm" == e.toLowerCase && (n = !1));
            var r, h, l, o = i;
            for (l = 0; l < a.length; l++) h = a[l].period, s[h] = 0, "date" == h && (s[h] = 1);
            for (l = 0; l < a.length; l++)
                if (r = a[l].pattern, h = a[l].period, -1 != i.indexOf(r)) {
                    var d = t.getFromDateString(r, e, o);
                    i = i.replace(r, ""), ("KK" == r || "K" == r || "LL" == r || "L" == r) && (n || (d += 12)), s[h] = d
                }
            return t.useUTC ? (a = new Date, a.setUTCFullYear(s.year, s.month, s.date), a.setUTCHours(s.hours, s.minutes, s.seconds, s.milliseconds)) : a = new Date(s.year, s.month, s.date, s.hours, s.minutes, s.seconds, s.milliseconds), a
        }, t.getFromDateString = function(t, e, i) {
            return void 0 !== e ? (i = i.indexOf(t), e = String(e), e = e.substr(i, t.length), "0" == e.charAt(0) && (e = e.substr(1, e.length - 1)), e = Number(e), isNaN(e) && (e = 0), -1 != t.indexOf("M") && e--, e) : void 0
        }, t.formatDate = function(e, i, s) {
            s || (s = t);
            var a, n, o, r, h, l, d, c, u = t.getWeekNumber(e);
            t.useUTC ? (a = e.getUTCFullYear(), n = e.getUTCMonth(), o = e.getUTCDate(), r = e.getUTCDay(), h = e.getUTCHours(), l = e.getUTCMinutes(), d = e.getUTCSeconds(), c = e.getUTCMilliseconds()) : (a = e.getFullYear(), n = e.getMonth(), o = e.getDate(), r = e.getDay(), h = e.getHours(), l = e.getMinutes(), d = e.getSeconds(), c = e.getMilliseconds());
            var p = String(a).substr(2, 2),
                m = "0" + r;
            i = i.replace(/W/g, u), u = h, 24 == u && (u = 0);
            var f = u;
            10 > f && (f = "0" + f), i = i.replace(/JJ/g, f), i = i.replace(/J/g, u), f = h, 0 === f && (f = 24, -1 != i.indexOf("H") && (o--, 0 === o && (a = new Date(e), a.setDate(a.getDate() - 1), n = a.getMonth(), o = a.getDate(), a = a.getFullYear()))), e = n + 1, 9 > n && (e = "0" + e), u = o, 10 > o && (u = "0" + o);
            var g = f;
            return 10 > g && (g = "0" + g), i = i.replace(/HH/g, g), i = i.replace(/H/g, f), f = h, f > 11 && (f -= 12), g = f, 10 > g && (g = "0" + g), i = i.replace(/KK/g, g), i = i.replace(/K/g, f), f = h, 0 === f && (f = 12), f > 12 && (f -= 12), g = f, 10 > g && (g = "0" + g), i = i.replace(/LL/g, g), i = i.replace(/L/g, f), f = l, 10 > f && (f = "0" + f), i = i.replace(/NN/g, f), i = i.replace(/N/g, l), l = d, 10 > l && (l = "0" + l), i = i.replace(/SS/g, l), i = i.replace(/S/g, d), d = c, 10 > d && (d = "00" + d), 100 > d && (d = "0" + d), l = c, 10 > l && (l = "00" + l), i = i.replace(/QQQ/g, d), i = i.replace(/QQ/g, l), i = i.replace(/Q/g, c), i = 12 > h ? i.replace(/A/g, s.amString) : i.replace(/A/g, s.pmString), i = i.replace(/YYYY/g, "@IIII@"), i = i.replace(/YY/g, "@II@"), i = i.replace(/MMMM/g, "@XXXX@"), i = i.replace(/MMM/g, "@XXX@"), i = i.replace(/MM/g, "@XX@"), i = i.replace(/M/g, "@X@"), i = i.replace(/DD/g, "@RR@"), i = i.replace(/D/g, "@R@"), i = i.replace(/EEEE/g, "@PPPP@"), i = i.replace(/EEE/g, "@PPP@"), i = i.replace(/EE/g, "@PP@"), i = i.replace(/E/g, "@P@"), i = i.replace(/@IIII@/g, a), i = i.replace(/@II@/g, p), i = i.replace(/@XXXX@/g, s.monthNames[n]), i = i.replace(/@XXX@/g, s.shortMonthNames[n]), i = i.replace(/@XX@/g, e), i = i.replace(/@X@/g, n + 1), i = i.replace(/@RR@/g, u), i = i.replace(/@R@/g, o), i = i.replace(/@PPPP@/g, s.dayNames[r]), i = i.replace(/@PPP@/g, s.shortDayNames[r]), i = i.replace(/@PP@/g, m), i = i.replace(/@P@/g, r)
        }, t.changeDate = function(e, i, s, a, n) {
            if (t.useUTC) return t.changeUTCDate(e, i, s, a, n);
            var o = -1;
            switch (void 0 === a && (a = !0), void 0 === n && (n = !1), !0 === a && (o = 1), i) {
                case "YYYY":
                    e.setFullYear(e.getFullYear() + s * o), a || n || e.setDate(e.getDate() + 1);
                    break;
                case "MM":
                    i = e.getMonth(), e.setMonth(e.getMonth() + s * o), e.getMonth() > i + s * o && e.setDate(e.getDate() - 1), a || n || e.setDate(e.getDate() + 1);
                    break;
                case "DD":
                    e.setDate(e.getDate() + s * o);
                    break;
                case "WW":
                    e.setDate(e.getDate() + s * o * 7);
                    break;
                case "hh":
                    e.setHours(e.getHours() + s * o);
                    break;
                case "mm":
                    e.setMinutes(e.getMinutes() + s * o);
                    break;
                case "ss":
                    e.setSeconds(e.getSeconds() + s * o);
                    break;
                case "fff":
                    e.setMilliseconds(e.getMilliseconds() + s * o)
            }
            return e
        }, t.changeUTCDate = function(t, e, i, s, a) {
            var n = -1;
            switch (void 0 === s && (s = !0), void 0 === a && (a = !1), !0 === s && (n = 1), e) {
                case "YYYY":
                    t.setUTCFullYear(t.getUTCFullYear() + i * n), s || a || t.setUTCDate(t.getUTCDate() + 1);
                    break;
                case "MM":
                    e = t.getUTCMonth(), t.setUTCMonth(t.getUTCMonth() + i * n), t.getUTCMonth() > e + i * n && t.setUTCDate(t.getUTCDate() - 1), s || a || t.setUTCDate(t.getUTCDate() + 1);
                    break;
                case "DD":
                    t.setUTCDate(t.getUTCDate() + i * n);
                    break;
                case "WW":
                    t.setUTCDate(t.getUTCDate() + i * n * 7);
                    break;
                case "hh":
                    t.setUTCHours(t.getUTCHours() + i * n);
                    break;
                case "mm":
                    t.setUTCMinutes(t.getUTCMinutes() + i * n);
                    break;
                case "ss":
                    t.setUTCSeconds(t.getUTCSeconds() + i * n);
                    break;
                case "fff":
                    t.setUTCMilliseconds(t.getUTCMilliseconds() + i * n)
            }
            return t
        }
    }(),
    function() {
        var t = window.AmCharts;
        t.AmPieChart = t.Class({
            inherits: t.AmSlicedChart,
            construct: function(e) {
                this.type = "pie", t.AmPieChart.base.construct.call(this, e), this.cname = "AmPieChart", this.pieBrightnessStep = 30, this.minRadius = 10, this.depth3D = 0, this.startAngle = 90, this.angle = this.innerRadius = 0, this.startRadius = "500%", this.pullOutRadius = "20%", this.labelRadius = 20, this.labelText = "[[title]]: [[percents]]%", this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]", this.previousScale = 1, this.adjustPrecision = !1, t.applyTheme(this, e, this.cname)
            },
            drawChart: function() {
                t.AmPieChart.base.drawChart.call(this);
                var e = this.chartData;
                if (t.ifArray(e)) {
                    if (0 < this.realWidth && 0 < this.realHeight) {
                        t.VML && (this.startAlpha = 1);
                        var i = this.startDuration,
                            s = this.container,
                            a = this.updateWidth();
                        this.realWidth = a;
                        var n = this.updateHeight();
                        this.realHeight = n;
                        var o, r, h, l = t.toCoordinate,
                            d = l(this.marginLeft, a),
                            c = l(this.marginRight, a),
                            u = l(this.marginTop, n) + this.getTitleHeight(),
                            p = l(this.marginBottom, n),
                            m = t.toNumber(this.labelRadius),
                            f = this.measureMaxLabel();
                        for (f > this.maxLabelWidth && (f = this.maxLabelWidth), this.labelText && this.labelsEnabled || (m = f = 0), o = void 0 === this.pieX ? (a - d - c) / 2 + d : l(this.pieX, this.realWidth), r = void 0 === this.pieY ? (n - u - p) / 2 + u : l(this.pieY, n), h = l(this.radius, a, n), h || (a = m >= 0 ? a - d - c - 2 * f : a - d - c, n = n - u - p, h = Math.min(a, n), a > n && (h /= 1 - this.angle / 90, h > a && (h = a)), n = t.toCoordinate(this.pullOutRadius, h), h = (m >= 0 ? h - 1.8 * (m + n) : h - 1.8 * n) / 2), h < this.minRadius && (h = this.minRadius), n = l(this.pullOutRadius, h), u = t.toCoordinate(this.startRadius, h), l = l(this.innerRadius, h), l >= h && (l = h - 1), p = t.fitToBounds(this.startAngle, 0, 360), 0 < this.depth3D && (p = p >= 270 ? 270 : 90), p -= 90, p > 360 && (p -= 360), a = h - h * this.angle / 90, d = f = 0; d < e.length; d++) c = e[d], !0 !== c.hidden && (f += t.roundTo(c.percents, this.pf.precision));
                        f = t.roundTo(f, this.pf.precision), this.tempPrec = NaN, this.adjustPrecision && 100 != f && (this.tempPrec = this.pf.precision + 1);
                        for (var g, d = 0; d < e.length; d++)
                            if (c = e[d], !0 !== c.hidden && (this.showZeroSlices || 0 !== c.percents)) {
                                var v = 360 * c.percents / 100,
                                    f = Math.sin((p + v / 2) / 180 * Math.PI),
                                    b = a / h * -Math.cos((p + v / 2) / 180 * Math.PI),
                                    x = this.outlineColor;
                                x || (x = c.color);
                                var C = this.alpha;
                                if (isNaN(c.alpha) || (C = c.alpha), x = {
                                        fill: c.color,
                                        stroke: x,
                                        "stroke-width": this.outlineThickness,
                                        "stroke-opacity": this.outlineAlpha,
                                        "fill-opacity": C
                                    }, c.url && (x.cursor = "pointer"), x = t.wedge(s, o, r, p, v, h, a, l, this.depth3D, x, this.gradientRatio, c.pattern, this.path), t.setCN(this, x, "pie-item"), t.setCN(this, x.wedge, "pie-slice"), t.setCN(this, x, c.className, !0), this.addEventListeners(x, c), c.startAngle = p, e[d].wedge = x, i > 0 && (this.chartCreated || x.setAttr("opacity", this.startAlpha)), c.ix = f, c.iy = b, c.wedge = x, c.index = d, c.label = null, C = s.set(), this.labelsEnabled && this.labelText && c.percents >= this.hideLabelsPercent) {
                                    var y = p + v / 2;
                                    0 > y && (y += 360), y > 360 && (y -= 360);
                                    var N = m;
                                    isNaN(c.labelRadius) || (N = c.labelRadius, 0 > N && (c.skipTick = !0));
                                    var w, v = o + f * (h + N),
                                        S = r + b * (h + N),
                                        A = 0;
                                    if (isNaN(g) && y > 350 && 1 < e.length - d && (g = d - 1 + Math.floor((e.length - d) / 2)), N >= 0) {
                                        var M;
                                        90 >= y && y >= 0 ? (M = 0, w = "start", A = 8) : y >= 90 && 180 > y ? (M = 1, w = "start", A = 8) : y >= 180 && 270 > y ? (M = 2, w = "end", A = -8) : y >= 270 && 357 >= y ? (M = 3, w = "end", A = -8) : y >= 357 && (d > g ? (M = 0, w = "start", A = 8) : (M = 3, w = "end", A = -8)), c.labelQuarter = M
                                    } else w = "middle";
                                    y = this.formatString(this.labelText, c), (N = this.labelFunction) && (y = N(c, y)), N = c.labelColor, N || (N = this.color), "" !== y && (y = t.wrappedText(s, y, N, this.fontFamily, this.fontSize, w, !1, this.maxLabelWidth), t.setCN(this, y, "pie-label"), t.setCN(this, y, c.className, !0), y.translate(v + 1.5 * A, S), y.node.style.pointerEvents = "none", c.ty = S, c.textX = v + 1.5 * A, C.push(y), this.axesSet.push(C), c.labelSet = C, c.label = y), c.tx = v, c.tx2 = v + A, c.tx0 = o + f * h, c.ty0 = r + b * h
                                }
                                v = l + (h - l) / 2, c.pulled && (v += this.pullOutRadiusReal), c.balloonX = f * v + o, c.balloonY = b * v + r, c.startX = Math.round(f * u), c.startY = Math.round(b * u), c.pullX = Math.round(f * n), c.pullY = Math.round(b * n), this.graphsSet.push(x), (0 === c.alpha || i > 0 && !this.chartCreated) && (x.hide(), C && C.hide()), p += 360 * c.percents / 100, p > 360 && (p -= 360)
                            }
                        m > 0 && this.arrangeLabels(), this.pieXReal = o, this.pieYReal = r, this.radiusReal = h, this.innerRadiusReal = l, m > 0 && this.drawTicks(), this.initialStart(), this.setDepths()
                    }(e = this.legend) && e.invalidateSize()
                } else this.cleanChart();
                this.dispDUpd()
            },
            setDepths: function() {
                var t, e = this.chartData;
                for (t = 0; t < e.length; t++) {
                    var i = e[t],
                        s = i.wedge,
                        i = i.startAngle;
                    i >= 0 && 180 > i ? s.toFront() : i >= 180 && s.toBack()
                }
            },
            arrangeLabels: function() {
                var t, e, i = this.chartData,
                    s = i.length;
                for (e = s - 1; e >= 0; e--) t = i[e], 0 !== t.labelQuarter || t.hidden || this.checkOverlapping(e, t, 0, !0, 0);
                for (e = 0; s > e; e++) t = i[e], 1 != t.labelQuarter || t.hidden || this.checkOverlapping(e, t, 1, !1, 0);
                for (e = s - 1; e >= 0; e--) t = i[e], 2 != t.labelQuarter || t.hidden || this.checkOverlapping(e, t, 2, !0, 0);
                for (e = 0; s > e; e++) t = i[e], 3 != t.labelQuarter || t.hidden || this.checkOverlapping(e, t, 3, !1, 0)
            },
            checkOverlapping: function(t, e, i, s, a) {
                var n, o, r = this.chartData,
                    h = r.length,
                    l = e.label;
                if (l) {
                    if (!0 === s)
                        for (o = t + 1; h > o; o++) r[o].labelQuarter == i && (n = this.checkOverlappingReal(e, r[o], i)) && (o = h);
                    else
                        for (o = t - 1; o >= 0; o--) r[o].labelQuarter == i && (n = this.checkOverlappingReal(e, r[o], i)) && (o = 0);
                    !0 === n && 100 > a && isNaN(e.labelRadius) && (n = e.ty + 3 * e.iy, e.ty = n, l.translate(e.textX, n), this.checkOverlapping(t, e, i, s, a + 1))
                }
            },
            checkOverlappingReal: function(e, i, s) {
                var a = !1,
                    n = e.label,
                    o = i.label;
                return e.labelQuarter != s || e.hidden || i.hidden || !o || (n = n.getBBox(), s = {}, s.width = n.width, s.height = n.height, s.y = e.ty, s.x = e.tx, e = o.getBBox(), o = {}, o.width = e.width, o.height = e.height, o.y = i.ty, o.x = i.tx, t.hitTest(s, o) && (a = !0)), a
            }
        })
    }(),
	 $(document).ready(function() {


        //$(".last-transactions .title_panel").click(function() {
        //   $(".last-transactions .section-collapse").slideToggle(300);
        //$(".last-transactions .select-date").toggleClass('date-dn');
        //
        //});


        $(".banker-select, .set-select, .select-product-set").selectpicker();
        var scrollApi = $(".operarions__last_list, .chat__room_window, .setting-form, .textwrap, .news-posts__block, .details-modal .wrap, .news-txt").customScroll();

        $(".hidden-settings").on("show.bs.collapse", function() {
                $(".hidden-settings").collapse("hide")
                setTimeout(function() {
                    scrollApi.update();
                }, 300);
            }), $(".row-panel-hide").on("show.bs.collapse", function() {
                $(".row-panel-hide").collapse("hide")
            }), $(document).on({
                mouseenter: function() {
                    var t = $(this).position().left,
                        e = $(this).children("ul.navi.mymoney__menu_subnav").outerWidth();
                    $(this).addClass("active"), $(this).children("ul.navi.mymoney__menu_subnav").css({
                        left: t - e
                    }).stop(!0, !1).fadeIn(100)
                },
                mouseleave: function() {
                    $(this).children("ul.navi.mymoney__menu_subnav").stop(!0, !1).fadeOut(100), $(this).removeClass("active")
                }
            }, "ul.navi.mymoney__menu_nav > li.list"), $(document).on({
                mouseenter: function() {
                    $(this).parent("li.list").addClass("active")
                },
                mouseleave: function() {
                    $(this).parent("li.list").removeClass("active")
                }
            }, "ul.navi.mymoney__menu_subnav"), $(window).width() > 1140 && ($(document).on({
                mouseenter: function() {
                    $(this).children(".dashboard__subnav").stop(!0, !1).fadeIn(300)
                },
                mouseleave: function() {
                    $(this).children(".dashboard__subnav").stop(!0, !1).fadeOut(300)
                }
            }, ".navi.dashboard_nav > .list"), $(".dashboard_nav > .list .link").removeClass("click")), $(window).width() < 1141 && ($(document).off("mouseenter mouseleave", ".navi.dashboard_nav > .list"), $(".dashboard_nav > .list .link").not(".dashboard__subnav > .list .link").addClass("click"), $(".dashboard_nav > .list .click").not(".dashboard__subnav > .list .link").click(function(t) {
                t.preventDefault(), $(t.target).is(".active") ? ($(this).parent().children(".dashboard__subnav").slideUp(300), $(this).parent().parent().children(".list").children(".click").removeClass("active")) : ($(this).parent().children(".dashboard__subnav").slideUp(300), $(this).parent().parent().children(".list").children(".click").removeClass("active"), $(this).addClass("active"), $(".dashboard_nav > .list .click.active").parent().parent().children(".list").children(".dashboard__subnav").slideUp(300), $(this).parent().children(".dashboard__subnav").slideDown(300))
            }), $(".title_subnav").click(function() {
                $(this).parent().children(".link-wrap-hide").slideToggle(300)
            })), 
			$("body").on("click", function(t) {
                var e = $(t.target);
				e.is(".my-accounts .title_menu .link") && ($(".my-accounts .title_menu .link").removeClass(""), e.addClass("")),
				e.is(".date-set") && ($(".select-date ul.navi.date-nav li").removeClass("active"), e.parent("li.date").addClass("active")),
				e.is(".my-list__nav .link") && (e.parent().parent().children("li").removeClass("active"), e.parent("li").addClass("active")), 
				e.is(".toggler-btn") && $(".my-deposits").toggleClass("open"),
				e.is(".close-setting__form") && $("#settingsForm").fadeOut(300)
            }), 

			// работа меню по кнопке
			$(".sidebar-right__person_custom, .my-accounts .title_menu .btn-settings").click(function(){ 
				$("#settingsForm").fadeIn(300);
				$(".ui-overlay").fadeIn(300);
			})
			
			$(".toggle-btn-aside:not(.ui-open .toggle-btn-aside)").click(function() {
				$('.collapse-wrap').fadeToggle(100);
				$("body").addClass("ui-open");
				$(".ui-overlay").fadeToggle(300);
				$(".sidebar-right").animate({
						right:0
					})
	        }),
			$(".sidebar-right__person_mobile-back-button").click(function() {
				
				$(".ui-overlay").fadeToggle(300);
                $("body").toggleClass("ui-open");
				$(".sidebar-right").animate(200, {right:-217}, function(){
						$('.collapse-wrap').fadeToggle(100);
					});
				$("#settingsForm").fadeOut(300);
	        }),
			
			// сворачивание меню по оверлею
			$(".ui-overlay").click(function() {
				$(this).fadeToggle(300);
				$("#settingsForm").fadeOut(300);
				if ($("body").hasClass("ui-open")){
						$(".sidebar-right").animate({right:-217});
						$('.collapse-wrap').fadeToggle(300);
						 $("body").toggleClass("ui-open");
				}
            }),


	
	// хз что
            function() {
                var t = $(".block-graph");
                t.each(function() {
                    var t = $(this).find(".percent .smart-count").data("count");
                    $(this).find(".percent .smart-count").text(t), $(this).find(".smart-graph .paint-color").css("height", t + "%"), 0 > t && ($(this).addClass("color-danger").removeClass("color-sun color-tree"), $(this).find(".plus").text("")),
                        t >= 0 && 49 >= t && $(this).addClass("color-sun").removeClass("color-danger color-tree"), t >= 50 && $(this).addClass("color-tree").removeClass("color-sun color-danger"), t > 100 && $(this).find(".smart-graph .paint-color").css("height", "100%"), 0 == t && $(this).find(".plus").text("")
                })
            }();
        var t, e = [{
            wealth: "Shares",
            parts: 3e3
        }, {
            wealth: "Investments",
            parts: 6e3
        }, {
            wealth: "Pension",
            parts: 2e3
        }, {
            wealth: "Deposits",
            parts: 5e3
        }];
        AmCharts.ready(function() {
            t = new AmCharts.AmPieChart, t.color = "#ffffff", t.fontSize = 12, t.dataProvider = e, t.titleField = "wealth", t.valueField = "parts", t.sequencedAnimation = !0, t.startEffect = "elastic", t.innerRadius = "50%", t.startDuration = 1.3, t.labelRadius = 10, t.pullOutRadius = "15%", t.startRadius = "100%", t.labelText = "[[title]]<br> [[percents]]%", t.pieX = 150, t.piey = -50, t.depth3D = 10, t.angle = 15, t.write("donut")
        }), AmCharts.ready(function() {
            t = new AmCharts.AmPieChart, t.color = "#ffffff", t.fontSize = 12, t.dataProvider = e, t.titleField = "wealth", t.valueField = "parts", t.sequencedAnimation = !0, t.startEffect = "elastic", t.innerRadius = "50%", t.startDuration = 1.3, t.labelRadius = 10, t.pullOutRadius = "15%", t.startRadius = "100%", t.labelText = "[[title]]<br> [[percents]]%", t.pieX = 150, t.piey = -50, t.depth3D = 10, t.angle = 15, t.write("donut2")
        }), AmCharts.ready(function() {
            t = new AmCharts.AmPieChart, t.color = "#ffffff", t.fontSize = 12, t.dataProvider = e, t.titleField = "wealth", t.valueField = "parts", t.sequencedAnimation = !0, t.startEffect = "elastic", t.innerRadius = "50%", t.startDuration = 1.3, t.labelRadius = 10, t.pullOutRadius = "15%", t.startRadius = "100%", t.labelText = "[[title]]<br> [[percents]]%", t.pieX = 150, t.piey = -50, t.depth3D = 10, t.angle = 15, t.write("donut3")
        })
    });


jQuery(document).ready(function($) {
    jQuery(".setting-3 .porgress-title .left a").click(function(event) {
        jQuery(".sms-code-popup").show();
    });

    jQuery(".sms-code-popup .set-save").click(function(event) {
        jQuery(".sms-code-popup").hide();
        jQuery(".main_content_s3").hide();
        jQuery(".setting-3 .hidden-settings__inner").show();
    });


    jQuery(".setting-3 .thank-you-again a").click(function(event) {

        jQuery(".setting-3 .thank-you-wrap").hide();
        jQuery(".main_content_s3").show();

    });


    jQuery(".setting-6 .submit-input").click(function(event) {
        jQuery(".setting-6 > div").hide();
        jQuery(".setting-6 .hidden-settings__inner").show();

    });


    jQuery(".setting-6 .thank-you-again a").click(function(event) {
        jQuery(".setting-6 > div").show();
        jQuery(".setting-6 .hidden-settings__inner").hide();

    });

	if ( $(window).width() >= 768 ){
		$(".daily .news-block ").click(function(event) {
			$(".daily .news-block .section-collapse").slideToggle(300);
			$(this).toggleClass('open-slide');
		});
	}


    $(window).on("load", function() {
        $(window).width() >= 768 ? $(".slidetr").off("click") : ($("body").addClass("chat-close"), $(".slidetr").click(function() {

            if ($(this).hasClass('hide-header')) {
                $("body").toggleClass("chat-close");
                $('.section-collapse').slideUp(300);
            } else {
                $("body").addClass("chat-close");
                if ($(this).parents('.row-panel').children(".section-collapse").is(":visible")) {
                    $(this).parents('.row-panel').children(".section-collapse").slideUp(300);
					$(this).toggleClass('open-slide');
                } else {
                    $('.section-collapse').slideUp(300);
					$(".slidetr").removeClass('open-slide')
                    $(this).parents('.row-panel').children(".section-collapse").slideDown(300);
					$(this).toggleClass('open-slide');
                };
            }
        }))
    })
});