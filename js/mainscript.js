const loadedObjnames = [];
let objectArr = [];

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
        (generateCard(element, ".section-hotPicks"));
      }

      if(element.gender === "Men"){
        (generateCard(element, ".section-men"));
      }

      else if(element.gender === "Women"){
        (generateCard(element, ".section-women"));
      }

      else{
        (generateCard(element, ".section-kids"));
      }

    }
    $( ".drag" ).draggable({
      revert: true,
      helper: () => {
        return `<button type="button" class="btn btn-danger btn-floating dragged">
                <i class="fas fa-heart"></i>
              </button>`;
      }
    });
  });
});

function generateCard(element, genSection){
  $(genSection).append(
    `<div class="card p-0 m-2" id="${element.id}">
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src="${element.picture}" class="card-img" />
        <a href="${element.url}">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
        </a>
      </div>
      <div class="card-header d-flex justify-content-around">
        <h5 class="card-title my-auto">${element.name}</h5>
        <div class="drag" id="${element.id}">
          <a class="btn btn-danger btn-floating" title="Add to favorites">
            <i class="fas fa-heart"></i>
          </a>
        </div>
      </div>
      <div class="card-body">
        <div class="colourList"></div>
        <p class="card-text p-0 m-0 lh-0">For : ${element.gender}</p>
        <p class="card-text p-0 m-0 lh-0">Style : ${element.style}</p>
        <p class="card-text itemPrice fw-bold">Price : $${element.price}</p>
      </div>
    </div>`
  );

  if(genSection != ".section-hotPicks"){
    element.colourCodes.forEach((color, colorIndex)=>{
      if (colorIndex==0){
        $(`#${element.id} .colourList`).append(`
        <button class="colorBtn btn btn-sm btn-floating" 
          id="${element.id}" style="background-color:${color};" 
          onclick="changeColor('${element.id}')" 
          data-mdb-toggle="tooltip"
          title="${element.colour[colorIndex]}">
        </button>`);
      }else{
        // $(`#${element.id} .colourList`).append(`<button class="colorBtn btn btn-sm btn-floating ms-2" id="${element.id}-${colorIndex}" style="background-color:${color};" onclick="changeColor('${element.id}-${colorIndex}')"></button>`);
        $(`#${element.id} .colourList`).append(`
        <button class="colorBtn btn btn-sm btn-floating" 
          id="${element.id}-${colorIndex}" style="background-color:${color};" 
          onclick="changeColor('${element.id}-${colorIndex}')" 
          data-mdb-toggle="tooltip"
          title="${element.colour[colorIndex]}">
        </button>`);
      }
    });
  }
};

function changeColor(elementID){
  let thisCard = $(`button[id=${elementID}]`).closest(".card");
  let newCard = objectArr.filter(elem => elem.id == elementID);
  console.log(newCard[0].picture);
  $(thisCard).children(".bg-image").children("img").attr("src", newCard[0].picture);
  $(thisCard).children(".bg-image").children("a").attr("href", newCard[0].url);
  $(thisCard).children(".card-body").children(".itemPrice").html(`Price : $${newCard[0].price}`);
  $(thisCard).children(".card-header").children(".drag").attr("id", newCard[0].id);
}
// $(function (){
  
// })

// $(document).ready(function() {
//   console.log( "doc ready");
// });

// $( window ).on( "load", function() {
//   console.log( "window loaded");
// });

// +'<p class="color-dot" style="background-color:'+element.colourCodes[0]+';"></p>'
// +'<p class="color-dot" style="background-color:'+element.colourCodes[1]+';"></p>'