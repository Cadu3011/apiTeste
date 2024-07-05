import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginFilial =[
  {
    filialId: '1',
    senha: '123'
  },
  {
    filialId: '2',
    senha: '1234'
  }
]
const LoginConferencia ={
  login:'admin',
  senha:'cadu3030'
}
const Login = () => {
  const [filial, setFilial] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let autenticado = false
    for(let i=0;i<LoginFilial.length;i++){ 
      if (filial === LoginFilial[i].filialId && senha === LoginFilial[i].senha) {
        autenticado =true
        navigate(`/dashboard?filial=${filial}`);
        break
      }if(filial ===LoginConferencia.login && senha === LoginConferencia.senha){
        autenticado =true
        navigate('/conferencia');
       break 
      } 
    }
    
    if (!autenticado) {
      alert('Filial ou senha incorretos!');
    }
  }
  

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Filial:
          <input 
            type="text" 
            value={filial} 
            onChange={(e) => setFilial(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Senha:
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            
          />
        </label>
      </div>
      <button onClick={handleLogin} >Login</button>
    </div>
  );
};

export default Login;
