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

router.post('/movie', async (req, res) => {
    try{
        const {sort, filter, order} = req.body;
        const {data} = await axios.get(`https://swapi.dev/api/films`);
        const result = [];

        function toFeet (n) {
            n = Number(n);
            const realFeet = ((n*0.393700) / 12);
            const feet = Math.floor(realFeet);
            const inches = Math.round((realFeet - feet) * 12);
            return feet + "feet and " + inches + "inches";
          }

          function sortByName(a, b) {
            if ( a.name < b.name ){
                return -1;
              }
              if ( a.name > b.name ){
                return 1;
              }
              return 0;
        }

        function sortByHeight(a, b) {
            if ( Number(a.height) < Number(b.height) ){
                return -1;
              }
              if (Number(a.height) > Number(b.height) ){
                return 1;
              }
              return 0;
        }

        for (let i = 0; i < data.results.length; i++) {
            let charactersList = [];
            
            for(let j = 0; j < data.results[i].characters.length; j++){
                let character = await await axios.get(data.results[i].characters[j]);
                toFeet(character.data.height)
                charactersList.push(character.data)
            }

            if(sort === 'name'){
                charactersList.sort(sortByName);
                if(order === "descending"){
                    charactersList.reverse();
                }
            }
            else if(sort === 'height'){
                charactersList.sort(sortByHeight);
                if(order === "descending"){
                    charactersList.reverse();
                }
            } 
            else {
                return res.send('Please enter a valid sort ["name" or "height"]')
            }

            if (filter === "male"){
                charactersList =  charactersList.filter(item => item.gender === "male");
            }
            else if (filter === "female"){
                charactersList = charactersList.filter(item => item.gender === "female")
            }
            else if (filter === "others"){
                charactersList = charactersList.filter(item => item.gender !== "male" && item.gender !== "female");
            }
            let totalheight = 0;
            for(let j = 0; j <charactersList.length; j++){
                totalheight += Number(charactersList[j].height);
            }

            charactersList.forEach(item => {
                item.height = toFeet(item.height);
            })
            
            let details = { 
                results: `${charactersList.length}  results (${filter}) matches this movie with totalheight ${toFeet(totalheight)}`,
                title: data.results[i].title,
                opening_crawl: data.results[i].opening_crawl,
                release_date: data.results[i].release_date,
                characters: charactersList,
            }
            result.push(details);
        }

        result.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        res.send(result);
    }catch(error){
        console.log(error)
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