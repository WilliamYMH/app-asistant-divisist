import API from '../api/api';

export default function logout() {
    return API.post(`api/v1.0/logout`)
        .then(res => {
            if (!res.ok) throw new Error('Response is NOT ok')
            return res.json()
        }).then(res => {
            const {jwt} = res
            return jwt
        })
}