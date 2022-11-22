class EscapeRoomOptions{
    static nbSegments = 5;

    static getCommonMaterial(color){
        //return new THREE.MeshStandardMaterial({ color: color, emissive: '#785e5e', vertexColors: true, wireframe: true, roughness: 0.35 });
        return new THREE.MeshStandardMaterial({ color: color, emissive: '#785e5e',  wireframe: true, roughness: 0.35 });
    }

    static getWallMaterial(color){
        const texture = new THREE.TextureLoader().load( "./assets/texture-wall.jpg" );
       /* texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );*/

        const material = new THREE.MeshBasicMaterial({map: texture});
        
        return material;
    }

    static getCeilingMaterial(color){
        const texture = new THREE.TextureLoader().load( "./assets/texture-ceiling.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );

        const material = new THREE.MeshBasicMaterial({map: texture});
        
        return material;
    }

    static getFloorMaterial(color){
        const texture = new THREE.TextureLoader().load( "./assets/texture-floor.jpg" );
        /*texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );*/

        const material = new THREE.MeshBasicMaterial({map: texture});
        
        return material;
    }
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
      this.el.ensure("a-hand[side=\"left\"]", "a-hand", { side: "left" })
      this.el.ensure("a-hand[side=\"right\"]", "a-hand", { side: "right" })
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

AFRAME.registerPrimitive("a-escaperoom", {
    defaultComponents: {
        escaperoom: {},
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
    },
    mappings: {
        width: 'escaperoom.width',
        thickness: 'escaperoom.thickness',
        height: 'escaperoom.height',
        color: 'escaperoom.color',
    }
})

AFRAME.registerPrimitive("a-escaperoom-wall", {
    defaultComponents: {
        escaperoom_wall: {}
    },
    mappings: {
        thickness: 'escaperoom_wall.thickness',
        height: 'escaperoom_wall.height',
        width: 'escaperoom_wall.width',
        color: 'escaperoom_wall.color',
        side: 'escaperoom_wall.side',
        doorhole: 'escaperoom_wall.doorhole'
    }
})

AFRAME.registerComponent('escaperoom_wall', {
    schema: {
        thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        width: {type:'number', default: 10},
        color: {type:'color', default: '#000'},
        side: {type: 'string'},
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
        this.data.width = parseFloat(this.el.parentEl.getAttribute("width")) || this.data.width;
        this.data.height = parseFloat(this.el.parentEl.getAttribute("height")) || this.data.height;
        this.data.thickness = parseFloat(this.el.parentEl.getAttribute("thickness")) || this.data.thickness;
        this.data.color = this.el.parentEl.getAttribute("color") || this.data.color;

        let geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.thickness, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let material = EscapeRoomOptions.getWallMaterial(this.data.color);
        let mesh = new THREE.Mesh(geometry, material);

        this.setupWall(mesh);
        
        if(this.data.doorhole.position !== 'none'){
            mesh = this.makeDoorHole(mesh);
        }
        
        this.el.setObject3D('mesh', mesh);
    },

    setupWall(mesh){
        let offset = (this.data.thickness / 2);
        switch(this.data.side){
            case 'back':
                mesh.position.set(0, 0, 0);
                break;
            case 'left':
                mesh.position.set(-this.data.width / 2 + offset, 0, - (this.data.width / 2) - offset);
                mesh.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'right':
                mesh.position.set(this.data.width / 2 - offset, 0, - (this.data.width / 2) - offset);
                mesh.rotateY(Math.PI / 2); // 90 degrees
                break;
            case 'front':
                mesh.position.set(0, 0, -this.data.width - this.data.thickness);
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
        let material = EscapeRoomOptions.getWallMaterial(this.data.color);
        let mesh_doorhole = new THREE.Mesh(geometry, material);

        let posX = 0;
        let posY = -(this.data.height - doorHeight)/2;
        let posZ =  -this.data.width - this.data.thickness;
        mesh_doorhole.position.set(posX, posY, posZ);

        doorhole_bsp.setFromMesh(mesh_doorhole);

        wall_bsp.subtractOperand(doorhole_bsp);
        
        return wall_bsp.toMesh();
    },

    update(oldData){
    },

    remove(){
        this.el.removeObject3D('mesh');
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
    //dependencies: ['wall'],

    init(){
        this.init2();
    },

    init2(){
        if(!this.el.parentEl.components.escaperoom_wall){
            setTimeout(this.init2.bind(this), 100);
            return;
        }

        let posX = this.el.parentEl.components.escaperoom_wall.data.doorhole.width / 2;
        let posY = this.el.parentEl.components.escaperoom_wall.data.height / 2;
        let posZ = this.el.parentEl.components.escaperoom_wall.data.width + (this.el.parentEl.components.escaperoom_wall.data.thickness / 2);

        // Loading Inline - However, the scene won’t wait for the resource to load before rendering.
       // this.el.setAttribute('gltf-model', 'url(./assets/door.gltf)'); 
        this.close();
        this.el.object3D.position.set(posX, -posY, -posZ);
        this.el.object3D.rotateY(Math.PI / 2);
        this.el.classList.add("clickable");
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
        color: 'escaperoom_ceiling.color'
    }
})

AFRAME.registerComponent('escaperoom_ceiling', {
    schema: {
        wall_thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        length: {type:'number', default: 10},
        width: {type:'number', default: 10},
        color: {type:'color', default: '#000'},
    },
  
    init(){
        let wall_thickness = parseFloat(this.el.parentEl.getAttribute("thickness")) || this.data.wall_thickness;
        let width = this.el.parentEl.getAttribute("width") || this.data.width;
        let height = this.el.parentEl.getAttribute("height") || this.data.height;
        let length = parseFloat(this.el.parentEl.getAttribute("width")) || this.data.length;
        let color = this.el.parentEl.getAttribute("color") || this.data.color;

        
        let depth = .1;
        let geometry = new THREE.BoxBufferGeometry(width, length + (wall_thickness*2), depth, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let material = EscapeRoomOptions.getCeilingMaterial(color);
        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, height / 2 + depth, -(length / 2) - (wall_thickness/2));
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
        color: 'escaperoom_floor.color'
    }
})

AFRAME.registerComponent('escaperoom_floor', {
    schema: {
        wall_thickness: {type:'number', default: 1},
        height: {type:'number', default: 10},
        length: {type:'number', default: 10},
        width: {type:'number', default: 10},
        color: {type:'color', default: '#000'},
    },
  
    init(){
        let wall_thickness = parseFloat(this.el.parentEl.getAttribute("thickness")) || this.data.wall_thickness;
        let width = this.el.parentEl.getAttribute("width") || this.data.width;
        let height = this.el.parentEl.getAttribute("height") || this.data.height;
        let length = parseFloat(this.el.parentEl.getAttribute("width")) || this.data.length;
        let color = this.el.parentEl.getAttribute("color") || this.data.color;

        let depth = .1;
        let geometry = new THREE.BoxBufferGeometry(width, length + (wall_thickness*2), depth, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments, EscapeRoomOptions.nbSegments);
        let material = EscapeRoomOptions.getFloorMaterial(color);
        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, - height / 2 - depth, -(length / 2) - (wall_thickness/2));
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
        this.init2();
    },

    init2(){
        if(!this.el.components["gltf-model"]){
            setTimeout(this.init2.bind(this), 1000);
            return;
        }
        console.log(this.el.components["gltf-model"].model.children[0].children[0].children[0])
            this.el.classList.add("clickable");
       var mesh = this.el.getObject3D('mesh');
       console.log("mesh",mesh) 
mesh.traverse(node => {
  if (node.isMesh) {
    console.log("mesh.material",mesh.material)
        
    }
});
}
,
    events: {
        click: function (evt) {
            if(this.data.solution){
                let escapeDoor = this.el.parentEl.querySelector(`[escape_door]`);
                escapeDoor.components.escape_door.open();
            }
        }
    }
});