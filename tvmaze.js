"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm( term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  // let searchFormTerm = $('#searchForm-term').val();
  let responseOfShowsList = await axios.get("http://api.tvmaze.com/search/shows", {params: {q: term}});
  
  console.log("responseOfShowsList:", responseOfShowsList.data);

  let showsList = [];
  for(let tvShow of responseOfShowsList.data){
    let showId = tvShow.show.id;
    let showName = tvShow.show.name;
    let showSummary = tvShow.show.summary;
    let image = tvShow.show.image;
    let showImageURL;
    if(!image) {
      showImageURL = 'https://tinyurl.com/tv-missing';
    } else {
      showImageURL = image.original;
    }
  
    showsList.push({
      id: showId,
      name: showName,
      summary:showSummary,
      image: showImageURL
    });
  }
  return showsList;
}


/** Given list of shows, create markup of image, show name and show summary for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src= '${show.image}'
              alt="${show.name}" 
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { 
  // let responseOfEpisodes = await axios.get('http://api.tvmaze.com/shows/[showid]/episodes', {params: {q: showid}});
// }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
