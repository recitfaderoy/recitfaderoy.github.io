/* global AFRAME, THREE */

AFRAME.registerComponent("plancher", {
  schema: {
    physics: { type: "boolean", default: true }
  },

  update() {
    this.el.setAttribute("wall", this.data)
  }
})
