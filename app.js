const newAlbum = document.querySelector('.newAlbum');
const addNewContent = document.querySelector('.addNewContent');
const exitNew = document.querySelector('.exitNew');
const collection = document.querySelector('.collection');

let submit = false;
let exitBool = false; //need to create exitNew button.

function toggleVisibility(){
    if(submit || exitBool){
        addNewContent.style.visibility = 'hidden';
        collection.style.visibility = 'visible'
    } else {
        addNewContent.style.visibility = 'visible';
        collection.style.visibility = 'hidden';
    }
}

newAlbum.addEventListener('click', toggleVisibility);