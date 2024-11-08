import styles from "./Modal.module.css";
console.log("Styles:", styles);
import { useState } from "react";
import PropTypes from "prop-types";

export function Modal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email: ", email, "password: ", password);
  };
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h1 className={styles.title}>Entre na sua conta</h1>
        <p className={styles.subtitle}>
          Seja bem-vindo! É muito bom ter você aqui :) Pronto para começar sua
          preparação?
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
        <div className={styles.divider}></div>
        <p className={styles.createAccount}>
          Não tem uma conta?{" "}
          <a className={styles.createAccountLink} href="#">
            Crie uma conta
          </a>
        </p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
