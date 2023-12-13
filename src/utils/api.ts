import axios from 'axios';

export class Api {
  constructor() {}

  get(url: string, data?: any): Promise<any> {
    return axios.get(url, { data }).then(response => response.data);
  }

  post(url: string, data: any): Promise<any> {
    return axios.post(url, { data }).then(response => response.data);
  }

  put(url: string, data: any): Promise<any> {
    return axios.put(url, { data }).then(response => response.data);
  }

  delete(url: string, data?: any): Promise<any> {
    return axios.delete(url, { data }).then(response => response.data);
  }
}
