document.addEventListener("DOMContentLoaded", () => {
    const ramenMenu = document.querySelector("#ramen-menu");
    const ramenDetail = document.querySelector("#ramen-detail");
    const ratingDisplay = document.querySelector("#rating-display");
    const commentDisplay = document.querySelector("#comment-display");
    const newRamenForm = document.querySelector("#new-ramen");
    const editRamenForm = document.querySelector("#edit-ramen");
  
    
    fetch("http://localhost:3000/ramens")
      .then((response) => response.json())
      .then((ramens) => {
        ramens.forEach((ramen) => {
          const img = document.createElement("img");
          img.src = ramen.image;
          img.alt = ramen.name;
          ramenMenu.append(img);
  
          
          img.addEventListener("click", () => {
            ramenDetail.innerHTML = `
              <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
              <h2 class="name">${ramen.name}</h2>
              <h3 class="restaurant">${ramen.restaurant}</h3>
            `;
            ratingDisplay.innerText = ramen.rating;
            commentDisplay.innerText = ramen.comment;
            editRamenForm.dataset.id = ramen.id;
            editRamenForm.rating.value = ramen.rating;
            editRamenForm.newComment.value = ramen.comment;
          });
        });
      });
  
    
    newRamenForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.newComment.value,
      };
      const img = document.createElement("img");
      img.src = newRamen.image;
      img.alt = newRamen.name;
      ramenMenu.append(img);
      newRamenForm.reset();
    });
  
    
    editRamenForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updatedRamen = {
        rating: event.target.rating.value,
        comment: event.target.newComment.value,
      };
      ratingDisplay.innerText = updatedRamen.rating;
      commentDisplay.innerText = updatedRamen.comment;
      editRamenForm.reset();
  
      
      const id = editRamenForm.dataset.id;
      fetch(`http://localhost:3000/ramens/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRamen),
      });
    });
  });
  
