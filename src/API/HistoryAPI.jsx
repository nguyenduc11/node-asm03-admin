import axiosClient from './axiosClient';

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `/history/${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/history/${id}`;
    return axiosClient.get(url);
  },

  getAllHistoryData: () => {
    const url = '/history/alldata';
    return axiosClient.get(url);
  },
  getLatestHistory: () => {
    const url = '/history/latest';
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
