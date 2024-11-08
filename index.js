const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app=express();
const port =process.env.PORT||5000;

//middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://portfolio12-b6ce8.web.app',
  ],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER_PORTFOLIO}:${process.env.DB_USER_PASS}@cluster0.2lcaz14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
const messageCollection = client.db('PortfolioWebsite').collection('userMessage');

    app.post('/message',async(req,res)=>{
        const message=req.body;
        const result=await messageCollection.insertOne(message)
        res.send(result);
        
    })
    
  } finally {

  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('portfolio is ready')
})
app.listen(port,()=>{
    console.log(`Portfolio is ready for job hunting,${port}`);
})