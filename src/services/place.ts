import axios, { AxiosRequestConfig } from 'axios';

class Place {
  private headerOptions: AxiosRequestConfig = {
    headers: {
      'x-rapidapi-host': process.env.REACT_APP_API_HOST,
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
    },
  };

  async getPlaces(
    searchQuery: string,
    offset?: number,
    limit?: number,
  ): Promise<any[]> {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_API_HOST}/v1/geo/cities`,
        {
          ...this.headerOptions,
          params: {
            namePrefix: searchQuery,
            limit: limit || 5,
            offset: offset || 0,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }
}

const PlaceService = new Place();
export default PlaceService;
