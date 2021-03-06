import { USER_LOGIN, SET_AUTHENTICATED_USER, USER_LOGOUT } from './mutationTypes';
import { SET_LOADING } from '../../mutationTypes';
import api from '@/api/Api';

export default {
    async signIn({ commit }, { email, password }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const data = await api.post('/auth/login', {
                email,
                password,
            });

            commit(USER_LOGIN, {
                accessToken: data.access_token,
                tokenType: data.token_type
            });
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (errorMsg) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(errorMsg);
        }
    },

    async signUp({ commit }, {
        firstName,
        lastName,
        email,
        password,
        nickname
    }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const data = await api.post('/auth/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                nickname,
            });

            commit(USER_LOGIN, {
                accessToken: data.access_token,
                tokenType: data.token_type
            });
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async fetchAuthenticatedUser({ commit }) {
        commit(SET_LOADING, true, { root: true });

        try {
            const user = await api.get('/auth/me');

            commit(SET_AUTHENTICATED_USER, user);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async signOut({ commit }) {
        commit(SET_LOADING, true, { root: true });

        try {
            await api.post('/auth/logout');

            commit(USER_LOGOUT);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async updateProfile({ commit }, user
    ) {
        commit(SET_LOADING, true, { root: true });

        try {
            const data = await api.put('/auth/me', {
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                nickname: user.nickname
            });

            commit(SET_AUTHENTICATED_USER, data);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async updateProfileImage({ commit }, image) {
        commit(SET_LOADING, true, { root: true });

        try {
            const formData = new FormData();
            formData.append('image', image, image.name);

            const data = await api.post('/auth/me/image', formData);

            commit(SET_AUTHENTICATED_USER, data);
            commit(SET_LOADING, false, { root: true });

            return Promise.resolve();
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async sendRequestResetPassword({ commit }, email) {
        commit(SET_LOADING, true, { root: true });
        try {
            await api.post("/auth/reset-password", { email: email });

            commit(SET_LOADING, false, { root: true });
            
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async actionResetPassword({ commit }, payload) {
        commit(SET_LOADING, true, { root: true });
        try {

            await api.post("/auth/reset/password/", payload);

            commit(SET_LOADING, false, { root: true });
            
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    },

    async addSettings( { commit }, settings ) {
        commit(SET_LOADING, true, { root: true });
        try {

            await api.post('/user/settings', {settings: settings});

            commit(SET_LOADING, false, {root: true});
        } catch (error) {
            commit(SET_LOADING, false, {root: true});

            return Promise.reject(error);
        }
    },

    async fetchSettings({ commit }) {
        commit(SET_LOADING, true, { root: true });
        try {
            const settings = await api.get('/user/settings');
            commit(SET_LOADING, false, { root: true });
            return Promise.resolve(settings)
        } catch (error) {
            commit(SET_LOADING, false, { root: true });

            return Promise.reject(error);
        }
    }

};