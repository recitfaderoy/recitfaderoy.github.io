if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('classeroomdeskchair', {
    schema: {
      row : {type:'int', default:6},
      column : {type:'int', default:5},
      widthc :{type:'int', default:8},
      depthc: {type:'int', default:8},
      scrid : {default:'#desk1'}
    },        
    init: function () {

var data = this.data;
var spacedeskx = data.widthc / data.column;
var spacedesky = data.depthc / data.row;
console.log( spacedeskx);
console.log( spacedesky);
var el =this.el;
var k= 0;
var allposi= [];
var x = 0;

        for (var i = 0; i < data.column; i = i + 1) {
          var y = 0;
          for (var j = 0; j < data.row; j = j +1 ){
          
            var y = y + spacedesky;
            var posit = x + ' 0 ' + y;
            deskfct(posit, data.scrid);
            allposi[k] = posit;
            k=k+1;
             
        }var x = x + spacedeskx;
      }
     
console.log(allposi);

function deskfct (posit, scrid){
    var locdesk = document.createElement('a-gltf-model');
    /*desk.setAttribute('dynamic-body', 'shape: box; mass: 10; ');*/
    /*desk.setAttribute('spring', 'target: #floor; damping: 1; stiffness: 100;');*/
    locdesk.setAttribute('src', scrid);
    locdesk.setAttribute('position', posit);
    locdesk.setAttribute('scale', '0.5 0.5 0.5');
    locdesk.setAttribute('rotation', '0 90 0');
    locdesk.setAttribute('shadow','receive:true');
    locdesk.setAttribute('body','type:dynamic');
    el.appendChild(locdesk);
    
  }
}}
)