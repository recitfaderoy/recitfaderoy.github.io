AFRAME.registerSystem("physics", {
    init() {
        this.playerList = [];
        this.collidableElements = [];
        this.draggableElements = [];
        this.dropZoneElements = [];
    },

    registerPlayer(el) {
        this.player = el;
    },

    getElementList(type){
        switch(type){
            case 'player':
                return 'playerList';
            case 'collidable':
                return 'collidableElements';
            case 'draggable':
                return 'draggableElements';
            case 'drop-zone':
                return 'dropZoneElements';
            default:
                console.log(`Element type '${type}' unknown.`);
                return null;
        }
    },

    registerMe(el, type){
        let elementList = this.getElementList(type);

        if(!elementList){ return; }

        this[elementList].push(el);

        if((type === 'draggable') || (type === 'drop-zone')){
            for(let dragItem of this.draggableElements){
                for(let dropItem of this.dropZoneElements){
                    // call removeEventListener to be sure to have one single listener
                    dragItem.el.removeEventListener('dragstart', dropItem.onDragStart);
                    dragItem.el.addEventListener('dragstart', dropItem.onDragStart);
                    dragItem.el.removeEventListener('dragend', dropItem.onDragEnd);
                    dragItem.el.addEventListener('dragend', dropItem.onDragEnd);
                    dragItem.el.removeEventListener('drag', dropItem.onDrag);
                    dragItem.el.addEventListener('drag', dropItem.onDrag);
                    dropItem.el.removeEventListener('dropstart', dragItem.onDropStart);
                    dropItem.el.addEventListener('dropstart', dragItem.onDropStart);
                }
            }
        }

        if((type === 'player') || (type === 'collidable') || (type === 'draggable')){
            for(let collidItem of this.collidableElements){
                for(let player of this.playerList){
                    // call removeEventListener to be sure to have one single listener
                    player.el.removeEventListener('move', collidItem.onMove);
                    player.el.addEventListener('move', collidItem.onMove);
                    collidItem.el.removeEventListener('collide', player.onCollide);
                    collidItem.el.addEventListener('collide', player.onCollide);
                }

                for(let dragItem of this.draggableElements){
                    // call removeEventListener to be sure to have one single listener
                    dragItem.el.removeEventListener('drag', collidItem.onMove);
                    dragItem.el.addEventListener('drag', collidItem.onMove);
                    collidItem.el.removeEventListener('collide', dragItem.onCollide);
                    collidItem.el.addEventListener('collide', dragItem.onCollide);
                }
            }
        }
    },
    
    unregisterMe(el, type) {
        let listElements = this.getElementList(type);;

        if(!elementList){ return; }

        let index = this[listElements].indexOf(el);
        this[listElements].splice(index, 1);

        if((type === 'draggable') || (type === 'drop-zone')){
            for(let dragItem of this.draggableElements){
                for(let dropItem of this.dropZoneElements){
                    dragItem.el.removeEventListener('dragstart', dropItem.onDragStart);
                    dragItem.el.removeEventListener('dragend', dropItem.onDragEnd);
                    dragItem.el.removeEventListener('drag', dropItem.onDrag);
                    dropItem.el.removeEventListener('dropstart', dragItem.onDropStart);
                }
            }
        }        
    },
});

AFRAME.registerPrimitive("a-player", {
    defaultComponents: {
        player: {},
    },
   
        mappings: {
            start: 'player.start',
            startr: 'player.startr',
        }
    }
);

AFRAME.registerComponent('player', {
   // dependencies: ['camera'],

    schema: { 
        start: {type:"vec3", default: {x: 0, y: -0.5, z: 3}},
    // the id of the element with constroller listener component attached
    controllerListenerId:  {type: 'string', default: "#controller-data"},
    // the id of the element with raycaster attached, for teleport movement
    raycasterId:           {type: 'string', default: "#right-controller"},
    navigationMeshClass:   {type: 'string', default: "navMesh"},
    teleportEnabled:       {type: 'boolean', default: true},
    motionEnabled:         {type: 'boolean', default: true},
},

    init(){
        console.log(this.data.start)
        this.onCollide = this.onCollide.bind(this);
        
        this.controllerData = document.querySelector(this.data.controllerListenerId).components["controller-listener"];

        // use raycaster data for teleport
        if ( document.querySelector(this.data.raycasterId) )
            this.raycaster = document.querySelector(this.data.raycasterId).components["raycaster"];
        else
            this.raycaster = null;

        this.clock = new THREE.Clock();

        this.moveSpeed = 1; // units per second

        // create a vector to store camera direction
        this.cameraDirection = new THREE.Vector3();

        // quick turns
        this.turnReady = true;
        this.startAngle = 0;
        this.endAngle = 0;
        this.turnInProgress = false;
        this.turnAngle = 45;
        this.turnDuration = 0.10;
        this.turnTime = 0;
        this.enabled = true;

        this.el.sceneEl.systems.physics.registerMe(this, 'player');

        this.data = {
            previousPos: new THREE.Vector3(this.data.start.x,this.data.start.y,this.data.start.z),
            //previousPos: this.data.start,

           // previousPoss: new THREE.Vector3(0,-.5, -1),

            previousRot: new THREE.Quaternion()
        };
console.log(this.data.previousPos,this.data.previousPoss)
        let geometry = new THREE.BoxBufferGeometry(.25, 0.25, .25);
        let mesh = new THREE.Mesh(geometry, this.data.material);
        mesh.position.set(0, 0, 0);
        this.el.setObject3D('mesh', mesh);
    },
    lerp: function(startValue, endValue, percent)
    {
        return startValue + (endValue - startValue) * percent;
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'player');
    },

    onCollide(event){
        let camera = this.el.object3D;
        camera.position.copy(this.data.previousPos);
    },

    tick(){
        this.deltaTime = this.clock.getDelta();

        if ( !this.enabled )
            return;

            // =====================================================================
        // moving on horizontal (XZ) plane
        // =====================================================================

        // move with left joystick (while not pressing left grip);
        //   move faster when pressing trigger
        this.leftJoystickLength = Math.sqrt(this.controllerData.leftAxisX * this.controllerData.leftAxisX + 
            this.controllerData.leftAxisY * this.controllerData.leftAxisY );

if ( this.data.motionEnabled &&
this.leftJoystickLength > 0.001 && 
!this.controllerData.leftGrip.pressing )
{
// this.cameraDirection: a vector to store camera direction
this.el.sceneEl.camera.getWorldDirection(this.cameraDirection);
this.cameraAngle = Math.atan2(this.cameraDirection.z, this.cameraDirection.x);

this.leftJoystickAngle = Math.atan2(this.controllerData.leftAxisY, this.controllerData.leftAxisX);

this.moveAngle = this.cameraAngle + this.leftJoystickAngle;

this.moveDistance = this.moveSpeed * this.deltaTime;

// move faster if pressing trigger at same time
this.moveDistance *= (1 + 9 * this.controllerData.leftTrigger.value);

// convert move distance and angle to right and forward amounts
// scale by magnitude of joystick press (smaller press moves player slower)
this.moveRight   = -this.leftJoystickLength * Math.sin(this.moveAngle) * this.moveDistance;
this.moveForward =  this.leftJoystickLength * Math.cos(this.moveAngle) * this.moveDistance;

this.el.object3D.position.x = this.el.object3D.position.x + this.moveRight;
this.el.object3D.position.z = this.el.object3D.position.z + this.moveForward;

let camera = this.el.object3D;
    
        if(camera.position.distanceTo(this.data.previousPos) > 0){
            camera.position.set(camera.position.x, -.5, camera.position.z) // prevent offset on Y axis
            this.el.emit('move', this);
            console.log("is mouving...")
            camera.getWorldPosition(this.data.previousPos);}
        }

// =====================================================================
// turning in horizontal (XZ) plane
// =====================================================================

// while pressing left grip, press left joystick left/right to turn left/right by N degrees;
// -or- just press right joystick left/right to turn left/right by N degrees.
//  joystick must return to rest/center position before turning again
this.leftX  = this.controllerData.leftAxisX;
this.rightX = this.controllerData.rightAxisX;

if ( Math.abs(this.leftX) < 0.10 && Math.abs(this.rightX) < 0.10 )
{           
this.turnReady = true;
}

if ( this.data.motionEnabled && this.turnReady &&
((this.controllerData.leftGrip.pressing && Math.abs(this.leftX) > 0.90) || Math.abs(this.rightX) > 0.90)
)
{
this.startAngle = this.el.getAttribute("rotation").y;

if ( this.leftX > 0.90 || this.rightX > 0.90 )
this.endAngle = this.startAngle - this.turnAngle;
if ( this.leftX < -0.90 || this.rightX < -0.90 )
this.endAngle = this.startAngle + this.turnAngle;

this.turnInProgress = true;
this.turnTime = 0;
this.turnReady = false;
}

if (this.turnInProgress)
{
this.turnTime += this.deltaTime;
this.rot = this.el.getAttribute("rotation");
this.rot.y = this.lerp(this.startAngle, this.endAngle, this.turnTime/this.turnDuration);
this.el.setAttribute("rotation", this.rot);

if (this.turnTime >= this.turnDuration)
this.turnInProgress = false;
}

// =====================================================================
// vertical movement (Y axis)
// =====================================================================

// while pressing left grip, press left joystick up/down to move up/down;
//   move faster while pressing trigger.
// includes extended deadzone adjustment 
//   to avoid unintended simultaneous turning and vertical movement
if ( this.data.motionEnabled && 
this.controllerData.leftGrip.pressing && 
Math.abs(this.controllerData.leftAxisY) > 0.25 )
{
this.y = this.controllerData.leftAxisY;
this.y = Math.sign(this.y) * (Math.abs(this.y) - 1/4);
this.moveDistance = -this.moveSpeed * this.y * this.deltaTime;
// move faster if pressing trigger at same time
this.moveDistance *= (1 + 9 * this.controllerData.leftTrigger.value);

this.el.object3D.position.y = this.el.object3D.position.y + this.moveDistance;

        
    }}
});

AFRAME.registerComponent('collision-detection', {
    schema: {
        method: {type:'string', default: 'm1'},
    },

    init(){
        this.onMove = this.onMove.bind(this);

        this.el.sceneEl.systems.physics.registerMe(this, 'collidable');

        this.data.bsp1 = new CSG();
        this.data.bsp2 = new CSG();

        this.data.box1 = new THREE.Box3();
        this.data.box2 = new THREE.Box3();

        this.data.box3 = new THREE.Box3();
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'collidable');
    },

    onMove(event){
        let mesh =  event.detail.el.getObject3D('mesh');
        
        /*
         TODO: Transform GLTF object into mesh for collision detection method 2 (not yet working)

        if(mesh instanceof THREE.Group){
            // conform to the object size like it's a boundingBox
            this.data.box3.setFromObject(mesh);

            // make a BoxBufferGeometry of the same size as Box3
            const dimensions = new THREE.Vector3().subVectors( this.data.box3.max, this.data.box3.min );
            const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);

            // move new mesh center so it's aligned with the original object
            const matrix = new THREE.Matrix4().setPosition(dimensions.addVectors(this.data.box3.min, this.data.box3.max).multiplyScalar( 0.5 ));
            boxGeo.applyMatrix4(matrix);

            // make a mesh
            mesh = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial());

           // this.el.sceneEl.object3D.add(mesh);
        }*/

        if(this.checkCollision(mesh)){
            this.el.emit('collide', this);
        }
    },

    checkCollisionM1(mesh){
        let obj = this.el.getObject3D('mesh');
        
        if(typeof obj === 'undefined'){ return false; }

        this.data.box1.setFromObject(obj);
        this.data.box2.setFromObject(mesh);

        let result = this.data.box1.intersect(this.data.box2);

        if(!result.isEmpty()){
            /* DEBUG */
            this.data.box1.expandByPoint(mesh.position);
            const dimensions = new THREE.Vector3().subVectors( this.data.box1.max, this.data.box1.min );
            const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
            const mesh2 = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial( { wireframe: true, color: '#F00' } ));
            mesh2.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
            this.el.sceneEl.object3D.add(mesh2);
            console.log("collision");
           
            return true;
        }

        return false;
    },

    checkCollisionM2(mesh2){
        let mesh1 = this.el.getObject3D('mesh');

        if(mesh1 === null){ return false;}
        if(!(mesh2 instanceof THREE.Mesh)){ return false;}

        // mesh1 is inside Group so local position is (0,0,0). We need to convert local position to world position.
        let position = new THREE.Vector3();
        mesh1.getWorldPosition(position);
        mesh1 = mesh1.clone();
        mesh1.position.set(position.x, position.y, position.z);
        this.data.bsp1.setFromMesh(mesh1);

        // mesh2 could be the Player or a dragging object and its local position is (0,0,0). We need to convert local position to world position.
        mesh2.getWorldPosition(position);
        mesh2 = mesh2.clone();
        mesh2.position.set(position.x, position.y, position.z);
        this.data.bsp2.setFromMesh(mesh2);

        this.data.bsp1.intersectOperand(this.data.bsp2);

        let tmp = this.data.bsp1.toMesh();
        
        tmp.geometry.computeBoundingBox();

        if(!tmp.geometry.boundingBox.isEmpty()){
            //DEBUG
            /*tmp.material = new THREE.MeshBasicMaterial( { wireframe: true, color: '#F00' } );
            this.el.sceneEl.object3D.add(tmp)*/

            return true;
        }

        return false;
    },

    checkCollision(mesh){
        if(typeof mesh === 'undefined'){ return false; }

        let result = false;
        switch(this.data.method){
            case 'm1':
                result = this.checkCollisionM1(mesh);
                break;
            case 'm2':
                result = this.checkCollisionM2(mesh);
                break;
        }
        
        if(result){
            console.log("Collission", this.data.method)
        }
        return result;
    }
});

AFRAME.registerComponent('draggable', {
    dependencies: ['raycaster'],
    
    init(){
        this.onCollide = this.onCollide.bind(this);
        this.onDropStart = this.onDropStart.bind(this);

        this.el.sceneEl.systems.physics.registerMe(this, 'draggable');

        this.data = {
            physics: this.el.sceneEl.systems.physics,
            scene: this.el.sceneEl,
            camera: null,
            raycaster: null,
            distance: 0, 
            currentDistance: 0,
            direction: new THREE.Vector3(),
           // zCoord: 0,
            isDragging: false,
            previousPos: new THREE.Vector3()
        };
        
        this.el.classList.add("clickable");

        // capture mouse events
        this.el.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.el.addEventListener('mouseup', this.onMouseUp.bind(this));
        
      //  window.document.addEventListener("wheel", this.onMouseWheel.bind(this));

       // this.el.emit('loaded', this);
    },

    init2(){
        if(this.data.camera === null){
            if(this.data.scene.camera.el){
                this.data.camera = this.data.scene.camera.el;
            }
            else{
                console.log("Init2: Camera not found.");
                return false;
            }
        }

        if(this.data.raycaster === null){
            this.data.raycaster = this.data.scene.getAttribute("raycaster");
            if(!this.data.raycaster){
                console.log("Init2: Raycaster not found.");
                return false;
            }
        }

        return true;
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'draggable');
    },
  
    onMouseDown(event){
        if(!this.init2()){
            return;
        }

        // update the base distance between the cursor to the object
        let tmp = new THREE.Vector3();
        this.el.object3D.getWorldPosition(tmp);

        this.data.distance = tmp.sub(this.data.camera.object3D.position).length();  
        this.data.currentDistance = this.data.distance;     
        this.data.isDragging = true;
        this.el.emit('dragstart', this);
    },

    onMouseUp(event){
        if (!this.data.isDragging){return;}
        
        this.data.isDragging = false;

        this.el.emit('dragend', this);
    },

   /* onMouseWheel(event){
        if (!this.data.isDragging){return;}

        this.el.object3D.position.z += (event.deltaY > 0 ?  .1 :  -.1);
    },*/
  
    tick(){
        if (!this.data.isDragging){return;}

        let tmp = new THREE.Vector3();
        this.el.object3D.getWorldPosition(tmp);

        this.data.currentDistance = tmp.sub(this.data.camera.object3D.position).length(); 

        if(!this.data.direction.equals(this.data.raycaster.direction) || this.data.distance !== this.data.currentDistance){
            this.data.direction.copy(this.data.raycaster.direction);
            this.data.previousPos.copy(this.el.object3D.position);
            this.drag();
        }
    },

    drag(){
        let moveTo = this.data.raycaster.direction.clone().multiplyScalar(this.data.distance);
        let target = this.data.camera.object3D.position.clone().add(moveTo);
        
        this.el.object3D.parent.worldToLocal(target);
        this.el.object3D.position.copy(target);
        this.el.emit('drag', this);
    },
    
    onDropStart(event){
        // check if the dropped element is the same one that was dragged
        if(!Object.is(this, event.detail.dragEl)){
            return;
        }

        let pos1 = new THREE.Vector3();
        event.detail.dropZone.el.object3D.getWorldPosition(pos1);
        this.el.object3D.parent.worldToLocal(pos1)
        this.el.object3D.position.copy(pos1);       
        this.el.emit('dropend', this);
    },

    onCollide(event){
        if (!this.data.isDragging){return;}

        this.el.object3D.position.copy(this.data.previousPos);
    }
});

AFRAME.registerComponent('drop-zone', {
    init(){
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);

        this.el.sceneEl.systems.physics.registerMe(this, 'drop-zone');

        this.data = {
            physics: this.el.sceneEl.systems.physics,
            scene: this.el.sceneEl,
            dropZoneAnimation: this.el.querySelector('[data-drop-zone-animation]'),
            droppable: false
        };
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'drop-zone');
    },

    onDragStart(event){
        if(this.data.dropZoneAnimation){
            this.data.dropZoneAnimation.object3D.visible = true;
            this.data.dropZoneAnimation.setAttribute('color', 'blue');
        }
    },

    onDrag(event){
        let pos1 = new THREE.Vector3();
        let pos2 = new THREE.Vector3();
        this.el.object3D.getWorldPosition(pos1);
        event.detail.el.object3D.getWorldPosition(pos2)
        
        if(pos1.distanceTo(pos2) < 0.6){
            this.data.droppable = true;
            this.data.dropZoneAnimation.setAttribute('color', '#ff334b');
        }
        else{
            this.data.droppable = false;
            this.data.dropZoneAnimation.setAttribute('color', 'blue');
        }
    },

    onDragEnd(event){
        if(this.data.droppable){
            this.el.emit('dropstart', {dropZone: this, dragEl: event.detail});
            this.data.droppable = false;
        }

        if(this.data.dropZoneAnimation){
            this.data.dropZoneAnimation.object3D.visible = false;            
        }
    }
});