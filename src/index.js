document.addEventListener('DOMContentLoaded', () => {

    let beersIndexURL = "http://localhost:3000/beers"
    let beerIdURL = "http://localhost:3000/beers/:id"

    fetch(beersIndexURL)
        .then(response => response.json())
        .then(beers => {
            console.log(beers)
            beers.forEach(function (beer) {
                renderBeer(beer)
            })


            function renderBeer(beer) {
                let beerUl = document.getElementById("list-group")
                beerUl.innerHTML = `
        <ul class="list-group">
        </ul>
           `
                beers.forEach(beer => {

                    let li = document.createElement('li')
                    // console.log(beer)
                    li.className = "beer-name"
                    li.innerText = beer.name
                    beerUl.appendChild(li)

                })
            }


           
        })
    
    // let beerUl = document.getElementById("list-group")
    document.addEventListener('click', function (e) {
        if (e.target.className === "beer-name") {
            console.log("clicked")
            // let beerId = e.target.id 
            // let beerName = e.target.name.value
            // let beerTagline = e.target.tagline.value
            // let beerBrew = e.target.first_brewed.value
            // let beerDescription = e.target.description.value
            // let beerImage = e.target.image_url.value
            // let beerPairing = e.target.food_pairing.value
            // let beerTips = e.target.brewers_tips.value
            // let beerContributor = e.target.contributed_by.value
            let beerDetailDiv = document.getElementById("beer-detail")
            beerDetailDiv.innerHTML = `
                <h1>${e.target.name}</h1>
                <img src${e.target.image_url}>
                <h3>${e.target.tagline}</h3>
                <textarea>${e.target.tagline}</textarea>
                <button id="edit-beer" class="btn btn-info">
                Save
                </button>

            `
            fetch(`${beerIdURL}/${beer.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                 body: JSON.stringify({ beerDetailDiv
                    //  beerId,
                //     beerName,
                //     beerTagline,
                //     beerBrew,
                //     beerDescription,
                //     beerImage,
                //     beerPairing,
                //     beerTips,
                //     beerContributor
                 }),
            })
        }
    })

    // This eventListener and PATCH is unfinished because I ran out of time!
    document.addEventListener('click', function(e){
        if (e.target.id === "edit-beer") {

            fetch(`${beerIdURL}/${beer.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({beerDetailDiv})
                    
            
            })
                    
        }
    })













})