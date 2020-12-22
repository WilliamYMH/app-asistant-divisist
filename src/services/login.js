import API from '../api/api';

export default function login(data) {
    return API.post(`api/v1.0/login`, data)
        .then(res => {
            if (!res.data.succes) throw new Error('Response is NOT ok')
            return res.data.succes
        }).then(res => {
            return res
        })
}