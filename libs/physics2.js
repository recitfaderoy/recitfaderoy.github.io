AFRAME.registerSystem("physics", {
    init() {
        this.player = null;
        this.collidableElements = [];
        this.draggableElements = [];
        this.droppableElements = [];
    },

    registerPlayer(el) {
        this.player = el;
    },

    getElementList(type){
        switch(type){
            case 'collidable':
                return 'collidableElements';
            case 'draggable':
                return 'draggableElements';
            case 'droppable':
                return 'droppableElements';
            default:
                console.log(`Element type '${type}' unknown.`);
                return null;
        }
    },

    registerMe(el, type){
        let elementList = this.getElementList(type);

        if(!elementList){ return; }

        this[elementList].push(el);

        if((type === 'draggable') || (type === 'droppable')){
            /*for(let el of this.draggableElements){
                el.addEventListener('droppable', this.onDroppable.bind(this));
            }*/

            for(let dragItem of this.draggableElements){
                for(let dropItem of this.droppableElements){
                    // call removeEventListener to be sure to have one single listener
                    dragItem.el.removeEventListener('dragstart', (event) => dropItem.onDragStart(event));
                    dragItem.el.addEventListener('dragstart', (event) => dropItem.onDragStart(event));
                    dragItem.el.removeEventListener('dragend', (event) => dropItem.onDragEnd(event));
                    dragItem.el.addEventListener('dragend', (event) => dropItem.onDragEnd(event));
                    dragItem.el.removeEventListener('drag', (event) => dropItem.onDrag(event));
                    dragItem.el.addEventListener('drag', (event) => dropItem.onDrag(event));
                    dropItem.el.removeEventListener('drop', (event) => dragItem.onDrop(event));
                    dropItem.el.addEventListener('drop', (event) => dragItem.onDrop(event));
                 //   dropItem.el.removeEventListener('droppable', (event) => dragItem.onDroppable(event));
                  //  dropItem.el.addEventListener('droppable', (event) => dragItem.onDroppable(event));
                }
            }
        }
    },
    
    unregisterMe(el, type) {
        let listElements = this.getElementList(type);;

        if(!elementList){ return; }

        let index = this[listElements].indexOf(el);
        this[listElements].splice(index, 1);

        if((type === 'draggable') || (type === 'droppable')){
            for(let dragItem of this.draggableElements){
                for(let dropItem of this.droppableElements){
                    dragItem.el.removeEventListener('dragstart', (event) => dropItem.onDragStart(event));
                    dragItem.el.removeEventListener('dragend', (event) => dropItem.onDragEnd(event));
                    dragItem.el.removeEventListener('drag', (event) => dropItem.onDrag(event));
                    dropItem.el.removeEventListener('drop', (event) => dragItem.onDrag(event));
                }
            }
        }        
    },

    checkCollision(mesh){
        for(let entity of this.collidableElements){
            if(entity.checkCollision(mesh)){
                return true;
            }
        }
        return false;
    },
});

AFRAME.registerPrimitive("a-player", {
    defaultComponents: {
        player: {},
    },
    mappings: {
    }
});

AFRAME.registerComponent('player', {
   // dependencies: ['camera'],

    schema: {},

    init(){
        this.el.sceneEl.systems.physics.registerPlayer(this);

        let geometry = new THREE.BoxBufferGeometry(.25, 0.11, .25);
        let mesh = new THREE.Mesh(geometry, this.data.material);
        mesh.position.set(0, 1, 0);
        this.el.setObject3D('mesh', mesh);

        this.playerCopy = mesh.clone();

        window.addEventListener('keydown', this.onKeyDown.bind(this));

        this.init2();
    },

    init2(){
        if(!this.el.sceneEl.camera){
            setTimeout(this.init2.bind(this), 100);
            return;
        }

        this.el.sceneEl.camera.el.object3D.position.set(0, -1, -1);
        this.el.sceneEl.camera.el.setAttribute('wasd-controls', "enabled: false");
    },

    remove() {
        // this.el.sceneEl.systems.physics.unregisterMe(this);
     },

    onKeyDown(event){
        switch(event.code){
            case "KeyA":
                this.moveLeft();
                break;
            case "KeyD":
                this.moveRight();
                break;
            case "KeyW":
                this.moveForward();
                break;
            case "KeyS":
                this.moveBack();
                break;
        }
    },

    isValidMove(mesh){
        return !this.el.sceneEl.systems.physics.checkCollision(mesh);
    },

    moveLeft(){
        this.move('translateX', -EscapeRoomOptions.offsetMovement);
    },

    moveRight(){
        this.move('translateX', EscapeRoomOptions.offsetMovement);
    },

    moveForward(){
        this.move('translateZ', -EscapeRoomOptions.offsetMovement);
    },

    moveBack(){
        this.move('translateZ', EscapeRoomOptions.offsetMovement);
    },

    move(translateFunc, value){
        let camera = this.el.sceneEl.camera.el.object3D;

        this.playerCopy.position.set(camera.position.x, camera.position.y, camera.position.z);

        this.playerCopy[translateFunc](value);

        if(this.isValidMove(this.playerCopy)){
            camera[translateFunc](value);
        }
        else{
           // camera[translateFunc](-value);
        }

        camera.position.set(camera.position.x, -1, camera.position.z) // prevent offset on Y axis
    },
});

AFRAME.registerComponent('collision-detection', {
    init(){
        this.el.sceneEl.systems.physics.registerMe(this, 'collidable');

        this.data.bsp1 = new CSG();
        this.data.bsp2 = new CSG();

        this.data.box1 = new THREE.Box3();
        this.data.box2 = new THREE.Box3();
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'collidable');
    },

    checkCollisionM1(mesh){
        this.data.box1.setFromObject(this.el.getObject3D('mesh'));
        this.data.box2.setFromObject(mesh);
        console.log(this.el,this.data.box1)
        let result = this.data.box1.intersect(this.data.box2);

        if(!result.isEmpty()){
            /* DEBUG
            this.data.box1.expandByPoint(mesh.position);
            const dimensions = new THREE.Vector3().subVectors( this.data.box1.max, this.data.box1.min );
            const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
            const mesh2 = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial( { wireframe: true, color: '#F00' } ));
            mesh2.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
            this.el.sceneEl.object3D.add(mesh2);
            console.log("collision");
            */
            return true;
        }

        return false;
    },

    checkCollisionM2(cameraMesh){
        let mesh1 = this.el.getObject3D('mesh');

        if(mesh1 === null){ return false;}

        // mesh1 is inside Group so local position is (0,0,0). We need to convert local position to world position.
        let  position = new THREE.Vector3();
        mesh1.getWorldPosition(position);
        mesh1 = mesh1.clone();
        mesh1.position.set(position.x, position.y, position.z);
        
       // this.data.bsp1 = new CSG();
        //this.data.bsp2 = new CSG();
        this.data.bsp1.setFromMesh(mesh1);
        this.data.bsp2.setFromMesh(cameraMesh);

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
        let method = 'm1';

        for(attr in this.el.components){
            if(attr === 'collision-detection'){ continue; }

            if(typeof this.el.components[attr].getCheckCollisionMethod !== 'undefined'){
                method = this.el.components[attr].getCheckCollisionMethod();
                break;
            }
        }

        let result = false;
        switch(method){
            case 'm1':
                result = this.checkCollisionM1(mesh);
                break;
            case 'm2':
                result = this.checkCollisionM2(mesh);
                break;
        }
        
        if(result){
            console.log("Collission", method)
        }
        return result;
    }
});

AFRAME.registerComponent('draggable', {
    init(){
        this.el.sceneEl.systems.physics.registerMe(this, 'draggable');

        this.data = {
            physics: this.el.sceneEl.systems.physics,
            scene: this.el.sceneEl,
            camera: null,
            distance: null, 
            direction: new THREE.Vector3(),
            zCoord: 0,
            isDragging: false,
            isDroppable: false
        };
        
        // capture mouse events
        this.el.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.el.addEventListener('mouseup', this.onMouseUp.bind(this));
        
        window.document.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.document.addEventListener("wheel", this.onMouseWheel.bind(this));

        this.init2();
    },

    init2(){
        if(!this.data.scene.camera){
            setTimeout(this.init2.bind(this), 100);
            return;
        }
        this.data.camera = this.data.scene.camera.el;
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'draggable');
    },
  
    onMouseDown(event){
        // update the base distance between the cursor to the object
        this.data.distance = this.el.object3D.position.clone().sub(this.data.camera.object3D.position).length();
        this.data.direction.copy(this.data.scene.getAttribute("raycaster").direction);
        this.data.isDragging = true;
        this.el.emit('dragstart', this);
    },

    onMouseMove(event){
        if (!this.data.isDragging){return;}

        // update the direction from raycaster coponent
        this.data.zCoord = 0;
        this.data.direction.copy(this.data.scene.getAttribute("raycaster").direction);
    },

    onMouseUp(event){
        if (!this.data.isDragging){return;}
        
        if(this.data.isDroppable){
            this.el.emit('drop', this);
        }

        this.data.isDragging = false;
        this.data.isDroppable = false;

        this.el.emit('dragend', this);
    },

    onMouseWheel(event){
        if (!this.data.isDragging){return;}

        this.data.zCoord = (event.deltaY > 0 ? this.data.zCoord + .1 : this.data.zCoord - .1);
    },
  
    tick(){
        if (!this.data.isDragging){return;}

        if(this.el.object3D.position.distanceTo(this.data.direction) > 0){
            let moveTo = this.data.direction.clone().multiplyScalar(this.data.distance + this.data.zCoord);
            let target = this.data.camera.object3D.position.clone().add(moveTo);

            this.el.object3D.position.copy(target);
            this.el.emit('drag', this);
        }
    },
    
    onDrop(event){
        let pos = new THREE.Vector3();
        console.log(event.detail)
        event.detail.el.object3D.getWorldPosition(pos);
        this.el.object3D.position.copy(pos);
    }
});

AFRAME.registerComponent('droppable', {
    init(){
        this.el.sceneEl.systems.physics.registerMe(this, 'droppable');

        this.data = {
            physics: this.el.sceneEl.systems.physics,
            scene: this.el.sceneEl,
            droppableAnimation: this.el.querySelector('[data-droppable-animation]'),
            droppable: false
        };
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this, 'droppable');
    },

    onDragStart(event){
        if(this.data.droppableAnimation){
            this.data.droppableAnimation.object3D.visible = true;
            this.data.droppableAnimation.setAttribute('color', 'blue');
        }
    },

    onDrag(event){
        let pos = new THREE.Vector3();
        this.el.object3D.getWorldPosition(pos);

        if(pos.distanceTo(event.detail.el.object3D.position) < 0.6){
            this.data.droppable = true;
            this.data.droppableAnimation.setAttribute('color', '#ff4833');
        }
        else{
            this.data.droppable = false;
            this.data.droppableAnimation.setAttribute('color', 'blue');
        }
    },

    onDragEnd(event){
        if(this.data.droppable){
            this.el.emit('drop', this);
        }

        if(this.data.droppableAnimation){
            this.data.droppableAnimation.object3D.visible = false;            
        }
    }
});