const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
const count = 10;
const apiKey = "9-Zc0fWteyduNOtqOnfZhHbZjZx8VTOEeQXPk3Z4KaI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;
    }
}

const setAttributes = (element, attribute) => 
{
    for(const key in attribute)
    {
        element.setAttribute(key, attribute[key]);
    }
}

const displayPhotos = () =>  
{
    imagesLoaded = 0;
    totalImages = photosArray.length;
   photosArray.forEach((photo) => {
       const item = document.createElement('a');
       setAttributes(item, {
           href: photo.links.html,
           target: '_blank'
       });

       const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

       item.appendChild(img);
       imageContainer.appendChild(item);
   }); 
};

const getPhotos = async () => 
{
    try
    {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error)
    {
    }
};

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
});


getPhotos();
