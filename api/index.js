const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Transaction = require('./models/transactions.js');
const User = require('./models/user.js')
const mongoose = require("mongoose");
const path = require("path");

const jwt = require('jsonwebtoken')


const app = express()

app.use(cors());
app.use(express.json());




app.get('/api/test', (req, res) => {
    console.log('hello');

    res.json({ body: 'test ok' });
})

app.post('/api/login', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })



    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            
        }, 'secret123'
        )
        return res.json({status:'ok',user:token})
    } else {
        return res.json({staus:'error',user:false})
    }

})

app.post('/api/register', async (req, res) => {
    console.log(req.body.email);

    try {
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            
        })
        res.json({status:'ok'})
    } catch (error) {
        res.json({status:'error',error:'Duplicate email'})
    }

})




app.post('/api/transaction', async (req, res) => {
    // console.log(process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, datetime,price,email } = req.body;
    const transaction =await Transaction.create({ name, price, description, datetime,email });


    res.json(transaction);
})

app.get('/api/transactions', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();

    res.json(transactions);

})


const PORT = process.env.PORT || 4000;
app.listen(PORT);