let cart = JSON.parse(localStorage.getItem("cart")) || [];
let addBtn = document.getElementById("addToCart");
let totalClass = document.querySelector("#totalClass");
let totalConainer = document.querySelector("#total");
let totalPrice = 0;
let productsContianerInCart = document.querySelector(".productsContainerInCart");
let countConianer = [];
let count = [];
let totalOfNewProductsInCart = Number(localStorage.getItem("totalOfNewProductsInCart")) || 0;
function addToCart(i) {
    try {
        cart.push({
            img: products[i].img,
            name: products[i].name,
            des: products[i].des,
            price: products[i].price,
            pCode: products[i].pCode
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        let addToCartBox = document.createElement("div")
        addToCartBox.remove();
        addToCartBox.classList.add("addedBox");
        addToCartBox.innerHTML = `
        <h3>تم إضافة المنتج إلى السلة بنجاح!</h3>
        <div class="sureBtns">
            <button id="okBtn">حسناً</button>
        </div>
        `;
        totalOfNewProductsInCart++;
        localStorage.setItem("totalOfNewProductsInCart", totalOfNewProductsInCart);
        document.body.appendChild(addToCartBox);
        document.getElementById("okBtn").onclick = () => {
            addToCartBox.style.animationName = "hide";
            setTimeout(() => {
                addToCartBox.remove();
                addToCartBox.style.animationName = "";
            }, 300);
        }
        if (document.querySelector("#totalOfNewProductsInCart")) {
            document.querySelector("#totalOfNewProductsInCart").style.display = "flex";
        }
        if (document.querySelector("#totalOfNewProductsInCart")) {
            document.querySelector("#totalOfNewProductsInCart").textContent = totalOfNewProductsInCart;
        }
    } catch {
        alert("حدث خطأ ما، سنعمل على إصلاحه ، يرجى المحاولة بعد قليل");
        location.reload();
    }
}
if (!addBtn && productsContianerInCart) {
    displayProductsInCart();
    if (cart == "") {
        totalClass.style.display = "none";
    } else {
        totalClass.style.display = "";
    }
}
function calculateTotalPrice() {
    totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * count[i] || cart[i].price;
        totalConainer.textContent = totalPrice.toFixed(2);
    }
}
function displayProductsInCart() {
    productsContianerInCart.innerHTML = "";
    if(cart.length === 0) {
        productsContianerInCart.innerHTML = `
        <div class="empty">
            <i class="fa-solid fa-cart-shopping"></i>
            <h3>لا توجد منتجات في السلة</h3>
        </div>
        `;
    } else {
        for (let i = 0; i < cart.length; i++) {
            productsContianerInCart.innerHTML += `
            <div class="productInCartCard" onclick="productPageInCart(${i})">
                <div class="productImg"><img src="${cart[i].img}"></div>
                <div class="count" onclick="event.stopPropagation()">
                    <button onclick="plus(${i})">+</button>
                    <span id="${i}">1</span>
                    <button onclick="subtract(${i})">-</button>
                </div>
                <div class="productInfo">
                    <p>${cart[i].price}<span id="cionIcon">&#xFDFC;</span></p>
                    <h3>${cart[i].name}</h3>
                </div>
            </div>
            `;
        }
    }
    totalOfNewProductsInCart = 0;
    localStorage.setItem("totalOfNewProductsInCart", totalOfNewProductsInCart);
}
function productPageInCart(indexOfProduct) {
    let productName = cart[indexOfProduct].name;
    let productDes = cart[indexOfProduct].des;
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == productName && products[i].des == productDes) {
            sessionStorage.setItem("index", i);
            window.location.href = "product.html";
        }
    }
}
if (productsContianerInCart) {
    for (let i = 0; i < cart.length; i++) {
        countConianer[i]  = document.getElementById(i);
        count[i] = countConianer[i].textContent;
    }
}
function plus(index) {
    count[index]++;
    localStorage.setItem(`count${index}`, count[index]);
    countConianer[index].textContent = count[index];
    calculateTotalPrice();
}
let sureBox = document.createElement("div");
function subtract(index) {
    if (count[index] > 0) {
        if (count[index] === 1) {
            sureBox.classList.add("sureBox");
            sureBox.innerHTML = `
            <h3>هل أنت متأكد من حذف هذا المنتج من السلة؟</h3>
            <div class="productInfoForSureBox">
                <img src="${cart[index].img}" alt="${cart[index].name}">
                <div class="productInfoForSureBoxText">
                    <p class="productInfoForSureBoxPrice">${cart[index].price} &#xFDFC;</p>
                    <p>${cart[index].name}</p>
                </div>
            </div>
            <div class="sureBtns">
                <button id="no" onclick="noForRemove()">لا</button>
                <button id="yes" onclick="yesForRemove(${index})">نعم</button>
            </div>
            `;
            document.body.appendChild(sureBox);
        } else {
            count[index]--;
            countConianer[index].textContent = count[index];
            localStorage.setItem(`count${index}`, count[index]);
            calculateTotalPrice();
        }
    }
}
function noForRemove() {
    sureBox.style.animationName = "hide";
    setTimeout(() => {
        sureBox.remove();
        sureBox.style.animationName = "";
    }, 200);
}
function yesForRemove(index) {
    sureBox.remove();
    cart.splice(index, 1);
    for (let i = 0; i < count.length; i++) {
        localStorage.removeItem(`count${i}`, count[i]);
    }
    count.splice(index, 1);
    for (let i = 0; i < count.length; i++) {
        localStorage.setItem(`count${i}`, count[i]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}
sureBox.addEventListener("click", (event) => {
    event.stopPropagation();
});
document.documentElement.addEventListener("click", () => {
    noForRemove();
});
if (productsContianerInCart) {
    for (let i = 0; i < cart.length; i++) {
        count[i] = parseFloat(localStorage.getItem(`count${i}`)) || 1;
        countConianer[i].textContent = count[i];
        calculateTotalPrice();
    }
}