/* global AFRAME, THREE */




AFRAME.registerComponent("injectreagent", {

      
  schema: {
    name :  { default:' Appareil' },
    info:  {  type: 'string',    default: "100ml"},
    position:{ default:'0 0 0' },
    rotation :{ default:'0 0 0'},
    scale:{ default:'1 1 1'}
  }
,

init() { 
 console.log(this)
 //reagent gltf model's
 switch (this.data.name ) {
      case  ("NaCl"):
      this.reagentgltf = "#chem1";
      this.info = "<div class ='card textlabo p-3' style=''>"+this.data.info+"</div>";
      break;
      case  ("NaOH"):
        this.reagentgltf = "#chem2";
        this.info ="<div class ='card p-3 textlabo' style=''>"+this.data.info+"</div>";
        break;
      break;
      case  ("CCl_2"):
        this.reagentgltf = "#chem3";
        this.info = "<div class ='card p-3 textlabo' style=''>"+this.data.info+"</div>";
        break;
      break;
      case  ("CaCO_3"):
        this.reagentgltf = "#CaCO_3";
        this.info = "<div class ='card p-3 textlabo' style=''>"+this.data.info+"</div>";
        break;
      break;
      case  ("C_6H_12O_6"):
        this.reagentgltf = "#chem5";
        this.info = "<div class ='card p-3 textlabo' style=''>"+this.data.info+"</div>";
        break;
      break;
      default:
        this.reagentgltf = "#chem1";
        this.info = "<div class ='card p-3 textlabo' style=''>"+this.data.info+"/div>";
        break;
      break;
    }
        this.el.ensure("a-gltf-model", "a-gltf-model", {
          "src": this.reagentgltf,
          "class": "matlabo1",
         
          "scale" : "1 1 1"
          
        })
        this.contain = this.el.querySelector('a-gltf-model').ensure("a-htmlembed", "a-htmlembed", {
          "id": this.data.id +"i",
          "ppu":256,
          "class": "textlabo", 
          "position" : "0 0 0",
          "rotation" : "0 0 0",
          "scale" : "1 1 1",
          "visible":false
        },
        this.info)
        this.el.setAttribute("class","")  
        this.el.setAttribute("shape","cylinder")
        this.el.setAttribute("body", "type", "kinematic")
        this.el.setAttribute("body", "restitution", "0")
this.hidelabel = AFRAME.utils.bind(this.hidelabel, this);
this.showlabel = AFRAME.utils.bind(this.showlabel, this);
  this.el.addEventListener('mouseenter', this.showlabel);
  this.el.addEventListener('mouseleave', this.hidelabel);
        
        

   /*     this.containlevel = this.data.percent * this.reagentvolumeheight;
        this.containlevely= 0.0 +( this.containlevel / 2);
        console.log("les données  couleur = "+this.data.colorliq + "   water level y  =" +this.containlevely + "   containlevel  =" + this.containlevel + "  this.data.volume ="+  this.data.volume )  
  // Contain of the reagent
        var contain = this.el.querySelector('a-gltf-model').ensure("a-cylinder", "a-cylinder", {
                "color": this.data.colorliq,
                "class": "cyl",
                "height" : this.containlevel, 
                "radius" : this.reagentvolumediameter ,
                "position" :{x: 0,
                  y : this.containlevely,
                  z : 0
                  },
                "opacity" :this.data.opacity ,
                "transparent":"true"
            })*/
/* this.el.sciencepannel= this.el.ensure("a-gui-flex-container", "a-gui-flex-container", {
["flex-direction"] :"column",
 ["justify-content"]:"center" ,
 ["align-items"] :"normal" ,
 ["component-padding"] : "0.1",
  opacity:"0.7" ,
  width:"3",
  height:"4.5",
  position:"0 0.4 -0.025",
  rotation:"0 0 0" ,
  scale:"0.1 0.1 0.1"
  })

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
*/
 },
/* var containlevel = this.el.getAttribute("containlevel")
 var containlevely= 0.03 + containlevel / 2;
console.log("lesd données"+this.data.colorliq + containlevely)
var containlevel = this.el.getAttribute("containlevel")
  this.el.innerHTML = `<a-entity id="matlabo1" gltf-model="#becher2" ></a-entity> <a-cylinder class="cyl" color="`+this.data.colorliq+`" height="`+containlevel+`" radius="0.08" position="0 `+containlevely+` 0" opacity="`+this.data.opacity+`" transparent="true">
  </a-cylinder>  `*/
  
  
update(oldData) {
//  this.el.addEventListener('click', this.levelw);
 // this.el.addEventListener('drop', this.dropb);
},
tick() {
},

/*levelw() {
  console.log("ceci = "+this)
  this.schema = this.el.querySelector(".cyl")
  this.data.percent = this.el.components.injectreagent.el.childNodes[2].childNodes[2].components["gui-slider"].data.percent
  this.data.percentsolute = this.el.components.injectreagent.el.childNodes[2].children[4].components["gui-slider"].data.percent
  this.dataopacity = this.data.percentsolute /this.data.percent
  console.log("opafitu =" +this.dataopacity)
  console.log("volume"+ this.data.volume)
  console.log("solute =" + this.data.percentsolute)
  console.log("percent" + this.el.components.injectreagent.el.childNodes[2].children[2].components["gui-slider"].data.percent)
     this.containlevel  = this.data.percent * this.data.volume;
     this.containlevely= 0.00 +( this.containlevel / 2);
     this.el.emit('timetochange')
     console.log(this.containlevel)
    this.schema.setAttribute('height', this.containlevel)
    this.schema.setAttribute('opacity', this.dataopacity)
    this.schema.setAttribute('position', {x: 0, y : this.containlevely,z : 0})
    console.log(this.el.getAttribute('containlevel'))
    },
dropb(){
  this.pannel = this.el.querySelector("a-gui-flex-container")
  console.log(this.el.getAttribute("rotation"))
 if (!this.el.is("grabbed") )
 {this.pannel.setAttribute('rotation', "0 0 90")
  console.log("je dropp!!!")*/
  /*this.el.setAttribute('rotation', "0 90 0"))*/
 /* console.log(this.el.getAttribute("rotation"))}

    
}*/
showlabel() {
  console.log("Showlabel is on")
  this.contain.setAttribute("visible",true)},
hidelabel() {
    console.log("hidelabel is on")
    this.contain.setAttribute("visible",false) 
  
  /*this.schema = this.el.querySelector(".cyl")
  this.data.percent = this.el.components.injectreagent.el.childNodes[2].childNodes[2].components["gui-slider"].data.percent
  this.data.percentsolute = this.el.components.injectreagent.el.childNodes[2].children[4].components["gui-slider"].data.percent
  this.dataopacity = this.data.percentsolute /this.data.percent
  console.log("opafitu =" +this.dataopacity)
  console.log("volume"+ this.data.volume)
  console.log("solute =" + this.data.percentsolute)
  console.log("percent" + this.el.components.injectreagent.el.childNodes[2].children[2].components["gui-slider"].data.percent)
     this.containlevel  = this.data.percent * this.data.volume;
     this.containlevely= 0.00 +( this.containlevel / 2);
     this.el.emit('timetochange')
     console.log(this.containlevel)
    this.schema.setAttribute('height', this.containlevel)
    this.schema.setAttribute('opacity', this.dataopacity)
    this.schema.setAttribute('position', {x: 0, y : this.containlevely,z : 0})
    console.log(this.el.getAttribute('containlevel'))*/
    },
})

