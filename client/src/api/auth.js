import axios from './axios.js';

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);

export const updatePasswordRequest = (user) => axios.post(`/profile/changepassword`, user);
export const updateProfileRequest = (user) => axios.post(`/profile/updateprofile`, user);

export const verifyTokenRequest = () => axios.post('/verify');