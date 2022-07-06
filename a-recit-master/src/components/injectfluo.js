AFRAME.registerComponent('injectfluo', {
    
    
  schema: {
    intensity:  { type: 'number', default: 0.3 }
    
  }
,
  init() { 
    console.log(this.el)
    this.el.innerHTML = `<a-light type="point"  0" intensity="`+this.data.intensity+`" penumbra="0.5"></a-light>`
        },
  update(oldData) {
    
  },

  tick(time, timeDelta) {
  }
})