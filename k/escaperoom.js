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

});

AFRAME.registerComponent('escaperoom', {
    init: function () {
//      console.log(this.system);
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

        thickness = this.el.parentEl.components.escaperoom_wall.data.thickness;
        posX = (this.el.parentEl.components.escaperoom_wall.data.doorhole.width / 2) - 2.6 * thickness;
        posY = -this.el.parentEl.components.escaperoom_wall.data.height / 2;
        posZ = 0.0;

        this.el.object3D.position.set(posX, posY, posZ);
        this.el.object3D.rotation.set(0, Math.PI / 2, 0);
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


