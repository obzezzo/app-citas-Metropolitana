import { useForm } from 'react-hook-form';
import '../pages/RegisterPage.css';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const { register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated])

  const onRegister = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="contenedor align-items-center py-4 container">
      <main className="form-signup m-auto">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center">
            <img src='/favicon.png' className='img-fluid mb-3'></img>
            <form className="text-center" id='frmRegister' onSubmit={onRegister}>
              <div className="row g-2">

                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-circle"></i></span>
                    <input type="text" className="form-control" maxLength={10} id="usuario" autoFocus placeholder="Nro. de Cédula" required
                      {...register('id_paciente', { required: true, maxLength: 10, pattern: /^[0-9]+$/i })} />
                  </div>
                  {errors.id_paciente && <p className='badge text-bg-danger text-wrap mt-1'>Ingrese un número de cédula valido.</p>}
                </div>

                <div className="col-md-8 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-input-cursor-text"></i></span>
                    <input type="text" className="form-control" id="nombrecompleto" maxLength={64} placeholder="Nombre completo" required {...register('nombre_completo', { required: true, maxLength: 64, pattern: /^[a-zA-ZÁáÉéIíÓóÚúÑñ ]+$/i })} />
                  </div>
                  {errors.nombre_completo && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Ingrese un nombre valido.</p>}
                </div>


                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
                    <select className="form-select" id="provincia" required
                      {...register('id_provincia', { required: true })}>
                      <option value="">Provincia/Estado</option>
                      <option>Imbabura</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
                    <select className="form-select" id="canton" required
                      {...register('id_canton', { required: true })} >
                      <option value="">Cantón/Ciudad</option>
                      <option>Ibarra</option>
                    </select>
                  </div>
                </div>


                <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-fill"></i></span>
                    <input type="text" className="form-control" id="direccion" maxLength={100} placeholder="Dirección completa" required  {...register('direccion', { required: true, maxLength: 100 })} />
                  </div>
                  {errors.direccion && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Ingrese una dirección valida.</p>}
                </div>

                <div className="col-md-8 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                    <input type="email" className="form-control" maxLength={48} id="email" placeholder="Correo electrónico" required
                      {...register('email', { required: true, maxLength: 48 })} />
                  </div>
                </div>

                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                    <input type="text" className="form-control" id="telefono" maxLength={10} placeholder="Teléfono" required
                      {...register('telefono', { required: true, maxLength: 10, pattern: /^[0-9]+$/i })} />
                  </div>
                  {errors.telefono && <p className='badge text-bg-danger text-wrap mt-1 mb-0'>Ingrese un teléfono valido.</p>}
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input type="password" className="form-control" maxLength={20} id="password" placeholder="Contraseña" required
                      {...register('password', { required: true, maxLength: 20, minLength: 8 })} />
                  </div>
                  {errors.password && <p className='badge text-bg-danger text-wrap mt-1'>La contraseña debe tener entre 8 y 20 carácteres.</p>}
                </div>

                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input type="password" className="form-control" id="passwordverify" maxLength={20} placeholder="Confirmar contraseña" required />
                  </div>
                </div>
                <input type='hidden' value={"EST01"} {...register('id_estado', { required: true })} ></input>
              </div>
              <button className="btn btn-primary w-100 py-2 mt-2" type="submit"><i className="bi bi-person-fill-add"></i> Registrar cuenta</button>
              {
                <p className='badge text-bg-danger rounded-pill text-wrap mt-1 mb-0'>{registerErrors}</p>
              }
              <p className="mt-2 mb-3 text-body-secondary">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </form>
          </div>
        </div >
      </main >
    </div >
  )
}

export default RegisterPage