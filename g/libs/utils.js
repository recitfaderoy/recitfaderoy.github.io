AFRAME.registerComponent('avoid-overlapping-elements', {
    init(){
        this.data.lastPosition = {x: 0, y: 0, z: 0};

        let geometry = new THREE.BoxBufferGeometry(1, 1.7, 0.3);
        let material = new THREE.MeshBasicMaterial();
        this.data.cameraMesh = new THREE.Mesh(geometry, material);

        this.data.staticBodyList = document.querySelectorAll("[static-body]");

        this.raycaster = new THREE.Raycaster();
    },

    tick() {
        let roundTo = 2;
        let x = Math.round(this.el.object3D.position.x, roundTo);
        let y = Math.round(this.el.object3D.position.y, roundTo);
        let z = Math.round(this.el.object3D.position.z, roundTo);

        if((this.data.lastPosition.x === x) && (this.data.lastPosition.y === y) && (this.data.lastPosition.z === z)){
            return;
        }

        this.data.lastPosition.x = x;
        this.data.lastPosition.y = y;
        this.data.lastPosition.z = z;
        console.log(x, y, z)

        /*let intersects = null; 
        this.raycaster.setFromCamera( this.el.object3D.position, this.el.components.camera.camera );

        for(let item of this.data.staticBodyList){
            intersects = this.raycaster.intersectObjects( [item.getObject3D('mesh')] );
        }

        if(intersects.length === 0){
            console.log("colide")
        }*/
        
        let result = null;
       //let element_bsp = new CSG();
        
       // let camera_bsp = new CSG();
       // camera_bsp.setFromMesh(this.data.cameraMesh);

       /* for(let item of this.data.staticBodyList){
            let mesh = item.getObject3D('mesh');
           // element_bsp.setFromMesh(mesh);
            //element_bsp.subtractOperand(camera_bsp);
            result = element_bsp.toMesh();

            console.log(result.matrixWorld.equals(mesh.matrixWorld))
        }*/

       /* 
        
       

        ;*/

        //if(distanceTo)
    }
});

AFRAME.registerComponent('static-body', {
    init(){
    
        console.log("init");
    },
});