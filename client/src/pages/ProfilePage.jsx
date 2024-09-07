
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Estilos.css';

const ProfilePage = () => {

  const { user, logout } = useAuth();

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Hospital de Clínicas Metropolitana</h1>
          <div className="col-lg-6 mx-auto">
            <p>Bienvenido a nuestro Aplicativo para agendamiento de citas médicas.</p>
          </div>
        </div>
      </div>
      <main className='container contenedor-flex px-4' >
        <div className='row'>
          <div className="col-md-12 pt-4 pb-4 text-center">
            <i className="icono bi bi-person-fill"></i>
            <h2 className='m-0 usuario'>{user.nombre}</h2>
            <h4 className='m-0 bienvenida'>Binvenid@</h4>
          </div>
          <div className="col-md-12">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center py-1">
              <Link to="/editdata" type="button" className="btn btn-primary btn-md px-4 border-0 gap-3"><i className="bi bi-person-vcard-fill"></i> Mis datos personales</Link>
              <Link to="/accountsecurity" type="button" className="btn btn-primary btn-md px-4 border-0"><i className="bi bi-key-fill"></i> Cambio de contraseña</Link>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center py-1 mb-5 pb-4">
              <Link to="/" className="btn btn-primary btn-md px-4 gap-3 border-0" onClick={() => logout()}><i className="bi bi-person-walking"></i> Cerrar sesión</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilePage