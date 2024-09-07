import { Link } from 'react-router-dom';

const CancelarCitaPage = () => {
  return (

    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Cancelación de citas</h1>
          <div className="col-lg-6 mx-auto">
          </div>
        </div>
        <main className='container px-4' >

          <div className='row'>
            <div className="col-md-12 pt-4 pb-2 text-center">
              <i className="icono bi bi-check-circle-fill"></i>
              <h2 className='mensaje'>Cita médica cancelada<br />correctamente!!!</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/miscitas" className="btn btn-primary btn-md px-4 gap-3 border-0"><i className="bi bi-caret-left-fill"></i> Regresar a mis citas</Link>
              </div>
            </div>
          </div>

        </main>
      </div>

    </>

  )
}

export default CancelarCitaPage