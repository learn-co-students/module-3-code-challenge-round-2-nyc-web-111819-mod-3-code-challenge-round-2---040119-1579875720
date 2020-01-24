document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM loaded!')
  const baseUrl = 'http://localhost:3000/beers'
  let beerUl = document.getElementById('list-group')
  let beerDetailDiv = document.getElementById('beer-detail')
  let textarea = document.getElementById('description')
  
function fetchBeers(){
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
}
fetchBeers()

beerUl.addEventListener('click', (event) => {
  // console.log(event.target)
  beerDetailDiv.innerHTML = ""
  fetch(`http://localhost:3000/beers/${event.target.id}`)
  .then(resp => resp.json())
  .then(beer => {
    createBeerDiv(beer)
  })//end of beer detail fetch
})

function createBeerDiv(beer){
  let beerDiv = document.createElement('div')
  // first attempt route using innerHTML
  // beerDiv.id = beer.id
  // beerDiv.innerHTML = `
  //   <h1>${beer.name}</h1>
  //   <img src=${beer.image_url}>
  //   <h3>${beer.tagline}</h3>
  //   <textarea>${beer.description}</textarea>
  //   <button id=${beer.id} class="btn btn-info">
  //     Save
  //   </button>
  // `

  let name = document.createElement('H1')
  let img = document.createElement('IMG')
  let tagLine = document.createElement('H3')
  let beerTextArea = document.createElement('TEXTAREA')
  let saveButton = document.createElement('BUTTON')
    name.textContent = `${beer.name}`
    img.src = `${beer.image_url}`
    tagLine.textContent = `${beer.tagline}`
    beerTextArea.textContent = `${beer.description}`
    saveButton.id = `${beer.id}`
    saveButton.className = "btn btn-info"
    saveButton.textContent = "Save"
      beerDiv.appendChild(name)
      beerDiv.appendChild(img)
      beerDiv.appendChild(tagLine)
      beerDiv.appendChild(beerTextArea)
      beerDiv.appendChild(saveButton)

  beerDetailDiv.appendChild(beerDiv)
}

beerDetailDiv.addEventListener('click', (event) => {
  //first attempt route using innerHTML

  // if (event.target.className === "btn btn-info"){
    //   console.log('clicked button!')
    //   console.log(event.target.parentNode.childNodes[7].value)
    //   let newDescription = event.target.parentNode.childNodes[7].value
    
    //   fetch(`http://localhost:3000/beers/${event.target.id}`, {
      //     method: 'PATCH',
      //     headers: {
        //       'content-type': 'application/json',
        //       accepts: 'application/json'
        //     },
        //     body: JSON.stringify({description: newDescription})
        //   })
        // }
        
  if (event.target.className === "btn btn-info"){
    console.log('clicked button!')
    console.log(event.target.parentNode.childNodes[3].value)
    let newDescription = event.target.parentNode.childNodes[3].value

    fetch(`http://localhost:3000/beers/${event.target.id}`, {
      method: 'PATCH',
      headers: {
          'content-type': 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify({description: newDescription})
      })
  }

})
})//end of dom content event listener
