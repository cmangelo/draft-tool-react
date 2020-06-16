import superagent from 'superagent';

import { User } from '../models/user.interface';

const localDev = false;
const API_ROOT = localDev ? 'http://localhost:3000/' : 'https://draft-tool-api-test.herokuapp.com/';

export const getToken = () => {
    const userAsString = localStorage.getItem('user');
    if (!userAsString)
        return;

    const user = JSON.parse(userAsString) as User;
    return user.token;
}

export const get = async (endpoint: string): Promise<any> => {
    const token = getToken();
    return await superagent
        .get(API_ROOT + endpoint)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
}

export const post = async (endpoint: string, data?: any): Promise<any> => {
    const token = getToken();
    return await superagent
        .post(API_ROOT + endpoint)
        .send(data)
        .set('Authorization', 'Bearer ' + token);
}

export const put = async (endpoint: string, data?: any): Promise<any> => {
    const token = getToken();
    return await superagent
        .put(API_ROOT + endpoint)
        .send(data)
        .set('Authorization', 'Bearer ' + token);
}

export const del = async (endpoint: string): Promise<any> => {
    const token = getToken();
    return await superagent
        .delete(API_ROOT + endpoint)
        .set('Authorization', 'Bearer ' + token);
}