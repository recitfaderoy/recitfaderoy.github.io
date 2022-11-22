AFRAME.registerSystem("physics", {
    init() {
        this.entities = [];
        //console.log(this)
    },

    registerMe(el) {
        this.entities.push(el);
    },
    
    unregisterMe(el) {
        let index = this.entities.indexOf(el);
        this.entities.splice(index, 1);
    },

    checkCollision(mesh){
        for(let entity of this.entities){
            if(entity.checkCollision(mesh)){
                return true;
            }
        }
        return false;
    }
});

AFRAME.registerPrimitive("a-player", {
    defaultComponents: {
        player: {},
    },
    mappings: {
    }
});

AFRAME.registerPrimitive("a-hand", {
    mappings: {
      side: "tracked-controls.hand"
    }
  })
  
  AFRAME.registerComponent('player', {
   // dependencies: ['camera'],

    schema: {},

    init(){
        this.el.ensure("a-camera ", "a-camera", {
            "look-controls": { pointerLockEnabled: false, touchEnabled: false },
            "wasd-controls": { enabled: false }
          })
          this.el.ensure("a-hand[side=\"left\"]", "a-hand", { side: "left" })
          this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
              let geometry = new THREE.BoxBufferGeometry(.5, 1, .5);
             let mesh = new THREE.Mesh(geometry, this.data.material);
             mesh.position.set(0, 0, 0);
             this.el.setObject3D('mesh', mesh);

        this.playerCopy = mesh.clone();

        window.addEventListener('keydown', this.onKeyDown.bind(this));

       this.init2();
     // console.log(this)
    },

    init2(){
        console.log("eeeee",this.el.sceneEl.object3D.children[1].el.object3D.children[0].position)
        if(! this.el.sceneEl.object3D.children[1].el.object3D.children[0].position){
            setTimeout(this.init2.bind(this), 100);
            return;
        }
console.log("numbre 1", this.el.sceneEl.object3D.children[1])
       //this.el.sceneEl.camera.el.object3D.position.set(0,.5,15);
       // this.el.sceneEl.camera.el.setAttribute('wasd-controls', "enabled: false");
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
        
        let playera = this.el.sceneEl.object3D.children[1].el.object3D.children[0].position
        console.log(this.el.sceneEl.object3D.children[1].el.object3D.children[0].position.x)
        

        this.playerCopy.position.set(playera.position.x, playera.position.y, playera.position.z);

        this.playerCopy[translateFunc](value);

        if(this.isValidMove(this.playerCopy)){
            playera[translateFunc](value);
        }
        else{
           // playera[translateFunc](-value);
        }

        playera.position.set(playera.position.x, 1.5, playera.position.z) // prevent offset on Y axis
    },
});

AFRAME.registerComponent('collision-detection', {
    init(){
        this.el.sceneEl.systems.physics.registerMe(this);

        this.data.bsp1 = new CSG();
        this.data.bsp2 = new CSG();

        this.data.box1 = new THREE.Box3();
        this.data.box2 = new THREE.Box3();
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this);
    },

    checkCollisionM1(mesh){
        this.data.box1.setFromObject(this.el.getObject3D('mesh'));
        this.data.box2.setFromObject(mesh);

        let result = this.data.box1.intersect(this.data.box2);

        if(!result.isEmpty()){
            /* DEBUG*/
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

       // this.data.bsp1 = new CSG();
        //this.data.bsp2 = new CSG();
        this.data.bsp1.setFromMesh(mesh1);
        this.data.bsp2.setFromMesh(mesh2);

        this.data.bsp2.intersectOperand(this.data.bsp1);

        let tmp = this.data.bsp2.toMesh();
        
        tmp.geometry.computeBoundingBox();

        if(!tmp.geometry.boundingBox.isEmpty()){
            /*
            DEBUG*/

            this.data.box1.expandByPoint(mesh.position);
            const dimensions = new THREE.Vector3().subVectors( this.data.box1.max, this.data.box1.min );
            const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
            const mesh2 = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial( { wireframe: true, color: '#F00' } ));
            mesh2.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
            this.el.sceneEl.object3D.add(mesh2)
            console.log("collision");
            
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