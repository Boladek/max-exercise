const express = require('express');
const pool = require('../database/db');
const router = express.Router();
const axios = require('axios');

router.get('/todo', async (req, res) => {
    try{
        res.send('Testing testing')
    }catch(error){
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const {data} = await axios.get("https://swapi.dev/api//films");
        res.json(data)
    } catch (error) {
        console.log(error);
    }
})

router.get('/todo:id', async(req, res) => {
    try {
    
    } catch (error) {
        
    }
})

router.post('/todo', async (req, res) => {
    try {
        const {description} = req.body;  
        const newTodo = await pool.query("INSERT INTO todo_database (description) VALUES  ($1)", [description])
        res.json(newTodo);
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = router;