console.log("p1 est chargé")




  function haltEvent(event) {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
  }

  // prevent right-click menus from appearing
  document.addEventListener('contextmenu', haltEvent);
  // more attempts to prevent right-click menus from appearing -- avoid; they block touchscreen/iPad controls
  // document.addEventListener('touchmove', haltEvent );
  // document.addEventListener('touchcancel', haltEvent );

  // add events for both touch and mouse controls
  function addButtonEventListeners(buttonElementID, startFunction, endFunction) {
    let element = document.getElementById(buttonElementID);
    element.addEventListener('touchstart', startFunction);
    element.addEventListener('mousedown', startFunction);
    element.addEventListener('touchend', endFunction);
    element.addEventListener('mouseup', endFunction);
  }

  function associateMovementControls(buttonElementID, component, keyName) {
    addButtonEventListeners(buttonElementID,
      function (event) {
        component.registerKeyDown(keyName);
        return haltEvent(event);
      },
      function (event) {
        component.registerKeyUp(keyName);
        return haltEvent(event);
      }
    );
  }

  // need to run javascript code after a-scene entities and components are loaded
  AFRAME.registerComponent('screen-controls', {
    init: function () {
      let component = document.getElementById('cameraRig').components['extended-wasd-controls'];

      associateMovementControls('buttonMoveForward', component, component.data.moveForwardKey);
      associateMovementControls('buttonMoveBackward', component, component.data.moveBackwardKey);
      associateMovementControls('buttonMoveLeft', component, component.data.moveLeftKey);
      associateMovementControls('buttonMoveRight', component, component.data.moveRightKey);
      associateMovementControls('buttonMoveUp', component, component.data.moveUpKey);
      associateMovementControls('buttonMoveDown', component, component.data.moveDownKey);
    },

    tick: function (time, deltaTime) {

    }
  });

  var sceneEl = document.querySelector('a-scene');
  AFRAME.registerComponent('selectionne', {

    init: function () {
      console.log(this.el.sceneEl);
      console.log(sceneEl.querySelectorAll('.clickable')); // Reference to the scene element.
    }
  });
  AFRAME.registerComponent('recitclickable', {
    schema: {
      'linkto': {
        type: "string",
        default: ""
      },
    },

    init: function () {
      var el = document.querySelector('[recitclickable]');

      this.el.addEventListener("click", () => {
        console.log("click");
        window.open(this.el.getAttribute('recitclickable'), "_self");
      });
    }
  });

  function toggledoor() {
    console.log('toggleSound on/off');
    document.querySelectorAll('#door').forEach(function (door) {


      console.log(this.document.querySelector('#door').getAttribute('door')['state']);
      if (this.document.querySelector('#door').getAttribute('door')['state'] === "closed") {
        door.emit('open');
        console.log(this.document.querySelectorAll('#door')[0].getAttribute('door')['state']);
        this.document.querySelector('#door').getAttribute('door')['state'] = 'open';
      } else {
        console.log(this.document.querySelector('#door').getAttribute('door')['state']);
        door.emit('close');
        this.document.querySelector('#door').getAttribute('door')['state'] = 'closed';
      }
    });

  }
  function changepage(){
      console.log(document.querySelector('#page1'));
    document.querySelector('#page1').websurface_iframe.setAttribute('src','https://www.csbe.qc.ca');
    document.querySelector('#page1').reload;

  }

  /*  function closedoor() {
      console.log('toggleSound on/off');
      document.querySelectorAll('#door').forEach(function (door) {
        door.emit('close');
      });

    }*/
function desk (posit){
        var cylinder = document.createElement('a-obj-model');
        /*cylinder.setAttribute('dynamic-body', 'shape: box; mass: 10; ');*/
        /*cylinder.setAttribute('spring', 'target: #floor; damping: 1; stiffness: 100;');*/
        cylinder.setAttribute('src', '#desk1-obj');
        cylinder.setAttribute('mtl', '#desk1-mtl');
        cylinder.setAttribute('position', posit);
        cylinder.setAttribute('scale', '1.1 1.1 1.1');
        cylinder.setAttribute('rotation', '0 90 0');
        cylinder.setAttribute('shadow','receive:true');
        scene.appendChild(cylinder);
        console.log(posit);
      }
      function wall (posit, rot){
        var wall = document.createElement('a-gltf-model');
        /*wall.setAttribute('dynamic-body', 'shape: box; mass: 10; ');*/
        /*wall.setAttribute('spring', 'target: #floor; damping: 1; stiffness: 100;');*/
        wall.setAttribute('src', '#murv2a-obj');
        wall.setAttribute('position', posit);
        wall.setAttribute('rotation', rot);
        wall.setAttribute('shadow','receive:true');
        
        scene.appendChild(wall);
        console.log(posit,rot);
      }
    