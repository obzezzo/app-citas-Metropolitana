import axios from './axios.js';

export const getCitasRequest = () => axios.post(`/miscitas`);
export const registrarCitaRequest = (data) => axios.post(`/citaregistrada`, data);
export const cancelarCitaRequest = (id) => axios.delete(`/cancelarcita/${id}`);

export const getMedicosbyIdRequest = (data) => axios.post(`/medicosbyid`, `id_medico=${data}`);
export const getMedicosbyEsRequest = (data) => axios.post(`/medicosporespecialidad`, `id_especialidad=${data}` );
export const getEspecialidadByIdRequest = (data) => axios.post(`/getespecialidadesbyid`, `id_especialidad=${data}` );