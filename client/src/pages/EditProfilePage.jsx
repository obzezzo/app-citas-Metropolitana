import { useAuth } from '../context/AuthContext';
import { Link, replace, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const EditProfilePage = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user, updateProfile, errors: updateErrors } = useAuth();
  const navigate = useNavigate();
  console.log(user)

  setValue('direccion', user.direccion);
  setValue('email', user.email);
  setValue('telefono', user.telefono);

  const onUpdateProfile = handleSubmit(async (values) => {
    updateProfile(values);
    if (updateErrors.length == 0) {
      navigate("/updateprofile", replace);
    }

  });

  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="hero px-4 py-3 text-center text-light">
          <img className="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="auto" />
          <h1 className="display-5 fw-bold text-light">Tus datos personales</h1>
          <div className="col-lg-6 mx-auto">
            <p>Hola {user.nombre}, actualiza tus datos registrados de ser necesario.</p>
          </div>
        </div>

        <main className="updatedata m-auto py-5">
          <div className="row">
            <div className="col-md-12 col-lg-12 text-center">
              <form className="text-center" id='frmEditProfile' onSubmit={onUpdateProfile}>
                <div className="row g-2">

                  <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                      <input type="text" className="form-control" maxLength={10} id="usuario" value={user.id} disabled placeholder="Nro. de Cédula" required />
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-input-cursor-text"></i></span>
                      <input type="text" className="form-control" disabled id="nombrecompleto" value={user.nombre} maxLength={64} placeholder="Nombre completo" required />
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-geo-fill"></i></span>
                      <input type="text" className="form-control" autoFocus id="direccion" maxLength={100} required
                        {...register('direccion', { required: true, maxLength: 100 })} />
                    </div>
                    {errors.direccion && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Ingrese una dirección valida.</p>}
                  </div>

                  <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                      <input type="email" className="form-control" maxLength={48} id="email" required
                        {...register('email', { required: true, maxLength: 48 })} />
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12 col-xs-12">
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                      <input type="text" className="form-control" id="telefono" maxLength={10} required
                        {...register('telefono', { required: true, maxLength: 10, pattern: /^[0-9]+$/i })} />
                    </div>
                    {errors.telefono && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Ingrese un teléfono valido.</p>}
                  </div>

                </div>
                <button className="btn btn-primary w-100 py-2 mt-2" type="submit"><i className="bi bi-floppy-fill"></i>  Guardar cambios</button>
                {
                  <p className='badge text-bg-danger rounded-pill text-wrap mt-1 mb-0'>{updateErrors}</p>
                }
                <p className="mt-2 mb-3 text-body-secondary">¿Quieres cambiar tu contraseña? <Link to="/accountsecurity">Ir a cambiar contraseña</Link></p>
              </form>
            </div>
          </div >
        </main >
      </div>
    </>
  )
}

export default EditProfilePage