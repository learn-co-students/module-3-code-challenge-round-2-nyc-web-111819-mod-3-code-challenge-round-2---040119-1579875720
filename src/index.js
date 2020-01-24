document.addEventListener('DOMContentLoaded', (event) => {
  const baseUrl = 'http://localhost:3000/beers'
  let beerUl = document.getElementById('list-group')
  let beerDetailDiv = document.getElementById('beer-detail')
  let textarea = document.getElementById('description')
  
  
  console.log('DOM loaded!')
  fetch(baseUrl)
  .then(resp => resp.json())
  .then(beers => {
    beers.forEach(beer => {
      let beerLi = document.createElement('li')
      beerLi.id = beer.id
      beerLi.className = 'list-group-item'
      beerLi.textContent = `${beer.name}`
      beerUl.appendChild(beerLi)
    })
  })//end of beers fetch 

beerUl.addEventListener('click', (event) => {
  // console.log(event.target)
  beerDetailDiv.innerHTML = ""
  fetch(`http://localhost:3000/beers/${event.target.id}`)
  .then(resp => resp.json())
  .then(beer => {
    let beerDiv = document.createElement('div')
    // beerDiv.id = beer.id
    beerDiv.innerHTML = `
      <h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id=${beer.id} class="btn btn-info">
        Save
      </button>
    `
    beerDetailDiv.appendChild(beerDiv)
  })//end of beer detail fetch
})

beerDetailDiv.addEventListener('click', (event) => {
  // console.log(event.target)
  // event.preventDefault()
  // console.log(event.target.textContent = "Save")
  if (event.target.className === "btn btn-info"){
    console.log('clicked button!')
    let newDescription = event.target.parentNode.childNodes[7].value
    // console.log(event.target.parentNode.childNodes[7].value)
  


  fetch(`http://localhost:3000/beers/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      accepts: 'application/json'
    },
    body: JSON.stringify({
      description: newDescription
    })
  })
  }
})











})//end of dom content event listener
