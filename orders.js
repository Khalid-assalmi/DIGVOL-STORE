let ordersCon = document.querySelector(".ordersContainer");
function displayOrders() {
    if (orders.length > 0) {
        ordersCon.innerHTML = "<h3><b>- طلباتي:</b></div>";
        for (let index = 0; index < orders.length; index++) {
            ordersCon.innerHTML += `
                <div class="productInOrdersCard">
                    <div class="productImg"><img src="${orders[index].info[0].img}"></div>
                    <div class="count">
                        <span>&nbsp;&nbsp;&nbsp; ${orders[index].info[0].count} &nbsp;&nbsp;&nbsp;</span>
                    </div>
                    <div class="productInfo">
                        <h3>${orders[index].info[0].price}<span id="cionIcon">&#xFDFC;</span></h3>
                        <p>${orders[index].info[0].name}</p>
                        <h6> تاريخ الطلب: ${orders[index].date}</h6>
                    </div>
                    <div><button onclick="productState(${index})"> استلمتُ الطلب؟</button></div>
                </div>
            `;
        }
    }
}
function productState(index) {
    purchases.push({
        date: orders[index].date,
        info: [
            {
                img: orders[index].info[0].img,
                des: orders[index].info[0].des,
                price: orders[index].info[0].price,
                pCode: orders[index].info[0].pCode,
                count: orders[index].info[0].count
            }
        ]
    });
    localStorage.setItem("purchases", JSON.stringify(purchases));
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    if (orders.length > 0) {
        displayOrders();
    } else {
        location.reload();
    }
}
if (ordersCon) {
    displayOrders();
}