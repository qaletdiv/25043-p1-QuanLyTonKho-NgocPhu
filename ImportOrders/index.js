function logout() {
    const logoutBtn = document.querySelector(".logout-item");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "../login/";
    });
}
logout();


const fullName = document.querySelector(".userName");
fullName.textContent = currentUser.fullName;

const params = new URLSearchParams(window.location.search);
const orderId = params.get("Id");

const userRole = JSON.parse(localStorage.getItem("currentUser"));
const suppliers = JSON.parse(localStorage.getItem("Suppliers")) || [];
const select = document.getElementById("Supplier-options");

function parseSup(optionList) {
    select.innerHTML = `
        <option value="">
            Chọn nhà cung cấp
        </option>`;
    if (optionList.length === 0) {
        select.innerHTML += `
            <option disabled>
                Không có nhà cung cấp
            </option>
        `;
        return;
    }

    optionList.forEach(option => {
        select.innerHTML += `
            <option value="${option.id}">
                ${option.name}
            </option>
        `;

    });
}
parseSup(suppliers);


const products = JSON.parse(localStorage.getItem("Products")) || [];
let orderProducts = [];

const tableBody = document.getElementById("product-table-body");
const addBtn = document.querySelector(".add-product-btn");
const totalElement = document.getElementById("total-price");
const prodctTb = document.getElementById('product-table-body');

function renderProduct() {
    const isReadonly = currentOrder && (currentOrder.status === "Confirmed" || currentOrder.status === "Imported");
    tableBody.innerHTML = "";
    orderProducts.forEach((product, index) => {
        const totalPrice = product.amounts * product.price;
        const productInfo = products.find(p => p.id == product.productId);
        tableBody.innerHTML += `
            <tr>
                <td>
                    <select 
                        onchange="changeProduct(${index}, this.value)" ${isReadonly ? "disabled" : ""}>
                        ${renderProductOptions(product.productId)}
                    </select>
                </td>
                <td class="product-name"> ${productInfo ? productInfo.name : ""}
                </td>
                <td>
                    <input type="number" value="${product.amounts}" min="1" onchange="updateAmounts(${index}, this.value)" 
                    ${isReadonly ? "disabled" : ""} >
                </td>
                <td>
                    <input type="number" value="${product.price}" onchange="updatePrice(${index}, this.value)" ${isReadonly ? "disabled" : ""} >
                </td>
                <td class="total-price">
                    ${totalPrice.toLocaleString()}đ
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteProduct(${index})"  ${isReadonly ? "disabled" : ""}>
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });
    updateSummary();
}

function renderProductOptions(selectedId) {
    //option rong = chon san pham 
    // dung map() de duyet tung phan tu trong mang products
    if (!selectedId) {
        return `
        <option value="">
            Chọn sản phẩm
        </option>
        ${products.map(product => `
            <option value="${product.id}" ${product.id == selectedId ? "selected" : ""}>
                ${product.id}
            </option>
        `).join("")}`
    }
    else if (selectedId || currentOrder) {
        return `
       ${products.map(product => `
            <option value="${product.id}" ${product.id == selectedId ? "selected" : ""}>
                ${product.id}
            </option>
        `).join("")}
    `;
        // dung join de khi map xong thi gop mang string lai nham bo dau , trong mang
    }
}

addBtn.addEventListener('click', () => {
    orderProducts.push({
        productId: "",
        amounts: 1,
        price: 0
    });
    renderProduct();
})

window.changeProduct = function (index, productId) {
    const selectedProduct = products.find(product => product.id == productId);
    if (!selectedProduct)
        return;
    orderProducts[index].productId = selectedProduct.id;
    orderProducts[index].price = selectedProduct.price;
    renderProduct();
}

window.updateAmounts = function (index, value) {

    orderProducts[index].amounts = Number(value);
    renderProduct();
}

window.updatePrice = function (index, value) {

    orderProducts[index].price = Number(value);
    renderProduct();
}

// xoa san pham
window.deleteProduct = function (index) {
    // xoa 1 phan tu tai vi tri index
    orderProducts.splice(index, 1);
    renderProduct();
}

//update tong tien don hang 
function updateSummary() {
    let total = 0;
    orderProducts.forEach(item => {
        total += item.amounts * item.price;
    });
    totalElement.textContent = total.toLocaleString() + "đ";
}


const draftBtn = document.querySelector(".draft-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const iconfirmBtn = document.querySelector(".import-btn");
const backToms = document.querySelector(".secondary-btn");
const importOrder = JSON.parse(localStorage.getItem("ImportOrders")) || [];


let currentOrder = importOrder.find(order => order.Id == orderId);
if (currentOrder) {
    select.value = currentOrder.supplierId;
    document.querySelector(".employee").value = currentOrder.create_by;
    document.querySelector(".date-input").value = currentOrder.create_at;
    document.querySelector(".note-input").value = currentOrder.comment;
    orderProducts = currentOrder.products || [];
    renderProduct();
    if (currentOrder.status === "Confirmed" || currentOrder.status === "Imported") {
        lockform();
    }
}


// lưu lại
draftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //lay gia tri cua bang chung
    const supplierId = select.value;
    const create_by = document.querySelector(".employee").value;
    const create_at = document.querySelector(".date-input").value;
    const comment = document.querySelector(".note-input").value;

    // kiem tra xem co du ko
    if (!supplierId || !create_by || !create_at) {
        alert("vui long nhap day du thong tin");
        return;
    }
    // kiem tra muc dssp
    if (orderProducts.length == 0) {
        alert("vui long chon san pham");
        return;
    }

    const invalidProduct =orderProducts.some(item => !item.productId);
    if (invalidProduct) {
        alert("Vui lòng chọn đầy đủ sản phẩm");
        return;
    }

    let cost = 0;
    orderProducts.forEach(item => {
        cost += item.amounts * item.price;
    });

    let amounts = 0;
    orderProducts.forEach(item => {
        amounts += item.amounts;
    });

    const order = {
        Id: Date.now(),
        products: [...orderProducts],
        amounts,
        supplierId: Number(supplierId),
        cost,
        create_by,
        create_at,
        comment,
        status: "Draft",
    }
    importOrder.push(order);
    localStorage.setItem("ImportOrders", JSON.stringify(importOrder))
    currentOrder = order;
    alert("Lưu đơn hàng thành công");
})


function lockform() {

    document.querySelector(".employee").disabled = true;
    document.querySelector(".date-input").disabled = true;
    document.querySelector(".note-input").disabled = true;
    select.disabled = true;
    addBtn.disabled = true;
    draftBtn.disabled = true;
    confirmBtn.disabled = true;
}


//nut xac nhan don hang
confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentOrder) {
        alert("Không tìm thấy đơn hàng");
        return;
    }
    if (currentOrder.status !== "Draft") {
        alert("Chỉ xác nhận đơn nháp");
        return;
    }

    currentOrder.status = "Confirmed";
    localStorage.setItem("ImportOrders", JSON.stringify(importOrder));
    lockform();
    renderProduct();
    alert("Xác nhận đơn hàng thành công");
});


//nut xac nhan nhap kho
iconfirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!currentOrder) {
        alert("Không tìm thấy đơn hàng");
        return;
    }
    // chỉ import khi đã confirm
    if (currentOrder.status !== "Confirmed") {
        alert("Chỉ nhập kho đơn đã xác nhận");
        return;
    }

    // cộng tồn kho
    currentOrder.products.forEach(orderItem => {

        const product = products.find(item => item.id == orderItem.productId);
        if (product) {
            product.stock += orderItem.amounts;
        }
    });

    // cập nhật trạng thái
    currentOrder.status = "Imported";
    // lưu lại vào product
    localStorage.setItem("Products", JSON.stringify(products));
    // lưu lại trạng thái
    localStorage.setItem("ImportOrders", JSON.stringify(importOrder));
    lockform();
    renderProduct();
    alert("Nhập kho thành công");
});
//nut quay lai
backToms.addEventListener('click', () => {
    window.location.href = "../";
})
