AFRAME.registerComponent('do-end-curve', {
    schema: {
      clip1: { default: 'default' },
      clip2: { default: 'default' }
    },
    
    init(){
      //this.num = 1;
      this._scene = document.querySelector('a-scene');
      this.audio =  this._scene.querySelector("#audio");
      this._playere =  this._scene.querySelector('a-player');
      
      this._playerposition =this._scene.querySelector('a-player').getAttribute('position'); 
    this.profa1 = this._scene.querySelector("#profa1");
       this._camera = this._scene.querySelector("a-camera");
       console.log("etienne  go");
    

//console.log(this._player)
console.log( this._playerposition)
    },
    update () {
     
      
},
     
tick(time, timeDelta){
// console.log(this._playerposition.z)
var num =1;
if (!this._playere.is("zonelunette")) {
  if(this._playerposition.z < -5)  {
    this._playere.addState("zonelunette")
  console.log ("zonelunette");
 document.querySelector('a-player').removeAttribute('locomotion');
  document.querySelector('[camera]').removeAttribute('look-controls');
        document.querySelector('[camera]').removeAttribute('wasd-controls');
        this.profa1.setAttribute('animation-mixer', 'clip: marche;loop:repeat;');
        AFRAME.utils.entity.setComponentProperty(this.profa1, "alongpath.curve", "#path1");
        AFRAME.utils.entity.setComponentProperty(this.profa1, "alongpath.dur", "6000");
        AFRAME.utils.entity.setComponentProperty(this.profa1, "alongpath.rotate", "true");
  this._scene.addEventListener('movingended', function () {
    this.profa1 =document.querySelector("#profa1");
    this.audio = document.querySelector("#audio");

        if (num ===1){
          console.log(this.el);
          this.profa1.setAttribute('animation-mixer', 'clip: yell;loop:once; clampWhenFinished:true;');
                  this.audio.play();
                  num = 2;
                  console.log("Marche finie");
        }
      })
      this.el.removeEventListener('movingended', function () { 
        
        this.profa1.setAttribute('animation-mixer', 'clip: yell;loop:once; clampWhenFinished:true;');
        this.audio.play();
       
        console.log("Marche finie");

      }) ;
  this.el.addEventListener('animation-finished', function () {
   
  document.querySelector('[camera]').setAttribute('look-controls', '');
 // document.querySelector('a-player').setAttribute('locomotion', '');
        document.querySelector('[camera]').setAttribute('wasd-controls', '');
    this.profa1 =document.querySelector("#profa1");
    this.audio = document.querySelector("#audio");
    this.profa1.setAttribute('animation-mixer', 'clip: marche;loop:repeat;');
      AFRAME.utils.entity.setComponentProperty(this.profa1, "alongpath.curve", "#path2");
      AFRAME.utils.entity.setComponentProperty(this.profa1, "alongpath.dur", "2000");
      console.log("Marche finie");
})
 }
 else 
 if(this._playerposition.z > -5 ){
  this._playere.removeState("zonelunette")
  console.log ("paszonelunette");
  var profa1 = document.querySelector("#profa1");
  
}
}}

} )

