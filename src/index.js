document.addEventListener('DOMContentLoaded', () => {

    let beersIndexURL = "http://localhost:3000/beers"
    let beerIdURL = "http://localhost:3000/beers/:id"

    fetch(beersIndexURL)
        .then(response => response.json())
        .then(beers => {
            console.log(beers)
            beers.forEach(function(beer){
                renderBeer(beer)
            })


            function renderBeer(beer){
                let beerUl = document.getElementById("list-group")
                beerUl.innerHTML = `
        <ul class="list-group">
        </ul>
           `
                beers.forEach(beer => {
                    let li = document.createElement('li')
                    li.className = "list-group-item"
                    li.dataset.id = beer.id
                    li.innerText = beer.name
                    beerUl.appendChild(li)
                })
            }
           
        })


    
    function renderBeerDetails(beer) {
        let beerDetailDiv = document.getElementById("beer-detail")
        beerDetailDiv.innerHTML = `
                <h1>${beer.name}</h1>
                <img src =${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <textarea id= "textarea">${beer.description}</textarea>
                <button data-beerid="${beer.id}"id="edit-beer-${beer.id}" class="btn btn-info">
                Save
                </button>
            `

    } 

    let beerUl = document.getElementById("list-group")
    beerUl.addEventListener('click', function (e) {
        if (e.target.className === "list-group-item") {
            console.log(e.target.dataset.id)
            fetch(`${beersIndexURL}/${e.target.dataset.id}`)
                 .then(resp => resp.json())
                 .then(beer => {
                     console.log(beer)
                     renderBeerDetails(beer)})
            
        }
    })
    
    
    
    document.addEventListener('click', function(e){
        let beerDetailDiv = document.getElementById("beer-detail")
        let beerDescription = document.getElementById("textarea")

        console.log(e.target)
        if (e.target.className === "btn btn-info") {
            fetch(`http://localhost:3000/beers/${e.target.dataset.beerid}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: beerDescription.value
                })
            })
        }
    })


    

})



