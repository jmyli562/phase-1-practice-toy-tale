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
  })
});
