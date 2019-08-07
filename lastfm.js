$(document).ready(function(){
$("#button-search").on("click", function(event) {

  
  
  $("#top-albums").html("");
  $("#carousel-buttons").html("<button type='button' class='btn btn-dark prev'>Previous Album</button> <button type='button' class='btn btn-dark next'>Next Album</button>");

  var artistName = $("#artist-input").val().trim();
  
  var correctedNameURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist=" + artistName + "&api_key=8ec61604940d4c07d1444489c77899e0&format=json"


  $.ajax({
    url: correctedNameURL,
    method: "GET"
  }).then(function(response) {
    var correctedName = response.corrections.correction.artist.name;
    artistName = correctedName;

    var tracksURL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artistName + "&api_key=8ec61604940d4c07d1444489c77899e0&format=json";
    $(".artist-card").text("");
    $(".artist-card").append(artistName + " Bio");

    $(".display-4").html("Ultimate " + artistName + " Fan Page!")

  $.ajax({
    url: tracksURL,
    method: "GET"
  }).then(function(response) {
    var results = response.toptracks.track;

    $("#top-tracks").text("");

    for (var i = 0; i < 6; i++) {
        var trackName = results[i].name;
        var trackURL = results[i].url;
        $("#top-tracks").append("<button type='button' class='btn btn-dark'><a href='"+ trackURL + "'>" + trackName + "</a></button> <br><br>");
        // "<button type='button' class='btn btn-dark prev'>Previous Album</button>
        console.log(trackName);
        console.log(trackURL);
    }
  });

  var infoURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=8ec61604940d4c07d1444489c77899e0&format=json";
    
  $.ajax({
    url: infoURL,
    method: "GET"
  }).then(function(response) {
    var bio = response.artist.bio.summary;

    $(".wiki-info").text("");
    $(".wiki-info").append(bio);
  });

  $.ajax({
      url: infoURL,
      method: "GET"
    }).then(function(response) {
      var similar = response.artist.similar.artist;
      for (var i = 0; i < 3; i++) {
      var similarArtist = similar[i].name;
      var similarArtistURL = similar[i].url;
      // console.log(similarArtist);
      // console.log(similarArtistURL);
      }
    });

    var albumsURL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artistName + "&api_key=8ec61604940d4c07d1444489c77899e0&format=json";

    $.ajax({
      url: albumsURL,
      method: "GET"
    }).then(function(response) {
      var albums = response.topalbums.album;
      for (var i = 0; i < 10; i++) {
        var albumName = albums[i].name;
        // console.log(albumName);
        var albumURL = albums[i].url;
        // console.log(albumURL);
        var albumIMG = albums[i].image[3];
        // console.log(albumIMG['#text']);
        var albumImgURL = albumIMG['#text'];
        $("#top-albums").append("<a href='"+ albumURL + "'> <img src='" + albumImgURL + "'> </a>");
      }

      const mySiema = new Siema();
      document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
      document.querySelector('.next').addEventListener('click', () => mySiema.next());

  });
});
});
});

