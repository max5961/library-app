const newAlbum = document.querySelector('.newAlbum');
const addNewContent = document.querySelector('.addNewContent');
const exitNew = document.querySelector('.exitNew');
const collection = document.querySelector('.collection');
const submitBtn = document.querySelector('.submitBtn');

let albumCollection = [];

function Album(title, band, year, youtubeLink, favorite){
    this.title = title;
    this.band = band;
    this.year = year;
    this.youtubeLink = youtubeLink;
    this.favorite = favorite;
}

function toggleVisibility(e){
    if(e.target === newAlbum){
        addNewContent.style.visibility = 'visible';
        collection.style.visibility = 'hidden';
    }

    else if(e.target === exitNew || e.target === submitBtn){
        e.preventDefault();
        addNewContent.style.visibility = 'hidden';
        collection.style.visibility = 'visible';
    }
}

function addAlbum(){
    let album = new Album(
        document.querySelector('.inputTitle').value,
        document.querySelector('.inputBand').value,
        document.querySelector('.inputYear').value,
        document.querySelector('.inputYoutube').value,
        document.querySelector('#favorites').value
    );

    if(album.youtubeLink.length < 11 || !album.youtubeLink.includes('youtube.com')){
        album.youtubeLink = '';
    }
    // convert youtube link into embedded link
    else if (album.youtubeLink.includes('youtube.com')) {
        album.youtubeLink = "https://www.youtube.com/embed/" + album.youtubeLink.substring(album.youtubeLink.length - 11);
    }

    albumCollection.push(album);
}

function createDisplay(){
    const album = document.createElement('div');
    album.classList.add('album');

    const iframe = document.createElement('iframe');
    iframe.width = '300';
    iframe.height = '200';

    const albumDesc = document.createElement('div');
    albumDesc.classList.add('albumDesc');

    const albumTitle = document.createElement('div');
    const bandName = document.createElement('div');
    const albumYear = document.createElement('div');
    const addFavorite = document.createElement('button');
    const remove = document.createElement('button');
    albumTitle.classList.add('albumTitle');
    bandName.classList.add('bandName');
    albumYear.classList.add('albumYear');
    addFavorite.classList.add('addFavorite');
    remove.classList.add('remove');

    collection.appendChild(album);
    album.appendChild(iframe);
    album.appendChild(albumDesc);
    [albumTitle, bandName, albumYear, addFavorite, remove].forEach(item => albumDesc.appendChild(item));

    albumTitle.textContent = albumCollection[albumCollection.length - 1].title;
    bandName.textContent = albumCollection[albumCollection.length - 1].band;
    albumYear.textContent = albumCollection[albumCollection.length - 1].year;
    iframe.src = albumCollection[albumCollection.length - 1].youtubeLink;
    addFavorite.textContent = 'Favorite';
    remove.textContent = 'Remove';

}

function displayAlbum(e){
    toggleVisibility(e);
    addAlbum();
    createDisplay();
}

newAlbum.addEventListener('click', toggleVisibility);
exitNew.addEventListener('click', toggleVisibility);
submitBtn.addEventListener('click', displayAlbum)