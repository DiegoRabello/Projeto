import UseConcursos from "../../hooks/UseConcurso";
import { useFavoritos } from "../../hooks/useFavoritos";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from "./ConcursoList.module.css";

const ConcursoList = () => {
  const { concursos, loading } = UseConcursos();
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();

  const handleFavorito = (e, concurso) => {
    e.preventDefault();
    console.log('Concurso a ser salvo:', concurso);

    if (isFavorito(concurso.id)) {
      removerFavorito(concurso.id);
    } else {
      adicionarFavorito({
        id: concurso.id,
        name: concurso.name,
        link: concurso.link,
        banca: concurso.banca,
        salario: concurso.salario,
        vagas: concurso.vagas,
        escolaridade: concurso.escolaridade
      });
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Concursos</h1>
      <div className={styles.concursoGrid}>
        {concursos.map((concurso) => (
          <div key={concurso.id} className={styles.concursoCard}>
            <div className={styles.cardContent}>
              <a
                href={concurso.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.concursoLink}
              >
                <h3 className={styles.concursoName}>{concurso.name}</h3>
              </a>
              <button
                onClick={(e) => handleFavorito(e, concurso)}
                className={`${styles.favoritoBtn} ${isFavorito(concurso.id) ? styles.favorito : ''}`}
                aria-label={isFavorito(concurso.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                {isFavorito(concurso.id) ? 
                  <AiFillHeart className={styles.heartIcon} /> : 
                  <AiOutlineHeart className={styles.heartIcon} />
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcursoList;
