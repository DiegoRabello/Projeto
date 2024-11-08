import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { MagnifyingGlass, Sun, Moon } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles.imagem}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <ul className={styles.listHeader}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>

        <li>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>
        </li>

        <li>
          <button
            className={styles.loginButton}
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        </li>

        <li>
          <div className={styles.searchBar}>
            <MagnifyingGlass size={20} className={styles.icon} />
            <input
              type="text"
              placeholder="Procure seus concursos"
              className={styles.input}
            />
          </div>
        </li>
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
