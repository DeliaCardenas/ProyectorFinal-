import { BrowserRouter, Routes, Route } from "react-router-dom"
import {AuthProvider, useAuth} from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'


import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from './ProtectedRoute'
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import {Layout} from "./components/Layout";
import Footer from "./components/footer";


function App() {


  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Layout>
            <Navbar/>
              <Routes>
                <Route path="/" element = {<HomePage/>} />
                <Route path="/login" element = {<LoginPage/>} />
                <Route path="/register" element = {<RegisterPage/>} />

              <Route element = {<ProtectedRoute/>}>
                  <Route path="/tasks" element = {<TasksPage/>} />
                  <Route path="/add-task" element = {<TaskFormPage/>} />
                  <Route path="/tasks/:id" element = {<TaskFormPage/>} />
                  <Route path="/profile" element = {<ProfilePage/>} />
                </Route>
              </Routes>
            <Footer/>
          </Layout>
          
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App