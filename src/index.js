window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    let beersUl = document.getElementById("list-group")

    fetch("http://localhost:3000/beers")
        .then(response => response.json())
        .then(beerData => {
            beerData.forEach(beer => {
                renderBeerList(beer)
            })
        }) // ends .then

    function renderBeerList(beer) {
        let beerLi = document.createElement('li')
        beerLi.innerText = beer.name
        beerLi.dataset.id = beer.id
        beerLi.className = "list-group-item"
        beersUl.append(beerLi)
    }

    let beerShowDiv = document.getElementById("beer-detail")

    beersUl.addEventListener('click', function(e) {
            let id = e.target.dataset.id

            fetch(`http://localhost:3000/beers/${id}`)
                .then(response => response.json())
                .then(oneBeerData => {
                    beerShow(oneBeerData)
                }) //ends .then


            function beerShow(beer) {
                beerShowDiv.dataset.id = beer.id
                beerShowDiv.innerHTML = `
                <h1>${beer.name}</h1>
                <img src=${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <ul>
                <li>${beer.food_pairing}
                </ul>
               `
                let privateDiv = document.createElement('div')
                privateDiv.dataset.id = beer.id
                let desc = document.createElement('textarea')
                desc.ClassName = "editable-desc"
                desc.innerText = beer.description
                privateDiv.append(desc)
                beerShowDiv.append(privateDiv)

                let newPrivateDiv = document.createElement('div')
                let editBtn = document.createElement('button')
                editBtn.id = "edit-beer"
                editBtn.className = "btn btn-info"
                editBtn.innerText = "Save"
                newPrivateDiv.append(editBtn)
                beerShowDiv.append(newPrivateDiv)

                //    <button id="edit-beer" class="btn btn-info">
                //      Save
                //    </button>
            } //ends beershow function

        }) //ends event listener

    beerShowDiv.addEventListener('click', function(e) {
            if (e.target.id === "edit-beer") {
                e.preventDefault()

                let buttonParent = e.target.parentNode
                let targetDiv = buttonParent.previousSibling
                let desc = targetDiv.childNodes
                let content = desc[0].defaultValue
                content.innerText = desc[0].defaultValue.value

                let id = targetDiv.dataset.id
                    // e.reset()


                let newDesc = {
                    description: content
                }
                console.log(newDesc.description)

                fetch(`http://localhost:3000/beers/${id}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(newDesc)
                    }) //ends fetch
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data) 

                        content.innerText = newDesc.description
                    })








            } // ends if
        }) // ends patch event listener
}); // ends domcontent loaded