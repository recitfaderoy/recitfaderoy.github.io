window.closeDropdown = function(e) {
    let drop = e.currentTarget.parentElement.parentElement.children[0];
    if (!drop) return;
    e.currentTarget.parentElement.setAttribute('visible', 'false');
    e.currentTarget.parentElement.setAttribute('scale', '0.1 0.1 0.1');
    drop.setAttribute('visible', 'true');
    drop.setAttribute('scale', '1 1 1');
}

window.openDropdown = function(e) {
    let id = e.currentTarget.getAttribute('data-target');
    let drop = document.getElementById(id);
    if (!drop) return;
    e.currentTarget.setAttribute('visible', 'false');
    e.currentTarget.setAttribute('scale', '0.1 0.1 0.1');
    drop.setAttribute('visible', 'true');
    drop.setAttribute('scale', '1 1 1');
}