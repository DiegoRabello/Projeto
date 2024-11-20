import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { MagnifyingGlass, Sun, Moon, User } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { authService } from "../../services/ApiLogin/apiLogin"; 

export function Header() {
  // Estados para controlar o modal de login, status de autenticação e nome do usuário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [username, setUsername] = useState("");
  // Hook personalizado para gerenciar o tema (claro/escuro)
  const { isDarkMode, toggleTheme } = useTheme();

  // Efeito para verificar o status de autenticação ao montar o componente
  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  // Função executada após login bem-sucedido
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setIsModalOpen(false);
  };

  // Função para realizar o logout do usuário
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className={styles.container}>
      {/* Logo com link para a página inicial */}
      <div className={styles.imagem}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Lista de navegação principal */}
      <ul className={styles.listHeader}>
        {/* Link para a página inicial */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Link para a página de favoritos */}
        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>

        {/* Botão para alternar entre tema claro e escuro */}
        <li>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>
        </li>

        {/* Área de usuário: mostra informações do usuário ou botão de login */}
        <li>
          {isLoggedIn ? (
            // Se estiver logado, mostra ícone e nome do usuário
            <div className={styles.userInfo} onClick={handleLogout}>
              <User size={24} weight="fill" className={styles.userIcon} />
              <span className={styles.username}>{username}</span>
            </div>
          ) : (
            // Se não estiver logado, mostra botão de login
            <button
              className={styles.loginButton}
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          )}
        </li>
      </ul>
      {/* Modal de login que é exibido quando isModalOpen é true */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
