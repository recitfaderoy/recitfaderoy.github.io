class EscapeRoomOptions{
    static nbSegments = 5;
    static offsetMovement = 0.2;

    /*static getCommonMaterial(color){
        //return new THREE.MeshStandardMaterial({ color: color, emissive: '#785e5e', vertexColors: true, wireframe: true, roughness: 0.35 });
        return new THREE.MeshStandardMaterial({ color: color, emissive: '#785e5e',  wireframe: true, roughness: 0.35 });
    }

    static getMaterial(color){
        const texture = new THREE.TextureLoader().load( "./assets/texture-ceiling.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );

        const material = new THREE.MeshBasicMaterial({map: texture});
        
        return material;
    }*/
}

AFRAME.registerSystem("escaperoom", {
    init() {
        this.objectList = [];
        this.doorList = [];
        this.materialSet = new Set();
    },

    getElementList(type){
        switch(type){
            case 'object':
                return 'objectList';
            case 'door':
                return 'doorList';
            case 'material':
                return "materialSet";
            default:
                console.log(`Element type '${type}' unknown.`);
                return null;
        }
    },

    registerMe(el, type){
        let elementList = this.getElementList(type);

        if(!elementList){ return; }

        this[elementList].push(el);

        for(let obj of this.objectList){
            for(let door of this.doorList){
                // call removeEventListener to be sure to have one single listener
                obj.el.removeEventListener('unlockdoor', door.onUnlockDoor);
                obj.el.addEventListener('unlockdoor', door.onUnlockDoor);
            }
        }
    },
    
    unregisterMe(el, type) {
        let listElements = this.getElementList(type);;

        if(!elementList){ return; }

        let index = this[listElements].indexOf(el);
        this[listElements].splice(index, 1);

        for(let obj of this.objectList){
            for(let door of this.doorList){
                obj.el.removeEventListener('unlockdoor', door.onUnlockDoor);
            }
        }
    },
});

AFRAME.registerComponent('escaperoom', {
    init: function () {
   /*   console.log(this.el.childNodes);
      this.wall ={}
      for(let _wall of this.el.children)
      //this.el.child.forEach(element => {
        
        if(_wall.attributes.side ==="back") {this.wall.back=this.el.children}
        console.log(_wall.attributes.side)
     // });
      console.log(this._wall)*/
    }
});

AFRAME.registerPrimitive("a-escaperoom", {
    defaultComponents: {
        escaperoom: {},
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
    },
    mappings: {}
    
})

AFRAME.registerPrimitive("a-escaperoom-wall", {
    defaultComponents: {
        escaperoom_wall: {}
    },
    mappings: {
        thickness: 'escaperoom_wall.thickness',
        height: 'escaperoom_wall.height',
        width: 'escaperoom_wall.width',
        doorhole: 'escaperoom_wall.doorhole',
        side: 'escaperoom_wall.side',
    }
})

AFRAME.registerComponent('escaperoom_wall', {
    schema: {
        thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        width: {type:'number', default: 10},
        side: {type: 'string', default: 'none'},
       // doorhole: {type: 'string', default: 'none'}
        doorhole: {
            parse: function (value) {
                if(typeof value === 'string'){
                    value = JSON.parse(value);
                }

                return value 
            },
            stringify: function (value) {
                if(typeof value === 'object'){
                    value = JSON.stringify(value);
                }

                return value;
            },
            default: {position: 'none', width: 0, height: 0}
        }
    },
    //dependencies: ['a-escape-door'],

    init(){
        let geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.thickness, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let material = this.data.material;
        let mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(0, 0, 0);
       // mesh.rotateY(0)

        // make a wall hole before setup wall positions
        if(this.data.doorhole.position !== 'none'){
            mesh = this.makeDoorHole(mesh);
        }
        
        this.setupWall();

        this.el.setObject3D('mesh', mesh);
    },

    setupWall(){
        let offset = (this.data.thickness / 2);
        switch(this.data.side){
            case 'back':
                this.el.object3D.position.set(0, 0, 0);
                break;
            case 'left':
                this.el.object3D.position.set(-this.data.width / 2 + offset, 0, - (this.data.width / 2) - offset);
                this.el.object3D.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'right':
                this.el.object3D.position.set(this.data.width / 2 - offset, 0, - (this.data.width / 2) - offset);
                this.el.object3D.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'front':
                this.el.object3D.position.set(0, 0, -this.data.width - this.data.thickness);
                break;
        }
    },

    makeDoorHole(mesh){
        let wall_bsp = new CSG();
        wall_bsp.setFromMesh(mesh);

        let doorhole_bsp = new CSG();
        let doorWidth = this.data.doorhole.width;
        let doorHeight = this.data.doorhole.height;
        let geometry = new THREE.BoxBufferGeometry(doorWidth, doorHeight, this.data.thickness);
        //let material = new THREE.MeshStandardMaterial({ color: '#F00', emissive: '#785e5e',  wireframe: true, roughness: 0.35 });
        let material = new THREE.MeshBasicMaterial();
        let mesh_doorhole = new THREE.Mesh(geometry, material);

        //this.el.sceneEl.object3D.add(mesh_doorhole)
        
        mesh_doorhole.position.set(0,  -(this.data.height - doorHeight)/2, 0);

        doorhole_bsp.setFromMesh(mesh_doorhole);

        wall_bsp.subtractOperand(doorhole_bsp);
        
        return wall_bsp.toMesh();
    },

    remove(){
        this.el.removeObject3D('mesh');
    },
});

AFRAME.registerPrimitive("a-escape-door", {
    defaultComponents: {
        escape_door: {},
        rotation:{}
    },
    mappings: {
        door_id: 'escape_door.door_id',
    }
})

AFRAME.registerComponent('escape_door', {
    schema: {
        door_id: {type:'int', default: 0},
    },
    //dependencies: ['escaperoom_wall'],

    init(){
        this.onUnlockDoor = this.onUnlockDoor.bind(this);

        this.el.sceneEl.systems.escaperoom.registerMe(this, 'door');

        this.init2();        
    },

    init2(){
        if(!this.el.parentEl.components.escaperoom_wall){
            setTimeout(this.init2.bind(this), 100);
            return;
        }

        // Loading Inline - However, the scene won’t wait for the resource to load before rendering.
       // this.el.setAttribute('gltf-model', 'url(./assets/door.gltf)'); 
        this.setupDoor();
        this.close();
        this.el.classList.add("clickable");
    },

    setupDoor(){
        let posX, posY, posZ, thickness;

        thickness = this.el.parentEl.components.escaperoom_wall.data.thickness;
        posX = (this.el.parentEl.components.escaperoom_wall.data.doorhole.width / 2) - 2.6 * thickness;
        posY = -this.el.parentEl.components.escaperoom_wall.data.height / 2;
        posZ = 0.0;

        this.el.object3D.position.set(posX, posY, posZ);
        this.el.object3D.rotation.set(0, Math.PI / 2, 0);
    },

    close(){
        this.el.setAttribute('animation-mixer', 'clip:fermer; loop:once; clampWhenFinished:true;');
    },

    open(){
        this.el.setAttribute('animation-mixer', 'clip:ouvrir; loop:once; clampWhenFinished:true;');
    },
 
    events: {
        click: function (evt) {
            this.close();
        }
    },

    onUnlockDoor(event){
        if(this.data.door_id === event.detail.data.door_id){
            this.open();
        }
    }    
});

AFRAME.registerPrimitive("a-escaperoom-ceiling", {
    defaultComponents: {
        escaperoom_ceiling: {},
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0}
    },
    mappings: {
        wall_thickness: 'escaperoom_ceiling.wall_thickness',
        height: 'escaperoom_ceiling.height',
        length: 'escaperoom_ceiling.length',
        width: 'escaperoom_ceiling.width',
    }
})

AFRAME.registerComponent('escaperoom_ceiling', {
    schema: {
        wall_thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        length: {type:'number', default: 10},
        width: {type:'number', default: 10},
    },
  
    init(){
        let depth = .1;
        let geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.length + (this.data.wall_thickness*2), depth, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let mesh = new THREE.Mesh(geometry, this.data.material);

        mesh.position.set(0, this.data.height / 2 + depth, -(this.data.length / 2) - (this.data.wall_thickness/2));
        mesh.rotateX(Math.PI / 2);
        
        this.el.setObject3D('mesh', mesh);
    },

    remove(){
        this.el.removeObject3D('mesh');
    },
});

AFRAME.registerPrimitive("a-escaperoom-floor", {
    defaultComponents: {
        escaperoom_floor: {},
    },
    mappings: {
        wall_thickness: 'escaperoom_floor.wall_thickness',
        height: 'escaperoom_floor.height',
        length: 'escaperoom_floor.length',
        width: 'escaperoom_floor.width',
    }
})

AFRAME.registerComponent('escaperoom_floor', {
    schema: {
        wall_thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        length: {type:'number', default: 10},
        width: {type:'number', default: 10},
    },
  
    init(){
        let depth = .1;
        let geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.length + (this.data.wall_thickness*2), depth, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let mesh = new THREE.Mesh(geometry, this.data.material);

        mesh.position.set(0, - this.data.height / 2 - depth, -(this.data.length / 2) - (this.data.wall_thickness/2));
        mesh.rotateX(Math.PI / 2);
        
        this.el.setObject3D('mesh', mesh);
    },

    remove(){
        this.el.removeObject3D('mesh');
    },
});

AFRAME.registerPrimitive("a-escaperoom-object", {
    defaultComponents: {
        escaperoom_object: {},
    },
    mappings: {
        unlock_on: 'escaperoom_object.unlock_on',
        door_id: 'escaperoom_object.door_id',
    }
})

AFRAME.registerComponent('escaperoom_object', {
    schema: {
        unlock_on: {type:'string', default: 'none'},
        door_id: {type:'int', default: 0},
    },
    //dependencies: ['draggable'],

    init(){
        this.onDropEnd = this.onDropEnd.bind(this);
        //this.onLoadDependencies = this.onLoadDependencies.bind(this);

        this.el.sceneEl.systems.escaperoom.registerMe(this, 'object');
        
        if(this.data.unlock_on !== 'none'){
            this.el.classList.add("clickable");
            this.el.addEventListener('dropend', this.onDropEnd);
        }
    },

   /* onLoadDependencies(event){
        if(Object.is(event.detail, this.el.components.draggable)){
            this.el.components.draggable.el.addEventListener('dropend', this.onDropEnd);
        }
    },*/

    onDropEnd(event){
        if((this.data.unlock_on === 'drop') && (this.data.door_id > 0)){
            this.el.emit('unlockdoor', this);
        }
    },

    remove(){
        this.el.removeEventListener('drop', this.onDrop);
    },

    events: {
        click: function (event) {
            if((this.data.unlock_on === 'click') && (this.data.door_id > 0)){
                this.el.emit('unlockdoor', this);
            }
        }
    },
});
AFRAME.registerComponent('toggleouverture', {
    schema: {
    clip1: { default: 'default' },
    clip2: { default: 'default' }
    }, 
    init(){
        this.closeall=this.closeall.bind(this);
       // let Tobeopen =[{ouvrir0:false},ouvrir1=false,ouvrir2=false,ouvrir3=false,ouvrir4=false, ouvrir5=false, ouvrir6=false]
       // console.log("this",this)
        this.state ={}
       /* console.log("this.state",this.state)
            Object.assign(this.state,Tobeopen)
        console.log(Object.entries(this.state))
        
            Object.entries(this.state).forEach(([key, value]) => {
                console.log(    key,             value[1])*/
          //      value[1].set =false
                
       
                
          /*  forEach(entries => { */
              //   Object.values(this.state) = false;
    //})
    ;
    
    //this.setState(newState);
         this.el.classList.add("clickable");
         console.log(this.state)
         console.log(this)
    },
    getState(){
        return this.state;
    },
    closeall()          {
        if(this.getState().ouvrir0===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer0; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir0: false,}}
        if(this.getState().ouvrir1===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir1: false,}}
        if(this.getState().ouvrir2===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir2: false,}}
        if(this.getState().ouvrir3===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir3: false,}}
        if(this.getState().ouvrir4===true){
            this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir4: false,}}
        if(this.getState().ouvrir5===true){
                        this.el.setAttribute('animation-mixer', 'clip:fermer5; loop:once; clampWhenFinished:true;');
                        this.state = {ouvrir5: false,}}
    
    },
    update: function () {
    this.el.addEventListener('click', (evt) => {
            var object = evt.detail.intersection.object;
              console.log(this.getState())
              // name of entity to which component is attached
              console.log(this.el.getObject3D('mesh').name);
    
              // name of object directly clicked
              console.log(object.name);
              
    switch(object.name)
    {
        case 'ouvrir0':
            console.log(this.getState().ouvrir0);
      
                         if(this.getState().ouvrir0===true){
                
         this.el.setAttribute('animation-mixer', 'clip:fermer0; loop:once; clampWhenFinished:true;');
            this.state = {ouvrir0: false,}
            console.log(this.getState().ouvrir0);
            }else{
                if(this.getState().ouvrir1===true){
                    this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
                    this.state = {ouvrir1: false,}}
            if(this.getState().ouvrir2===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir2: false,}}
            if(this.getState().ouvrir3===true){
                    this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
                    this.state = {ouvrir3: false,}}
            if(this.getState().ouvrir4===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir4: false,}}
            if(this.getState().ouvrir5===true){
                            this.el.setAttribute('animation-mixer', 'clip:fermer5; loop:once; clampWhenFinished:true;');
                            this.state = {ouvrir5: false,}}
                this.el.setAttribute('animation-mixer', 'clip:ouvrir0; loop:once; clampWhenFinished:true;');
                this.state.ouvrir0=true;
        }
            break   
        case 'ouvrir1':
            console.log(this.getState().ouvrir1);
            if(this.getState().ouvrir1===true){
                this.closeall();
           // this.el.setAttribute('animation-mixer', 'clip:fermer1; loop:once; clampWhenFinished:true;');
           // this.state = {ouvrir1: false,}
            console.log(this.getState().ouvrir1);
            }
            else 
            {
                this.el.setAttribute('animation-mixer', 'clip:ouvrir1; loop:once; clampWhenFinished:true;');
                this.state.ouvrir1=true;
            }
            break
            case 'ouvrir2':
                console.log(this.getState().ouvrir2);
                if(this.getState().ouvrir2===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer2; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir2: false,}
                console.log(this.getState().ouvrir2);
                }
                else 
                {
                    this.el.setAttribute('animation-mixer', 'clip:ouvrir2; loop:once; clampWhenFinished:true;');
                    this.state.ouvrir2=true;
                }
                break
            case 'ouvrir3':
                console.log(this.getState().ouvrir3);
                if(this.getState().ouvrir3===true){
                this.el.setAttribute('animation-mixer', 'clip:fermer3; loop:once; clampWhenFinished:true;');
                this.state = {ouvrir3: false,}
                console.log(this.getState().ouvrir3);
                }
                else 
                {
                    this.el.setAttribute('animation-mixer', 'clip:ouvrir3; loop:once; clampWhenFinished:true;');
                    this.state.ouvrir3=true;
                }
                break
                case 'ouvrir4':
                    console.log(this.getState().ouvrir4);
                    if(this.getState().ouvrir4===true){
                    this.el.setAttribute('animation-mixer', 'clip:fermer4; loop:once; clampWhenFinished:true;');
                    this.state = {ouvrir4: false,}
                    console.log(this.getState().ouvrir4);
                    }
                    else 
                    {
                        this.el.setAttribute('animation-mixer', 'clip:ouvrir4; loop:once; clampWhenFinished:true;');
                        this.state.ouvrir4=true;
                    }
                    break
          }
            /*  // name of object}'s parent
              console.log(object.parent.name);
                  if(object.name === "Mesh_14"){
                  console.log("goy it")
                      if(rightouvert === 0){
                      this.el.setAttribute('animation-mixer', 'clip: rightopen;loop:once; clampWhenFinished:true;');
                      console.log('ouvert'+ this.el.getAttribute('animation-mixer'));
                      rightouvert= 1;
                      }
                      else{
                          this.el.setAttribute('animation-mixer', 'clip: rightclose;loop:once; clampWhenFinished:true;');
                      console.log('fermé'+ this.el.getAttribute('animation-mixer'));
                      rightouvert= 0;
                      }
                  }
                  else if(object.name === "Mesh_12"){
                  console.log("gog it")
                      if(leftouvert === 0){
                      this.el.setAttribute('animation-mixer', 'clip: leftopen;loop:once; clampWhenFinished:true;');
                      console.log('ouvert'+ this.el.getAttribute('animation-mixer'));
                      leftouvert= 1;
                      }
                      else{
                          
                          this.el.setAttribute('animation-mixer', 'clip: leftclose;loop:once; clampWhenFinished:true;');
                      console.log('fermé'+ this.el.getAttribute('animation-mixer'));
                      leftouvert= 0;
                      }
                  }
                  else{
                      console.log("rrrrrr")
                  }
    
    */
    
    })
    }
    
    })