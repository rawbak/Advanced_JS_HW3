const inputEl = document.querySelector("#input-text");
const textareaEl = document.querySelector('.textarea');
const reviewsInfo = document.querySelector(".reviews-info"); 
let reviewsData = JSON.parse(localStorage.getItem("reviews")) || [];
const errorComment = document.querySelector('.errcomment-text');

function clearForm() {
    inputEl.value = '';
    textareaEl.value = '';
}

const updateReview = (productName, reviewText) => {
    
    const index = reviewsData.findIndex(
        (product) => product.productName === productName
      );
      if (index >= 0) {
        reviewsData[index].reviewsArray.push(reviewText);
      } else {
        const reviewsArray = [];
        reviewsArray.push(reviewText);
        reviewsData.push({ productName, reviewsArray });
    }
    localStorage.setItem("reviews", JSON.stringify(reviewsData));
};
function createReview() {
    const newInput = inputEl.value.trim();
    const newTextArea = textareaEl.value.trim();
    try {
        if (newInput == "" || newTextArea == "") {
            errorComment.textContent = 'Не все поля заполнены'
            throw new Error('Не все поля заполнены'); 
        }
        updateReview(newInput, newTextArea);
        errorComment.textContent = '';
        clearForm()
        alert("Отзыв отправлен");
    } catch (error) {
        
    }
}

button.addEventListener("click", () => {

    // const newInput = inputEl.value.trim();
    // const newTextArea = textareaEl.value.trim();
    // if (newInput != "" && newTextArea != "") {
    //     updateReview(newInput, newTextArea);
    //     alert("Отзыв отправлен");
    // }
    createReview()
});
