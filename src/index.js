let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(function(data){
    data.forEach((toy) => {
    const toyCollection = document.getElementById("toy-collection");
    const newToy = document.createElement("div")
    newToy.className = "card";
    newToy.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>`
    toyCollection.appendChild(newToy)
    })

    const toyButtons = document.getElementsByClassName("like-btn");

    for(btn of toyButtons){ //adds event listeners to each toy's card
      btn.addEventListener("click", (e) => {
        const toyID = e.target.id;
        let newLikes = parseInt(e.target.parentNode.querySelector("p").textContent) + 1;
        
        fetch(`http://localhost:3000/toys/${toyID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newLikes
          })
        })
        .then(resp => resp.json())
        .then(function(data){
          e.target.parentNode.querySelector("p").textContent = data.likes;
        })
      })
    }
  })
  //we need to grab the input from the form
  const form = document.getElementsByClassName("add-toy-form")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //prevents the form from refreshing when the info is submitted
    const toyName = document.getElementsByClassName("input-text")[0].value; //grabs the info in the first collection
    const toyURL = document.getElementsByClassName("input-text")[1].value //grabs the info in the second collection

    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "name": `${toyName}`,
        "image": `${toyURL}`,
        "likes": 0 
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
    const toyCollection = document.getElementById("toy-collection");
    const newToy = document.createElement("div")
    newToy.className = "card";
    newToy.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.image}" class="toy-avatar" />
      <p>${data.likes}</p>
      <button class="like-btn" id="${data.id}">Like ❤️</button>`
    toyCollection.appendChild(newToy)
    form.reset();
    })
  })
});
