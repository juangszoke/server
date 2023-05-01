const axios = require('axios');

const api_key = 'b8c33a4fd3ef5b32877abc89204f0ec3';
const endpoint = 'http://api.weatherstack.com/current';

const location = (address, callback) => {
  
    axios.get(`${endpoint}?access_key=${api_key}&query=${address}`)
    .then(({ data: { request, current} }) => {
        
      if(current !== undefined){
        console.log(request.query)
        callback(request.query, current)
        }
        
      else{
        console.log('no se consiguió esa ubicacion')
        callback(null, null)
      }
       
    })
    .catch(error => {
      console.log(error);
    });
 
}

module.exports = location