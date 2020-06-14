const Main = (function(){
    const searchBox = document.getElementById('search');
    const searchList = document.getElementById('search-results-list');

    let searchResults = [];
    const SEARCH_TEXT_LIMIT = 2;

    function renderSearchResults() {
        //if data is empty warn the user
        if(!searchResults || searchResults.length === 0)
        {
            searchList.innerHTML = '<li class="no-results">No results found!<li>';
            return ;
        }

        const favSuperHeroes = Common.getFavouriteSuperHeroes();

        searchList.innerHTML = '';

        // Append each search result in the list
        searchResults.forEach((element) => {
            const li = document.createElement('li');

            //Find if superhero exists in favourites
            const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
                (hero) => hero.id === element.id
            );

            li.classList.add('search-result');
            li.innerHTML = `
            
                <div class="search-left">
                    <img src=${element.image.url} alt="">
                </div>
                <div class="search-right">
                    <a href="superhero.html?id=${element.id}">
                    <div class="name">${element.name}</div>
                    </a>
                    <div class="full-name">
                    ${element.biography['full-name']}
                    </div>
                    <div class="address">
                    ${element.biography['place-of-birth']}
                    </div>
                    <button class="btn add-to-fav"
                    data-id=${element.id}
                    style="display: ${indexOfSuperHeroInFavourites === -1? 'block': 'none'}"
                    >Add to favourites</button>
                    <button class="btn remove-from-fav"
                    data-id=${element.id}
                    style="display: ${indexOfSuperHeroInFavourites === -1? 'none': 'block'}"
                    >Remove from favourites</button>
                </div>            
            `;

            searchList.appendChild(li);
        });
    }

    // remove all search results from the UI
    function emptySearchResults() {
        searchList.innerHTML = '';
        searchResults = [];
    }

    // handle search key down event and make and API all
    async function handleSearch(e){
        const searchTerm = e.target.value;
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.value);

        const url = Common.apiUrl;

        if(searchTerm.length <= SEARCH_TEXT_LIMIT){
            emptySearchResults();
            return;
        }

        // show loader and remove existing search results
        Common.showLoader();
        emptySearchResults();

        try{
            const data = await Common.apiRequest(`${url}/search/${searchTerm}`);
            Common.hideLoader();

            if(data.success){
                searchResults = data.data.results;
                renderSearchResults();
            }
        } catch (error){
            console.log('error', error);
            Common.hideLoader();
        }
    }

    // handle user clicks (anywhere in the document)
    function handleDocumentClick(e){
        const target = e.target;

        if(target.classList.contains('add-to-fav')){
            // find the hero data and store it in favourites and localStorage
            const searchResultClickedId = target.dataset.id;
            // console.log(searchResultClickedId);
            const hero = searchResults.filter(
                (hero) => hero.id === searchResultClickedId
            );
            // console.log(hero);

            Common.addHeroToFavourites(hero[0]);
            renderSearchResults();
        } else if (target.classList.contains('remove-from-fav')){
            // find the hero data and remove from localStorage
            const searchResultClickedId = target.dataset.id;

            // show add to fav button and hide the remove from fav button
            const addToFavBtn = document.querySelector(`button[data-id="${searchResultClickedId}"].add-to-fav`);

            if(addToFavBtn)
            addToFavBtn.style.display = 'block';

            const removeFromFavBtn = document.querySelector(`button[data-id="${searchResultClickedId}"].remove-from-fav`);

            if(removeFromFavBtn)
            removeFromFavBtn.style.display = 'none';

            Common.removeHeroFromFavourites(searchResultClickedId);
        }
    }

    function init(){
        searchBox.addEventListener('keyup', Common.debounce(handleSearch, 500));

        document.addEventListener('click', handleDocumentClick);
    }

    return {
        init
    };

})();



// ***************************************

// const Main = (function () {
//     const searchBox = document.getElementById('search');
//     const searchList = document.getElementById('search-results-list');
//     let searchResults = [];
//     const SEARCH_TEXT_LIMIT = 2;
  
//     function renderSearchResults() {
//       // If data is empty warn the user
//       if (!searchResults || searchResults.length === 0) {
//         searchList.innerHTML = '<li class="no-results">No results found!</li>';
//         return;
//       }
  
//       const favSuperHeroes = Common.getFavouriteSuperHeroes();
//       searchList.innerHTML = '';
  
//       // Append each search result in the list
//       searchResults.forEach((element) => {
//         const li = document.createElement('li');
//         // Find if superhero exists in favourites
//         const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
//           (hero) => hero.id === element.id
//         );
//         li.classList.add('search-result');
//         li.innerHTML = `
//                       <div class="search-left">
//                         <img src=${element.image.url} alt="" />
//                       </div>
//                       <div class="search-right">
//                         <a href="superhero.html?id=${element.id}">
//                           <div class="name">${element.name}</div>
//                         </a>
//                         <div class="full-name">${
//                           element.biography['full-name']
//                         }</div>
  
//                         <div class="address">${
//                           element.biography['place-of-birth']
//                         }</div>
//                         <button class="btn add-to-fav" data-id=${
//                           element.id
//                         } style="display: ${
//           indexOfSuperHeroInFavourites === -1 ? 'block' : 'none'
//         }">Add to favourites</button>
//                         <button class="btn remove-from-fav" data-id=${
//                           element.id
//                         }  style="display: ${
//           indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'
//         }">Remove from favourites</button>
//                       </div>
//                     `;
//         searchList.appendChild(li);
//       });
//     }
  
//     /* Remove all search results from the UI */
//     function emptySearchResults() {
//       searchList.innerHTML = '';
//       searchResults = [];
//     }
  
//     /* Handle search key down event and make an API all */
//     async function handleSearch(e) {
//       const searhTerm = e.target.value;
//       // console.log(e);
//       // console.log(e.target);
//       // console.log(e.target.value);
//       const url = Common.apiUrl;
  
//       if (searhTerm.length <= SEARCH_TEXT_LIMIT) {
//         emptySearchResults();
//         return;
//       }
  
//       // Show loader and remove existing search results
//       Common.showLoader();
//       emptySearchResults();
  
//       try {
//         const data = await Common.apiRequest(`${url}/search/${searhTerm}`);
//         // console.log(data);
//         Common.hideLoader();
  
//         if (data.success) {
//           searchResults = data.data.results;
//           renderSearchResults();
//         }
//       } catch (error) {
//         console.log('error', error);
//         Common.hideLoader();
//       }
//     }
  
//     /* Handle user clicks (anywhere in the document) */
//     function handleDocumentClick(e) {
//       const target = e.target;
//       console.log(e);
//       // console.log(target);
//       if (target.classList.contains('add-to-fav')) {
//         // Find the hero data and store it in favourites and localstorage
//         const searchResultClickedId = target.dataset.id;
//         // console.log(searchResultClickedId);
//         // console.log(target.dataset);
//         const hero = searchResults.filter(
//           (hero) => hero.id === searchResultClickedId
//         );
//         // console.log(hero);
//         Common.addHeroToFavourites(hero[0]);
//         renderSearchResults();
//       } else if (target.classList.contains('remove-from-fav')) {
//         // Find the hero data and remove from local storage
//         const searchResultClickedId = target.dataset.id;
  
//         // Show add to fav button and hide the remove from fav button
//         const addToFavBtn = document.querySelector(
//           `button[data-id="${searchResultClickedId}"].add-to-fav`
//         );
//         if (addToFavBtn) addToFavBtn.style.display = 'block';
  
//         const removeFromFavBtn = document.querySelector(
//           `button[data-id="${searchResultClickedId}"].remove-from-fav`
//         );
//         if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';
  
//         Common.removeHeroFromFavourites(searchResultClickedId);
//       }
//     }
  
//     function init() {
//       // DONT USE THIS, IT IS DIFF FROM THE BELOW FOEM
//       // searchBox.addEventListener('keyup', (e) => {
//       //   const debouncedFunction = Common.debounce(handleSearch, 500);
//       //   debouncedFunction(e);
//       // });
  
//       searchBox.addEventListener('keyup', Common.debounce(handleSearch, 500));
//       // searchBox.addEventListener('keyup', handleSearch);
//       document.addEventListener('click', handleDocumentClick);
//     }
  
//     return {
//       init,
//     };
//   })();
  