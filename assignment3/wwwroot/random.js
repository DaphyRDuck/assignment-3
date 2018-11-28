//initialize variables and arrays
const uri = 'api/music';
let musics = null;
var i = 0;
var arrayLength;
var musicz = new Array();
var authorz = new Array();
var detailz = new Array();
var rArray = new Array();
//function that gets count
function getCount(data) {

    const el = $('#counter');
    let name = 'music';
    let author = 'author';
    let details = 'details';

    if (data) {
        if (data > 1) {
            name = 'music';
            author = 'author';
            details = 'details';
        }

        el.text(data + ' ' + author);
        el.text(data + ' ' + details);
        el.text(data + ' ' + name);
    } else {

        el.html('No ' + author);
        el.html('No ' + details);
        el.html('No ' + name);

    }
}

//coding to start off the javascript
$(document).ready(function () {
    getData();
});

//function to obtain data
function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#musics').empty();
            getCount(data.length);
            $.each(data, function (key, item) {                
                musicz.push(item.name);
                authorz.push(item.author);
                detailz.push(item.details);
            });
            //code snippet that displays information
            arrayLength = musicz.length;
            rArray = RNG(arrayLength);
            for (i; i < arrayLength; i++) {
                $('<tr><td>' + musicz[rArray[i]] + '</td>' +
                    '<td>' + authorz[rArray[i]] + '</td>' +
                    '<td>' + detailz[rArray[i]] + '</td>' +
                '</tr>').appendTo($('#musics'));
            }


            musics = data;
        }    

    });

}

//function to generate random numbers
function RNG(R) {
    var rngArr = new Array();
    var i = 0;
    for (var i; i < R; i++) {

        rngArr[i] = Math.floor((Math.random() * R) + 0);

    }

    return rngArr;
}