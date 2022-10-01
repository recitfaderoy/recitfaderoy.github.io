
Element.prototype.ecouteouvre = function(E,EL)
{
EL.addEventListener('stateadded', function (evt,) {

console.log(E)
console.log(evt.detail)

switch(evt.detail){
case'ouvert':
E.removeAttribute('animation-mixer')
E.setAttribute('mixin', 'er')
console.log(E)
console.log('Entity now selected!');
console.log(E.getAttribute("mixin"))
break
case'ferme':
E.removeAttribute('animation-mixer')
E.setAttribute('mixin', 'et')
console.log('Entity now selected!');
console.log(E.getAttribute("mixin"))
break
case'ouvrir':
E.removeAttribute('animation-mixer')
E.setAttribute('mixin', 'or')
console.log('Entity now selected!');
console.log(E.getAttribute("mixin"))
break
case'fermer':
E.removeAttribute('animation-mixer')
E.setAttribute('mixin', 'ot')
console.log('Entity now selected!');
console.log(E.getAttribute("mixin"))
break
default:
E.removeAttribute('animation-mixer')
E.setAttribute('mixin', 'et')
console.log('Entity now selected!');
console.log(E.getAttribute("mixin"))
break
}
})
}