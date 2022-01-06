const urlParams = window.location.href.toString().split("=");
// const shoeID = urlParams.get('shoeId');
console.log(urlParams[1]);

let allItems =[];
//**IMPORTANT:Without a live server running this wont work as AJAX doesnt allow local http requests */

fetch("shoes.json")
.then(response => {
  return response.json();
})
.then(data => {
  data.shoes.forEach(element => {
    allItems.push(element);
  });
});

$(window).bind("load", function() {
  let currentShoedObj = allItems.filter( currShoe => {
    if(currShoe.id == urlParams[1]){
      return currShoe;
    }
  })
  
  $(".breadcrumb-item[aria-current='page']").html(`${currentShoedObj[0].name}`);

  for (let i = 0; i < 5; i++) {
    $(`img[alt='${i+1}']`).attr("src", `img/${currentShoedObj[0].id}/${i+1}.jpg`);
  } 

  $("h5.shoeName").html(`${currentShoedObj[0].name}`);
  $("li.shoePrice").html(`Price : $ ${currentShoedObj[0].price}`);
  $("li.shoeStyle").html(`Style : ${currentShoedObj[0].style}`);
  $("li.shoeGender").html(`For : ${currentShoedObj[0].gender}`);
  $("li.shoeColor").html(`Colour : ${currentShoedObj[0].colour}`);
  $("p.shoeDescription").html(`${currentShoedObj[0].description}`);
  $(".draggable").attr("id", `${currentShoedObj[0].id}`);
  $( ".placeholder" ).removeClass( "placeholder" )

  currentShoedObj[0].sizes.forEach(thiSize => {
    $(`div.sizesSection`).append(`
    <button type="button" class="btn btn-outline-dark py-3" data-mdb-ripple-color="dark">
      ${thiSize}
    </button>
  `)
  });
});

$( function() {
  $( "#tabs" ).tabs();

  $('.droppable').droppable( {
    drop: handleDropEvent
  } );

  $(".draggable" ).draggable({
		revert: true,
    zIndex: 1021,
	}).click(function () {
		addtoFavorites($(this).attr("id"));
	});
} );

function handleDropEvent(event, ui){
  var draggable = ui.draggable;
  // alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
	addtoFavorites(draggable.attr('id'));
}

// List of the favorites
let favList;

// Function that runs after the window loaded completely
$(window).bind("load", function() {
  // conditional statement that checks if localStorage already exists
  if (localStorage.getItem('favShoes')) {
    favList = JSON.parse(localStorage.getItem('favShoes'));
  } else {
    favList = [];
  }

  refreshFavorites();
  $("span.badge").html(`${favList.length}`);

});

//Adding to favorites
function addtoFavorites(shoeID){
  try {
    const addingShoe = shoeID;
    //Check whether its already in the list
    if(favList.includes(addingShoe)){
      console.log(`${addingShoe} is already in your favourites`);
    }
    // successfully adding a favorite
    else{
      favList.push(addingShoe);
      $("span.badge").html(`${favList.length}`);

      const newCard = allItems.filter(currentObj =>{
        if(currentObj.id === addingShoe){
          return currentObj;
        }
      });
      
      refreshFavorites();
      localStorage.setItem("favShoes", JSON.stringify(favList));
    }
  } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) {
          console.log("Error: Local Storage limit exceeded");
      } else {
          console.log("Error: Saving to local storage");
      }
  }
}

function refreshFavorites(){
  $("div.favoriteCards").html(``);

  allItems.forEach(shoeObj => {
    if(favList.includes(shoeObj.id)){
      generateFavoriteCard(shoeObj);
    }
  });
}

// ------------------ Favorites Related functions ------------------
function generateFavoriteCard(element){
  $("div.favoriteCards").append(`
  <div
    class="bg-image card shadow-1-strong ms-4 mb-4"
    style="background-image: url('${element.picture}'); height: 200px; width: 200px;"
    >
    <a href="${element.url}" class="text-light">
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
        <div class="card-body">
          <h6 class="card-title">${element.name}</h6>
          <p class="card-text p-0 m-0 lh-0">Colour : ${element.colour}</p>
          <p class="card-text p-0 m-0 lh-0">Style : ${element.style}</p>
          <p class="card-text itemPrice fw-bold">Price : $${element.price}</p>
          <a class="btn btn-danger mt-2 removeFav" id="${element.id}">Remove <i class="fas fa-trash"></i></a>
        </div>
      </div>  
    </a>
  </div>
` );

  $("a.removeFav").click(function () {
    const thisShoe = ($(this).attr("id"));
    
    const indexOfItem = favList.indexOf(thisShoe);
    if (indexOfItem > -1) {
      favList.splice(indexOfItem, 1);
      $("span.badge").html(`${favList.length}`);

      $(this).closest(".card").remove();
      localStorage.setItem("favShoes", JSON.stringify(favList));
    }
  });
};

$(".sliderImage").click(function() {
  const imgIndex = $(this).attr("src");
  $("#expanded-img").attr("src", imgIndex);
});