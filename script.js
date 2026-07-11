let settingsBtn = document.getElementById("settingsBtn");
let searchInp = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchButton");
let productsCon = document.querySelector(".productsContianer");
let div = document.createElement("div");
div.className = "settingsBox";
div.innerHTML = `
    <a class="settingCard" href="conditions.html">
        <b>الشروط والأحكام</b>
        <i class="fa-solid fa-circle-info"></i>
    </a>

    <a class="settingCard" href="paymentInfo.html" id="paymentCard">
        <b>الدفع و الاستلام</b>
        <i class="fa-regular fa-credit-card"></i>
    </a>

    <a class="settingCard" href="myData.html" id="myDataCard">
        <b>بياناتي</b>
        <i class="fa-regular fa-user"></i>
    </a>

    <a class="settingCard" href="" id="socialMediaCard">
        <b>وسائل التواصل الاجتماعي</b>
        <i class="fa-brands fa-whatsapp"></i>
    </a>

    <a class="settingCard" id="removeAllDataBaseBtn"
    onclick="div.remove(); document.body.appendChild(confirmation);">
        <b>حذف سجل البيانات</b>
        <i class="fa-solid fa-database"></i>
    </a>

    <a class="settingCard" href="moreSettings.html">
        <b>المزيد</b>
        <i class="fa-solid fa-chevron-right"></i>
    </a>
`;

let turn = false;
if (settingsBtn) {
    settingsBtn.addEventListener("click", (e) => {
        if (!turn) {
            settingsBtn.appendChild(div);
            e.stopPropagation();
            turn = true;
        } else {
            turn = false;
        }
    });
    div.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    document.addEventListener("click", () => {
        div.style.animationName = "hideSettingsBox";
        setTimeout(() => {
            div.style.animationName = "";
            div.remove();
        }, 40);
        turn = false;
    });
    function appearAndHideSearchInput() {
        searchBtn.style.opacity = "1";
        document.querySelector(".logo").style.opacity = "0";
        searchInp.style.maxWidth = "400px";
        searchInp.style.width = "70vw";
        searchInp.style.padding = "0 12px 0 30px";
        searchInp.style.borderRadius = "12px";
        setInterval(() => {
            if (searchInp.value) {
                searchBtn.style.removeProperty("--main");
            } else {
                searchBtn.style.setProperty("--main", "#5e5e5e");
            }
        });
    }
    if (searchInp) {
        searchInp.addEventListener("focus", appearAndHideSearchInput);
        searchInp.addEventListener("input", () => {
            appearAndHideSearchInput();
                if (searchInp.value.trim()) {
                searchContianer.style.display = "flex";
                document.body.style.overflow = "hidden";
                searchContianer.style.animationName = "";
                search();
            } else if (!searchInp.value.trim()) {
                searchContianer.style.animationName = "hide";
                setTimeout(() => {
                    searchContianer.style.display = "";
                    document.body.style.overflow = "";
                }, 300);
            }
        });
        searchInp.addEventListener("blur", () =>  {
            searchBtn.style.opacity = "";
            searchInp.style.maxWidth = "";
            searchInp.style.width = "";
            searchInp.style.padding = "";
            searchInp.style.borderRadius = "";
            setTimeout(() => {
                document.querySelector(".logo").style.opacity = "";
            }, 500);
        });
    }
}
if (productsCon) {
    fetch("products.json")
        .then(response => response.json())
        .then((data) => {
            localStorage.setItem("products", JSON.stringify(data));
            displayProducts("allProducts");
        })
        .catch(err => console.log(err));

}

let products = JSON.parse(localStorage.getItem("products")) || [];
let searchContianer = document.querySelector(".searchContianer");
let timer = null;
let confirmation = document.createElement("div");
confirmation.className = "confirmation";
confirmation.innerHTML = `
    <h3>هل أنت متأكد من حذف جميع بياناتك؟</h3>
    <p>يشمل ذالك جميع معلوماتك الشخصية التي شاركتها معنا ، و بياناتك في السلة ، وبياناتك في قسم الطلبات , وبياناتك في قسم المشتريات وغيرها من البيانات.</p>
    <div class="buttons">
        <button onclick="cancelRemoveAllDatas()" id="noBtn">لا</button>
        <button onclick="removeAllDatas()">نعم</button>
    </div>
`;
function cancelRemoveAllDatas() {
    confirmation.remove();
}
function removeAllDatas() {
    localStorage.clear();
    sessionStorage.clear();
    confirmation.remove();
    alert("تم حذف جميع بياناتك بنجاح");
    location.reload();
}

function clearText(text) {
    text = text.replaceAll("ة", "ه");
    text = text.replaceAll("ي", "ى");
    text = text.replaceAll("أ", "ا");
    text = text.replaceAll("ال", "");
    return text;
}
function search() {
    if (products.length > 0) {
        searchContianer.innerHTML = `
        <div class="loadingBox">
            <div class="circle"></div>
            <span>جاري البحث عن منتجات تتطابق مع "${searchInp.value.trim()}"</span>
        </div>
        `;
        clearTimeout(timer);
        timer = setTimeout(() => {
            for (let i = 0; i < products.length; i++) {
                let searchText = clearText(searchInp.value.trim());
                let productName = clearText(products[i].name);
                let productDes = clearText(products[i].des);
                let productType = clearText(products[i].type)
                if (productName.toLowerCase().includes(searchText.toLowerCase()) || productDes.toLowerCase().includes(searchText.toLowerCase()) || productType.toLowerCase().includes(searchText.toLowerCase())) {
                    setTimeout(() => {
                        searchContianer.innerHTML = "";
                    }, 400);
                    setTimeout(() => {
                        searchContianer.innerHTML = "";
                    }, 500);
                    setTimeout(() => {
                        searchContianer.innerHTML += `
                        <div class="productCard" onclick="productPage(${i})">
                            <div class="imgBox"><img src="${products[i].img}"></div>
                            <div class="priceBox"><span>${products[i].price}</span><span id="cionIcon">&#xFDFC;</span></div>
                            <div class="nameBox">${products[i].name}</div>
                            <div class="buttons">
                                <button onclick="event.stopPropagation();addToCart(${i})" id="addToCart" title="إضافة إلى السة">إضافة إلى السلة</button>
                                <button onclick="event.stopPropagation();addToFavourite(${i})" id="addToFavourite" title="إضافة إلى المفضلة"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                        `;
                    }, 510);
                } else if (!productName.toLowerCase().includes(searchText.toLowerCase()) || !productDes.toLowerCase().includes(searchText.toLowerCase())){
                    setTimeout(() => {
                        searchContianer.innerHTML = `<div class="notFoundMassege">
                        <i class="fa fa-search" id="searchIcon"></i>
                        <span>لا توجد نتائج بحث متطابقة مع "${searchInp.value.trim()}"</span>
                        <small style="font-style: normal; margin-top: 21px;">حاول كتابة المنتج بصيغة أخرى أو جرب فعل هذا:</small>
                        <small style="font-style: normal; margin-top: 7px;">1. كتابة المنتج بالصيغة الفردية بدلاً من الجمع أو العكس.</small>
                        <small style="font-style: normal; margin-top: 7px;">2. التأكد من وجود خطأ إملائي في صيغة المنتج.</small>
                        </div>`;
                    }, 480);
                }
            }
            console.log(searchs);
            localStorage.setItem("searchs", JSON.stringify(searchs));
            if (searchs.length > 200) {
                searchs = searchs.splice(0, 150);
            }
        }, 1200);
    } else {
        searchContianer.innerHTML = `<div class="notFoundMassege"><i class="fa fa-triangle-exclamation" id="searchIcon"></i><span>حدث خطأ غير مقصود نتج عنه فشل في الوصول إلى المنتجات</span><button onclick="location.reload()">إصلاح الخطأ</button></div>`;
    }
}
function displayProducts(id) {
    let productsTypeBtn = document.getElementById(id);
    let type = productsTypeBtn.getAttribute("data-type");
    let productsType = products.filter(i => productsTypeBtn.id == "allProducts" ? i : i.type == type);
    document.querySelectorAll(".filterBtn.active").forEach(item => {
        item.classList.remove("active");
    });
    productsTypeBtn.classList.add("active")
    productsCon.innerHTML = "";
    for (let i = 0; i < productsType.length; i++) {
        productsCon.innerHTML += `
        <div class="productCard" onclick="productPage(${i})">
            <div class="imgBox"><img src="${productsType[i].img}"></div>
            <div class="priceBox"><span>${productsType[i].price}</span><span id="cionIcon">&#xFDFC;</span></div>
            <div class="nameBox">${productsType[i].name}</div>
            <div class="buttons">
                <button onclick="event.stopPropagation();addToCart(${i})" id="addToCart" title="إضافة إلى السلة">إضافة إلى السلة</button>
                <button onclick="event.stopPropagation();addToFavourite(${i})" id="addToFavourite" title="إضافة إلى المفضلة"><i class="fa-regular fa-heart"></i></button>
            </div>
        </div>
        `;
    }
}
setTimeout(() => {
    if (!products) {
        location.reload();
    }
}, 1000)
let index = sessionStorage.getItem("index");
function productPage(indexOfProduct) {
    window.location.href = "product.html";
    sessionStorage.setItem("index", indexOfProduct);
}
if (document.querySelector(".productImage")) {
    document.querySelector(".productImage").innerHTML = `<img class="img" src="${products[index].img}">`;
    document.querySelector(".productName").innerHTML = `<div class="name">${products[index].name}</div><div class="price"><div>${products[index].price}</div><div class="coin"><span id="cionIcon">&#xFDFC;</span></div></div>`;
    document.getElementById("productDes").innerHTML = products[index].des;
    document.querySelector("#DeliveryLocation").innerHTML = ` موقع التوصيل: ${JSON.parse(localStorage.getItem("info")) ? JSON.parse(localStorage.getItem("info"))[0].address :"غير محدد"}`;
    document.querySelector("#Manufacturer").innerHTML = `الشركة المصنعة: ${products[index].company}`;
    if (products[index].specs) {
        document.querySelector("#specs").innerHTML = "المواصفات : <br>" + "<span id='specsText'>" + products[index].specs + "</span>";
    }
}
window.onload = () => {
    if (!addBtn) {
        if(!localStorage.getItem("totalOfNewProductsInCart") || Number(localStorage.getItem("totalOfNewProductsInCart")) == 0) {
            document.querySelector("#totalOfNewProductsInCart").style.display = "";
        } else {
            document.querySelector("#totalOfNewProductsInCart").style.display = "flex";
            document.querySelector("#totalOfNewProductsInCart").textContent = localStorage.getItem("totalOfNewProductsInCart");
        }
    }
}