import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const query = new URLSearchParams(useLocation().search);
  const filialNumber = query.get('filial');
  const filial = Number(filialNumber)
  const [saldo, setSaldo] = useState('');
  const [caixas, setCaixas] = useState('');
  const [deposito, setDeposito] = useState('');
  const [despesa, setDespesa] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      filial,
      saldo,
      caixas,
      deposito,
      despesa
    };

    try {
      const response = await fetch('http://localhost:3000/filiais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Dados enviados com sucesso!');
        // Limpar os campos do formulário
        setSaldo('');
        setCaixas('');
        setDeposito('');
        setDespesa('');
      } else {
        alert('Falha ao enviar dados. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Fechamento de cofre</h2>
      <p>Bem-vindo ao fechamento de cofre filial {filial}!</p>
      
      <form onSubmit={handleSubmit} >
        <label>
          Saldo:
          <input 
            type="number" 
            value={saldo} 
            onChange={(e) => setSaldo(e.target.value)} 
          />
        </label>
        <label>
          Caixas:
          <input 
            type="number" 
            value={caixas} 
            onChange={(e) => setCaixas(e.target.value)} 
          />
        </label>
        <label>
          Depósito:
          <input 
            type="number" 
            value={deposito} 
            onChange={(e) => setDeposito(e.target.value)} 
          />
        </label>
        <label>
          Despesa:
          <input 
            type="number" 
            value={despesa} 
            onChange={(e) => setDespesa(e.target.value)} 
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Dashboard;
