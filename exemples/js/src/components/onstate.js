/* global AFRAME, THREE */

AFRAME.registerComponent("onstate", {
  multiple: true,
  schema: {
    state: { type: "string" },
    entity: { type: "selector" },
    property: { type: "string" },
    on: { type: "string" },
    off: { type: "string" },
  },

  init() {
    this.trigger = this.trigger.bind(this)
  },

  update(oldData) {
    this._state = this.data.state || this.id || ""
    this._entity = this.data.entity || this.el
    this._property = this.data.property || ""
    this._on = this.data.on || ""
    this._off = this.data.off || ""
  },

  play() {
    this.trigger()
    this.el.addEventListener("stateadded", this.trigger)
    this.el.addEventListener("stateremoved", this.trigger)
  },

  pause() {
    this.el.removeEventListener("stateadded", this.trigger)
    this.el.removeEventListener("stateremoved", this.trigger)
  },

  trigger(e) {
    if (e && e.detail !== this._state) return
    let args = this._property.split(".")
    args.push(this.el.is(this._state) ? this._on : this._off)
    this._entity.setAttribute(...args)
  }
})
