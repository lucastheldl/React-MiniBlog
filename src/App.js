import "./App.css";

//config
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//Context
import { AuthProvider } from "./context/AuthContex";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/React-MiniBlog" element={<Home />} />

              <Route path="/React-MiniBlog/about" element={<About />} />
              <Route path="/React-MiniBlog/search" element={<Search />} />
              <Route path="/React-MiniBlog/posts/:id" element={<Post />} />

              <Route
                path="/React-MiniBlog/login"
                element={!user ? <Login /> : <Navigate to="/React-MiniBlog/" />}
              />

              <Route
                path="/React-MiniBlog/register"
                element={
                  !user ? <Register /> : <Navigate to="/React-MiniBlog/" />
                }
              />
              <Route
                path="/React-MiniBlog/posts/edit/:id"
                element={
                  user ? <EditPost /> : <Navigate to="/React-MiniBlog/login" />
                }
              />

              <Route
                path="/React-MiniBlog/posts/create"
                element={
                  user ? (
                    <CreatePost />
                  ) : (
                    <Navigate to="/React-MiniBlog/login" />
                  )
                }
              />

              <Route
                path="/React-MiniBlog/dashboard"
                element={
                  user ? <Dashboard /> : <Navigate to="/React-MiniBlog/login" />
                }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
