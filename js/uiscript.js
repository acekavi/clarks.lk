// Stores colors
let colorsArr = [];
// Stores Styles 
let stylesArr = [];
//Stores Names 
let namesArr = [];



// $(function (){
//   $(".colorBtn").on("click", function () {
//     // $(this).remove();
//     // $(this).attr("id");
//     alert("pressed");
//   });
// });

$('.droppable').droppable( {
  drop: handleDropEvent
} );

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
}

$( "#autocomplete" ).autocomplete({
	source: namesArr
});

$( "#radioset" ).buttonset();

$( "#controlgroup" ).controlgroup();

$( "#dialog" ).dialog({
	autoOpen: false,
	width: 400,
	buttons: [
		{
			text: "Ok",
			click: function() {
				$( this ).dialog( "close" );
			}
		},
		{
			text: "Cancel",
			click: function() {
				$( this ).dialog( "close" );
			}
		}
	]
});

// Link to open the dialog
$( "#dialog-link" ).click(function( event ) {
	$( "#dialog" ).dialog( "open" );
	event.preventDefault();
});

$( function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 0, 250 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );

$( "#progressbar" ).progressbar({
	value: 20
});

$( "#spinner" ).spinner();

$( ".selectmenu" ).selectmenu();


// Hover states on the static widgets
$( "#dialog-link, #icons li" ).hover(
	function() {
		$( this ).addClass( "ui-state-hover" );
	},
	function() {
		$( this ).removeClass( "ui-state-hover" );
	}
);

fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.forEach((element, index, arr) => {
    if (!namesArr.includes(element.name)) {
			// only runs if value not in array
			namesArr.push(element.name);
		}

		if (!stylesArr.includes(element.style.toLowerCase())) {
			// only runs if value not in array
			stylesArr.push(element.style.toLowerCase());
			$("#styleMenu").append(`<option>${element.style}</option>`);
		}

		element.colour.forEach((color)=>{
			if (!colorsArr.includes(color.toLowerCase())) {
				// only runs if value not in array
				colorsArr.push(color.toLowerCase());
				$("#colorMenu").append(`<option>${color}</option>`);
			}
		});
  });
});
