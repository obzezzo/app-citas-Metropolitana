
import { useCitas } from '../context/CitasContext';
import { replace, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Cita = ({ cita }) => {

  const { citas, cancelarCita, errorDel, getMedicosbyId, medico } = useCitas();
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getMedicosbyId(cita.id_medico);
  }, []);

  const DeleteCita = (values) => {
    cancelarCita(values);
    if (errorDel.length == 0) {
      navigate("/cancelarcita", replace);
    }
  };

  return (
    <div className="row table-filas text-center">
      <div className="col-md-5">
        {medico}
      </div>
      <div className="col-md-2">
        {cita.fecha}
      </div>
      <div className="col-md-2">
        {cita.hora}
      </div>
      <div className="col-md-3">
        <button className="btn btn-primary w-100 py-2 mt-2 border-0" onClick={() => { DeleteCita(cita._id) }}><i className="bi bi-trash3-fill"></i> Cancelar cita</button>
      </div>
    </div>
  )
}

export default Cita