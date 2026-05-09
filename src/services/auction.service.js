import api from './api';

export const auctionService = {
  getAuctions: async (params) => {
    // const { data } = await api.get('/auctions', { params });
    // return data;
    return [];
  },
  
  getAuction: async (id) => {
    // const { data } = await api.get(`/auctions/${id}`);
    // return data;
    return null;
  },
  
  createAuction: async (data) => {
    // const { data: response } = await api.post('/auctions', data);
    // return response;
    return { ok: true };
  }
};
