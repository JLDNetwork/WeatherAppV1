/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function weather(postal,location) {
    $.simpleWeather({
        zipcode: postal,
        location: location,
        woeid: '',
        unit: 'f',
        success: function(weather) {
            $('#title').html("<h3 style='text-align:center;'>" + weather.title + "</h3>");
            $('#current-condition').css('background', 'url("' + weather.image + '") 15px -20px no-repeat');
            $('.card-img-top').prop({'title': weather.text, 'data-toggle': 'tooltip', 'data-placement': 'top'});
            $('#big-temp').html(weather.temp+" &deg;F");
            $('#forecast').html(weather.forecast);
                
            var list = "<hr><ul>";
            $.each(weather, function(key, val) {
                list += "<li>"+key+": "+val+"</li>";
            });
            list += "</ul>";
            var desc = weather.description;
            $("#forecast").html(desc.replace("]]>", ""));
        },
        error: function(error) {
            $("#dev").html('<p>'+error+'</p>');
        }
    });
}
$(document).ready(function() {
    $.get('http://ipinfo.io', function(response) {
        console.log(response);
        var location = response.loc;
        var postal = response.postal;
        weather(postal,location);
    }, 'jsonp');
});

