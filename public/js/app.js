//console.log('Client side javascript file is loaded!')

//browser client call using a promise , async await
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then ((data) => {
//         console.log(data)
//     })
// })


//javascript element 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    //we will handle everything 
    e.preventDefault()

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    const location = search.value
    console.log(location)

    //get the weather information
    fetch('/weather?address=' + location).then((response) => { 
        response.json().then ((data) => { 
            if (data.error){
               messageOne.textContent = data.error        
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })

})