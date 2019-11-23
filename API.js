const URL = 'https://api.themoviedb.org/3/';
const LANGUAGE = '&language=ru-RU';
const API = '?api_key=fceda9b573bf2b2c108c1f9c2bc407d1';

// Метод добавляющий перечень жанров в список фильмов
function addGenresInMovieList(Movies, Genres) {
  // Обходим все фильмы
  return Movies.map(movie => {
    // Получаем список жанров на основе имеющихся id жанров
    const genres = movie.genre_ids.map(genreId => {
      // Находим запись у которой id совпадает с id жанра из списка фильмов и возвращаем из записи имя
      return Genres.find(genre => genre.id === genreId).name;
    });
    // Добавляем полученный перечень жанров и возвращаем щапись фильма
    movie.genres = genres;
    return movie;
  })
}

// Метод получения списка фильмов c перечнем жанров по номеру страницы
function getMovieListWithGenres(page) {
  return new Promise((resolve, reject) => {
    Promise.all([getMovieList(page), getGenreList()])
    .then(data => {
      resolve({
        page: data[0].page,
        movies: addGenresInMovieList(data[0].movies, data[1])
      })
    }).catch(function(e) {
      reject(e);
    });
  });
}

// Метод получения списка фильмов по номеру страницы
function getMovieList(page) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}movie/popular${API}${LANGUAGE}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      resolve({
        page: data.page,
        movies: data.results
      })
    }).catch(function(e) {
      reject(e);
    });
  });
}

// Метод получения перечня жанров
function getGenreList() {
  return new Promise((resolve, reject) => {
    fetch(`${URL}genre/movie/list${API}${LANGUAGE}`)
    .then(response => response.json())
    .then(data => {
      resolve(data.genres);
    }).catch(function(e) {
      reject(e);
    });
  });
}

export {
  getMovieListWithGenres
};
