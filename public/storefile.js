if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {

    var removeCartItemBtn = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemBtn.length; i++) {
        var button = removeCartItemBtn[i];
        button.addEventListener('click', removeCartItem)

    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInput.length; i++) {
        var button = quantityInput[i];
        button.addEventListener('change', ChangeQuantity)

    }

    var addCartContainer = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addCartContainer.length; i++) {
        var cartbtn = addCartContainer[i];
        cartbtn.addEventListener('click', addToCartclicked)

    }

    var buttonPurchased = document.getElementsByClassName('btn-purchase')[0];
    buttonPurchased.addEventListener('click', clearCartItems)

    

    updateCartTotal();
}

function clearCartItems(event){
    if ( document.getElementsByClassName('cart-total-price')[0].innerText == '$0' ){
        alert('Your cart is empty');
        return;
    }
    
    alert('Thank you for your purchase ')
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}

function ChangeQuantity(event) {
        var inputQuantity = event.target;
        if (isNaN(inputQuantity.value) || inputQuantity.value <= 0) {
            inputQuantity.value = 1;
        }
        updateCartTotal();

    }

function addToCartclicked(event) {
    var btn = event.target;
    var shopItem = btn.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgsrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addtoCart(title, price, imgsrc);
}

function addtoCart(title, price, imgsrc) {
    var cartRow = document.createElement('div');

    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartItemTitle = cartItem.getElementsByClassName('cart-item-title');

    for (var i = 0; i < cartItemTitle.length; i++) {
        if (cartItemTitle[i].innerText == title) {
            alert('Item is already added to cart!');
            return
        }
    }

    cartRow.innerHTML = `<div class="cart-row">
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgsrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
       
    </div>
    <span class="cart-price cart-column">${price}</span>
   
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
</div>`;


    cartItem.appendChild(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',ChangeQuantity)
    updateCartTotal()
}

function removeCartItem(event) {
    var btnclicked = event.target;
    btnclicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;

        total = total + (price * quantity);
    }
    var cartContainerTotal = document.getElementsByClassName('cart-total-price')[0].innerText = '$' + (Math.round(total * 100) / 100);


}