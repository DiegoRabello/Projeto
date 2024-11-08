import { useState, useEffect } from "react";
import axios from "axios";

const useConcursos = () => {
  const [concursos, setConcursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcursos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/concursos"
        );
        const concursosComId = response.data.map((concurso, index) => ({
          ...concurso,
          id: concurso.id || `concurso-${index}`
        }));
        setConcursos(concursosComId);
      } catch (error) {
        console.error("Erro ao buscar concursos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConcursos();
  }, []);

  return { concursos, loading };
};

export default useConcursos;
