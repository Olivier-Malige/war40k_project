import axios, {AxiosError} from 'axios';

type AuthStateType = {
    isSubmitting : boolean,
    isUserAuth: boolean,
    loginError: string | null
}

const state : AuthStateType = {
    isSubmitting: false,
    isUserAuth: false,
    loginError: null
}

export type userCredential = {
    email: string,
    password: string
}

function  setIsSubmitting(state: AuthStateType, payload: boolean) {
    state.isSubmitting = payload
}

function  setIsUserAuth(state: AuthStateType, payload: boolean) {
    state.isUserAuth = payload
}

function  setLoginError(state: AuthStateType, payload: string) {
    state.loginError = payload
}

async function submitLogin(context: any, payload: userCredential) {
    context.commit('setIsSubmitting', true)
    context.commit('setLoginError', null)
    try {
        await axios.post('auth/login', {
            email : payload.email,
            password : payload.password
        })
        context.commit('setIsUserAuth', true)
    } catch (err : AxiosError | any) {
        context.commit('setLoginError', err.response.data.error.message)
        context.commit('setIsUserAuth', false)
    } finally {
        context.commit('setIsSubmitting', false)
    }

}

const actions = {
    submitLogin
}
const mutations = {
    setIsSubmitting,
    setIsUserAuth,
    setLoginError
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}