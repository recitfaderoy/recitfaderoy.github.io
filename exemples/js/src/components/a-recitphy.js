(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  module.exports={
    "name": "a-recit",
    "title": "A-RECIT",
    "version": "0.0.0",
    "description": "Education component game based for A-Frame",
    "homepage": "https://github.com/xx/README.md",
    "main": "index.js",
    "scripts": {
      "prepare": "npm run build",
      "clean": "rm arecit/*.js || del arecit\\*.js",
      "build": "npm run clean && foreach -g src/*.js -x \"browserify #{path} -o arecit/#{name}.js\" && npm run minify",
      "watch": "npm run clean && foreach -g src/*.js -C -x \"watchify #{path} -d -o arecit/#{name}.js\"",
      "minify": "foreach -g arecit/*.js -C -x \"minify #{path} > arecit/#{name}.min.js\"",
      "bump": "npm version minor --no-git-tag-version",
      "gitadd": "git add package*.json arecit/*.js"
    },
    "pre-commit": [
      "bump",
      "build",
      "gitadd"
    ],
    "keywords": [
      "aframe",
      "aframe-component",
      "webvr",
      "webxr",
      "gamedev"
    ],
    "author": "RECITFAD based on poeticAndroid work's",
    "license": "MIT",
    "devDependencies": {
      "browserify": "^17.0.0",
      "foreach-cli": "^1.8.1",
      "minify": "^7.0.2",
      "pre-commit": "^1.2.2",
      "watchify": "^4.0.0"
    }
  }
  
  },{}],2:[function(require,module,exports){
  
  require("./libs/pools")
  require("./libs/copyWorldPosRot")
  require("./libs/ensureElement")
  require("./libs/touchGestures")
  require("./libs/betterRaycaster")
  addEventListener('DOMContentLoaded', e => {
    document.body.addEventListener("swipeup", e => {
      document.body.requestFullscreen()
    })
  })
  
  
  require("./components/physics")
  
  const pkg = require("../package")
  console.log(`${pkg.title} Version ${pkg.version} by ${pkg.author}\n(${pkg.homepage})`)
  
  },{"../package":1,"./components/physics":3,"./libs/betterRaycaster":7,"./libs/copyWorldPosRot":9,"./libs/ensureElement":10,"./libs/pools":11,"./libs/touchGestures":12}],3:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  const cmd = require("../libs/cmdCodec")
  const pkg = require("../../package")
  
  
  AFRAME.registerSystem("physics", {
    schema: {
      workerUrl: { type: "string", default: `https://cdn.jsdelivr.net/npm/a-game@${pkg.version}/dist/cannonWorker.min.js` },
      gravity: { type: "vec3", default: { x: 0, y: -10, z: 0 } },
      debug: { type: "boolean", default: false }
    },
  
    update() {
      if (this.data.workerUrl) {
        if (!this.worker) {
          if (this.data.workerUrl.includes("//")) {
            let script = `importScripts(${JSON.stringify(this.data.workerUrl)})`
            this.worker = new Worker(`data:text/javascript;base64,${btoa(script)}`)
          } else {
            this.worker = new Worker(this.data.workerUrl)
          }
          this.worker.postMessage("log " + cmd.stringifyParam("Physics worker ready!"))
          this.worker.addEventListener("message", this.onMessage.bind(this))
        }
        this.bodies = this.bodies || []
        this.movingBodies = this.movingBodies || []
        this.joints = this.joints || []
        this.buffers = [new Float64Array(8), new Float64Array(8)]
        this.worker.postMessage("world gravity = " + cmd.stringifyParam(this.data.gravity))
        this._debug = this.data.debug
      } else {
        this.remove()
      }
    },
  
    remove() {
      this.worker && this.worker.terminate()
      this.worker = null
      this.bodies = []
      this.movingBodies = []
    },
  
    tick(time, timeDelta) {
      if (!this.worker) return
      if (this.buffers.length < 2) return
      let buffer = this.buffers.shift()
      if (buffer.length < 8 * this.movingBodies.length) {
        let len = buffer.length
        while (len < 8 * this.movingBodies.length) {
          len *= 2
        }
        let bods = this.movingBodies
        buffer = new Float64Array(len)
        buffer.fill(NaN)
        let vec = THREE.Vector3.temp()
        let quat = THREE.Quaternion.temp()
        for (let i = 0; i < bods.length; i++) {
          let p = i * 8
          if (bods[i]) {
            bods[i].object3D.localToWorld(vec.set(0, 0, 0))
            buffer[p++] = vec.x
            buffer[p++] = vec.y
            buffer[p++] = vec.z
            p++
            bods[i].object3D.getWorldQuaternion(quat)
            buffer[p++] = quat.x
            buffer[p++] = quat.y
            buffer[p++] = quat.z
            buffer[p++] = quat.w
          }
        }
      }
      this.worker.postMessage(buffer, [buffer.buffer])
    },
  
    onMessage(e) {
      if (typeof e.data === "string") {
        let command = cmd.parse(e.data)
        switch (command.shift()) {
          case "world":
            this.command(command)
            break
        }
      }
      else if (e.data instanceof Float64Array) {
        this.buffers.push(e.data)
        while (this.buffers.length > 2)
          this.buffers.shift()
      }
    },
  
    command(params) {
      if (typeof params[0] === "number") {
        params.shift()
      }
      switch (params.shift()) {
        case "body":
          let id = params.shift()
          let body = this.bodies[id]
          if (body)
            body.components.body.command(params)
          break
      }
    },
    eval(expr) {
      this.worker.postMessage("world eval " + cmd.stringifyParam(expr))
    }
  })
  
  require("./physics/body")
  require("./physics/shape")
  require("./physics/joint")
  
  },{"../../package":1,"../libs/cmdCodec":8,"./physics/body":4,"./physics/joint":5,"./physics/shape":6}],4:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  const cmd = require("../../libs/cmdCodec")
  
  AFRAME.registerComponent("body", {
    dependencies: ["position", "rotation", "scale"],
  
    schema: {
      type: { type: "string", default: "dynamic" },
      mass: { type: "number", default: 1 },
      friction: { type: "number", default: 0.3 },
      restitution: { type: "number", default: 0.3 },
      belongsTo: { type: "int", default: 1 },
      collidesWith: { type: "int", default: 1 },
      emitsWith: { type: "int", default: 0 },
      sleeping: { type: "boolean", default: false },
      autoShape: { type: "boolean", default: true },
    },
  
    init() {
      let worker = this.el.sceneEl.systems.physics.worker
      let bodies = this.el.sceneEl.systems.physics.bodies
      let movingBodies = this.el.sceneEl.systems.physics.movingBodies
      let buffer = this.el.sceneEl.systems.physics.buffers[0]
      if (!worker) return
      this.id = bodies.indexOf(null)
      if (this.id < 0) this.id = bodies.length
      bodies[this.id] = this.el
      if (this.data.type !== "static") {
        this.mid = movingBodies.indexOf(null)
        if (this.mid < 0) this.mid = movingBodies.length
        movingBodies[this.mid] = this.el
      } else {
        this.mid = null
      }
      let body = { mid: this.mid }
      body.type = this.data.type
      body.position = this.el.object3D.localToWorld(THREE.Vector3.temp().set(0, 0, 0))
      body.quaternion = this.el.object3D.getWorldQuaternion(THREE.Quaternion.temp())
      if (this.mid !== null) {
        let p = this.mid * 8
        buffer[p++] = body.position.x
        buffer[p++] = body.position.y
        buffer[p++] = body.position.z
        buffer[p++] = this.data.sleeping
        buffer[p++] = body.quaternion.x
        buffer[p++] = body.quaternion.y
        buffer[p++] = body.quaternion.z
        buffer[p++] = body.quaternion.w
      }
      this.shapes = []
      this.sleeping = true
      worker.postMessage("world body " + this.id + " create " + cmd.stringifyParam(body))
      // if (body.type === "static") 
      setTimeout(() => {
        body.position = this.el.object3D.localToWorld(THREE.Vector3.temp().set(0, 0, 0))
        body.quaternion = this.el.object3D.getWorldQuaternion(THREE.Quaternion.temp())
        worker.postMessage("world body " + this.id + " position = " + cmd.stringifyParam(body.position))
        worker.postMessage("world body " + this.id + " quaternion = " + cmd.stringifyParam(body.quaternion))
  
        if (this.el.components.shape) this.el.components.shape.play()
        let els = this.el.querySelectorAll("[shape]")
        if (els) els.forEach(el => {
          if (el.components.shape) el.components.shape.play()
        })
        if (this.el.components.joint) this.el.components.joint.play()
        for (let comp in this.el.components) {
          if (comp.substr(0, 7) === "joint__") this.el.components[comp].play()
        }
      })
  
      if (this.data.autoShape) {
        if (!this.el.components.shape) {
          if (this.el.firstElementChild) {
            let els = this.el.querySelectorAll("a-box, a-sphere, a-cylinder")
            if (els) els.forEach(el => {
              if (!el.components.shape) el.setAttribute("shape", true)
            })
          } else {
            this.el.setAttribute("shape", true)
          }
        }
      }
      this._initiated = true
    },
  
    play() {
      if (!this._initiated) {
        this.init()
        this.update({})
      }
    },
  
    update(oldData) {
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
      if (this.data.type !== oldData.type)
        worker.postMessage("world body " + this.id + " type = " + cmd.stringifyParam(this.data.type))
      if (this.data.mass !== oldData.mass)
        worker.postMessage("world body " + this.id + " mass = " + cmd.stringifyParam(this.data.mass))
      if (this.data.friction !== oldData.friction)
        worker.postMessage("world body " + this.id + " friction = " + cmd.stringifyParam(this.data.friction))
      if (this.data.restitution !== oldData.restitution)
        worker.postMessage("world body " + this.id + " restitution = " + cmd.stringifyParam(this.data.restitution))
      if (this.data.belongsTo !== oldData.belongsTo)
        worker.postMessage("world body " + this.id + " belongsTo = " + cmd.stringifyParam(this.data.belongsTo))
      if (this.data.collidesWith !== oldData.collidesWith)
        worker.postMessage("world body " + this.id + " collidesWith = " + cmd.stringifyParam(this.data.collidesWith))
      if (this.data.emitsWith !== oldData.emitsWith)
        worker.postMessage("world body " + this.id + " emitsWith = " + cmd.stringifyParam(this.data.emitsWith))
      // if (this.data.sleeping !== oldData.sleeping)
      setTimeout(() => {
        worker.postMessage("world body " + this.id + " sleeping = " + !!(this.data.sleeping))
      })
    },
  
    sleep() {
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
      worker.postMessage("world body " + this.id + " sleeping = true")
      this.sleeping = true
    },
  
    applyWorldImpulse(force, point) {
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
      worker.postMessage("world body " + this.id + " impulse " + cmd.stringifyParam(force) + " " + cmd.stringifyParam(point))
    },
    applyLocalImpulse(force, point) {
      let _point = this.el.object3D.localToWorld(THREE.Vector3.temp().copy(point))
      let _force = this.el.object3D.localToWorld(THREE.Vector3.temp().copy(force)).sub(this.el.object3D.localToWorld(THREE.Vector3.temp().set(0, 0, 0)))
      this.applyWorldImpulse(_force, _point)
    },
  
    pause() {
      let worker = this.el.sceneEl.systems.physics.worker
      let bodies = this.el.sceneEl.systems.physics.bodies
      let movingBodies = this.el.sceneEl.systems.physics.movingBodies
      if (!worker) return
  
      if (this.el.components.joint) this.el.components.joint.pause()
      for (let comp in this.el.components) {
        if (comp.substr(0, 7) === "joint__") this.el.components[comp].pause()
      }
      let els = this.el.querySelectorAll("[shape]")
      if (els) els.forEach(el => {
        if (el.components.shape) el.components.shape.pause()
      })
      if (this.el.components.shape) this.el.components.shape.pause()
  
      bodies[this.id] = null
      if (this.mid !== null)
        movingBodies[this.mid] = null
      worker.postMessage("world body " + this.id + " remove")
      this._initiated = false
    },
  
    tick() {
      let worker = this.el.sceneEl.systems.physics.worker
      let buffer = this.el.sceneEl.systems.physics.buffers[0]
      if (!worker) return
      if (this.mid !== null) {
        let p = this.mid * 8
        if (buffer.length <= p) return
        if (this.data.type === "kinematic") {
          let vec = this.el.object3D.localToWorld(THREE.Vector3.temp().set(0, 0, 0))
          buffer[p++] = vec.x
          buffer[p++] = vec.y
          buffer[p++] = vec.z
          this.sleeping = !!(buffer[p++])
          let quat = this.el.object3D.getWorldQuaternion(THREE.Quaternion.temp())
          buffer[p++] = quat.x
          buffer[p++] = quat.y
          buffer[p++] = quat.z
          buffer[p++] = quat.w
        } else if (buffer[p + 1]) {
          let quat = THREE.Quaternion.temp()
  
          this.el.object3D.position.set(buffer[p++], buffer[p++], buffer[p++])
          this.el.object3D.parent.worldToLocal(this.el.object3D.position)
          this.sleeping = !!(buffer[p++])
  
          this.el.object3D.getWorldQuaternion(quat)
          this.el.object3D.quaternion.multiply(quat.conjugate().normalize())
          quat.set(buffer[p++], buffer[p++], buffer[p++], buffer[p++])
          this.el.object3D.quaternion.multiply(quat.normalize())
        }
      }
    },
  
    command(params) {
      switch (params.shift()) {
        case "emits":
          let e = params.shift()
          switch (e.event) {
            case "collision":
              let bodies = this.el.sceneEl.systems.physics.bodies
              e.body1 = bodies[e.body1]
              e.body2 = bodies[e.body2]
              if (!e.body1 || !e.body2) return
              e.shape1 = e.body1.components.body.shapes[e.shape1]
              e.shape2 = e.body2.components.body.shapes[e.shape2]
              break
          }
          this.el.emit(e.event, e)
          break
      }
    },
    eval(expr) {
      let worker = this.el.sceneEl.systems.physics.worker
      worker.postMessage("world body " + this.id + " eval " + cmd.stringifyParam(expr))
    },
  
    commit() {
      let worker = this.el.sceneEl.systems.physics.worker
      let pos = THREE.Vector3.temp()
      let quat = THREE.Quaternion.temp()
      this.el.object3D.localToWorld(pos.set(0, 0, 0))
      worker.postMessage("world body " + this.id + " position " + cmd.stringifyParam(pos))
      this.el.object3D.getWorldQuaternion(quat)
      worker.postMessage("world body " + this.id + " quaternion " + cmd.stringifyParam(quat))
    }
  })
  
  
  },{"../../libs/cmdCodec":8}],5:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  const cmd = require("../../libs/cmdCodec")
  
  AFRAME.registerComponent("joint", {
    // dependencies: ["body", "shape"],
    multiple: true,
  
    schema: {
      type: { type: "string", default: "ball" },
      body1: { type: "selector" },
      body2: { type: "selector" },
      pivot1: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
      pivot2: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
      axis1: { type: "vec3", default: { x: 0, y: 1, z: 0 } },
      axis2: { type: "vec3", default: { x: 0, y: 1, z: 0 } },
      min: { type: "number", default: 0 },
      max: { type: "number", default: 1 },
      collision: { type: "boolean", default: true },
      // limit: { type: "array" },
      // motor: { type: "array" },
      // spring: { type: "array" },
    },
  
    play() {
      if (this._id != null) return
      let worker = this.el.sceneEl.systems.physics.worker
      let joints = this.el.sceneEl.systems.physics.joints
      if (!worker) return
      if (!this.data.body1.components.body) return this._retry = setTimeout(() => {
        this.play()
      }, 256)
      if (!this.data.body2.components.body) return this._retry = setTimeout(() => {
        this.play()
      }, 256)
      this._id = joints.indexOf(null)
      if (this._id < 0) this._id = joints.length
      joints[this._id] = this.el
  
      // setTimeout(() => {
      let joint = {}
      joint.type = this.data.type
      joint.body1 = this.data.body1 ? this.data.body1.components.body.id : this.el.components.body.id
      joint.body2 = this.data.body2.components.body.id
      joint.pivot1 = THREE.Vector3.temp().copy(this.data.pivot1)
      joint.pivot2 = THREE.Vector3.temp().copy(this.data.pivot2)
      joint.axis1 = this.data.axis1
      joint.axis2 = this.data.axis2
      joint.min = this.data.min
      joint.max = this.data.max
      joint.collision = this.data.collision
      let scale = this.el.object3D.getWorldScale(THREE.Vector3.temp())
      joint.pivot1.multiply(scale)
      joint.pivot2.multiply(scale)
      worker.postMessage("world joint " + this._id + " create " + cmd.stringifyParam(joint))
      // })
    },
  
    update(oldData) {
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
      this.data.body1 = this.data.body1 || this.el
      // if (this.data.type !== oldData.type)
      //   worker.postMessage("world joint " + this._id + " type = " + cmd.stringifyParam(this.data.type))
    },
  
    pause() {
      clearTimeout(this._retry)
      let worker = this.el.sceneEl.systems.physics.worker
      let joints = this.el.sceneEl.systems.physics.joints
      if (!worker) return
      joints[this._id] = null
      worker.postMessage("world joint " + this._id + " remove")
      this._id = null
    },
    eval(expr) {
      let worker = this.el.sceneEl.systems.physics.worker
      worker.postMessage("world joint " + this._id + " eval " + cmd.stringifyParam(expr))
    }
  
  })
  
  
  },{"../../libs/cmdCodec":8}],6:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  const cmd = require("../../libs/cmdCodec")
  
  AFRAME.registerComponent("shape", {
    // dependencies: ["body"],
    schema: {
    },
  
    play() {
      if (this.id != null) return
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
  
      this.body = this.el
      while (this.body && !this.body.matches("[body]")) this.body = this.body.parentElement
      if (!this.body) return this._retry = setTimeout(() => {
        this.play()
      }, 256)
      this.bodyId = this.body.components.body.id
  
      let shapes = this.body.components.body.shapes
      this.id = shapes.indexOf(null)
      if (this.id < 0) this.id = shapes.length
      shapes[this.id] = this.el
  
      let shape = {}
      shape.position = this.el.object3D.getWorldPosition(THREE.Vector3.temp())
      this.body.object3D.worldToLocal(shape.position)
      shape.quaternion = this.el.object3D.getWorldQuaternion(THREE.Quaternion.temp())
      let bodyquat = this.body.object3D.getWorldQuaternion(THREE.Quaternion.temp())
      shape.quaternion.multiply(bodyquat.conjugate().normalize()).normalize()
      shape.size = THREE.Vector3.temp().set(1, 1, 1)
  
      switch (this.el.tagName.toLowerCase()) {
        case "a-sphere":
          shape.type = "sphere"
          shape.size.multiplyScalar(this.el.components.geometry.data.radius * 2)
          break
        case "a-cylinder":
          shape.type = "cylinder"
          shape.size.multiplyScalar(this.el.components.geometry.data.radius * 2).y = this.el.components.geometry.data.height
          break
        case "a-box":
          shape.type = "box"
          shape.size.set(
            this.el.components.geometry.data.width,
            this.el.components.geometry.data.height,
            this.el.components.geometry.data.depth
          )
          break
        // case "a-plane":
        //   shape.type = "plane"
        //   break
      }
      let scale = this.el.object3D.getWorldScale(THREE.Vector3.temp())
      shape.size.multiply(scale)
      shape.position.multiply(scale)
  
      worker.postMessage("world body " + this.bodyId + " shape " + this.id + " create " + cmd.stringifyParam(shape))
    },
  
    pause() {
      clearTimeout(this._retry)
      if (!this.body) return
      let worker = this.el.sceneEl.systems.physics.worker
      if (!worker) return
      let shapes = this.body.components.body.shapes
      worker.postMessage("world body " + this.bodyId + " shape " + this.id + " remove")
      shapes[this.id] = null
      this.id = null
    },
  
    eval(expr) {
      let worker = this.el.sceneEl.systems.physics.worker
      worker.postMessage("world body " + this.bodyId + " shape " + this.id + " eval " + cmd.stringifyParam(expr))
    }
  })
  
  
  },{"../../libs/cmdCodec":8}],7:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  const _update = AFRAME.components.raycaster.Component.prototype.update
  const _refreshObjects = AFRAME.components.raycaster.Component.prototype.refreshObjects
  AFRAME.components.raycaster.schema.deep = AFRAME.components.raycaster.schema.showLine
  
  AFRAME.components.raycaster.Component.prototype.update = function (oldData) {
    if (this.data.deep && oldData.objects !== this.data.objects) {
      this._matchSelector = this.data.objects
      this.data.objects = deepMatch(this.data.objects)
    }
    return _update.apply(this, arguments)
  }
  
  AFRAME.components.raycaster.Component.prototype.refreshObjects = function () {
    let result = _refreshObjects.apply(this, arguments)
    if (this.data.deep) {
      let hits = this.intersections
      for (let hit of hits) {
        hit.el = hit.object.el
        while (hit.el && !hit.el.matches(this._matchSelector)) hit.el = hit.el.parentNode
      }
    }
    return result
  }
  
  
  function deepMatch(selector) {
    if (selector.indexOf("*") >= 0) return selector
    let deep = (selector + ", ").replaceAll(",", " *,")
    return deep + selector
  }
  },{}],8:[function(require,module,exports){
  module.exports = {
    parse(cmd) {
      let words = cmd.split(" ")
      let args = []
      for (let word of words) {
        if (word) {
          try {
            args.push(JSON.parse(word))
          } catch (error) {
            if (word !== "=")
              args.push(word)
          }
        }
      }
      return args
    },
    stringifyParam(val) {
      return JSON.stringify(val).replaceAll(" ", "\\u0020").replaceAll("\"_", "\"")
    }
  }
  },{}],9:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  AFRAME.AEntity.prototype.copyWorldPosRot = function (srcEl) {
    let quat = THREE.Quaternion.temp()
    let src = srcEl.object3D
    let dest = this.object3D
    if (!src) return
    if (!dest) return
    if (!dest.parent) return
    src.localToWorld(dest.position.set(0, 0, 0))
    dest.parent.worldToLocal(dest.position)
  
    dest.getWorldQuaternion(quat)
    dest.quaternion.multiply(quat.conjugate().normalize())
    src.getWorldQuaternion(quat)
    dest.quaternion.multiply(quat.normalize())
    dest.updateWorldMatrix(true, true)
  }
  },{}],10:[function(require,module,exports){
  Element.prototype.ensure = function (selector, name = selector, attrs = {}, innerHTML = "") {
    let _childEl, attr, val
    _childEl = this.querySelector(selector)
    if (!_childEl) {
      _childEl = document.createElement(name)
      this.appendChild(_childEl)
      for (attr in attrs) {
        val = attrs[attr]
        _childEl.setAttribute(attr, val)
      }
      _childEl.innerHTML = innerHTML
    }
    return _childEl
  }
  },{}],11:[function(require,module,exports){
  /* global AFRAME, THREE */
  
  function makePool(Class) {
    Class._pool = []
    Class._inUse = []
    Class.temp = function () {
      let v = Class._pool.pop() || new Class()
      Class._inUse.push(v)
      if (!Class._gc)
        Class._gc = setTimeout(Class._recycle)
      return v
    }
    Class._recycle = function () {
      while (Class._inUse.length)
        Class._pool.push(Class._inUse.pop())
      Class._gc = false
    }
  }
  
  makePool(THREE.Vector2)
  makePool(THREE.Vector3)
  makePool(THREE.Quaternion)
  makePool(THREE.Matrix3)
  makePool(THREE.Matrix4)
  
  },{}],12:[function(require,module,exports){
  let _addEventListener = Element.prototype.addEventListener
  let _removeEventListener = Element.prototype.removeEventListener
  let init = el => {
    if (el._tgest) return el._tgest
    el._tgest = {
      handlers: {
        swipeup: [],
        swipedown: [],
        swipeleft: [],
        swiperight: [],
        tap: [],
        hold: []
      }
    }
    let cx, cy, to, held
    let emit = (type, e) => {
      if (el._tgest.handlers[type]) {
        for (let handler of el._tgest.handlers[type]) {
          handler(e)
        }
      } else console.log(type, el._tgest.handlers[type])
    }
    el.addEventListener("touchstart", e => {
      cx = e.changedTouches[0].screenX
      cy = e.changedTouches[0].screenY
      held = false
      to = setTimeout(() => {
        held = true
        emit("hold", e)
      }, 512)
    })
    el.addEventListener("touchmove", e => {
      let x = e.changedTouches[0].screenX,
        y = e.changedTouches[0].screenY,
        l = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2))
      if (l > 32) {
        clearTimeout(to)
        if (held) return
        if (Math.abs(cx - x) > Math.abs(cy - y)) {
          if (x < cx) emit("swipeleft", e)
          else emit("swiperight", e)
        } else {
          if (y < cy) emit("swipeup", e)
          else emit("swipedown", e)
        }
        held = true
      }
    })
    el.addEventListener("touchend", e => {
      clearTimeout(to)
      let x = e.changedTouches[0].screenX,
        y = e.changedTouches[0].screenY,
        l = Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2))
      if (l < 32) {
        if (held) return
        emit("tap", e)
      }
    })
  
    return el._tgest
  }
  Element.prototype.addEventListener = function (eventtype, handler) {
    switch (eventtype) {
      case "swipeup":
      case "swipedown":
      case "swipeleft":
      case "swiperight":
      case "tap":
      case "hold":
        let tg = init(this)
        tg.handlers[eventtype].push(handler)
        break
      default:
        return _addEventListener.call(this, eventtype, handler)
    }
  }
  Element.prototype.removeEventListener = function (eventtype, handler) {
    switch (eventtype) {
      case "swipeup":
      case "swipedown":
      case "swipeleft":
      case "swiperight":
      case "tap":
      case "hold":
        let tg = init(this)
        let i = tg.handlers[eventtype].indexOf(handler)
        if (i >= 0) tg.handlers[eventtype].splice(i, 1)
        break
      default:
        return _removeEventListener.call(this, eventtype, handler)
    }
  }
  
  },{}]},{},[2]);
  