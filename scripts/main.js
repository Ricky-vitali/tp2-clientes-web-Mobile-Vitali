const API_KEY = 'd8c88afa';
let answer = document.querySelector('div.main .movieList');
/* http://img.omdbapi.com/?apikey=${API_KEY}&
    http://www.omdbapi.com/?apikey=${API_KEY}&
    http://www.omdbapi.com/?i=${movie}&apikey=${API_KEY}
*/


window.addEventListener("offline", (event) => {
    document.querySelector('#conecLost').style.display = 'block';
  });
  
  // Escucho si el usuario tiene conexion
  window.addEventListener("online", (event) => {
    document.querySelector('#conecLost').style.display = 'none';
  });
  
  // Escucho si el navegador esta online o no, util en los casos que entro sin conexion.
  if (!navigator.onLine) {
    
    console.log("estoy sin conexion!!");
  }
  
let myList = JSON.parse(localStorage.getItem('myList')) ?? [];

document.querySelector('.main form').addEventListener('submit', e => {
    e.preventDefault();
    let movie = e.target.querySelector('input').value;
    if (movie !== '') {
        fetch(`http://www.omdbapi.com/?s=${movie}&plot=full&apikey=${API_KEY}`)
            .then(res => {
                if (res.status == 200) {
                    console.log("Tiro 200")
                    return res.json()
                } else {
                    console.log("Hubo un error")
                }
            }).then(res => {
                answer.innerHTML = "";
                if (res.Response === 'True') {
                    if (res.totalResults && res.totalResults > 0) {
                        showMovie(res);
                        document.querySelector('#error').style.display = 'none';
                    }
                } else {
                    document.querySelector('#error').style.display = 'block';
                    console.log('Error')
                }
            });
    }
});

/* Muestra las peliculas buscadas */

function showMovie(movieContent) {
   
    movieContent.Search.forEach(movie => {
        let div = document.createElement('div');
        div.setAttribute('data-id', movie.imdbID);
        div.classList.add('divMovieFound');

        let movieTitle = document.createElement('p');
        movieTitle.innerHTML = movie.Title;

        let movieImage = document.createElement('img')
        movieImage.src = movie.Poster;

        let addButton = document.createElement('button');
        addButton.classList.add('addBtn')
        addButton.innerHTML = "+ Agregar a la Lista";

        addButton.addEventListener('click', e => {

            let element = e.target;
            let movieID = element.parentElement.getAttribute('data-id');
            myList.push(movieID);
            localStorage.setItem('myList', JSON.stringify(myList));

            document.querySelector('#movieAdded').style.display = 'block';

            setTimeout(() => {
                document.querySelector('#movieAdded').style.display = 'none';
            }, 3000);
            
        })

        div.appendChild(movieTitle)
        div.appendChild(movieImage)
        div.appendChild(addButton)
        answer.appendChild(div);
    });

    answer.style.display = 'block';

}


/* Abrir y cerrar modal */
    botonLi = document.querySelector('li');
    closeLi = document.getElementById('closeModal')
    modalDiv = document.querySelector('.miModalBackground')

    botonLi.addEventListener('click', e => {
        modalDiv.style.display = 'block';
            createModalElements();
    })


    closeLi.addEventListener('click', e => {
        modalDiv.style.display = 'none';
    })

    function createModalElements() {
        let divList = document.querySelector('.mainModal .myList');
        divList.innerHTML = '';
        if (myList.length > 0) {
            myList.forEach((movie, index) => {
                fetch(`http://www.omdbapi.com/?i=${movie}&plot=full&apikey=${API_KEY}`) // Copiar esta petición para la solicitud de la película random
                    .then(res => res.json())
                    .then(res => {
                        let div = document.createElement('div');
                        div.classList.add('listDiv')
                        let title = document.createElement('p');
                        title.innerHTML = "-"+res.Title;

                        let btn = document.createElement('button');
                        btn.innerHTML = 'Remover';
                        btn.classList.add('deleteBtn')
                        btn.setAttribute('data-index', index);
                        
                        btn.addEventListener('click', e => {
                            myList.splice(e.target.getAttribute('data-index'), 1);
                            localStorage.setItem('myList', JSON.stringify(myList));
                            createModalElements(myList);
                        });
                        title.appendChild(btn);
                        div.appendChild(title);
                        divList.appendChild(div);
                    });
            });
        } else {
            let divList = document.querySelector('.mainModal .myList');
            let p = document.createElement('p');
            p.innerHTML = 'Tu lista esta vacía.';
            divList.append(p);
        }
    }    

/* Pelicula aleatoria */

let popularFilms = [
    'tt0133093', // Matrix
    'tt3521164', // Moana
    'tt2294629', // Frozen
    'tt4154664', //Capitana Marvel
    'tt1637725', //TED
    'tt0449088', //Piratas del caribe en el Fin del Mundo
    'tt0118799', //La vida es bella
    'tt0109830', //Forrest Gump
    'tt0079470', //La vida de Brian
    'tt4054952', //Fate Heavens Feel 1
    'tt0072271', //La masacre de Texas
    'tt11958344', //A Whisker Away
    'tt11032374', //Kimetsu no yaiba Movie
    'tt2981768', //Patema Inverted
    
];


botonRandom = document.querySelectorAll('li')[1];
botonRandom.addEventListener('click', e => {
    randomMovie();
})


function randomMovie(){
    console.log(popularFilms)
    
    let randomPos = Math.floor(Math.random() * (popularFilms.length - 0 + 1));
     if (randomPos >= 14) {
        randomPos = 13;
    } 
    console.log(randomPos)

    fetch(`http://www.omdbapi.com/?i=${popularFilms[randomPos]}&plot=full&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        answer.innerHTML = "";
        let div = document.createElement('div');
        div.setAttribute('data-id', movie.imdbID);
        div.classList.add('divMovieFound');

        let movieTitle = document.createElement('p');
        movieTitle.innerHTML = res.Title;

        let movieImage = document.createElement('img')
        movieImage.src = res.Poster;

        let addButton = document.createElement('button');
        addButton.classList.add('addBtn')
        addButton.innerHTML = "+ Agregar a la Lista";

        addButton.addEventListener('click', e => {
        let element = e.target;
        let movieID = element.parentElement.getAttribute('data-id');
        myList.push(movieID);
        localStorage.setItem('myList', JSON.stringify(myList));
        })

        div.appendChild(movieTitle)
        div.appendChild(movieImage)
        div.appendChild(addButton)
        answer.appendChild(div);

        });
        answer.style.display = 'block';
}
