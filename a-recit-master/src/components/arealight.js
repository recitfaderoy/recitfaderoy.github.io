AFRAME.registerComponent('arealight', {
    
    schema: {
      width: { type: 'number' },
      height: { type: 'number' },
      scale: { type: 'vec3' },
      intensity: { type: 'number', default: 30 },
      color: { type: 'color', default: '#ffffff' },
      rotation: { type: 'vec3', default: { x: 0, y: 360, z: 0 } },
      showHelper: { type: 'boolean', default: false }
    },
    
    init: function() {
      
      var data = this.data;
      var height, width, scale;
      
      // console.log( 'Data:', data );
      // console.log( 'Object3D:', this.el.object3D );
      // console.log( 'Object3DMap:', this.el.object3DMap );
      // console.log( 'ComputeBoundingBox:', this.el.getObject3D('mesh').geometry.computeBoundingBox() );
      
      scale = this.el.object3D.scale;
      height = this.el.getAttribute('geometry').height * scale.y;
      width = ( this.el.getAttribute('geometry').radius * scale.y ) * 2;
     
      
      // console.log( 'Height:', height, 'Width:', width, 'Scale:', scale );
     
      var rectLight = new THREE.RectAreaLight( data.color, data.intensity, width, height );
      
      rectLight.position.set( width * scale.x / 2, 0, 0 );
      rectLight.rotation.set( data.rotation.x, data.rotation.y, data.rotation.z );
      
      this.el.setObject3D( 'area-light', rectLight );
      
      
      
      // Helper BS: Helper doesn't appear correctly in 0.7+.
      if ( data.showHelper ) {
        
        var helper = new THREE.RectAreaLightHelper( rectLight );
        helper.update();
        this.el.setObject3D( 'area-light-helper', helper );
        // helper.update();
        
      }
      
    }
    
  });

  var anime = AFRAME.ANIME;
  
  AFRAME.registerComponent('animatefluo', {
    
    dependencies: ['material', 'sound__hum', 'animation', 'area-light'],
    
    update: function() {
      
      this.el.components.sound__hum.playSound();
      
      // These both get the volume.
      // console.dir(this.el.components.sound__hum.data.volume);
      // console.log(this.el.getAttribute('sound__hum').volume);
      
      this.light = {
        emissiveIntensity: 0,
        areaLightIntensity: 0,
        opacity: this.el.components.material.material.opacity,
        volume: 0
      };
      
      // console.log(this.light.opacity);
      
      this.animeUpdateHandler = animate.bind(this);
      
      function animate() {
        
        // emissiveIntensity
        this.el.components.material.material.emissiveIntensity = this.light.emissiveIntensity;
        
        // rectAreaLight intensity (may want to include custom property)
        this.el.getObject3D('area-light').intensity = this.light.emissiveIntensity * 10;
        
        // opacity
        this.el.components.material.material.opacity = this.light.opacity;
        
        // volume
        this.el.setAttribute( 'sound__hum', 'volume', this.light.volume );
        
      }
      
      this.animationtest = anime({
        targets: this.light,
        emissiveIntensity: 1.5,
        areaLightIntensity: 10,
        opacity: 1,
        volume: 0.1,
        duration: 10000,
        elasticity: 1000,
        delay: function() {
          return 5000 + anime.random(-250, 250);
        },
        loop: true,
        autoplay: true,
        update: this.animeUpdateHandler
      });
      
      // test: works!
      this.animationIsPlaying = true;
      this.time = 0;
      
    },
    
    // Works when animationIsPlaying === true;
    tick: function(t, dt) {
      // if (!this.animationIsPlaying) { return; }
      // this.time += dt;
      // this.animationtest.tick(this.time);
    }
    
  });