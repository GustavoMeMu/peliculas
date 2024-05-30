class Catalogo {
    #peliculas = [];

    agregarPelicula(titulo, director, ano) {
        const pelicula = { id: Date.now(), titulo, director, ano };
        this.#peliculas.push(pelicula);
        this.mostrarPeliculas();
    }

    editarPelicula(id, nuevoTitulo, nuevoDirector, nuevoAno) {
        const pelicula = this.#peliculas.find(p => p.id === id);
        if (pelicula) {
            pelicula.titulo = nuevoTitulo;
            pelicula.director = nuevoDirector;
            pelicula.ano = nuevoAno;
            this.mostrarPeliculas();
        }
    }

    eliminarPelicula(id) {
        this.#peliculas = this.#peliculas.filter(p => p.id !== id);
        this.mostrarPeliculas();
    }

    mostrarPeliculas() {
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';
        this.#peliculas.forEach(pelicula => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${pelicula.titulo}</strong> (${pelicula.ano}) - ${pelicula.director}</span>
                <div class="actions">
                    <button class="edit-button" onclick="editarPelicula(${pelicula.id})">Editar</button>
                    <button class="delete-button" onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
                </div>
            `;
            movieList.appendChild(li);
        });
    }
}

const catalogo = new Catalogo();

document.getElementById('addButton').addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value;
    const director = document.getElementById('director').value;
    const ano = document.getElementById('año').value;

    if (titulo && director && ano) {
        catalogo.agregarPelicula(titulo, director, parseInt(ano));
        document.getElementById('titulo').value = '';
        document.getElementById('director').value = '';
        document.getElementById('año').value = '';
    } else {
        alert('Por favor, completa todos los campos');
    }
});

function editarPelicula(id) {
    const nuevoTitulo = prompt('Nuevo título:');
    const nuevoDirector = prompt('Nuevo director:');
    const nuevoAno = prompt('Nuevo año:');
    if (nuevoTitulo && nuevoDirector && nuevoAno) {
        catalogo.editarPelicula(id, nuevoTitulo, nuevoDirector, parseInt(nuevoAno));
    } else {
        alert('Por favor, completa todos los campos');
    }
}

function eliminarPelicula(id) {
    catalogo.eliminarPelicula(id);
}

catalogo.mostrarPeliculas();
