import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "c2bdf532-d7f6-470e-a2a0-49c219c0c604"
    }
})
export const usersAPI = {
    getUsers(currentPage: any, pagesize: any) {
        return instance.get(`users?page=${currentPage}&count=${pagesize}`)
    },
    unFollowUser(id: any) {
        return instance.delete(`follow/${id}`)
    },
    followUser(id: any) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {
    profileAuth(userId: any) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: any) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status : any) {
        return instance.put('profile/status/', {status : status})
    },
}

export const authAPI = {
    me() {
        return instance.get('auth/me')
    },
    login(email:any,password:any,rememberMe = true) {
        return instance.post('auth/login', {email,password,rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    },
    captcha() {
        return instance.get('/security/get-captcha-url')
    }
}