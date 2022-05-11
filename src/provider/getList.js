import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from 'axios';

const apiKey = "43a598c3ece17bd4d70f41a3ba47d9a5";
const apiUrl = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${apiUrl}/movie/now_playing`;
const nowPopular = `${apiUrl}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`;

const httpClient = fetchUtils.fetchJson;

export default {
    getList: async (resource, params) => {
        if(resource === "moviepopular") {
            try {
                const {data} = await axios.get(nowPopular, {
                    params: {
                        api_key: apiKey,
                        language: 'en_US',
                        page: 1
                    }
                })
        
                const posterUrl = "https://image.tmdb.org/t/p/original/";
                const modifiedData = data["results"].map((m) => ({
                  id: m['id'],
                  backPoster: posterUrl + m['backdrop_path'],
                  popularity: m['popularity'],
                  title: m['title'],
                  poster: posterUrl + m['poster_path'],
                  overview: m['overview'],
                  rating: m['vote_average'],
                }));

                console.log('data: ',data)
                return {data: modifiedData, total: modifiedData.total_pages};
                
            } catch (error) {}
        } else if(resource === "movieplayingnow") {
            try {
                const {data} = await axios.get(nowPlayingUrl, {
                    params: {
                        api_key: apiKey,
                        language: 'en_US',
                        page: 1
                    }
                })
        
                const posterUrl = "https://image.tmdb.org/t/p/original/";
                const modifiedData = data["results"].map((m) => ({
                  id: m['id'],
                  backPoster: posterUrl + m['backdrop_path'],
                  popularity: m['popularity'],
                  title: m['title'],
                  poster: posterUrl + m['poster_path'],
                  overview: m['overview'],
                  rating: m['vote_average'],
                }));

                console.log('data: ',data)
                return {data: modifiedData, total: modifiedData.total_pages};
                
            } catch (error) {}
        }
    }
}