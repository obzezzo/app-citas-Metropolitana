import { useAuth } from '../context/AuthContext';
import { useNavigate, replace } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCitas } from '../context/CitasContext';
import { useEffect, useState, forwardRef } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

const CitasMedicasPage = () => {

  const { getEspecialidades, especialidades, getMedicosbyEspecialidad, getDataCitas, errorsCitas } = useCitas();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getEspecialidades();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [fechaInicial, setFechaInicial] = useState(new Date());

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className, onChange }, ref) => (
      <input className={className} onClick={onClick} onChange={onChange} ref={ref} value={value} size={10} {...register('fecha', { required: true })} />
    ),
  );

  const isWeekday = (date) => {
    const day = date.getDay(date);
    return day !== 0 && day !== 6;
  };

  const [esp, setEsp] = useState("ESP01");
  const [meds, setMeds] = useState([]);

  const getMedicosEsp = async (data) => {
    const res = await getMedicosbyEspecialidad(data);
    setMeds(res);
  }

  const onRegistrarCita = handleSubmit(async (values) => {
    getDataCitas(values);
    if (errorsCitas.length == 0) {
      navigate("/registrarcita", replace);
    }
  });

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Agendamiento de citas médicas</h1>
          <div className="col-lg-6 mx-auto">
            <p>Hola {user.nombre}, selecciona la especialidad, la fecha y luego selecciona el médico con el que desees agendar.</p>
          </div>
        </div>
      </div>
      <main className='px-4' >
        <div className="container">
          <div className='row'>
            <div className="col-md-12 pt-4 pb-4 text-center">
              <i className="icono bi bi-calendar2-plus-fill"></i>
            </div>
          </div>
        </div>
        <div className="container w-100 registrarcitas">
          <div className="row">
            <form className="text-center" id='frmRegister' onSubmit={onRegistrarCita}>
              <div className="row d-flex row-cols-auto g-2 justify-content-center">
                <div className="col">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-plus-circle-fill"></i></span>
                    <select className="form-select" id="id_especialidad" required
                      {...register('id_especialidad', { required: true })} onChange={(e) => setEsp(e.target.value)}>

                      {especialidades.map((data) => (
                        <option key={data._id} value={data.id_especialidad}>
                          {data.nombre}
                        </option>
                      ))
                      }

                    </select>
                  </div>
                  {errors.id_especialidad && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Seleccione una especialidad.</p>}
                </div>

                <div className="col">

                  <div className="input-group align-items-center">
                    <label >
                      <strong>Fecha:&nbsp;</strong>
                    </label>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      minDate={fechaInicial}
                      onChange={(date) => setStartDate(date)}
                      filterDate={isWeekday}
                      customInput={<ExampleCustomInput className="example-custom-input" />}
                      id='fecha'
                      locale="es"
                      withPortal
                    />
                  </div>
                </div>

                <div className="col">
                  <a className="btn btn-primary w-81 border-0 py-2 " onClick={() => getMedicosEsp(esp)}><i className="bi bi-heart-pulse-fill"></i> Buscar médico</a>
                </div>

              </div>
              <div className="row">
                {meds?.map((data) => (
                  <div key={data._id} className="col-md-3 col-sm-12 col-xs-12 pt-4 pb-4 text-center">
                    <img src={data.avatar} alt="Médico Especialista" className='img-fluid rounded-img' />
                    <p className='mt-2 mb-1 nombremedico py-1'><strong>{data.nombre_completo}</strong></p>
                    <input type='hidden' id='id_medico' value={data.id_medico} {...register('id_medico', { required: true })} />
                    <button className="btn btn-primary w-81 border-0 py-2 mt-2" type="submit"><i className="bi bi-check-circle-fill"></i> Seleccionar Médico</button>
                  </div>
                ))
                }


              </div>

            </form>
          </div>
        </div>
      </main>
    </>

  )
}

export default CitasMedicasPage