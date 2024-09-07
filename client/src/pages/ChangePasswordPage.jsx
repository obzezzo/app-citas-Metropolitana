import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChangePasswordPage = () => {

  const { user, errorup } = useAuth();

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Cambio de contraseña</h1>
          <div className="col-lg-6 mx-auto">
          </div>
        </div>
        <main className='container contenedor-flex px-4' >
          <div className='row'>
            {
              (errorup.length === 0) ? (
                <div className="col-md-12 pt-4 pb-4 text-center">
                  <i className="icono bi bi-check-circle-fill"></i>
                  <h2 className='mensaje'>Contraseña actualizada<br />correctamente!!!</h2>
                  <h4 className='m-0 bienvenida'>{user.nombre}</h4>
                </div>
              ) : (
                <div className="col-md-12 pt-4 pb-4 text-center">
                  <i className="iconoerror bi bi-x-circle-fill"></i>
                  <h2 className='mensajeerror'>{errorup}</h2>
                </div>
              )
            }
            <div className="col-md-12">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center py-1">
                <Link to="/profile" className="btn btn-primary btn-md px-4 gap-3 border-0"><i className="bi bi-caret-left-fill"></i> Regresar al perfil</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}

export default ChangePasswordPage