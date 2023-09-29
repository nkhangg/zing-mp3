import axios from '../axios';

export const apiGetSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/song',
                method: 'get',
                params: { id: sid },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/infosong',
                method: 'get',
                params: { id: sid },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailPlaylist = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/detailplaylist',
                method: 'get',
                params: { id: pid },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/search',
                method: 'get',
                params: { keyword },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetArtistSongs = (singerId) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/artistsong',
                method: 'get',
                params: { id: singerId, page: 1, count: 50 },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetArtist = (alias) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/artist',
                method: 'get',
                params: { name: alias, page: 1, count: 50 },
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetChartHome = (alias) =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/charthome',
                method: 'get',
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });
