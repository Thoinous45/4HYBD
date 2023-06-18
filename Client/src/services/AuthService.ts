import axios from 'axios';

const AuthService = {
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            const {token} = response.data;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            throw error;
        }
    },

    register: async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/register', {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            throw error;
        }
    },

    isAuthenticated: () => {
        try {
            const token = localStorage.getItem('token');
            /*return token !== null;*/
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
