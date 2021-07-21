const express = require('express');
const pool = require('../database/db');
const router = express.Router();
const axios = require('axios');
const {sortByName, sortByHeight} = require('../helpers/sorters');
const toFeet = require('../helpers/converter');

router.post('/movie', async (req, res) => {
    try{
        const {sort, filter} = req.body;
        const  order = req.body.order || "ascending";
        const {data} = await axios.get(`https://swapi.dev/api/films`);
        const result = [];

        for (let i = 0; i < data.results.length; i++) {
            let charactersList = [];
            
            for (let j = 0; j < data.results[i].characters.length; j++) {
                let character = await await axios.get(data.results[i].characters[j]);
                toFeet(character.data.height)
                charactersList.push(character.data)
            }

            if (sort === 'name') {
                charactersList.sort(sortByName);
                if(order === "descending"){
                    charactersList.reverse();
                }
            }
            else if (sort === 'height') {
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
                results: `${charactersList.length}  characters (${filter}) match this movie, sorted by ${sort} with a cummulative height ${toFeet(totalheight)} in ${order} order`,
                title: data.results[i].title,
                opening_crawl: data.results[i].opening_crawl,
                release_date: data.results[i].release_date,
                characters: charactersList,
            }
            result.push(details);
        }

        result.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})

module.exports = router;