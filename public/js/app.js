console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let localizacion = document.getElementById('message-location')
let temperature = document.getElementById('message-temperature')
let sensacion = document.getElementById('message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch (`http://localhost:3000/weather?address=${search.value}`).then((response) =>{
        response.json().then((data) => {

            if(data.error){
                console.log(data.error)
                localizacion.innerHTML = data.error
                temperature.innerHTML = ''
                sensacion.innerHTML = ''
            }    
            else{
                console.log(data)

                localizacion.innerHTML = data.localizacion
                temperature.innerHTML = data.temperatura
                sensacion.innerHTML = data.sensacion
            }
                
                
        })
    })
})