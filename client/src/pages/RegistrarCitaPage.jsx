import { Link, replace, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCitas } from '../context/CitasContext';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const RegistrarCitaPage = () => {

  const { errorsCitas, dataCitas, getMedicosbyId, medico, getEspecialidadById, especialidad, registrarCita } = useCitas();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMedicosbyId(dataCitas.id_medico);
    getEspecialidadById(dataCitas.id_especialidad);
  }, [])

  const id_paciente = user.id;


  const onSaveCita = handleSubmit(async (values) => {
    registrarCita(values);
    if (errorsCitas.length == 0) {
      navigate("/citaregistrada", replace);
    }
  });

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Registro de nueva cita</h1>
          <div className="col-lg-6 mx-auto">
            <p>Completa los datos de tu cita médica, selecciona un horario y guardala.</p>
          </div>
        </div>
        <main className='container contenedor-flex px-4' >
          <div className='row'>
            {
              (errorsCitas.length === 0) ? (
                <>
                  <div className="col-md-12 pt-4 text-center">
                    <i className="icono bi bi-calendar2-plus-fill"></i>
                  </div>
                  <div className="formcitas m-auto py-3">
                    <div className="row">
                      <div className="col-md-12 col-lg-12 text-center">
                        <form className="text-center" id='frmSaveCita' onSubmit={onSaveCita} >
                          <div className="row g-2">

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                                <input type="text" className="form-control" maxLength={10} id="id_paciente" placeholder="Nro. de Cédula" required value={id_paciente}
                                  {...register('id_paciente', { required: true, maxLength: 10, pattern: /^[0-9]+$/i })} />
                              </div>
                              {errors.id_paciente && <p className='badge text-bg-danger text-wrap mt-1'>Id del paciente inexistente</p>}
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-heart-pulse-fill"></i></span>
                                <input type="text" className="form-control" id="medico" placeholder="Médico" required
                                  value={medico} />
                              </div>
                              <input type="hidden" id='id_medico' value={dataCitas.id_medico}
                                {...register('id_medico', { required: true })} />
                              {errors.id_medico && <p className='badge text-bg-danger text-wrap mt-1'>Médico inexistente</p>}
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-lungs-fill"></i></span>
                                <input type="text" className="form-control" id="especialidad" placeholder="Especialidad" value={especialidad} required />
                              </div>
                              <input type="hidden" id='id_especialidad' value={dataCitas.id_especialidad}
                                {...register('id_especialidad', { required: true })} />
                              {errors.id_especialidad && <p className='badge text-bg-danger text-wrap mt-1'>Especialidad inexistente</p>}
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-calendar2-week-fill"></i></span>
                                <input type="text" className="form-control" id="fecha" value={dataCitas.fecha} placeholder="Fecha de la cita" required
                                  {...register('fecha', { required: true })} />
                              </div>
                              {errors.fecha && <p className='badge text-bg-danger text-wrap mt-1'>Fecha inexistente</p>}
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-alarm-fill"></i></span>
                                <select className="form-select" id="hora" required
                                  {...register('hora', { required: true })}>
                                  <option value="">Seleccione una hora</option>
                                  <option value="09H00">09H00 MAÑANA</option>
                                  <option value="10H00">10H00 MAÑANA</option>
                                  <option value="11H00">11H00 MAÑANA</option>
                                  <option value="12H00">12H00 TARDE</option>
                                  <option value="15H00">15H00 TARDE</option>
                                  <option value="16H00">16H00 TARDE</option>
                                  <option value="17H00">17H00 TARDE</option>
                                  <option value="18H00">18H00 TARDE</option>
                                </select>
                              </div>
                              {errors.hora && <p className='badge text-bg-danger text-wrap mt-1'>Hora no seleccionada.</p>}
                            </div>

                            <input type="hidden" id='id_estado' value="EST01"
                              {...register('id_estado', { required: true })} />
                            {errors.id_estado && <p className='badge text-bg-danger text-wrap mt-1'>Estado inexistente</p>}

                          </div>
                          <button className="btn btn-primary w-100 py-2 mt-2 border-0" type="submit"><i className="bi bi-floppy-fill"></i> &nbsp;GUARDAR CITA MÉDICA</button>
                        </form>
                      </div>
                    </div >
                  </div >
                </>

              ) : (
                <div className="col-md-12 pt-4 pb-4 text-center">
                  <i className="iconoerror bi bi-x-circle-fill"></i>
                  <h2 className='mensajeerror'>{errorsCitas}</h2>
                </div>
              )
            }
            <div className="col-md-12 pb-5 mb-2">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center py-1">
                <Link to="/citasmedicas" className="btn btn-primary btn-md px-4 gap-3 border-0"><i className="bi bi-caret-left-fill"></i> CANCELAR REGISTRO</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}

export default RegistrarCitaPage