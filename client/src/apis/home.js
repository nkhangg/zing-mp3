import axios from '../axios';

export const getHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const responce = await axios({
                url: '/home',
                method: 'get',
            });

            resolve(responce);
        } catch (error) {
            reject(error);
        }
    });
