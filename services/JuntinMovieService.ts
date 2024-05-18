import { Juntin } from "../interfaces/Juntin/Juntin";
import { Movie } from "../interfaces/Movie/Movie";
import { MovieHistoric } from "../interfaces/Movie/MovieHistoric";
import { ResultViwedJuntinMovie } from "../interfaces/Movie/ResultViwedJuntinMovie";
import apiCall from "./api";

class JuntinMovieService{

    async createMovie(movie: Movie) {
        try {
            const response = await apiCall.post('/JuntinMovie', movie);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
    
    async getJuntinMovies(juntinPlayId: string, page:number=1) {
        try {
            if (!juntinPlayId) {
                throw new Error('juntinPlayId is undefined');
            }
            const response = await apiCall.get(`/JuntinMovie?page=${page}&juntinPlayId=${juntinPlayId}`);
            return response.data.data as Movie[];
        } catch (error) {
            throw error;
        }
    }
    async getHistoricJuntinMovies(juntinPlayId: string, page:number=1) {
        try {
            if (!juntinPlayId) {
                throw new Error('juntinPlayId is undefined');
            }
            const response = await apiCall.get(`/JuntinMovie/historic?page=${page}&juntinPlayId=${juntinPlayId}`);
            return response.data.data as MovieHistoric[];
        } catch (error) {
            throw error;
        }
    }
    async changeView(juntinMovieId:string, status:boolean){
        try {
            const input = {
                juntinMovieId: juntinMovieId,
                isViewed: status
            }
       
            const response = await apiCall.post(`/UserViewedJuntinMovie`, input);
            console.log(response.data.data);
            return response.data.data as ResultViwedJuntinMovie;
        } catch (error) {
            console.log(error);
            throw error;

        }
    }
}
export default new JuntinMovieService;