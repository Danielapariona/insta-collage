let containerImages = document.getElementById('container-images-js');
let destino = document.getElementById('zona-destino');

document.addEventListener('dragstart', drag);
document.addEventListener('dragover', function (e) {
  e.preventDefault();
});
document.addEventListener('drop', drop);
document.addEventListener('dragend', end);

function createImage(images) {
  for (let i = 0; i < images.length; i++) {
    var image = document.createElement('img');
    image.setAttribute('src', '../assets/images/' + images[i]['name']);
    image.setAttribute('id', images[i]['id']);
    image.classList.add('img-thumbnail', 'image-small');
    containerImages.appendChild(image);
  }
}

createImage(images);

function drag(e) {
  /* var codigo = '<img src="' + imageOrigen.getAttribute('src') + '">';
  e.dataTransfer.setData("Text", codigo); */
  event.dataTransfer.setData('text', event.target.id);
}

function drop(e) {
  /* e.preventDefault();
  destino.innerHTML = e.dataTransfer.getData('Text') */
  event.preventDefault();
  if (event.target.classList.contains('box')) {
    let idFoto = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(idFoto));
  }
}

function end() {
  console.log('dragend');
  // console.log(event.target);
  event.target.classList.remove('image-small', 'img-thumbnail');
  event.target.classList.add('size');
}