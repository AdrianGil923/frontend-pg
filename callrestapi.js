const url = "https://adrian-pg.onrender.com/api/users";

// Crear usuario (POST)
function postUser() {
    const myUser = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(myUser),
    success: function (data) {
        // Solo muestra el mensaje "Usuario creado con éxito"
        $('#resultado').html('Usuario creado con éxito');
    },
    error: function (xhr) {
        $('#resultado').html('Error al crear usuario: ' + xhr.responseText);
    }
});

}

// Obtener todos los usuarios (GET)
function getUsers() {
    $.getJSON(url, function (json) {
        const arrUsers = json.users;
        let htmlTable = '<table border="1"><tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Comments</th></tr>';

        arrUsers.forEach(item => {
            htmlTable += `<tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.age}</td>
                <td>${item.comments}</td>
            </tr>`;
        });

        htmlTable += '</table>';
        $('#resultado').html(htmlTable);
    }).fail(function () {
        $('#resultado').html('Error al obtener usuarios.');
    });
}

// Obtener usuario por ID (GET)
function getUserById() {
    const id = $('#userId').val();
    if (!id) return alert('Ingresa un ID válido.');

    $.ajax({
        url: `${url}/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const user = data.user;
            const htmlTable = `<table border="1">
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th><th>Comments</th></tr>
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.comments}</td>
                </tr>
            </table>`;
            $('#resultado').html(htmlTable);
        },
        error: function () {
            $('#resultado').html('Usuario no encontrado.');
        }
    });
}

// Actualizar usuario (PUT)
function updateUser() {
    const id = $('#userId').val();
    if (!id) return alert('Ingresa el ID del usuario a actualizar.');

    const updatedUser = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    $.ajax({
        url: `${url}/${id}`,
        method: 'PUT',  // Usamos 'method' en lugar de 'type'
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: function (data) {
            $('#resultado').html('Usuario actualizado: ' + JSON.stringify(data.updated));
        },
        error: function (xhr) {
            $('#resultado').html('Error al actualizar: ' + xhr.responseText);
        }
    });
}

// Eliminar usuario (DELETE)
function deleteUser() {
    const id = $('#userId').val();
    if (!id) return alert('Ingresa el ID del usuario a eliminar.');

    $.ajax({
        url: `${url}/${id}`,
        method: 'DELETE',  // Usamos 'method' en lugar de 'type'
        dataType: 'json',
        success: function (data) {
            $('#resultado').html('Usuario eliminado: ' + JSON.stringify(data));
        },
        error: function (xhr) {
            $('#resultado').html('Error al eliminar: ' + xhr.responseText);
        }
    });
}

