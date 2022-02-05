const weatherForm = document.querySelector('form')

const message1 = document.querySelector('#message-1')

const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {

  e.preventDefault()

  message1.innerText = 'Loading...'
  message2.innerText = ''

  const address = document.querySelector('input').value

  fetch(location.href + `weather?address=${address}`).then(response => {

    response.json().then(data => {

      const { error, location, address, forecast } = data

      message1.innerText = ''

      if (data.error) {

        message2.innerText = 'Error: ' + error

      } else {

        message2.innerHTML = `<h3>${location}</h3><p>${forecast}</p>`
      }

    })

  })

})

