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
    startr: {type:"vec3", default: {x: 0, y: -0.5, z: 3}},
},

    init(){
        console.log(this.data.start)
        this.onCollide = this.onCollide.bind(this);

        this.el.sceneEl.systems.physics.registerMe(this, 'player');

        this.data = {
            previousPos: new THREE.Vector3(this.data.start.x,this.data.start.y,this.data.start.z),
            //previousPos: this.data.start,

            previousPoss: new THREE.Vector3(0,-.5, -1),

            previousRot: new THREE.Quaternion()
        };
console.log(this.data.previousPos,this.data.previousPoss)
        let geometry = new THREE.BoxBufferGeometry(.4, 0.5, .25);
        let mesh = new THREE.Mesh(geometry, this.data.material);
        mesh.position.set(0, 0, 0);
        this.el.setObject3D('mesh', mesh);
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'player');
    },

    onCollide(event){
        let camera = this.el.sceneEl.camera.el.object3D;
        camera.position.copy(this.data.previousPos);
    },

    tick(){
        let camera = this.el.sceneEl.camera.el.object3D;
    
        if(camera.position.distanceTo(this.data.previousPos) > 0){
            camera.position.set(camera.position.x, -.5, camera.position.z) // prevent offset on Y axis
            this.el.emit('move', this);
            camera.getWorldPosition(this.data.previousPos);
        }
    }
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