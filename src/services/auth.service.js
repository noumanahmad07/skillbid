import api from './api';

export const authService = {
  login: async (email, password) => {
    // For now, using mock logic in store, but structure is here
    // const { data } = await api.post('/auth/login', { email, password });
    // return data;
    return { ok: true };
  },
  
  register: async (data) => {
    // const { data: response } = await api.post('/auth/register', data);
    // return response;
    return { ok: true };
  },
  
  me: async () => {
    // const { data } = await api.get('/auth/me');
    // return data;
    return { ok: true };
  }
};
