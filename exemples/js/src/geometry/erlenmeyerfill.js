registerGeometry('erlenmeyerfill', {
    schema: {
      radius: {default: 1, min: 0},
      height: {default: 1, min: 0},
      width: {default: 1, min: 0},
      segmentsHeight: {default: 1, min: 1, max: 20, type: 'int'},
      segmentsWidth: {default: 1, min: 1, max: 20, type: 'int'},
      segmentsDepth: {default: 1, min: 1, max: 20, type: 'int'}
    },
  
    init: function (data) {
       
        this.cone = new THREE.Mesh( new THREE.ConeGeometry( 5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
        this.cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    }  });