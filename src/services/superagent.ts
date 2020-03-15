import superagent from 'superagent';

const localDev = false;
const API_ROOT = localDev ? 'http://localhost:3000/' : 'http://157.245.231.113/api/';

export const get = async (endpoint: string): Promise<any> => {
    const token = localStorage.getItem('token');
    return await superagent
        .get(API_ROOT + endpoint)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
}

export const post = async (endpoint: string, data: any): Promise<any> => {
    const token = localStorage.getItem('token');
    return await superagent
        .post(API_ROOT + endpoint)
        .send(data)
        .set('Authorization', 'Bearer ' + token);
}