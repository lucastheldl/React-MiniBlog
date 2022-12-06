import styles from "./Navbar.module.css";
import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContex";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/React-MiniBlog/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/React-MiniBlog/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>

        {/*se nao estiver logado \/*/}
        {!user && (
          <>
            <li>
              <NavLink
                to="/React-MiniBlog/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/React-MiniBlog/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}

        {/*se nao estiver logado \/*/}
        {user && (
          <>
            <li>
              <NavLink
                to="/React-MiniBlog/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar Post
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/React-MiniBlog/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/React-MiniBlog/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logOut}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
