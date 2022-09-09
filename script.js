let basket_food = []
let basket_prices = []
let basket_amount = []

let foods = [
  'Pizza Salami',
  'Pizza Schinken',
  'Pizza funghi',
  'Lasagne al forno',
  'Spaghetti Bolognese'
]
let prices = [9.5, 9.0, 9.8, 10.0, 11.5]

function render () {
  let content = document.getElementById('content')
  content.innerHTML = ''
  for (let i = 0; i < foods.length; i++) {
    const food = foods[i]
    const price = prices[i]

    content.innerHTML += `
        <div class="food">
        <div class="foodtext">
          <h4 id="name[i]">${food}</h4>
          <p id="price[i]" class="price">${price.toFixed(2).replace(".", ",")}€</p>
        </div>
        <button onclick="addItem(${i}); renderShoppingcart();" class="addbutton">+</button>
      </div>`
  }
}

function addItem (i) {
  let name = foods[i]
  let price = prices[i]
  let index = basket_food.indexOf(name)
  if (index == -1) {
    basket_food.push(name)
    basket_prices.push(price)
    basket_amount.push(1)
  } else {
    basket_amount[index]++
  }
}

function renderShoppingcart () {
  let cartcontent = document.getElementById('cartcontent')
  let cartcontentoverlay = document.getElementById('cartcontentoverlay')
  cartcontent.innerHTML = '';
  cartcontentoverlay.innerHTML = '';
  for (let index = 0; index < basket_food.length; index++) {
    const contentFood = basket_food[index]
    const contentPrice = basket_prices[index]
    const contentAmount = basket_amount[index]

    cartcontent.innerHTML += `
  <div class= "generatedcartcontent">
    <p> ${contentAmount}x</p><p>${contentFood}</p><p>${(contentPrice * contentAmount).toFixed(2).replace(".", ",")} €</p><img class="trashicon" onclick="deleteItem(${index})" src="img/trash-9-64.png">
  </div>
  <div class="buttonalignment"><button onclick="minusOne(${index})" class="buttoncart">-</button><button onclick="plusOne(${index})" class="buttoncart">+</button></div>`
 
  cartcontentoverlay.innerHTML += `
  <div class= "generatedcartcontent">
    <p> ${contentAmount}x</p><p>${contentFood}</p><p>${(contentPrice * contentAmount).toFixed(2).replace(".", ",")} €</p><img class="trashicon" onclick="deleteItem(${index})" src="img/trash-9-64.png">
  </div>
  <div class="buttonalignment"><button onclick="minusOne(${index})" class="buttoncart">-</button><button onclick="plusOne(${index})" class="buttoncart">+</button></div>`
    
}
  sum()
  countCart()
}

function sum () {
  document.getElementById('totalsum').innerHTML = ``;
  document.getElementById('totalsumoverlay').innerHTML = ``;
  let sum = 0
  for (let i = 0; i < basket_prices.length; i++) {
    sum += (basket_prices[i] * basket_amount[i])
    document.getElementById('totalsum').innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
    document.getElementById('totalsumoverlay').innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
  }
}

function countCart(){
  document.getElementById('countCart').innerHTML = ``;
  let sumCart = 0
  for (let i = 0; i < basket_amount.length; i++) {
    sumCart += basket_amount[i]
    document.getElementById('countCart').innerHTML = `${sumCart}`;
  }
}

function plusOne (i) {
  basket_amount[i]++
  renderShoppingcart()
}

function minusOne (i) {
  if (basket_amount[i] > 1) {
    basket_amount[i]--
  } else {
    deleteItem()
  }
  renderShoppingcart()
}

function deleteItem (index) {
  basket_food.splice(index, 1)
  basket_prices.splice(index, 1)
  basket_amount.splice(index, 1)
  renderShoppingcart()
}

function openPopUp () {
  document.getElementById('overlay-menu').classList.add('show-overlay-menu')
}

function closePopUp () {
  document.getElementById('overlay-menu').classList.remove('show-overlay-menu')
}

