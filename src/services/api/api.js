import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Token atual:", token);
    console.log("Tipo do token:", typeof token);
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        console.log("Resposta da API:", response);
        return response;
    },
    (error) => {
        console.error("Erro na API:", error.response || error);
        return Promise.reject(error);
    }
);

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { 
            username, 
            password 
        });
        
        console.log('Resposta completa:', response.data);
        
        if (response.data && response.data.token) {
            const token = String(response.data.token).trim();
            
            localStorage.setItem('token', token);
            
            const savedToken = localStorage.getItem('token');
            console.log('Token antes de salvar:', token);
            console.log('Token depois de salvar:', savedToken);
            
            if (!savedToken) {
                localStorage.setItem('token', JSON.stringify({ token: token }));
                const tokenObj = JSON.parse(localStorage.getItem('token'));
                if (!tokenObj || !tokenObj.token) {
                    throw new Error('Falha ao salvar o token');
                }
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenObj.token}`;
                return { ...response.data, token: tokenObj.token };
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return response.data;
        } else {
            console.error('Dados da resposta:', response.data);
            throw new Error('Token não recebido do servidor');
        }
    } catch (error) {
        console.error("Erro no login:", error);
        console.error("Formato do token recebido:", typeof response?.data?.token);
        throw error;
    }
};
