const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const firstResultsContainer = document.getElementById("search-results-container");

function displayFirstResult(firstPhoto){
    const dummyImage = document.querySelector('.dummy-result');
    if(dummyImage) {
        dummyImage.remove();
    }
    const resultsContainer = document.createElement('div')
    resultsContainer.innerHTML='';
    const img = document.createElement('img');
    img.classList.add('result-img')
    img.src = firstPhoto.src.medium;
    img.alt = firstPhoto.alt_description;
    const imgInfo = document.createElement('div')
    const text = document.createElement('div')
    imgInfo.classList.add('img-info')
    const altText = document.createElement('p');
    altText.textContent = `${firstPhoto.alt}`;

    const photographerName = document.createElement('p');
    photographerName.classList.add('photographer')
    photographerName.textContent = `${firstPhoto.photographer}`;

    const exploreButton = document.createElement('button');
    exploreButton.textContent = 'Explore More';
    exploreButton.classList.add('explore-btn')
    exploreButton.addEventListener('click', function() {
    window.open(`https://www.pexels.com/@${firstPhoto.photographer_url}`, '_blank');
    });

    text.appendChild(altText);
    text.appendChild(photographerName);
    text.appendChild(exploreButton);
    imgInfo.appendChild(img)
    imgInfo.appendChild(text)
    resultsContainer.appendChild(imgInfo)
    firstResultsContainer.appendChild(resultsContainer)

}

function displaySimilarResluts(photos){
    const carouselContainer = document.getElementById('carousel-container')
    carouselContainer.innerHTML = '';
    carouselContainer.classList.add('carousel-container');
    photos.forEach(photo => {
    const card = document.createElement('div');
    card.classList.add('carousel-item');
    const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt_description;
    img.classList.add('card-image')
    imageContainer.appendChild(img)

    const altText = document.createElement('p');
    altText.textContent = `${photo.alt}`;
    altText.classList.add('alt-text')
    const photographerName = document.createElement('p');
    photographerName.textContent = `${photo.photographer}`;
    photographerName.classList.add('photographer-2')

    const addButton = document.createElement('button');
    const heartImg = document.createElement('img')
    heartImg.src = "https://res.cloudinary.com/dqnqix89g/image/upload/v1711552625/Favorite_hynql7.png";
    heartImg.classList.add('add')
    addButton.classList.add('heart-btn')
    addButton.appendChild(heartImg)
   
        addButton.addEventListener('click', function() {
            displayFavouriteList(photo);
            // recommendedSection.removeChild(imageContainer);
            carouselContainer.removeChild(card)
        });
        imageContainer.appendChild(addButton)

    card.appendChild(imageContainer);
    card.appendChild(altText);
    card.appendChild(photographerName);
      carouselContainer.appendChild(card);
    });


    

}


function displayFavouriteList(photo){
    // console.log(photo)
    const favouriteContainer = document.getElementById('favorite-container')
    favouriteContainer.classList.add('carousel-container');

    const card = document.createElement('div');
    card.classList.add('carousel-item');

    const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt_description;
    img.classList.add('card-image')
    imageContainer.appendChild(img)

    const altText = document.createElement('p');
    altText.textContent = `${photo.alt}`;
    altText.classList.add('alt-text')
    const photographerName = document.createElement('p');
    photographerName.textContent = `${photo.photographer}`;
    photographerName.classList.add('photographer-2')

    const removeButton = document.createElement('button');

    const favImg = document.createElement('img')
    favImg.src = "https://res.cloudinary.com/dqnqix89g/image/upload/v1711561711/Favorite_1_ziabaq.png";
    favImg.classList.add('add')
    // removeButton.textContent = "X"
    
    removeButton.classList.add('heart-btn')
    removeButton.appendChild(favImg)

   
        removeButton.addEventListener('click', function() {
            removeFavourite(card,photo)
            favouriteContainer.removeChild(card)
            
        });
        imageContainer.appendChild(removeButton)
        
        card.appendChild(imageContainer);
    card.appendChild(altText);
    card.appendChild(photographerName);
    favouriteContainer.appendChild(card)

    let favoriteItems = JSON.parse(localStorage.getItem('favorite-container')) || [];
    favoriteItems.push(photo)
    localStorage.setItem('favorite-container',JSON.stringify(favoriteItems))
}

function removeFavourite(card,photo){
    const favouriteContainer = document.getElementById('favorite-container');
    favouriteContainer.removeChild(card)

    let favoriteItems = JSON.parse(localStorage.getItem('favorite-container')) || [];
    favoriteItems = favoriteItems.filter(item=>item.id != photo.id);
    localStorage.setItem('favorite-container',JSON.stringify(favoriteItems))
}
function favoriteListFromLocalStorage(){
    const favouriteContainer = document.getElementById('favorite-container');
    favouriteContainer.classList.add('carousel-container');

    const favoriteItems = JSON.parse(localStorage.getItem('favorite-container')) || [];

    favoriteItems.forEach(photo=>{
        const card = document.createElement('div');
    card.classList.add('carousel-item');

    const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.alt_description;
    img.classList.add('card-image')
    imageContainer.appendChild(img)

    const altText = document.createElement('p');
    altText.textContent = `${photo.alt}`;
    altText.classList.add('alt-text')
    const photographerName = document.createElement('p');
    photographerName.textContent = `${photo.photographer}`;
    photographerName.classList.add('photographer-2')
    const removeButton = document.createElement('button');
    const favImg = document.createElement('img')
    favImg.src = "https://res.cloudinary.com/dqnqix89g/image/upload/v1711561711/Favorite_1_ziabaq.png";
    favImg.classList.add('add')
    // removeButton.textContent = "X"
    
    removeButton.classList.add('heart-btn')
    removeButton.appendChild(favImg)

   
        removeButton.addEventListener('click', function() {
            removeFavourite(card,photo)
            favouriteContainer.removeChild(card)
            
        });
        imageContainer.appendChild(removeButton)

    card.appendChild(imageContainer);
    card.appendChild(altText);
    card.appendChild(photographerName);
    favouriteContainer.appendChild(card)

    })


}
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const searchQuery = searchInput.value.trim();
        if (searchQuery !== "") {
            fetchData(searchQuery)
            .then(data => {
                console.log(data)
                displayFirstResult(data.photos[0])
                displaySimilarResluts(data.photos.slice(1))
            })
    }
})

async function fetchData(searchQuery) {
    try{
        const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`, {
        headers: {
            Authorization:  'kyPF1NsYrDyjA9ndRgNhJpj1TA6nc7Qxqquhk4uM7BMzgH0OXzNzVvzg' 
        }
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;    
    }
    catch(error){
        console.log(error)
        
    }
}

// window.onload = favoriteListFromLocalStorage;
window.onload = function() {
    // Clear local storage data
    // localStorage.clear();

    // Load favorite list from local storage
    favoriteListFromLocalStorage();
};


function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  }
  
  function closeDropdown() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.style.display = "none";
  }
