const newAlbum = document.querySelector('.newAlbum');
const addNewContent = document.querySelector('.addNewContent');
const exitNew = document.querySelector('.exitNew');
const collection = document.querySelector('.collection');
const submitBtn = document.querySelector('.submitBtn');
const favoriteBtn = document.querySelector('.favorites');
const entireCollectionBtn = document.querySelector('.entireCollection');

let albumCollection = [];
let favoritedAlbums = [];
let idNumbers = [];
let favoriteView = false;
let entireCollectionView = true;
//let removeBtnEventListener = true; ---I dont think I need this anymore


function generateID(){
    id = Math.floor(Math.random() * 90000) + 10000;
    idNumbers.push(id);
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

    const album = new Album(
        document.querySelector('.inputTitle').value,
        document.querySelector('.inputBand').value,
        document.querySelector('.inputYear').value,
        document.querySelector('.inputYoutube').value,
        fav.value
    );

    // check if valid youtube link provided
    if(album.youtubeLink.length < 11 || !album.youtubeLink.includes('youtube.com')){
        album.youtubeLink = '';
    }
    // convert youtube link into embedded link
    else if (album.youtubeLink.includes('youtube.com')) {
        album.youtubeLink = "https://www.youtube.com/embed/" + album.youtubeLink.substring(album.youtubeLink.length - 11);
    }

    albumCollection.push(album);
    if(album.favorite == 'true'){
        favoritedAlbums.push(album);
    }
}

function newDisplayInstance(obj){
    // album container
    const album = document.createElement('div');
    album.classList.add('album');

    const idNumber = obj.id;
    album.dataset.id = `${idNumber}`;

    // youtube embed container
    const iframe = document.createElement('iframe');
    iframe.width = '300';
    iframe.height = '200';

    // album desc container + children
    const albumDesc = document.createElement('div');
    albumDesc.classList.add('albumDesc');
    const albumTitle = document.createElement('div');
    albumTitle.classList.add('albumTitle');
    const bandName = document.createElement('div');
    bandName.classList.add('bandName');
    const albumYear = document.createElement('div');
    albumYear.classList.add('albumYear');
    const addFavorite = document.createElement('button');
    addFavorite.classList.add('addFavorite');
    const remove = document.createElement('button');
    remove.classList.add('remove');

    // add elements to containers 
    collection.appendChild(album);
    album.appendChild(iframe);
    album.appendChild(albumDesc);
    [albumTitle, bandName, albumYear, addFavorite, remove].forEach(desc => albumDesc.appendChild(desc));

    // text content and values to elements
    albumTitle.textContent = obj.title;
    bandName.textContent = obj.band;
    albumYear.textContent = obj.year;
    iframe.src = obj.youtubeLink;
    
    //check if favorited
    if(obj.favorite == 'true'){
        addFavorite.textContent = 'Unfavorite';
        addFavorite.style.backgroundColor = 'var(--favoritedBG)';
    } else {
        addFavorite.textContent = 'Favorite';
    }

    // add event listeners
    remove.textContent = 'Remove';
    remove.addEventListener('click', removeEntry);
    addFavorite.addEventListener('click', toggleFavorite);
}

function newDisplayFromArr(favoritedAlbums){
    while(collection.firstChild){
        collection.removeChild(collection.firstChild);
    }

    if(favoritedAlbums.length > 0){
        favoritedAlbums.forEach(newDisplayInstance)
    }
}

function resetDataIndexes(){
    const albums = document.querySelectorAll('.album');

    for(let i = 0; i <= albums.length -1; i++){
        albums[i].dataset.index = `${i}`;
    }
}

const removeEntry = (e) => {
    albumCollection = albumCollection.filter(album => album.id != e.target.parentElement.parentElement.dataset.id);
    favoritedAlbums = favoritedAlbums.filter(album => album.id != e.target.parentElement.parentElement.dataset.id);
    
    //remove album from gui
    const parent = e.target.parentElement.parentElement;
    parent.remove();

    //reset indexes of all displayed albums 
    //resetDataIndexes(); ---- I don't think I need this

    // removeBtnEventListener = true; ---- I don't think I need this
}

function submitAlbum(e){
    // toggle visibility back to collection being displayed and form being hidden
    toggleVisibility(e);

    // push the object created from the from values into the albumCollection array and favoritedAlbums array (if favorite is checked)
    addAlbum();
    
    // populate gui with data from the latest album added to the albumCollection array
    if(favoriteView == false){
        let album = albumCollection[albumCollection.length - 1];
        newDisplayInstance(album);
    }

    // reset the dataset indexes of all of the populated albums in the gui
    // resetDataIndexes(); ---- I dont think I need this
}

function toggleFavorite(e){
    const idNumber = e.target.parentElement.parentElement.dataset.id;

    // if in favorites viewing mode, remove obj from gui
    if(favoriteView){
        const parent = e.target.parentElement.parentElement;
        parent.remove();
    }

    if(e.target.style.backgroundColor == 'var(--favoritedBG)'){
        //change gui
        e.target.style.backgroundColor = 'var(--btnBG)';
        e.target.textContent = 'Favorite';

        //update albumCollection arr
        albumCollection.forEach(album => {
            if(album.id == idNumber){
                album.favorite = 'false';
                favoritedAlbums = favoritedAlbums.filter(album => album.id != idNumber);
            }
        })
    } else {
        e.target.style.backgroundColor = 'var(--favoritedBG)';
        e.target.textContent = "Unfavorite";

        albumCollection.forEach(album => {
            if(album.id == idNumber){
                album.favorite = 'true';

                if(!favoritedAlbums.includes(album)){
                    favoritedAlbums.push(album);
                }
            }
        })
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
            album.dataset.id = `${favAlbum.id}`;

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

            remove.addEventListener('click', removeEntry);
            addFavorite.addEventListener('click', removeEntry);

            resetDataIndexes();
                
        });
    }
}

newAlbum.addEventListener('click', newAlbumForm);
exitNew.addEventListener('click', toggleVisibility);
submitBtn.addEventListener('click', submitAlbum);
favoriteBtn.addEventListener('click', function(){
    // Switch viewing modes.  Only set favoriteView to true if it has already been turned off and reset entireCollectionView to false
    if(favoriteView === false){
        favoriteView = !favoriteView;
        entireCollectionView = false;

        favoriteBtn.style.backgroundColor = 'var(--btnViewingBG)';
        entireCollectionBtn.style.backgroundColor = 'var(--btnBG)';

        newDisplayFromArr(favoritedAlbums);
    }
});

entireCollectionBtn.addEventListener('click', function(){
    if(entireCollectionView === false){
        entireCollectionView = !entireCollectionView;
        favoriteView = false;

        entireCollectionBtn.style.backgroundColor = 'var(--btnViewingBG)';
        favoriteBtn.style.backgroundColor = 'var(--btnBG)';

        newDisplayFromArr(albumCollection);
    }
})



