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
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-player", {
    defaultComponents: {
      injectplayer: {}
    }
  })

  /* global AFRAME, THREE */

AFRAME.registerComponent("injectplayer", {

    init() {
      this.el.addState("noinput")
      this.el.ensure("a-camera", "a-camera", {
        "look-controls": { pointerLockEnabled: false, touchEnabled: false },
        "wasd-controls": { enabled: false }
      })
      this._legBumper = this.el.ensure(".leg-bumper", "a-entity", {
        class: "leg-bumper",
         position: "0 1.5 0", // radius: 0.125, color: "red",
         
       // "physx-body":"type: kinematic; emitCollisionEvents:true;",
              width:"0.5"  ,
              depth:"0.5" ,
              height:"1.5",
              color : "#BBBBBB",
        raycaster: {
          deep: true,
          autoRefresh: false,
          objects: "[wall]",
          // showLine: true
        }
      })
      this.el.ensure(".a-hand[side=\"left\"]", "a-hand", { 
        side: "left" ,
        id:"lhand",
        position:"-0.4 1.4 -0.5",
        "oculus-touch-controls":"hand: left",
        "laser-controls":"hand: Left",
          raycaster:"objects:  .clickable; far: Infinity; lineColor: blue; lineOpacity: 0.5",
          "thumbstick-states__left":{controller:"#rhand",
          tBindings:{"moving-in":"","moving-out":"","rotating-y-plus":"","rotating-y-minus":""},
          tgBindings:{"rotating-x-plus":"","rotating-x-minus":"","rotating-y-plus":"","rotating-y-minus":""}
        }
    })
       
        
        
      this.el.ensure("a-hand[side=\"right\"]", "a-hand", {
         side: "right",
         id:"rhand",
         position:"0.4 1.4 -0.5",
         "laser-controls":"hand: right",
          raycaster:"objects: [raycast-target];  far: Infinity; lineColor: red; lineOpacity: 0.5",
         "laser-manipulation":"",
         "thumbstick-states__right":{controller:"#rhand",
                                   tBindings:{"moving-in":"","moving-out":"","rotating-y-plus":"","rotating-y-minus":""},
                                   tgBindings:{"rotating-x-plus":"","rotating-x-minus":"","rotating-y-plus":"","rotating-y-minus":""}
      },
         "oculus-touch-controls":"hand: right",
         })
      this.el.setAttribute("wasd-controls", { enabled: false })
    }
  })
/* global AFRAME, THREE */

AFRAME.registerPrimitive("a-hand", {
    mappings: {
      //side: "tracked-controls.hand"
    }
  })
  
  /* global AFRAME, THREE */

AFRAME.registerPrimitive("a-glove", {
    defaultComponents: {
      injectglove: {}
    }
  })

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

  
AFRAME.registerSystem("escaperoom", {

});

AFRAME.registerComponent('escaperoom', {
    init: function () {
   //   console.log(this.system);
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
        escaperoom_wall: {},
        wall:{}
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
        let meshboxX = ""
        let meshboxZ = ""
        switch(this.data.side){
            case 'back':
                meshboxX=this.data.width
                meshboxZ=this.data.thickness
                break;
            case 'left':
                meshboxX=this.data.thickness
                meshboxZ=this.data.width
                break;
            case 'right':
                meshboxX=this.data.thickness
                meshboxZ=this.data.width
                break;
            case 'front':
                meshboxX=this.data.width
                meshboxZ=this.data.thickness
                break;
        }
        let geometry = new THREE.BoxBufferGeometry(meshboxX, this.data.height, meshboxZ, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let material = this.data.material;
        let mesh = new THREE.Mesh(geometry, material);

        // make a wall hole before setup wall positions
        if(this.data.doorhole.position !== 'none'){
            mesh = this.makeDoorHole(mesh);
        }

        this.setupWall(mesh);
        
        this.el.setObject3D('mesh', mesh);
       
    },

    setupWall(mesh){
        let offset = (this.data.thickness / 2);
        let yposwallmesh =(this.data.height / 2);
        switch(this.data.side){
            case 'back':
                mesh.position.set(0, yposwallmesh, 0);
                break;
            case 'left':
                mesh.position.set(-this.data.width / 2 + offset, yposwallmesh, - (this.data.width / 2) - offset);
              // mesh.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'right':
                mesh.position.set(this.data.width / 2 - offset, yposwallmesh, - (this.data.width / 2) - offset);
               // mesh.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'front':
                mesh.position.set(0, yposwallmesh, -this.data.width - this.data.thickness);
                break;
        }
        
    },

    makeDoorHole(mesh){
        let wall_bsp = new CSG();
        wall_bsp.setFromMesh(mesh);
        let doorX=""
        let doorZ=""
        switch(this.data.side){
            case 'back':
                doorX=this.data.doorhole.width
                doorZ=this.data.thickness
                break;
            case 'left':
                doorX=this.data.thickness
                doorZ=this.data.doorhole.width
                break;
            case 'right':
                doorX=this.data.thickness
                doorZ=this.data.doorhole.width
                break;
            case 'front':
                doorX=this.data.doorhole.yywidth
                doorZ=this.data.doorhole.thickness
                break;
        }
        let doorhole_bsp = new CSG();
        let doorWidth = this.data.doorhole.width;
        let doorHeight = this.data.doorhole.height;
        let geometry = new THREE.BoxBufferGeometry(doorX, doorHeight, doorZ);
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

    getCheckCollisionMethod(){        
        let door = (this.el.children.length > 0 ? this.el.children[0] : null);

        
        if(door === null){return 'm1';}

        if(door.components.escape_door.getState().closed){
            return 'm1';
        }
        else{
            return 'm2';
        }
    },

});

AFRAME.registerPrimitive("a-escape-door", {
    defaultComponents: {
        escape_door: {},
    },
    mappings: {
    }
})

AFRAME.registerComponent('escape_door', {
    schema: {
    },
    //dependencies: ['escaperoom_wall'],

    init(){
        this.state = {closed: true};
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

        thickness = (this.el.parentEl.components.escaperoom_wall.data.thickness / 2);
        posX = this.el.parentEl.components.escaperoom_wall.data.doorhole.width / 2;
        posY = 0//-this.el.parentEl.components.escaperoom_wall.data.height / 2;

        switch(this.el.parentEl.components.escaperoom_wall.data.side){
            case 'back':
                posZ = this.el.parentEl.object3D.position.z + thickness;
                this.el.object3D.rotateY(Math.PI / 2);
                break;
            case 'left':
                posX = -this.el.parentEl.components.escaperoom_wall.data.width / 2;
                posZ =  -(this.el.parentEl.components.escaperoom_wall.data.width / 2) + (this.el.parentEl.components.escaperoom_wall.data.doorhole.width/2) - thickness;
                break;
            case 'right':
                posX = (this.el.parentEl.components.escaperoom_wall.data.width) / 2 - this.el.parentEl.components.escaperoom_wall.data.thickness;
                posZ =  -(this.el.parentEl.components.escaperoom_wall.data.width / 2) + (this.el.parentEl.components.escaperoom_wall.data.doorhole.width/2) - thickness;
                break;
            case 'front':
                posZ =  -(this.el.parentEl.components.escaperoom_wall.data.width + thickness);
                this.el.object3D.rotateY(Math.PI / 2);
                break;
        }

        this.el.object3D.position.set(posX, posY, posZ);
    },

    close(){
        this.state.closed = true;
        this.el.setAttribute('animation-mixer', 'clip:fermer; loop:once; clampWhenFinished:true;');
    },

    open(){
        this.state.closed = false;
        this.el.setAttribute('animation-mixer', 'clip:ouvrir; loop:once; clampWhenFinished:true;');
    },

    getState(){
        return this.state;
    },
  
    events: {
        click: function (evt) {
            this.close();
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

        mesh.position.set(0, this.data.height + depth,  -(this.data.length / 2)  - (this.data.wall_thickness/2));
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

        mesh.position.set(0, 0, -(this.data.length / 2) - (this.data.wall_thickness/2));
        mesh.rotateX(Math.PI / 2);
        
        this.el.setObject3D('mesh', mesh);
    },

    remove(){
        this.el.removeObject3D('mesh');
    },
});

AFRAME.registerPrimitive("a-escaperoom-element", {
    defaultComponents: {
        escaperoom_element: {},
    },
    mappings: {
        solution: 'escaperoom_element.solution',
    }
})

AFRAME.registerComponent('escaperoom_element', {
    schema: {
        solution: {type:'boolean', default: false},
    },
    //dependencies: ['raycaster'],

    init(){
        this.el.classList.add("clickable");
    },

    events: {
        click: function (evt) {
            if(this.data.solution){
                let escapeDoorList = this.el.parentEl.querySelectorAll(`[escape_door]`);
                for(let item of escapeDoorList){
                    item.components.escape_door.open();
                }
            }
        }
    }
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


