import express from 'express'
import pool  from'./db.js'
import cors  from 'cors';

const app = express()
app.use(express.json())

const allowedOrigins = [
    'http://localhost:5173' // A porta do seu frontend
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  app.use(cors(corsOptions));
  let filiais 

app.get('/filiais',async(req,res)=>{
    
     filiais = await pool.query('SELECT * FROM filiais');
    res.json({filiais})
    res.status(201)
})
app.get('/filiais/:filial',async(req,res)=>{
  const filial = req.params.filial
  filiais = await pool.query('SELECT * FROM filiais WHERE filial=?;',filial);
  res.json({filiais})
  res.status(201)
})


app.post('/filiais',async(req,res)=>{
    const {filial, saldo,caixas,deposito,despesa} = req.body
    const [result] = await pool.query(
        'INSERT INTO filiais (filial,saldo,caixas,deposito,despesa) VALUES (?,?,?,?,?)',
        [filial,saldo,caixas,deposito,despesa]
    )
    res.json({id:result.insertId,filial,saldo,caixas,deposito,despesa})
    res.status(201)
   
})
app.put('/filiais',(req,res)=>{
    
})
app.delete('/filiais',(req,res)=>{
    
})

app.listen(3000)