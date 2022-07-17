import axios from 'axios';
import { database } from '../FIREBASE_CONFIG';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import { stringify } from 'query-string';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const apiKey = '43a598c3ece17bd4d70f41a3ba47d9a5';
const apiUrl = 'https://api.themoviedb.org/3';
const trendingMovie = `${apiUrl}/trending/all/day`;
const searchMovie = `${apiUrl}/search/movie`;
const searchMulti = `${apiUrl}/search/multi`;
const discoverMovie = `${apiUrl}/discover/movie`;

export default {
  getList: async (resource, params) => {
    console.log('paramsGetList', params);
    const page = params.pagination.page;

    if (resource === 'movie') {
      try {
        if (Object.keys(params.filter).length === 0) {
          const { data } = await axios.get(`${trendingMovie}?api_key=${apiKey}&page=${page}`, {
            params: {
              api_key: apiKey,
              language: 'en_US',
              page: page,
            },
          });
          console.log('dataGetList: ', data);
          const posterUrl = 'https://image.tmdb.org/t/p/original';
          const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'] || m['name'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release: m['release_date'],
          }));

          return { data: modifiedData, total: data.total_results };
        } else {
          const title = params.filter.title;
          const year = params.filter.year;

          const { data } = await axios.get(
            `${searchMovie}`,
            // year
            //   ? title
            //     ? {
            //         params: {
            //           api_key: apiKey,
            //           language: 'en_US',
            //           query: title,
            //           page: page,
            //           year: year,
            //         },
            //       }
            //     : {
            //         params: {
            //           api_key: apiKey,
            //           language: 'en_US',
            //           query: year.toString(),
            //           page: page,
            //         },
            //       }
            //   : {
            //       params: {
            //         api_key: apiKey,
            //         language: 'en_US',
            //         query: title,
            //         page: page,
            //       },
            //     }
            {
              params: {
                api_key: apiKey,
                language: 'en_US',
                query: title,
                page: page,
              },
            }
          );

          const posterUrl = 'https://image.tmdb.org/t/p/original';
          const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'] || m['name'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
            release: m['release_date'],
          }));

          console.log('data: ', modifiedData);

          return { data: modifiedData, total: data.total_results };
        }
      } catch (error) {}
    } else if (resource === 'user') {
      try {
        if (Object.keys(params.filter).length === 0) {
          const movieCollectionRef = collection(database, 'userLogin');

          const userData = await getDocs(movieCollectionRef)
            .then((response) => {
              const user = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
              }));
              console.log(55555, user);

              const modifiedUser = user.map((u) => ({
                id: u.id,
                name: u.data.name,
                email: u.data.email,
                role: u.data.role,
              }));

              console.log('data: 9999', modifiedUser);
              return { data: modifiedUser, total: modifiedUser.length };
            })
            .catch((error) => console.log(error.message));

          return userData;
        } else {
          const movieCollectionRef = query(
            collection(database, 'userLogin'),
            where('name', '==', params.filter.name)
          );
          const userData = await getDocs(movieCollectionRef)
            .then((response) => {
              const user = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
              }));
              console.log(55555, user);

              const modifiedUser = user.map((u) => ({
                id: u.id,
                name: u.data.name,
                email: u.data.email,
                role: u.data.role,
              }));

              console.log('data: 9999', modifiedUser);
              return { data: modifiedUser, total: modifiedUser.length };
            })
            .catch((error) => console.log(error.message));

          return userData;
        }
      } catch (error) {}
    }
  },

  getOne: async (resource, params) => {
    console.log('paramsGetOne', params);
    if (resource === 'movie') {
      try {
        const { data } = await axios.get(`${apiUrl}/movie/${+params.id}`, {
          params: {
            api_key: apiKey,
            language: 'en_US',
          },
        });

        const posterUrl = 'https://image.tmdb.org/t/p/original';
        const modifiedData = {
          id: data.id,
          backPoster: posterUrl + data.backdrop_path,
          popularity: data.popularity,
          title: data.title,
          poster: posterUrl + data.poster_path,
          overview: data.overview,
          rating: data.vote_average,
          release: data.release_date,
        };

        // const filteredData = modifiedData.filter((mod) => {
        //   return mod.id === +params.id;
        // })[0];
        // data yang di return 1 karena id itu unik

        console.log('dataGetOne', modifiedData);

        return { data: modifiedData };
      } catch (error) {}
    } else if (resource === 'user') {
      try {
        const movieCollectionRef = collection(database, 'userLogin');
        const userData = await getDocs(movieCollectionRef)
          .then((response) => {
            const user = response.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
            }));

            // console.log(888, user);

            const modifiedUser = user.map((u) => ({
              id: u.id,
              name: u.data.name,
              email: u.data.email,
              role: u.data.role,
            }));

            const filteredDataUser = modifiedUser.filter((mod) => {
              return mod.id === params.id;
            })[0];

            return { data: filteredDataUser };
          })
          .catch((error) => console.log(error.message));

        return userData;
      } catch (error) {}
    }
  },

  delete: async (resource, params) => {
    console.log('paramsDelete', params);
    if (resource === 'user') {
      try {
        const docRef = doc(database, 'userLogin', params.id);

        const userData = await deleteDoc(docRef)
          .then(() => {
            console.log('Document deleted');

            return { data: docRef };
          })
          .catch((error) => console.log(error.message));

        return userData;
      } catch (error) {}
    }
  },

  update: async (resource, params) => {
    console.log('paramsUpdate', params);
    if (resource === 'user') {
      try {
        const docRef = doc(database, 'userLogin', params.id);

        const userData = await updateDoc(docRef, {
          name: params.data.name,
          email: params.data.email,
        })
          .then((response) => {
            console.log(response);

            return { data: params.data };
          })
          .catch((error) => console.log(error.message));

        return userData;
      } catch (error) {}
    }
  },

  create: async (resource, params) => {
    console.log('paramsCreate', params);
    if (resource === 'user') {
      try {
        const docRef = collection(database, 'userLogin');

        const userData = addDoc(docRef, {
          name: params.data.name,
          email: params.data.email,
          // uid: doc.user.uid,
          role: params.data.role,
        })
          .then((response) => {
            console.log(response);

            return { data: params.data };
          })
          .catch((error) => console.log(error.message));

        return userData;
      } catch (error) {}
    }
  },
};
