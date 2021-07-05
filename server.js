'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {
res.send('test'); 

})
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN_NAME}/.well-known/jwks.json`
});

const getKey=(header, callback)=>{
  client.getSigningKey(header.kid, function(err,key){
    const signingKey= key.publicKey || key.rsaPublicKey; 
    callback(null, signingKey)
  }); 
}

app.get('/authorize', (req,res)=>{
  const token= req.headers.authorization.split(' ')[1]; 
  jwt.verify(token,getKey,{},(err,user)=>{
    if (err){
      res.send('invalid token'); 
    }
    res.send(user)
  })
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
