import axios from 'axios';

interface Company {
  id: string;
  name: string;
}

export const api = {
  async getCompanies() {
    try {
      const response = await axios.get<Company[]>('https://fake-api.tractian.com/companies');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      return [];
    }
  },

  async getAssets(companyId: string) {
    try {
      const response = await axios.get(`https://fake-api.tractian.com/companies/${companyId}/assets`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar assets:', error);
      return [];
    }
  },

  async getLocations(companyId: string) {
    try {
      const response = await axios.get(`https://fake-api.tractian.com/companies/${companyId}/locations`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar locations:', error);
      return [];
    }
  }
}; 