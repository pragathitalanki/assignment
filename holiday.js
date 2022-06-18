const axios = require('axios');
const constants = require('./constants.json');

const getNextHoliday = async () => {
    return new Promise (async (resolve, reject) => {
        try{
            var today = new Date();
            var date = String(today.getDate()).padStart(2, '0');
            var month = String(today.getMonth() + 1).padStart(2, '0');
            var year = today.getFullYear();
            console.log('date ',date);
            console.log('month ',month);
            console.log('year ',year);

            const url = `${constants.downstreamHost}?api_key=${constants.apikey}&country=${constants.countryIndia}&year=${year}&month=${month}&day=${date}`; 
            //const url = 'https://holidays.abstractapi.com/v1/?api_key=c830cebf9462433b9b72d5517bcbcccc&country=IN&year=2020&month=12&day=25';
            console.log('url : ', url);

            const config = {
                method: 'get',
                url: url
            }
            
            let res = await axios(config);

            console.log('result ', res.data);
            resolve(JSON.stringify(res.data));
        } catch (err) {
            console.log('err.message', err.message);
            reject(err.message);
        }
    });
  
};

module.exports = {
    getNextHoliday
}