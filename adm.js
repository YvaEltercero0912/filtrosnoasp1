document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(); // Cargar productos al inicio
});

document.getElementById('formProducto').addEventListener('submit', function(e) {
    e.preventDefault();

    const imagenInput = document.getElementById('imagen');
    const reader = new FileReader();
    const productoId = document.getElementById('productoId').value; // Obtenemos el ID del producto si está en el formulario

    reader.onload = function() {
        const producto = {
            codigo: document.getElementById('codigo').value,
            descripcion: document.getElementById('descripcion').value,
            marca: document.getElementById('marca').value,
            precio: document.getElementById('precio').value,
            imagen: reader.result || ""
        };

        // Si hay un ID, es una actualización; si no, es una creación
        const method = productoId ? 'PUT' : 'POST';
        const url = productoId ? `http://localhost:3000/productos/${productoId}` : 'http://localhost:3000/productos';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Mostrar mensaje de éxito
            mostrarProductos(); // Actualizar tabla
            resetForm(); // Resetear el formulario
        })
        .catch(error => console.error('Error:', error));
    };

    if (imagenInput.files.length > 0) {
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        const producto = {
            codigo: document.getElementById('codigo').value,
            descripcion: document.getElementById('descripcion').value,
            marca: document.getElementById('marca').value,
            precio: document.getElementById('precio').value,
            imagen: ""
        };

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            mostrarProductos();
            resetForm(); // Resetear el formulario
        })
        .catch(error => console.error('Error:', error));
    }
});

function mostrarProductos() {
    fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(data => {
        const tablaProductos = document.getElementById('tablaProductos');
        tablaProductos.innerHTML = '';

        data.forEach(producto => {
            tablaProductos.innerHTML += `
                <tr>
                    <td>${producto.codigo}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.imagen ? `<img src="${producto.imagen}" width="100">` : 'Sin imagen'}</td>
                    <td>
                        <button onclick="editarProducto(${producto.id})">✏️</button>
                        <button onclick="borrarProducto(${producto.id})">🗑️</button>
                    </td>
                </tr>
            `;
        });
    });
}

function editarProducto(id) {
    fetch(`http://localhost:3000/productos/${id}`)
        .then(response => response.json())
        .then(producto => {
            document.getElementById('codigo').value = producto.codigo;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('marca').value = producto.marca;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('productoId').value = producto.id; // Asignamos el ID al campo oculto
        })
        .catch(error => console.error('Error al editar producto:', error));
}

function borrarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Mostrar mensaje de éxito
            mostrarProductos(); // Actualizar tabla
        })
        .catch(error => console.error('Error al eliminar producto:', error));
    }
}

function resetForm() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = ''; // Limpiar el ID
}
