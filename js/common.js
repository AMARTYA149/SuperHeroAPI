const Common = (function(){
    const apiToken = '2596730620569006';
    const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
    const toastContainer = document.getElementById('toast');
    const FAVOURITES = 'favourites';
    const loader = document.querySelector('.loader');

    function setRandomBackgroundImage(){
        const urls = [
        'https://i.pinimg.com/originals/2a/8a/8a/2a8a8ae998f1a070a926326495a26884.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTxdsI1Wd0noayMFb4qedPaQOiUSAuKDqHVBsTzeftnzqvzBNF&usqp=CAU',
      'https://ae01.alicdn.com/kf/HTB1D.mZXuEJL1JjSZFGq6y6OXXaD/Cartoon-BOOM-pattern-vinyl-cloth-photography-backdrops-for-children-boy-photo-studio-portrait-backgrounds.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81R69SuY5vL._AC_SX425_.jpg',
      'https://i.pinimg.com/originals/72/18/e2/7218e261e63e04acc903df31ec88999c.jpg',
      'https://i.pinimg.com/564x/3a/53/74/3a53744ecf2eccc83e771ece8dd2b40b.jpg'
    ];

    const randomBackgroundImageUrl = urls[Math.floor(Math.random() * urls.length)];

    console.log('randomBackgroundImageUrl', randomBackgroundImageUrl);
    const html = document.querySelector('html');
    html.style.backgroundImage = `url(${randomBackgroundImageUrl})`;
    }

    function showLoader(){
        loader.style.display = 'block';
    }

    function hideLoader(){
        loader.style.display = 'none';
    }

    function showNotification(type, message){
        if(type === 'error'){
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
        } else if(type === 'success') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.add('toast-success');
        } else if (type === 'removed') {
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
          }

        toastContainer.style.display = 'block';
        toastContainer.innerText = message;

        setTimeout(() => {
            toastContainer.style.display = 'none';
        }, 3000);
    }


    // Send api requests
    async function apiRequest(url){
        try{
            const response = await fetch(url);
            const data = await response.json();

            return {
                data, 
                success: true
            };
        }
        catch (error){
            console.log('error', error);
            return {
                error: error.message,
                success:false
            };
        }
    }

    // Add hero to localStorage
    function addHeroToFavourites(hero){
        if(!hero) return;

        const favouritesFromLocalStorage = getFavouriteSuperHeroes();
        favouritesFromLocalStorage.push(hero);

        //Save in localStorage
        localStorage.setItem(
            FAVOURITES,
            JSON.stringify(favouritesFromLocalStorage)
        );

        showNotification('success', 'Added to favourites');
    }

    // Remove hero from localStorage
    function removeHeroFromFavourites(heroId){
        if(!heroId) return;

        let favouritesFromLocalStorage = getFavouriteSuperHeroes();

        //Remove hero from localStorage
        favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
            (item) => item.id !== heroId
            );

        // Save in localStorage
        localStorage.setItem(
            FAVOURITES, 
            JSON.stringify(favouritesFromLocalStorage)
        );

        showNotification('removed', 'Removed from favourites');
    }

    function getFavouriteSuperHeroes(){
        return localStorage.getItem(FAVOURITES) 
        ? JSON.parse(localStorage.getItem(FAVOURITES)):[];
    }

    function debounce(func, delay) {
        let timeout;

        return function() {
            const context = this;
            const args = arguments;

            clearTimeout(timeout);

            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args);
                //handleSearch(args);
            }, delay);
        };
    }

    setRandomBackgroundImage();

    return {
        apiRequest,
        apiUrl,
        showNotification,
        addHeroToFavourites,
        removeHeroFromFavourites,
        getFavouriteSuperHeroes,
        showLoader,
        hideLoader,
        debounce
    };

})();

// *********************************
// const Common = (function () {
//     const apiToken = '10219177700206566';
//     const apiUrl = `https://www.superheroapi.com/api.php/${apiToken}/`;
//     const toastContainer = document.getElementById('toast');
//     const FAVOURITES = 'favourites';
//     const loader = document.querySelector('.loader');
  
//     function setRandomBackgroundImage() {
//       const urls = [
//         'https://i.pinimg.com/originals/2a/8a/8a/2a8a8ae998f1a070a926326495a26884.png',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTxdsI1Wd0noayMFb4qedPaQOiUSAuKDqHVBsTzeftnzqvzBNF&usqp=CAU',
//         'https://ae01.alicdn.com/kf/HTB1D.mZXuEJL1JjSZFGq6y6OXXaD/Cartoon-BOOM-pattern-vinyl-cloth-photography-backdrops-for-children-boy-photo-studio-portrait-backgrounds.jpg',
//         'https://images-na.ssl-images-amazon.com/images/I/81R69SuY5vL._AC_SX425_.jpg',
//         'https://i.pinimg.com/originals/72/18/e2/7218e261e63e04acc903df31ec88999c.jpg',
//         'https://i.pinimg.com/564x/3a/53/74/3a53744ecf2eccc83e771ece8dd2b40b.jpg',
//       ];
  
//       const randomBackgroundImageUrl =
//         urls[Math.floor(Math.random() * urls.length)];
  
//       console.log('randomBackgroundImageUrl', randomBackgroundImageUrl);
//       const html = document.querySelector('html');
//       html.style.backgroundImage = `url(${randomBackgroundImageUrl})`;
//     }
  
//     function showLoader() {
//       loader.style.display = 'block';
//     }
  
//     function hideLoader() {
//       loader.style.display = 'none';
//     }
  
//     /* Notification handler */
//     function showNotification(type, message) {
//       if (type === 'error') {
//         toastContainer.classList.remove('toast-success');
//         toastContainer.classList.add('toast-error');
//       } else if (type === 'success') {
//         toastContainer.classList.remove('toast-error');
//         toastContainer.classList.add('toast-success');
//       }
//       else if (type === 'removed') {
//         toastContainer.classList.remove('toast-success');
//         toastContainer.classList.add('toast-error');
//       }
//       toastContainer.style.display = 'block';
//       toastContainer.innerText = message;
  
//       setTimeout(() => {
//         toastContainer.style.display = 'none';
//       }, 3000);
//     }
  
//     /* Send api requests */
//     async function apiRequest(url) {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
  
//         return {
//           data,
//           success: true,
//         };
//       } catch (error) {
//         console.log('error', error);
//         return {
//           error: error.message,
//           success: false,
//         };
//       }
//     }
  
//     /* Add hero to localstorage */
//     function addHeroToFavourites(hero) {
//       if (!hero) return;
  
//       const favouritesFromLocalStorage = getFavouriteSuperheroes();
//       favouritesFromLocalStorage.push(hero);
  
//       // Save in localstorage
//       localStorage.setItem(
//         FAVOURITES,
//         JSON.stringify(favouritesFromLocalStorage)
//       );
  
//       showNotification('success', 'Added to favourites');
//     }
  
//     /* Remove hero from localstorage */
//     function removeHeroFromFavourites(heroId) {
//       if (!heroId) return;
  
//       let favouritesFromLocalStorage = getFavouriteSuperheroes();
  
//       // Remove hero from localstorage
//       favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
//         (item) => item.id !== heroId
//       );
  
//       // Save in localstorage
//       localStorage.setItem(
//         FAVOURITES,
//         JSON.stringify(favouritesFromLocalStorage)
//       );
  
//       showNotification('removed', 'Removed from favourites');
//     }
  
//     /* Get fav superheroes from the local storage */
//     function getFavouriteSuperheroes() {
//       return localStorage.getItem(FAVOURITES)
//         ? JSON.parse(localStorage.getItem(FAVOURITES))
//         : [];
//     }
  
//     function debounce(func, delay) {
//       let timeout;
//       return function () {
//         const context = this;
//         const args = arguments;
  
//         clearTimeout(timeout);
  
//         timeout = setTimeout(function () {
//           timeout = null;
//           func.apply(context, args);
//           // handleSearch(args);
//         }, delay);
//       };
//     }
  
//     setRandomBackgroundImage();
  
//     return {
//       apiRequest,
//       apiUrl,
//       showNotification,
//       addHeroToFavourites,
//       removeHeroFromFavourites,
//       getFavouriteSuperheroes,
//       showLoader,
//       hideLoader,
//       debounce,
//     };
//   })();
  