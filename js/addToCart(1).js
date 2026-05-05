const cartIcon=document.querySelector("#cartIcon");  
const cart=document.querySelector(".cart");
const cartClose=document.querySelector(".cart-close");

cartIcon.addEventListener("click",() => cart.classList.add("active"));
cartClose.addEventListener("click",() => cart.classList.remove("active"));

/* add dishes to the list */ 

  const addCartbutton=document.querySelectorAll(".addToCart")  
addCartbutton.forEach(button => {
     button.addEventListener("click",event =>
    {
        const productBox=event.target.closest(".product-box");
    addToCart(productBox);
    });
});
const cartContent=document.querySelector(".cart-content");
const addToCart = productBox => {

    const productImgSrc= productBox.querySelector("img").src;
    const productTitle= productBox.querySelector(".product-name").textContent;
        const productPrice= productBox.querySelector(".price").textContent;
        const cartItems =cartContent.querySelectorAll(".cart-product-title");
        for (let item of cartItems) {
            if(item.textContent == productTitle) {
                alert("this item is already in the cart.");
                return;
            }

        }
  // 4th part
        const cartBox=document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`<img src="${productImgSrc}" class="cart-img">
                    <div class="cart-detail">
                        <h2 class="cart-product-title">${productTitle}</h2>
                        <span id="cart-price">${productPrice}</span>
                        <div class="cart-quantity">
                           <button class="btn-dec" id="decrement">-</button>
                              <span class="number">1</span>
                            <button class="btn-inc" id="increment">+</button>
                        </div>
                    </div>
                    <i class="ri-delete-bin-line cart-remove"></i>`;
            cartContent.appendChild(cartBox);
            cartBox.querySelector(".cart-remove").addEventListener("click", ()=> {
                cartBox.remove();
                updateCartCount(-1);
                updateTotalPrice();
                saveCartToLocalStorage();
                
            });
            saveCartToLocalStorage();
            cartBox.querySelector(".cart-quantity").addEventListener("click",event=>{
                const numberElement = cartBox.querySelector(".number");
                const decrementButton = cartBox.querySelector("#decrement");
                let quantity =numberElement.textContent;
                if (event.target.id =="decrement" && quantity > 1) {
                        quantity--;
                    if( quantity ==1) {
                        decrementButton.style.color ="#999";
                    }
                    }   else if(event.target.id == "increment") {
                        quantity++;
                        decrementButton.style.color="#333";
                    }
                    numberElement.textContent=quantity;
           updateTotalPrice();
            saveCartToLocalStorage();
                });
           updateTotalPrice();
            updateCartCount(1);
           
}; 


const updateTotalPrice = () => {
    const TotalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector("#cart-price");
        const numberElement = cartBox.querySelector(".number");

        if (priceElement && numberElement) {
            // Convert "100L.E" to 100
            const price = parseFloat(priceElement.textContent.replace("L.E", ""));
            const quantity = parseInt(numberElement.textContent);
            total += price * quantity;
        }
    });

    TotalPriceElement.textContent = `${total} L.E`;
};


let cartItemCount =0;

const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    
    // Check if the badge actually exists on this page before trying to style it
    if (cartItemCountBadge) {
        if (cartItemCount > 0) {
            cartItemCountBadge.style.visibility = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visibility = "hidden";
            cartItemCountBadge.textContent = "";
        }
    }
};
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click",()=> {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length=== 0){
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount=0;
   updateTotalPrice();
    updateCartCount(0);
  //  localStorage.removeItem("shoppingCart");
   //alert("Thank you for your purchase!");
    
});

const saveCartToLocalStorage = () => {
    const cartBoxes = document.querySelectorAll(".cart-box");
    const cartData = [];

    cartBoxes.forEach(cartBox => {
        const product = {
            title: cartBox.querySelector(".cart-product-title").textContent,
            price: cartBox.querySelector("#cart-price").textContent,
            imgSrc: cartBox.querySelector(".cart-img").src,
            quantity: cartBox.querySelector(".number").textContent
        };
        cartData.push(product);
    });

    localStorage.setItem("shoppingCart", JSON.stringify(cartData));
};
const loadCart = () => {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
        const cartData = JSON.parse(savedCart);
        cartData.forEach(item => {
            // Reconstruct the cart items from the saved data
            renderSavedItem(item);
        });
    }
};

// This function creates the HTML for items found in LocalStorage
const renderSavedItem = (item) => {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${item.imgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${item.title}</h2>
            <span id="cart-price">${item.price}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">${item.quantity}</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>`;

    cartContent.appendChild(cartBox);

    // Re-attach all your listeners exactly like in your addToCart function
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateCartCount(-1);
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent);

        if (event.target.id == "decrement" && quantity > 1) {
            quantity--;
        } else if (event.target.id == "increment") {
            quantity++;
        }
        
        numberElement.textContent = quantity;
        decrementButton.style.color = (quantity === 1) ? "#999" : "#333";
        
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    // Important: Update the total and badge count for each loaded item
    updateTotalPrice();
    updateCartCount(1);
};
loadCart(); 

