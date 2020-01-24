document.addEventListener("DOMContentLoaded", function() {

    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(beerData => {
        beerData.forEach(beer => {
            renderBeerName(beer)
        })
    })

    let listGroupUl = document.getElementById("list-group")

    function renderBeerName(beer){
        let beerLi = document.createElement('li')
        beerLi.className = "list-group-item"
        beerLi.dataset.id = beer.id
        beerLi.innerText = beer.name
        listGroupUl.appendChild(beerLi)
    }

    let beerDetailDiv = document.getElementById("beer-detail")

    listGroupUl.addEventListener("click", function(e) {

        let beerId = e.target.dataset.id

        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(beer => renderBeerDetails(beer))

        function renderBeerDetails(beer) {
            // beerDetailDiv.innerHTML = ""
            beerDetailDiv.innerHTML = `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea class="textarea" id=textarea-${beer.id}>${beer.description}</textarea>
            <button id="edit-beer-${beer.id}" class="btn btn-info">Save</button>
            `
            beerDetailDiv.dataset.id = beer.id
        }
    }) // end of list ul listener


    beerDetailDiv.addEventListener("click", function(e) {

        let beerId = parseInt(e.target.parentNode.dataset.id)
        let targetDesription = document.getElementById(`textarea-${beerId}`)
       
        if (e.target.className === "btn btn-info") {

            // debugger

            console.log(targetDesription.value)

            fetch(`http://localhost:3000/beers/${beerId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: targetDesription.value
                })
            })
            // .then(response => response.json())
            // .then(beer => {
            //     console.log(beer.description)
            // })

        } // end of if statement


    }) // end of beerDiv event listener


}) // end of main function