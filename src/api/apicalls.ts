const apiKey: string = '4450a7e8d82dde4c8a1955527d487785';
export const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`
}
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}&language=pt-BR`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;
};

export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`;
};

export const watchProviders  = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}&language=pt-BR`
}

export const filterByGenre = (genreId: number, page: number) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&language=pt-BR`
}