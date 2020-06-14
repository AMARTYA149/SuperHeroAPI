const SuperHero = (function(){
    const superHeroDetailContainer = document.querySelector('.super-hero-detail');

    // get query parameters from the url
    function getQueryParameter(param){
        const urlParams = new URLSearchParams(window.location.search);

        return urlParams.get(param);
    }

    function renderSuperHeroDetails(data){
        console.log("hello")
        Common.hideLoader();
        if(!data)
        {
            superHeroDetailContainer.innerHTML = "Can not load the superhero, please try again!";
            return;
        }
        superHeroDetailContainer.innerHTML = `
        <img src=${data.image.url} alt="" />
        <h1>${data.name}</h1>
        <h3>${data.biography['full-name']}</h3>

        <div class="power-stats">
          <div><span> Intelligence </span> <span> ${data.powerstats.intelligence}</span></div>
          <div><span> Strength </span> <span> ${data.powerstats.strength}</span></div>
          <div><span> Speed </span> <span> ${data.powerstats.speed}</span></div>
          <div><span> Durability </span> <span> ${data.powerstats.durability}</span></div>
          <div><span> Power </span> <span>${data.powerstats.power}</span></div>
          <div><span> Combat </span> <span>${data.powerstats.combat}</span></div>
        </div>
        `;
    }

    // fetch data of a superhero with character id as 'id'
    async function fetchSuperHeroData(id){
        const url = Common.apiUrl;

        try{
            const data = await Common.apiRequest(`${url}/${id}`);
            
            if(data.success){
                renderSuperHeroDetails(data.data);
            } else {
                renderSuperHeroDetails(null);
            }
        } catch (error) {
            console.log('error', error);
            renderSuperHeroDetails(null);
        }
    }

    // Initialise the module
    function init(){
        const heroId = getQueryParameter('id');
        Common.showLoader();
        fetchSuperHeroData(heroId);
    }

    return {
        init
    };
})();