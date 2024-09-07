import axios from './axios.js';


export const getEspecialidadesRequest = (data) => axios.post(`/getespecialidades`, data);