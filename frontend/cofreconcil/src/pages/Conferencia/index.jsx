import React, { useState  } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:3000/filiais/'; // Substitua pela URL correta da sua API

function Conferencia(){
  const [filial, setFilial] = useState('');
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setFilial(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL);
      console.log('Resposta da API:', response); // Verifica o que está sendo recebido da API

      if (response.status !== 200) {
        throw new Error('Erro ao buscar dados da API');
      }

      const data = response.data;
      console.log('Dados recebidos:', data); // Verifica os dados recebidos da API

      // Encontrar a filial específica no array
      let filialEncontrada = null;
      if (data && data.filiais && data.filiais.length > 0) {
        filialEncontrada = data.filiais[0].find(item => item.filial === parseInt(filial));
      }

      if (filialEncontrada) {
        setDados(filialEncontrada);
      } else {
        throw new Error('Filial não encontrada');
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Dados da Filial</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Número da Filial:
          <input
            type="text"
            value={filial}
            onChange={handleInputChange}
            placeholder="Digite o número da filial..."
          />
        </label>
        <button type="submit" disabled={loading}>Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}

      {dados && (
        <div>
          <h2>Dados da Filial {dados.filial}</h2>
          <ul>
            <li><strong>Saldo:</strong> {dados.saldo}</li>
            <li><strong>Caixas:</strong> {dados.caixas !== null ? dados.caixas : 'Não disponível'}</li>
            <li><strong>Depósito:</strong> {dados.deposito !== null ? dados.deposito : 'Não disponível'}</li>
            <li><strong>Despesa:</strong> {dados.despesa !== null ? dados.despesa : 'Não disponível'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Conferencia