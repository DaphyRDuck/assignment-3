//initialize variables
const uri = 'api/music';
let musics = null;
//gets count
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
//starts off the javascript
$(document).ready(function () {
    getData();
});
//gets information
function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#musics').empty();
            getCount(data.length);
            $.each(data, function (key, item) {

                $(
                    '<tr><td>' + item.name + '</td>' +
                    '<td>' + item.author + '</td>' +
                    '<td>' + item.details + '</td>' +
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#musics'));
            });

            musics = data;
        }
    });
}
//adds item input into the database
function addItem() {
    const item = {
        'name': $('#add-name').val(),
        'author': $('#add-author').val(),
        'details': $('#add-details').val()
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#add-name').val('');
            $('#add-author').val('');
            $('#add-details').val('');
        }
    });
}
//delete items from databsae
function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}
//edit items from database
function editItem(id) {
    $.each(musics, function (key, item) {
        if (item.id === id) {
            $('#edit-name').val(item.name);
            $('#edit-author').val(item.author);
            $('#edit-details').val(item.details);
            $('#edit-id').val(item.id);
        }
    });
    $('#spoiler').css({ 'display': 'block' });
}

$('.my-form').on('submit', function () {
    const item = {

        'name': $('#edit-name').val(),
        'author': $('#edit-author').val(),
        'details': $('#edit-details').val(),
        'id': $('#edit-id').val()
    };

    $.ajax({
        url: uri + '/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});
//closing
function closeInput() {
    $('#spoiler').css({ 'display': 'none' });
}