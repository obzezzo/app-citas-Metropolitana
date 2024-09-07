
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <main className='container-fluid menu'>
          <header className="d-flex align-items-center justify-content-center justify-content-md-around py-2">
            <div className="col-md-3 mb-2 mb-md-0">
              <a href="/profile" className="d-inline-flex link-body-emphasis text-decoration-none">
                <img src="/logo.png" alt="APP CITAS MÉDICAS" className="logo img-fluid d-none d-sm-block" />
              </a>
            </div>
            <ul className="nav col-12 col-md-auto col-sm-12 col-xs-12 mb-2 justify-content-center mb-md-0">
              <li><Link to="/profile" className="opcionlink"><i className="bi bi-person-fill"></i> Mi cuenta</Link></li>
              <li><Link to="/citasmedicas" className="opcionlink"><i className="bi bi-plus-circle-fill"></i> Citas Médicas</Link></li>
              <li><Link to="/miscitas" className="opcionlink"><i className="bi bi-calendar2-week-fill"></i> Mis citas</Link></li>
              <li><Link to="/" className="opcionlink" onClick={() => logout()}><i className="bi bi-person-walking"></i> Salir</Link></li>
            </ul>

          </header>
        </main>
      ) : (
        <div></div>
      )
      }
    </div>


  );
}

export default Navbar