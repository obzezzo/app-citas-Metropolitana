import { useAuth } from '../context/AuthContext';
import { useCitas } from '../context/CitasContext';
import { useEffect } from 'react';
import Cita from '../components/Cita';

const MisCitasPage = () => {

  const { citas, getCitas } = useCitas();
  const { user } = useAuth();

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Mis citas médicas</h1>
          <div className="col-lg-6 mx-auto">
            <p>Hola {user.nombre}, en está sección se listan todas las citas que has registrado.</p>
          </div>
        </div>
      </div>
      <main className='px-4' >
        {
          (citas.length == 0) ? (<div className="container">
            <div className='row'>
              <div className="col-md-12 pt-4 pb-4 text-center">
                <i className="icono bi bi-info-circle-fill"></i>
                <h2 className='mensaje'>Todavía no hay<br />citas registradas.</h2>
                <p className='m-0 textogris'>Todas las citas que realices se listarán aquí<br />en caso de que desees cancelarlas.</p>
              </div>
            </div></div>
          ) : (
            <>
              <div className="tablacitas">
                <div className="container">
                  <div className='row'>
                    <div className="col-md-12 pt-4 pb-3 text-center">
                      <i className="icono bi bi-calendar2-week-fill"></i>
                      <h2 className='mensaje'>Tus citas registradas.</h2>
                    </div>
                  </div>
                </div>
                <div className="container mx-auto text-center">
                  <div className="row table-titles">
                    <div className="col-md-5">
                      Médico especialista
                    </div>
                    <div className="col-md-2">
                      Fecha
                    </div>
                    <div className="col-md-2">
                      Hora
                    </div>
                    <div className="col-md-3">
                      Acción
                    </div>
                  </div>
                  {citas.map((cita) => (
                    <Cita cita={cita} key={cita._id} />
                  ))}

                </div>
              </div>

            </>
          )
        }
      </main>
    </>
  )
}

export default MisCitasPage