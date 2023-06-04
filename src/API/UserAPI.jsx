import axiosClient from './axiosClient';

const UserAPI = {
  getAllUsers: () => {
    const url = '/users/all';
    return axiosClient.get(url);
  },
  getAllUsersData: () => {
    const url = '/users/alldata';
    return axiosClient.get(url);
  },
  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
  postSignIn: (data) => {
    const url = `/users/signin`;
    return axiosClient.post(url, data);
    // return axiosClient.post(url, { withCredentials: true });
  },
  postSignOut: () => {
    const url = `/users/signout`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
