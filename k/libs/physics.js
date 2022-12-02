AFRAME.registerSystem("physics", {
    init() {
        this.entities = [];
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

AFRAME.registerComponent('player', {
   // dependencies: ['camera'],

    schema: {},

    init(){
        let geometry = new THREE.BoxBufferGeometry(.5, 1, .5);
        let mesh = new THREE.Mesh(geometry, this.data.material);
        mesh.position.set(0, 0, 0);
        this.el.setObject3D('mesh', mesh);

        this.playerCopy = mesh.clone();

        window.addEventListener('keydown', this.onKeyDown.bind(this));

        this.init2();
    },

    init2(){
        if(! this.el.sceneEl.camera){
            setTimeout(this.init2.bind(this), 100);
            return;
        }

        this.el.sceneEl.camera.el.object3D.position.set(0, -.5, -1);
        this.el.sceneEl.camera.el.setAttribute('wasd-controls', "enabled: false");
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

        camera.position.set(camera.position.x, -.5, camera.position.z) // prevent offset on Y axis
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

    checkCollisionM2(mesh2){
        let mesh1 = this.el.getObject3D('mesh');

        if(mesh1 === null){ return false;}

       // this.data.bsp1 = new CSG();
        //this.data.bsp2 = new CSG();
        this.data.bsp1.setFromMesh(mesh1);
        this.data.bsp2.setFromMesh(mesh2);

        this.data.bsp1.intersectOperand(this.data.bsp2);

        let tmp = this.data.bsp1.toMesh();
        
        tmp.geometry.computeBoundingBox();
        console.log(this.el)

        if(!tmp.geometry.boundingBox.isEmpty()){
            
            //DEBUG
           /* tmp.position.set(mesh1.position.x, mesh1.position.y, mesh1.position.z)
            this.el.sceneEl.object3D.add(tmp)   */      

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