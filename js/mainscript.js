const loadedObjnames = [];
let objectArr = [];

//Retrieving the data from the json file and using it to build the search functionality

//**IMPORTANT:Without a live server running this wont work as AJAX doesnt allow local http requests */
$(function () {
  fetch("shoes.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.shoes.forEach((element, index, arr) => {
      objectArr.push(element);

      if (!loadedObjnames.includes(element.name)) {
        // only runs if value not in array
        loadedObjnames.push(element.name);

        if(index >= arr.length - 5){
          (generateCard(element, "section-hotPicks"));
        }

        if(element.gender === "Men"){
          (generateCard(element, "section-men"));
        }

        else if(element.gender === "Women"){
          (generateCard(element, "section-women"));
        }

        else{
          (generateCard(element, "section-kids"));
        }
      }
    });
  });
});

function generateCard(element, genSection){

  //Generates the item card into HTML DOM
  $(`.${genSection}`).append(
    `<div class="card p-0 m-2" id="${element.id}">
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src="${element.picture}" class="card-img" />
        <a href="${element.url}">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
        </a>
      </div>
      <div class="card-header d-flex justify-content-around">
        <h5 class="card-title my-auto">${element.name}</h5>
        <div class="draggable" id="${element.id}">
          <span class="btn btn-danger btn-floating" title="Add to favorites">
            <i class="fas fa-heart"></i>
          </span>
        </div>
      </div>
      <div class="card-body">
        <div class="colourList ${genSection}-${element.id}"></div>
        <p class="card-text p-0 m-0 lh-0">For : ${element.gender}</p>
        <p class="card-text p-0 m-0 lh-0">Style : ${element.style}</p>
        <p class="card-text itemPrice fw-bold">Price : $${element.price}</p>
      </div>
    </div>`
  );

  // Create the color dot buttons
  element.colourCodes.forEach((color, colorIndex)=>{
    //exclude hotpicks section and search results section
    if((`${genSection}-${element.id}`) != `section-hotPicks-${element.id}` && (`${genSection}-${element.id}`) != `searchResults-${element.id}`){
      if (colorIndex==0){
        $(`.${genSection}-${element.id}`).append(`
        <button class="colorBtn btn btn-sm btn-floating" 
          id="${element.id}" style="background-color:${color};" 
          onclick="changeColor('${element.id}')">
        </button>`);
      }else{
        // passes the index of the second color to the colorChange function
        $(`.${genSection}-${element.id}`).append(`
        <button class="colorBtn btn btn-sm btn-floating" 
          id="${element.id}-${colorIndex}" style="background-color:${color};"
          onclick="changeColor('${element.id}-${colorIndex}')">
        </button>`);
      }
    }});

  // Create the add to favorites draggable
	$( `.draggable[id='${element.id}']` ).draggable({
		revert: true,
    zIndex: 1021,
	}).click(function () {
		addtoFavorites($(this).attr("id"));
	});
};

function changeColor(elementID){
  let thisCard = $(`button#${elementID}`).closest(".card");
  let newCard = objectArr.filter(elem => elem.id == elementID);
  $(thisCard).children(".bg-image").children("img").attr("src", newCard[0].picture);
  $(thisCard).children(".bg-image").children("a").attr("href", newCard[0].url);
  $(thisCard).children(".card-body").children(".itemPrice").html(`Price : $${newCard[0].price}`);
  $(thisCard).children(".card-header").children(".draggable").attr("id", newCard[0].id);
}
  
// Filter results
$(function (){
  $("#searchBtn").click(function() {
    $(".searchResults").html("");
    let searchQuery = $( ".searchQuery" ).val();
    let checkboxValue = [];
    $("input:checkbox[name='gender']:checked").each(function(){    
      checkboxValue.push($(this).val().toLowerCase());    		
    });
        
    let colorValue = $("#colorMenu").val();
    let styleValue = $("#styleMenu").val();
    let sizevalue = $("#spinner").val();
    let minPrice = $("#slider-range").slider("option", "values")[0];
    let maxPrice = $("#slider-range").slider("option", "values")[1];

    let filterArr =[];

  // filter by search query 
    filterArr = objectArr.filter(currentObj =>{
      if(currentObj.name.toLowerCase().search(searchQuery.toLowerCase()) > -1){
        return currentObj;
      }
    });

  // filter by gender
    filterArr = filterArr.filter(currentObj =>{
      genderValue = currentObj.gender.split(" ")[0];
      if(checkboxValue.includes(genderValue.toLowerCase())){
        return currentObj;
      }
    });

  // filter by color
    filterArr = filterArr.filter(currentObj =>{
      if(colorValue != null && currentObj.colour.toLowerCase() == colorValue.toLowerCase()){
        return currentObj;
      }
      else if(colorValue == null){
        return currentObj;
      }
    });

  // filter by style
    filterArr = filterArr.filter(currentObj =>{
      if(styleValue != null && currentObj.style.toLowerCase() == styleValue.toLowerCase()){
        return currentObj;
      }
      else if(styleValue == null){
        return currentObj;
      }
    });

  // filter by size
    filterArr = filterArr.filter(currentObj =>{
      if(sizevalue.length != 0 && currentObj.sizes.includes(parseInt(sizevalue))){
        return currentObj;
      }
      else if(!sizevalue){
        return currentObj;
      }
    });

  // filter by price
    filterArr = filterArr.filter(currentObj =>{
      if(minPrice < currentObj.price && maxPrice > currentObj.price){
        return currentObj;
      }
    });
  
    if(!filterArr.length){
      $("#dialog").dialog( "open" );
      // $("#resetFilters").click();
    }else{
      //Disable navbar links
      $(".nav-link:not(.active)").addClass( "disabled" );
      //append items to HTML DOM
      $(".loadingItems").hide("slow");
      $(".searchItems").show();
      filterArr.forEach(element => {
        generateCard(element, "searchResults");
      });
    }
  });

  $("#resetFilters").click(function() {
    $(".searchItems").hide("slow");
    $(".loadingItems").show("slow");

    $( ".searchQuery" ).val("");

    $("#spinner").val("");

    $("#colorMenu").val(""); // your default option's value
    $("#colorMenu").selectmenu("refresh");

    $("#styleMenu").val(""); // your default option's value
    $("#styleMenu").selectmenu("refresh");

    $("#slider-range").slider("values", 0, 0);
    $("#slider-range").slider("values", 1, 300);
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
    
    $(".nav-link:not(.active)").removeClass( "disabled" );
  });  
});

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

      const newCard = objectArr.filter(currentObj =>{
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

  objectArr.forEach(shoeObj => {
    if(favList.includes(shoeObj.id)){
      generateFavoriteCard(shoeObj);
    }
  });
}