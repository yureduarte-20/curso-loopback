import axios from 'axios'
export const TOKEN_KEY = 'access_token'
const api = axios.create({
    baseURL: 'http://127.0.0.1:3000'
})
export function useApi()
{
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
        return axios.create({
            baseURL: 'http://127.0.0.1:3000',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })      
    }
    return axios.create({
        baseURL: 'http://127.0.0.1:3000'
    })
}
export default api;