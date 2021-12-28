fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.slice(-4).forEach(element => {
    $(".hot-picks").append(
    '<div class="card p-0 m-2">'
        +'<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">'
          +'<img src="/img/'+element.id+'/1.jpg" class="card-img" />'
          +'<a href="#!">'
            +'<div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>'
          +'</a>'
        +'</div>'
        +'<div class="card-header d-flex justify-content-around">'
        +'<h5 class="my-auto">Hot Picks 🔥</h5>'
          +'<div class="drag">'
          +'<a class="btn btn-danger btn-floating">'
            +'<i class="fas fa-heart"></i>'
          +'</a></div>'
        +'</div>'
        +'<div class="card-body">'
          +'<h5 class="card-title">'+element.name+'</h5>'
          +'<p class="card-text m-0 p-0">For '+element.gender+'</p>'
          +'<p class="card-text m-0 p-0">Colour : '+element.colour+'</p>'
          +'<p class="card-text">Price : $'+element.price+'</p>'
        +'</div>'
      +'</div>'
  )
  });
  $( ".drag" ).draggable({
    revert: true,
    helper: () => {
      return '<button type="button" class="btn btn-danger btn-floating dragged">'
              +'<i class="fas fa-heart" data-mdb-toggle="tooltip" data-mdb-placement="bottom" title="Add to favorites"></i>'
            +'</button>';
    }
  });
});

fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.forEach(element => {
    if(element.gender === "Men"){
      $(".section-men").append(
        '<div class="card p-0 m-2 '+element.id+'">'
          +'<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">'
            +'<img src="/img/'+element.id+'/1.jpg" class="card-img" />'
            +'<a href="#!">'
              +'<div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>'
            +'</a>'
          +'</div>'
          +'<div class="card-body">'
            +'<h5 class="card-title">'+element.name+'</h5>'
            +'<div class="colourList lh-sm"></div>'
            +'<p class="card-text">Price : $'+element.price+'</p>'
            +'<button type="button" class="btn btn-danger btn-floating">'
              +'<i class="fas fa-heart" data-mdb-toggle="tooltip" data-mdb-placement="bottom" title="Add to favorites"></i>'
            +'</button>'
          +'</div>'
        +'</div>'
      )
    }

    else if(element.gender === "Women"){
      $(".section-women").append(
        '<div class="card p-0 m-2 '+element.id+'">'
          +'<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">'
            +'<img src="/img/'+element.id+'/1.jpg" class="card-img"/>'
            +'<a href="#!">'
              +'<div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>'
            +'</a>'
          +'</div>'
          +'<div class="card-body">'
            +'<h5 class="card-title">'+element.name+'</h5>'
            +'<div class="colourList"></div>'
            +'<p class="card-text">Price : $'+element.price+'</p>'
            +'<button type="button" class="btn btn-danger btn-floating">'
              +'<i class="fas fa-heart" data-mdb-toggle="tooltip" data-mdb-placement="bottom" title="Add to favorites"></i>'
            +'</button>'
          +'</div>'
        +'</div>'
      );
    }

    else{
      $(".section-kids").append(
        '<div class="card p-0 m-2 '+element.id+'">'
          +'<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">'
            +'<img src="/img/'+element.id+'/1.jpg" class="card-img" />'
            +'<a href="#!">'
              +'<div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>'
            +'</a>'
          +'</div>'
          +'<div class="card-body">'
            +'<h5 class="card-title">'+element.name+'</h5>'
            +'<div class="colourList"></div>'
            +'<p class="card-text">Price : $'+element.price+'</p>'
            +'<button type="button" class="btn btn-danger btn-floating">'
              +'<i class="fas fa-heart" data-mdb-toggle="tooltip" data-mdb-placement="bottom" title="Add to favorites"></i>'
            +'</button>'
          +'</div>'
        +'</div>'
      )
    }
    
    element.colourCodes.forEach(color => {
      $("."+element.id).find(".colourList").append($('<p class="color-dot" style="background-color:'+color+';"></p>'));
    });
  });
});

fetch("shoes.json")
.then(response => {
   return response.json();
})
.then(data => {
  data.shoes.forEach(element => {
    
  });
});