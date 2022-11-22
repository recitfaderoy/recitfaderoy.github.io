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
        geometry:{primitive: "box", width: 0.5, height:0.4, depth: 0.25,position:{y:1.5}},
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
       //   this.el.ensure("a-hand[side=\"left\"]", "a-hand", { side: "left" })
 //         this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
     /*   let geometry = new THREE.BoxBufferGeometry(.5, 1, .25);
        let mesh = new THREE.Mesh(geometry, this.data.material);
        mesh.position.set(0, 1, 0);
        this.el.setObject3D('mesh', mesh);*/
let mesh=this.el.getObject3D('mesh');

        this.playerCopy = mesh.clone();

        window.addEventListener('keydown', this.onKeyDown.bind(this));

      this.init2();
      console.log("www",this.el.object3D.children[0])
      this.el.object3D.children[0].position.set(0, 0.5, -1) // prevent offset on Y axis)
      //this.el.sceneEl.object3D.children[1].children[0].set.position(0,0,15)
    },

    init2(){
        if(! this.el.object3D.children[0]){
            setTimeout(this.init2.bind(this), 2200);
            return;
        }
console.log("www",this.el.object3D.children[0])
        this.el.object3D.children[0].position.set(0,1,1);
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
        this.move('moveLeft', -EscapeRoomOptions.offsetMovement);
    },

    moveRight(){
        this.move('moveRight', EscapeRoomOptions.offsetMovement);
    },

    moveForward(){
        this.move('translateZ', -EscapeRoomOptions.offsetMovement);
    },

    moveBack(){
        console.log("Back s is click")
        this.move('translateZ', EscapeRoomOptions.offsetMovement);
    },

    move(translateFunc, value){
      // this.init2();
        //let camera = this.el.object3D[0];//this.el.sceneEl.camera.el.object3D;
      //  console.log(this.el.object3D.children[0].position)
      /* var camera = this.el.object3D.children[0].position.copy*/
        var camera = new THREE.Vector3();
        camera.setFromMatrixPosition(this.el.object3D.children[0].matrixWorld); 
        console.log(camera)
        let camera1 = camera.clone()

        console.log(camera1)
        //this.playerCopy.position.set(this.el.object3D.children[0].position.x, this.el.object3D.children[0].position.y, this.el.object3D.children[0].z);
                switch(translateFunc)
                {
                    case "moveLeft" :
                        this.playerCopy.translateX(value);
                        console.log(this.isValidMove(this.playerCopy))
                                if(this.isValidMove(this.playerCopy)){
                                    this.el.object3D.translateX(value);
                                }
                                else{
                                // camera[translateFunc](-value); 
                                console.log( this.el.object3D.children[0])
                                this.el.object3D.translateX(-value);
                              //  this.el.object3D.position.set(camera1.x,1,camera1.z) // prevent offset on Y axis
                                }
               
                    break
                    case "moveRight" :
                        this.playerCopy.translateX(value);
                        console.log(this.isValidMove(this.playerCopy))
                                if(this.isValidMove(this.playerCopy)){
                                    this.el.object3D.translateX(value);
                                }
                                else{
                                // camera[translateFunc](-value); 
                                console.log( this.el.object3D.children[0])
                                this.el.object3D.translateX(-value);
                                }
               
                        break
                        case "moveForward" :
                    this.playerCopy.translateY(value);

                        if(this.isValidMove(this.playerCopy)){
                            this.el.object3D.children[0].translateX(value);
                        }
                        else{
                        // camera[translateFunc](-value);
                        }
               
                    break
                    case "moveBack" :
                    this.playerCopy.translateY(value);

                        if(this.isValidMove(this.playerCopy)){
                            this.el.object3D.children[0].translateX(value);
                        }
                        else{
                        // camera[translateFunc](-value);
                        }
                    break
                    }
   },
});

AFRAME.registerComponent('collision-detection', {
    init(){
        this.el.sceneEl.systems.physics.registerMe(this);
        console.log("col",this.data.bsp1,this.data.bsp2)

        this.data.bsp1 = new CSG();
        this.data.bsp2 = new CSG();

        this.data.box1 = new THREE.Box3();
        this.data.box2 = new THREE.Box3();
    },

    remove() {
        this.el.sceneEl.systems.physics.unregisterMe(this);
    },

    checkCollisionM1(mesh){
        this.data.box1.setFromObject(this.el.object3D);
        console.log("debug1", this.data.box1)
        this.data.box2.setFromObject(mesh);
        console.log("debug2", this.data.box2)
        let result = this.data.box1.intersect(this.data.box2);
        console.log(result)

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
        let mesh1 = this.el.object3D.children[0]//  this.el.getObject3D('mesh');
console.log(mesh1)
        if(mesh1 === null){ return false;}

       // this.data.bsp1 = new CSG();
        //this.data.bsp2 = new CSG();
        this.data.bsp1.setFromMesh(mesh1);
        this.data.bsp2.setFromMesh(mesh2);
 let debug1 = this.data.bsp1.toMesh();
 let debug2 = this.data.bsp2.toMesh();
 debug1.geometry.computeBoundingBox();
 debug2.geometry.computeBoundingBox();
 
        this.data.bsp2.intersectOperand(this.data.bsp1);

        let tmp = this.data.bsp2.toMesh();
        
        tmp.geometry.computeBoundingBox();

        if(!tmp.geometry.boundingBox.isEmpty()){
            /*
            DEBUG
           */  
            this.data.box1.expandByPoint(mesh1.position);
            const dimensions = new THREE.Vector3().subVectors( this.data.box1.max, this.data.box1.min );
            const boxGeo = new THREE.BoxBufferGeometry(dimensions.x, dimensions.y, dimensions.z);
            const mesh2 = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial( { wireframe: true, color: '#F00' } ));
            const meshdebug1 = new THREE.Mesh(debug1, new THREE.MeshBasicMaterial( { wireframe: true, color: 'blue' } ));
            const meshdebug2 = new THREE.Mesh(debug2, new THREE.MeshBasicMaterial( { wireframe: true, color: 'green' } ));
           mesh2.position.set(mesh2.position.x, mesh2.position.y, mesh2.position.z)
            this.el.sceneEl.object3D.add(mesh2)
            this.el.sceneEl.object3D.add(meshdebug1)
            this.el.sceneEl.object3D.add(meshdebug2)
            
            console.log("collision");
         
            return true;
        }

        return false;
    },

    checkCollision(mesh){
        let method = 'm2';

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