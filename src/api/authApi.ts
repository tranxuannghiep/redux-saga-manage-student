import { LoginPayload, RegisterPayload } from 'features/auth/authSlice';
import { User } from 'models';
import axiosAuth from './axiosAuth';

const authApi = {
    login(params: LoginPayload): Promise<User> {
        const url = '/auth/login'
        return axiosAuth.post(url, params)
    },
    register(params: RegisterPayload) {
        const url = 'auth/register'
        return axiosAuth.post(url, params)
    },
    getRegionList(): Promise<any> {
        const url = '/location';
        return axiosAuth.get(url)
    },
    getStateList(id: string): Promise<any> {
        const url = `/location?pid=${id}`;
        return axiosAuth.get(url)
    }

}




export default authApi