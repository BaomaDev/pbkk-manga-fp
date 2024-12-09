import api from './api';

const MangaService = {
  getAll: async () => {
    const response = await api.get('/manga');
    return response.data.data;  // Ensure correct data structure
  },

  getOne: async (id) => {
    const response = await api.get(`/manga/${id}`);
    return response.data;
  },

  create: async (manga) => {
    const response = await api.post('/manga', manga);
    return response.data;
  },

  update: async (id, manga) => {
    const response = await api.put(`/manga/${id}`, manga);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/manga/${id}`);
    return response.data;
  },
};

export default MangaService;
