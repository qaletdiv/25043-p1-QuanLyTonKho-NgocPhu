function logout() {
    const logoutBtn = document.querySelector(".logout-item");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "./login/";
    });
}
logout();

const fName = document.querySelector(".userName");
fName.textContent = currentUser.fullName;


const orders = JSON.parse(localStorage.getItem("ImportOrders")) || [];
const suppliers = JSON.parse(localStorage.getItem("Suppliers")) || [];
const searchBtn = document.getElementById("search-btn");
const tbody = document.getElementById("purchase-order-list");

function renderOrders(orderList) {
    tbody.innerHTML = "";
    if (orderList.length === 0) {
        tbody.innerHTML = `<tr>
                            <td colspan="6">Không tìm thấy đơn hàng</td>
                        </tr>`;
        return;
    }
    orderList.forEach(order => {
        const supplier = suppliers.find(s => s.id === order.supplierId);
        tbody.innerHTML +=`<tr data-id="${order.Id}">
                            <td>${order.Id}</td>
                            <td>
                                ${supplier ? supplier.name : "Không rõ"}
                            </td>
                            <td>${order.create_at}</td>
                            <td>${order.create_by}</td>
                            <td>
                                ${order.cost.toLocaleString("vi-VN")}đ
                            </td>
                            <td>
                                <span class="status">
                                    ${order.status}
                                </span>
                            </td>
                        </tr>`;
    });
}
renderOrders(orders);

//tim kiem
searchBtn.addEventListener("click", () => {
    const getKey = document.getElementById("search-order").value 
        .trim()
        .toLowerCase();
    const filteredOrders = orders.filter(order => {
        //khi filter chạy sẽ duyệt từng orders [.., supplierId] =>  tìm supplier
        const supplier = suppliers.find(
            s => s.id === order.supplierId
        );

        //id là số => ép san chuỗi
        const matchId  = "" ||String(order.Id).includes(getKey);
        const matchSupplier =  supplier ? supplier.name.toLowerCase().includes(getKey) : false;
        return getKey === "" || matchId || matchSupplier;
    });
    renderOrders(filteredOrders);
});


const createbtn = document.querySelector(".create-btn");
createbtn.addEventListener("click", () => {
    window.location.href = "./ImportOrders/";
})


function redirbyClick() {
    const tbody = document.getElementById("purchase-order-list");
    tbody.addEventListener("click", (e) => {
        //lấy hàng tr  gần nhất với index 
        const row = e.target.closest("tr");
        if (row) {
            const orderId = row.dataset.id; // ko biet dung sai
            window.location.href = `./ImportOrders/?Id=${orderId}`;
        }
    });
}
redirbyClick();
