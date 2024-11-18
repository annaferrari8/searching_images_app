//declaring important variables
const searchForm= document.getElementById ("search-form");
const searchBox= document.getElementById ("search-box");
const searchResult= document.getElementById ("search-result");
const showMoreBtn= document.getElementById ("show-more-btn");
const accessKey= "I9CfCwG4ygXfZ4SR6-uUy7TFSJ8CJqi0ArSMUUXiM88";
console.log (showMoreBtn);

let keyword=""; 
let page=1;

//the function that will fetch data from an external API
async function searchImages(){
    keyword=searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

//clearing the page after the user enters a new keyword
if (page===1) {
    searchResult.innerHTML="";
}   
    
//using map method in order to contain the results from the user's search
    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src=result.urls.small;

//linking the user to unsplash when clicking an image
        const imageLink = document.createElement ("a");
        imageLink.href= result.links.html;
        imageLink.target ="_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);

    })
    showMoreBtn.style.display = "block"; 

} 


// preventing an error when the user submits keywords
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page=1;
    searchImages();
})

//click event on show more button 
showMoreBtn.addEventListener("click", () => {
    page++; 
    searchImages();
})
