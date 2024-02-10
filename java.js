var AWN;
(() => {
    var e = {
            628: (e, t, s) => {
                "use strict";
                s.d(t, {
                    default: () => m
                });
                const i = {
                    maxNotifications: 10,
                    animationDuration: 300,
                    position: "middle-center",
                    labels: {
                        tip: "Tip",
                        info: "执行中……",
                        success: "执行成功",
                        warning: "Attention",
                        alert: "Error",
                        async: "Loading",
                        confirm: "Confirmation required",
                        confirmOk: "OK",
                        confirmCancel: "Cancel"
                    },
                    icons: {
                        tip: "question-circle",
                        info: "info-circle",
                        success: "check-circle",
                        warning: "exclamation-circle",
                        alert: "exclamation-triangle",
                        async: "cog fa-spin",
                        confirm: "exclamation-triangle",
                        prefix: "<i class='fa fas fa-fw fa-",
                        suffix: "'></i>",
                        enabled: !0
                    },
                    replacements: {
                        tip: null,
                        info: null,
                        success: null,
                        warning: null,
                        alert: null,
                        async: null,
                        "async-block": null,
                        modal: null,
                        confirm: null,
                        general: {
                            "<script>": "",
                            "<\/script>": ""
                        }
                    },
                    messages: {
                        tip: "",
                        info: "",
                        success: "Action has been succeeded",
                        warning: "",
                        alert: "Action has been failed",
                        confirm: "This action can't be undone. Continue?",
                        async: "Please, wait...",
                        "async-block": "Loading"
                    },
                    formatError(e) {
                        if (e.response) {
                            if (!e.response.data) return "500 API Server Error";
                            if (e.response.data.errors) return e.response.data.errors.map((e => e.detail)).join("<br>");
                            if (e.response.statusText) return `${e.response.status} ${e.response.statusText}: ${e.response.data}`
                        }
                        return e.message ? e.message : e
                    },
                    durations: {
                        global: 5e3,
                        success: null,
                        info: null,
                        tip: null,
                        warning: null,
                        alert: null
                    },
                    minDurations: {
                        async: 1e3,
                        "async-block": 1e3
                    }
                };
                class n {
                    constructor(e = {}, t = i) {
                        Object.assign(this, this.defaultsDeep(t, e))
                    }
                    icon(e) {
                        return this.icons.enabled ? `${this.icons.prefix}${this.icons[e]}${this.icons.suffix}` : ""
                    }
                    label(e) {
                        return this.labels[e]
                    }
                    duration(e) {
                        let t = this.durations[e];
                        return null === t ? this.durations.global : t
                    }
                    toSecs(e) {
                        return e / 1e3 + "s"
                    }
                    applyReplacements(e, t) {
                        if (!e) return this.messages[t] || "";
                        for (const s of ["general", t])
                            if (this.replacements[s])
                                for (const t in this.replacements[s]) e = e.replace(t, this.replacements[s][t]);
                        return e
                    }
                    override(e) {
                        return e ? new n(e, this) : this
                    }
                    defaultsDeep(e, t) {
                        let s = {};
                        for (const i in e) t.hasOwnProperty(i) ? s[i] = "object" == typeof e[i] && null !== e[i] ? this.defaultsDeep(e[i], t[i]) : t[i] : s[i] = e[i];
                        return s
                    }
                }
                const r = "awn-popup",
                    a = "awn-toast",
                    o = "awn-btn",
                    l = "awn-confirm",
                    c = {
                        prefix: a,
                        klass: {
                            label: `${a}-label`,
                            content: `${a}-content`,
                            icon: `${a}-icon`,
                            progressBar: `${a}-progress-bar`,
                            progressBarPause: `${a}-progress-bar-paused`
                        },
                        ids: {
                            container: `${a}-container`
                        }
                    },
                    d = {
                        prefix: r,
                        klass: {
                            buttons: "awn-buttons",
                            button: o,
                            successBtn: `${o}-success`,
                            cancelBtn: `${o}-cancel`,
                            title: `${r}-title`,
                            body: `${r}-body`,
                            content: `${r}-content`,
                            dotAnimation: `${r}-loading-dots`
                        },
                        ids: {
                            wrapper: `${r}-wrapper`,
                            confirmOk: `${l}-ok`,
                            confirmCancel: `${l}-cancel`
                        }
                    },
                    h = {
                        hiding: "awn-hiding"
                    },
                    u = class {
                        constructor(e, t, s, i, n) {
                            this.newNode = document.createElement("div"), t && (this.newNode.id = t), s && (this.newNode.className = s), i && (this.newNode.style.cssText = i), this.parent = e, this.options = n
                        }
                        beforeInsert() {}
                        afterInsert() {}
                        insert() {
                            return this.beforeInsert(), this.el = this.parent.appendChild(this.newNode), this.afterInsert(), this
                        }
                        replace(e) {
                            if (this.getElement()) return this.beforeDelete().then((() => (this.updateType(e.type), this.parent.replaceChild(e.newNode, this.el), this.el = this.getElement(e.newNode), this.afterInsert(), this)))
                        }
                        beforeDelete(e = this.el) {
                            let t = 0;
                            return this.start && (t = this.options.minDurations[this.type] + this.start - Date.now(), t < 0 && (t = 0)), new Promise((s => {
                                setTimeout((() => {
                                    e.classList.add(h.hiding), setTimeout(s, this.options.animationDuration)
                                }), t)
                            }))
                        }
                        delete(e = this.el) {
                            return this.getElement(e) ? this.beforeDelete(e).then((() => {
                                e.remove(), this.afterDelete()
                            })) : null
                        }
                        afterDelete() {}
                        getElement(e = this.el) {
                            return e ? document.getElementById(e.id) : null
                        }
                        addEvent(e, t) {
                            this.el.addEventListener(e, t)
                        }
                        toggleClass(e) {
                            this.el.classList.toggle(e)
                        }
                        updateType(e) {
                            this.type = e, this.duration = this.options.duration(this.type)
                        }
                    },
                    p = class extends u {
                        constructor(e, t, s, i) {
                            super(i, `${c.prefix}-${Math.floor(Date.now()-100*Math.random())}`, `${c.prefix} ${c.prefix}-${t}`, `animation-duration: ${s.toSecs(s.animationDuration)};`, s), this.updateType(t), this.setInnerHtml(e)
                        }
                        setInnerHtml(e) {
                            "alert" === this.type && e && (e = this.options.formatError(e)), e = this.options.applyReplacements(e, this.type), this.newNode.innerHTML = `<div class="awn-toast-wrapper">${this.progressBar}${this.label}<div class="${c.klass.content}">${e}</div><span class="${c.klass.icon}">${this.options.icon(this.type)}</span></div>`
                        }
                        beforeInsert() {
                            if (this.parent.childElementCount >= this.options.maxNotifications) {
                                let e = Array.from(this.parent.getElementsByClassName(c.prefix));
                                this.delete(e.find((e => !this.isDeleted(e))))
                            }
                        }
                        afterInsert() {
                            if ("async" == this.type) return this.start = Date.now();
                            if (this.addEvent("click", (() => this.delete())), !(this.duration <= 0)) {
                                this.timer = new class {
                                    constructor(e, t) {
                                        this.callback = e, this.remaining = t, this.resume()
                                    }
                                    pause() {
                                        this.paused = !0, window.clearTimeout(this.timerId), this.remaining -= new Date - this.start
                                    }
                                    resume() {
                                        this.paused = !1, this.start = new Date, window.clearTimeout(this.timerId), this.timerId = window.setTimeout((() => {
                                            window.clearTimeout(this.timerId), this.callback()
                                        }), this.remaining)
                                    }
                                    toggle() {
                                        this.paused ? this.resume() : this.pause()
                                    }
                                }((() => this.delete()), this.duration);
                                for (const e of ["mouseenter", "mouseleave"]) this.addEvent(e, (() => {
                                    this.isDeleted() || (this.toggleClass(c.klass.progressBarPause), this.timer.toggle())
                                }))
                            }
                        }
                        isDeleted(e = this.el) {
                            return e.classList.contains(h.hiding)
                        }
                        get progressBar() {
                            return this.duration <= 0 || "async" === this.type ? "" : `<div class='${c.klass.progressBar}' style="animation-duration:${this.options.toSecs(this.duration)};"></div>`
                        }
                        get label() {
                            return `<b class="${c.klass.label}">${this.options.label(this.type)}</b>`
                        }
                    },
                    f = class extends u {
                        constructor(e, t = "modal", s, i, n) {
                            let r = `animation-duration: ${s.toSecs(s.animationDuration)};`;
                            super(document.body, d.ids.wrapper, null, r, s), this[d.ids.confirmOk] = i, this[d.ids.confirmCancel] = n, this.className = `${d.prefix}-${t}`, ["confirm", "async-block", "modal"].includes(t) || (t = "modal"), this.updateType(t), this.setInnerHtml(e), this.insert()
                        }
                        setInnerHtml(e) {
                            let t = this.options.applyReplacements(e, this.type);
                            switch (this.type) {
                                case "confirm":
                                    let e = [`<button class='${d.klass.button} ${d.klass.successBtn}'id='${d.ids.confirmOk}'>${this.options.labels.confirmOk}</button>`];
                                    !1 !== this[d.ids.confirmCancel] && e.push(`<button class='${d.klass.button} ${d.klass.cancelBtn}'id='${d.ids.confirmCancel}'>${this.options.labels.confirmCancel}</button>`), t = `${this.options.icon(this.type)}<div class='${d.klass.title}'>${this.options.label(this.type)}</div><div class="${d.klass.content}">${t}</div><div class='${d.klass.buttons} ${d.klass.buttons}-${e.length}'>${e.join("")}</div>`;
                                    break;
                                case "async-block":
                                    t = `${t}<div class="${d.klass.dotAnimation}"></div>`
                            }
                            this.newNode.innerHTML = `<div class="${d.klass.body} ${this.className}">${t}</div>`
                        }
                        keyupListener(e) {
                            if ("async-block" === this.type) return e.preventDefault();
                            switch (e.code) {
                                case "Escape":
                                    e.preventDefault(), this.delete();
                                case "Tab":
                                    if (e.preventDefault(), "confirm" !== this.type || !1 === this[d.ids.confirmCancel]) return !0;
                                    let t = this.okBtn;
                                    e.shiftKey ? document.activeElement.id == d.ids.confirmOk && (t = this.cancelBtn) : document.activeElement.id !== d.ids.confirmCancel && (t = this.cancelBtn), t.focus()
                            }
                        }
                        afterInsert() {
                            switch (this.listener = e => this.keyupListener(e), window.addEventListener("keydown", this.listener), this.type) {
                                case "async-block":
                                    this.start = Date.now();
                                    break;
                                case "confirm":
                                    this.okBtn.focus(), this.addEvent("click", (e => {
                                        if ("BUTTON" !== e.target.nodeName) return !1;
                                        this.delete(), this[e.target.id] && this[e.target.id]()
                                    }));
                                    break;
                                default:
                                    document.activeElement.blur(), this.addEvent("click", (e => {
                                        e.target.id === this.newNode.id && this.delete()
                                    }))
                            }
                        }
                        afterDelete() {
                            window.removeEventListener("keydown", this.listener)
                        }
                        get okBtn() {
                            return document.getElementById(d.ids.confirmOk)
                        }
                        get cancelBtn() {
                            return document.getElementById(d.ids.confirmCancel)
                        }
                    };
                class m {
                    constructor(e = {}) {
                        this.options = new n(e)
                    }
                    tip(e, t) {
                        return this._addToast(e, "tip", t).el
                    }
                    info(e, t) {
                        return this._addToast(e, "info", t).el
                    }
                    success(e, t) {
                        return this._addToast(e, "success", t).el
                    }
                    warning(e, t) {
                        return this._addToast(e, "warning", t).el
                    }
                    alert(e, t) {
                        return this._addToast(e, "alert", t).el
                    }
                    async (e, t, s, i, n) {
                        let r = this._addToast(i, "async", n);
                        return this._afterAsync(e, t, s, n, r)
                    }
                    confirm(e, t, s, i) {
                        return this._addPopup(e, "confirm", i, t, s)
                    }
                    asyncBlock(e, t, s, i, n) {
                        let r = this._addPopup(i, "async-block", n);
                        return this._afterAsync(e, t, s, n, r)
                    }
                    modal(e, t, s) {
                        return this._addPopup(e, t, s)
                    }
                    closeToasts() {
                        let e = this.container;
                        for (; e.firstChild;) e.removeChild(e.firstChild)
                    }
                    _addPopup(e, t, s, i, n) {
                        return new f(e, t, this.options.override(s), i, n)
                    }
                    _addToast(e, t, s, i) {
                        s = this.options.override(s);
                        let n = new p(e, t, s, this.container);
                        return i ? i instanceof f ? i.delete().then((() => n.insert())) : i.replace(n) : n.insert()
                    }
                    _afterAsync(e, t, s, i, n) {
                        return e.then(this._responseHandler(t, "success", i, n), this._responseHandler(s, "alert", i, n))
                    }
                    _responseHandler(e, t, s, i) {
                        return n => {
                            switch (typeof e) {
                                case "undefined":
                                case "string":
                                    let r = "alert" === t ? e || n : e;
                                    this._addToast(r, t, s, i);
                                    break;
                                default:
                                    i.delete().then((() => {
                                        e && e(n)
                                    }))
                            }
                        }
                    }
                    _createContainer() {
                        return new u(document.body, c.ids.container, `awn-${this.options.position}`).insert().el
                    }
                    get container() {
                        return document.getElementById(c.ids.container) || this._createContainer()
                    }
                }
            },
            612: (e, t, s) => {
                e.exports = s(628).default
            }
        },
        t = {};

    function s(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var r = t[i] = {
            exports: {}
        };
        return e[i](r, r.exports, s), r.exports
    }
    s.d = (e, t) => {
        for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var i = s(612);
    AWN = i
})();
