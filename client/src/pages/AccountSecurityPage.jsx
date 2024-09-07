import { useAuth } from '../context/AuthContext';
import { Link, replace, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AccountSecurityPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, updatePassword, errors: securityErrors } = useAuth();

  const onChangePassword = handleSubmit(async (values) => {
    updatePassword(values);
    if (securityErrors.length == 0) {
      navigate("/changepassword", replace);
    }

  });


  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Cambio de contraseña</h1>
          <div className="col-lg-6 mx-auto">
            <p>Hola {user.nombre}, recuerda guardar tu contraseña en un lugar seguro y no compartirla con nadie</p>
          </div>
        </div>

        <main className="updatepassword m-auto py-5">
          <div className="row">
            <div className="col-md-12 col-lg-12 text-center">
              <form className="text-center" id='frmPassword' onSubmit={onChangePassword} >
                <div className="row g-2">

                  <div className="col-md-5 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                      <input type="text" className="form-control" maxLength={10} id="usuario" value={user.id} disabled placeholder="Nro. de Cédula" required />
                    </div>
                  </div>

                  <div className="col-md-7 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-input-cursor-text"></i></span>
                      <input type="text" className="form-control" disabled id="nombrecompleto" value={user.nombre} maxLength={64} placeholder="Nombre completo" required />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                      <input type="password" className="form-control" autoFocus maxLength={20} id="currentPassword" placeholder="Contraseña Actual" required
                        {...register('currentPassword', { required: true, maxLength: 20, minLength: 8 })} />
                    </div>
                    {errors.password && <p className='badge text-bg-danger text-wrap mt-1'>La contraseña debe tener entre 8 y 20 carácteres.</p>}
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                      <input type="password" className="form-control" maxLength={20} id="password" placeholder="Nueva Contraseña" required
                        {...register('password', { required: true, maxLength: 20, minLength: 8 })} />
                    </div>
                    {errors.password && <p className='badge text-bg-danger text-wrap mt-1'>La contraseña debe tener entre 8 y 20 carácteres.</p>}
                  </div>
                </div>
                <button className="btn btn-primary w-100 py-2 mt-2" type="submit"><i className="bi bi-floppy-fill"></i> Cambiar contraseña</button>
                {
                  <p className='badge text-bg-danger rounded-pill text-wrap mt-1 mb-0'>{securityErrors}</p>
                }
                <p className="mt-2 mb-3 text-body-secondary">¿Quieres actualizar tus datos? <Link to="/editdata">Modificar datos</Link></p>
              </form>
            </div>
          </div >
        </main >
      </div>

    </>
  )
}

export default AccountSecurityPage