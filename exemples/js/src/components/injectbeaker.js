/* global AFRAME, THREE */

AFRAME.registerComponent("injectbeaker", {

      
      schema: {
        name :  { default:' Appareil' },
        volume:  {  type: 'number',default: 0.4 },
        solute:  {  type: 'number',default: 0.1 },
        percent: { type: 'number', default: 0.2 },
        opacity: { default:' 0.2' },
        colorliq: { default:'#eef' },
        position:{ default:'0 0 0' },
        rotation :{ default:'0 0 0'},
        scale:{ default:'1 1 1'}
      }
    ,

    init() { 
     console.log(this)
      var eti = this.el
      this.datawaterlevel = this.data.percent * this.data.volume;
      this.waterlevely= 0.03 +( this.datawaterlevel / 2);
      console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.waterlevely + "   waterlevel  =" + this.datawaterlevel + "  this.data.volume ="+  this.data.volume )  
      
    
   this.el.setAttribute("class","science")  
   this.el.setAttribute("shape","cylinder")
   this.el.setAttribute("body", "type", "kinematic")
   this.el.setAttribute("body", "restitution", "0")
   this.el.ensure("a-gltf-model", "a-gltf-model", {
    "src": "#becher2",
    "class": "matlabo1"
  })
        this.el.ensure("a-cylinder", "a-cylinder", {
          "color": this.data.colorliq,
          "class": "cyl",
          "height" : this.datawaterlevel, 
          "radius" : "0.08" ,
          "position" :{x: 0,
            y : this.waterlevely,
          z : 0
            },
          "opacity" :this.data.opacity ,
          "transparent":"true"
       })
  this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
    ["flex-direction"] :"column",
     ["justify-content"]:"center" ,
     ["align-items"] :"normal" ,
     ["component-padding"] : "0.1",
			opacity:"0.7" ,
      width:"3",
      height:"4.5",
			position:"0 1.25 0",
      rotation:"0 0 0" ,
      scale:"0.25 0.25 0.25"
      })
  this.el.sciencepannel = this.el.querySelector("a-gui-flex-container")
      this.el.sciencepannel.ensure(".labela", "a-gui-label", {
      width:"2.5",
      height:"0.75",
      value:this.data.name,
      ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
      ["font-size"]:"0.35",
      ["font-color"]:this.data.colorliq,
      ["line-height"]:"0.8",
      ["letter-spacing"]:"0",
      margin:"0 0 0.05 0"
     })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"V total",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider1", "a-gui-slider",{
        class:"slider1",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.percent,
	      margin:"0 0 0.05 0"
      })
      this.el.sciencepannel.ensure(".labelb", "a-gui-label",{
        width:"2.5",
        height:"0.75",
        value:"Masse soluté",
        ["font-family"]:"{{{vrpath}}}/assets/fonts/DiplomataSC-Regular.ttf",
        ["font-size"]:"0.35",
        ["line-height"]:"0.8",
        ["letter-spacing"]:"0",
        margin:"0 0 0.05 0"
       } )
      this.el.sciencepannel.ensure(".slider2", "a-gui-slider",{
        class:"slider2",
        width:"2.5" ,
        height:"0.75",
        onclick:"",
	      percent: this.data.solute,
	      margin:"0 0 0.05 0"
      })
 this.levelw = AFRAME.utils.bind(this.levelw, this);
 this.dropb = AFRAME.utils.bind(this.dropb, this);
 this.levelw
      this.el.addEventListener('click', this.levelw);
   
     },
 /* var datawaterlevel = this.el.getAttribute("waterlevel")
     var waterlevely= 0.03 + datawaterlevel / 2;
console.log("lesd données"+this.data.colorliq + waterlevely)
    var datawaterlevel = this.el.getAttribute("waterlevel")
      this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+datawaterlevel+`" radius="0.08" position="0 `+waterlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
      </a-cylinder>  `*/
      
      
    update(oldData) {
      this.el.addEventListener('click', this.levelw);
      this.el.addEventListener('drop', this.dropb);
    },
    tick() {
    },
    
    levelw() {
      console.log(this)
      this.schema = this.el.querySelector(".cyl")
      this.data.percent = this.el.components.injectbeaker.el.childNodes[3].childNodes[2].components["gui-slider"].data.percent
      this.data.percentsolute = this.el.components.injectbeaker.el.childNodes[3].children[4].components["gui-slider"].data.percent
      this.dataopacity = this.data.percentsolute /this.data.percent
      console.log("opafitu =" +this.dataopacity)
      console.log("volume"+ this.data.volume)
      console.log("solute =" + this.data.percentsolute)
      console.log("percent" + this.el.components.injectbeaker.el.childNodes[3].children[2].components["gui-slider"].data.percent)
         this.waterlevel  = this.data.percent * this.data.volume;
         this.waterlevely= 0.03 +( this.waterlevel / 2);
         this.el.emit('timetochange')
         console.log(this.waterlevel)
        this.schema.setAttribute('height', this.waterlevel)
        this.schema.setAttribute('opacity', this.dataopacity)
        this.schema.setAttribute('position', {x: 0, y : this.waterlevely,z : 0})
        console.log(this.el.getAttribute('waterlevel'))
        },
    dropb(){
      this.pannel = this.el.querySelector("a-gui-flex-container")
      console.log(this.el.getAttribute("rotation"))
     if (!this.el.is("grabbed") )
     {this.pannel.setAttribute('rotation', "0 0 90")
      console.log("je dropp!!!")
      /*this.el.setAttribute('rotation', "0 90 0"))*/
      console.log(this.el.getAttribute("rotation"))}
    
        
  }
})

