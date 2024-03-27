// JavaScript
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search");
    const resultsContainer = document.getElementById("results");
    const similarResultsContainer = document.getElementById("results2");
    const favouritesResultsContainer = document.getElementById("results3");

    
    searchForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission behavior
      
      const searchQuery = searchInput.value.trim();
      if (searchQuery !== "") {
        fetchData(searchQuery)
          .then(data => {
            console.log(data.photos); // Log the fetched data to the console
            // You can further process the data or display it as needed
            displayResults(data.photos);
            function displayResults(photos) {
                resultsContainer.innerHTML = ''; // Clear previous results
                
                if (photos.length > 0) {
                    const firstPhoto = photos[0];
                    const img = document.createElement('img');
                    // img.classList.add('result-img')
                    img.src = firstPhoto.src.medium;
                    img.alt = firstPhoto.alt_description;
                    resultsContainer.appendChild(img);

                    // Create elements for alt text, photographer name, and photographer URL
                    const imgInfo = document.createElement('div')
                    const text = document.createElement('div')
                    imgInfo.classList.add('img-info')
                    const altText = document.createElement('p');
                    altText.textContent = `${firstPhoto.alt}`;

                    const photographerName = document.createElement('p');
                    photographerName.textContent = `${firstPhoto.photographer}`;



                    // Create "Explore More" button
                    const exploreButton = document.createElement('button');
                    exploreButton.textContent = 'Explore More';
                    exploreButton.classList.add('explore-btn')
                    exploreButton.addEventListener('click', function() {
                        window.open(`https://www.pexels.com/@${firstPhoto.photographer_url}`, '_blank');
                    });

                    // Append elements to results container
                    text.appendChild(altText);
                    text.appendChild(photographerName);
                    text.appendChild(exploreButton);
                    imgInfo.appendChild(img)
                    imgInfo.appendChild(text)
                    resultsContainer.appendChild(imgInfo)

                  } 
                  if (photos.length > 1) {
                    displayCarousel(photos.slice(1));
                    // displayCarousel(photos.slice(1));
                  } 
        
                  else {
                    resultsContainer.innerHTML = '<p>No results found</p>';
                  }
                  function displayCarousel(photos) {
                    const similarsection = document.createElement('h3');
                    similarsection.textContent = 'Similar results';
                    similarResultsContainer.appendChild(similarsection);
                    const carouselContainer = document.createElement('div');

                    carouselContainer.classList.add('carousel-container');
                    
                    photos.forEach(photo => {
                        const itemContainer = document.createElement('div');
                        itemContainer.classList.add('carousel-item');
                      const img = document.createElement('img');
                      img.src = photo.src.medium;
                      img.alt = photo.alt_description;

                    const altText = document.createElement('p');
                    altText.textContent = `${photo.alt}`;
                    altText.classList.add('alt-text')

                    const photographerName = document.createElement('p');
                    photographerName.textContent = `${photo.photographer}`;


                    itemContainer.appendChild(img);
                    itemContainer.appendChild(altText);
                    itemContainer.appendChild(photographerName);
                      carouselContainer.appendChild(itemContainer);
                    });


                    

                    similarResultsContainer.appendChild(carouselContainer);
                    favouritesResultsContainer.appendChild(carouselContainer)

            
                  }
                  
              }
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
    });
  
    async function fetchData(searchQuery) {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`, {
        headers: {
          Authorization:  'kyPF1NsYrDyjA9ndRgNhJpj1TA6nc7Qxqquhk4uM7BMzgH0OXzNzVvzg' 
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Return the fetched data
    }

   





    // Add event listener to the results container
similarResultsContainer.addEventListener('click', function(event) {
    const clickedImage = event.target;
    if (clickedImage.tagName === 'IMG') {
        // Store the clicked image source in local storage
        localStorage.setItem('clickedImageSrc', clickedImage.src);
    }
});

// Retrieve the clicked image source from local storage
const storedImageSrc = localStorage.getItem('clickedImageSrc');
if (storedImageSrc) {
    // Use the stored image source as needed
    console.log('Stored image source:', storedImageSrc);
}


