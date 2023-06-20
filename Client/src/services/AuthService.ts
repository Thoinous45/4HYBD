import axios from 'axios';

const api = "http://localhost:3000/api/users/"

const AuthService = {
    login: async (email: string, password: string) => {
        try {
            await axios.post(api + 'login', {
                email,
                password,
            }).then((response) => {
                sessionStorage.setItem('user', response.data.userId);
                sessionStorage.setItem('token', response.data.token);
            })
        } catch (error) {
            // @ts-ignore
            switch (error.response.status) {
                case 401:
                    return {status: "error", error: "Email ou mot de passe incorrect"};
                case 500:
                    return {status: "error", error: "Utilisateur non trouvé"};
                default:
                    return {status: "error", error: "Une erreur est survenue"};
            }
        }
        return {status: "success"};
    },

    register: async (email: string, password: string, password_confirmation: string, firstname: string, lastname: string) => {
        try {
            await axios.post(api + 'signup', {
                email,
                password,
                password_confirmation,
                firstname,
                lastname,
            })
        } catch (error) {
            // @ts-ignore
            switch (error.response.status) {
                case 401:
                    return {status: "error", error: "Email existant"};
                case 406:
                    // @ts-ignore
                    return {status: "error", error: error.response.data.msg};
                default:
                    return {status: "error", error: "Une erreur est survenue"};

            }
        }
        return {status: "success"};
    },

    logout: async () => {
        try {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        } catch (error) {
            throw error;
        }
    },

    isAuthenticated: () => {
        if (!sessionStorage.getItem('token')) return false;
        const token = sessionStorage.getItem('token');
        return axios.get(api + 'isLogin', {
            headers: {'Authorization': `Bearer ${token}`}
        }).then((response) => {
            return response.data;
        });
    },
    getOneUser() {
        if (sessionStorage.getItem('user')) {
            return axios.get(api + "one/" + sessionStorage.getItem('user'), {
                headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
            }).then((response) => {
                return response.data;
            });
        }
    }
}

export default AuthService;
