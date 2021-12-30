// Stores colors
let colorsArr = [];
// Stores Styles 
let stylesArr = [];
//Stores Names 
let namesArr = [];

$( function() {
	
});

$('.droppable').droppable( {
  drop: handleDropEvent
} );

function handleDropEvent( event, ui ) {
  var draggable = ui.draggable;
  // alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
	addtoFavorites(draggable.attr('id'));
}

$( "#autocomplete" ).autocomplete({
	source: namesArr
});

$( "input:checkbox" ).checkboxradio({
	icon: false
});

$( "#controlgroup" ).controlgroup();

$( function() {
	$( "#dialog" ).dialog({
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 500
		},
		hide: {
			effect: "fade",
			duration: 500
		}
	});
} );

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
		values: [ 0, 300 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
});

$( "#progressbar" ).progressbar({
	value: 20
});

$( "#spinner" ).spinner({
	spin: function( event, ui ) {
		if ( ui.value > 15 ) {
			$( this ).spinner( "value", 3 );
			return false;
		} else if ( ui.value < 3 ) {
			$( this ).spinner( "value", 15 );
			return false;
		}
	}
});

$( ".selectmenu" ).selectmenu();

// Adding the options to ui menus and etc...
fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.forEach((element, index, arr) => {

		//Excluding duplicates
    if (!namesArr.includes(element.name)) {
			// only runs if value not in array
			namesArr.push(element.name);
		}

		if (!stylesArr.includes(element.style.toLowerCase())) {
			// only runs if value not in array
			stylesArr.push(element.style.toLowerCase());
			$("#styleMenu").append(`<option>${element.style}</option>`);
		}

		if (!colorsArr.includes(element.colour.toLowerCase())) {
			// only runs if value not in array
			colorsArr.push(element.colour.toLowerCase());
			$("#colorMenu").append(`<option>${element.colour}</option>`);
		}
  });
});
