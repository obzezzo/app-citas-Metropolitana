import { useForm } from 'react-hook-form';
import '../pages/LoginPage.css';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, replace, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile", replace);
  }, [isAuthenticated]);


  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });
  return (
    <div className=" contenedor d-flex align-items-center py-4">
      <main className="form-signin w-100 m-auto">
        <form className="w-100 m-auto text-center" onSubmit={onSubmit}>
          <img src='/favicon.png' className='img-fluid mb-3'></img>
          <div className="form-floating">
            <input type="text" className="form-control" id="usuario" autoFocus placeholder="1002003000" maxLength={10} required
              {...register('id_paciente', { required: true, maxLength: 10, pattern: /^[0-9]+$/i })} />
            <label htmlFor="usuario"><i className="bi bi-person-fill"></i> Nro de cédula</label>
            {errors.id_paciente && <p className='badge text-bg-danger text-wrap mt-1'>Ingrese un número de cédula valido.</p>}
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="passwordfield" maxLength={20} placeholder='12345678' required
              {...register('password', { required: true, maxLength: 20, minLength: 8 })} />
            <label htmlFor="passwordfield"><i className="bi bi-lock-fill"></i> Contraseña</label>
            {errors.password && <p className='badge text-bg-danger text-wrap mt-1'>La contraseña debe tener entre 8 y 20 carácteres.</p>}
          </div>

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit"><i className="bi bi-box-arrow-in-right"></i> Iniciar sesión</button>
          {
            <p className='badge text-bg-danger rounded-pill text-wrap mt-1 mb-0'>{signinErrors}</p>
          }
          <p className="mt-2 mb-3 text-body-secondary">¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link></p>
        </form>
      </main>
    </div>
  )
}

export default LoginPage