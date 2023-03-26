const newAlbum = document.querySelector('.newAlbum');
const albumsContainer = document.querySelector('.albumsContainer');
const albumForm = document.querySelector('.albumForm');


const submit = document.querySelector('.submit');
const title = document.getElementById('title');
const band = document.getElementById('band');
const year = document.getElementById('year');
const runtime = document.getElementById('runtime');
const youtube = document.getElementById('youtube');


let collection = [];

function Album(title, band, year, runtime, youtubeLink){
    this.title = title;
    this.band = band;
    this.year = year;
    this.runtime = runtime;
    this.youtubeLink = youtubeLink;
}

function addToCollection(album){
    collection.push(album);
}

newAlbum.addEventListener('click', () => {
    albumForm.style.visibility = 'visible';
})

function albumDisplay(album){
    let albumGui = document.createElement('div');
    albumGui.classList.add('album');
    albumsContainer.appendChild(albumGui);

    albumGui.textContent = 'test';
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    albumForm.style.visibility = 'hidden';
    let album = new Album(title.value, band.value, year.value, runtime.value, youtube.value)

    addToCollection(album);
    console.log(collection);

    albumDisplay(album);
    
})

