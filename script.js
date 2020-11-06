// link to recipe
// list items keep adding when clicked, fix this sometime
var randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";
var norrisFoodQuotes = "https://api.chucknorris.io/jokes/random?category=food";
var mealArray = [];
var recentList = document.querySelector(".recents");
var fetchButton = document.querySelector(".button");
init ();
// on click events for each category icon
$('#chicken').on('click', function (event) {
  event.preventDefault(); {
    console.log("chicken");
    getMeal("chicken");
  }
});
$('#beef').on('click', function (event) {
  event.preventDefault(); {
    console.log("beef");
    getMeal("beef");
  }
});
$('#pork').on('click', function (event) {
  event.preventDefault(); {
    console.log("pork");
    getMeal("pork");
  }
});
$('#lamb').on('click', function (event) {
  event.preventDefault(); {
    console.log("lamb");
    getMeal("lamb");
  }
});
$('#dessert').on('click', function (event) { //
  event.preventDefault(); {
    console.log("dessert");
    getMeal("dessert");
  }
});
$('#seafood').on('click', function (event) {
  event.preventDefault(); {
    console.log("seafood");
    getMeal("seafood");
  }
});
// fetch function for search input =======================================
function getMeal (meal) {
  var mealSearch = "https://www.themealdb.com/api/json/v1/1/search.php?s="+ meal;
    fetch(mealSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // $('#result').empty();
        if (meal === "") {
          console.log("bad input"); // let's put a modal alert here that says - "please input some text to search"
        } else if (data.meals === null) {
          console.log("try again"); // let's put another modal alert here that reads "Sorry, meal not found. Try again"
        } else {
        // location takes user to a div tag with a specific ID, smooth scroll takes user to page 2, allows for return navigation by using "back"
          for (var i = 0; i < 9; i++) {
            if (data.meals[i]== undefined) {
              console.log("something");
            } else {
              location.href ="index.html#results";
              var grid = $('#gridTarget');
              var cell = $('<article>');
              var card = $('<article>');
              var cardBody = $('<article>');
              var image = $('<img>');
              var imageGet = data.meals[i].strMealThumb;
              var recipeLink = data.meals[i].strSource;
              console.log(recipeLink);
              cell.addClass('cell');
              card.addClass('card');
              cardBody.addClass('card-body');
              grid.append(cell);
              cell.append(card);
              card.append(cardBody);
              card.append(image);
              cardBody.attr('id', 'result'+ [i]);
              image.attr('id','image'+ [i]);
              $('#result'+[i]).text(data.meals[i].strMeal);
              $('#image'+ [i]).attr('src', imageGet);
            }
          }
          $('article.card').on('click', function(event) {
            event.preventDefault();
            location.href = "index.html#resultSingle";
            $('#gridTarget2').append(`<article class="cell">
            <section class="card">${this.innerHTML}
            <img src=${""}>
            </section>
            </section>`)
            chuckQuote();
          });
            if (mealArray.length > 7) {
              mealArray.unshift();
              mealArray.length = Math.min(mealArray.length, 7);
              mealArray.push(meal);
              recents();
              storeRecent();
              listRecent();
              
            } else if (mealArray.length >= 0) {
              mealArray.push(meal);
              storeRecent();
              listRecent();
            }
            
          }             
      });  // takes the last input item and adds it the recent list, removes the oldest once 7 items are listed, up to 7 recent items for now

}
// chuck norris quote fetch function
function chuckQuote () {
    var chuckTarget = $('#chuckT');
    var chuckCell = $('<article>')
    var chuckCard = $('<article>')
    var chuckH3 = $('<h3>');
    chuckCell.addClass('cell');
    chuckCard.addClass('card');
    chuckH3.attr('id', 'chuck');
    chuckTarget.append(chuckCell);
    chuckCell.append(chuckCard);
    chuckCard.append(chuckH3);
    fetch(norrisFoodQuotes)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.value);
        $('#chuck').text(data.value);
      });
}

// localStorage feature goes here ========================
// stores recent searches in localStorage
function storeRecent() {
  localStorage.setItem("recentMeals", JSON.stringify(mealArray));
  // recents();
};
// retrieves recents from localStorage
function init() {
  var storedMeals = JSON.parse(localStorage.getItem("recentMeals"));
  if (storedMeals !== null) {
    mealArray = storedMeals;
    recents ();
  }
}
// creates the list items from recent searches
function recents() {
  $('li').remove();
  for (var i = 0; i < mealArray.length; i++) {
    var liN1 = document.createElement("li");
    recentList.appendChild(liN1);
    liN1.textContent = mealArray[i];
  }
}
// makes the recent list clickable, and goes to the results page
function listRecent () {
  var clickList = $("li");
  var clickMeal;
  if (clickList.length > 0) {
    for (var i = 0; i < clickList.length; i++) {
      clickList[i].addEventListener("click", function () {
        clickMeal = document.querySelector("li").innerHTML;
        console.log(clickMeal);
        clear();
        getMeal(clickMeal);
      });
    }
  }
}

function clear () {
  $('article').remove();
}
// adds click even to the search button, passes userinput variable to the getMeal function
fetchButton.addEventListener('click', function () {
  var mealInput = document.querySelector(".input-group-field");
  var mealValue = mealInput.value;
  console.log(mealValue);
  clear();
  getMeal(mealValue)
  mealInput.value = ""; // resets the search field
 });  

listRecent();