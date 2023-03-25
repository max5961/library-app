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

const nigga = new Album(1,2,3,4,5);
addToCollection(nigga);
console.log(collection);