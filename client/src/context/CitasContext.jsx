import { createContext, useContext, useState } from "react";
import { cancelarCitaRequest, getCitasRequest, getEspecialidadByIdRequest, getMedicosbyEsRequest, getMedicosbyIdRequest, registrarCitaRequest } from '../api/citas';
import { getEspecialidadesRequest } from "../api/especialidades";


const CitasContext = createContext();

export const useCitas = () => {
  const context = useContext(CitasContext);

  if (!context) {
    throw new Error("useCitas must be used within a CitasProvider");
  }

  return context;
}

export function CitasProvider({ children }) {

  const [citas, setCitas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicosEs, setMedicosEs] = useState([]);
  const [dataCitas, setDataCitas] = useState([]);
  const [citaReg, setCitaReg] = useState([]);
  const [medico, setMedico] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [errorDel, setErrorDel] = useState("");
  const [errors, setErrors] = useState("");
  const [errorsCitas, setErrorsCitas] = useState("");
  const [errorsReg, setErrorsReg] = useState("");

  const getCitas = async () => {
    try {
      const res = await getCitasRequest();
      setCitas(res.data);
    } catch (error) {
      setCitas([]);
      setErrors(error.response.data.message);
    }
  }

  const getEspecialidades = async () => {
    try {
      const res = await getEspecialidadesRequest();
      setEspecialidades(res.data);
      return (res.data);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const getMedicosbyId = async (id_medico) => {
    try {
      const res = await getMedicosbyIdRequest(id_medico);
      setMedico(res.data.nombre_completo);
      return (res.data.nombre_completo);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const getMedicosbyEspecialidad = async (id_especialidad) => {
    try {
      const res = await getMedicosbyEsRequest(id_especialidad);
      setMedicosEs(res.data);
      setErrorsReg([]);
      return (res.data);
    } catch (error) {
      setErrorsReg(error.response.data.message);
    }
  }

  const getEspecialidadById = async (id_especialidad) => {
    try {
      const res = await getEspecialidadByIdRequest(id_especialidad);
      setEspecialidad(res.data.nombre);
      return (res.data);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const registrarCita = async (data) => {
    try {
      const res = await registrarCitaRequest(data);
      setCitaReg(res.data);
      return (res.data);
    } catch (error) {
      setErrorsReg(error.response.data.message);
    }
  }

  const cancelarCita = async (id) => {
    try {
      const res = await cancelarCitaRequest(id);
      console.log(res.data);
      setErrorDel([]);
      return (res.data);
    } catch (error) {
      setErrorDel(error.response.data.message);
    }

  }

  const getDataCitas = async (data) => {
    try {
      setDataCitas(data);
      return (data);
    } catch (error) {
      setErrorsCitas(error.response.data.message);
    }
  }

  return (
    <CitasContext.Provider value={{
      citas,
      registrarCita,
      cancelarCita,
      getCitas,
      getMedicosbyId,
      getEspecialidades,
      getMedicosbyEspecialidad,
      getDataCitas,
      getEspecialidadById,
      citaReg,
      especialidad,
      dataCitas,
      especialidades,
      medico,
      medicosEs,
      errors,
      errorsCitas,
      errorsReg,
      errorDel,
    }}>
      {children}
    </CitasContext.Provider>
  )
}