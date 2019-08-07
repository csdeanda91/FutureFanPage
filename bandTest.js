function dealWithAttractions(json, artist) {
    var attractions = json._embedded.attractions;
    console.log(attractions);
    $(".jumbotron").css({"background-image": "url(" + attractions[0].images[0].url + ")", "background-size": "cover", "background-position": "center", "background-repeat": "no-repeat"})
    console.log(attractions[0].externalLinks);
    $("#videoresults").append("<a href='" + attractions[0].externalLinks.facebook[0].url + "'>" + "Facebook" + "</a> <br>");

    $("#videoresults").append("<a href='" + attractions[0].externalLinks.homepage[0].url + "'>" + "Homepage" + "</a> <br>");

    $("#videoresults").append("<a href='" + attractions[0].externalLinks.youtube[0].url + "'>" + "Youtube" + "</a> <br>");

    
    

    for (var i = 0; i < attractions.length; i++) {
        if (attractions[i].name === artist) {
            var ticketmasterlink = attractions[i].url;
            console.log(ticketmasterlink);
            $("#songkickresults").append("<a href='" + ticketmasterlink + "'>" + "Click Here" + "</a>");
        }
    }
    $("#videoresults").append("<a href='" + attractions[0].externalLinks.instagram[0].url + "'>" + "Instagram" + "</a> <br>");

}

function getUpcomingEvents(name) {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=31ZMxAKlxeIRtUcSXMoWUL8XOqADmm5S&keyword=" + name;
    $.ajax({
        type: "GET",
        url: queryURL,
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            dealWithAttractions(json, name);
        }
    });
}

$(document).ready(function () {
    $("#button-search").on("click", function (event) {
        $("#videoresults").html("");
        $("#songkickresults").html("");
        var artistName = $("#artist-input").val().trim();
        var artistStringArr = artistName.split(" ");
        for (var i = 0; i < artistStringArr.length; i++) {

            artistStringArr[i] = artistStringArr[i].charAt(0).toUpperCase() + artistStringArr[i].slice(1)
    
        }
        artistName = artistStringArr.join(" ");
        console.log(artistName);
        getUpcomingEvents(artistName);
    })
})

