fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.forEach((element, index, arr) => {
    if(index >= arr.length - 4){
      $(".section-hotPicks").append(generateCard(element));
    }

    if(element.gender === "Men"){
      $(".section-men").append(generateCard(element));
    }

    else if(element.gender === "Women"){
      $(".section-women").append(generateCard(element))
    }

    else{
      $(".section-kids").append(generateCard(element))
    }
    $( ".drag" ).draggable({
      revert: true,
      helper: () => {
        return '<button type="button" class="btn btn-danger btn-floating dragged">'
                +'<i class="fas fa-heart"></i>'
              +'</button>';
      }
    });
  });
});

function generateCard(element){
  return '<div class="card p-0 m-2" id="'+element.id+'">'
          +'<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">'
            +'<img src="/img/'+element.id+'/1.jpg" class="card-img" />'
            +'<a href="#!">'
              +'<div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>'
            +'</a>'
          +'</div>'
          +'<div class="card-header d-flex justify-content-around">'
          +'<h5 class="card-title my-auto">'+element.name+'</h5>'
              +'<div class="drag" id="'+element.id+'">'
              +'<a class="btn btn-danger btn-floating">'
                +'<i class="fas fa-heart"></i>'
              +'</a></div>'
            +'</div>'
          +'<div class="card-body">'
            +'<div class="colourList">'
              +'<p class="color-dot" style="background-color:'+element.colourCodes[0]+';"></p>'
              +'<p class="color-dot" style="background-color:'+element.colourCodes[1]+';"></p>'
            +'</div>'
            +'<p class="card-text p-0 m-0 lh-0">For : '+element.gender+'</p>'
            +'<p class="card-text p-0 m-0 lh-0">Style : '+element.style+'</p>'
            +'<p class="card-text">Price : $'+element.price+'</p>'
        +'</div>';
}