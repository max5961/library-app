const newAlbum = document.querySelector('.newAlbum');
const addNewContent = document.querySelector('.addNewContent');
const exitNew = document.querySelector('.exitNew');
const collection = document.querySelector('.collection');
const submitBtn = document.querySelector('.submitBtn');

let albumCollection = [];
let favoritedAlbum = [];

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

function newAlbumForm(e){
    toggleVisibility(e);
    document.querySelector('.inputTitle').value = '';
    document.querySelector('.inputBand').value = '';
    document.querySelector('.inputYear').value = '';
    document.querySelector('.inputYoutube').value = '';
    document.querySelector('.toggleFavorite').value = '';
}

function addAlbum(){
    let album = new Album(
        document.querySelector('.inputTitle').value,
        document.querySelector('.inputBand').value,
        document.querySelector('.inputYear').value,
        document.querySelector('.inputYoutube').value,
        document.querySelector('.toggleFavorite').value
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

function createDisplay(index){
    const album = document.createElement('div');
    album.classList.add('album');
    album.dataset.index = `${index}`;

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
    remove.dataset.index(`${index}`);

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

function remove(){
    removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log(button);
        })
    })
}

function displayAlbum(e){
    toggleVisibility(e);
    addAlbum();
    
    // albumCollection length will be the index of the object that is pushed into albumCollection in createDisplay()
    // index will be the data property in the .album .remove elements.
    const index = albumCollection.length;
    createDisplay(index);

    // get all of the remove buttons and addEventListeners
    remove();
}

newAlbum.addEventListener('click', newAlbumForm);
exitNew.addEventListener('click', toggleVisibility);
submitBtn.addEventListener('click', displayAlbum);


let favoriteButtons = document.querySelectorAll('.toggleFavorite');
let favorited = false;
favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
        favorited = !favorited;
        if(favorited){
            button.style.backgroundColor = 'var(--favoritedBG)';
            button.textContent = 'Unfavorite';
        } else {
            button.style.backgroundColor = 'var(--btnBG)';
            button.textContent = 'Favorite';
        }
    })
})



