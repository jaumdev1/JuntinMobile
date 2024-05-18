import { MovieResponse } from '../interfaces/Movie/MovieResponse';
import { Movie } from '../interfaces/Movie/Movie';
import apiCall from './api';

class MovieService {
  
  public async getMovies(title: string): Promise<MovieResponse[]> {
    try {
      let url = `/movie?title=${encodeURIComponent(title)}`;
      const response = await apiCall.get(url); 

      return response.data.data as MovieResponse[];
    } catch (error) {
      throw error;
    }
  }
}

export default new MovieService();