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
      this.el.ensure("a-hand[side=\"left\"]", "a-hand", { 
        side: "left" ,
        id:"lhand",
        position:"-0.4 1.4 -0.5",
        "oculus-touch-controls":"hand: left",
        "desktop-vr-controller":""}
        )
      this.el.ensure("a-hand[side=\"right\"]", "a-hand", {
         side: "right",
         id:"rhand",
         position:"0.4 1.4 -0.5",
         "laser-controls":"hand: right",
          raycaster:"objects: [raycast-target]; far: Infinity; lineColor: red; lineOpacity: 0.5",
         "laser-manipulation":"",
         "thumbstick-states__right":{controller:"#rhand",
                                   tBindings:{"moving-in":"","moving-out":"","rotating-y-plus":"","rotating-y-minus":""},
                                   tgBindings:{"rotating-x-plus":"","rotating-x-minus":"","rotating-y-plus":"","rotating-y-minus":""}
      },
         "oculus-touch-controls":"hand: right",
        "desktop-vr-controller":"" })
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
// Change the parent of an object without changing its transform.
AFRAME.registerComponent('object-parent', {

    schema: {
        parent:     {type: 'selector'},    
    },
  
    update() {
  
        const matches = document.querySelectorAll(`#${parent.id}`)
        if (matches.length > 1) {
            console.warn(`object-parent matches duplicate entities for new parent ${parent.id}`)
        }
  
        const newParent = this.data.parent.object3D
        this.reparent(newParent)
        
    },
  
    remove() {
  
      const originalParentEl = this.el.parentEl
      this.reparent(originalParentEl.object3D)
  
    },
  
    reparent(newParent) {
  
      const object = this.el.object3D
      const oldParent = object.parent
  
      if (object.parent === newParent) {
          return;
      }
  
      objectEl = (o) => {
          if (o.type === 'Scene') {
              return (this.el.sceneEl)
          }
          else {
              return o.el
          }
      }
  
      console.log(`Reparenting ${object.el.id} from ${objectEl(oldParent).id} to ${objectEl(newParent).id}`);
      
      newParent.attach(object);
    },
  });

  // Set on an entity to track the orientation of the cursor's ray.
// Typically set on a enitity that is a child of the camera that the cursor uses.
AFRAME.registerComponent('cursor-tracker', {

    schema: {
        cursor: {type: 'selector', default: "#cursor"},
    },

    init() {
        this.cursor = this.data.cursor
        this.raycaster = this.cursor.components['raycaster'].raycaster
        this.forward = new THREE.Vector3(0, 0, -1)
        this.localRayVector = new THREE.Vector3();
    },

    tick() {

        // Get ray direction vector in the space of this object.
        this.el.object3D.getWorldPosition(this.localRayVector)
        this.localRayVector.add(this.raycaster.ray.direction)
        this.el.object3D.parent.worldToLocal(this.localRayVector)
        this.localRayVector.normalize()        
        this.el.object3D.quaternion.setFromUnitVectors(this.forward, this.localRayVector)
    }
});


AFRAME.registerComponent('label-anchor', {

    schema: {
        // vector from the anchor to the label.  When non-zero, a line is drawn from 
        // the label to this point.
        offsetVector: {type: 'vec3'},

        // whether to show a line, and what color?
        showLine: {type: 'boolean', default: true},
        lineColor: {type: 'color', default: 'white'}
    },

    init() {

        // Find this label that is a child of this label anchor, and position it
        // with the configured offset.
        this.label = this.el.querySelector("[label]")

        this.cameraWorldPosition = new THREE.Vector3();
        this.objectWorldPosition = new THREE.Vector3();
    },

    update() {

        if (this.data.showLine) {
            this.el.setAttribute("line__label-anchor", `start: 0 0 0; end: 0 0 0; color: ${this.data.lineColor}`)
        }
        else {
            this.el.removeAttribute("line__label-anchor")
        }
    },

    tick() {

        const camera = this.el.sceneEl.camera;

        // if using a perspective camera, we adjust the position of the label based on the distance
        // from the camera, so that it appears like a fixed distance on camera.
        var distance = 1;
        if (camera.isPerspectiveCamera)
        {
            // Can't use getWorldPosition on camera, as it doesn't work in VR mode.
            // See: https://github.com/mrdoob/three.js/issues/18448
            this.cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
            this.el.object3D.getWorldPosition(this.objectWorldPosition)
            distance = this.objectWorldPosition.distanceTo(this.cameraWorldPosition)
        }

        this.label.object3D.position.copy(this.data.offsetVector)
        this.label.object3D.position.multiplyScalar(distance)

        if (this.data.showLine) {
            const pos = this.label.object3D.position
            const vectorString = `${pos.x} ${pos.y} ${pos.z}`
            this.el.setAttribute("line__label-anchor", `end: ${vectorString}`)
        }
    }
})

AFRAME.registerComponent('label', {

    schema: {
        // Should the label overwrite objects that are in front of it in space?
        overwrite: {type: 'boolean', default: false},
        forceDesktopMode: {type: 'boolean', default: false}
    },

    init() {
        this.enterVR = this.enterVR.bind(this)
        this.exitVR = this.exitVR.bind(this)

        this.el.sceneEl.addEventListener('enter-vr', this.enterVR);
        this.el.sceneEl.addEventListener('exit-vr', this.exitVR);
    },

    update() {
        if (this.el.sceneEl.is('vr-mode')) {
            this.enterVR()
        }
        else {
            this.exitVR()
        }
    },

    enterVR: function() {
        this.el.setAttribute("face-camera", {fixedSize: this.data.forceDesktopMode,
                                             spriteMode: this.data.forceDesktopMode,
                                             overwrite: this.data.overwrite});
    },

    exitVR: function() {
        this.el.setAttribute("face-camera", {fixedSize: true,
                                             spriteMode: true,
                                             overwrite: this.data.overwrite});
    }
});

// Makes an element always face directly to the camera.
// Like a THREE.js sprite, but usable with any geometry, not just a PNG.
AFRAME.registerComponent('face-camera', {

    schema: {
        // Keep the element a fixed size on camera regardless of distance.
        // This works well on desktop, but is disorienting in VR.
        // fixedSize assumes the entity is scaled at 1, 1, 1.
        fixedSize: {type: 'boolean', default: false},
        
        // If using a perspecive camera, face back with a normal that exactly reverses the gaze
        // direction of the camera.
        // If this is false, the label simply faces directly at the camera
        // (this looks good in VR, but gives a distorting effect on a 2D screen).
        // For an orthographic camera, we always use sprite Mode
        spriteMode: {type: 'boolean', default: false},

        // Should the label overwrite objects that are in front of it in space?
        overwrite: {type: 'boolean', default: false}
    },

    init: function() {
        this.cameraWorldPosition = new THREE.Vector3();
        this.objectWorldPosition = new THREE.Vector3();
        this.cameraQuaternion = new THREE.Quaternion();
        this.spriteDistanceVector = new THREE.Vector3();
        this.cameraDirectionVector = new THREE.Vector3();
        this.parentInverseQuaternion = new THREE.Quaternion();


        this.object3DSet = this.object3DSet.bind(this)

        if (this.data.overwrite) {
            this.el.addEventListener('object3dset', this.object3DSet)
        }
    },

    object3DSet(evt) {

        const mesh = evt.target.getObject3D(evt.detail.type)
        mesh.material.depthTest = false;
        mesh.material.depthWrite = false;
        
    },

    tick: function() {
        const camera = this.el.sceneEl.camera;

        if (this.data.spriteMode ||
            camera.isOrthographicCamera) {

            // On an Orthographic camera, we always use Sprite mode, as this matches how other geometry
            // is rendered.

            setWorldQuaternion = (object, quaternion) => {

                object.updateMatrixWorld()
                object.parent.getWorldQuaternion(this.parentInverseQuaternion)
                this.parentInverseQuaternion.invert();

                object.quaternion.copy(quaternion)
                object.quaternion.premultiply(this.parentInverseQuaternion)
            }

            // set the world quaternion of this entity  to match the camera
            this.cameraQuaternion.setFromRotationMatrix(camera.matrixWorld)
            setWorldQuaternion(this.el.object3D, this.cameraQuaternion)
        }
        else {
            // Can't use getWorldPosition on camera, as it doesn't work in VR mode.
            // See: https://github.com/mrdoob/three.js/issues/18448
            this.cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
            this.el.object3D.lookAt(this.cameraWorldPosition);
        }

        if (this.data.fixedSize) {
            if (camera.isPerspectiveCamera)
            {
                if (this.data.spriteMode) {
                    // in sprite mode, we just take the distance along the main camera axis.
                    this.cameraDirectionVector.set(0, 0, -1);
                    this.cameraDirectionVector.transformDirection(camera.matrixWorld);

                    this.cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
                    this.el.object3D.getWorldPosition(this.objectWorldPosition)
                    this.spriteDistanceVector.subVectors(this.objectWorldPosition,
                                                         this.cameraWorldPosition)

                    this.spriteDistanceVector.projectOnVector(this.cameraDirectionVector)
                    const distance = this.spriteDistanceVector.length();

                    this.el.object3D.scale.set(distance, distance, distance);
                }
                else {
                    this.el.object3D.getWorldPosition(this.objectWorldPosition)
                    const distance = this.objectWorldPosition.distanceTo(this.cameraWorldPosition)
                    this.el.object3D.scale.set(distance, distance, distance);
                }
            }
            else {
                this.el.object3D.scale.set(1, 1, 1);
            }
        }
    }
});

// Add this to the same entity as the cursor component.
AFRAME.registerComponent('mouse-manipulation', {

    schema: {
        debug: {type: 'boolean', default: false},
        showHints: {type: 'boolean', default: true},
    },

    events: {
        mousedown: function(evt) { this.mouseDown(evt) }, 
        mouseup:  function(evt) { this.mouseUp(evt) },
        mouseenter: function(evt) { this.mouseEnter(evt) }, 
        mouseleave:  function(evt) { this.mouseLeave(evt) }
    },
    
    init() {
        // cursor must have an ID so that we can refence it when attaching an object-parent
        console.assert(this.el.id)
    
        // This is a rate per second.  We scale distance by this factor per second.
        // Take a root of this to get a scaling factor.
        this.moveSpeed = 3;
    
        // variable to track any grabbed element
        this.grabbedEl = null;

        // We create 2 children beneath the camera
        // - cursorTracker.  This is set up to match the orientation of the cursor
        //                   (which does not match the camera, when using rayOrigin: mouse)
        this.camera = document.querySelector('[camera]')
        this.cursorTracker = document.createElement('a-entity')
        this.cursorTracker.setAttribute('cursor-tracker', `cursor:#${this.el.id}`)
        this.camera.appendChild(this.cursorTracker)

        // A container for any entity that can be grabbed.
        // For mouse controls, this is a child of the cursor tracker.
        // (this helps with move in/out, rotation etc. of grabbed entity)
        this.cursorContactPoint = document.createElement('a-entity')
        this.cursorContactPoint.setAttribute('id', `${this.el.id}-cursor-contact-point`)
        if (this.data.debug) {
            this.cursorContactPoint.setAttribute('geometry', "primitive:box; height:0.1; width: 0.1; depth:0.1")
            this.cursorContactPoint.setAttribute('material', "color: blue")
        }
        
        this.cursorTracker.appendChild(this.cursorContactPoint)

        // A container for any entity that can be grabbed.
        // This is a child of the camera, for controls where the object
        // shouldn't follow the mouse pointer, e.g. rotation.
        // (this helps with move in/out, rotation etc. of grabbed entity)
        this.cameraContactPoint = document.createElement('a-entity')
        this.cameraContactPoint.setAttribute('id', `${this.el.id}-camera-contact-point`)
        if (this.data.debug) {
            this.cameraContactPoint.setAttribute('geometry', "primitive:box; height:0.1; width: 0.1; depth:0.1")
            this.cameraContactPoint.setAttribute('material', "color: red")
        }
        this.camera.appendChild(this.cameraContactPoint)

        // for working
        this.vector1 = new THREE.Vector3()
        this.vector2 = new THREE.Vector3()

        this.windowMouseUp = this.windowMouseUp.bind(this)
        this.windowMouseDown = this.windowMouseDown.bind(this)

        window.addEventListener('mouseup', this.windowMouseUp);
        window.addEventListener('mousedown', this.windowMouseDown);
        window.addEventListener('contextmenu', event => event.preventDefault());

        // state of mouse buttons
        this.lbDown = false
        this.mbDown = false
        this.rbDown = false

        // adjustments to control ratio of mouse pixels to radians for otations.
        this.radiansPerMousePixel = 0.01
    },

    update: function() {
  
        if (this.data.showHints) {
            this.createHints()
        }
        else {
            this.removeHints()
        }
        
    },

    remove() {

        this.removeHints()

        this.cursorTracker.parentNode.removeChild(this.cursorTracker)
        this.cameraContactPoint.parentNode.removeChild(this.cameraContactPoint)

        window.removeEventListener('mouseup', this.windowMouseUp);
        window.removeEventListener('mousedown', this.windowMouseDown);
    },

    windowMouseDown(evt) {

        // we are looking for the original mouseEvent, which has details of buttons pressed
        // And we need to have registered an element to be grabbed.
        if (evt.buttons === undefined) return;
        if (!this.grabbedEl) return;

        if (this.data.debug) console.log("MouseDown:", evt)

        this.recordMouseButtonsState(evt)
        this.updateMouseControls()
        this.updateHints()

        if (this.lbDown) {
            // left button is pressed (either just pressed or already down) 
            // - grab to cursor contact point
            this.grabElToContactPoint(this.cursorContactPoint,
                                          `#${this.el.id}-cursor-contact-point`)

        }
        else {
            // right or middle button - grab to camera contact point
            this.grabElToContactPoint(this.cameraContactPoint,
                                      `#${this.el.id}-camera-contact-point`)
        }
    },

    windowMouseUp(evt) {
        // we are looking for the original mouseEvent, which has details of buttons pressed
        // And we need to have a grabbed element.
        if (evt.buttons === undefined) return;
        if (!this.grabbedEl) return;

        if (this.data.debug) console.log("MouseUp:", evt)

        this.recordMouseButtonsState(evt)
        this.updateMouseControls()
        this.updateHints()
        
        // Reparenting
        if (this.lbDown) {
            // left button is still down
            // leave attached to cursor contact point.
            if (this.data.debug) console.log("Left button still down")
        }
        else if (evt.buttons === 0){
            // no button now pressed.
            if (this.data.debug) console.log("No buttons down - releasing")
            this.releaseEl()
        }
        else if (evt.button === 0) {
            if (this.data.debug) console.log("Left button released, middle or right still down")
            // left button released, but right or middle button still down 
            // - grab to camera contact point
            this.grabElToContactPoint(this.cameraContactPoint,
                                      `#${this.el.id}-camera-contact-point`)
        }
    },

    recordMouseButtonsState(evt) {
        this.lbDown = (evt.buttons & 1)
        this.mbDown = (evt.buttons & 4)
        this.rbDown = (evt.buttons & 2)

        if (this.data.debug) {
            console.log("this.lbDown:", this.lbDown)
            console.log("this.rbDown:", this.rbDown)
            console.log("this.mbDown:", this.mbDown)
        }
    },

    updateMouseControls() {

        if (this.lbDown) {
            this.cursorContactPoint.setAttribute("mouse-dolly", "")
        }
        else if (this.rbDown){
            this.cursorContactPoint.removeAttribute("mouse-dolly")
            this.cameraContactPoint.setAttribute("mouse-dolly", "")

        }
        else {
            this.cursorContactPoint.removeAttribute("mouse-dolly")
            this.cameraContactPoint.removeAttribute("mouse-dolly")
        }

        if (this.rbDown) {
            this.cameraContactPoint.setAttribute("mouse-pitch-yaw", "")
        }
        else {
            this.cameraContactPoint.removeAttribute("mouse-pitch-yaw")
        }

        if (this.mbDown) {
            this.cameraContactPoint.setAttribute("mouse-roll", "")
        }
        else {
            this.cameraContactPoint.removeAttribute("mouse-roll")
        }
    },

    createHints() {

        if (!this.data.showHints) return

        this.hints = document.createElement('a-entity')
        this.hints.setAttribute("label", "overwrite: true; forceDesktopMode: true")   
        this.hints.setAttribute("mouse-manipulation-hints", "")
        this.el.appendChild(this.hints)

        this.updateHints()
    },

    updateHints() {

        if (!this.data.showHints) return

        const show = (x) => { this.hints.setAttribute("mouse-manipulation-hints", "view", x) }
        
        if (this.lbDown) {
            show("left")
        }
        else if (this.rbDown) {
            show("right")
        }
        else if (this.mbDown) {
            show("middle")
        }
        else if (this.hoverEl) {
            show("hover")
        }
        else {
            show("none")
        }
    },

    removeHints() {

        if (this.hints) {
            this.hints.parentNode.removeChild(this.hints)
            this.hints = null
        }
    },

    // records details of grabbed object, but actual grabbing is deferred to be handled on MouseEvent
    // based on detail about which button is pressed (not avalable on this event)
    mouseDown(evt) {
  
        const intersections = this.getIntersections(evt.target);
    
        if (intersections.length === 0)  return;
    
        const element = intersections[0]
        var newGrabbedEl = this.getRaycastTarget(element)

        if (this.grabbedEl && 
            this.grabbedEl !== newGrabbedEl) {
            console.warn("Grabbed 2nd element without releasing the first:", newGrabbedEl.id, this.grabbedEl.id)
        }

        this.grabbedEl = newGrabbedEl
        
    },

    // Ensure an element has a usable ID.
    // If it has no ID, add one.
    // If it has an ID but it's not usable to identify the element...
    // ...log an error (preferable to creating confusion by modifying existing IDs)
    assureUsableId(el) {

        if (!el.id) {
            // No ID, just set one
            el.setAttribute("id", Math.random().toString(36).slice(2))
        }
        else {
            const reference = document.getElementById(el.id)
            if (reference !== el) {
                console.error(`Element ID for ${el.id} does not unambiguously identify it.  Check for duplicate IDs.`)
            }
        }
    },

    // Get scene graph parent element of an element.
    // Includes the case where the parent is the a-scene.
    getParentEl(el) {

        const parentObject = el.object3D.parent

        if (parentObject.type === 'Scene') {
            return(this.el.sceneEl)
        }
        else {
            return parentObject.el
        }
    },

    grabElToContactPoint(contactPoint, contactPointSelector) {

        // Save record of original parent, and make sure it has a usable ID.
        if (!this.originalParentEl) {
            this.originalParentEl = this.getParentEl(this.grabbedEl)
        }
        this.assureUsableId(this.originalParentEl)

        // set up a contact point at the position of the grabbed entity
        const pos = contactPoint.object3D.position
        this.grabbedEl.object3D.getWorldPosition(pos)
        contactPoint.object3D.parent.worldToLocal(pos)
        this.grabbedEl.setAttribute('object-parent', 'parent', contactPointSelector)

        this.hints.object3D.position.set(0, 0 , 0)
        contactPoint.object3D.add(this.hints.object3D)
    },

    releaseEl() {
        const contactPoint = this.grabbedEl.object3D.parent
        this.grabbedEl.setAttribute('object-parent', 'parent', `#${this.originalParentEl.id}`)
        this.grabbedEl = null
        this.originalParentEl = null
        //this.originalParentEl.setAttribute("body", "type", "dynamic")
        this.el.object3D.add(this.hints.object3D)

        if (this.hoverEl) {
            const pos = this.hints.object3D.position
            this.hoverEl.object3D.getWorldPosition(pos)
            this.hints.object3D.parent.worldToLocal(pos)
        }
    },

    mouseUp() {
       
    },

    getRaycastTarget(el) {
        if (el.components['raycast-target']) {
            return el.components['raycast-target'].target
        }
        else {
            return el
        }
    },

    mouseEnter(evt) {

        // similar logic to mouseDown - could be commonized
        // or we could even *only* do some of this processing on mouseenter?
        const intersections = this.getIntersections(evt.target);
    
        if (intersections.length === 0)  return;
    
        const element = intersections[0]

        this.hoverEl = this.getRaycastTarget(element)
        if (this.data.debug) console.log("HoverEl set:", this.hoverEl)
        
        // don't do actual hover display behaviour when another entity is already grabbed.
        // (but do do the state tracking bits - above).
        if (this.grabbedEl) return;

        const contactPoint = this.cursorContactPoint
        const pos = this.hints.object3D.position
        this.hoverEl.object3D.getWorldPosition(pos)
        this.hints.object3D.parent.worldToLocal(pos)

        this.updateHints()
    },

    mouseLeave(evt) {
        this.hoverEl = null
        if (this.data.debug) console.log("HoverEl cleared")
        this.updateHints()
    },

    getIntersections(cursorEl) {
  
        const els = cursorEl.components.raycaster.intersectedEls
        return els
    }

});

AFRAME.registerComponent('mouse-manipulation-hints', {
    schema: {
        view: {type: 'string',
               oneOf: ['none', 'hover', 'left', 'middle', 'right'],
               default: 'none'}
    },

    init() {
        this.views = {}
        const views = this.views

        this.createHoverView()
        this.createLeftView()
        this.createRightView()
        this.createMiddleView()
    },

    createHoverView() {

        const views = this.views
        views.hover = document.createElement('a-entity')
        views.hover.setAttribute('id', 'hint-hover')
        this.el.appendChild(views.hover)

        const rows = [["left-mouse", "move-arrows", "left-mouse", "pitch-yaw-arrow"],
                      ["mouse-wheel", "in-out-arrow", "middle-mouse", "roll"]]

        const rotations = [[0, 0, 0, 0],
                           [0, 0, 0, 0]]
        
        const reflections = [[1, 1, -1, 1],
                             [1, 1, 1, 1]]

        this.addRowsToView(views.hover, rows, rotations, reflections, "above")
    },

    createLeftView() {

        const views = this.views
        views.left = document.createElement('a-entity')
        views.left.setAttribute('id', 'hint-left')
        //views.left.setAttribute("text", "value: left; align: center; anchor: center")        
        this.el.appendChild(views.left)

        const rows = [["mouse-wheel", "in-out-arrow"]]
        const rotations = [[0, 0]]
        const reflections = [[1, 1]]

        this.addRowsToView(views.left, rows, rotations, reflections, "below")

        const cRows = [["left-arrow"],
                       ["left-arrow"],
                       ["left-arrow"],
                       ["left-arrow"]]
        const cRotations = [[270], [90], [0], [180]]
        const cReflections = [[1], [1], [1], [1]]

        this.addRowsToView(views.left, cRows, cRotations, cReflections, "compass")
    },

    createRightView() {

        const views = this.views
        views.right = document.createElement('a-entity')
        views.right.setAttribute('id', 'hint-right')
        this.el.appendChild(views.right)

        const rows = [["mouse-wheel", "in-out-arrow"]]
        const rotations = [[0, 0]]
        const reflections = [[1, 1]]

        this.addRowsToView(views.right, rows, rotations, reflections, "below")

        const cRows = [["yaw-arrow"],
                       ["yaw-arrow"],
                       ["yaw-arrow"],
                       ["yaw-arrow"]]
        const cRotations = [[90], [90], [0], [0]]
        const cReflections = [[1], [-1], [-1], [1]]

        this.addRowsToView(views.right, cRows, cRotations, cReflections, "compass")
    },

    createMiddleView() {

        const views = this.views

        views.middle = document.createElement('a-entity')
        views.middle.setAttribute('id', 'hint-middle')
        this.el.appendChild(views.middle)

        const rows = [["roll"]]
        const aRotations = [[0]]
        const bRotations = [[180]]
        const reflections = [[1]]

        this.addRowsToView(views.middle, rows, aRotations, reflections, "above")
        this.addRowsToView(views.middle, rows, bRotations, reflections, "below")
    },

    addRowsToView(view, rows, rotations, reflections, layout) {

        const spacing = 0.15
        const imgSize = 0.1
        const iconsPath = "../assets/icons/"

        var xOffset, yOffset
        
        xOffset = -((rows[0].length - 1) * spacing / 2)
        yOffset = 0.2 + rows.length * spacing / 2 
        
        if (layout === "below") {
            yOffset -= 0.5
        }
        
        function createIcon(iconName, xPos, yPos, rotation, reflect) {

            const icon = document.createElement('a-image')
            const src = `${iconsPath}${iconName}.svg`

            icon.setAttribute("src", src)
            icon.object3D.position.set(xPos, yPos, 0)
            icon.object3D.rotation.set(0, 0, THREE.MathUtils.degToRad(rotation))
            icon.object3D.scale.set(imgSize * reflect, imgSize, imgSize)
            view.appendChild(icon)
        }

        function createRow(row, xStart, yPos, rowIndex) {

            row.forEach((iconName, index) => {
                createIcon(iconName, xStart + (index * spacing), yPos,
                           rotations[rowIndex][index],
                           reflections[rowIndex][index])
            })
        }

        if ((layout === "above") ||
            (layout === "below"))
         {
            // lay rows out in a grid above the entity
            rows.forEach((row, index) => {
                createRow(row, xOffset, yOffset - (index * spacing), index)
            })
        }
        else if (layout === "compass") {
            // lay rows out at N, S, E & W positions.
            console.assert(rows.length == 4)

            const radius = 0.4
            
            createRow(rows[0], 0, radius, 0) // N
            createRow(rows[1], 0, -radius, 1) // S
            createRow(rows[2], -radius, 0, 2) // E
            createRow(rows[3], radius, 0, 3) // W

        }
    },

    update() {

        const show = (x) => { x.object3D.visible = true }
        const hide = (x) => { x.object3D.visible = false }

        const views = this.views

        hide(views.hover)
        hide(views.left)
        hide(views.right)
        hide(views.middle)
        
        const viewToShow = views[this.data.view]
        if (viewToShow) {
            show(viewToShow)
        }
    }
})
  
AFRAME.registerComponent('mouse-pitch-yaw', {

    schema: {
        // whether to only allow rotation on a single axis (whichever moves first)
        singleAxis : {type: 'boolean', default: false},
        // Number of mouse pixels movement required to lock onto an axis.
        threshold : {type: 'number', default: 5}
    },

    init: function () {
  
        this.axis = null
        this.cumX = 0
        this.cumY = 0

        this.xQuaternion = new THREE.Quaternion();
        this.yQuaternion = new THREE.Quaternion();
        this.yAxis = new THREE.Vector3(0, 1, 0);
        this.xAxis = new THREE.Vector3(1, 0, 0);
    
        this.onMouseMove = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.onMouseMove);
    },


    remove() {
        document.removeEventListener('mousemove', this.onMouseMove);
    },
    
    onMouseMove: function (evt) {
        this.rotateModel(evt);
    },
  
    rotateModel: function (evt) {

        // get normalized vector perpendicular to camera to use as xAxis (to pitch around)
        this.xAxis.copy(this.el.object3D.position)
        this.xAxis.normalize()
        this.xAxis.cross(this.yAxis)
        //console.log("xAxis: ", this.xAxis)

        var dX = evt.movementX;
        var dY = evt.movementY;

        // constrain to single axis if required.
        if (this.data.singleAxis) {

            // cumulative movements in X & Y.  Used to measure vs. threshold for
            // single axis movement.
            this.cumX += dX
            this.cumY += dY

            if (!this.axis && 
                ((Math.abs(this.cumX) > this.data.threshold) ||
                 (Math.abs(this.cumY) > this.data.threshold))) {
                this.axis = (Math.abs(this.cumX) > Math.abs(this.cumY)) ? "x" : "y"
            }

            if (this.axis === "x") {
                dY = 0
            }
            else if (this.axis === "y"){
                dX = 0
            }
            else {
                // if not locked onto an axis yet, don't allow amny movement.
                dX = 0
                dY = 0
            }
        }
    
        this.xQuaternion.setFromAxisAngle(this.yAxis, dX / 200)
        this.yQuaternion.setFromAxisAngle(this.xAxis, dY / 200)
    
        this.el.object3D.quaternion.premultiply(this.xQuaternion);
        this.el.object3D.quaternion.premultiply(this.yQuaternion);

        // avoid issues that can result from accumulation of small Floating Point inaccuracies.
        this.el.object3D.quaternion.normalize()
    }
});

AFRAME.registerComponent('mouse-roll', {

    schema: {
        slowdownRadius: {type: 'number', default: 50}
    },

    init: function () {
  
        this.zQuaternion = new THREE.Quaternion();
        this.zAxis = new THREE.Vector3(0, 0, 1);
    
        this.onMouseMove = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.onMouseMove);

        this.currPointer = new THREE.Vector2()
        this.prevPointer = new THREE.Vector2()

        this.el.setAttribute("entity-screen-position", "")

        this.modelPos = new THREE.Vector2()
        this.el.components['entity-screen-position'].getEntityScreenPosition(this.modelPos)
    },
    

    remove() {
        this.el.removeAttribute("entity-screen-position")
        document.removeEventListener('mousemove', this.onMouseMove);
    },
    
    onMouseMove: function (evt) {
        this.rotateModel(evt);
    },
  
    rotateModel: function (evt) {

        // get normalized vector away from camera to use as zAxis (to roll around)
        this.zAxis.copy(this.el.object3D.position)
        this.zAxis.multiplyScalar(-1)
        this.zAxis.normalize()
        //console.log("zAxis: ", this.zAxis)

        this.el.components['entity-screen-position'].getEntityScreenPosition(this.modelPos)
        //console.log("Model position on screen:", this.modelPos)

        const dX = evt.movementX;
        const dY = evt.movementY;
        this.currPointer.set(evt.clientX, evt.clientY)
        this.currPointer.sub(this.modelPos)
        this.prevPointer.set(evt.clientX - dX, evt.clientY - dY)
        this.prevPointer.sub(this.modelPos)

        let angle = this.prevPointer.angle() - this.currPointer.angle()

        // Normalize to rangw PI -> -PI, so that scaling angle down doesn't give unexpected results.
        if (angle < (-Math.PI)) angle += (2 * Math.PI)
        if (angle > (Math.PI)) angle -= (2 * Math.PI)
        
        const distanceToCenter = Math.min(this.currPointer.length(), this.prevPointer.length())
        if (distanceToCenter  < this.data.slowdownRadius) {
            const scaleFactor = distanceToCenter / this.data.slowdownRadius
            angle *= scaleFactor
        }
        
        this.zQuaternion.setFromAxisAngle(this.zAxis, angle)
        this.el.object3D.quaternion.premultiply(this.zQuaternion);
    }
});

// Make available the screen position of an entity
AFRAME.registerComponent('entity-screen-position', {

    init: function () {
  
        this.vector = new THREE.Vector3()

        // need to keep an up-to-date view of canvs bounds
        this.canvasBounds = document.body.getBoundingClientRect();
        this.updateCanvasBounds = AFRAME.utils.debounce(() => {
            this.canvasBounds = this.el.sceneEl.canvas.getBoundingClientRect()
          }, 500);
        
        window.addEventListener('resize', this.updateCanvasBounds);
        window.addEventListener('scroll', this.updateCanvasBounds);

        this.getEntityScreenPosition = this.getEntityScreenPosition.bind(this)
    },
    

    remove() {
        window.removeEventListener('resize', this.updateCanvasBounds);
        window.removeEventListener('scroll', this.updateCanvasBounds);
    },

    getEntityScreenPosition(vector2) {

        this.el.object3D.getWorldPosition(this.vector)
        //console.log("World Position:", this.vector)
        this.vector.project(this.el.sceneEl.camera)

        //console.log("Projected vector x, y:", this.vector.x, this.vector.y)

        const bounds = this.canvasBounds;
        //console.log("Canvas Bounds:", bounds)
        vector2.set((this.vector.x + 1) * bounds.width / 2,
                     bounds.height - ((this.vector.y + 1) * bounds.height / 2))
        //console.log("Model position on screen:", vector2)

        return vector2
    }
});

AFRAME.registerComponent('mouse-dolly', {

    init: function () {

        // 1 - no movement; < 1 = reverse movement.
        this.moveSpeed = 1.3
  
        this.zQuaternion = new THREE.Quaternion();
        this.zAxis = new THREE.Vector3(0, 0, 1);
    
        this.onMouseWheel = this.onMouseWheel.bind(this);
        document.addEventListener('mousewheel', this.onMouseWheel);
    },

    remove() {
        document.removeEventListener('mousewheel', this.onMouseWheel);
    },
    
    onMouseWheel: function (evt) {
        this.dollyModel(evt);
    },
  
    dollyModel: function (evt) {

        const dY = evt.deltaY;

        const scalar = Math.pow(this.moveSpeed, -dY/400);
        this.el.object3D.position.multiplyScalar(scalar)
    }
});
  
// Set states based on thumbstick positions.
// controller: selector for the controller with the thumbstick
// bindings: stats to set for each of up/down/left/right.
// sensitivity: 0 to 1- how far off center thumbstick must be to count as movement.
AFRAME.registerComponent('thumbstick-states', {
    schema: {
       controller:   {type: 'selector', default: "#lhand"},
       bindings:     {type: 'array', default: ["none", "none", "none", "none"]},
       tBindings:    {type: 'array', default: []},
       gBindings:    {type: 'array', default: []},
       tgBindings:   {type: 'array', default: []},
       sensitivity:  {type: 'number', default: 0.5}
    },
  
    multiple: true,
  
    init() {
      this.controller = this.data.controller;
  
      this.listeners = {
        thumbstickMoved: this.thumbstickMoved.bind(this),
        triggerUp: this.triggerUp.bind(this),
        triggerDown: this.triggerDown.bind(this),
        gripUp: this.gripUp.bind(this),
        gripDown: this.gripDown.bind(this),
      }
  
      this.states = {
        gripDown: false,
        triggerDown: false,
      }
  
    },
  
    update() {
  
      this.controller.addEventListener('thumbstickmoved',
                                       this.listeners.thumbstickMoved);
      this.controller.addEventListener('triggerup',
                                       this.listeners.triggerUp);
      this.controller.addEventListener('triggerdown',
                                       this.listeners.triggerDown);
      this.controller.addEventListener('gripup',
                                       this.listeners.gripUp);
      this.controller.addEventListener('gripdown',
                                       this.listeners.gripDown);
  
      this.updateBindings()
  
    },
  
    updateBindings() {
  
      // clear all pre-existing state
      const removeStates = (set) => set.forEach((item) => this.el.removeState(item) )
      removeStates(this.data.bindings)
      removeStates(this.data.tBindings)
      removeStates(this.data.gBindings)
      removeStates(this.data.tgBindings)
  
      // now update bindings
      var binding;
  
      if (!this.states.triggerDown && !this.states.gripDown) {
        binding = (x) => this.data.bindings[x]      
      }
      else if (this.states.triggerDown && !this.states.gripDown) {
        // trigger down.  If tBinding not specified, fall back to regular bindings
        binding = (x) => this.data.tBindings[x] ||
                         this.data.bindings[x]
      }
      else if (!this.states.triggerDown && this.states.gripDown) {
        // grip down.  If gBinding not specified, fall back to regular bindings
        binding = (x) => this.data.gBindings[x] ||
                         this.data.bindings[x]
      }
      else {
        // trigger and grip down.  If tgBinding not specified, fall back to t, g, or regular bindings
        binding = (x) => this.data.tgBindings[x] ||
                         this.data.gBindings[x] ||
                         this.data.tBindings[x] ||
                         this.data.bindings[x]
      }
  
      this.yplus = binding(0)
      this.yminus = binding(1)
      this.xplus = binding(2)
      this.xminus = binding(3)
  
      console.log(this)
    },
  
    gripDown(event) {
  
      this.states.gripDown = true;
      this.updateBindings()
    },
  
    gripUp(event) {
      this.states.gripDown = false;
      this.updateBindings()
    },
  
    triggerDown(event) {
      this.states.triggerDown = true;
      this.updateBindings()
    },
  
    triggerUp(event) {
      this.states.triggerDown = false;
      this.updateBindings()
    },
  
    thumbstickMoved(event) {
  
      const x = event.detail.x
      const y = event.detail.y
  
      if (Math.abs(x) > this.data.sensitivity) {
        if (x > 0) {
          this.el.addState(this.xplus)
          this.el.removeState(this.xminus)
        }
        else {
          this.el.addState(this.xminus)
          this.el.removeState(this.xplus)
        }
      }
      else
      {
        this.el.removeState(this.xplus)
        this.el.removeState(this.xminus)
      }
  
      if (Math.abs(y) > this.data.sensitivity) {
        if (y > 0) {
          this.el.addState(this.yplus)
          this.el.removeState(this.yminus)
        }
        else {
          this.el.addState(this.yminus)
          this.el.removeState(this.yplus)
        }
      }
      else
      {
        this.el.removeState(this.yplus)
        this.el.removeState(this.yminus)
      }
    }
  });

  AFRAME.registerComponent("polygon-wireframe", {

    schema: {
        color: { type: 'color', default: 'grey' },
        dashed: { type: 'boolean', default: false },
        dashSize: { type: 'number', default: 3 },
        gapSize: { type: 'number', default: 1 },
        dashScale: { type: 'number', default: 30 }
    },

    init() {

        const baseGeometry = this.el.getObject3D('mesh').geometry
        if (!baseGeometry) {
            console.warn("polygon-wireframe: no base geometry found")
        };

        const edges = new THREE.EdgesGeometry( baseGeometry );
        var material;
        if (!this.data.dashed) {
            material = new THREE.LineBasicMaterial( { color: this.data.color } )
        }
        else {
            material = new THREE.LineDashedMaterial( { color: this.data.color,
                                                       dashSize: this.data.dashSize,
                                                       gapSize: this.data.gapSize,
                                                       scale: this.data.dashScale } )
        }
        
        const line = new THREE.LineSegments( edges, material );        
        line.computeLineDistances();

        this.el.object3D.add( line );

        this.el.getObject3D('mesh').visible = false;
    }
})

const _sphere = new THREE.Sphere();
const _vector = new THREE.Vector3();

/*AFRAME.registerComponent('exhibit', {

    schema: {    
      gltfModel : {type : 'selector'},
      trueDimension: {type: 'number'}
    },
  
    init() {
      this.bSphere = new THREE.Sphere();
      this.modelDimension = 0;
      
      this.el.addEventListener('model-loaded', () => this.onModelLoaded())
  
      this.el.setAttribute('gltf-model', `#${this.data.gltfModel.id}`)
    },
  
    onModelLoaded() {
  
      this.getModelBSphere()
      
      const modelScaleFactor = this.data.trueDimension / this.modelDimension
  
      this.el.setAttribute('scale', `${modelScaleFactor}
                                     ${modelScaleFactor}
                                     ${modelScaleFactor}`)
  
  
      this.sphere = document.createElement('a-sphere')
      // match box to model, and it will be scaled together with it.
      const sphereDim = this.modelDimension
      this.sphere.object3D.scale.set(sphereDim, sphereDim, sphereDim)
      this.sphere.object3D.position.copy(this.bSphere.center)
      this.el.object3D.worldToLocal(this.sphere.object3D.position)
  
      this.sphere.setAttribute('material', {wireframe: true})
      
      this.sphere.setAttribute('raycast-target', `#${this.el.id}`)
      this.el.appendChild(this.sphere)
    },
    
    // get a bounding sphere for the model.
    getModelBSphere() {
      const object = this.el.object3D
  
      this.expandSphereByObject(this.bSphere, this.el.object3D, true)
  
      this.modelDimension = this.bSphere.radius * 2
    },
  
    // code derrived from Box3.expandByObject.
    // Equivalent function does not exist in in THREE.js for a sphere.
    expandSphereByObject(sphere, object, precise) {
      
      object.updateWorldMatrix( false, false );
    
      const geometry = object.geometry;
  
      if ( geometry !== undefined ) {
  
        if (precise && geometry.attributes != undefined && geometry.attributes.position !== undefined ) {
  
          const position = geometry.attributes.position;
          for ( let i = 0, l = position.count; i < l; i ++ ) {
  
            _vector.fromBufferAttribute( position, i ).applyMatrix4( object.matrixWorld );
            sphere.expandByPoint( _vector );
  
          }
  
        } else {
  
          if ( geometry.boundingSphere === null ) {
  
            geometry.computeBoundingSphere();
  
          }
  
          _sphere.copy( geometry.boundingSphere );
          _sphere.applyMatrix4( object.matrixWorld );
  
          sphere.union( _sphere );
  
        }
  
      }
  
      const children = object.children;
  
      for ( let i = 0, l = children.length; i < l; i ++ ) {
  
        this.expandSphereByObject(sphere, children[ i ], precise );
  
      }
  
      return this;
  
    }
  }) */

  AFRAME.registerComponent('adjusted-model', {

    schema: {    
      gltfModel : {type : 'selector'},
      basis: {type: 'string', oneOf: 'box, sphere', default: 'box'}, // sphere not yet implemented
      dimension: {type: 'number'},
      center: {type: 'boolean', default: true},
      showBounds: {type: 'string', oneOf: 'none, box, cube, sphere', default: 'none'} // sphere not yet implemented
    },
  
    init() {
      this.bbox = new THREE.Box3();
      this.boxSize = new THREE.Vector3()
      this.modelDimension = 0;

      // Entity structure looks like:
      // -- this.el - has scale of 1, 1, 1.  Scale, position and rotation can be set directly without breakign adjustment
      //    |--this.adjuster  - has scale & position to adjust the model as required
      //       |--this.model  - the model loaded up with position & center as encoded in the GLTF
      //       |--this.box    - the geometry of the bounding box    (if desired)
      //       (not yet implemented)
      //       |--this.sphere - the geometry of the bounding sphere (if desired)
      //       |--this.ring   - the geometry of the ring used to render an outline of the bounding sphere (if desired)
      this.adjuster = document.createElement('a-entity')
      this.adjuster.setAttribute("id", `${this.el.id}-adjuster`)
      this.el.appendChild(this.adjuster)

      this.model = document.createElement('a-entity')
      this.model.addEventListener('model-loaded', () => this.onModelLoaded())
  
      this.model.setAttribute('gltf-model', `#${this.data.gltfModel.id}`)
      this.model.setAttribute('raycast-target', `#${this.el.id}`)
      this.adjuster.appendChild(this.model)
    },
  
    onModelLoaded() {
  
      this.getModelBBox()

      // Adjust the scale & position of the adjuster to scale and center the model as desired
      const modelScaleFactor = this.data.dimension / this.modelDimension
      this.adjuster.object3D.scale.set(modelScaleFactor,
                                       modelScaleFactor,
                                       modelScaleFactor)

      if (this.data.center) {
        this.bbox.getCenter(this.adjuster.object3D.position)
        this.adjuster.object3D.worldToLocal(this.adjuster.object3D.position)
        this.adjuster.object3D.position.multiplyScalar(-this.adjuster.object3D.scale.x)
      }
      
      if ((this.data.showBounds === 'box') ||
          (this.data.showBounds === 'cube')) {
        this.box = document.createElement('a-box')

        // Just match box to model - adjuster handles scale and position
        this.bbox.getCenter(this.box.object3D.position)
        this.adjuster.object3D.worldToLocal(this.box.object3D.position)

        if (this.data.showBounds === 'cube') {
            const boxDim = this.modelDimension
            this.box.object3D.scale.set(boxDim, boxDim, boxDim)
        }
        else {
            this.box.object3D.scale.set(this.boxSize.x, this.boxSize.y, this.boxSize.z)
        }
        
        this.box.setAttribute('polygon-wireframe', "")
        
        this.adjuster.appendChild(this.box)
      }
    },
    
    // get the largest dimension of the model.  
    getModelBBox() {
  
      // compute a precise bounding box for this object.  This will handle the case where the
      // GLTF model includes multiple meshes.
      this.bbox.setFromObject(this.model.object3D, true)
  
      this.boxSize.subVectors(this.bbox.max, this.bbox.min)
  
      // Record the max dimension of the box (to save recomputing it from the BBox)
      this.modelDimension = Math.max(this.boxSize.x,
                                     this.boxSize.y,
                                     this.boxSize.z)
    }
  })
  
  AFRAME.registerComponent('laser-manipulation', {

    schema: {
      rotateRate: {type: 'number', default: 45},
      center: {type: 'string', default: 'center', oneOf: ['center','contact']}
    },
  
    update: function() {
  
      // internally store rotation rate as radians per event
      this.rotateRate = this.data.rotateRate * Math.PI / 180;
    },
  
    init() {
      // controller must have an ID so that
      console.assert(this.el.id)
  
      // This is a rate per second.  We scale distance by this factor per second.
      // Take a root of this to get a scaling factor.
      this.moveSpeed = 3;
  
      // set up listeners
      this.triggerUp = this.triggerUp.bind(this)
      this.triggerDown = this.triggerDown.bind(this)
      this.el.addEventListener('triggerup', this.triggerUp)
      this.el.addEventListener('triggerdown', this.triggerDown)
  
      // variable to track any grabbed element
      this.grabbedEl = null;
  
      // child object used as container for any entity that can be grabbed.
      // (this helps with scaling, rotation etc. of grabbed entity)
      this.contactPoint = document.createElement('a-entity')
      this.contactPoint.setAttribute('id', `${this.el.id}-contact-point`)
      this.el.appendChild(this.contactPoint)

    },

    /* Code below is duplicated from mouse-manipulation - should be commonized */

    // Ensure an element has a usable ID.
    // If it has no ID, add one.
    // If it has an ID but it's not usable to identify the element...
    // ...log an error (preferable to creating confusion by modifying existing IDs)
    assureUsableId(el) {

        if (!el.id) {
            // No ID, just set one
            el.setAttribute("id", Math.random().toString(36).slice(10))
        }
        else {
            const reference = document.getElementById(el.id)
            if (reference !== el) {
                console.error(`Element ID for ${el.id} does not unambiguously identify it.  Check for duplicate IDs.`)
            }
        }
    },

    // Get scene graph parent element of an element.
    // Includes the case where the parent is the a-scene.
    getParentEl(el) {

        const parentObject = el.object3D.parent

        if (parentObject.type === 'Scene') {
            return(this.el.sceneEl)
        }
        else {
            return parentObject.el
        }
    },

    /* Code above is duplicated from mouse-manipulation - should be commonized */

    triggerDown(evt) {
  
      console.assert(!this.grabbedEl)
  
      const intersections = this.getIntersections(evt.target);
  
      if (intersections.length === 0)  return;
  
      const element = intersections[0]
  
      const intersectionData = this.el.components.raycaster.getIntersection(element)
  
      // Save record of original parent, and make sure it has a usable ID.
      if (!this.originalParentEl) {
        this.originalParentEl = this.getParentEl(element)
      }
      this.assureUsableId(this.originalParentEl)

      // set up a contact point at the position of the grabbed entity
      if (this.data.center === "center") {
        // attach to entity center
        const pos = this.contactPoint.object3D.position
        element.object3D.getWorldPosition(pos)
        this.contactPoint.object3D.parent.worldToLocal(pos)
      }
      else {
        // attach to ray's contact point with entity
        const contactPoint = this.el.object3D.worldToLocal(intersectionData.point)
        this.contactPoint.object3D.position.copy(contactPoint)
      }

      // reparent element to this controller.
      element.setAttribute('object-parent', 'parent', `#${this.el.id}-contact-point`)

      // store reference to grabbed element
      this.grabbedEl = element
    },
  
    triggerUp() {
  
      if (!this.grabbedEl) return
  
      this.grabbedEl.setAttribute('object-parent', 'parent', `#${this.originalParentEl.id}`)
      this.grabbedEl = null
    },
  
    getIntersections(controllerEl) {
  
      const els = controllerEl.components.raycaster.intersectedEls
      return els
    },
  
    // Implements moving out or in (in = -ve)
    moveOut(timeDelta) {
      const scalar = Math.pow(this.moveSpeed, timeDelta/1000);
      this.contactPoint.object3D.position.multiplyScalar(scalar)
    },
  
    
    tick: function(time, timeDelta) {
      
      if (this.el.is("moving-in")) {
        this.moveOut(-timeDelta);
      }
      else if (this.el.is("moving-out")) {
        this.moveOut(timeDelta);
      }
  
      if (this.el.is("rotating-y-plus")) {
        this.contactPoint.object3D.rotation.y += timeDelta * this.rotateRate / 1000;
      }
      else if (this.el.is("rotating-y-minus")) {
        this.contactPoint.object3D.rotation.y -= timeDelta * this.rotateRate / 1000;
      }

      if (this.el.is("rotating-x-plus")) {
        this.contactPoint.object3D.rotation.x += timeDelta * this.rotateRate / 1000;
      }
      else if (this.el.is("rotating-x-minus")) {
        this.contactPoint.object3D.rotation.x -= timeDelta * this.rotateRate / 1000;
      }
    }
  });
