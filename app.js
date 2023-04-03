const newAlbum = document.querySelector('.newAlbum');
const addNewContent = document.querySelector('.addNewContent');
const exitNew = document.querySelector('.exitNew');
const collection = document.querySelector('.collection');
const submitBtn = document.querySelector('.submitBtn');

let albumCollection = [];
let favoritedAlbums = [];
let idNumbers = [];
let removeBtnEventListener = true;

let favoriteView = false;


function generateID(){
    id = Math.floor(Math.random() * 90000) + 10000;
    while(idNumbers.includes(id)){
        id = Math.floor(Math.random() * 90000) + 10000;
    }
    return id;
}

function Album(title, band, year, youtubeLink, favorite, id){
    this.title = title;
    this.band = band;
    this.year = year;
    this.youtubeLink = youtubeLink;
    this.favorite = favorite;
    this.id = generateID();
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

function newAlbumForm(e){
    toggleVisibility(e);
    document.querySelector('.inputTitle').value = '';
    document.querySelector('.inputBand').value = '';
    document.querySelector('.inputYear').value = '';
    document.querySelector('.inputYoutube').value = '';
    document.querySelector('#addFavorite').checked = false;
}

function addAlbum(){
    const fav = document.querySelector('#addFavorite');
    if(fav.checked == true){
        fav.value = true;
    }
    else if(fav.checked == false){
        fav.value = false;
    }

    let album = new Album(
        document.querySelector('.inputTitle').value,
        document.querySelector('.inputBand').value,
        document.querySelector('.inputYear').value,
        document.querySelector('.inputYoutube').value,
        fav.value
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

function createDisplay(albumCollection){
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
    addFavorite.classList.add('toggleFavorite');
    remove.classList.add('remove');

    collection.appendChild(album);
    album.appendChild(iframe);
    album.appendChild(albumDesc);
    [albumTitle, bandName, albumYear, addFavorite, remove].forEach(item => albumDesc.appendChild(item));

    albumTitle.textContent = albumCollection[albumCollection.length - 1].title;
    bandName.textContent = albumCollection[albumCollection.length - 1].band;
    albumYear.textContent = albumCollection[albumCollection.length - 1].year;
    iframe.src = albumCollection[albumCollection.length - 1].youtubeLink;

    //check if favorited
    if(albumCollection[albumCollection.length - 1].favorite == 'true'){
        addFavorite.textContent = 'Unfavorite';
        addFavorite.style.backgroundColor = 'var(--favoritedBG)';
    } else {
        addFavorite.textContent = 'Favorite';
    }
    remove.textContent = 'Remove';
    remove.addEventListener('click', removeEntry);

    updateFavorite(addFavorite);

}

function resetDataIndexes(){
    const albums = document.querySelectorAll('.album');

    for(let i = 0; i <= albums.length -1; i++){
        albums[i].dataset.index = `${i}`;
    }
}

const removeEntry = (e) => {
    if(favoriteView){
        let index = e.target.parentElement.parentElement.dataset.index;
        console.log(`index of removed: ${index}`);
        favoritedAlbums.splice(index,1);
    } else {
        let index = e.target.parentElement.parentElement.dataset.index;
        console.log(`index of removed: ${index}`);
        albumCollection.splice(index,1);
    }
    
    
    //remove album from gui
    const parent = e.target.parentElement.parentElement;
    parent.remove();

    //reset indexes of all displayed albums
    resetDataIndexes();

    removeBtnEventListener = true;
}

function submitAlbum(e){
    // toggle visibility back to collection being displayed and form being hidden
    toggleVisibility(e);

    // push the object created from the form values into the albumCollection array
    addAlbum();
    
    // populate gui with data from the latest album added to the albumCollection array
    createDisplay(albumCollection);

    // reset the dataset indexes of all of the populated albums in the gui
    resetDataIndexes();
}

newAlbum.addEventListener('click', newAlbumForm);
exitNew.addEventListener('click', toggleVisibility);
submitBtn.addEventListener('click', submitAlbum);


function updateFavorite(addFavorite){
    addFavorite.addEventListener('click', toggleFavorite)
}

function toggleFavorite(e){
    const index = e.target.parentElement.parentElement.dataset.index;

    if(e.target.style.backgroundColor == 'var(--favoritedBG)'){
        //change gui
        e.target.style.backgroundColor = 'var(--btnBG)';
        e.target.textContent = 'Favorite';

        //update albumCollection arr
        albumCollection[index].favorite = 'false';
    } else {
        e.target.style.backgroundColor = 'var(--favoritedBG)';
        e.target.textContent = "Unfavorite";

        albumCollection[index].favorite = 'true';
    }
}

function viewFavorites(){
    favoriteView = true;

    favoritedAlbums = albumCollection.filter(album => album.favorite == 'true');

    const collection = document.querySelector('.collection');
    while(collection.firstChild){
        collection.removeChild(collection.firstChild);
    }

    if(favoritedAlbums.length > 0){
        favoritedAlbums.forEach(favAlbum => {
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
            const remove = document.createElement('button');
            const addFavorite = document.createElement('button');
            albumTitle.classList.add('albumTitle');
            bandName.classList.add('bandName');
            albumYear.classList.add('albumYear');
            addFavorite.classList.add('toggleFavorite');
            remove.classList.add('remove');

            collection.appendChild(album);
            album.appendChild(iframe);
            album.appendChild(albumDesc);
            [albumTitle, bandName, albumYear, addFavorite, remove].forEach(item => albumDesc.appendChild(item));

            albumTitle.textContent = favAlbum.title;
            bandName.textContent = favAlbum.band;
            albumYear.textContent = favAlbum.year;
            iframe.src = favAlbum.youtubeLink;

            remove.textContent = 'Remove';

            addFavorite.textContent = 'Unfavorite';
            addFavorite.style.backgroundColor = 'var(--favoritedBG)';

            resetDataIndexes();
            remove.addEventListener('click', removeEntry);
            addFavorite.addEventListener('click', removeEntry);
                
        });
    }
}

document.querySelector('.favorites').addEventListener('click', viewFavorites);




