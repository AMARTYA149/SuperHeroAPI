const Main = (function(){
    const searchBox = document.getElementById('search');
    const searchList = document.getElementById('search-results-list');

    let searchResult = [];
    const SEARCH_TEXT_LIMIT = 2;

    function renderSearchResults() {
        //if data is empty warn the user
        if(!searchResults || searchResult.length === 0)
        {
            searchList.innerHTML = '<li class="no-results">No results found!<li>';
            return ;
        }

        //CONTINUE HERE
    }
})