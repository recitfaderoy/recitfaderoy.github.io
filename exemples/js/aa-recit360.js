(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "a-recit360",
  "title": "A-RECIT360",
  "version": "0.01.0",
  "description": "Education component game based for A-Frame",
  "homepage": "avenir/README.md",
  "main": "index.js",
  "scripts": {
    "prepare": "npm run build",
    "clean": "rm dist/*.js || del dist\\*.js",
    "build": "npm run clean && foreach -g src/*.js -x \"browserify #{path} -o dist/#{name}.js\" && npm run minify",
    "watch": "npm run clean && foreach -g src/*.js -C -x \"watchify #{path} -d -o dist/#{name}.js\"",
    "minify": "foreach -g dist/*.js -C -x \"minify #{path} > dist/#{name}.min.js\"",
    "bump": "npm version minor --no-git-tag-version",
    "gitadd": "git add package*.json dist/*.js"
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


require("./components/htmlembed")
require("./components/helper")
require("./components/hotspot")
require("./components/panorama")
require("./components/tour")
require("./components/recitpreloader1")


require("./primitives/a-hotspot")
require("./primitives/a-panorama")
require("./primitives/a-tour")


const pkg = require("../package")
console.log(`${pkg.title} Version ${pkg.version} by ${pkg.author}\n(${pkg.homepage})`)

},{"../package":1,"./components/helper":3,"./components/hotspot":4,"./components/htmlembed":6,"./components/panorama":7,"./components/recitpreloader1":8,"./components/tour":9,"./libs/betterRaycaster":10,"./libs/copyWorldPosRot":11,"./libs/ensureElement":12,"./libs/pools":13,"./libs/touchGestures":14,"./primitives/a-hotspot":15,"./primitives/a-panorama":16,"./primitives/a-tour":17}],3:[function(require,module,exports){
/* global AFRAME, THREE */

AFRAME.registerComponent('hotspot-helper', {
  schema: {
    target: {type: 'selector'},
    distance: {type: 'number', default: 5},
    distanceIncrement: {type: 'number', default: 0.25},
  },

  init: function () {
    if (!this.data.target) {
      console.error('Hotspot-helper: You must specify a target element!');
      return;
    }

    var self = this;

    this.camera = document.querySelector('[camera]','a-camera');
    this.targetRotationOrigin = this.data.target.getAttribute('rotation');
    this.targetPositionOrigin = this.data.target.getAttribute('position');

    // Helper UI.
    var uiContainer = this.makeUi();
    document.body.appendChild(uiContainer);

    // Enabled.
    this.enabled = uiContainer.querySelector('#hh-enabled');
    this.enabled.addEventListener('click', function () {
      uiContainer.dataset.enabled = !!self.enabled.checked;
    });

    // Set distance.
    var distanceInput = this.distanceInput = uiContainer.querySelector('#hh-distance');
    distanceInput.addEventListener('input', function () {
      self.updateDistance(this.value);
    });
    distanceInput.value = this.data.distance;

    // Copy position to clipboard.
    var copyPosition = uiContainer.querySelector('#hh-copy-position');
    copyPosition.addEventListener('click', function () {
      self.copyToClipboard(self.position);
    });

    // Mouse-wheel distance.
    window.addEventListener('wheel', this.handleWheel.bind(this));

    // Rotation.
    this.rotation = uiContainer.querySelector('#hh-rotation');

    // Copy rotation to clipboard.
    var copyRotation = uiContainer.querySelector('#hh-copy-rotation');
    copyRotation.addEventListener('click', function () {
      self.copyToClipboard(self.rotation);
    });

    // Look at.
    this.lookToggle = uiContainer.querySelector('#hh-lookat');

    // Position.
    this.position = uiContainer.querySelector('#hh-position');

    // Empty object3D for position.
    var targetObject = this.targetObject = new THREE.Object3D();
    this.dolly = new THREE.Object3D();
    this.dolly.add(targetObject);
    this.el.object3D.add(this.dolly);
    this.updateDistance(this.data.distance);

    // Set positioning on target so that clicks are not triggered when placing hotspot.
    this.data.target.setAttribute('hotspot', {positioning: true});
  },

  makeUi: function () {
    var uiContainer = document.createElement('div');
    uiContainer.id = 'hh';
    var markup = `
    <style>
      #hh-heading {
        font-family: Consolas, Andale Mono, monospace;
      }

      #hh {
        background: #333;
        color: #fff;
        font-family: Helvetica, Arial, sans-serif;
        left: 0;
        margin: 10px;
        padding: 10px;
        position: absolute;
        top: 0;
      }

      #hh h1 {
        margin: 0;
      }

      #hh h2 {
        font-weight: 200;
        margin: 10px 0;
      }

      #hh[data-enabled="false"] section {
        display: none;
      }

      #hh section {
        margin: 20px 0;
      }

      #hh .hh-check,
      #hh .hh-tip {
        display: block;
        font-size: .75rem;
        margin: 8px 0;
      }

      #hh .hh-tip {
        color: rgb(148,148,148);
      }

      #hh input[type="text"] {
        border: none;
        background: rgb(108,108,108);
        color: #fff;
        padding: 5px;
      }

      #hh input[type="button"] {
        background: #fff;
        border: none;
        padding: 5px;
      }

      #hh input[type="button"]:active {
        background: rgb(47,77,135);
        color: #fff;
      }
    </style>

    <h1 id="hh-heading" class="hh-heading">hotspot-helper</h1>

    <span class="hh-check">
      <label>
        <input id="hh-enabled" type="checkbox" checked> Enabled
      </label>
    </span>

    <section>
      <label>
        <input id="hh-distance" size="5" type="text"> Hotspot distance
        <span class="hh-tip">Use mouse scroll to adjust distance</span>
      </label>
    </section>

    <section>
      <label>
        <h2>Position</h2>
        <input id="hh-position" size="20" type="text" value="1.000 1.000 1.000">
        <input id="hh-copy-position" type="button" value="Copy to Position">
      </label>
    </section>

    <section>
      <h2><label for="hh-rotation">Rotation</label></h2>
      <input id="hh-rotation" size="20" type="text" value="1.000 1.000 1.000">
      <input id="hh-copy-rotation" type="button" value="Copy to Rotation">
      <label>
        <span class="hh-check">
          <input id="hh-lookat" type="checkbox"> Look at origin
        </span>
      </label>
    </section>
    `;
    uiContainer.innerHTML = markup;
    return uiContainer;
  },

  updateDistance: function (distance) {
    this.targetObject.position.z = -distance;
  },

  copyToClipboard: function (input) {
    input.select();
    document.execCommand('copy');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  },

  handleWheel: function (e) {
    var input = this.distanceInput;
    var data = this.data;
    var increment = e.deltaY < 0 ? data.distanceIncrement : -data.distanceIncrement;
    var value = parseFloat(input.value) + increment;
    if (value < 0) {
      value = 0;
    }
    input.value = value;
    this.updateDistance(value);
  },

  updateRotation: function () {
    var target = this.data.target;
    if (this.lookToggle.checked) {
      if (!target.hasAttribute('look-at')) {
        target.setAttribute('look-at', '[camera]');
      }
      var worldRotation = new THREE.Quaternion();
      this.data.object3D.getWorldQuaternion(worldRotation);
      //var worldRotation = this.data.Object3D.getWorldQuaternion( target );
      this.rotation.value = this.toDeg(worldRotation.x).toFixed(2) + ' ' + this.toDeg(worldRotation.y).toFixed(2) + ' ' + this.toDeg(worldRotation.z).toFixed(2);
    } else {
      if (target.hasAttribute('look-at')) {
        target.removeAttribute('look-at');
      }
      this.rotation.value = `${this.targetRotationOrigin.x} ${this.targetRotationOrigin.y} ${this.targetRotationOrigin.z}`;
      target.setAttribute('rotation', this.targetRotationOrigin);
    }
  },

  toDeg: function (rad) {
    return rad * 180 / Math.PI;
  },

  tick: function () {
    
    var target = this.data.target;
    if (!target) return;
    if (this.enabled.checked) {
      var rotation = new THREE.Quaternion();
      this.camera.object3D.getWorldQuaternion(rotation);
     // var rotation = this.camera.Object3D.getWorldQuaternion(  );
      this.dolly.rotation.copy(rotation);
      var position = this.targetObject.getWorldPosition();
      var cords = position.x.toFixed(2) + ' ' + position.y.toFixed(2) + ' ' + position.z.toFixed(2);
      target.setAttribute('position', {
        x: position.x,
        y: position.y,
        z: position.z
      });
      this.position.value = cords;
      this.updateRotation();
    } else {
      target.setAttribute('position', this.targetPositionOrigin);
      target.setAttribute('rotation', this.targetRotationOrigin);
    }
  }
});

},{}],4:[function(require,module,exports){
AFRAME.registerComponent('hotspot', {
    schema: {
      for: { type: 'string' },
      to: { type: 'string' },
      positioning: { type: 'boolean', default: false }
    },
  
    init: function () {
      this.tour = document.querySelector('a-tour');
      this.el.addEventListener('click', this.handleClick.bind(this));
    },
  
    handleClick: function () {
      if (this.data.positioning) return;
      var tour = this.tour.components['tour'];
      tour.loadSceneId(this.data.to);
    }
  });
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./htmlcanvas.js":5}],7:[function(require,module,exports){
AFRAME.registerComponent('panorama', {
    schema: {
      rotation: { type: 'vec3' },
      src: { type: 'string' }
    }
  });
},{}],8:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
	            this.el.setAttribute('vr-mode-ui','enabled','false');
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

	            switch(assetItems[a].nodeName){
	                case 'A-ASSET-ITEM':
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
	                        this.closeBtn.ttribute('style','display: inline-block');
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

	       
	            var $modal = $('' +
				'<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
 '<div class="modal-dialog modal-dialog-centered" role="document">'+
    '<div class="modal-content">'+
     ' <div class="modal-header">'+
	 '<h5 class="modal-title"> '+this.data.title+'</h5>'+
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
          '<span aria-hidden="true">&times;</span>'+
        '</button>'+
      '</div>'+
     ' <div class="modal-body">'+
	 '<div class="progress">'+
	 '<div class="progress-bar progress-bar bg-success active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 25%">'+
	 '<span class="progress-label">Loading 0% Complete</span>'+
	 '</div>'+
	 '</div>'+
	 '<div class="p-2">'+
	 '<h5 class="modal-title" >Consignes</h5>'+
	 '<p><i class="fa fa-laptop" aria-hidden="true"></i> Si vous utilisez le clavier d\'un ordinateur ou un chromebook, utilisez <b>w </b> pour avancer, <b>s </b> pour reculer,<b>a </b> pour aller à gauche,  <b>d </b> pour aller à droite.'+

					'<p><i class="fa fa-gamepad" aria-hidden="true"></i> Si vous utilisez la mantette de jeux d\'un ordinateur ou un chromebook...</p>'+
					'<p><i class="fa fa-mobile" aria-hidden="true"></i> Si vous utilisez un cellulaire...</p>'+
					'<p><i class="fas fa-vr-cardboard"></i> Si vous utilisez un appareil de réalité virtuelle...</p>'+
					' </div>'+
					'</div>'+
					' </div>'+
     ' <div class="modal-footer">'+
       
    
      '</div>'+
   ' </div>'+
 ' </div>'+
'</div>'+
	               
	                '');
	        

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
	            this.el.setAttribute('vr-mode-ui','enabled','true');
	        }
	        this.el.emit('preloading-complete');
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


},{}]},{},[1]);

},{}],9:[function(require,module,exports){
AFRAME.registerComponent('tour', {
    init: function () {
      this.sky = document.createElement('a-sky');
      this.el.appendChild(this.sky);
      var images = Array.prototype.slice.call(this.el.querySelectorAll('a-panorama'));
      if (images.length === 0) {
        console.error('You need to specify at least 1 image!');
        return;
      }
      var start = images[0];
      this.loadSceneId(start.getAttribute('id'));
    },
  
    loadSceneId: function(id) {
      this.loadImage(this.el.querySelector('a-panorama#' + id));
      this.setHotspots(id);
    },
  
    loadImage: function (image) {
      var sky = this.sky;
      sky.setAttribute('src', image.getAttribute('src'));
      var camera = this.el.sceneEl.camera.el;
      camera.setAttribute('rotation', image.getAttribute('rotation'));
    },
  
    setHotspots: function(id) {
      var hotspots = Array.prototype.slice.call(this.el.querySelectorAll('a-hotspot'));
      hotspots.forEach(function (spot) {
        var visible = spot.getAttribute('for') == id ? true : false;
        spot.setAttribute('visible', visible);
      })
    }
  });
  
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
AFRAME.registerPrimitive('a-hotspot', {
  defaultComponents: {
    hotspot: {}
  },
  mappings: {
    for: 'hotspot.for',
    to: 'hotspot.to'
  }
});


},{}],16:[function(require,module,exports){
AFRAME.registerPrimitive('a-panorama', {
  defaultComponents: {
    panorama: {}
  }
});


},{}],17:[function(require,module,exports){
AFRAME.registerPrimitive('a-tour', {
  defaultComponents: {
    tour: {}
  }
});



},{}]},{},[2]);
