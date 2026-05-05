const menuIcon = document.querySelector("#menuIcon");
const MenuPage = document.querySelector(".MenuPages");
const menuClose = document.querySelector("#close-menu");
menuIcon.addEventListener("click",() => MenuPage.classList.add("active"));
menuClose.addEventListener("click",() => MenuPage.classList.remove("active"));

//cart

const updateCartTotals = () => {
    const totalElem = document.querySelector(".total-price");
    const boxes = document.querySelectorAll(".cart-box");
    let sum = 0;

    boxes.forEach(box => {
        const priceElement = box.querySelector("#cart-price");
        const quantityElement = box.querySelector(".number");
        if (priceElement && quantityElement) {
            const val = parseFloat(priceElement.textContent.replace("L.E", "").trim());
            const qty = parseInt(quantityElement.textContent);
            if (!isNaN(val) && !isNaN(qty)) sum += val * qty;
        }
    });

    if (totalElem) totalElem.textContent = sum + " L.E";
};

// Saves current screen state to LocalStorage so it persists on refresh
const syncStorage = () => {
    const boxes = document.querySelectorAll(".cart-box");
    const data = Array.from(boxes).map(box => ({
        title: box.querySelector(".cart-product-title").textContent,
        price: box.querySelector("#cart-price").textContent,
        imgSrc: box.querySelector(".cart-img").src,
        quantity: box.querySelector(".number").textContent
    }));
    localStorage.setItem("shoppingCart", JSON.stringify(data));
};

// Updates the badge count icon
const updateBadgeCount = () => {
    const badge = document.querySelector(".cart-item-count");
    const count = document.querySelectorAll(".cart-box").length;
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.visibility = "visible";
        } else {
            badge.style.visibility = "hidden";
        }
    }
};



const renderCart = () => {
    const container = document.querySelector(".cart-content");
    const saved = localStorage.getItem("shoppingCart");
    if (!saved || !container) return;

    const items = JSON.parse(saved);
    container.innerHTML = ""; 

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-box";
        div.innerHTML = `
            <img src="${item.imgSrc}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${item.title}</h2>
                <span id="cart-price">${item.price}</span>
                <div class="cart-quantity">
                    <button id="decrement" class="btn-dec">-</button>
                    <span class="number">${item.quantity}</span>
                    <button id="increment" class="btn-inc">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>`;
        container.appendChild(div);
    });
    updateCartTotals();
    updateBadgeCount();
};



const handleGlobalClicks = (e) => {
    // 1. Sidebar Logic
    if (e.target.id === "cartIcon") document.querySelector(".cart")?.classList.add("active");
    if (e.target.classList.contains("cart-close")) document.querySelector(".cart")?.classList.remove("active");
    
    // 2. Purchase Logic
    if (e.target.classList.contains("btn-purchase") || e.target.classList.contains("btn-buy")) {
        const boxes = document.querySelectorAll(".cart-box");
        if (boxes.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Success! Your order has been placed.");
        document.querySelector(".cart-content").innerHTML = "";
        localStorage.removeItem("shoppingCart");
        updateCartTotals();
        updateBadgeCount();
        return;
    }

    // 3. Cart Box Logic (Increment, Decrement, Remove)
    const row = e.target.closest(".cart-box");
    if (row) {
        // Stop the event here so it doesn't trigger other duplicate listeners
        e.stopImmediatePropagation();

        const num = row.querySelector(".number");
        const decBtn = row.querySelector("#decrement");
        let qty = parseInt(num.textContent);

        if (e.target.id === "increment" || e.target.classList.contains("btn-inc")) {
            num.textContent = qty + 1;
            if (decBtn) decBtn.style.color = "#333";
        } 
        else if (e.target.id === "decrement" || e.target.classList.contains("btn-dec")) {
            if (qty > 1) {
                num.textContent = qty - 1;
                if (qty - 1 === 1 && decBtn) decBtn.style.color = "#999";
            }
        } 
        else if (e.target.classList.contains("cart-remove")) {
            row.remove();
        }

        updateCartTotals();
        updateBadgeCount();
        syncStorage();
    }
};



document.addEventListener("DOMContentLoaded", () => {
    // Ensure we only have ONE listener active
    document.removeEventListener("click", handleGlobalClicks);
    document.addEventListener("click", handleGlobalClicks);

    // Sidebar Menu Logic
    const mIcon = document.querySelector("#menuIcon");
    const mPage = document.querySelector(".MenuPages");
    const mClose = document.querySelector("#close-menu");
    if (mIcon) mIcon.onclick = () => mPage?.classList.add("active");
    if (mClose) mClose.onclick = () => mPage?.classList.remove("active");

    renderCart();
});
