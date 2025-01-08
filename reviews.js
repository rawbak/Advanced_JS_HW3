const reviewsBox = document.querySelector(".reviews-box"); 

let reviewsData = JSON.parse(localStorage.getItem("reviews")) || [];


function postRewiew(arrayReviews) {
    for (let i = 0; i < arrayReviews.length; i++) {
      reviewsBox.insertAdjacentHTML(
        "beforeend",
        `
          <h2 class="productName">${arrayReviews[i].productName}</h2>
        `
      );
    }
    const prodctNameEls = document.querySelectorAll(".productName");
    for (let i = 0; i < arrayReviews.length; i++) {
      for (let j = 0; j < arrayReviews[i].reviewsArray.length; j++) {
        
        prodctNameEls[i].insertAdjacentHTML(
          "afterend",
          `
          <div class="feedback hidden">
          <p class="feedback-content">${arrayReviews[i].reviewsArray[j]}</p>
          <button class="delete">Удалить отзыв</button>
          </div>
          `
        );
      }
    }
    prodctNameEls.forEach((product) => {
        product.addEventListener("click", () => {
          showingReviews(product);
        });
      });
      buttonDeleteEls = document.querySelectorAll(".delete");
      buttonDeleteEls.forEach((button) => {
        button.addEventListener("click", () => {
          const closestDiv = button.closest(".feedback");
          const reviewToDelete = closestDiv.querySelector(".feedback-content").textContent;
          const productName = findProductName(closestDiv);
          deleteReview(productName, reviewToDelete);
          closestDiv.remove();
        });
      });
  }

function showingReviews(h2) {
    const nextElement = h2.nextElementSibling;
    if (!nextElement) return;
    if (nextElement.classList.contains("productName")) return;
    nextElement.classList.add("visible");
    showingReviews(nextElement);
}
  
function findProductName(div) {
    const previousElement = div.previousElementSibling;
    if (previousElement.classList.contains("productName")) {
      return previousElement.textContent;
    }
    return findProductName(previousElement);
}

function showingReviews(h2) {
  const nextElement = h2.nextElementSibling;
  if (!nextElement) return;
  if (nextElement.classList.contains("productName")) return;
  nextElement.classList.add("visible");
  console.log(nextElement);
  showingReviews(nextElement);
}

function findProductName(div) {
  const previousElement = div.previousElementSibling;
  if (previousElement.classList.contains("productName")) {
    return previousElement.textContent;
  }
  return findProductName(previousElement);
}
function deleteReview(productName, review) {
    // const reviews = getReviews();
    for (let i = 0; i < reviewsData.length; i++) {
      for (let j = 0; j < reviewsData[i].reviewsArray.length; j++) {
        if (
          reviewsData[i].productName === productName &&
          reviewsData[i].reviewsArray[j] === review
        )
          reviewsData[i].reviewsArray.splice(j, 1);
      }
    }
    localStorage.setItem("reviews", JSON.stringify(reviewsData));
  }

postRewiew(reviewsData);
