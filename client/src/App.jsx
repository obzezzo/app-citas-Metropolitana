import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import UpdatedProfilePage from "./pages/UpdatedProfilePage";
import AccountSecurityPage from "./pages/AccountSecurityPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CitasMedicasPage from "./pages/CitasMedicasPage";
import RegistrarCitaPage from "./pages/RegistrarCitaPage";
import CitaRegistradaPage from "./pages/CitaRegistradaPage";
import MisCitasPage from "./pages/MisCitasPage";
import CancelarCitaPage from "./pages/CancelarCitaPage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import { CitasProvider } from "./context/CitasContext";

function App() {
  return (
    <AuthProvider>
      <CitasProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/editdata" element={<EditProfilePage />} />
              <Route path="/updateprofile" element={<UpdatedProfilePage />} />
              <Route path="/accountsecurity" element={<AccountSecurityPage />} />
              <Route path="/changepassword" element={<ChangePasswordPage />} />
              <Route path="/citasmedicas" element={<CitasMedicasPage />} />
              <Route path="/registrarcita" element={<RegistrarCitaPage />} />
              <Route path="/citaregistrada" element={<CitaRegistradaPage />} />
              <Route path="/miscitas" element={<MisCitasPage />} />
              <Route path="/cancelarcita" element={<CancelarCitaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CitasProvider>
    </AuthProvider>
  )
}

export default App
