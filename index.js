const express = require('express');
const largest = require('./largestElement');
const holiday = require('./holiday');

const app = express();
app.use(express.json());

let intList = [];

app.get('/', (req, res) => {
    res.send('Welcome to the service');
});

//post call that Accepts a list of integers in the request body (number of integers < 10000)
app.post('/api/integers', (req, res)=>{
    if(!req.body.listOfIntegers){
        res.status(400).send('Integer list is required');
        return;
    } else if(req.body.listOfIntegers.length>10000){
        res.status(400).send('Integer list length should be less than 10000');
        return;
    }
    //intList.push(...req.body.listOfIntegers);
    // Store the integer list
    intList = req.body.listOfIntegers;
    res.send(intList);
});

// GET request to return the K the largest integer from the Nth position for the list given in API 1
app.get('/api/integers/:k/:n', (req,res) => {    
    const k = req.params.k;
    const n = req.params.n;
      
    const kLargestElement = largest.getKLargest(intList,k, n);
    console.log('largestElement ', kLargestElement);
    res.status(200).send(`${kLargestElement}`);    
});

// GET request that Returns the next holiday from current date for India.
app.get('/api/nextHoliday', async (req,res) => {          
    await holiday.getNextHoliday().then(result => {
        //console.log(result);
        res.status(200).json(`${result}`);
      })
      .catch(handleError=> {
        res.status(404).send(`${handleError}`); 
      });
      
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));