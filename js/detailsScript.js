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

function handleDropEvent(){

}