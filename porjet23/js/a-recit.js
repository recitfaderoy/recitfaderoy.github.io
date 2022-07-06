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

require("./components/aframe-state-component")
require("./states/states")
require("./components/htmlembed")
require("./components/aframe-orbit-controls-component")
require("./components/classeroomdeskchair")
require("./components/grabbing")
require("./components/include")
require("./components/scienceslab/injectglasses")
require("./components/arealight")
require("./components/injectfluo")
require("./components/recitpreloader")
require("./components/injectglove")
require("./components/injectplayer")
require("./components/scienceslab/injectbeaker")

require("./components/scienceslab/injecttesttube")
require("./components/scienceslab/injecterlenmeyer")
require("./components/scienceslab/injectcylindergraduate")
require("./components/limit")
require("./components/locomotion")
require("./components/onevent")
require("./components/onstate")
require("./components/aframe-state-component")
require("./components/physics")
require("./components/script")
require("./components/trigger")
require("./components/aframe-websurfaces.umd")
require("./primitives/a-glasses")
require("./primitives/a-fluorescent")
require("./primitives/a-beaker")
require("./primitives/a-testtube")
require("./primitives/a-cylindergraduate")
require("./primitives/a-erlenmeyer")
require("./primitives/a-glove")
require("./primitives/a-hand")
require("./primitives/a-main")
require("./primitives/a-player")
require("./primitives/a-laboratory")
require("./systems/laboratory")

const pkg = require("../package")
console.log(`${pkg.title} Version ${pkg.version} by ${pkg.author}\n(${pkg.homepage})`)

},{"../package":1,"./components/aframe-orbit-controls-component":3,"./components/aframe-state-component":4,"./components/aframe-websurfaces.umd":5,"./components/arealight":6,"./components/classeroomdeskchair":7,"./components/grabbing":8,"./components/htmlembed":15,"./components/include":16,"./components/injectfluo":17,"./components/injectglove":18,"./components/injectplayer":19,"./components/limit":20,"./components/locomotion":21,"./components/onevent":25,"./components/onstate":26,"./components/physics":27,"./components/recitpreloader":31,"./components/scienceslab/injectbeaker":32,"./components/scienceslab/injectcylindergraduate":33,"./components/scienceslab/injecterlenmeyer":34,"./components/scienceslab/injectglasses":35,"./components/scienceslab/injecttesttube":36,"./components/script":37,"./components/trigger":38,"./libs/betterRaycaster":39,"./libs/copyWorldPosRot":41,"./libs/ensureElement":42,"./libs/pools":43,"./libs/touchGestures":44,"./primitives/a-beaker":45,"./primitives/a-cylindergraduate":46,"./primitives/a-erlenmeyer":47,"./primitives/a-fluorescent":48,"./primitives/a-glasses":49,"./primitives/a-glove":50,"./primitives/a-hand":51,"./primitives/a-laboratory":52,"./primitives/a-main":53,"./primitives/a-player":54,"./primitives/a-testtube":55,"./states/states":56,"./systems/laboratory":57}],3:[function(require,module,exports){
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/* global AFRAME THREE */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	var radToDeg = THREE.Math.radToDeg;

	/**
	 * Example component for A-Frame.
	 */
	AFRAME.registerComponent('orbit-controls', {
	  dependencies: ['position', 'rotation'],
	  schema: {
	    enabled: {
	      default: true
	    },
	    target: {
	      default: ''
	    },
	    distance: {
	      default: 1
	    },
	    enableRotate: {
	      default: true
	    },
	    rotateSpeed: {
	      default: 1.0
	    },
	    enableZoom: {
	      default: true
	    },
	    zoomSpeed: {
	      default: 1.0
	    },
	    enablePan: {
	      default: true
	    },
	    keyPanSpeed: {
	      default: 7.0
	    },
	    enableDamping: {
	      default: false
	    },
	    dampingFactor: {
	      default: 0.25
	    },
	    autoRotate: {
	      default: false
	    },
	    autoRotateSpeed: {
	      default: 2.0
	    },
	    enableKeys: {
	      default: true
	    },
	    minAzimuthAngle: {
	      default: -Infinity
	    },
	    maxAzimuthAngle: {
	      default: Infinity
	    },
	    minPolarAngle: {
	      default: 0
	    },
	    maxPolarAngle: {
	      default: Math.PI
	    },
	    minZoom: {
	      default: 0
	    },
	    maxZoom: {
	      default: Infinity
	    },
	    invertZoom: {
	      default: false
	    },
	    minDistance: {
	      default: 0
	    },
	    maxDistance: {
	      default: Infinity
	    },
	    rotateTo: {
	      type: 'vec3',
	      default: {x: 0, y: 0, z: 0}
	    },
	    rotateToSpeed: {
	      type: 'number',
	      default: 0.05
	    },
	    logPosition: {
	      type: 'boolean',
	      default: false
	    },
	    autoVRLookCam: {
	      type: 'boolean',
	      default: true
	    }
	  },

	  /**
	   * Set if component needs multiple instancing.
	   */
	  multiple: false,

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {
	    this.sceneEl = this.el.sceneEl;
	    this.object = this.el.object3D;
	    this.target = this.sceneEl.querySelector(this.data.target).object3D.position;

	    console.log('enabled: ', this.data.enabled);

	    // Find the look-controls component on this camera, or create if it doesn't exist.
	    this.isRunning = false;
	    this.lookControls = null;

	    if (this.data.autoVRLookCam) {
	      if (this.el.components['look-controls']) {
	        this.lookControls = this.el.components['look-controls'];
	      } else {
	        this.el.setAttribute('look-controls', '');
	        this.lookControls = this.el.components['look-controls'];
	      }
	      this.lookControls.pause();
	      this.el.sceneEl.addEventListener('enter-vr', this.onEnterVR.bind(this), false);
	      this.el.sceneEl.addEventListener('exit-vr', this.onExitVR.bind(this), false);
	    }

	    this.dolly = new THREE.Object3D();
	    this.dolly.position.copy(this.object.position);

	    this.savedPose = null;

	    this.STATE = {
	      NONE: -1,
	      ROTATE: 0,
	      DOLLY: 1,
	      PAN: 2,
	      TOUCH_ROTATE: 3,
	      TOUCH_DOLLY: 4,
	      TOUCH_PAN: 5,
	      ROTATE_TO: 6
	    };

	    this.state = this.STATE.NONE;

	    this.EPS = 0.000001;
	    this.lastPosition = new THREE.Vector3();
	    this.lastQuaternion = new THREE.Quaternion();

	    this.spherical = new THREE.Spherical();
	    this.sphericalDelta = new THREE.Spherical();

	    this.scale = 1.0;
	    this.zoomChanged = false;

	    this.rotateStart = new THREE.Vector2();
	    this.rotateEnd = new THREE.Vector2();
	    this.rotateDelta = new THREE.Vector2();

	    this.panStart = new THREE.Vector2();
	    this.panEnd = new THREE.Vector2();
	    this.panDelta = new THREE.Vector2();
	    this.panOffset = new THREE.Vector3();

	    this.dollyStart = new THREE.Vector2();
	    this.dollyEnd = new THREE.Vector2();
	    this.dollyDelta = new THREE.Vector2();

	    this.vector = new THREE.Vector3();
	    this.desiredPosition = new THREE.Vector3();

	    this.mouseButtons = {
	      ORBIT: THREE.MOUSE.LEFT,
	      ZOOM: THREE.MOUSE.MIDDLE,
	      PAN: THREE.MOUSE.RIGHT
	    };

	    this.keys = {
	      LEFT: 37,
	      UP: 38,
	      RIGHT: 39,
	      BOTTOM: 40
	    };

	    this.bindMethods();
	  },

	  /**
	   * Called when component is attached and when component data changes.
	   * Generally modifies the entity based on the data.
	   */
	  update: function (oldData) {
	    console.log('component update');

	    if (this.data.rotateTo) {
	      var rotateToVec3 = new THREE.Vector3(this.data.rotateTo.x, this.data.rotateTo.y, this.data.rotateTo.z);
	      // Check if rotateToVec3 is already desiredPosition
	      if (!this.desiredPosition.equals(rotateToVec3)) {
	        this.desiredPosition.copy(rotateToVec3);
	        this.rotateTo(this.desiredPosition);
	      }
	    }

	    this.dolly.position.copy(this.object.position);
	    this.updateView(true);
	  },

	  /**
	   * Called when a component is removed (e.g., via removeAttribute).
	   * Generally undoes all modifications to the entity.
	   */
	  remove: function () {
	    // console.log("component remove");
	    this.isRunning = false;
	    this.removeEventListeners();
	    this.el.sceneEl.removeEventListener('enter-vr', this.onEnterVR, false);
	    this.el.sceneEl.removeEventListener('exit-vr', this.onExitVR, false);
	  },

	  /**
	   * Called on each scene tick.
	   */
	  tick: function (t) {
	    var render = this.data.enabled && this.isRunning ? this.updateView() : false;
	    if (render === true && this.data.logPosition === true) {
	      console.log(this.el.object3D.position);
	    }
	  },

	  /*
	   * Called when entering VR mode
	  */
	  onEnterVR: function (event) {
	    // console.log('enter vr', this);

	    this.saveCameraPose();

	    this.el.setAttribute('position', {x: 0, y: 2, z: 5});
	    this.el.setAttribute('rotation', {x: 0, y: 0, z: 0});

	    this.pause();
	    this.lookControls.play();
	    if (this.data.autoRotate) console.warn('orbit-controls: Sorry, autoRotate is not implemented in VR mode');
	  },

	  /*
	   * Called when exiting VR mode
	  */
	  onExitVR: function (event) {
	    // console.log('exit vr');

	    this.lookControls.pause();
	    this.play();

	    this.restoreCameraPose();
	    this.updateView(true);
	  },

	  /**
	   * Called when entity pauses.
	   * Use to stop or remove any dynamic or background behavior such as events.
	   */
	  pause: function () {
	    // console.log("component pause");
	    this.isRunning  = false;
	    this.removeEventListeners();
	  },

	  /**
	   * Called when entity resumes.
	   * Use to continue or add any dynamic or background behavior such as events.
	   */
	  play: function () {
	    // console.log("component play");
	    this.isRunning = true;

	    var camera, cameraType;
	    this.object.traverse(function (child) {
	      if (child instanceof THREE.PerspectiveCamera) {
	        camera = child;
	        cameraType = 'PerspectiveCamera';
	      } else if (child instanceof THREE.OrthographicCamera) {
	        camera = child;
	        cameraType = 'OrthographicCamera';
	      }
	    });

	    this.camera = camera;
	    this.cameraType = cameraType;

	    this.sceneEl.addEventListener('renderstart', this.onRenderTargetLoaded, false);

	    if (this.lookControls) this.lookControls.pause();
	    if (this.canvasEl) this.addEventListeners();
	  },

	  /*
	   * Called when Render Target is completely loaded
	   * Then set canvasEl and add event listeners
	   */
	  onRenderTargetLoaded: function () {
	    this.sceneEl.removeEventListener('renderstart', this.onRenderTargetLoaded, false);
	    this.canvasEl = this.sceneEl.canvas;
	    this.addEventListeners();
	  },

	  /*
	   * Bind this to all event handlera
	   */
	  bindMethods: function () {
	    this.onRenderTargetLoaded = this.onRenderTargetLoaded.bind(this);

	    this.onContextMenu = this.onContextMenu.bind(this);
	    this.onMouseDown = this.onMouseDown.bind(this);
	    this.onMouseWheel = this.onMouseWheel.bind(this);
	    this.onMouseMove = this.onMouseMove.bind(this);
	    this.onMouseUp = this.onMouseUp.bind(this);
	    this.onTouchStart = this.onTouchStart.bind(this);
	    this.onTouchMove = this.onTouchMove.bind(this);
	    this.onTouchEnd = this.onTouchEnd.bind(this);
	    this.onKeyDown = this.onKeyDown.bind(this);
	  },

	  /*
	   * Add event listeners
	   */
	  addEventListeners: function () {
	    this.canvasEl.addEventListener('contextmenu', this.onContextMenu, false);

	    this.canvasEl.addEventListener('mousedown', this.onMouseDown, false);
	    this.canvasEl.addEventListener('mousewheel', this.onMouseWheel, false);
	    this.canvasEl.addEventListener('MozMousePixelScroll', this.onMouseWheel, false); // firefox

	    this.canvasEl.addEventListener('touchstart', this.onTouchStart, false);
	    this.canvasEl.addEventListener('touchend', this.onTouchEnd, false);
	    this.canvasEl.addEventListener('touchmove', this.onTouchMove, false);

	    window.addEventListener('keydown', this.onKeyDown, false);
	  },

	  /*
	   * Remove event listeners
	   */
	  removeEventListeners: function () {

	    if(this.canvasEl){
	        this.canvasEl.removeEventListener('contextmenu', this.onContextMenu, false);
	        this.canvasEl.removeEventListener('mousedown', this.onMouseDown, false);
	        this.canvasEl.removeEventListener('mousewheel', this.onMouseWheel, false);
	        this.canvasEl.removeEventListener('MozMousePixelScroll', this.onMouseWheel, false); // firefox

	        this.canvasEl.removeEventListener('touchstart', this.onTouchStart, false);
	        this.canvasEl.removeEventListener('touchend', this.onTouchEnd, false);
	        this.canvasEl.removeEventListener('touchmove', this.onTouchMove, false);

	        this.canvasEl.removeEventListener('mousemove', this.onMouseMove, false);
	        this.canvasEl.removeEventListener('mouseup', this.onMouseUp, false);
	        this.canvasEl.removeEventListener('mouseout', this.onMouseUp, false);
	    }

	    window.removeEventListener('keydown', this.onKeyDown, false);
	  },

	  /*
	   * EVENT LISTENERS
	   */

	  /*
	   * Called when right clicking the A-Frame component
	   */

	  onContextMenu: function (event) {
	    event.preventDefault();
	  },

	  /*
	   * MOUSE CLICK EVENT LISTENERS
	   */

	  onMouseDown: function (event) {
	    // console.log('onMouseDown');

	    if (!this.data.enabled || !this.isRunning) return;

	    if (event.button === this.mouseButtons.ORBIT && (event.shiftKey || event.ctrlKey)) {
	      if (this.data.enablePan === false) return;
	      this.handleMouseDownPan(event);
	      this.state = this.STATE.PAN;
	    } else if (event.button === this.mouseButtons.ORBIT) {
	      this.panOffset.set(0, 0, 0);
	      if (this.data.enableRotate === false) return;
	      this.handleMouseDownRotate(event);
	      this.state = this.STATE.ROTATE;
	    } else if (event.button === this.mouseButtons.ZOOM) {
	      this.panOffset.set(0, 0, 0);
	      if (this.data.enableZoom === false) return;
	      this.handleMouseDownDolly(event);
	      this.state = this.STATE.DOLLY;
	    } else if (event.button === this.mouseButtons.PAN) {
	      if (this.data.enablePan === false) return;
	      this.handleMouseDownPan(event);
	      this.state = this.STATE.PAN;
	    }

	    if (this.state !== this.STATE.NONE) {
	      this.canvasEl.addEventListener('mousemove', this.onMouseMove, false);
	      this.canvasEl.addEventListener('mouseup', this.onMouseUp, false);
	      this.canvasEl.addEventListener('mouseout', this.onMouseUp, false);

	      this.el.emit('start-drag-orbit-controls', null, false);
	    }
	  },

	  onMouseMove: function (event) {
	    // console.log('onMouseMove');

	    if (!this.data.enabled || !this.isRunning) return;

	    event.preventDefault();

	    if (this.state === this.STATE.ROTATE) {
	      if (this.data.enableRotate === false) return;
	      this.handleMouseMoveRotate(event);
	    } else if (this.state === this.STATE.DOLLY) {
	      if (this.data.enableZoom === false) return;
	      this.handleMouseMoveDolly(event);
	    } else if (this.state === this.STATE.PAN) {
	      if (this.data.enablePan === false) return;
	      this.handleMouseMovePan(event);
	    }
	  },

	  onMouseUp: function (event) {
	    // console.log('onMouseUp');

	    if (!this.data.enabled || !this.isRunning) return;

	    if (this.state === this.STATE.ROTATE_TO) return;

	    event.preventDefault();
	    event.stopPropagation();

	    this.handleMouseUp(event);

	    this.canvasEl.removeEventListener('mousemove', this.onMouseMove, false);
	    this.canvasEl.removeEventListener('mouseup', this.onMouseUp, false);
	    this.canvasEl.removeEventListener('mouseout', this.onMouseUp, false);

	    this.state = this.STATE.NONE;

	    this.el.emit('end-drag-orbit-controls', null, false);
	  },

	  /*
	   * MOUSE WHEEL EVENT LISTENERS
	   */

	  onMouseWheel: function (event) {
	    // console.log('onMouseWheel');

	    if (!this.data.enabled || !this.isRunning || this.data.enableZoom === false || (this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE)) return;

	    event.preventDefault();
	    event.stopPropagation();
	    this.handleMouseWheel(event);
	  },

	  /*
	   * TOUCH EVENT LISTENERS
	   */

	  onTouchStart: function (event) {
	    // console.log('onTouchStart');

	    if (!this.data.enabled || !this.isRunning) return;

	    switch (event.touches.length) {
	      case 1: // one-fingered touch: rotate
	        if (this.data.enableRotate === false) return;
	        this.handleTouchStartRotate(event);
	        this.state = this.STATE.TOUCH_ROTATE;
	        break;
	      case 2: // two-fingered touch: dolly
	        if (this.data.enableZoom === false) return;
	        this.handleTouchStartDolly(event);
	        this.state = this.STATE.TOUCH_DOLLY;
	        break;
	      case 3: // three-fingered touch: pan
	        if (this.data.enablePan === false) return;
	        this.handleTouchStartPan(event);
	        this.state = this.STATE.TOUCH_PAN;
	        break;
	      default:
	        this.state = this.STATE.NONE;
	    }

	    if (this.state !== this.STATE.NONE) {
	      this.el.emit('start-drag-orbit-controls', null, false);
	    }
	  },

	  onTouchMove: function (event) {
	    // console.log('onTouchMove');

	    if (!this.data.enabled || !this.isRunning) return;

	    event.preventDefault();
	    event.stopPropagation();

	    switch (event.touches.length) {
	      case 1: // one-fingered touch: rotate
	        if (this.enableRotate === false) return;
	        if (this.state !== this.STATE.TOUCH_ROTATE) return; // is this needed?...
	        this.handleTouchMoveRotate(event);
	        break;

	      case 2: // two-fingered touch: dolly
	        if (this.data.enableZoom === false) return;
	        if (this.state !== this.STATE.TOUCH_DOLLY) return; // is this needed?...
	        this.handleTouchMoveDolly(event);
	        break;

	      case 3: // three-fingered touch: pan
	        if (this.data.enablePan === false) return;
	        if (this.state !== this.STATE.TOUCH_PAN) return; // is this needed?...
	        this.handleTouchMovePan(event);
	        break;

	      default:
	        this.state = this.STATE.NONE;
	    }
	  },

	  onTouchEnd: function (event) {
	    // console.log('onTouchEnd');

	    if (!this.data.enabled || !this.isRunning) return;

	    this.handleTouchEnd(event);

	    this.el.emit('end-drag-orbit-controls', null, false);

	    this.state = this.STATE.NONE;
	  },

	  /*
	   * KEYBOARD EVENT LISTENERS
	   */

	  onKeyDown: function (event) {
	    // console.log('onKeyDown');

	    if (!this.data.enabled || !this.isRunning || this.data.enableKeys === false || this.data.enablePan === false) return;

	    this.handleKeyDown(event);
	  },

	  /*
	   * EVENT HANDLERS
	   */

	  /*
	   * MOUSE CLICK EVENT HANDLERS
	   */

	  handleMouseDownRotate: function (event) {
	    // console.log( 'handleMouseDownRotate' );
	    this.rotateStart.set(event.clientX, event.clientY);
	  },

	  handleMouseDownDolly: function (event) {
	    // console.log( 'handleMouseDownDolly' );
	    this.dollyStart.set(event.clientX, event.clientY);
	  },

	  handleMouseDownPan: function (event) {
	    // console.log( 'handleMouseDownPan' );
	    this.panStart.set(event.clientX, event.clientY);
	  },

	  handleMouseMoveRotate: function (event) {
	    // console.log( 'handleMouseMoveRotate' );

	    this.rotateEnd.set(event.clientX, event.clientY);
	    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);

	    var canvas = this.canvasEl === document ? this.canvasEl.body : this.canvasEl;

	    // rotating across whole screen goes 360 degrees around
	    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / canvas.clientWidth * this.data.rotateSpeed);

	    // rotating up and down along whole screen attempts to go 360, but limited to 180
	    this.rotateUp(2 * Math.PI * this.rotateDelta.y / canvas.clientHeight * this.data.rotateSpeed);

	    this.rotateStart.copy(this.rotateEnd);

	    this.updateView();
	  },

	  handleMouseMoveDolly: function (event) {
	    // console.log( 'handleMouseMoveDolly' );

	    this.dollyEnd.set(event.clientX, event.clientY);
	    this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);

	    if (this.dollyDelta.y > 0) {
	      !this.data.invertZoom ? this.dollyIn(this.getZoomScale()) : this.dollyOut(this.getZoomScale());
	    } else if (this.dollyDelta.y < 0) {
	      !this.data.invertZoom ? this.dollyOut(this.getZoomScale()) : this.dollyIn(this.getZoomScale());
	    }

	    this.dollyStart.copy(this.dollyEnd);

	    this.updateView();
	  },

	  handleMouseMovePan: function (event) {
	    // console.log( 'handleMouseMovePan' );

	    this.panEnd.set(event.clientX, event.clientY);
	    this.panDelta.subVectors(this.panEnd, this.panStart);
	    this.pan(this.panDelta.x, this.panDelta.y);
	    this.panStart.copy(this.panEnd);

	    this.updateView();
	  },

	  handleMouseUp: function (event) {
	    // console.log( 'handleMouseUp' );
	  },

	  /*
	   * MOUSE WHEEL EVENT HANDLERS
	   */

	  handleMouseWheel: function (event) {
	    // console.log( 'handleMouseWheel' );

	    var delta = 0;
	    if (event.wheelDelta !== undefined) {
	      // WebKit / Opera / Explorer 9
	      delta = event.wheelDelta;
	    } else if (event.detail !== undefined) {
	      // Firefox
	      delta = -event.detail;
	    }

	    if (delta > 0) {
	      !this.data.invertZoom ? this.dollyOut(this.getZoomScale()) : this.dollyIn(this.getZoomScale());
	    } else if (delta < 0) {
	      !this.data.invertZoom ? this.dollyIn(this.getZoomScale()) : this.dollyOut(this.getZoomScale());
	    }

	    this.updateView();
	  },

	  /*
	   * TOUCH EVENT HANDLERS
	   */

	  handleTouchStartRotate: function (event) {
	    // console.log( 'handleTouchStartRotate' );

	    this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
	  },

	  handleTouchStartDolly: function (event) {
	    // console.log( 'handleTouchStartDolly' );

	    var dx = event.touches[0].pageX - event.touches[1].pageX;
	    var dy = event.touches[0].pageY - event.touches[1].pageY;
	    var distance = Math.sqrt(dx * dx + dy * dy);
	    this.dollyStart.set(0, distance);
	  },

	  handleTouchStartPan: function (event) {
	    // console.log( 'handleTouchStartPan' );

	    this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
	  },

	  handleTouchMoveRotate: function (event) {
	    // console.log( 'handleTouchMoveRotate' );

	    this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
	    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);

	    var canvas = this.canvasEl === document ? this.canvasEl.body : this.canvasEl;
	    // rotating across whole screen goes 360 degrees around
	    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / canvas.clientWidth * this.data.rotateSpeed);
	    // rotating up and down along whole screen attempts to go 360, but limited to 180
	    this.rotateUp(2 * Math.PI * this.rotateDelta.y / canvas.clientHeight * this.data.rotateSpeed);
	    this.rotateStart.copy(this.rotateEnd);
	    this.updateView();
	  },

	  handleTouchMoveDolly: function (event) {
	    // console.log( 'handleTouchMoveDolly' );

	    var dx = event.touches[0].pageX - event.touches[1].pageX;
	    var dy = event.touches[0].pageY - event.touches[1].pageY;

	    var distance = Math.sqrt(dx * dx + dy * dy);

	    this.dollyEnd.set(0, distance);
	    this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
	    if (this.dollyDelta.y > 0) {
	      this.dollyIn(this.getZoomScale());
	    } else if (this.dollyDelta.y < 0) {
	      this.dollyOut(this.getZoomScale());
	    }

	    this.dollyStart.copy(this.dollyEnd);
	    this.updateView();
	  },

	  handleTouchMovePan: function (event) {
	    // console.log( 'handleTouchMovePan' );

	    this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
	    this.panDelta.subVectors(this.panEnd, this.panStart);
	    this.pan(this.panDelta.x, this.panDelta.y);
	    this.panStart.copy(this.panEnd);
	    this.updateView();
	  },

	  handleTouchEnd: function (event) {
	    // console.log( 'handleTouchEnd' );
	  },

	  /*
	   * KEYBOARD EVENT HANDLERS
	   */

	  handleKeyDown: function (event) {
	    // console.log( 'handleKeyDown' );

	    switch (event.keyCode) {
	      case this.keys.UP:
	        this.pan(0, this.data.keyPanSpeed);
	        this.updateView();
	        break;
	      case this.keys.BOTTOM:
	        this.pan(0, -this.data.keyPanSpeed);
	        this.updateView();
	        break;
	      case this.keys.LEFT:
	        this.pan(this.data.keyPanSpeed, 0);
	        this.updateView();
	        break;
	      case this.keys.RIGHT:
	        this.pan(-this.data.keyPanSpeed, 0);
	        this.updateView();
	        break;
	    }
	  },

	  /*
	   * HELPER FUNCTIONS
	   */

	  getAutoRotationAngle: function () {
	    return 2 * Math.PI / 60 / 60 * this.data.autoRotateSpeed;
	  },

	  getZoomScale: function () {
	    return Math.pow(0.95, this.data.zoomSpeed);
	  },

	  rotateLeft: function (angle) {
	    this.sphericalDelta.theta -= angle;
	  },

	  rotateUp: function (angle) {
	    this.sphericalDelta.phi -= angle;
	  },

	  rotateTo: function (vec3) {
	    this.state = this.STATE.ROTATE_TO;
	    this.desiredPosition.copy(vec3);
	  },

	  panHorizontally: function (distance, objectMatrix) {
	    // console.log('pan horizontally', distance, objectMatrix);
	    var v = new THREE.Vector3();
	    v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
	    v.multiplyScalar(-distance);
	    this.panOffset.add(v);
	  },

	  panVertically: function (distance, objectMatrix) {
	    // console.log('pan vertically', distance, objectMatrix);
	    var v = new THREE.Vector3();
	    v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
	    v.multiplyScalar(distance);
	    this.panOffset.add(v);
	  },

	  pan: function (deltaX, deltaY) { // deltaX and deltaY are in pixels; right and down are positive
	    // console.log('panning', deltaX, deltaY );
	    var offset = new THREE.Vector3();
	    var canvas = this.canvasEl === document ? this.canvasEl.body : this.canvasEl;

	    if (this.cameraType === 'PerspectiveCamera') {
	      // perspective
	      var position = this.dolly.position;
	      offset.copy(position).sub(this.target);
	      var targetDistance = offset.length();
	      targetDistance *= Math.tan((this.camera.fov / 2) * Math.PI / 180.0); // half of the fov is center to top of screen
	      this.panHorizontally(2 * deltaX * targetDistance / canvas.clientHeight, this.object.matrix); // we actually don't use screenWidth, since perspective camera is fixed to screen height
	      this.panVertically(2 * deltaY * targetDistance / canvas.clientHeight, this.object.matrix);
	    } else if (this.cameraType === 'OrthographicCamera') {
	      // orthographic
	      this.panHorizontally(deltaX * (this.dolly.right - this.dolly.left) / this.camera.zoom / canvas.clientWidth, this.object.matrix);
	      this.panVertically(deltaY * (this.dolly.top - this.dolly.bottom) / this.camera.zoom / canvas.clientHeight, this.object.matrix);
	    } else {
	      // camera neither orthographic nor perspective
	      console.warn('Trying to pan: WARNING: Orbit Controls encountered an unknown camera type - pan disabled.');
	      this.data.enablePan = false;
	    }
	  },

	  dollyIn: function (dollyScale) {
	    // console.log( "dollyIn camera" );
	    if (this.cameraType === 'PerspectiveCamera') {
	      this.scale *= dollyScale;
	    } else if (this.cameraType === 'OrthographicCamera') {
	      this.camera.zoom = Math.max(this.data.minZoom, Math.min(this.data.maxZoom, this.camera.zoom * dollyScale));
	      this.camera.updateProjectionMatrix();
	      this.zoomChanged = true;
	    } else {
	      console.warn('Trying to dolly in: WARNING: Orbit Controls encountered an unknown camera type - dolly/zoom disabled.');
	      this.data.enableZoom = false;
	    }
	  },

	  dollyOut: function (dollyScale) {
	    // console.log( "dollyOut camera" );
	    if (this.cameraType === 'PerspectiveCamera') {
	      this.scale /= dollyScale;
	    } else if (this.cameraType === 'OrthographicCamera') {
	      this.camera.zoom = Math.max(this.data.minZoom, Math.min(this.data.maxZoom, this.camera.zoom / dollyScale));
	      this.camera.updateProjectionMatrix();
	      this.zoomChanged = true;
	    } else {
	      console.warn('Trying to dolly out: WARNING: Orbit Controls encountered an unknown camera type - dolly/zoom disabled.');
	      this.data.enableZoom = false;
	    }
	  },

	  lookAtTarget: function (object, target) {
	    var v = new THREE.Vector3();
	    v.subVectors(object.position, target).add(object.position);
	    object.lookAt(v);
	  },

	  /*
	   * SAVES CAMERA POSE (WHEN ENTERING VR)
	   */

	  saveCameraPose: function () {
	    if (this.savedPose) { return; }
	    this.savedPose = {
	      position: this.dolly.position,
	      rotation: this.dolly.rotation
	    };
	  },

	  /*
	   * RESTORE CAMERA POSE (WHEN EXITING VR)
	   */

	  restoreCameraPose: function () {
	    if (!this.savedPose) { return; }
	    this.dolly.position.copy(this.savedPose.position);
	    this.dolly.rotation.copy(this.savedPose.rotation);
	    this.savedPose = null;
	  },

	  /*
	   * VIEW UPDATE
	   */

	  updateView: function (forceUpdate) {
	    if (this.desiredPosition && this.state === this.STATE.ROTATE_TO) {
	      var desiredSpherical = new THREE.Spherical();
	      desiredSpherical.setFromVector3(this.desiredPosition);
	      var phiDiff = desiredSpherical.phi - this.spherical.phi;
	      var thetaDiff = desiredSpherical.theta - this.spherical.theta;
	      this.sphericalDelta.set(this.spherical.radius, phiDiff * this.data.rotateToSpeed, thetaDiff * this.data.rotateToSpeed);
	    }

	    var offset = new THREE.Vector3();

	    var quat = new THREE.Quaternion().setFromUnitVectors(this.dolly.up, new THREE.Vector3(0, 1, 0)); // so camera.up is the orbit axis
	    var quatInverse = quat.clone().inverse();

	    offset.copy(this.dolly.position).sub(this.target);
	    offset.applyQuaternion(quat); // rotate offset to "y-axis-is-up" space
	    this.spherical.setFromVector3(offset); // angle from z-axis around y-axis

	    if (this.data.autoRotate && this.state === this.STATE.NONE) this.rotateLeft(this.getAutoRotationAngle());

	    this.spherical.theta += this.sphericalDelta.theta;
	    this.spherical.phi += this.sphericalDelta.phi;
	    this.spherical.theta = Math.max(this.data.minAzimuthAngle, Math.min(this.data.maxAzimuthAngle, this.spherical.theta)); // restrict theta to be inside desired limits
	    this.spherical.phi = Math.max(this.data.minPolarAngle, Math.min(this.data.maxPolarAngle, this.spherical.phi)); // restrict phi to be inside desired limits
	    this.spherical.makeSafe();
	    this.spherical.radius *= this.scale;
	    this.spherical.radius = Math.max(this.data.minDistance, Math.min(this.data.maxDistance, this.spherical.radius)); // restrict radius to be inside desired limits

	    this.target.add(this.panOffset); // move target to panned location

	    offset.setFromSpherical(this.spherical);
	    offset.applyQuaternion(quatInverse); // rotate offset back to "camera-up-vector-is-up" space

	    this.dolly.position.copy(this.target).add(offset);

	    if (this.target) {
	      this.lookAtTarget(this.dolly, this.target);
	    }

	    if (this.data.enableDamping === true) {
	      this.sphericalDelta.theta *= (1 - this.data.dampingFactor);
	      this.sphericalDelta.phi *= (1 - this.data.dampingFactor);
	    } else {
	      this.sphericalDelta.set(0, 0, 0);
	    }

	    this.scale = 1;
	    this.panOffset.set(0, 0, 0);

	    // update condition is:
	    // min(camera displacement, camera rotation in radians)^2 > EPS
	    // using small-angle approximation cos(x/2) = 1 - x^2 / 8

	    if (forceUpdate === true ||
	      this.zoomChanged ||
	      this.lastPosition.distanceToSquared(this.dolly.position) > this.EPS ||
	      8 * (1 - this.lastQuaternion.dot(this.dolly.quaternion)) > this.EPS) {
	      // this.el.emit('change-drag-orbit-controls', null, false);

	      var hmdQuaternion = this.calculateHMDQuaternion();
	      var hmdEuler = new THREE.Euler();
	      hmdEuler.setFromQuaternion(hmdQuaternion, 'YXZ');

	      this.el.setAttribute('position', {
	        x: this.dolly.position.x,
	        y: this.dolly.position.y,
	        z: this.dolly.position.z
	      });

	      this.el.setAttribute('rotation', {
	        x: radToDeg(hmdEuler.x),
	        y: radToDeg(hmdEuler.y),
	        z: radToDeg(hmdEuler.z)
	      });

	      this.lastPosition.copy(this.dolly.position);
	      this.lastQuaternion.copy(this.dolly.quaternion);

	      this.zoomChanged = false;

	      return true;
	    }

	    return false;
	  },

	  calculateHMDQuaternion: (function () {
	    var hmdQuaternion = new THREE.Quaternion();
	    return function () {
	      hmdQuaternion.copy(this.dolly.quaternion);
	      return hmdQuaternion;
	    };
	  })()

	});


/***/ })
/******/ ]);
},{}],4:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Pre-compiled functions.
var selectFunctions = {};

/**
 * Select value from store. Handles boolean operations, calls `selectProperty`.
 *
 * @param {object} state - State object.
 * @param {string} selector - Dot-delimited store keys (e.g., game.player.health).
 * @param {object} item - From bind-item.
 */
function select(state, selector, item) {
  if (!selectFunctions[selector]) {
    selectFunctions[selector] = new Function('state', 'item', 'return ' + generateExpression(selector) + ';');
  }
  return selectFunctions[selector](state, item);
}
module.exports.select = select;

var DOT_NOTATION_RE = /\.([A-Za-z][\w_-]*)/g;
var WHITESPACE_RE = /\s/g;
var STATE_SELECTOR_RE = /([=&|!?:+-])(\s*)([\(]?)([A-Za-z][\w_-]*)/g;
var ROOT_STATE_SELECTOR_RE = /^([\(]?)([A-Za-z][\w_-]*)/g;
var ITEM_RE = /state\["item"\]/g;
var BOOLEAN_RE = /state\["(true|false)"\]/g;
var STATE_STR = 'state';
function generateExpression(str) {
  str = str.replace(DOT_NOTATION_RE, '["$1"]');
  str = str.replace(ROOT_STATE_SELECTOR_RE, '$1state["$2"]');
  str = str.replace(STATE_SELECTOR_RE, '$1$2$3state["$4"]');
  str = str.replace(ITEM_RE, 'item');
  str = str.replace(BOOLEAN_RE, '$1');
  return str;
}
module.exports.generateExpression = generateExpression;

function clearObject(obj) {
  for (var key in obj) {
    delete obj[key];
  }
}
module.exports.clearObject = clearObject;

/**
 * Helper to compose object of handlers, merging functions handling same action.
 */
function composeHandlers() {
  var actionName;
  var i;
  var inputHandlers = arguments;
  var outputHandlers;

  outputHandlers = {};
  for (i = 0; i < inputHandlers.length; i++) {
    for (actionName in inputHandlers[i]) {
      if (actionName in outputHandlers) {
        // Initial compose/merge functions into arrays.
        if (outputHandlers[actionName].constructor === Array) {
          outputHandlers[actionName].push(inputHandlers[i][actionName]);
        } else {
          outputHandlers[actionName] = [outputHandlers[actionName], inputHandlers[i][actionName]];
        }
      } else {
        outputHandlers[actionName] = inputHandlers[i][actionName];
      }
    }
  }

  // Compose functions specified via array.
  for (actionName in outputHandlers) {
    if (outputHandlers[actionName].constructor === Array) {
      outputHandlers[actionName] = composeFunctions.apply(this, outputHandlers[actionName]);
    }
  }

  return outputHandlers;
}
module.exports.composeHandlers = composeHandlers;

function composeFunctions() {
  var functions = arguments;
  return function () {
    var i;
    for (i = 0; i < functions.length; i++) {
      functions[i].apply(this, arguments);
    }
  };
}
module.exports.composeFunctions = composeFunctions;

var NO_WATCH_TOKENS = ['||', '&&', '!=', '!==', '==', '===', '>', '<', '<=', '>='];
var WHITESPACE_PLUS_RE = /\s+/;
var SYMBOLS = /\(|\)|\!/g;
function parseKeysToWatch(keys, str, isBindItem) {
  var i;
  var tokens;
  tokens = split(str, WHITESPACE_PLUS_RE);
  for (i = 0; i < tokens.length; i++) {
    if (NO_WATCH_TOKENS.indexOf(tokens[i]) === -1 && !tokens[i].startsWith("'") && keys.indexOf(tokens[i]) === -1) {
      if (isBindItem && tokens[i] === 'item') {
        continue;
      }
      keys.push(parseKeyToWatch(tokens[i]).replace(SYMBOLS, ''));
    }
  }
  return keys;
}
module.exports.parseKeysToWatch = parseKeysToWatch;

function parseKeyToWatch(str) {
  var dotIndex;
  str = stripNot(str.trim());
  dotIndex = str.indexOf('.');
  if (dotIndex === -1) {
    return str;
  }
  return str.substring(0, str.indexOf('.'));
}

function stripNot(str) {
  if (str.indexOf('!!') === 0) {
    return str.replace('!!', '');
  } else if (str.indexOf('!') === 0) {
    return str.replace('!', '');
  }
  return str;
}

/**
 * Cached split.
 */
var SPLIT_CACHE = {};
function split(str, delimiter) {
  if (!SPLIT_CACHE[delimiter]) {
    SPLIT_CACHE[delimiter] = {};
  }
  if (SPLIT_CACHE[delimiter][str]) {
    return SPLIT_CACHE[delimiter][str];
  }
  SPLIT_CACHE[delimiter][str] = str.split(delimiter);
  return SPLIT_CACHE[delimiter][str];
}
module.exports.split = split;

function copyArray(dest, src) {
  var i;
  dest.length = 0;
  for (i = 0; i < src.length; i++) {
    dest[i] = src[i];
  }
}
module.exports.copyArray = copyArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(2);
var diff = __webpack_require__(3);
var lib = __webpack_require__(0);
var wrapArray = __webpack_require__(4).wrapArray;

// Singleton state definition.
var State = {
  initialState: {},
  nonBindedStateKeys: [],
  handlers: {},
  computeState: [function () {/* no-op */}]
};

var STATE_UPDATE_EVENT = 'stateupdate';
var TYPE_OBJECT = 'object';
var WHITESPACE_REGEX = /s+/;

AFRAME.registerState = function (definition) {
  var computeState = State.computeState;
  if (definition.computeState) {
    computeState.push(definition.computeState);
  }
  AFRAME.utils.extendDeep(State, definition);
  State.computeState = computeState;
};

AFRAME.registerSystem('state', {
  init: function init() {
    var _this = this;

    var key;

    this.arrays = [];
    this.dirtyArrays = [];
    this.diff = {};
    this.state = AFRAME.utils.clone(State.initialState);
    this.subscriptions = [];
    this.initEventHandlers();

    // Wrap array to detect dirty.
    for (key in this.state) {
      if (this.state[key] && this.state[key].constructor === Array) {
        this.arrays.push(key);
        this.state[key].__dirty = true;
        wrapArray(this.state[key]);
      }
    }

    this.lastState = AFRAME.utils.clone(this.state);

    this.eventDetail = {
      lastState: this.lastState,
      state: this.state
    };

    this.el.addEventListener('loaded', function () {
      var i;
      // Initial compute.
      for (i = 0; i < State.computeState.length; i++) {
        State.computeState[i](_this.state, '@@INIT');
      }
      // Initial dispatch.
      for (i = 0; i < _this.subscriptions.length; i++) {
        _this.subscriptions[i].onStateUpdate(_this.state);
      }
    });
  },

  /**
   * Dispatch action.
   */
  dispatch: function () {
    var toUpdate = [];

    return function (actionName, payload) {
      var dirtyArrays;
      var i;
      var key;
      var subscription;

      // Modify state.
      State.handlers[actionName](this.state, payload);

      // Post-compute.
      for (i = 0; i < State.computeState.length; i++) {
        State.computeState[i](this.state, actionName, payload);
      }

      // Get a diff to optimize bind updates.
      for (key in this.diff) {
        delete this.diff[key];
      }
      diff(this.lastState, this.state, this.diff, State.nonBindedStateKeys);

      this.dirtyArrays.length = 0;
      for (i = 0; i < this.arrays.length; i++) {
        if (this.state[this.arrays[i]].__dirty) {
          this.dirtyArrays.push(this.arrays[i]);
        }
      }

      // Notify subscriptions / binders.
      toUpdate.length = 0;
      for (i = 0; i < this.subscriptions.length; i++) {
        if (this.subscriptions[i].name === 'bind-for') {
          // For arrays and bind-for, check __dirty flag on array rather than the diff.
          if (!this.state[this.subscriptions[i].keysToWatch[0]].__dirty) {
            continue;
          }
        } else {
          if (!this.shouldUpdate(this.subscriptions[i].keysToWatch, this.diff, this.dirtyArrays)) {
            continue;
          }
        }

        // Keep track to only update subscriptions once.
        if (toUpdate.indexOf(this.subscriptions[i]) === -1) {
          toUpdate.push(this.subscriptions[i]);
        }
      }

      // Update subscriptions.
      for (i = 0; i < toUpdate.length; i++) {
        toUpdate[i].onStateUpdate();
      }

      // Unset array dirty.
      for (key in this.state) {
        if (this.state[key] && this.state[key].constructor === Array) {
          this.state[key].__dirty = false;
        }
      }

      // Store last state.
      this.copyState(this.lastState, this.state);

      // Emit.
      this.eventDetail.action = actionName;
      this.eventDetail.payload = payload;
      this.el.emit(STATE_UPDATE_EVENT, this.eventDetail);
    };
  }(),

  /**
   * Store last state through a deep extend, but not for arrays.
   */
  copyState: function copyState(lastState, state, isRecursive) {
    var key;

    for (key in state) {
      // Don't copy pieces of state keys that are non-binded or untracked.
      if (!isRecursive && State.nonBindedStateKeys.indexOf(key) !== -1) {
        continue;
      }

      // Nested state.
      if (state[key] && state[key].constructor === Object) {
        if (!(key in lastState)) {
          // Clone object if destination does not exist.
          lastState[key] = AFRAME.utils.clone(state[key]);
          continue;
        }
        // Recursively copy state.
        this.copyState(lastState[key], state[key], true);
        continue;
      }

      // Copy by value.
      lastState[key] = state[key];
    }
  },

  subscribe: function subscribe(component) {
    this.subscriptions.push(component);
  },

  unsubscribe: function unsubscribe(component) {
    var i = this.subscriptions.indexOf(component);
    if (i > -1) this.subscriptions.splice(i, 1);
  },

  /**
   * Check if state changes were relevant to this binding. If not, don't call.
   */
  shouldUpdate: function shouldUpdate(keysToWatch, diff, dirtyArrays) {
    for (var i = 0; i < keysToWatch.length; i++) {
      if (keysToWatch[i] in diff || dirtyArrays.indexOf(keysToWatch[i]) !== -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Proxy events to action dispatches so components can just bubble actions up as events.
   * Handlers define which actions they handle. Go through all and add event listeners.
   */
  initEventHandlers: function initEventHandlers() {
    var actionName;
    var registeredActions = [];
    var self = this;

    registerListener = registerListener.bind(this);

    // Use declared handlers to know what events to listen to.
    for (actionName in State.handlers) {
      // Only need to register one handler for each event.
      if (registeredActions.indexOf(actionName) !== -1) {
        continue;
      }
      registeredActions.push(actionName);
      registerListener(actionName);
    }

    function registerListener(actionName) {
      var _this2 = this;

      this.el.addEventListener(actionName, function (evt) {
        _this2.dispatch(actionName, evt.detail);
      });
    }
  },

  /**
   * Render template to string with item data.
   */
  renderTemplate: function () {
    // Braces, whitespace, optional item name, item key, whitespace, braces.
    var interpRegex = /{{\s*(\w*\.)?([\w.]+)\s*}}/g;

    return function (template, data, asString) {
      var match;
      var str;

      str = template;

      // Data will be null if initialize pool for bind-for.updateInPlace.
      if (data) {
        while (match = interpRegex.exec(template)) {
          str = str.replace(match[0], (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === TYPE_OBJECT ? lib.select(data, match[2]) || '' : data);
        }
      }

      // Return as string.
      if (asString) {
        return str;
      }

      // Return as DOM.
      return document.createRange().createContextualFragment(str);
    };
  }(),

  select: lib.select
});

/**
 * Bind component property to a value in state.
 *
 * bind="geometry.width: car.width""
 * bind__material="color: enemy.color; opacity: enemy.opacity"
 * bind__visible="player.visible"
 */
AFRAME.registerComponent('bind', {
  schema: {
    default: {},
    parse: function parse(value) {
      // Parse style-like object.
      var data;
      var i;
      var properties;
      var pair;

      // Using setAttribute with object, no need to parse.
      if (value.constructor === Object) {
        return value;
      }

      // Using instanced ID as component namespace for single-property component,
      // nothing to separate.
      if (value.indexOf(':') === -1) {
        return value;
      }

      // Parse style-like object as keys to values.
      data = {};
      properties = lib.split(value, ';');
      for (i = 0; i < properties.length; i++) {
        pair = lib.split(properties[i].trim(), ':');
        data[pair[0]] = pair[1].trim();
      }
      return data;
    }
  },

  multiple: true,

  init: function init() {
    var componentId;
    var data = this.data;
    var key;

    this.keysToWatch = [];
    this.onStateUpdate = this.onStateUpdate.bind(this);
    this.system = this.el.sceneEl.systems.state;

    // Whether we are binding by namespace (e.g., bind__foo="prop1: true").
    if (this.id) {
      componentId = lib.split(this.id, '__')[0];
    }

    this.isNamespacedBind = this.id && componentId in AFRAME.components && !AFRAME.components[componentId].isSingleProp || componentId in AFRAME.systems;

    this.lastData = {};
    this.updateObj = {};

    // Subscribe to store and register handler to do data-binding to components.
    this.system.subscribe(this);

    this.onStateUpdate = this.onStateUpdate.bind(this);
  },

  update: function update() {
    var data = this.data;
    var key;
    var property;

    // Index `keysToWatch` to only update state on relevant changes.
    this.keysToWatch.length = 0;
    if (typeof data === 'string') {
      lib.parseKeysToWatch(this.keysToWatch, data);
    } else {
      for (key in data) {
        lib.parseKeysToWatch(this.keysToWatch, data[key]);
      }
    }

    this.onStateUpdate();
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    // Update component with the state.
    var hasKeys = false;
    var el = this.el;
    var propertyName;
    var stateSelector;
    var state;
    var tempNode;
    var value;

    if (!el.parentNode) {
      return;
    }
    if (this.isNamespacedBind) {
      lib.clearObject(this.updateObj);
    }

    state = this.system.state;

    // Single-property bind.
    if (_typeof(this.data) !== TYPE_OBJECT) {
      try {
        value = lib.select(state, this.data);
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + this.data + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== TYPE_OBJECT && _typeof(this.lastData) !== TYPE_OBJECT && this.lastData === value) {
        return;
      }

      AFRAME.utils.entity.setComponentProperty(el, this.id, value);
      this.lastData = value;
      return;
    }

    for (propertyName in this.data) {
      // Pointer to a value in the state (e.g., `player.health`).
      stateSelector = this.data[propertyName].trim();
      try {
        value = lib.select(state, stateSelector);
      } catch (e) {
        console.log(e);
        throw new Error('[aframe-state-component] Key \'' + stateSelector + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== TYPE_OBJECT && _typeof(this.lastData[propertyName]) !== TYPE_OBJECT && this.lastData[propertyName] === value) {
        continue;
      }

      // Remove component if value is `undefined`.
      if (propertyName in AFRAME.components && value === undefined) {
        el.removeAttribute(propertyName);
        return;
      }

      // Set using dot-delimited property name.
      if (this.isNamespacedBind) {
        // Batch if doing namespaced bind.
        this.updateObj[propertyName] = value;
      } else {
        AFRAME.utils.entity.setComponentProperty(el, propertyName, value);
      }

      this.lastData[propertyName] = value;
    }

    // Batch if doing namespaced bind.
    for (hasKeys in this.updateObj) {
      // See if object is empty.
    }
    if (this.isNamespacedBind && hasKeys) {
      el.setAttribute(this.id, this.updateObj);
    }
  },

  remove: function remove() {
    this.system.unsubscribe(this);
  }
});

/**
 * Toggle component attach and detach based on boolean value.
 *
 * bind-toggle__raycastable="isRaycastable""
 */
AFRAME.registerComponent('bind-toggle', {
  schema: { type: 'string' },

  multiple: true,

  init: function init() {
    this.system = this.el.sceneEl.systems.state;
    this.keysToWatch = [];
    this.onStateUpdate = this.onStateUpdate.bind(this);

    // Subscribe to store and register handler to do data-binding to components.
    this.system.subscribe(this);

    this.onStateUpdate();
  },

  update: function update() {
    this.keysToWatch.length = 0;
    lib.parseKeysToWatch(this.keysToWatch, this.data);
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    var el = this.el;
    var state;
    var value;

    state = this.system.state;

    try {
      value = lib.select(state, this.data);
    } catch (e) {
      throw new Error('[aframe-state-component] Key \'' + this.data + '\' not found in state.' + (' #' + this.el.getAttribute('id') + '[' + this.attrName + ']'));
    }

    if (value) {
      el.setAttribute(this.id, '');
    } else {
      el.removeAttribute(this.id);
    }
  },

  remove: function remove() {
    this.system.unsubscribe(this);
  }
});

module.exports = {
  composeFunctions: lib.composeFunctions,
  composeHandlers: lib.composeHandlers,
  select: lib.select
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var ITEM_RE = /item/;
var ITEM_PREFIX_RE = /item./;
var ITEM_SELECTOR_RE = /item.(\w+)/;

/**
 * Render array from state.
 */
AFRAME.registerComponent('bind-for', {
  schema: {
    delay: { default: 0 },
    for: { type: 'string', default: 'item' },
    in: { type: 'string' },
    key: { type: 'string' },
    pool: { default: 0 },
    template: { type: 'string' },
    updateInPlace: { default: false }
  },

  init: function init() {
    // Subscribe to store and register handler to do data-binding to components.
    this.system = this.el.sceneEl.systems.state;
    this.onStateUpdate = this.onStateUpdate.bind(this);

    this.keysToWatch = [];
    this.renderedKeys = []; // Keys that are currently rendered.
    this.system.subscribe(this);

    if (this.el.children[0] && this.el.children[0].tagName === 'TEMPLATE') {
      this.template = this.el.children[0].innerHTML.trim();
    } else {
      this.template = document.querySelector(this.data.template).innerHTML.trim();
    }

    for (var i = 0; i < this.data.pool; i++) {
      this.el.appendChild(this.generateFromTemplate(null, i));
    }
  },

  update: function update() {
    this.keysToWatch[0] = lib.split(this.data.in, '.')[0];
    this.onStateUpdate();
  },

  /**
   * When items are swapped out, the old ones are removed, and new ones are added. All
   * entities will be reinitialized.
   */
  onStateUpdateNaive: function () {
    var activeKeys = [];

    return function () {
      var child;
      var data = this.data;
      var el = this.el;
      var list;
      var key;
      var keyValue;

      try {
        list = lib.select(this.system.state, data.in);
      } catch (e) {
        throw new Error('[aframe-state-component] Key \'' + data.in + '\' not found in state.' + (' #' + el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      activeKeys.length = 0;
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        // If key not defined, use index (e.g., array of strings).
        activeKeys.push(data.key ? item[data.key].toString() : item.toString());
      }

      // Remove items by removing entities.
      var toRemoveEls = this.getElsToRemove(activeKeys, this.renderedKeys);
      for (var _i = 0; _i < toRemoveEls.length; _i++) {
        toRemoveEls[_i].parentNode.removeChild(toRemoveEls[_i]);
      }

      if (list.length) {
        this.renderItems(list, activeKeys, 0);
      }
    };
  }(),

  /**
   * Add or update item with delay support.
   */
  renderItems: function renderItems(list, activeKeys, i) {
    var _this = this;

    var data = this.data;
    var el = this.el;
    var itemEl;
    var item = list[i];

    // If key not defined, use index (e.g., array of strings).
    var keyValue = data.key ? item[data.key].toString() : item.toString();

    if (this.renderedKeys.indexOf(keyValue) === -1) {
      // Add.
      itemEl = this.generateFromTemplate(item, i);
      el.appendChild(itemEl);
      this.renderedKeys.push(keyValue);
    } else {
      // Update.
      if (list.length && list[0].constructor === String) {
        // Update index for simple list.
        var _keyValue = data.key ? item[data.key].toString() : item.toString();
        itemEl = el.querySelector('[data-bind-for-value="' + _keyValue + '"]');
        itemEl.setAttribute('data-bind-for-key', i);
      } else {
        var bindForKey = this.getBindForKey(item, i);
        itemEl = el.querySelector('[data-bind-for-key="' + bindForKey + '"]');
      }
      itemEl.emit('bindforupdate', item, false);
    }

    if (!list[i + 1]) {
      return;
    }

    if (this.data.delay) {
      setTimeout(function () {
        _this.renderItems(list, activeKeys, i + 1);
      }, this.data.delay);
    } else {
      this.renderItems(list, activeKeys, i + 1);
    }
  },

  /**
   * When items are swapped out, this algorithm will update component values in-place using
   * bind-item.
   */
  onStateUpdateInPlace: function () {
    var activeKeys = [];

    return function () {
      var data = this.data;
      var el = this.el;
      var list;
      var key;
      var keyValue;

      try {
        list = lib.select(this.system.state, data.in);
      } catch (e) {
        console.log(e);
        throw new Error('[aframe-state-component] Key \'' + data.in + '\' not found in state.' + (' #' + el.getAttribute('id') + '[' + this.attrName + ']'));
      }

      // Calculate keys that should be active.
      activeKeys.length = 0;
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        keyValue = data.key ? item[data.key].toString() : item.toString();
        activeKeys.push(keyValue);
      }

      // Remove items by pooling. Do before adding.
      var toRemoveEls = this.getElsToRemove(activeKeys, this.renderedKeys);
      for (var _i2 = 0; _i2 < toRemoveEls.length; _i2++) {
        toRemoveEls[_i2].object3D.visible = false;
        toRemoveEls[_i2].setAttribute('data-bind-for-active', 'false');
        toRemoveEls[_i2].removeAttribute('data-bind-for-key');
        toRemoveEls[_i2].removeAttribute('data-bind-for-value');
        toRemoveEls[_i2].emit('bindfordeactivate', null, false);
        toRemoveEls[_i2].pause();
      }

      if (list.length) {
        this.renderItemsInPlace(list, activeKeys, 0);
      }
    };
  }(),

  /**
   * Add, takeover, or update item with delay support.
   */
  renderItemsInPlace: function renderItemsInPlace(list, activeKeys, i) {
    var _this2 = this;

    var data = this.data;
    var el = this.el;
    var itemEl;

    var item = list[i];
    var bindForKey = this.getBindForKey(item, i);
    var keyValue = data.key ? item[data.key].toString() : item.toString();

    // Add item.
    if (this.renderedKeys.indexOf(keyValue) === -1) {
      if (!el.querySelector(':scope > [data-bind-for-active="false"]')) {
        // No items available in pool. Generate new entity.
        var _itemEl = this.generateFromTemplate(item, i);
        _itemEl.addEventListener('loaded', function () {
          _itemEl.emit('bindforupdateinplace', item, false);
        });
        el.appendChild(_itemEl);
      } else {
        // Take over inactive item.
        itemEl = el.querySelector('[data-bind-for-active="false"]');
        itemEl.setAttribute('data-bind-for-key', bindForKey);
        itemEl.setAttribute('data-bind-for-value', keyValue);
        itemEl.object3D.visible = true;
        itemEl.play();
        itemEl.setAttribute('data-bind-for-active', 'true');
        itemEl.emit('bindforupdateinplace', item, false);
      }
      this.renderedKeys.push(keyValue);
    } else if (activeKeys.indexOf(keyValue) !== -1) {
      // Update item.
      if (list.length && list[0].constructor === String) {
        // Update index for simple list.
        itemEl = el.querySelector('[data-bind-for-value="' + keyValue + '"]');
        itemEl.setAttribute('data-bind-for-key', i);
      } else {
        itemEl = el.querySelector('[data-bind-for-key="' + bindForKey + '"]');
      }
      itemEl.emit('bindforupdateinplace', item, false);
    }

    if (!list[i + 1]) {
      return;
    }

    if (this.data.delay) {
      setTimeout(function () {
        _this2.renderItemsInPlace(list, activeKeys, i + 1);
      }, this.data.delay);
    } else {
      this.renderItemsInPlace(list, activeKeys, i + 1);
    }
  },

  /**
   * Generate entity from template.
   */
  generateFromTemplate: function generateFromTemplate(item, i) {
    var data = this.data;

    this.el.appendChild(this.system.renderTemplate(this.template, item));
    var newEl = this.el.children[this.el.children.length - 1];;

    // From pool.true
    if (!item) {
      newEl.setAttribute('data-bind-for-key', '');
      newEl.setAttribute('data-bind-for-active', 'false');
      return newEl;
    }

    var bindForKey = this.getBindForKey(item, i);
    newEl.setAttribute('data-bind-for-key', bindForKey);
    if (!data.key) {
      newEl.setAttribute('data-bind-for-value', item);
    }

    // Keep track of pooled and non-pooled entities if updating in place.
    newEl.setAttribute('data-bind-for-active', 'true');
    return newEl;
  },

  /**
   * Get entities marked for removal.
   *
   * @param {array} activeKeys - List of key values that should be active.
   * @param {array} renderedKeys - List of key values currently rendered.
   */
  getElsToRemove: function () {
    var toRemove = [];

    return function (activeKeys, renderedKeys) {
      var data = this.data;
      var el = this.el;

      toRemove.length = 0;
      for (var i = 0; i < el.children.length; i++) {
        if (el.children[i].tagName === 'TEMPLATE') {
          continue;
        }
        var key = data.key ? el.children[i].getAttribute('data-bind-for-key') : el.children[i].getAttribute('data-bind-for-value');
        if (activeKeys.indexOf(key) === -1 && renderedKeys.indexOf(key) !== -1) {
          toRemove.push(el.children[i]);
          renderedKeys.splice(renderedKeys.indexOf(key), 1);
        }
      }
      return toRemove;
    };
  }(),

  /**
   * Get value to use as the data-bind-for-key.
   * For items, will be value specified by `bind-for.key`.
   * For simple list, will be the index.
   */
  getBindForKey: function getBindForKey(item, i) {
    return this.data.key ? item[this.data.key].toString() : i.toString();
  },

  /**
   * Handle state update.
   */
  onStateUpdate: function onStateUpdate() {
    if (this.data.updateInPlace) {
      this.onStateUpdateInPlace();
    } else {
      this.onStateUpdateNaive();
    }
  },

  remove: function remove() {
    this.el.sceneEl.systems.state.unsubscribe(this);
  }
});

/**
 * Handle parsing and update in-place updates under bind-for.
 */
AFRAME.registerComponent('bind-item', {
  schema: {
    type: 'string'
  },

  multiple: true,

  init: function init() {
    this.itemData = null;
    this.keysToWatch = [];
    this.prevValues = {};

    // Listen to root item for events.
    var rootEl = this.rootEl = this.el.closest('[data-bind-for-key]');
    if (!rootEl) {
      throw new Error('bind-item component must be attached to entity under a bind-for item.');
    }
    rootEl.addEventListener('bindforupdateinplace', this.updateInPlace.bind(this));
    rootEl.addEventListener('bindfordeactivate', this.deactivate.bind(this));

    this.el.sceneEl.systems.state.subscribe(this);
  },

  update: function update() {
    this.parseSelector();
  },

  /**
   * Run with bind-for tells to via event `bindforupdateinplace`, passing item data.
   */
  updateInPlace: function updateInPlace(evt) {
    var propertyMap = this.propertyMap;

    if (this.rootEl.getAttribute('data-bind-for-active') === 'false') {
      return;
    }

    if (evt) {
      this.itemData = evt.detail;
    }

    for (var property in propertyMap) {
      // Get value from item.
      var value = this.select(this.itemData, propertyMap[property]);

      // Diff against previous value.
      if (value === this.prevValues[property]) {
        continue;
      }

      // Update.
      AFRAME.utils.entity.setComponentProperty(this.el, property, value);

      this.prevValues[property] = value;
    }
  },

  onStateUpdate: function onStateUpdate() {
    this.updateInPlace();
  },

  select: function select(itemData, selector) {
    return lib.select(this.el.sceneEl.systems.state.state, selector, itemData);
  },

  deactivate: function deactivate() {
    this.prevValues = {};
  },

  parseSelector: function parseSelector() {
    var propertyMap = this.propertyMap = {};
    this.keysToWatch.length = 0;

    var componentName = lib.split(this.id, '__')[0];

    // Different parsing for multi-prop components.
    if (componentName in AFRAME.components && !AFRAME.components[componentName].isSingleProp) {
      var propertySplitList = lib.split(this.data, ';');
      for (var i = 0; i < propertySplitList.length; i++) {
        var propertySplit = lib.split(propertySplitList[i], ':');
        propertyMap[this.id + '.' + propertySplit[0].trim()] = propertySplit[1].trim();
        lib.parseKeysToWatch(this.keysToWatch, propertySplit[1].trim(), true);
      }
      return;
    }

    propertyMap[this.id] = this.data;
    lib.parseKeysToWatch(this.keysToWatch, this.data, true);
  },

  remove: function remove() {
    this.el.sceneEl.systems.state.unsubscribe(this);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Computes the difference between two objects with ability to ignore keys.
 *
 * @param {object} a - First object to compare (e.g., oldData).
 * @param {object} b - Second object to compare (e.g., newData).
 * @returns {object}
 *   Difference object where set of keys note which values were not equal, and values are
 *   `b`'s values.
 */
module.exports = function () {
  var keys = [];

  return function (a, b, targetObject, ignoreKeys) {
    var aVal;
    var bVal;
    var bKey;
    var diff;
    var key;
    var i;
    var isComparingObjects;

    diff = targetObject || {};

    // Collect A keys.
    keys.length = 0;
    for (key in a) {
      keys.push(key);
    }

    if (!b) {
      return diff;
    }

    // Collect B keys.
    for (bKey in b) {
      if (keys.indexOf(bKey) === -1) {
        keys.push(bKey);
      }
    }

    for (i = 0; i < keys.length; i++) {
      key = keys[i];

      // Ignore specified keys.
      if (ignoreKeys && ignoreKeys.indexOf(key) !== -1) {
        continue;
      }

      aVal = a[key];
      bVal = b[key];
      isComparingObjects = aVal && bVal && aVal.constructor === Object && bVal.constructor === Object;
      if (isComparingObjects && !AFRAME.utils.deepEqual(aVal, bVal) || !isComparingObjects && aVal !== bVal) {
        diff[key] = bVal;
      }
    }
    return diff;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fns = ['push', 'pop', 'shift', 'unshift', 'splice'];

function wrapArray(arr) {
  var i;
  if (arr.__wrapped) {
    return;
  }
  for (i = 0; i < fns.length; i++) {
    makeCallDirty(arr, fns[i]);
  }
  arr.__wrapped = true;
}
module.exports.wrapArray = wrapArray;

function makeCallDirty(arr, fn) {
  var originalFn = arr[fn];
  arr[fn] = function () {
    originalFn.apply(arr, arguments);
    arr.__dirty = true;
  };
}

/***/ })
/******/ ]);
});
},{}],5:[function(require,module,exports){
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e || self).aframeWebsurfaces = {})
}(this, function (e) {
    function t(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, n(e, t)
    }

    function n(e, t) {
        return (n = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var i = function (e) {
        function n(t) {
            var n;
            return (n = e.call(this) || this).element = t || document.createElement("div"), n.element.style.position = "absolute", n.element.style.pointerEvents = "auto", n.addEventListener("removed", function () {
                this.traverse(function (e) {
                    e.element instanceof Element && null !== e.element.parentNode && e.element.parentNode.removeChild(e.element)
                })
            }), n
        }
        return t(n, e), n.prototype.copy = function (t, n) {
            return e.prototype.copy.call(this, t, n), this.element = t.element.cloneNode(!0), this
        }, n
    }(THREE.Object3D);
    i.prototype.isCSS3DObject = !0,
        function (e) {
            function n(t) {
                var n;
                return (n = e.call(this, t) || this).rotation2D = 0, n
            }
            return t(n, e), n.prototype.copy = function (t, n) {
                return e.prototype.copy.call(this, t, n), this.rotation2D = t.rotation2D, this
            }, n
        }(i).prototype.isCSS3DSprite = !0;
    var s = new THREE.Matrix4,
        o = new THREE.Matrix4,
        a = function () {
            var e, t, n, i, a = this,
                r = {
                    camera: {
                        fov: 0,
                        style: ""
                    },
                    objects: new WeakMap
                },
                c = document.createElement("div");
            c.style.overflow = "hidden", this.domElement = c;
            var l = document.createElement("div");

            function d(e) {
                return Math.abs(e) < 1e-10 ? 0 : e
            }

            function m(e) {
                var t = e.elements;
                return "matrix3d(" + d(t[0]) + "," + d(-t[1]) + "," + d(t[2]) + "," + d(t[3]) + "," + d(t[4]) + "," + d(-t[5]) + "," + d(t[6]) + "," + d(t[7]) + "," + d(t[8]) + "," + d(-t[9]) + "," + d(t[10]) + "," + d(t[11]) + "," + d(t[12]) + "," + d(-t[13]) + "," + d(t[14]) + "," + d(t[15]) + ")"
            }

            function h(e) {
                var t = e.elements;
                return "translate(-50%,-50%)matrix3d(" + d(t[0]) + "," + d(t[1]) + "," + d(t[2]) + "," + d(t[3]) + "," + d(-t[4]) + "," + d(-t[5]) + "," + d(-t[6]) + "," + d(-t[7]) + "," + d(t[8]) + "," + d(t[9]) + "," + d(t[10]) + "," + d(t[11]) + "," + d(t[12]) + "," + d(t[13]) + "," + d(t[14]) + "," + d(t[15]) + ")"
            }

            function u(e, t, n, i) {
                if (e.isCSS3DObject) {
                    var c;
                    e.onBeforeRender(a, t, n), e.isCSS3DSprite ? (s.copy(n.matrixWorldInverse), s.transpose(), 0 !== e.rotation2D && s.multiply(o.makeRotationZ(e.rotation2D)), s.copyPosition(e.matrixWorld), s.scale(e.scale), s.elements[3] = 0, s.elements[7] = 0, s.elements[11] = 0, s.elements[15] = 1, c = h(s)) : c = h(e.matrixWorld);
                    var d = e.element,
                        m = r.objects.get(e);
                    void 0 !== m && m.style === c || (d.style.transform = c, r.objects.set(e, {
                        style: c
                    })), d.style.display = e.visible ? "" : "none", d.parentNode !== l && l.appendChild(d), e.onAfterRender(a, t, n)
                }
                for (var p = 0, f = e.children.length; p < f; p++) u(e.children[p], t, n)
            }
            l.style.transformStyle = "preserve-3d", l.style.pointerEvents = "none", c.appendChild(l), this.getSize = function () {
                return {
                    width: e,
                    height: t
                }
            }, this.render = function (e, t) {
                var s, o, a = t.projectionMatrix.elements[5] * i;
                r.camera.fov !== a && (c.style.perspective = t.isPerspectiveCamera ? a + "px" : "", r.camera.fov = a), !0 === e.autoUpdate && e.updateMatrixWorld(), null === t.parent && t.updateMatrixWorld(), t.isOrthographicCamera && (s = -(t.right + t.left) / 2, o = (t.top + t.bottom) / 2);
                var h = (t.isOrthographicCamera ? "scale(" + a + ")translate(" + d(s) + "px," + d(o) + "px)" + m(t.matrixWorldInverse) : "translateZ(" + a + "px)" + m(t.matrixWorldInverse)) + "translate(" + n + "px," + i + "px)";
                r.camera.style !== h && (l.style.transform = h, r.camera.style = h), u(e, e, t)
            }, this.setSize = function (s, o) {
                n = (e = s) / 2, i = (t = o) / 2, c.style.width = s + "px", c.style.height = o + "px", l.style.width = s + "px", l.style.height = o + "px"
            }
        },
        r = 100,
        c = function () {
            function e(e, t) {
                this.websurfaceEntity = t, this.enabled = !0, this.cssRenderer = new a, this.domElement = this.cssRenderer.domElement, this.domElement.style.position = "fixed", this.domElement.style.zIndex = "-2", this.cssCamera = new THREE.PerspectiveCamera(e.fov, e.aspect, e.near * r, e.far * r), this.camera = e, this.cssScene = new THREE.Scene, this.update = this.update.bind(this)
            }
            var t = e.prototype;
            return t.setSize = function (e, t) {
                this.cssRenderer.setSize(e, t), this.cssCamera.aspect = e / t, this.cssCamera.updateProjectionMatrix()
            }, t.update = function () {
                this.camera.getWorldPosition(this.cssCamera.position), this.cssCamera.position.multiplyScalar(r), this.camera.getWorldQuaternion(this.cssCamera.quaternion), this.cssRenderer.render(this.cssScene, this.cssCamera)
            }, e
        }(),
        l = function (e) {
            function n(t, n, s, o, a) {
                var c, l = (void 0 === a ? {} : a).elementWidth,
                    d = void 0 === l ? 1280 : l,
                    m = new THREE.PlaneGeometry(s, o),
                    h = new THREE.MeshBasicMaterial({
                        opacity: 0,
                        blending: THREE.NoBlending,
                        side: THREE.DoubleSide,
                        color: new THREE.Color(0, 0, 0)
                    });
                return (c = e.call(this, m, h) || this).context = t, c.domElement = n, c.aspectRatio = o / s, c.elementWidth = d, c.elementHeight = c.elementWidth * c.aspectRatio, c.width = s, c.height = o, c.resizeElement(), c.cssObject = new i(c.domElement), c.cssObject.scale.multiplyScalar(r / (c.elementWidth / c.width)), c.cssObjectInitialScale = c.cssObject.scale, c.size = new THREE.Vector3, c.box = new THREE.Box3, c.addEventListener("added", c.handleAdded), c.addEventListener("removed", c.handleRemoved), c.update = c.update.bind(function (e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(c)), c
            }
            t(n, e);
            var s = n.prototype;
            return s.handleAdded = function () {
                this.context.cssScene.add(this.cssObject)
            }, s.handleRemoved = function () {
                this.context.cssScene.remove(this.cssObject)
            }, s.resizeElement = function () {
                this.domElement.style.width = this.elementWidth + "px", this.domElement.style.height = this.elementHeight + "px"
            }, s.setElement = function (e) {
                this.domElement.parentNode && this.domElement.parentNode.removeChild(this.domElement), this.domElement = e, this.cssObject.element = e, this.resizeElement()
            }, s.update = function (e) {
                this.cssObject.quaternion.copy(e.quaternion), this.cssObject.position.copy(e.position).multiplyScalar(r), this.box.setFromObject(this).getSize(this.size);
                var t = e.scale;
                this.oldScaleFactor != t && (this.oldScaleFactor = t, this.cssObject.scale.set(this.cssObjectInitialScale.x, this.cssObjectInitialScale.y, this.cssObjectInitialScale.z), this.cssObject.scale.multiply(t)), this.cssObject.visible = e.visible
            }, s.dispose = function () {
                this.removeEventListener("added", this.handleAdded), this.removeEventListener("removed", this.handleRemoved), this.domElement.remove(), this.geometry.dispose(), this.material.dispose()
            }, n
        }(THREE.Mesh),
        d = AFRAME.registerComponent("websurface", {
            schema: {
                url: {
                    default: "https://aframe.io"
                },
                width: {
                    default: 1
                },
                height: {
                    default: .75
                },
                isInteractable: {
                    default: !0
                },
                frameSkips: {
                    default: 1
                },
                autoSceneStyling: {
                    default: !0
                }
            },
            init: function () {
                var e = this.el,
                    t = this.data;
                1 == t.autoSceneStyling && (e.sceneEl.style.position = "absolute", e.sceneEl.style.zIndex = "1"), 1 == t.isInteractable && (t.mouseHasLeftScreen = !0, e.setAttribute("geometry", "primitive:plane; width:" + t.width + "; height:" + t.height + ";"), e.addEventListener("click", function () {
                    0 != t.mouseHasLeftScreen && (document.exitPointerLock(), e.sceneEl.style.zIndex = "-1", t.mouseHasLeftScreen = !1)
                }), e.addEventListener("mouseenter", function () {
                    t.context.domElement.style.zIndex = "0"
                }), e.addEventListener("mouseleave", function () {
                    t.context.domElement.style.zIndex = "-2", t.mouseHasLeftScreen = !0
                })), e.addEventListener("cam-loaded", function () {
                    var n = document.createElement("iframe");
                    n.setAttribute("src", t.url), n.style.border = "none";
                    var i = new c(e.sceneEl.camera, e);
                    i.setSize(window.innerWidth, window.innerHeight), document.body.appendChild(i.domElement);
                    var s = new l(i, n, t.width, t.height);
                    if (e.object3D.add(s), 1 == t.isInteractable) {
                        var o = document.createElement("div");
                        o.style.position = "fixed", o.style.top = "0", o.style.width = "100%", o.style.height = "100%", o.style.zIndex = "-1", i.domElement.appendChild(o), o.addEventListener("click", function () {
                            e.sceneEl.style.zIndex = 1
                        })
                    }
                    this.websurface_iframe = n, this.css3d_context = i, t.context = i, t.element = s, window.addEventListener("resize", function () {
                        i.setSize(window.innerWidth, window.innerHeight)
                    })
                }), t.frames = 0, t.isCamLoaded = !1
            },
            tick: function () {
                var e = this.el,
                    t = this.data;
                if (1 != t.isPaused)
                    if (0 != t.isCamLoaded) {
                        var n = t.context,
                            i = t.element;
                        t.frames % t.frameSkips == 0 && (n && n.update(), i && i.update(e.object3D)), t.frames++
                    } else e.sceneEl.camera && (this.el.emit("cam-loaded"), t.isCamLoaded = !0)
            },
            pause: function () {
                this.data.isPaused = !0
            },
            play: function () {
                this.data.isPaused = !1
            }
        });
    e.component = d
});

},{}],6:[function(require,module,exports){
AFRAME.registerComponent('arealight', {
    
    schema: {
      width: { type: 'number' },
      height: { type: 'number' },
      scale: { type: 'vec3' },
      intensity: { type: 'number', default: 30 },
      color: { type: 'color', default: '#ffffff' },
      rotation: { type: 'vec3', default: { x: 0, y: 360, z: 0 } },
      showHelper: { type: 'boolean', default: false }
    },
    
    init: function() {
      
      var data = this.data;
      var height, width, scale;
      
      // console.log( 'Data:', data );
      // console.log( 'Object3D:', this.el.object3D );
      // console.log( 'Object3DMap:', this.el.object3DMap );
      // console.log( 'ComputeBoundingBox:', this.el.getObject3D('mesh').geometry.computeBoundingBox() );
      
      scale = this.el.object3D.scale;
      height = this.el.getAttribute('geometry').height * scale.y;
      width = ( this.el.getAttribute('geometry').radius * scale.y ) * 2;
     
      
      // console.log( 'Height:', height, 'Width:', width, 'Scale:', scale );
     
      var rectLight = new THREE.RectAreaLight( data.color, data.intensity, width, height );
      
      rectLight.position.set( width * scale.x / 2, 0, 0 );
      rectLight.rotation.set( data.rotation.x, data.rotation.y, data.rotation.z );
      
      this.el.setObject3D( 'area-light', rectLight );
      
      
      
      // Helper BS: Helper doesn't appear correctly in 0.7+.
      if ( data.showHelper ) {
        
        var helper = new THREE.RectAreaLightHelper( rectLight );
        helper.update();
        this.el.setObject3D( 'area-light-helper', helper );
        // helper.update();
        
      }
      
    }
    
  });

  var anime = AFRAME.ANIME;
  
  AFRAME.registerComponent('animatefluo', {
    
    dependencies: ['material', 'sound__hum', 'animation', 'area-light'],
    
    update: function() {
      
      this.el.components.sound__hum.playSound();
      
      // These both get the volume.
      // console.dir(this.el.components.sound__hum.data.volume);
      // console.log(this.el.getAttribute('sound__hum').volume);
      
      this.light = {
        emissiveIntensity: 0,
        areaLightIntensity: 0,
        opacity: this.el.components.material.material.opacity,
        volume: 0
      };
      
      // console.log(this.light.opacity);
      
      this.animeUpdateHandler = animate.bind(this);
      
      function animate() {
        
        // emissiveIntensity
        this.el.components.material.material.emissiveIntensity = this.light.emissiveIntensity;
        
        // rectAreaLight intensity (may want to include custom property)
        this.el.getObject3D('area-light').intensity = this.light.emissiveIntensity * 10;
        
        // opacity
        this.el.components.material.material.opacity = this.light.opacity;
        
        // volume
        this.el.setAttribute( 'sound__hum', 'volume', this.light.volume );
        
      }
      
      this.animationtest = anime({
        targets: this.light,
        emissiveIntensity: 1.5,
        areaLightIntensity: 10,
        opacity: 1,
        volume: 0.1,
        duration: 10000,
        elasticity: 1000,
        delay: function() {
          return 5000 + anime.random(-250, 250);
        },
        loop: true,
        autoplay: true,
        update: this.animeUpdateHandler
      });
      
      // test: works!
      this.animationIsPlaying = true;
      this.time = 0;
      
    },
    
    // Works when animationIsPlaying === true;
    tick: function(t, dt) {
      // if (!this.animationIsPlaying) { return; }
      // this.time += dt;
      // this.animationtest.tick(this.time);
    }
    
  });
},{}],7:[function(require,module,exports){
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('classeroomdeskchair', {
    schema: {
      row : {type:'int', default:6},
      column : {type:'int', default:5},
      widthc :{type:'int', default:8},
      depthc: {type:'int', default:8},
      scrid : {default:'#desk1'}
    },        
    init: function () {

var data = this.data;
var spacedeskx = data.widthc / data.column;
var spacedesky = data.depthc / data.row;
console.log( spacedeskx);
console.log( spacedesky);
var el =this.el;
var k= 0;
var allposi= [];
var x = 0;

        for (var i = 0; i < data.column; i = i + 1) {
          var y = 0;
          for (var j = 0; j < data.row; j = j +1 ){
          
            var y = y + spacedesky;
            var posit = x + ' 0 ' + y;
            deskfct(posit, data.scrid);
            allposi[k] = posit;
            k=k+1;
             
        }var x = x + spacedeskx;
      }
     
console.log(allposi);

function deskfct (posit, scrid){
    var locdesk = document.createElement('a-gltf-model');
    /*desk.setAttribute('dynamic-body', 'shape: box; mass: 10; ');*/
    /*desk.setAttribute('spring', 'target: #floor; damping: 1; stiffness: 100;');*/
    locdesk.setAttribute('src', scrid);
    locdesk.setAttribute('position', posit);
    locdesk.setAttribute('scale', '0.5 0.5 0.5');
    locdesk.setAttribute('rotation', '0 90 0');
    locdesk.setAttribute('shadow','receive:true');
    locdesk.setAttribute('body','type:dynamic');
    el.appendChild(locdesk);
    
  }
}}
)
},{}],8:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("grabbing", {
  schema: {
    hideOnGrab: { type: "boolean", default: false },
    grabDistance: { type: "number", default: 1 },
    attractHand: { type: "boolean", default: true },
    avoidWalls: { type: "boolean", default: true },
  },

  init() {
    this._enableHands = this._enableHands.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)
    this._onMouseDown = this._onMouseDown.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)
    this._onWheel = this._onWheel.bind(this)
    this._onButtonChanged = this._onButtonChanged.bind(this)
    this._onTouchTap = this._onTouchTap.bind(this)
    this._onTouchHold = this._onTouchHold.bind(this)

    this._btnPress = {}
    this._btnFlex = {}
    this._keysDown = {}
    this._grabCount = 0
    this._gamepadBtns = []

    this._hands = ["head", "left", "right"]
    this._head = {}
    this._left = {}
    this._right = {}
    this._head.hand = this.el.querySelector("a-camera")
    this._left.hand = this.el.querySelector("a-hand[side=\"left\"]")
    this._right.hand = this.el.querySelector("a-hand[side=\"right\"]")
    this._head.glove = this._head.hand.ensure(".hitbox", "a-sphere", { class: "hitbox", body: "type:kinematic;", radius: 0.25 })
    this._left.glove = this._left.hand.ensure("a-glove")
    this._right.glove = this._right.hand.ensure("a-glove")

    this._left.glove.setAttribute("visible", false)
    this._right.glove.setAttribute("visible", false)
    for (let hand of this._hands) {
      let _hand = "_" + hand
      this[_hand].hand.addEventListener("buttonchanged", this._enableHands)
    }

    this._head.ray = this._head.hand.ensure(".grabbing-ray", "a-entity", {
      class: "grabbing-ray",
      raycaster: {deep:true,
        objects: "[wall], [grabbable]",
        autoRefresh: false,
        // showLine: true,
      }
    })
    this._head.buttonRay = this._head.hand.ensure(".button.ray", "a-entity", {
      class: "button ray",
      raycaster: {deep:true,
        objects: "[wall], [button], [gui-interactable]",
        far: 1,
        autoRefresh: false,
        // showLine: true,
      }
    })
    this._head.reticle = this._head.hand.ensure(".reticle", "a-plane", {
      class: "reticle",
      material: "transparent:true; shader:flat;",
      position: "0 0 -0.0078125",
      scale: "0.00048828125 0.00048828125 0.00048828125"
    })
    this._head.anchor = this._head.ray.ensure(".grabbing.anchor", "a-entity", { class: "grabbing anchor", visible: false, body: "type:kinematic;autoShape:false;" })
  },

  update(oldData) {
    for (let hand of this._hands) {
      let _hand = "_" + hand
      if (this[_hand].ray)
        this[_hand].ray.setAttribute("raycaster", "far", this.data.grabDistance + (hand === "head" ? 1 : 0.1875))
    }
  },

  play() {
    document.addEventListener("keydown", this._onKeyDown)
    document.addEventListener("keyup", this._onKeyUp)
    this.el.sceneEl.canvas.addEventListener("mousedown", this._onMouseDown)
    this.el.sceneEl.canvas.addEventListener("mouseup", this._onMouseUp)
    this.el.sceneEl.canvas.addEventListener("wheel", this._onWheel)
    for (let hand of [this._left.hand, this._right.hand]) {
      // hand.addEventListener("buttonchanged", this._enableHands)
      hand.addEventListener("buttonchanged", this._onButtonChanged)
    }
    this.el.sceneEl.canvas.addEventListener("tap", this._onTouchTap)
    this.el.sceneEl.canvas.addEventListener("hold", this._onTouchHold)
  },

  pause() {
    document.removeEventListener("keydown", this._onKeyDown)
    document.removeEventListener("keyup", this._onKeyUp)
    this.el.sceneEl.canvas.removeEventListener("mousedown", this._onMouseDown)
    this.el.sceneEl.canvas.removeEventListener("mouseup", this._onMouseUp)
    this.el.sceneEl.canvas.removeEventListener("wheel", this._onWheel)
    for (let hand of [this._left.hand, this._right.hand]) {
      // hand.removeEventListener("buttonchanged", this._enableHands)
      hand.removeEventListener("buttonchanged", this._onButtonChanged)
    }
    this.el.sceneEl.canvas.removeEventListener("tap", this._onTouchTap)
    this.el.sceneEl.canvas.removeEventListener("hold", this._onTouchHold)
  },

  remove() {
    for (let hand of this._hands) {
      let _hand = "_" + hand
      this.drop(hand)
      this[_hand].glove.copyWorldPosRot(this[_hand].hand)
      let flex = 0.25
      for (let finger = 0; finger < 5; finger++) {
        this.emit("fingerflex", this[_hand].glove, this[_hand].grabbed, { hand: hand, finger: finger, flex: flex })
      }
    }
  },

  tick(time, timeDelta) {
    // handle gamepads
    for (let i = 0; i < 16; i++)
      this._gamepadBtns[i] = 0
    for (i = 0, len = navigator.getGamepads().length; i < len; i++) {
      gamepad = navigator.getGamepads()[i]
      if (gamepad) {
        for (let i = 0; i < 16; i++)
          this._gamepadBtns[i] += gamepad.buttons[i]?.pressed || 0
      }
    }

    if ((this._gamepadBtns[4] || this._gamepadBtns[5]) && !this._grabBtn) {
      this._setDevice("gamepad")
      console.log("grabbing!", this._gamepadBtns[4], this._gamepadBtns[5], this._grabBtn)
      this.grab()
    }
    if (this._grabBtn && !(this._gamepadBtns[4] || this._gamepadBtns[5])) {
      console.log("dropping!", this._gamepadBtns[4], this._gamepadBtns[5], this._grabBtn)
      this.drop()
    }
    if ((this._gamepadBtns[6] || this._gamepadBtns[7]) && !this._useBtn0) this.useDown()
    if ((this._gamepadBtns[0]) && !this._useBtn1) this.useDown("head", 1)
    if ((this._gamepadBtns[1]) && !this._useBtn2) this.useDown("head", 2)
    if (this._gamepadBtns[2]) {
      if (this._gamepadBtns[12]) this.moveHeadHand(0, -0.03125)
      if (this._gamepadBtns[13]) this.moveHeadHand(0, 0.03125)
      if (this._gamepadBtns[14]) this.moveHeadHand(0, 0, -0.03125)
      if (this._gamepadBtns[15]) this.moveHeadHand(0, 0, 0.03125)
    } else {
      if (this._gamepadBtns[12]) this.moveHeadHand(-0.03125)
      if (this._gamepadBtns[13]) this.moveHeadHand(0.03125)
      if (this._gamepadBtns[14]) this.moveHeadHand(0, 0, 0, 0.03125)
      if (this._gamepadBtns[15]) this.moveHeadHand(0, 0, 0, -0.03125)
    }
    this._grabBtn = false
    this._useBtn0 = false
    this._useBtn1 = false
    this._useBtn2 = false
    for (i = 0, len = navigator.getGamepads().length; i < len; i++) {
      gamepad = navigator.getGamepads()[i]
      if (gamepad) {
        this._grabBtn = this._grabBtn || this._gamepadBtns[4] || this._gamepadBtns[5]
        this._useBtn0 = this._useBtn0 || this._gamepadBtns[6] || this._gamepadBtns[7]
        this._useBtn1 = this._useBtn1 || this._gamepadBtns[0]
        this._useBtn2 = this._useBtn2 || this._gamepadBtns[1]
      }
    }

    let headPos = THREE.Vector3.temp()
    let delta = THREE.Vector3.temp()
    let palmDelta = THREE.Vector3.temp()
    headPos.copy(this._head.hand.object3D.position)
    this._head.hand.object3D.parent.localToWorld(headPos)

    for (let hand of this._hands) {
      let _hand = "_" + hand

      // keep hands out of walls
      if (this.data.avoidWalls && this[_hand]._occlusionRay) {
        let palm = this[_hand].glove.querySelector(".palm") || this[_hand].glove
        this[_hand].glove.copyWorldPosRot(this[_hand].hand)

        this[_hand]._occlusionRay.object3D.position.copy(headPos)
        palm.object3D.getWorldPosition(delta)
        this[_hand].glove.object3D.getWorldPosition(palmDelta)
        palmDelta.sub(delta)
        delta.sub(headPos)
        let handDist = delta.length()
        delta.normalize()
        this[_hand]._occlusionRay.setAttribute("raycaster", "direction", `${delta.x} ${delta.y} ${delta.z}`)
        this[_hand]._occlusionRay.setAttribute("raycaster", "far", handDist + 0.03125)

        let ray = this[_hand]._occlusionRay.components.raycaster
        ray.refreshObjects()
        let hit = ray.intersections[0]
        if (hit) {
          // this[_hand].glove.object3D.position.copy(hit.point)
          let dist = delta.copy(hit.point).sub(headPos).length()
          this[_hand].glove.object3D.position.copy(headPos).add(palmDelta).add(delta.normalize().multiplyScalar(dist - 0.03125))
          this[_hand].glove.object3D.parent.worldToLocal(this[_hand].glove.object3D.position)
        }
      }

      // handle grabbables
      let reticleMode = "default"
      if (this[_hand].grabbed) {
        let ray = this[_hand].ray.components.raycaster
        ray.refreshObjects()
        if (!this[_hand].grabbed.components.grabbable?.data.immovable) {
          if (this[_hand].grabbed.components.grabbable?.data.avoidWalls) {
            for (let hit of ray.intersections) {
              if (hit && hit.el.components.wall && hit.distance < -this[_hand].anchor.object3D.position.z) {
                this[_hand].anchor.object3D.position.multiplyScalar(0.5)
              }
            }
          }
          let delta = THREE.Vector3.temp().copy(this[_hand].grabbed.object3D.position)
          this[_hand].grabbed.copyWorldPosRot(this[_hand].anchor)
          delta.sub(this[_hand].grabbed.object3D.position)
          if (delta.length() > 1) this.drop(hand)
        }
        if (this[_hand].reticle) this._setReticle(null)
      } else {
        if (this[_hand].ray) {
          let ray = this[_hand].ray.components.raycaster
          ray.refreshObjects()
          let hit = ray.intersections[0]
          if (hit && hit.el.components.grabbable) {
            if (this[_hand]._lastHit !== hit.el) {
              if (this[_hand]._lastHit)
                this.emit("unreachable", this[_hand].glove, this[_hand]._lastHit)
              this[_hand]._lastHit = hit.el
              this.emit("reachable", this[_hand].glove, this[_hand]._lastHit)
              this._flexFinger(hand, 5, -0.125, true)
              this._flexFinger(hand, 0, 0, true)
            }
            if (this[_hand].reticle) {
              reticleMode = "grab"
            }
          } else {
            if (this[_hand]._lastHit) {
              this.emit("unreachable", this[_hand].glove, this[_hand]._lastHit)
              this._restoreUserFlex(hand)
            }
            this[_hand]._lastHit = null
          }
        }

        // handle buttons
        if (this[_hand].buttonRay) {
          let ray = this[_hand].buttonRay.components.raycaster
          ray.refreshObjects()
          let hit = ray.intersections[0]
          if (hit && hit.el.components.button != null) {
            if (this[_hand]._lastButton !== hit.el) {
              if (this[_hand]._lastButton)
                this.emit("unhover", this[_hand].glove, this[_hand]._lastButton)
              this[_hand]._lastButton = hit.el
              this.emit("hover", this[_hand].glove, this[_hand]._lastButton)
              this._flexFinger(hand, 7, 1, true)
              this._flexFinger(hand, 1, -0.125, true)
            }
            if (hit.distance < 0.125) {
              if (this[_hand]._lastPress !== hit.el) {
                if (this[_hand]._lastPress) {
                  this.emit("unpress", this[_hand].glove, this[_hand]._lastPress)
                  this[_hand]._lastPress.removeState("pressed")
                }
                this[_hand]._lastPress = hit.el
                this.emit("press", this[_hand].glove, this[_hand]._lastPress)
                this[_hand]._lastPress.addState("pressed")
              }
            } else {
              if (this[_hand]._lastPress) {
                this.emit("unpress", this[_hand].glove, this[_hand]._lastPress)
                this[_hand]._lastPress.removeState("pressed")
              }
              this[_hand]._lastPress = null
            }
            if (this[_hand].reticle) {
              reticleMode = "push"
            }
          } else {
            if (this[_hand]._lastPress) {
              this.emit("unpress", this[_hand].glove, this[_hand]._lastPress)
              this[_hand]._lastPress.removeState("pressed")
            }
            this[_hand]._lastPress = null
            if (this[_hand]._lastButton) {
              this.emit("unhover", this[_hand].glove, this[_hand]._lastButton)
              this._restoreUserFlex(hand)
            }
            this[_hand]._lastButton = null
          }
        }
        if (this[_hand].reticle) this._setReticle(reticleMode)
      }

      // Track velocity
      this[_hand].lastGlovePos = this[_hand].lastGlovePos || new THREE.Vector3()
      this[_hand].lastGrabbedPos = this[_hand].lastGrabbedPos || new THREE.Vector3()
      this[_hand].gloveVelocity = this[_hand].gloveVelocity || new THREE.Vector3()
      this[_hand].grabbedVelocity = this[_hand].grabbedVelocity || new THREE.Vector3()
      let pos = THREE.Vector3.temp()
      if (this[_hand].glove) {
        this[_hand].glove.object3D.localToWorld(pos.set(0, 0, 0))
        this[_hand].gloveVelocity.copy(pos).sub(this[_hand].lastGlovePos).multiplyScalar(500 / timeDelta)
        this[_hand].lastGlovePos.copy(pos)
      }
      if (this[_hand].grabbed) {
        this[_hand].grabbed.object3D.localToWorld(pos.set(0, 0, 0))
        this[_hand].grabbedVelocity.copy(pos).sub(this[_hand].lastGrabbedPos).multiplyScalar(500 / timeDelta)
        this[_hand].lastGrabbedPos.copy(pos)
      }
      if (hand === "head") this[_hand].gloveVelocity.copy(this[_hand].grabbedVelocity)
    }

    // Update The Matrix! 🐱‍💻
    this.el.object3D.updateWorldMatrix(true, true)
  },

  toggleGrab(hand = "head") {
    let _hand = "_" + hand
    if (this[_hand].grabbed) this.drop(hand)
    else this.grab(hand)
  },
  showpannel(){
    
  },

  grab(hand = "head") {
    let _hand = "_" + hand
    if (!this[_hand].ray) return
    if (this[_hand].grabbed) return
    let ray = this[_hand].ray.components.raycaster
    ray.refreshObjects()
    let hit = ray.intersections[0]
    if (hit && hit.el.components.grabbable) {
      if (hand === "head" && this.data.attractHand) this[_hand].ray.setAttribute("animation__pos", {
        property: "position",
        to: { x: 0, y: -0.125, z: 0 },
        dur: 256
      })
      this.dropObject(hit.el)
      this[_hand].grabbed = hit.el
      this[_hand].anchor.copyWorldPosRot(this[_hand].grabbed)
      this[_hand].anchor.components.body.commit()
      if (this[_hand].grabbed.components.body != null) {
        if (!this[_hand].grabbed.components.grabbable?.data.immovable)
          this[_hand].anchor.setAttribute("joint__grab", { body2: this[_hand].grabbed, type: "lock" })
        this[_hand].isPhysical = true
      } else {
        this[_hand].isPhysical = false
      }
      this[_hand].anchor.removeAttribute("animation__pos")
      this[_hand].anchor.removeAttribute("animation__rot")
      let delta = hit.distance
      if (hand === "head") delta -= 0.5
      else delta -= 0.09375
      if (this[_hand].grabbed.components.grabbable.data.fixed) {
        let pos = THREE.Vector3.temp().copy(this[_hand].grabbed.components.grabbable.data.fixedPosition)
        if (hand === "left") pos.x *= -1
        if (hand === "head") pos.x = 0
        let quat = THREE.Quaternion.temp().copy(this[_hand].ray.object3D.quaternion).conjugate()
        pos.applyQuaternion(quat)
        pos.z += -0.09375
        this[_hand].anchor.setAttribute("animation__pos", {
          property: "position",
          to: { x: pos.x, y: pos.y, z: pos.z },
          dur: 256
        })
        let rot = { x: 0, y: 0, z: 0 }
        if (hand === "left") rot.y = 45
        if (hand === "right") rot.y = -45
        this[_hand].anchor.setAttribute("animation__rot", {
          property: "rotation",
          to: rot,
          dur: 256
        })
      } else if (this.data.attractHand && !this[_hand].grabbed.components.grabbable?.data.immovable) {
        this[_hand].anchor.setAttribute("animation__pos", {
          property: "object3D.position.z",
          to: this[_hand].anchor.object3D.position.z + delta,
          dur: 256
        })
      }
      if (this.data.hideOnGrab || this[_hand].grabbed.components.grabbable.data.hideOnGrab)
        this[_hand].glove.setAttribute("visible", false)
      // if (this[_hand].glove.components.body)
      this[_hand].glove.setAttribute("body", "collidesWith", 0)
      this.emit("grab", this[_hand].glove, this[_hand].grabbed, { intersection: hit })
      this._grabCount = Math.min(2, this._grabCount + 1)
      this.el.addState("grabbing")
      this[_hand].grabbed.addState("grabbed")
      this.sticky = true
      console.log(this[_hand].grabbed +"is grabbe");
      this._flexFinger(hand, 5, 0, true)
      setTimeout(() => {
        let flexes = this[_hand].grabbed.components.grabbable.data.fingerFlex.map(x => parseFloat(x)) || [0.5]
        this._flexFinger(hand, 5, flexes.pop() || 0, true)
        let finger = 0
        for (let flex of flexes) this._flexFinger(hand, finger++, flex || 0, true)
        this.sticky = false
      }, 256)
    }
  },
  drop(hand = "head") {
    let _hand = "_" + hand
    if (this.sticky) return
    this[_hand].anchor.removeAttribute("animation__rot")
    this[_hand].anchor.removeAttribute("animation__pos")
    this[_hand].glove.setAttribute("visible", true)
    this[_hand].anchor.removeAttribute("joint__grab")
    this[_hand].anchor.setAttribute("position", "0 0 0")
    this[_hand].anchor.setAttribute("rotation", "0 0 0")
    setTimeout(() => {
      // if (this[_hand].glove.components.body)
      this[_hand].glove.setAttribute("body", "collidesWith", 1)
    }, 1024)
    if (this[_hand].grabbed) {
      this.emit("drop", this[_hand].glove, this[_hand].grabbed)
      this._grabCount = Math.max(0, this._grabCount - 1)
      if (!this._grabCount)
        this.el.removeState("grabbing")
      this._restoreUserFlex(hand)
      this[_hand].grabbed.removeState("grabbed")
      if (this[_hand].grabbed.components.grabbable?.data.kinematicGrab && !this[_hand].grabbed.components.grabbable?.data.immovable) {
        this[_hand].grabbed.components.body?.applyWorldImpulse(this[_hand].gloveVelocity, this[_hand].lastGlovePos)
        this[_hand].grabbed.components.body?.applyWorldImpulse(this[_hand].grabbedVelocity, this[_hand].lastGrabbedPos)
      }
      this[_hand].grabbed = null
      if (hand === "head") {
        this[_hand].ray.removeAttribute("animation__pos")
        this[_hand].ray.object3D.position.y = 0
      }
    }
  },
  dropObject(el) {
    for (let hand of this._hands) {
      let _hand = "_" + hand
      if (this[_hand].grabbed === el) this.drop(hand)
    }
  },
  use(hand = "head", button = 0) {
    let _hand = "_" + hand
    this.useDown(hand, button)
    setTimeout(() => {
      this.useUp(hand, button)
    }, 32)
  },
  useDown(hand = "head", button = 0) {
    let _hand = "_" + hand
    // if (!this[_hand].grabbed) return this.grab(hand)
    if (this[_hand].grabbed) {
      this._flexFinger(hand, Math.max(0, 1 - button), 0.5, true)
      this.emit("usedown", this[_hand].glove, this[_hand].grabbed, { button: button })
    } else if (this[_hand]._lastButton) {
      this._flexFinger(hand, 0, 0.5, true)
      this[_hand]._lastClick = this[_hand]._lastButton
      this.emit("press", this[_hand].glove, this[_hand]._lastClick, { button: button })
      this[_hand]._lastClick.addState("pressed")
    } else {
      this.emit("usedown", this[_hand].glove, this[_hand].grabbed, { button: button })
    }
  },
  useUp(hand = "head", button = 0) {
    let _hand = "_" + hand
    if (this[_hand].grabbed) {
      this._flexFinger(hand, Math.max(0, 1 - button), 0, true)
      this.emit("useup", this[_hand].glove, this[_hand].grabbed, { button: button })
    } else if (this[_hand]._lastClick) {
      this._flexFinger(hand, 0, 0, true)
      this.emit("unpress", this[_hand].glove, this[_hand]._lastClick)
      this[_hand]._lastClick.removeState("pressed")
      this[_hand]._lastClick = null
    } else {
      this.emit("useup", this[_hand].glove, this[_hand].grabbed, { button: button })
    }
  },
  moveHeadHand(pz = 0, rx = 0, ry = 0, rz = 0) {
    this._head.anchor.object3D.position.z = Math.min(Math.max(-1.5, this._head.anchor.object3D.position.z + pz), -0.125)
    let quat = THREE.Quaternion.temp().set(rx, ry, rz, 1).normalize()
    this._head.anchor.object3D.quaternion.premultiply(quat)
  },

  emit(eventtype, glove, grabbed, e = {}) {
    e.grabbing = this.el
    e.grabbedElement = grabbed
    e.gloveElement = glove
    for (let _hand of this._hands) {
      if (this["_" + _hand].glove === glove) e.hand = _hand
    }
    glove.emit(eventtype, e, true)
    if (grabbed) grabbed.emit(eventtype, e, true)
  },

  _setReticle(mode) {
    if (!this._head.reticle) return
    if (this._head._reticleMode === mode) return
    let src = "data:image/gif;base64,R0lGODlhEAAQAPD/AAAAAP///yH5BAUKAAIALAAAAAAQABAAAAIVlI+py+0PIwQgghDqu9lqCYbiSBoFADs="
    switch (mode) {
      case "grab":
        src = "data:image/gif;base64,R0lGODlhEAAQAPD/AAAAAP///yH5BAUKAAIALAAAAAAQABAAAAI1lC8AyLkQgloMSotrVHsnhHWXdISS+DzRimIWy3Ii7CU0Tdn3mr93bvDBgMFfozg8OiaTQwEAOw=="
        break
      case "push":
        src = "data:image/gif;base64,R0lGODlhEAAQAPD/AAAAAP///yH5BAUKAAIALAAAAAAQABAAAAIylA1wywIRVGMvTgrlRTltl3Wao1RmB0YVxEYqu7ZwGstWbWdcPh94O0rZgjsZEZFIagoAOw=="
        break
    }
    this._head.reticle.setAttribute("src", src)
    this._head._reticleMode = mode
  },

  _enableHands() {
    this._setDevice("vrcontroller")
    for (let hand of this._hands) {
      let _hand = "_" + hand
      this[_hand].hand.removeEventListener("buttonchanged", this._enableHands)

      let boxsize = 0.0625
      this[_hand].glove.ensure(".hitbox", "a-box", { class: "hitbox", visible: false, position: "0 0 0.03125", width: boxsize / 2, height: boxsize, depth: boxsize * 2 })
      this[_hand].glove.setAttribute("body", "type:kinematic;")

      if (hand === "head") continue
      this[_hand]._occlusionRay = this.el.sceneEl.ensure(".occlusion-ray." + hand, "a-entity", {
        class: "occlusion-ray " + hand,
        raycaster: {deep:true,
          objects: "[wall]",
          autoRefresh: false
        }
      })

      let palm = this[_hand].glove.querySelector(".palm") || this[_hand].glove
      this[_hand].ray = palm.ensure(".grabbing.ray", "a-entity", {
        class: "grabbing ray", position: hand === "left" ? "-0.0625 0 0.0625" : "0.0625 0 0.0625", rotation: hand === "left" ? "0 -45 0" : "0 45 0",
        raycaster: {deep:true,
          objects: "[wall], [grabbable]",
          autoRefresh: false,
          // showLine: true,
        }
      })
      this[_hand].buttonRay = palm.ensure(".button.ray", "a-entity", {
        class: "button ray", position: "0 0.03125 0",
        raycaster: {deep:true,
          objects: "[wall], [button], [gui-interactable]",
          far: 0.5,
          autoRefresh: false,
          // showLine: true,
        }
      })
      this[_hand].anchor = this[_hand].ray.ensure(".grabbing.anchor", "a-entity", { class: "grabbing anchor", visible: "false", body: "type:kinematic;autoShape:false;" })
      this[_hand].glove.setAttribute("visible", true)
    }

    this._head.ray = null
    this._head.buttonRay = null
    this._head.reticle.setAttribute("position", "0 0 1")
    this._head.reticle.setAttribute("visible", "false")
    this._head.reticle = null
    this.update()
  },

  _flexFinger(hand, finger, flex, priority = false) {
    let _hand = "_" + hand
    this[_hand].userFlex = this[_hand].userFlex || []
    if (priority) this[_hand].priorityFlex = true
    if (finger < 5) {
      if (priority || !this[_hand].priorityFlex) this.emit("fingerflex", this[_hand].glove, this[_hand].grabbed, { hand: hand, finger: finger, flex: flex })
      if (!priority) this[_hand].userFlex[finger] = flex
    } else {
      for (finger -= 5; finger < 5; finger++) {
        if (priority || !this[_hand].priorityFlex) this.emit("fingerflex", this[_hand].glove, this[_hand].grabbed, { hand: hand, finger: finger, flex: flex })
        if (!priority) this[_hand].userFlex[finger] = flex
      }
    }
  },
  _restoreUserFlex(hand) {
    let _hand = "_" + hand
    this[_hand].userFlex = this[_hand].userFlex || []
    this[_hand].priorityFlex = false
    for (let finger = 0; finger < 5; finger++) {
      let flex = this[_hand].userFlex[finger] || 0
      this.emit("fingerflex", this[_hand].glove, this[_hand].grabbed, { hand: hand, finger: finger, flex: flex })
    }
  },

  _onKeyDown(e) {
    if (e.code === "KeyE" && !this._keysDown[e.code]) {
      this._setDevice("desktop")
      this.grab()
    }
    if (e.code === "KeyM" && !this._keysDown[e.code]) {
      this._setDevice("desktop")
      this.shoepannel()
    }
    
    this._keysDown[e.code] = true
  },
  _onKeyUp(e) {
    if (e.code === "KeyE" && this._keysDown[e.code]) {
      this.drop()
    }
    this._keysDown[e.code] = false
  },
  _onMouseDown(e) {
    this._setDevice("desktop")
    let btn = e.button
    this.useDown("head", btn ? ((btn % 2) ? btn + 1 : btn - 1) : btn)
  },
  _onWheel(e) {
    this._setDevice("desktop")
    let x = 0, y = 0, z = 0
    if (this._keysDown["Digit3"] && e.deltaY > 0) z += -0.125
    if (this._keysDown["Digit3"] && e.deltaY < 0) z += 0.125
    if (this._keysDown["Digit2"] && e.deltaY > 0) y += -0.125
    if (this._keysDown["Digit2"] && e.deltaY < 0) y += 0.125
    if (this._keysDown["Digit1"] && e.deltaY > 0) x += 0.125
    if (this._keysDown["Digit1"] && e.deltaY < 0) x += -0.125
    if (x || y || z) return this.moveHeadHand(0, x, y, z)
    if (e.deltaY > 0) return this.moveHeadHand(0.125)
    if (e.deltaY < 0) return this.moveHeadHand(-0.125)
  },
  _onMouseUp(e) {
    let btn = e.button
    this.useUp("head", btn ? ((btn % 2) ? btn + 1 : btn - 1) : btn)
  },
  _onTouchTap(e) {
    this._setDevice("touch")
    this.use()
  },
  _onTouchHold(e) {
    this._setDevice("touch")
    this.toggleGrab()
  },
  _onButtonChanged(e) {
    this._setDevice("vrcontroller")
    let hand = e.srcElement.getAttribute("tracked-controls").hand
    let _hand = "_" + hand
    let finger = -1
    let flex = 0
    if (e.detail.state.touched) flex = 0.5
    if (e.detail.state.pressed) flex = 1
    if (e.detail.state.value) flex = 0.5 + e.detail.state.value / 2
    this._btnFlex[hand + e.detail.id] = flex
    switch (e.detail.id) {
      case 0: // Trigger
        finger = 1
        if (e.detail.state.pressed && !this._btnPress[hand + e.detail.id]) this.useDown(hand)
        if (!e.detail.state.pressed && this._btnPress[hand + e.detail.id]) this.useUp(hand)
        break
      case 1: // Grip
        if (flex <= 0 || flex >= 1) {
          finger = 7
          this._fist = flex > 0.5
        } else {
          this._flexFinger(hand, 2, this._fist ? 0 : 1)
          finger = 3
        }
        if (e.detail.state.pressed && !this._btnPress[hand + e.detail.id]) this.grab(hand)
        if (!e.detail.state.pressed && this._btnPress[hand + e.detail.id]) this.drop(hand)
        break
      case 3: // Thumbstick
        finger = 0
        flex = Math.max(this._btnFlex[hand + 3] || 0, this._btnFlex[hand + 4] || 0, this._btnFlex[hand + 5] || 0)
        break
      case 4: // A/X
        finger = 0
        flex = Math.max(this._btnFlex[hand + 3] || 0, this._btnFlex[hand + 4] || 0, this._btnFlex[hand + 5] || 0)
        if (e.detail.state.pressed && !this._btnPress[hand + e.detail.id]) this.useDown(hand, 1)
        if (!e.detail.state.pressed && this._btnPress[hand + e.detail.id]) this.useUp(hand, 1)
        break
      case 5: // B/Y
        finger = 0
        flex = Math.max(this._btnFlex[hand + 3] || 0, this._btnFlex[hand + 4] || 0, this._btnFlex[hand + 5] || 0)
        if (e.detail.state.pressed && !this._btnPress[hand + e.detail.id]) this.useDown(hand, 2)
        if (!e.detail.state.pressed && this._btnPress[hand + e.detail.id]) this.useUp(hand, 2)
        break
    }
    this._btnPress[hand + e.detail.id] = e.detail.state.pressed
    this._flexFinger(hand, finger, flex)
  },

  _setDevice(device) {
    if (this.device === device) return
    this.el.removeState(this.device || "noinput")
    this.device = device
    this.el.addState(this.device || "noinput")
  }
})

require("./grabbing/button")
require("./grabbing/climbable")
require("./grabbing/fingerflex")
require("./grabbing/grabbable")
require("./grabbing/receptacle")

},{"./grabbing/button":9,"./grabbing/climbable":10,"./grabbing/fingerflex":11,"./grabbing/grabbable":12,"./grabbing/receptacle":13}],9:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("button", {
  schema: {
  },

})

},{}],10:[function(require,module,exports){
/* global AFRAME, THREE */

let currentClimb

AFRAME.registerComponent("climbable", {
  dependencies: ["wall"],
  schema: {
  },

  init() {
    this.el.setAttribute("grabbable", "physics:false; kinematicGrab:false; immovable:true;")
    this._player = this.el.sceneEl.querySelector("[locomotion]")
    this._localAnchor = new THREE.Vector3()

    this._onBump = this._onBump.bind(this)
  },

  play() {
    this._player.addEventListener("bump", this._onBump)
  },
  pause() {
    this._player.removeEventListener("bump", this._onBump)
    this._climbing = false
  },

  tick() {
    if (!this._floating) return
    this._player.components.locomotion.stopFall()
    if (!this._climbing) return
    let worldAnchor = THREE.Vector3.temp().copy(this._localAnchor)
    let handPos = THREE.Vector3.temp().set(0, 0, 0)
    let delta = THREE.Vector3.temp()

    this.el.object3D.localToWorld(worldAnchor)
    this._hand.object3D.localToWorld(handPos)
    delta.copy(worldAnchor).sub(handPos).multiplyScalar(0.5)

    this._player.components.locomotion.move(delta)
  },

  events: {
    grab(e) {
      if (currentClimb && currentClimb !== this.el) this._player.components.grabbing.dropObject(currentClimb)
      currentClimb = this.el
      this._climbing = true
      this._floating = true
      this._handName = e.detail.hand
      this._hand = e.detail.gloveElement.parentNode
      this._localAnchor.copy(e.detail.intersection.point)
      this.el.object3D.worldToLocal(this._localAnchor)
      if (this._handName === "head") {
        this._hand = this._hand.querySelector(".anchor")
        this._hand.object3D.position.set(0, 0, -e.detail.intersection.distance)
      }
      this._player.components.locomotion.jump()
      setTimeout(() => {
        this.el.sceneEl.querySelector(".legs")?.object3D.position.copy(this._player.components.locomotion.headPos)
      })
      clearTimeout(this._autoCrouchTO)
    },
    drop(e) {
      this._climbing = false
      setTimeout(() => {
        this.el.sceneEl.querySelector(".legs")?.object3D.position.copy(this._player.components.locomotion.headPos)
      })
      clearTimeout(this._autoCrouchTO)
      this._autoCrouchTO = setTimeout(() => {
        this._floating = false
        this._player.components.locomotion.toggleCrouch(true)
      }, this._handName === "head" ? 1024 : 256)
      currentClimb = null
    },
  },

  _onBump(e) {
    this._climbing = false
    clearTimeout(this._autoCrouchTO)
    this._autoCrouchTO = setTimeout(() => {
      this._floating = false
    }, 1024)
    this._player.components.grabbing.dropObject(this.el)
  },
})

},{}],11:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("fingerflex", {
  schema: {
    min: { type: "number", default: 10 },
    max: { type: "number", default: 90 },
  },

  init() {
    this._fingers = ["thumb", "index", "middle", "ring", "little"]
    this._currentFlex = [0, 0, 0, 0, 0]
    this._targetFlex = [0, 0, 0, 0, 0]
  },

  tick(time, timeDelta) {
    for (let finger = 0; finger < 5; finger++) {
      let name = this._fingers[finger]
      let current = this._currentFlex[finger]
      let target = this._targetFlex[finger]

      current = current + Math.random() * Math.random() * (target - current)
      let degrees = this.data.min + current * (this.data.max - this.data.min)
      let bend = this.el.querySelector(".bend." + name)
      while (bend) {
        let rot = bend.getAttribute("rotation")
        rot.y = degrees
        bend.setAttribute("rotation", rot)
        bend = bend.querySelector(".bend")
      }

      this._currentFlex[finger] = current
    }
  },

  events: {
    fingerflex(e) {
      this._targetFlex[e.detail.finger] = e.detail.flex
    }
  }
})

},{}],12:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("grabbable", {
  schema: {
    physics: { type: "boolean", default: true },
    kinematicGrab: { type: "boolean", default: true },
    hideOnGrab: { type: "boolean", default: false },
    fixed: { type: "boolean", default: false },
    fixedPosition: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
    fingerFlex: { type: "array", default: [0.5] },
    immovable: { type: "boolean", default: false },
    avoidWalls: { type: "boolean", default: true },
  },

  init() {
    if (this.data.physics && !this.el.components.body) this.el.setAttribute("body", "type:dynamic;")
  },

  events: {
    grab(e) {
      if (e.detail.hand !== "head") {
        this._grabbed = e.detail
        this._glove = e.detail.gloveElement
        this._anchor = this._glove.querySelector(".anchor")
      }
      if (this.data.kinematicGrab) this.el.setAttribute("body", "type", "kinematic")
    },
    drop(e) {
      this._grabbed = false
      if (this.data.physics) this.el.setAttribute("body", "type", "dynamic")
    },
    limited(e) {
      if (this._grabbed) {
        let delta = THREE.Vector3.temp()
        let quat = THREE.Quaternion.temp()
        this._glove.copyWorldPosRot(this.el)
        let el = this._anchor
        while (el !== this._glove) {
          quat.copy(el.object3D.quaternion).conjugate()
          this._glove.object3D.quaternion.multiply(quat)
          el = el.parentNode
        }
        this._glove.object3D.updateWorldMatrix(true, true)
        delta.copy(this._anchor.object3D.position)
        this._anchor.object3D.parent.localToWorld(delta)
        this._glove.object3D.worldToLocal(delta)
        this._glove.object3D.position.sub(delta)
      }
    },
  }
})

},{}],13:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("receptacle", {
  schema: {
    objects: { type: "string", default: "[grabbable]" },
    radius: { type: "number", default: 0.125 },
    onlyGrabbed: { type: "boolean", default: false },
    autoDrop: { type: "boolean", default: false },
  },

  init() {
    this._anchor = this.el.ensure(".receptacle.anchor", "a-entity", {
      class: "receptacle anchor",
      body: "type:kinematic;autoShape:false;"
    })
    this._refreshTO = setInterval(this.refreshObjects.bind(this), 1024)
  },

  remove() {
    clearInterval(this._refreshTO)
  },

  tick() {
    if (!this.nearest) return this.refreshObjects()
    let thisPos = THREE.Vector3.temp()
    let delta = THREE.Vector3.temp()
    this.el.object3D.localToWorld(thisPos.set(0, 0, 0))
    this.nearest.object3D.localToWorld(delta.set(0, 0, 0))
    delta.sub(thisPos)
    if (this._lastNearest && this._lastNearest !== this.nearest) {
      if (this.el.is("occupied")) {
        this._anchor.removeAttribute("joint__put")
        this._anchor.removeAttribute("animation__pos")
        this._anchor.removeAttribute("animation__rot")
        this.el.removeState("occupied")
        this._lastNearest.removeState("put")
        this.el.emit("take", {
          grabbable: this._lastNearest
        })
        this._lastNearest.emit("take", {
          receptacle: this.el
        })
      }
      if (this._hover) {
        this.el.emit("unhover", {
          grabbable: this._lastNearest
        })
        this._lastNearest.emit("unhover", {
          receptacle: this.el
        })
      }
      this._hover = false
      this._grabbed = false
    } else if (delta.length() > this.data.radius) {
      if (this.el.is("occupied")) {
        this._anchor.removeAttribute("joint__put")
        this._anchor.removeAttribute("animation__pos")
        this._anchor.removeAttribute("animation__rot")
        this.el.removeState("occupied")
        this.nearest.removeState("put")
        this.el.emit("take", {
          grabbable: this.nearest
        })
        this.nearest.emit("take", {
          receptacle: this.el
        })
      }
      if (this._hover) {
        this.el.emit("unhover", {
          grabbable: this.nearest
        })
        this.nearest.emit("unhover", {
          receptacle: this.el
        })
      }
      this._hover = false
      this._grabbed = false
    } else if (this.nearest.is("grabbed") || !this._hover) {
      if (!this._hover) {
        this.el.emit("hover", {
          grabbable: this.nearest
        })
        this.nearest.emit("hover", {
          receptacle: this.el
        })
        if (this.data.autoDrop && this._grabber) this._grabber.dropObject(this.nearest)
      }
      this._anchor.removeAttribute("animation__pos")
      this._anchor.removeAttribute("animation__rot")
      this._anchor.copyWorldPosRot(this.nearest)
      this._hover = true
      if (this.nearest.is("grabbed"))
        this._grabbed = true
    } else if (this._grabbed || !this.data.onlyGrabbed) {
      if (!this.el.is("occupied")) {
        this._anchor.copyWorldPosRot(this.nearest)
        this._anchor.components.body.commit()
        if (this.nearest.components.body)
          this._anchor.setAttribute("joint__put", { body2: this.nearest, type: "lock" })
        this.el.addState("occupied")
        this.nearest.addState("put")
        this.el.emit("put", {
          grabbable: this.nearest
        })
        this.nearest.emit("put", {
          receptacle: this.el
        })
      }
      if (!this._anchor.getAttribute("animation__pos")) {
        this._anchor.setAttribute("animation__pos", {
          property: "position",
          to: { x: 0, y: 0, z: 0 },
          dur: 256
        })
        this._anchor.setAttribute("animation__rot", {
          property: "rotation",
          to: { x: 0, y: 0, z: 0 },
          dur: 256
        })
      }
      this.nearest.copyWorldPosRot(this._anchor)
      this._hover = true
    }
    this._lastNearest = this.nearest
  },

  refreshObjects() {
    let shortest = Infinity
    let thisPos = THREE.Vector3.temp()
    let thatPos = THREE.Vector3.temp()
    let delta = THREE.Vector3.temp()
    let els = this.el.sceneEl.querySelectorAll(this.data.objects)
    this.nearest = null
    if (!els) return
    this.el.object3D.localToWorld(thisPos.set(0, 0, 0))
    els.forEach(el => {
      el.object3D.localToWorld(thatPos.set(0, 0, 0))
      delta.copy(thatPos).sub(thisPos)
      if (shortest > delta.length()) {
        shortest = delta.length()
        this.nearest = el
      }
    })

    this._grabber = this.el.sceneEl.querySelector("[grabbing]")?.components.grabbing
  },


})

},{}],14:[function(require,module,exports){
(function() {
  // We need to set some default styles on form elements for consistency when rendering to canvas
  var inputStyles = document.createElement("style");
  inputStyles.innerHTML = "input, select,textarea{border: 1px solid #000000;margin: 0;background-color: #ffffff;-webkit-appearance: none;}:-webkit-autofill {color: #fff !important;}input[type='checkbox']{width: 20px;height: 20px;display: inline-block;}input[type='radio']{width: 20px;height: 20px;display: inline-block;border-radius: 50%;}input[type='checkbox'][checked],input[type='radio'][checked]{background-color: #555555;}a-entity[htmlembed] img{display:inline-block}a-entity[htmlembed]{display:none}";
  var head = document.querySelector("head");
  head.insertBefore(inputStyles, head.firstChild);
})();

class HTMLCanvas {
  constructor(html, updateCallback, eventCallback) {
    if (!html) throw "Container Element is Required";

    this.updateCallback = updateCallback;
    this.eventCallback = eventCallback;

    // Create the canvas to be drawn to
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set some basic styles for the embed HTML
    this.html = html;
    this.html.style.display = 'block';
    this.width = 0;
    this.height = 0;
    this.html.style.display = 'none';
    this.html.style.position = 'absolute';
    this.html.style.top = '0';
    this.html.style.left = '0';
    this.html.style.overflow = 'hidden';


    // We have to stop propergation of the mouse at the root of the embed HTML otherwise it may effect other elements of the page
    this.mousemovehtml = (e) => {
      e.stopPropagation();
    }
    this.html.addEventListener('mousemove', this.mousemovehtml);

    // We need to change targethack when windows has location changes
    this.hashChangeEvent = () => {
      this.hashChanged();
    }
    window.addEventListener('hashchange', this.hashChangeEvent, false);


    this.overElements = []; // Element currently in the hover state

    this.focusElement = null; // The element that currently has focus

    // Image used to draw SVG to the canvas element
    this.img = new Image;
    // When image content has changed render it to the canvas
    this.img.addEventListener("load", () => {
      this.render();
    });

    // Add css hacks to current styles to ensure that the styles can be rendered to canvas
    this.csshack();

    // Timer used to limit the re-renders due to DOM updates
    var timer;

    // Setup the mutation observer
    var callback = (mutationsList, observer) => {
      // Don't update if we are manipulating DOM for render
      if (this.nowatch) return;

      for (var i = 0; i < mutationsList.length; i++) {
        // Skip the emebed html element if attributes change
        if (mutationsList[i].target == this.html && mutationsList[i].type == "attributes") continue;

        // If a class changes has no style change then there is no need to rerender
        if (!mutationsList[i].target.styleRef || mutationsList[i].attributeName == "class") {
          var styleRef = this.csssig(mutationsList[i].target);
          if (mutationsList[i].target.styleRef == styleRef) {
            continue;
          }
          mutationsList[i].target.styleRef = styleRef;
        }

        // Limit render rate so if we get multiple updates per frame we only do once.
        if (!timer) {
          timer = setTimeout(() => {
            this.svgToImg();
            timer = false;
          });
        }
      }
    };

    var config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    var observer = new MutationObserver(callback);
    observer.observe(this.html, config);
    this.observer = observer;

    this.cssgenerated = []; // Remeber what css sheets have already been passed
    this.cssembed = []; // The text of the css to included in the SVG to render

    this.serializer = new XMLSerializer();

    // Trigger an initially hash change to set up targethack classes
    this.hashChanged();
  }

  // Forces a complete rerender
  forceRender() {
    // Clear any class hash as this may have changed
    Array.from(document.querySelectorAll('*')).map((ele) => ele.classCache = {});
    // Load the svg to the image
    this.svgToImg();
  }

  // Updates the targethack class when a Hash is changed
  hashChanged() {
    if (window.clearedHash != window.location.hash) {
      Array.from(document.querySelectorAll('*')).map((ele) => ele.classCache = {});
      var currentTarget = document.querySelector('.targethack');
      if (currentTarget) {
        currentTarget.classList.remove('targethack');
      }
      if (window.location.hash) {
        var newTarget = document.querySelector(window.location.hash);
        if (newTarget) {
          newTarget.classList.add('targethack');
        }
      }
    }
    window.clearedHash = window.location.hash;
    this.svgToImg();
  }

  // Cleans up all eventlistners, etc when they are no longer needed
  cleanUp() {
    // Stop observing for changes
    this.observer.disconnect();

    // Remove event listeners
    window.removeEventListener('hashchange', this.hashChangeEvent, );
    this.html.addEventListener('mousemove', this.mousrmovehtml);
  }

  // Add hack css rules to the page so they will update the css styles of the embed html
  csshack() {
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
      try {
        var rules = sheets[i].cssRules;
        var toadd = [];
        for (var j = 0; j < rules.length; j++) {
          if (rules[j].cssText.indexOf(':hover') > -1) {
            toadd.push(rules[j].cssText.replace(new RegExp(":hover", "g"), ".hoverhack"))
          }
          if (rules[j].cssText.indexOf(':active') > -1) {
            toadd.push(rules[j].cssText.replace(new RegExp(":active", "g"), ".activehack"))
          }
          if (rules[j].cssText.indexOf(':focus') > -1) {
            toadd.push(rules[j].cssText.replace(new RegExp(":focus", "g"), ".focushack"))
          }
          if (rules[j].cssText.indexOf(':target') > -1) {
            toadd.push(rules[j].cssText.replace(new RegExp(":target", "g"), ".targethack"))
          }
          var idx = toadd.indexOf(rules[j].cssText);
          if (idx > -1) {
            toadd.splice(idx, 1);
          }
        }
        for (var j = 0; j < toadd.length; j++) {
          sheets[i].insertRule(toadd[j]);
        }
      } catch (e) {}
    }
  }

  // Simple hash function used for style signature
  dbj2(text) {
    var hash = 5381,
      c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      hash = ((hash << 5) + hash) + c;
    }
    return hash;
  }

  // Generate a singature for the current styles so we know if updated
  csssig(el) {
    if (!el.classCache) el.classCache = {};
    if (!el.classCache[el.className]) {
      var styles = getComputedStyle(el);
      var style = "";
      for (var i = 0; i < styles.length; i++) {
        style += styles[styles[i]];
      }
      el.classCache[el.className] = this.dbj2(style);
    }
    return el.classCache[el.className];
  }

  // Does what it says on the tin
  arrayBufferToBase64(bytes) {
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Get an embeded version of the css for use in img svg
  // url - baseref of css so we know where to look up resourses
  // css - string content of the css
  embedCss(url, css) {
    return new Promise(resolve => {
      var found;
      var promises = [];

      // Add hacks to get selectors working on img
      css = css.replace(new RegExp(":hover", "g"), ".hoverhack");
      css = css.replace(new RegExp(":active", "g"), ".activehack");
      css = css.replace(new RegExp(":focus", "g"), ".focushack");
      css = css.replace(new RegExp(":target", "g"), ".targethack");

      // Replace all urls in the css
      const regEx = RegExp(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/gi);
      while (found = regEx.exec(css)) {
        promises.push(
          this.getDataURL(new URL(found[1], url)).then(((found) => {
            return url => {
              css = css.replace(found[1], url);
            };
          })(found))
        );
      }
      Promise.all(promises).then((values) => {
        resolve(css);
      });
    });
  }

  // Does what is says on the tin
  getURL(url) {
    url = (new URL(url, window.location)).href;
    return new Promise(resolve => {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);

      xhr.responseType = 'arraybuffer';

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.send();

    })
  }

  // Generate the embed page CSS from all the page styles
  generatePageCSS() {
    // Fine all elements we are intrested in
    var elements = Array.from(document.querySelectorAll("style, link[type='text/css'],link[rel='stylesheet']"));
    var promises = [];
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (this.cssgenerated.indexOf(element) == -1) {
        // Make sure all css hacks have been applied to the page
        this.csshack();
        // Get embed version of style elements
        var idx = this.cssgenerated.length;
        this.cssgenerated.push(element);
        if (element.tagName == "STYLE") {
          promises.push(
            this.embedCss(window.location, element.innerHTML).then(((element, idx) => {
              return css => {
                this.cssembed[idx] = css;
              }
            })(element, idx))
          );
        } else {
          // Get embeded version of externally link stylesheets
          promises.push(this.getURL(element.getAttribute("href")).then(((idx) => {
            return xhr => {
              var css = new TextDecoder("utf-8").decode(xhr.response);
              return this.embedCss(window.location, css).then(((element, idx) => {
                return css => {
                  this.cssembed[idx] = css;
                }
              })(element, idx))
            };
          })(idx))
          );
        }
      }
    }
    return Promise.all(promises);
  }

  // Generate and returns a dataurl for the given url
  getDataURL(url) {
    return new Promise(resolve => {
      this.getURL(url).then(xhr => {
        var arr = new Uint8Array(xhr.response);
        var contentType = xhr.getResponseHeader("Content-Type").split(";")[0];
        if (contentType == "text/css") {
          var css = new TextDecoder("utf-8").decode(arr);
          this.embedCss(url, css).then((css) => {
            var base64 = window.btoa(css);
            if (base64.length > 0) {
              var dataURL = 'data:' + contentType + ';base64,' + base64;
              resolve(dataURL);
            } else {
              resolve('');
            }
          });
        } else {
          var b64 = this.arrayBufferToBase64(arr);
          var dataURL = 'data:' + contentType + ';base64,' + b64;
          resolve(dataURL);
        }
      });
    });
  }

  // Embeds and externally linked elements for rendering to img
  embededSVG() {
    var promises = [];
    var elements = this.html.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) {

      // convert and xlink:href to standard href
      var link = elements[i].getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (link) {
        promises.push(this.getDataURL(link).then(((element) => {
          return dataURL => {
            element.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
            element.setAttribute("href", dataURL);
          };
        })(elements[i])));
      }

      // Convert and images to data url
      if (elements[i].tagName == "IMG" && elements[i].src.substr(0, 4) != "data") {
        promises.push(this.getDataURL(elements[i].src).then(((element) => {
          return dataURL => {
            element.setAttribute("src", dataURL);
          };
        })(elements[i])));
      }

      // If there is a style attribute make sure external references are converted to dataurl
      if (elements[i].namespaceURI == "http://www.w3.org/1999/xhtml" && elements[i].hasAttribute("style")) {
        var style = elements[i].getAttribute("style");
        promises.push(
          this.embedCss(window.location, style).then(((style, element) => {
            return (css) => {
              if (style != css) element.setAttribute("style", css);
            }
          })(style, elements[i]))
        );
      }
    }
    // If there are any inline style within the embeded html make sure they have the selector hacks
    var styles = this.html.querySelectorAll("style");
    for (var i = 0; i < styles.length; i++) {
      promises.push(
        this.embedCss(window.location, styles[i].innerHTML).then(((style) => {
          return (css) => {
            if (style.innerHTML != css) style.innerHTML = css;
          }
        })(styles[i]))
      );
    }
    return Promise.all(promises)
  }

  // Override elements focus and blur functions as these do not perform as expected when embeded html is not being directly displayed
  updateFocusBlur() {
    var allElements = this.html.querySelectorAll("*");
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.tabIndex > -1) {
        if (!element.hasOwnProperty('focus')) {
          element.focus = ((element) => {
            return () => this.setFocus(element);
          })(element)
        }
        if (!element.hasOwnProperty('blur')) {
          element.blur = ((element) => {
            return () => this.focusElement == element ? this.setBlur() : false;
          })(element)
        }
      } else {
        delete(element.focus);
        delete(element.blur);
      }
    }
  }

  // Get all parents of the embeded html as these can effect the resulting styles
  getParents() {
    var opens = [];
    var closes = [];
    var parent = this.html.parentNode;
    do {
      var tag = parent.tagName.toLowerCase();
      if (tag.substr(0, 2) == 'a-') tag = 'div'; // We need to replace A-Frame tags with div as they're not valid xhtml so mess up the rendering of images
      var open = '<' + (tag == 'body' ? 'body xmlns="http://www.w3.org/1999/xhtml"' : tag) + ' style="transform: none;left: 0;top: 0;position:static;display: block" class="' + parent.className + '"' + (parent.id ? ' id="' + parent.id + '"' : '') + '>';
      opens.unshift(open);
      var close = '</' + tag + '>';
      closes.push(close);
      if (tag == 'body') break;
    } while (parent = parent.parentNode)
    return [opens.join(''), closes.join('')];
  }

  // If an element is checked make sure it has a checked attribute so it renders to the canvas
  updateCheckedAttributes() {
    var inputElements = this.html.getElementsByTagName("input");
    for (var i = 0; i < inputElements.length; i++) {
      var element = inputElements[i];
      if (element.hasAttribute("checked")) {
        if (!element.checked) element.removeAttribute("checked");
      } else {
        if (element.checked) element.setAttribute("checked", "");
      }
    }
  }

  // Set the src to be rendered to the Image
  svgToImg() {
    this.updateFocusBlur();
    Promise.all([this.embededSVG(), this.generatePageCSS()]).then(() => {
      // Make sure the element is visible before processing
      this.html.style.display = 'block';
      // If embeded html elements dimensions have change then update the canvas
      if (this.width != this.html.offsetWidth || this.height != this.html.offsetHeight) {
        this.width = this.html.offsetWidth;
        this.height = this.html.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        if (this.eventCallback) this.eventCallback('resized'); // Notify a resize has happened
      }
      var docString = this.serializer.serializeToString(this.html);
      var parent = this.getParents();
      docString = '<svg width="' + this.width + '" height="' + this.height + '" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}' + this.cssembed.join('') + ']]></style></defs><foreignObject x="0" y="0" width="' + this.width + '" height="' + this.height + '">' + parent[0] + docString + parent[1] + '</foreignObject></svg>';
      this.img.src = "data:image/svg+xml;utf8," + encodeURIComponent(docString);
      // Hide the html after processing
      this.html.style.display = 'none';
    });
  }

  // Renders the image containing the SVG to the Canvas
  render() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0);
    if (this.updateCallback) this.updateCallback();
    if (this.eventCallback) this.eventCallback('rendered');
  }

  // Transforms a point into an elements frame of reference
  transformPoint(elementStyles, x, y, offsetX, offsetY) {
    // Get the elements tranform matrix
    var transformcss = elementStyles["transform"];
    if (transformcss.indexOf("matrix(") == 0) {
      var transform = new THREE.Matrix4();
      var mat = transformcss.substring(7, transformcss.length - 1).split(", ").map(parseFloat);
      transform.elements[0] = mat[0];
      transform.elements[1] = mat[1];
      transform.elements[4] = mat[2];
      transform.elements[5] = mat[3];
      transform.elements[12] = mat[4];
      transform.elements[13] = mat[5];
    } else if (transformcss.indexOf("matrix3d(") == 0) {
      var transform = new THREE.Matrix4();
      var mat = transformcss.substring(9, transformcss.length - 1).split(", ").map(parseFloat);
      transform.elements = mat;
    } else {
      return [x, y, z]
    }
    // Get the elements tranform origin
    var origincss = elementStyles["transform-origin"];
    origincss = origincss.replace(new RegExp("px", "g"), "").split(" ").map(parseFloat);

    // Apply the transform to the origin
    var ox = offsetX + origincss[0];
    var oy = offsetY + origincss[1];
    var oz = 0;
    if (origincss[2]) oz += origincss[2];

    var T1 = new THREE.Matrix4().makeTranslation(-ox, -oy, -oz);
    var T2 = new THREE.Matrix4().makeTranslation(ox, oy, oz);

    transform = T2.multiply(transform).multiply(T1)
    
    // return if matrix determinate is not zero
    if(transform.determinant()!=0) return [x,y];
    
    // Inverse the transform so we can go from page space to element space
    var inverse = new THREE.Matrix4().getInverse(transform);

    // Calculate a ray in the direction of the plane
    var v1 = new THREE.Vector3(x, y, 0);
    var v2 = new THREE.Vector3(x, y, -1);
    v1.applyMatrix4(inverse);
    v2.applyMatrix4(inverse);
    var dir = v2.sub(v1).normalize();

    // If ray is parallel to the plane then there is no intersection
    if (dir.z == 0) {
      return false;
    }

    // Get the point of intersection on the element plane
    var result = dir.multiplyScalar(-v1.z / dir.z).add(v1);

    return [result.x, result.y];
  }

  // Get the absolute border radii for each corner
  getBorderRadii(element, style) {
    var properties = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'];
    var result;
    // Parse the css results
    var corners = [];
    for (var i = 0; i < properties.length; i++) {
      var borderRadiusString = style[properties[i]];
      var reExp = /(\d*)([a-z%]{1,3})/gi;
      var rec = [];
      while (result = reExp.exec(borderRadiusString)) {
        rec.push({
          value: result[1],
          unit: result[2]
        });
      }
      if (rec.length == 1) rec.push(rec[0]);
      corners.push(rec);
    }

    // Convertion values
    const unitConv = {
      'px': 1,
      '%': element.offsetWidth / 100
    };

    // Convert all corners into pixels
    var pixelCorners = [];
    for (var i = 0; i < corners.length; i++) {
      var corner = corners[i];
      var rec = []
      for (var j = 0; j < corner.length; j++) {
        rec.push(corner[j].value * unitConv[corner[j].unit]);
      }
      pixelCorners.push(rec);
    }

    // Initial corner point scales
    var c1scale = 1;
    var c2scale = 1;
    var c3scale = 1;
    var c4scale = 1;

    // Change scales of top left and top right corners based on offsetWidth
    var borderTop = pixelCorners[0][0] + pixelCorners[1][0];
    if (borderTop > element.offsetWidth) {
      var f = 1 / borderTop * element.offsetWidth;
      c1scale = Math.min(c1scale, f);
      c2scale = Math.min(c2scale, f);
    }

    // Change scales of bottom right and top right corners based on offsetHeight
    var borderLeft = pixelCorners[1][1] + pixelCorners[2][1];
    if (borderLeft > element.offsetHeight) {
      f = 1 / borderLeft * element.offsetHeight;
      c3scale = Math.min(c3scale, f);
      c2scale = Math.min(c2scale, f);
    }

    // Change scales of bottom left and bottom right corners based on offsetWidth
    var borderBottom = pixelCorners[2][0] + pixelCorners[3][0];
    if (borderBottom > element.offsetWidth) {
      f = 1 / borderBottom * element.offsetWidth;
      c3scale = Math.min(c3scale, f);
      c4scale = Math.min(c4scale, f);
    }

    // Change scales of bottom left and top right corners based on offsetHeight
    var borderRight = pixelCorners[0][1] + pixelCorners[3][1];
    if (borderRight > element.offsetHeight) {
      f = 1 / borderRight * element.offsetHeight;
      c1scale = Math.min(c1scale, f);
      c4scale = Math.min(c4scale, f);
    }

    // Scale the corners to fix within the confines of the element
    pixelCorners[0][0] = pixelCorners[0][0] * c1scale;
    pixelCorners[0][1] = pixelCorners[0][1] * c1scale;
    pixelCorners[1][0] = pixelCorners[1][0] * c2scale;
    pixelCorners[1][1] = pixelCorners[1][1] * c2scale;
    pixelCorners[2][0] = pixelCorners[2][0] * c3scale;
    pixelCorners[2][1] = pixelCorners[2][1] * c3scale;
    pixelCorners[3][0] = pixelCorners[3][0] * c4scale;
    pixelCorners[3][1] = pixelCorners[3][1] * c4scale;

    return pixelCorners;
  }

  // Check that the element is with the confines of rounded corners
  checkInBorder(element, style, x, y, left, top) {
    if (style['border-radius'] == "0px") return true;
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    var corners = this.getBorderRadii(element, style);

    // Check top left corner
    if (x < corners[0][0] + left && y < corners[0][1] + top) {
      var x1 = (corners[0][0] + left - x) / corners[0][0];
      var y1 = (corners[0][1] + top - y) / corners[0][1];
      if (x1 * x1 + y1 * y1 > 1) {
        return false;
      }
    }
    // Check top right corner
    if (x > left + width - corners[1][0] && y < corners[1][1] + top) {
      var x1 = (x - (left + width - corners[1][0])) / corners[1][0];
      var y1 = (corners[1][1] + top - y) / corners[1][1];
      if (x1 * x1 + y1 * y1 > 1) {
        return false;
      }
    }
    // Check bottom right corner
    if (x > left + width - corners[2][0] && y > top + height - corners[2][1]) {
      var x1 = (x - (left + width - corners[2][0])) / corners[2][0];
      var y1 = (y - (top + height - corners[2][1])) / corners[2][1];
      if (x1 * x1 + y1 * y1 > 1) {
        return false;
      }
    }
    // Check bottom left corner
    if (x < corners[3][0] + left && y > top + height - corners[3][1]) {
      var x1 = (corners[3][0] + left - x) / corners[3][0];
      var y1 = (y - (top + height - corners[3][1])) / corners[3][1];
      if (x1 * x1 + y1 * y1 > 1) {
        return false;
      }
    }
    return true;
  }

  // Check if element it under the current position
  // x,y - the position to check
  // offsetx, offsety - the current left and top offsets
  // offsetz - the current z offset on the current z-index
  // level - the current z-index
  // element - element being tested
  // result - the final result of the hover target
  checkElement(x, y, offsetx, offsety, offsetz, level, element, result) {
    // Return if this element isn't visible
    if (!element.offsetParent) return;

    var style = window.getComputedStyle(element);

    // Calculate absolute position and dimensions
    var left = element.offsetLeft + offsetx;
    var top = element.offsetTop + offsety;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    var zIndex = style['z-index'];
    if (zIndex != 'auto') {
      offsetz = 0;
      level = parseInt(zIndex);
    }

    // If the element isn't static the increment the offsetz
    if (style['position'] != 'static' && element != this.html) {
      if (zIndex == 'auto') offsetz += 1;
    }
    // If there is a transform then transform point
    if ((style['display'] == "block" || style['display'] == "inline-block") && style['transform'] != 'none') {
      // Apply css transforms to click point
      var newcoord = this.transformPoint(style, x, y, left, top);
      if (!newcoord) return;
      x = newcoord[0];
      y = newcoord[1];
      if (zIndex == 'auto') offsetz += 1;
    }
    // Check if in confines of bounding box
    if (x > left && x < left + width && y > top && y < top + height) {
      // Check if in confines of rounded corders
      if (this.checkInBorder(element, style, x, y, left, top)) {
        //check if above other elements
        if ((offsetz >= result.zIndex || level > result.level) && level >= result.level && style['pointer-events'] != "none") {
          result.zIndex = offsetz;
          result.ele = element;
          result.level = level;
        }
      }
    } else if (style['overflow'] != 'visible') {
      // If the element has no overflow and the point is outsize then skip it's children
      return;
    }
    // Check each of the child elements for intersection of the point
    var child = element.firstChild;
    if (child)
      do {
        if (child.nodeType == 1) {
          if (child.offsetParent == element) {
            this.checkElement(x, y, offsetx + left, offsety + top, offsetz, level, child, result);
          } else {
            this.checkElement(x, y, offsetx, offsety, offsetz, level, child, result);
          }
        }
      } while (child = child.nextSibling);
  }

  // Gets the element under the given x,y coordinates
  elementAt(x, y) {
    this.html.style.display = 'block';
    var result = {
      zIndex: 0,
      ele: null,
      level: 0
    };
    this.checkElement(x, y, 0, 0, 0, 0, this.html, result);
    this.html.style.display = 'none';
    return result.ele;
  }

  // Process a movment of the mouse
  moveMouse() {
    var x = this.moveX;
    var y = this.moveY;
    var button = this.moveButton;
    var mouseState = {
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y,
      button: button ? button : 0,
      bubbles: true,
      cancelable: true
    };
    var mouseStateHover = {
      clientX: x,
      clientY: y,
      button: button ? button : 0,
      bubbles: false
    };

    var ele = this.elementAt(x, y);
    // If the element under cusor isn't the same as lasttime then update hoverstates and fire off events
    if (ele != this.lastEle) {
      if (ele) {
        // If the element has a tabIndex then notify of a focusable enter
        if (ele.tabIndex > -1) {
          if (this.eventCallback) this.eventCallback('focusableenter', {
            target: ele
          });
        }
        // If the element has a tabIndex then notify of a focusable leave
        if (this.lastEle && this.lastEle.tabIndex > -1) {
          if (this.eventCallback) this.eventCallback('focusableleave', {
            target: this.lastEle
          });
        }
        var parents = [];
        var current = ele;
        if (this.lastEle) this.lastEle.dispatchEvent(new MouseEvent('mouseout', mouseState));
        ele.dispatchEvent(new MouseEvent('mouseover', mouseState));
        // Update overElements and fire corresponding events
        do {
          if (current == this.html) break;
          if (this.overElements.indexOf(current) == -1) {
            if (current.classList) current.classList.add("hoverhack");
            current.dispatchEvent(new MouseEvent('mouseenter', mouseStateHover));
            this.overElements.push(current);
          }
          parents.push(current);
        } while (current = current.parentNode);

        for (var i = 0; i < this.overElements.length; i++) {
          var element = this.overElements[i];
          if (parents.indexOf(element) == -1) {
            if (element.classList) element.classList.remove("hoverhack");
            element.dispatchEvent(new MouseEvent('mouseleave', mouseStateHover));
            this.overElements.splice(i, 1);
            i--;
          }
        }
      } else {
        while (element = this.overElements.pop()) {
          if (element.classList) element.classList.remove("hoverhack");
          element.dispatchEvent(new MouseEvent('mouseout', mouseState));
        }
      }
    }
    if (ele && this.overElements.indexOf(ele) == -1) this.overElements.push(ele);
    this.lastEle = ele;
    if (ele) ele.dispatchEvent(new MouseEvent('mousemove', mouseState));
    this.moveTimer = false;
  }

  // Move the mouse on the html element
  mousemove(x, y, button) {
    this.moveX = x;
    this.moveY = y;
    this.moveButton = button;
    // Limit frames rate of mouse move for performance
    if (this.moveTimer) return;
    this.moveTimer = setTimeout(this.moveMouse.bind(this), 20);
  }

  // Mouse down on the HTML Element
  mousedown(x, y, button) {
    var mouseState = {
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y,
      button: button ? button : 0,
      bubbles: true,
      cancelable: true
    };
    var ele = this.elementAt(x, y);
    if (ele) {
      this.activeElement = ele;
      ele.classList.add("activehack");
      ele.classList.remove("hoverhack");
      ele.dispatchEvent(new MouseEvent('mousedown', mouseState));
    }
    this.mousedownElement = ele;
  }

  // Sets the element that currently has focus
  setFocus(ele) {
    ele.dispatchEvent(new FocusEvent('focus'));
    ele.dispatchEvent(new CustomEvent('focusin', {
      bubbles: true,
      cancelable: false
    }));
    ele.classList.add('focushack');
    this.focusElement = ele;
  }

  // Blurs the element that currently has focus
  setBlur() {
    if (this.focusElement) {
      this.focusElement.classList.remove("focushack");
      this.focusElement.dispatchEvent(new FocusEvent('blur'));
      this.focusElement.dispatchEvent(new CustomEvent('focusout', {
        bubbles: true,
        cancelable: false
      }));
    }
  }

  // Clear all hover states
  clearHover() {
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
      this.moveTimer = false;
    }
    var element;
    while (element = this.overElements.pop()) {
      if (element.classList) element.classList.remove("hoverhack");
      element.dispatchEvent(new MouseEvent('mouseout', {
        bubbles: true,
        cancelable: true
      }));
    }
    if (this.lastEle) this.lastEle.dispatchEvent(new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true
    }));
    this.lastEle = null;
    var activeElement = document.querySelector(".activeElement");
    if (activeElement) {
      activeElement.classList.remove("activehack");
      this.activeElement = null;
    }
  }

  // Mouse up on the HTML Element
  mouseup(x, y, button) {
    var mouseState = {
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y,
      button: button ? button : 0,
      bubbles: true,
      cancelable: true
    };
    var ele = this.elementAt(x, y);
    if (this.activeElement) {
      this.activeElement.classList.remove("activehack");
      if(ele){
        ele.classList.add("hoverhack");
        if(this.overElements.indexOf(ele)==-1) this.overElements.push(ele);
      }
      this.activeElement = null;
    }
    if (ele) {
      ele.dispatchEvent(new MouseEvent('mouseup', mouseState));
      if (ele != this.focusElement) {
        this.setBlur();
        if (ele.tabIndex > -1) {
          this.setFocus(ele);
        } else {
          this.focusElement = null;
        }
      }

      if (ele == this.mousedownElement) {
        ele.dispatchEvent(new MouseEvent('click', mouseState));
        if (ele.tagName == "INPUT") this.updateCheckedAttributes();
        // If the element requires some sort of keyboard interaction then notify of an input requirment
        if (ele.tagName == "INPUT" || ele.tagName == "TEXTAREA" || ele.tagName == "SELECT") {
          if (this.eventCallback) this.eventCallback('inputrequired', {
            target: ele
          });
        }
      }
    } else {
      if (this.focusElement) this.focusElement.dispatchEvent(new FocusEvent('blur'));
      this.focusElement = null;
    }
  }
}

module.exports = HTMLCanvas;

},{}],15:[function(require,module,exports){
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

const HTMLCanvas = require('./htmlcanvas.js');

AFRAME.registerComponent('htmlembed', {
  schema: {
    ppu: {
      type: 'number',
      default: 256
    }
  },
  init: function() {
    var htmlcanvas = new HTMLCanvas(this.el, () => {
      if (texture) texture.needsUpdate = true;
    }, (event, data) => {
      switch (event) {
        case 'resize':
          this.el.emit("resize");
          break;
        case 'rendered':
          this.el.emit("rendered");
          break;
        case 'focusableenter':
          this.el.emit("focusableenter", data);
          break;
        case 'focusableleave':
          this.el.emit("focusableleave", data);
          break;
        case 'inputrequired':
          this.el.emit("inputrequired", data);
          break;
      }
    });
    this.htmlcanvas = htmlcanvas;
    var texture = new THREE.CanvasTexture(htmlcanvas.canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });
    var geometry = new THREE.PlaneGeometry();
    var screen = new THREE.Mesh(geometry, material);
    this.el.setObject3D('screen', screen);
    this.screen = screen;

    this.el.addEventListener('raycaster-intersected', evt => {
      this.raycaster = evt.detail.el;
    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {
      this.htmlcanvas.clearHover();
      this.raycaster = null;
    });
    this.el.addEventListener('mousedown', evt => {
      if (evt instanceof CustomEvent) {
        this.htmlcanvas.mousedown(this.lastX, this.lastY);
      } else {
        evt.stopPropagation();
      }
    });
    this.el.addEventListener('mouseup', evt => {
      if (evt instanceof CustomEvent) {
        this.htmlcanvas.mouseup(this.lastX, this.lastY);
      } else {
        evt.stopPropagation();
      }
    });
    this.resize();
  },
  resize() {
    this.width = this.htmlcanvas.width / this.data.ppu;
    this.height = this.htmlcanvas.height / this.data.ppu;
    this.screen.scale.x = Math.max(0.0001,this.width);
    this.screen.scale.y = Math.max(0.0001,this.height);
  },
  update() {
    this.resize();
  },
  forceRender() {
    this.htmlcanvas.forceRender();
  },
  tick: function() {
    this.resize();
    if (!this.raycaster) {
      return;
    }

    var intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) {
      return;
    }
    var localPoint = intersection.point;
    this.el.object3D.worldToLocal(localPoint);
    var w = this.width / 2;
    var h = this.height / 2;
    var x = Math.round((localPoint.x + w) / this.width * this.htmlcanvas.canvas.width);
    var y = Math.round((1 - (localPoint.y + h) / this.height) * this.htmlcanvas.canvas.height);
    if (this.lastX != x || this.lastY != y) {
      this.htmlcanvas.mousemove(x, y);
    }
    this.lastX = x;
    this.lastY = y;
  },
  remove: function() {
    this.el.removeObject3D('screen');
  }
});

},{"./htmlcanvas.js":14}],16:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("include", {
  schema: { type: "string" },

  async init() {
    if (this.data && !this.el.sceneEl._including_) {
      this.el.sceneEl._including_ = true
      let b4Content = this.el.outerHTML

      let p1 = b4Content.indexOf(" ")
      let p2 = b4Content.indexOf(" include=")
      let attrs = b4Content.substr(p1, p2 - p1)

      p1 = b4Content.indexOf("\"", p2 + 10) + 1
      p2 = b4Content.indexOf(">")
      attrs += b4Content.substr(p1, p2 - p1)

      let response = await fetch(this.data)
      if (response.status >= 200 && response.status < 300) {
        this.el.outerHTML = await (await (response).text()).replace(">", " >").replace(" ", " " + attrs + " ")
      }
      else {
        this.el.removeAttribute("include")
      }
      this.el.sceneEl._including_ = false
      let next = this.el.sceneEl.querySelector("[include]")
      if (next && next.components && next.components.include) next.components.include.init()
    }
  }
})

},{}],17:[function(require,module,exports){
AFRAME.registerComponent('injectfluo', {
    
    
  schema: {
    intensity:  { type: 'number', default: 0.3 }
    
  }
,
  init() { 
    console.log(this.el)
    this.el.innerHTML = `<a-light type="point"  0" intensity="`+this.data.intensity+`" penumbra="0.5"></a-light>`
        },
  update(oldData) {
    
  },

  tick(time, timeDelta) {
  }
})
},{}],18:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injectglove", {
  init() {
    if (!this.el.innerHTML.trim()) this.defaultGlove()
    let hand = this.el.getAttribute("side") || this.el.parentNode.getAttribute("side")
    this.el.ensure(".palm", "a-entity", {
      class: "palm",
      position: `${hand === "left" ? -0.01 : 0.01} -0.03 0.08`,
      rotation: "-35 0 0"
    })
    this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
  },

  defaultGlove() {
    let hand = this.el.getAttribute("side") || this.el.parentNode.getAttribute("side")
    let color = this.el.getAttribute("color") || this.el.parentNode.getAttribute("color") || "lightblue"
    if (!this.el.getAttribute("fingerflex")) this.el.setAttribute("fingerflex", {
      min: hand === "left" ? -10 : 10,
      max: hand === "left" ? -90 : 90,
    })
    this.el.innerHTML = `<a-box class="palm" color="${color}" position="${hand === "left" ? -0.01 : 0.01} -0.03 0.08" rotation="-35 0 0" width="0.02" height="0.08"
      depth="0.08">
      <a-entity position="0 0.04 0.02" rotation="80 0 ${hand === "left" ? -45 : 45}">
        <a-entity class="thumb bend">
          <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
            <a-entity class="bend" position="0 0 -0.02">
              <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
              </a-box>
            </a-entity>
          </a-box>
        </a-entity>
      </a-entity>
      <a-entity class="index bend" position="0 0.03 -0.04" rotation="3 0 0">
        <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
          <a-entity class="bend" position="0 0 -0.02">
            <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
            </a-box>
          </a-entity>
        </a-box>
      </a-entity>
      <a-entity class="middle bend" position="0 0.01 -0.04" rotation="1 0 0">
        <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
          <a-entity class="bend" position="0 0 -0.02">
            <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
            </a-box>
          </a-entity>
        </a-box>
      </a-entity>
      <a-entity class="ring bend" position="0 -0.01 -0.04" rotation="-1 0 0">
        <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
          <a-entity class="bend" position="0 0 -0.02">
            <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
            </a-box>
          </a-entity>
        </a-box>
      </a-entity>
      <a-entity class="little bend" position="0 -0.03 -0.04" rotation="-3 0 0">
        <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
          <a-entity class="bend" position="0 0 -0.02">
            <a-box color="${color}" position="0 0 -0.02" width="0.02" height="0.02" depth="0.04">
            </a-box>
          </a-entity>
        </a-box>
      </a-entity>
    </a-box>`
  },
})

},{}],19:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injectplayer", {

  init() {
    /*this.el.addState("noinput")
    this.el.ensure("#camera2", "a-camera", {
      "look-controls": { pointerLockEnabled: true, touchEnabled: false },
      "wasd-controls": { enabled: false }
    })
    this.el.ensure("a-hand[side=\"left\"]", "a-hand", { side: "left" })
    this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
    
    
    


  */
},


});

 


  

},{}],20:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("limit", {
  schema: {
    minPos: { type: "vec3" },
    maxPos: { type: "vec3" },
    rotationRange: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
  },

  tick() {
    let delta = THREE.Vector3.temp()
    let pos = this.el.object3D.position
    let minPos = this.data.minPos
    let maxPos = this.data.maxPos
    let quat = this.el.object3D.quaternion
    let minQuat = THREE.Quaternion.temp().set(
      -Math.abs(this.data.rotationRange.x),
      -Math.abs(this.data.rotationRange.y),
      -Math.abs(this.data.rotationRange.z),
      -1)
    let maxQuat = THREE.Quaternion.temp().set(
      Math.abs(this.data.rotationRange.x),
      Math.abs(this.data.rotationRange.y),
      Math.abs(this.data.rotationRange.z),
      1)
    delta.copy(pos)
    pos.set(
      Math.min(Math.max(minPos.x, pos.x), maxPos.x),
      Math.min(Math.max(minPos.y, pos.y), maxPos.y),
      Math.min(Math.max(minPos.z, pos.z), maxPos.z)
    )
    quat.set(
      Math.min(Math.max(minQuat.x, quat.x), maxQuat.x),
      Math.min(Math.max(minQuat.y, quat.y), maxQuat.y),
      Math.min(Math.max(minQuat.z, quat.z), maxQuat.z),
      Math.min(Math.max(minQuat.w, quat.w), maxQuat.w)
    ).normalize()
    delta.sub(pos)
    if (delta.length() > 0) {
      setTimeout(() => {
        this.el.components.body?.commit()
      })
      this.el.object3D.updateWorldMatrix(true, true)
      this.el.emit("limited")
    }
  },

  events: {
    drop(e) {

    }
  }

})

},{}],21:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("locomotion", {
  dependencies: ["position", "injectplayer"],
  schema: {
    speed: { type: "number", default: 4 },
    stepLength: { type: "number", default: 1 },
    rotationSpeed: { type: "number", default: 1 },
    teleportDistance: { type: "number", default: 5 },
    jumpForce: { type: "number", default: 4 },
    gravity: { type: "number", default: 10 },
    godMode: { type: "boolean", default: false }
  },

  init() {
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)
    this._onAxisMove = this._onAxisMove.bind(this)
    this._onButtonChanged = this._onButtonChanged.bind(this)
    this._onTouchStart = this._onTouchStart.bind(this)
    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
    this._onEnterVR = this._onEnterVR.bind(this)
    this._onExitVR = this._onExitVR.bind(this)

    this._keysDown = {}
    this._kbStick = new THREE.Vector2()
    this._axes = [0, 0, 0, 0]
    this._leftTouchCenter = new THREE.Vector2()
    this._leftTouchDir = new THREE.Vector2()
    this._rightTouchCenter = new THREE.Vector2()
    this._rightTouchDir = new THREE.Vector2()
    this._teleporting = true
    this._bumpOverload = 0
    this._vertVelocity = 1
    this.currentFloorPosition = new THREE.Vector3()
    this.centerPos = new THREE.Vector3()
    this.headPos = new THREE.Vector3()
    this.headDir = new THREE.Vector3()
    this.feetPos = new THREE.Vector3()
    this.lastStep = new THREE.Vector3()

    this._config = {
      quantizeMovement: false,
      quantizeRotation: false,
      quantizeMovementVR: !!(this.el.sceneEl.isMobile),
      quantizeRotationVR: true
    }
    if (this.el.sceneEl.is('vr-mode')) this._onEnterVR()
    else this._onExitVR()

    this._camera = this.el.querySelector("a-camera")
    this._leftHand = this.el.querySelector("a-hand[side=\"left\"]")
    this._rightHand = this.el.querySelector("a-hand[side=\"right\"]")
    this._legs = this.el.sceneEl.ensure(".legs", "a-entity", {
      class: "legs", position: "0 0.5 0", // radius: 0.125, color: "blue",
      raycaster: {
        deep: true,
        autoRefresh: false,
        objects: "[floor]",
        direction: "0 -1 0",
        far: 0.625,
        // showLine: true
      }
    })
    this._legBumper = this.el.sceneEl.ensure(".leg-bumper", "a-entity", {
      class: "leg-bumper", position: "0 0.5 0", // radius: 0.125, color: "red",
      raycaster: {
        deep: true,
        autoRefresh: false,
        objects: "[wall]",
        // showLine: true
      }
    })
    this._headBumper = this.el.sceneEl.ensure(".head-bumper", "a-entity", {
      class: "head-bumper", position: "0 0.5 0", // radius: 0.125, color: "green",
      raycaster: {
        deep: true,
        autoRefresh: false,
        objects: "[wall]",
        // showLine: true
      }
    })
    this._teleportBeam = this._camera.ensure(".teleport-ray", "a-entity", {
      class: "teleport-ray",
      raycaster: {
        deep: true,
        autoRefresh: false,
        objects: "[wall]",
        // showLine: true
      }
    })
    this._teleportCursor = this.el.ensure(".teleport-cursor", "a-cylinder", {
      class: "teleport-cursor", radius: 0.5, height: 0.0625, material: "opacity:0.5;"
    })
    this._teleportCursor.setAttribute("visible", false)
  },

  update(oldData) {
    // if (this.data.jumpForce) this.data.teleportDistance = 0
    this._godMode = this.data.godMode
  },

  play() {
    document.addEventListener("keydown", this._onKeyDown)
    document.addEventListener("keyup", this._onKeyUp)
    this._leftHand.addEventListener("axismove", this._onAxisMove)
    this._rightHand.addEventListener("axismove", this._onAxisMove)
    this._leftHand.addEventListener("buttonchanged", this._onButtonChanged)
    this._rightHand.addEventListener("buttonchanged", this._onButtonChanged)
    this.el.sceneEl.canvas.addEventListener("touchstart", this._onTouchStart)
    this.el.sceneEl.canvas.addEventListener("touchmove", this._onTouchMove)
    this.el.sceneEl.canvas.addEventListener("touchend", this._onTouchEnd)
    this.el.sceneEl.addEventListener("enter-vr", this._onEnterVR)
    this.el.sceneEl.addEventListener("exit-vr", this._onExitVR)
  },

  pause() {
    document.removeEventListener("keydown", this._onKeyDown)
    document.removeEventListener("keyup", this._onKeyUp)
    this._leftHand.removeEventListener("axismove", this._onAxisMove)
    this._rightHand.removeEventListener("axismove", this._onAxisMove)
    this._leftHand.removeEventListener("buttonchanged", this._onButtonChanged)
    this._rightHand.removeEventListener("buttonchanged", this._onButtonChanged)
    this.el.sceneEl.canvas.removeEventListener("touchstart", this._onTouchStart)
    this.el.sceneEl.canvas.removeEventListener("touchmove", this._onTouchMove)
    this.el.sceneEl.canvas.removeEventListener("touchend", this._onTouchEnd)
    this.el.sceneEl.removeEventListener("enter-vr", this._onEnterVR)
    this.el.sceneEl.removeEventListener("exit-vr", this._onExitVR)
  },

  remove() {
    this.el.sceneEl.removeChild(this._legs)
    this.el.sceneEl.removeChild(this._legBumper)
    this.el.sceneEl.removeChild(this._headBumper)
  },

  tick(time, timeDelta) {
    timeDelta /= 1000
    this.el.object3D.localToWorld(this.centerPos.set(0, 0, 0))
    this.headPos.copy(this._camera.object3D.position)
    this._camera.object3D.parent.localToWorld(this.headPos)
    this.headDir.set(0, 0, -1)
      .applyQuaternion(this._camera.object3D.quaternion)
      .applyQuaternion(this.el.object3D.getWorldQuaternion(THREE.Quaternion.temp()))
    this._legs.object3D.localToWorld(this.feetPos.set(0, 0, 0))
    this.feetPos.y -= 0.5

    this._applyButtons(timeDelta)
    this._applyMoveStick(timeDelta)
    this._applyAuxStick(timeDelta)

    // drag feet
    let head2toe = THREE.Vector3.temp()
      .copy(this.headPos).sub(this.feetPos)
    head2toe.y = 0
    if (head2toe.length() > 0.5 || !this.currentFloor) {
      if (this.currentFloor)
        head2toe.multiplyScalar(0.1)
      this._legs.object3D.position.add(head2toe)
      this.feetPos.add(head2toe)
    }

    // fall
    if (!this._godMode && !this._caution) {
      let ray = this._legs.components.raycaster
      ray.refreshObjects()
      let hit = ray.intersections[0]
      if (hit && this._vertVelocity <= 0) {
        this._vertVelocity = 0
        if (this.currentFloor === hit.el) {
          let delta = THREE.Vector3.temp()
          delta.copy(this.currentFloor.object3D.position).sub(this.currentFloorPosition)
          this.move(delta)
          this.lastStep.add(delta)
          delta.y = 0
          this._legs.object3D.position.add(delta)
        } else {
          if (this.currentFloor) this.currentFloor.emit("leave")
          hit.el.emit("enter")
        }
        this.move(THREE.Vector3.temp().set(0, 0.5 - hit.distance, 0))
        this.currentFloor = hit.el
        this.currentFloorPosition.copy(this.currentFloor.object3D.position)
      } else {
        if (this.currentFloor) this.currentFloor.emit("leave")
        this._vertVelocity -= this.data.gravity * timeDelta
        this.move(THREE.Vector3.temp().set(0, Math.max(-0.5, this._vertVelocity * timeDelta), 0))
        this.currentFloor = null
      }
    }

    // bump walls
    if (this._godMode) {
      this._legBumper.object3D.position.copy(this._legs.object3D.position)
      this._headBumper.object3D.position.copy(this._legs.object3D.position)
    } else if (this._bumpOverload > 4 || Math.abs(this.headPos.y - this.feetPos.y) > 3) {
      this.feetPos.y = this.centerPos.y
      this._legs.object3D.position.y = this.feetPos.y + 0.5
      this.teleport(this._legBumper.object3D.position, true)
      if (this._bumpOverload) this._bumpOverload--
    } else {
      let pos = THREE.Vector3.temp()
      pos.copy(this.feetPos).y += 0.5
      this._bump(pos, this._legBumper)
      pos.copy(this.headPos)
      this._bump(pos, this._headBumper)
    }

    // take step
    let delta = THREE.Vector3.temp()
    delta.copy(this.feetPos).sub(this.lastStep)
    if (delta.length() > this.data.stepLength) {
      if (this.currentFloor) {
        this.el.emit("step")
        this.currentFloor.emit("step")
      }
      while (delta.length() > this.data.stepLength) {
        delta.multiplyScalar(this.data.stepLength / delta.length())
        this.lastStep.add(delta)
        delta.copy(this.feetPos).sub(this.lastStep)
      }
    }

    // Update The Matrix! 🐱‍💻
    this.el.object3D.updateWorldMatrix(true, true)
  },

  teleport(pos, force) {
    let delta = THREE.Vector3.temp()
    delta.copy(pos).sub(this.feetPos)
    this.move(delta)
    this._legs.object3D.position.x = this.feetPos.x = this.headPos.x
    this._legs.object3D.position.z = this.feetPos.z = this.headPos.z
    this._caution = 8
    if (force) {
      this._legBumper.object3D.position.copy(this._legs.object3D.position)
      this._headBumper.object3D.position.copy(this._legs.object3D.position)
    }
  },

  jump() {
    // jump!
    if (this.currentFloor) {
      this._vertVelocity = this.data.jumpForce
    }
  },
  stopFall() {
    this._legs.object3D.position.x = this.feetPos.x = this.headPos.x
    this._legs.object3D.position.z = this.feetPos.z = this.headPos.z
    this._vertVelocity = 0
  },

  toggleCrouch(reset) {
    if (!this.currentFloor) return setTimeout(() => {
      this.toggleCrouch(reset)
    }, 256)
    let head2toe = this.headPos.y - this.feetPos.y
    let delta
    clearTimeout(this._crouchResetTO)
    this._crouchResetTO = null
    if (Math.abs(this.centerPos.y - this.feetPos.y) > 0.03125) {
      delta = this.feetPos.y - this.centerPos.y
    } else if (!reset) {
      if (head2toe > 1) {
        delta = -1
      } else {
        delta = 1
      }
    }
    this.el.removeAttribute("animation")
    if (delta) {
      this.el.setAttribute("animation", {
        property: "object3D.position.y",
        to: this.el.object3D.position.y + delta,
        dur: 256,
        // easing: "easeInOutSine"
      })
    }
  },

  move(delta) {
    this.el.object3D.position.add(delta)
    this.centerPos.add(delta)
    this.headPos.add(delta)
    this._legs.object3D.position.y += delta.y
    this.feetPos.y += delta.y
  },

  _bump(pos, bumper) {
    let matrix = THREE.Matrix3.temp()
    let delta = THREE.Vector3.temp()
    delta.copy(pos)
    delta.sub(bumper.object3D.position)
    let dist = delta.length()
    if (dist) {
      bumper.setAttribute("raycaster", "far", dist + 0.125)
      bumper.setAttribute("raycaster", "direction", `${delta.x} ${delta.y} ${delta.z}`)
      // bumper.setAttribute("raycaster", "origin", delta.multiplyScalar(-0.25))
      let ray = bumper.components.raycaster
      ray.refreshObjects()
      let hit = ray.intersections[0]
      if (hit) {
        this.el.removeAttribute("animation")
        matrix.getNormalMatrix(hit.el.object3D.matrixWorld)
        delta
          .copy(hit.face.normal)
          .applyMatrix3(matrix)
          .normalize()
          .multiplyScalar(dist + 0.125)
        let feety = this._legs.object3D.position.y
        this.move(delta)
        bumper.object3D.position.add(delta)
        if (this._legs.object3D.position.y !== feety) {
          if (bumper === this._headBumper) this._headBumper.object3D.position.copy(this._legBumper.object3D.position)
          clearTimeout(this._crouchResetTO)
          this._crouchResetTO = setTimeout(() => {
            this.toggleCrouch(true)
          }, 4096)
        }
        this._legs.object3D.position.add(delta)
        this._legs.object3D.position.y = Math.max(feety, this.headPos.y - 1.5)
        this._caution = 4
        this._bumpOverload++
        this._vertVelocity = Math.min(0, this._vertVelocity)
        let detail = {
          player: this.el,
          object: hit.el
        }
        this.el.emit("bump", detail)
        hit.el.emit("bump", detail)
      } else if (this._caution) {
        this._caution--
      } else {
        if (this._bumpOverload) this._bumpOverload--
        bumper.object3D.position.lerp(pos, 0.25)
      }
    }
  },

  _callMoveStick() {
    let bestStick = THREE.Vector2.temp().set(0, 0)
    let stick = THREE.Vector2.temp()

    stick.set(0, 0)
    if (this._keysDown["KeyA"]) stick.x--
    if (this._keysDown["KeyD"]) stick.x++
    if (this._keysDown["KeyW"] || this._keysDown["ArrowUp"]) stick.y--
    if (this._keysDown["KeyS"] || this._keysDown["ArrowDown"]) stick.y++
    if (this._kbStick.length() > 0.1) this._kbStick.multiplyScalar((this._kbStick.length() - 0.1) / this._kbStick.length())
    else (this._kbStick.set(0, 0))
    this._kbStick.add(stick.multiplyScalar(0.2))
    if (this._kbStick.length() > 1) this._kbStick.normalize()
    if (this._kbStick.length() > bestStick.length()) bestStick.copy(this._kbStick)

    this._deadZone(stick.set(this._axes[0], this._axes[1]))
    if (stick.length() > bestStick.length()) bestStick.copy(stick)

    stick.copy(this._leftTouchDir)
    if (stick.length() > bestStick.length()) bestStick.copy(stick)

    for (i = 0, len = navigator.getGamepads().length; i < len; i++) {
      gamepad = navigator.getGamepads()[i]
      if (gamepad) {
        this._deadZone(stick.set(gamepad.axes[0], gamepad.axes[1]))
        if (stick.length() > bestStick.length()) {
          this._setDevice("gamepad")
          bestStick.copy(stick)
        }
      }
    }

    if (bestStick.length() > 1) bestStick.normalize()
    if (this._keysDown["ShiftLeft"] || this._keysDown["ShiftRight"]) bestStick.multiplyScalar(0.25)
    return bestStick
  },
  _applyMoveStick(seconds) {
    let stick = this._callMoveStick()
    stick.multiplyScalar(this.data.speed)
    stick.multiplyScalar(seconds)
    let heading = THREE.Vector2.temp().set(this.headDir.z, -this.headDir.x).angle() - Math.PI
    let x2 = Math.cos(heading) * stick.x - Math.sin(heading) * stick.y
    let y2 = Math.sin(heading) * stick.x + Math.cos(heading) * stick.y
    let delta = THREE.Vector3.temp().set(x2, 0, y2)
    if (this.quantizeMovement) {
      this._quantTime = this._quantTime || 0
      this._quantDelta = this._quantDelta || new THREE.Vector3()
      this._quantTime += seconds
      this._quantDelta.add(delta)
      if (this._quantTime > 0.25) {
        this._quantTime -= 0.25
        delta.copy(this._quantDelta)
        this._quantDelta.set(0, 0, 0)
      } else {
        delta.set(0, 0, 0)
      }
    }
    this.move(delta)
  },

  _callAuxStick() {
    let bestStick = THREE.Vector2.temp().set(0, 0)
    let stick = THREE.Vector2.temp()

    stick.set(0, 0)
    if (this._keysDown["ArrowLeft"]) stick.x--
    if (this._keysDown["ArrowRight"]) stick.x++
    if (this._keysDown["KeyQ"]) stick.y--
    if (this._keysDown["KeyC"]) stick.y++
    if (stick.length() > bestStick.length()) bestStick.copy(stick)

    this._fourWay(this._deadZone(stick.set(this._axes[2], this._axes[3])))
    if (stick.length() > bestStick.length()) bestStick.copy(stick)

    this._fourWay(stick.copy(this._rightTouchDir))
    if (stick.length() > bestStick.length()) bestStick.copy(stick)

    for (i = 0, len = navigator.getGamepads().length; i < len; i++) {
      gamepad = navigator.getGamepads()[i]
      if (gamepad) {
        this._fourWay(this._deadZone(stick.set(gamepad.axes[2], gamepad.axes[3])))
        if (stick.length() > bestStick.length()) {
          this._setDevice("gamepad")
          bestStick.copy(stick)
        }
      }
    }

    if (bestStick.length() > 1) bestStick.normalize()
    if (this._keysDown["ShiftLeft"] || this._keysDown["ShiftRight"]) bestStick.multiplyScalar(0.25)
    return bestStick
  },
  _applyAuxStick(seconds) {
    let stick = this._callAuxStick()
    let rotation = 0

    // Rotation
    if (this.quantizeRotation) {
      if (Math.round(stick.x)) {
        if (!this._rotating) {
          this._rotating = true
          rotation = -Math.round(stick.x) * Math.PI / 4
        }
      } else {
        this._rotating = false
      }
    } else {
      rotation = -stick.x * this.data.rotationSpeed * seconds
    }
    if (rotation) {
      let pos = THREE.Vector2.temp()
      let pivot = THREE.Vector2.temp()
      let delta = THREE.Vector3.temp()
      pos.set(this.feetPos.x, this.feetPos.z)
      pivot.set(this.centerPos.x, this.centerPos.z)
      pos.rotateAround(pivot, -rotation)
      delta.set(this.feetPos.x - pos.x, 0, this.feetPos.z - pos.y)

      this.el.object3D.rotateY(rotation)
      this.el.object3D.position.add(delta)
      this.centerPos.add(delta)
    }

    // Levitating
    if (this._godMode) {
      this.el.object3D.position.y += -stick.y * this.data.speed * seconds
      this._legs.object3D.position.y += -stick.y * this.data.speed * seconds
    } else {
      // Crouching
      if (Math.round(stick.y) > 0) {
        if (!this._crouching) {
          this._crouching = true
          this.toggleCrouch()
        }
      } else {
        this._crouching = false
      }

      // Teleportation and jumping
      if (Math.round(stick.y) < 0) {
        if (!this._teleporting && this.data.teleportDistance) {
          this._teleportCursor.setAttribute("visible", true)
          this._teleporting = true
        }
        let quat = THREE.Quaternion.temp()
        this._teleportCursor.object3D.getWorldQuaternion(quat)
        this._teleportCursor.object3D.quaternion.multiply(quat.conjugate().normalize()).multiply(quat.copy(this.el.object3D.quaternion).multiply(this._camera.object3D.quaternion))
        this._teleportCursor.object3D.quaternion.x = 0
        this._teleportCursor.object3D.quaternion.z = 0
        this._teleportCursor.object3D.quaternion.normalize()

        ray = this._teleportBeam.components.raycaster
        ray.refreshObjects()
        hit = ray.intersections[0]
        if (hit && hit.el.components.floor) {
          let straight = THREE.Vector3.temp()
          let delta = THREE.Vector3.temp()
          let matrix = THREE.Matrix3.temp()
          delta.copy(hit.point).sub(this.feetPos)
          if (delta.y > 1.5) delta.multiplyScalar(0)
          if (delta.length() > this.data.teleportDistance) delta.normalize().multiplyScalar(this.data.teleportDistance)
          delta.add(this.feetPos)
          this._teleportCursor.object3D.position.copy(delta)
          this._teleportCursor.object3D.parent.worldToLocal(this._teleportCursor.object3D.position)

          matrix.getNormalMatrix(hit.el.object3D.matrixWorld)
          delta
            .copy(hit.face.normal)
            .applyMatrix3(matrix)
            .normalize()
          delta.applyQuaternion(quat.copy(this.el.object3D.quaternion).conjugate())
          straight.set(0, 1, 0)
          quat.setFromUnitVectors(straight, delta)
          this._teleportCursor.object3D.quaternion.premultiply(quat)
        } else {
          this._teleportCursor.object3D.position.copy(this.feetPos)
          this._teleportCursor.object3D.parent.worldToLocal(this._teleportCursor.object3D.position)
        }
      } else if (this._teleporting) {
        let pos = THREE.Vector3.temp()
        this._teleportCursor.object3D.localToWorld(pos.set(0, 0, 0))
        this.teleport(pos)
        this._teleportCursor.setAttribute("visible", false)
        this._teleportCursor.setAttribute("position", "0 0 0")
        this._teleporting = false
      }
    }
  },

  _callButtons() {
    let buttons = 0

    if (this._keysDown["Space"]) buttons = buttons | 1
    if (this._keysDown["KeyG"]) buttons = buttons | 2
    if (this._vrRightClick) buttons = buttons | 1
    if (this._vrLeftClick) buttons = buttons | 2

    for (i = 0, len = navigator.getGamepads().length; i < len; i++) {
      gamepad = navigator.getGamepads()[i]
      if (gamepad) {
        if (gamepad.buttons[3]?.pressed) {
          this._setDevice("gamepad")
          buttons = buttons | 1
        }
        if (gamepad.buttons[11]?.pressed) {
          this._setDevice("gamepad")
          buttons = buttons | 1
        }
        if (gamepad.buttons[10]?.pressed) {
          this._setDevice("gamepad")
          buttons = buttons | 2
        }
      }
    }

    return buttons
  },
  _applyButtons() {
    let buttons = this._callButtons()
    if (buttons) {
      if (!this._toggling) {
        if (buttons & 1) this.jump()
        if (this.data.godMode && buttons & 2) this._godMode = !this._godMode
        if (this._godMode) this._vertVelocity = 0
      }
      this._toggling = true
    } else {
      this._toggling = false
    }
  },

  _deadZone(vec, limit = 0.25) {
    if (vec.length() > limit) {
      vec.multiplyScalar(((vec.length() - limit) / (1 - limit)) / vec.length())
    } else {
      vec.set(0, 0)
    }
    return vec
  },
  _fourWay(vec) {
    let len = vec.length()
    if (Math.abs(vec.x) > Math.abs(vec.y)) {
      vec.y = 0
    } else {
      vec.x = 0
    }
    vec.multiplyScalar(len / vec.length())
    return vec
  },

  _onKeyDown(e) {
    this._setDevice("desktop")
    this._keysDown[e.code] = true
  },
  _onKeyUp(e) { this._keysDown[e.code] = false },
  _onAxisMove(e) {
    this._setDevice("vrcontroller")
    if (e.srcElement.getAttribute("tracked-controls").hand === "left") {
      this._axes[0] = e.detail.axis[2]
      this._axes[1] = e.detail.axis[3]
    } else {
      this._axes[2] = e.detail.axis[2]
      this._axes[3] = e.detail.axis[3]
    }
    if (!this._handEnabled) {
      this._teleportBeam.parentElement.removeChild(this._teleportBeam)
      this._teleportBeam = this._rightHand.ensure(".teleportBeam", "a-entity", {
        class: "teleportBeam", rotation: "-45 0 0",
        raycaster: {
          deep: true,
          autoRefresh: false,
          objects: "[wall]",
        }
      })
      this._handEnabled = true
    }
  },
  _onButtonChanged(e) {
    this._setDevice("vrcontroller")
    if (e.srcElement.getAttribute("tracked-controls").hand === "left") {
      if (e.detail.id == 3) this._vrLeftClick = e.detail.state.pressed
    } else {
      if (e.detail.id == 3) this._vrRightClick = e.detail.state.pressed
    }
  },

  _onTouchStart(e) {
    this._setDevice("touch")
    let vw = this.el.sceneEl.canvas.clientWidth
    for (let j = 0; j < e.changedTouches.length; j++) {
      let touchEvent = e.changedTouches[j]
      if (touchEvent.clientX < vw / 2) {
        this._leftTouchId = touchEvent.identifier
        this._leftTouchCenter.set(touchEvent.clientX, touchEvent.clientY)
      }
      if (touchEvent.clientX > vw / 2) {
        this._rightTouchId = touchEvent.identifier
        this._rightTouchCenter.set(touchEvent.clientX, touchEvent.clientY)
      }
    }
    e.preventDefault()
  },
  _onTouchMove(e) {
    let stickRadius = 32
    for (let j = 0; j < e.changedTouches.length; j++) {
      let touchEvent = e.changedTouches[j]
      let touchCenter = null
      let touchDir = null
      if (this._leftTouchId === touchEvent.identifier) {
        touchCenter = this._leftTouchCenter
        touchDir = this._leftTouchDir
      }
      if (this._rightTouchId === touchEvent.identifier) {
        touchCenter = this._rightTouchCenter
        touchDir = this._rightTouchDir
      }
      if (touchDir) {
        touchDir.set(touchEvent.clientX, touchEvent.clientY)
        touchDir.sub(touchCenter)
        if (touchDir.length() > stickRadius) {
          touchDir.multiplyScalar((touchDir.length() - stickRadius) / touchDir.length())
          touchCenter.add(touchDir)
          touchDir.multiplyScalar(stickRadius / touchDir.length())
        }
        touchDir.divideScalar(stickRadius)
      }
    }
    e.preventDefault()
  },
  _onTouchEnd(e) {
    for (let j = 0; j < e.changedTouches.length; j++) {
      let touchEvent = e.changedTouches[j];
      if (this._leftTouchId === touchEvent.identifier) {
        this._leftTouchId = null
        this._leftTouchDir.set(0, 0)
      }
      if (this._rightTouchId === touchEvent.identifier) {
        this._rightTouchId = null
        this._rightTouchDir.set(0, 0)
      }
    }
  },

  _onEnterVR(e) {
    this.isVR = true
    this.quantizeMovement = this._config.quantizeMovementVR
    this.quantizeRotation = this._config.quantizeRotationVR
  },
  _onExitVR(e) {
    this.isVR = false
    this.quantizeMovement = this._config.quantizeMovement
    this.quantizeRotation = this._config.quantizeRotation
  },

  _setDevice(device) {
    if (this.device === device) return
    this.el.removeState(this.device || "noinput")
    this.device = device
    this.el.addState(this.device || "noinput")
  }
})

require("./locomotion/floor")
require("./locomotion/wall")
require("./locomotion/start")

},{"./locomotion/floor":22,"./locomotion/start":23,"./locomotion/wall":24}],22:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("floor", {
  schema: {
    physics: { type: "boolean", default: true }
  },

  update() {
    this.el.setAttribute("wall", this.data)
  }
})

},{}],23:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("start", {

  init() {
    let loco = this.el.sceneEl.querySelector("[locomotion]").components.locomotion
    if (!loco) return setTimeout(() => { this.init() }, 256)
    let pos = new THREE.Vector3()
    // console.log("starting at", pos)

    setTimeout(() => {
      this.el.object3D.localToWorld(pos.set(0, 0, 0))
      loco.teleport(pos, true)
      setTimeout(() => {
        loco.toggleCrouch(true)
      }, 256)
    }, 256)
  }
})

},{}],24:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("wall", {
  schema: {
    physics: { type: "boolean", default: true }
  },

  update() {
    if (this.data.physics && !this.el.components.body) this.el.setAttribute("body", "type:static")
  }
})

},{}],25:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("onevent", {
  multiple: true,
  schema: {
    event: { type: "string" },
    entity: { type: "selector" },
    property: { type: "string" },
    value: { type: "string" },
  },

  init() {
    this.trigger = this.trigger.bind(this)
  },

  update(oldData) {
    this.pause()
    this._event = this.data.event || this.id || ""
    this._entity = this.data.entity || this.el
    this._property = this.data.property || ""
    this._value = this.data.value || ""
    if (this.el.isPlaying)
      this.play()
  },

  play() {
    if (!this._event) return
    this.el.addEventListener(this._event, this.trigger)
  },

  pause() {
    if (!this._event) return
    this.el.removeEventListener(this._event, this.trigger)
  },

  trigger(e) {
    let args = this._property.split(".")
    args.push(this._value)
    this._entity.setAttribute(...args)
  }
})

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
/* global AFRAME, THREE */

const cmd = require("../libs/cmdCodec")
const pkg = require("../../package")


AFRAME.registerSystem("physics", {
  schema: {
    workerUrl: { type: "string", default: `https://cdn.jsdelivr.net/npm/a-recit@${pkg.version}/dist/cannonWorker.min.js` },
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

},{"../../package":1,"../libs/cmdCodec":40,"./physics/body":28,"./physics/joint":29,"./physics/shape":30}],28:[function(require,module,exports){
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


},{"../../libs/cmdCodec":40}],29:[function(require,module,exports){
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


},{"../../libs/cmdCodec":40}],30:[function(require,module,exports){
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


},{"../../libs/cmdCodec":40}],31:[function(require,module,exports){
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Define class for restoring.
 *
 * @package     VRtopics
 * @copyright   RECITFAD
 * @author      RECITFAD
 * @originalauthor	gladeye/aframe-preloader-component https://www.npmjs.com/package/@gladeye/aframe-preloader-component
 * @license     {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

/**
 * Visual preloader system for A-Frame.
 *
 * When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
 * of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
 * Alternately, the modal can be manually closed
 *
 * Emits a 'preloading-complete' event when done.
 */
AFRAME.registerSystem('preloader', {
    schema: {
        type: { type: 'string', default: 'bootstrap' }, //type of CSS framework to use - acceptable values are: 'bootstrap' or 'custom'
        id: {type: 'string', default: 'preloader-modal'}, //ID of the auto injected preloader modal
        autoInject: { type: 'boolean', default: true }, //whether or not to auto-inject the preloader html into the page
        target: { type: 'selector', default: '#preloader-modal'}, //the html target selector
        progressValueAttr:  { type: 'string', default: 'aria-valuenow' },//an attribute of the progress bar to set when progress is updated
        barProgressStyle: { type: 'string', default: 'width'}, //target css style to set as a percentage on the bar
        bar: { type: 'selector', default: '#preloader-modal .progress-bar'}, //html class of progress bar in preloader - used to set the width
        label: { type: 'selector', default: '#preloader-modal .progress-label'}, //html class of label in preloader - used to set the percentage
        labelText: { type: 'string', default: '{0}% Chargement terminée'}, //loading text format {0} will be replaced with the percent progress e.g. 30%
        autoClose: { type: 'boolean', default: true}, //automatically close preloader by default - not supported if clickToClose is set to 'true'
        clickToClose: { type: 'boolean', default: false}, //whether the user must click a button to close the modal when preloading is finished
        closeLabelText: { type: 'string', default: 'Continuer'}, //default label text of click to close button
		consigneText:{ type: 'string', default: 'Continuer'},
		title: { type: 'string', default: ''}, //title of preloader modal
        debug: { type: 'boolean', default: false}, //whether or not to enable logging to console
        disableVRModeUI: { type: 'boolean', default: true}, //whether or not to disable VR Mode UI when preloading
        slowLoad: { type: 'boolean', default: false}, //deliberately slow down the load progress by adding 2 second delays before updating progress - used to showcase loader on fast connections and should not be enabled in production
        doneLabelText: { type: 'string', default: 'L\'activité est maintenait disponible'} //text to set on label when loading is complete
    },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    loadedAssetCount: 0, //total number of assets loaded
    totalAssetCount: 0, //total number of assets to load
    slowLoadTimeAssetUpdate: 1000, //length of time to slow down asset load progress if slowLoad is set to 'true'
    slowLoadTimePreloadFinish: 4000, //length of time to slow down preload finish if slowLoad is set to 'true'

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {

        if(this.data.debug){
            console.log('Initialized preloader');
        }

        if(this.data.type === 'bootstrap' && typeof $ === 'undefined'){
            console.error('jQuery is not present, cannot instantiate Bootstrap modal for preloader!');
        }

        document.querySelector('a-assets').addEventListener('loaded',function(){
            if(this.data.debug){
                console.info('All assets loaded');
            }
            this.triggerProgressComplete();

        }.bind(this));

        var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');

        this.totalAssetCount = assetItems.length;

        this.watchPreloadProgress(assetItems);

        if(!this.data.target && this.data.autoInject){
            if(this.data.debug){
                console.info('No preloader html found, auto-injecting');
            }
            this.injectHTML();
        }else{
            switch(this.data.type){
                case 'bootstrap':
                    this.initBootstrapModal($(this.data.target));
                    break;
                default:
                    //do nothing
                    break;
            }
        }

        if(this.data.disableVRModeUI){
            this.sceneEl.setAttribute('vr-mode-ui','enabled','false');
        }
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) { },

    /**
     *
     * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
     */
    watchPreloadProgress: function(assetItems){
        for (var a = 0; a < assetItems.length; a++) {

            var eventName;

            switch(assetItems[a].nodeName.toLowerCase()){
                case 'a-asset-item':
                    eventName = 'loaded';
                    break;
                case 'img':
                    eventName = 'load';
                    break;
                case 'audio':
                case 'video':
                    eventName = 'loadeddata';
                    break;
            }

            assetItems[a].addEventListener(eventName,function(e){
                this.loadedAssetCount++;
                if(this.data.debug) {
                    console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
                }
                this.onAssetLoaded();
            }.bind(this));
        }
    },

    onAssetLoaded: function(){
        if(this.loadedAssetCount === this.totalAssetCount){
            this.triggerProgressComplete();
        }else{
            var percentage = Math.floor(this.loadedAssetCount/this.totalAssetCount*100);
            if(this.data.slowLoad) {
                setTimeout(function () {
                    this.drawProgress(percentage);
                }.bind(this), this.slowLoadTimeAssetUpdate)
            }else{
                this.drawProgress(percentage);
            }
        }
    },

    triggerProgressComplete: function(){

        if(this.data.slowLoad){
            setTimeout(function(){
                if(this.data.type === 'bootstrap') $(this.data.bar).addClass('progress-bar-success');
                this.drawProgress(100);
                this.data.target.classList.add('preloader-modal__complete');
            }.bind(this),this.slowLoadTimePreloadFinish-1000);
        }else{
            if(this.data.type === 'bootstrap') $(this.data.bar).addClass('progress-bar-success');
            this.drawProgress(100);
            this.data.target.classList.add('preloader-modal__complete');
        }

        if(this.data.autoClose && !this.data.clickToClose){
            if(this.data.slowLoad){
                setTimeout(function(){
                    this.triggerPreloadingComplete();
                    this.closeModal();
                }.bind(this),this.slowLoadTimePreloadFinish)
            }else{
                this.triggerPreloadingComplete();
                this.closeModal();
            }

        }else{
            if(this.closeBtn && this.data.clickToClose){
                if(this.data.slowLoad){
                    setTimeout(function(){
                        this.closeBtn.setAttribute('style','display: inline-block');
                    }.bind(this),this.slowLoadTimePreloadFinish)
                }else{
                    this.closeBtn.setAttribute('style','display: inline-block');
                }

            }
        }
    },

    drawProgress: function(percentage){
        //update loading bar if exists
        if(this.data.label){
            this.data.label.innerHTML = (percentage === 100) ? this.data.doneLabelText : this.data.labelText.format(percentage);
        }

        if(this.data.bar){
            this.data.bar.setAttribute(this.data.progressValueAttr,percentage);
            this.data.bar.setAttribute('style',this.data.barProgressStyle+':'+percentage+'%');
        }
    },

    injectHTML: function(){
        switch(this.data.type){
            case 'bootstrap':
                this.injectBootstrapModal();
                break;
            default:
                //do nothing
                break;
        }
    },

    injectBootstrapModal: function(){

        if(this.data.debug){
            console.info('Injecting bootstrap modal');
        }

        if(!this.data.title){
            //full screen modal
            var $modal = $('' +
                '<div id="'+this.data.id+'" class="modal instructions-modal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog modal-dialog__full" role="document">'+
                '<div class="modal-content vertical-align text-center">'+
                '<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">'+
                '<div class="progress">'+
                '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">'+
                '<span class="progress-label">Loading 0% Complete</span>'+
                '</div>'+
                '</div>'+
                ((this.data.clickToClose) ? '<button type="button" class="close-btn btn btn-default" data-dismiss="modal">Continue</button>' : '' )+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '');
        }else{
            //regular modal
            var $modal = $('' +
                '<div id="'+this.data.id+'" class="modal instructions-modal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog modal-dialog__full" role="document">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<h4 class="modal-title">'+this.data.title+'</h4>'+
                '</div>'+
                '<div class="modal-body">' +
                '<div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">'+
                '<div class="progress">'+
                '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">'+
                '<span class="progress-label">Loading 0% Complete</span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="modal-footer">'+
                ((this.data.clickToClose) ? '<button type="button" class="close-btn btn btn-default" data-dismiss="modal">Continue</button>' : '' )+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '');
        }

        $('body').append($modal);

        this.data.target = $modal[0];
        this.data.label = $modal.find('.progress-label')[0];
        this.data.bar = $modal.find('.progress-bar')[0];

        this.initBootstrapModal($modal);
    },

    initBootstrapModal: function($modal){
        $modal.modal({
            backdrop: 'static',
            keyboard: false
        });

        if(!this.data.title){
            var $modalStyle = $('<style>' +
                '.vertical-align {'+
                'display: flex;'+
                'align-items: center;'+
                '}'+
                '.modal-dialog__full {'+
                'width: 100%;'+
                'height: 100%;'+
                'margin: 0;'+
                'padding: 0;'+
                '}'+
                '.modal-dialog__full .modal-content {'+
                'height: auto;'+
                'min-height: 100%;'+
                'border-radius: 0;'+
                '}' +
                '</style>');
            $('head').append($modalStyle);
        }

        if(this.data.clickToClose){
            var $closeBtn = $modal.find('[data-dismiss=modal]');

            if($closeBtn.length > 0){
                this.closeBtn = $closeBtn[0];

                this.closeBtn.setAttribute('style','display: none');

                $modal.on('hidden.bs.modal', function (e) {
                    this.triggerPreloadingComplete();
                }.bind(this))
            }else{
                console.error('No Bootstrap modal close button is set in the HTML. Please add a button with the data-dismiss="modal" attribute to use clickToClose.');
            }
        }
    },

    triggerPreloadingComplete: function(){
        if(this.data.debug){
            console.info('Preloading complete');
        }
        if(this.data.disableVRModeUI){
            this.sceneEl.setAttribute('vr-mode-ui','enabled','true');
        }

        this.sceneEl.emit('preloading-complete');
    },

    closeModal: function(){
        switch(this.data.type){
            case 'bootstrap':
                $(this.data.target).modal('hide');
                break;
            default:
                //do nothing
                break;
        }
    }
});

},{}],32:[function(require,module,exports){
/* global AFRAME, THREE */




AFRAME.registerComponent("injectbeaker", {

      
      schema: {
        name :  { default:' Appareil' },
        volume:  {  type: 'string',    default: "100ml"},
        solute:  {  type: 'number',default: 0.1 },
        percent: { type: 'number', default: 0.2 },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
    ,

    init() { 
     console.log(this)
     //Beaker gltf model's
     switch (this.data.volume ) {
          case  ("100ml"):
          this.beackergltf = "#b100";
          this.beackervolumeheight = 0.07;
          this.beackervolumediameter = 0.028;
          break;
          case  ("250ml"):
            this.beackergltf = "#b250";
          this.beackervolumeheight = 250;
          this.beackervolumediameter = 0.028;
          break;
          case  ("500ml"):
            this.beackergltf = "#b500";
          this.beackervolumeheight = 500;
          this.beackervolumediameter = 100;
          break;
          default:
            this.beackergltf = "#b100";
          this.beackervolumeheight = 0.07;
          this.beackervolumediameter = 0.028;
          break;
        }
            this.el.ensure("a-gltf-model", "a-gltf-model", {
              "src": this.beackergltf,
              "class": "matlabo1",
              "scale" : "1 1 1"
            })
            this.el.setAttribute("class","laboratory")  
            this.el.setAttribute("shape","cylinder")
            this.el.setAttribute("body", "type", "kinematic")
            this.el.setAttribute("body", "restitution", "0")
        
            this.containlevel = this.data.percent * this.beackervolumeheight;
            this.containlevely= 0.0 +( this.containlevel / 2);
            console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.containlevely + "   containlevel  =" + this.containlevel + "  this.data.volume ="+  this.data.volume )  
      // Contain of the beaker
            var contain = this.el.querySelector('a-gltf-model').ensure("a-cylinder", "a-cylinder", {
                    "color": this.data.colorliq,
                    "class": "cyl",
                    "height" : this.containlevel, 
                    "radius" : this.beackervolumediameter ,
                    "position" :{x: 0,
                      y : this.containlevely,
                      z : 0
                      },
                    "opacity" :this.data.opacity ,
                    "transparent":"true"
                })
 /* this.el.sciencepannel= this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
    ["flex-direction"] :"column",
     ["justify-content"]:"center" ,
     ["align-items"] :"normal" ,
     ["component-padding"] : "0.1",
			opacity:"0.7" ,
      width:"3",
      height:"4.5",
			position:"0 0.4 -0.025",
      rotation:"0 0 0" ,
      scale:"0.1 0.1 0.1"
      })
   
      this.el.sciencepannel.ensure(".labela", "a-gui-label", {
      width:"2.5",
      height:"0.75",
      value:this.data.name,
      ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
      ["font-size"]:"0.35",
      ["font-color"]:this.data.colorliq,
      ["line-height"]:"0.8",
      ["letter-spacing"]:"0",
      margin:"0 0 0.05 0"
     })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"V total",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider1", "a-gui-slider",{
        class:"slider1",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.percent,
	      margin:"0 0 0.05 0"
      })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"Masse soluté",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider2", "a-gui-slider",{
        class:"slider2",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.solute,
	      margin:"0 0 0.05 0"
      })
 this.levelw = AFRAME.utils.bind(this.levelw, this);
 this.dropb = AFRAME.utils.bind(this.dropb, this);
 this.levelw
      this.el.addEventListener('click', this.levelw);
   */
     },
 /* var containlevel = this.el.getAttribute("containlevel")
     var containlevely= 0.03 + containlevel / 2;
console.log("lesd données"+this.data.colorliq + containlevely)
    var containlevel = this.el.getAttribute("containlevel")
      this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+containlevel+`" radius="0.08" position="0 `+containlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
      </a-cylinder>  `*/
      
      
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    levelw() {
      console.log("ceci = "+this)
      this.schema = this.el.querySelector(".cyl")
      this.data.percent = this.el.components.injectbeaker.el.childNodes[2].childNodes[2].components["gui-slider"].data.percent
      this.data.percentsolute = this.el.components.injectbeaker.el.childNodes[2].children[4].components["gui-slider"].data.percent
      this.dataopacity = this.data.percentsolute /this.data.percent
      console.log("opafitu =" +this.dataopacity)
      console.log("volume"+ this.data.volume)
      console.log("solute =" + this.data.percentsolute)
      console.log("percent" + this.el.components.injectbeaker.el.childNodes[2].children[2].components["gui-slider"].data.percent)
         this.containlevel  = this.data.percent * this.data.volume;
         this.containlevely= 0.00 +( this.containlevel / 2);
         this.el.emit('timetochange')
         console.log(this.containlevel)
        this.schema.setAttribute('height', this.containlevel)
        this.schema.setAttribute('opacity', this.dataopacity)
        this.schema.setAttribute('position', {x: 0, y : this.containlevely,z : 0})
        console.log(this.el.getAttribute('containlevel'))
        },
    dropb(){
      this.pannel = this.el.querySelector("a-gui-flex-container")
      console.log(this.el.getAttribute("rotation"))
     if (!this.el.is("grabbed") )
     {this.pannel.setAttribute('rotation', "0 0 90")
      console.log("je dropp!!!")
      /*this.el.setAttribute('rotation', "0 90 0"))*/
      console.log(this.el.getAttribute("rotation"))}
    
        
  }
})


},{}],33:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injectcylindergraduate", {

      
      schema: {
        name :  { default:' Appareil' },
                solute:  {  type: 'number',default: 0.1 },
        percent: { type: 'number', default: 1 },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
    ,

    init() { 
     console.log(this)
      var eti = this.el
      this.containlevel = this.data.percent * 0.165;
      this.containlevely= 0.015 +( this.containlevel / 2);
      console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.containlevely + "   containlevel  =" + this.containlevel )
      
    
   this.el.setAttribute("class","laboratory")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
   this.el.ensure("a-gltf-model", "a-gltf-model", {
    "src": "#cy100",
    "class": "matlabo1",
    "scale" : "1 1 1"
  })
  var container = this.el.querySelector('a-gltf-model')
  container.ensure("a-cylinder", "a-cylinder", {
          "color": this.data.colorliq,
          "class": "cyl",
          "height" : this.containlevel, 
          "radius" : "0.01" ,
          "position" :{x: 0,
            y : this.containlevely,
          z : 0
            },
          "opacity" :this.data.opacity ,
          "transparent":"true"
       })
 /* this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
    ["flex-direction"] :"column",
     ["justify-content"]:"center" ,
     ["align-items"] :"normal" ,
     ["component-padding"] : "0.1",
			opacity:"0.7" ,
      width:"8",
      height:"4.5",
			position:"0 0.4 -0.025",
      rotation:"0 0 0" ,
      scale:"0.1 0.1 0.1"
      })
  this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
      this.el.sciencepannel.ensure(".labela", "a-gui-label", {
      width:"2.5",
      height:"0.75",
      value:this.data.name,
      ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
      ["font-size"]:"0.35",
      ["font-color"]:this.data.colorliq,
      ["line-height"]:"0.8",
      ["letter-spacing"]:"0",
      margin:"0 0 0.05 0"
     })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"V total",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider1", "a-gui-slider",{
        class:"slider1",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.percent,
	      margin:"0 0 0.05 0"
      })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"Masse soluté",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider2", "a-gui-slider",{
        class:"slider2",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.solute,
	      margin:"0 0 0.05 0"
      })*/
 this.levelw = AFRAME.utils.bind(this.levelw, this);
 this.dropb = AFRAME.utils.bind(this.dropb, this);
 this.levelw
      this.el.addEventListener('click', this.levelw);
   
     },
 /* var containlevel = this.el.getAttribute("containlevel")
     var containlevely= 0.03 + containlevel / 2;
console.log("lesd données"+this.data.colorliq + containlevely)
    var containlevel = this.el.getAttribute("containlevel")
      this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+containlevel+`" radius="0.08" position="0 `+containlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
      </a-cylinder>  `*/
      
      
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    levelw() {
      console.log(this)
      this.schema = this.el.querySelector(".cyl")
      this.data.percent = this.el.components.injectcylindergraduate.el.childNodes[2].children[2].components["gui-slider"].data.percent
      this.data.percentsolute = this.el.components.injectcylindergraduate.el.childNodes[2].children[4].components["gui-slider"].data.percent
      this.dataopacity = this.data.percentsolute /this.data.percent
      console.log("opafitu =" +this.dataopacity)
      console.log("volume"+ this.data.volume)
      console.log("solute =" + this.data.percentsolute)
      console.log("percent" + this.el.components.injectcylindergraduate.el.childNodes[2].children[2].components["gui-slider"].data.percent)
         this.containlevel  = this.data.percent * this.data.volume *0.00165;
         this.containlevely= 0.015 +( this.containlevel / 2);
         this.el.emit('timetochange')
         console.log(this.containlevel)
        this.schema.setAttribute('height', this.containlevel)
        this.schema.setAttribute('opacity', this.dataopacity)
        this.schema.setAttribute('position', {x: 0, y : this.containlevely,z : 0})
        console.log(this.el.getAttribute('containlevel'))
        },
    dropb(){
      this.pannel = this.el.querySelector("a-gui-flex-container")
      console.log(this.el.getAttribute("rotation"))
     if (!this.el.is("grabbed") )
     {this.pannel.setAttribute('rotation', "0 0 90")
      console.log("je dropp!!!")
      /*this.el.setAttribute('rotation', "0 90 0"))*/
      console.log(this.el.getAttribute("rotation"))}
    
        
  }
})


},{}],34:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injecterlenmeyer", {

      
      schema: {
        name :  { default:' Appareil' },
        volume:  {  type: 'number', default: 100 },
        solute:  {  type: 'number',default: 0.1 },
        percent: { type: 'number', default: 1 },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
    ,

    init() { 
     console.log(this)
      
      this.datawaterlevel = this.data.percent * this.data.volume * 1.12;
      this.waterlevely= -0.1 *(1-this.data.percent)  +( this.datawaterlevel );
      console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.waterlevely + "   waterlevel  =" + this.datawaterlevel + "  this.data.volume ="+  this.data.volume )  
      
    
   this.el.setAttribute("class","laboratory")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
   this.el.ensure("a-gltf-model", "a-gltf-model", {
    "src": "#erl100",
    "class": "matlabo1",
    "scale" : "1 1 1"
  })
        var container = this.el.querySelector('a-gltf-model')
        container.ensure("a-cone", "a-cone", {
                "color": this.data.colorliq,
                "class": "cyl",
                "radius-bottom": "0.04",
                "radius-top": "0.017",
                "height" : this.datawaterlevel, 
            
                "position" :{x: 0,
                  y : this.waterlevely,
                  z : 0
                  },
                "opacity" :this.data.opacity ,
                "transparent":"true"
            })
            
/*  this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
    ["flex-direction"] :"column",
     ["justify-content"]:"center" ,
     ["align-items"] :"normal" ,
     ["component-padding"] : "0.1",
			opacity:"0.7" ,
      width:"3",
      height:"4.5",
      position:"0 0.4 -0.025",
      rotation:"0 0 0" ,
      scale:"0.1 0.1 0.1"
      })
  this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
      this.el.sciencepannel.ensure(".labela", "a-gui-label", {
      width:"2.5",
      height:"0.75",
      value:this.data.name,
      ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
      ["font-size"]:"0.35",
      ["font-color"]:this.data.colorliq,
      ["line-height"]:"0.8",
      ["letter-spacing"]:"0",
      margin:"0 0 0.05 0"
     })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"V total",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider1", "a-gui-slider",{
        class:"slider1",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.percent,
	      margin:"0 0 0.05 0"
      })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"Masse soluté",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider2", "a-gui-slider",{
        class:"slider2",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.solute,
	      margin:"0 0 0.05 0"
      })*/
 this.levelw = AFRAME.utils.bind(this.levelw, this);
 this.dropb = AFRAME.utils.bind(this.dropb, this);
 this.levelw
      this.el.addEventListener('click', this.levelw);
   
     },
 /* var datawaterlevel = this.el.getAttribute("waterlevel")
     var waterlevely= 0.03 + datawaterlevel / 2;
console.log("lesd données"+this.data.colorliq + waterlevely)
    var datawaterlevel = this.el.getAttribute("waterlevel")
      this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+datawaterlevel+`" radius="0.08" position="0 `+waterlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
      </a-cylinder>  `*/
      
      
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    levelw() {
      console.log(this)
      this.schema = this.el.querySelector(".cyl")
      this.data.percent = this.el.components.injecterlenmeyer.el.childNodes[2].children[2].components["gui-slider"].data.percent
      this.data.percentsolute = this.el.components.injecterlenmeyer.el.childNodes[2].children[4].components["gui-slider"].data.percent
      this.dataopacity = this.data.percentsolute /this.data.percent
      console.log("opafitu =" +this.dataopacity)
      console.log("volume"+ this.data.volume)
      console.log("solute =" + this.data.percentsolute)
      console.log("percent" + this.el.components.injecterlenmeyer.el.childNodes[2].children[2].components["gui-slider"].data.percent)
      this.waterlevel = this.data.percent * this.data.volume * 1.12;
      console.log(this.waterlevel)
      this.waterlevely= -0.1 *(1-this.data.percent)  +( this.datawaterlevel );
      this.schema.setAttribute('radius-bottom', 0.04)
      this.schema.setAttribute("radius-top", "0.017")
      /*this.waterlevel  = this.data.percent * this.data.volume *0.00165;
         this.waterlevely= 0.015 +( this.waterlevel / 2);*/
         this.el.emit('timetochange')
         console.log("niveau liquide = "+this.waterlevel)
        this.schema.setAttribute('height', this.waterlevel)
        this.schema.setAttribute('opacity', this.dataopacity)
        this.schema.setAttribute('position', {x: 0, y : this.waterlevely, z : 0})
        console.log(this.el.getAttribute('waterlevel'))
        },
    dropb(){
      this.pannel = this.el.querySelector("a-gui-flex-container")
      console.log(this.el.getAttribute("rotation"))
     if (!this.el.is("grabbed") )
     {this.pannel.setAttribute('rotation', "0 0 90")
      console.log("je dropp!!!")
      /*this.el.setAttribute('rotation', "0 90 0"))*/
      console.log(this.el.getAttribute("rotation"))}
    
        
  }
})


    
        


},{}],35:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injectglasses", {

     
    
      schema: {
        volume:  { default: '500ml' },
        waterlevel: { default: '0.2' },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
      ,

    init() { 
      
      var etie = this.el
    console.log("lesd données"+this.data.colorliq)
   this.el.setAttribute("class","science")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
    
    
      this.el.innerHTML = `<a-entity id="matlabo7" gltf-model="#lunettes" ><a-box id="sete" visible="true"  material="color:blue; transparent:true; opacity:0.3:" position="0 0 0" width="0.2" height="0.1"  depth="0.05" event-set__hoveron="_event: hover-start;  material.opacity: 0.7; transparent: true;" ></a-box> </a-entity>`
          
        
    },
    update(oldData) {
      
    },

    tick() {
    }
    
})


},{}],36:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("injecttesttube", {

      
      schema: {
        name :  { default:' Appareil' },
        solute:  {  type: 'number',default: 0.1 },
        percent: { type: 'number', default: 0.2 },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
    ,

    init() { 
     console.log(this)
      var eti = this.el
      this.containlevel = this.data.percent * 0.08;
      this.containlevely= 0.0 +( this.containlevel / 2);
      console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.containlevely + "   containlevel  =" + this.containlevel + "  this.data.volume ="+  this.data.volume )  
      
    
   this.el.setAttribute("class","science")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
   this.el.ensure("a-gltf-model", "a-gltf-model", {
    "src": "#eprou1",
    "class": "matlabo1",
    "scale" : "1 1 1"
  })
  var container = this.el.querySelector('a-gltf-model')
  container.ensure("a-cylinder", "a-cylinder", {
          "color": this.data.colorliq,
          "class": "cyl",
          "height" : this.containlevel, 
          "radius" : "0.007" ,
          "position" :{x: 0,
            y : this.containlevely,
          z : 0
            },
          "opacity" :this.data.opacity ,
          "transparent":"true"
       })
  /*this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
    ["flex-direction"] :"column",
     ["justify-content"]:"center" ,
     ["align-items"] :"normal" ,
     ["component-padding"] : "0.1",
			opacity:"0.7" ,
      width:"3",
      height:"4.5",
			position:"0 0.4 -0.025",
      rotation:"0 0 0" ,
      scale:"0.1 0.1 0.1"
      })
  /*this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
      this.el.sciencepannel.ensure(".labela", "a-gui-label", {
      width:"2.5",
      height:"0.75",
      value:this.data.name,
      ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
      ["font-size"]:"0.35",
      ["font-color"]:this.data.colorliq,
      ["line-height"]:"0.8",
      ["letter-spacing"]:"0",
      margin:"0 0 0.05 0"
     })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"V total",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider1", "a-gui-slider",{
        class:"slider1",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.percent,
	      margin:"0 0 0.05 0"
      })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"Masse soluté",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider2", "a-gui-slider",{
        class:"slider2",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.solute,
	      margin:"0 0 0.05 0"
      })*/
 this.levelw = AFRAME.utils.bind(this.levelw, this);
 this.dropb = AFRAME.utils.bind(this.dropb, this);
 this.levelw
      this.el.addEventListener('click', this.levelw);
   
     },
 /* var containlevel = this.el.getAttribute("containlevel")
     var containlevely= 0.03 + containlevel / 2;
console.log("lesd données"+this.data.colorliq + containlevely)
    var containlevel = this.el.getAttribute("containlevel")
      this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+containlevel+`" radius="0.08" position="0 `+containlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
      </a-cylinder>  `*/
      
      
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    levelw() {
      console.log("ceci = "+this)
      this.schema = this.el.querySelector(".cyl")
      this.data.percent = this.el.components.injecttesttube.el.childNodes[2].childNodes[2].components["gui-slider"].data.percent
      this.data.percentsolute = this.el.components.injecttesttube.el.childNodes[2].children[4].components["gui-slider"].data.percent
      this.dataopacity = this.data.percentsolute /this.data.percent
      console.log("opafitu =" +this.dataopacity)
      console.log("volume"+ this.data.volume)
      console.log("solute =" + this.data.percentsolute)
      console.log("percent" + this.el.components.injecttesttube.el.childNodes[2].children[2].components["gui-slider"].data.percent)
         this.containlevel  = this.data.percent * this.data.volume;
         this.containlevely= 0.00 +( this.containlevel / 2);
         this.el.emit('timetochange')
         console.log(this.containlevel)
        this.schema.setAttribute('height', this.containlevel)
        this.schema.setAttribute('opacity', this.dataopacity)
        this.schema.setAttribute('position', {x: 0, y : this.containlevely,z : 0})
        console.log(this.el.getAttribute('containlevel'))
        },
    dropb(){
      this.pannel = this.el.querySelector("a-gui-flex-container")
      console.log(this.el.getAttribute("rotation"))
     if (!this.el.is("grabbed") )
     {this.pannel.setAttribute('rotation', "0 0 90")
      console.log("je dropp!!!")
      /*this.el.setAttribute('rotation', "0 90 0"))*/
      console.log(this.el.getAttribute("rotation"))}
    
        
  }
})


},{}],37:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("script", {
  schema: {
    src: { type: "string" },
    call: { type: "string" },
    args: { type: "array" },
  },

  async update(oldData) {
    if (this.data.src !== oldData.src) {
      if (this.script) {
        if (this.el.isPlaying)
          this.script.pause?.()
        this.script.remove?.()
      }
      this.script = null

      let response = await fetch(this.data.src)
      if (response.status >= 200 && response.status < 300) {
        this.script = eval(await (await (response).text()))
        this.script.el = this.el
        if (this.script.events) {
          for (let event in this.script.events) {
            this.script.events[event] = this.script.events[event].bind(this.script)
          }
        }
      } else {
        console.error("Could not load", this.data.src)
      }
      this.script.init?.()
      if (this.el.isPlaying)
        this.script.play?.()
    }
    if (this.script && this.data.call?.trim()) {
      this.script[this.data.call.trim()](...this.data.args)
      this.el.setAttribute("script", "call", "")
    }
  },

  remove() {
    if (!this.script) return
    this.script.remove?.(...arguments)
  },
  tick() {
    if (!this.script) return
    this.script.tick?.(...arguments)
  },
  tock() {
    if (!this.script) return
    this.script.tock?.(...arguments)
  },
  play() {
    if (!this.script) return
    if (this.script.events) {
      for (let event in this.script.events) {
        this.el.addEventListener(event, this.script.events[event])
      }
    }
    this.script.play?.(...arguments)
  },
  pause() {
    if (!this.script) return
    if (this.script.events) {
      for (let event in this.script.events) {
        this.el.removeEventListener(event, this.script.events[event])
      }
    }
    this.script.pause?.(...arguments)
  },
})

},{}],38:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent("trigger", {
  schema: {
    objects: { type: "string", default: ".head-bumper" },
  },

  init() {
    this._refreshTO = setInterval(this.refreshObjects.bind(this), 1024)
  },

  remove() {
    clearInterval(this._refreshTO)
  },

  tick() {
    if (!this.objects) return this.refreshObjects()
    let local = THREE.Vector3.temp()
    let width = this.el.components.geometry.data.width
    let height = this.el.components.geometry.data.height
    let depth = this.el.components.geometry.data.depth
    let radius = this.el.components.geometry.data.radius
    let inside
    for (let obj of this.objects) {
      obj.object3D.localToWorld(local.set(0, 0, 0))
      this.el.object3D.worldToLocal(local)
      switch (this.el.tagName.toLowerCase()) {
        case "a-sphere":
          inside = local.length() < radius
          break
        case "a-box":
          inside = Math.abs(local.x) < width / 2
            && Math.abs(local.y) < height / 2
            && Math.abs(local.z) < depth / 2
          break
        case "a-cylinder":
          inside = Math.abs(local.y) < height / 2
          local.y = 0
          inside = inside && local.length() < radius
          break
      }
      if (inside && this.triggered.indexOf(obj) < 0) {
        let d = {
          trigger: this.el,
          object: obj,
        }
        this.el.addState("triggered")
        this.el.emit("trigger", d)
        obj.emit("trigger", d)
        this.triggered.push(obj)
      }
      if (!inside && this.triggered.indexOf(obj) >= 0) {
        let d = {
          trigger: this.el,
          object: obj,
        }
        this.el.emit("untrigger", d)
        obj.emit("untrigger", d)
        this.triggered.splice(this.triggered.indexOf(obj), 1)
        if (!this.triggered.length)
          this.el.removeState("triggered")
      }
    }
  },

  refreshObjects() {
    this.objects = this.objects || []
    this.triggered = this.triggered || []
    this.objects.splice(0, this.objects.length)
    let els = this.el.sceneEl.querySelectorAll(this.data.objects)
    if (!els) return
    els.forEach(el => {
      this.objects.push(el)
    })
    for (let i = 0; i < this.triggered.length; i++) {
      let obj = this.triggered[i]
      if (this.objects.indexOf(obj) < 0) {
        this.triggered.splice(i, 1)
        i--
      }
    }
  },


})

},{}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-beaker", {

  defaultComponents: {
    injectbeaker: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectbeaker.name' ,
        solute: 'injectbeaker.solute' ,
        volume: 'injectbeaker.volume' ,
        percent: 'injectbeaker.percent' ,
        opacity: 'injectbeaker.opacity',
        colorliq: 'injectbeaker.colorliq',
        
  }
})
},{}],46:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-cylindergraduate", {

  defaultComponents: {
    injectcylindergraduate: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injectcylindergraduate.name' ,
        solute: 'injectcylindergraduate.solute' ,
        volume: 'injectcylindergraduate.volume' ,
        percent: 'injectcylindergraduate.percent' ,
        opacity: 'injectcylindergraduate.opacity',
        colorliq: 'injectcylindergraduate.colorliq',
        
  }
})
},{}],47:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-erlenmeyer", {

  defaultComponents: {
    injecterlenmeyer: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injecterlenmeyer.name' ,
        solute: 'injecterlenmeyer.solute' ,
        volume: 'injecterlenmeyer.volume' ,
        percent: 'injecterlenmeyer.percent' ,
        opacity: 'injecterlenmeyer.opacity',
        colorliq: 'injecterlenmeyer.colorliq',
        
  }
})
},{}],48:[function(require,module,exports){
/* global AFRAME, THREE */


AFRAME.registerPrimitive("a-fluorescent", {
  
  defaultComponents: {
    geometry: {
      primitive: "cylinder", radius: 0.05, height: 1
    },
    material: {
       color: "white", roughness: 0, metalness: 0.5, opacity: 0.7, shader: "standard", emissive: "white", emissiveIntensity: 45,  ambientOcclusionMapIntensity :1
      },
    
    rotation: {},
    position:{},
    scale:{},
    injectfluo: {},
    
    
  },
  mappings: {
    
    intensity: "injectfluo.intensity",
           
  }
})




  
  
  
  


  
},{}],49:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-glasses", {

  defaultComponents: {
    injectglasses: {},
    position:{},
        rotation :{},
        scale:{}
  },
  
  mappings: {
    volume: 'injectglasses.volume' ,
        waterlevel: 'injectglasses.waterleve' ,
        opacity: 'injectglasses.opacity',
        colorliq: 'injectglasses.colorliq',
        
  }

})
},{}],50:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-glove", {
  defaultComponents: {
    injectglove: {}
  }
})

},{}],51:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-hand", {
  mappings: {
    side: "tracked-controls.hand"
  }
})

},{}],52:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-laboratory", {})
},{}],53:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-main", {})
},{}],54:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-player", {
  defaultComponents: {
    injectplayer: {}
  }
})
},{}],55:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-testtube", {

  defaultComponents: {
    injecttesttube: {},
    position:{},
        rotation :{},
        scale:{}
  },
  mappings: {
        name: 'injecttesttube.name' ,
        solute: 'injecttesttube.solute' ,
        volume: 'injecttesttube.volume' ,
        percent: 'injecttesttube.percent' ,
        opacity: 'injecttesttube.opacity',
        colorliq: 'injecttesttube.colorliq',
        
  }
})
},{}],56:[function(require,module,exports){
AFRAME.registerState({
    initialState: {
      device: "desktop"
    },
  
    handlers: {
      setDevice: function (state, devtype) {
        state.device = devtype;
      },
  
      
    }
  })
  AFRAME.registerComponent('device-changer', {
    init: function () {
      this.el.addEventListener('click', (evt) => {
        this.el.sceneEl.emit('setDevice', evt.target.getAttribute('name').value.toLowerCase());   
      });
    }
  });
},{}],57:[function(require,module,exports){
AFRAME.registerComponent('laboratory', {
    schema: {

    },

    init() {
        var scene = document.querySelector('a-scene');
        var scene = document.querySelector('laboratory');
        this.run = AFRAME.utils.bind(this.run, this);
        this.run()

    },

    update() {
        // Do something when component's data is updated.
    },

    remove() {
        // Do something the component or its entity is detached.
    },

    tick(time, timeDelta) {
        // Do something on every scene tick or frame.
    },
    run() {
        var laborecit = document.querySelector('a-laboratory');
        

        // Do something when component first attached.

        var laboratoryitems = Array.prototype.slice.call(laborecit.querySelectorAll('.laboratory'));
        console.log("laboratoryitems " + laboratoryitems)
        var laboratoryitemsid = [];
        var laboratoryitemsidt = laboratoryitems.forEach(function (element, index) 
        {
            var innerscience = ""
            console.log(element.getAttribute("id"))
            console.log(element)
            console.log(element.getAttribute("name"))
            laboratoryitemsid[element.getAttribute("id")] = element.getAttribute("id")
            //this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
            //console.log("sciencepannel "+ sciencepannel)
            innerscience += ` 
                <a-gui-label
                    id = "labela` + index + `"
                    width="2.5" height="0.75"
                    value="` + element.getAttribute("name") + `"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-label
                    width="2.5" height="0.75"
                    value="V total"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-slider 	
                    id = "slider_v_` + element.getAttribute("id")+`"
                    width="2.5" height="0.75"
                    onclick="slideActionFunction"
                    percent=` + element.getAttribute("percent") + `
                    margin="0 0 0.05 0"
                    >
                </a-gui-slider>
                <a-gui-label
                    width="2.5" height="0.75"
                    value="Masse soluté"
                    font-family="assets/fonts/DiplomataSC-Regular.ttf"
                    font-size="0.35"
                    line-height="0.8"
                    letter-spacing="0"
                    margin="0 0 0.05 0"
                >
                </a-gui-label>
                <a-gui-slider 	
                        id = "slider_sol_` + element.getAttribute("id")+`"
                        width="2.5" height="0.75"
                        onclick="slideActionFunction"
                        percent=` + element.getAttribute("opacity") + `
                        margin="0 0 0.05 0"
                >
                </a-gui-slider>
                `
                            
                laborecit.ensure(".a-gui-flex-container"+index, "a-gui-flex-container", {
                    ["flex-direction"]: "column",
                    ["justify-content"]: "center",
                    ["align-items"]: "normal",
                    ["component-padding"]: "0.1",
                    opacity: "0.7",
                    width: "3",
                    height: "4.5",
                    position: 0 +index*0.3 + " 1.5 -1",
                    rotation: "0 0 0",
                    scale: "0.1 0.1 0.1"
                }, innerscience)
        })
                
    }
});
},{}]},{},[2]);
