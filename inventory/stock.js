const Products = JSON.parse(localStorage.getItem("Products")) || [];
const searchInput = document.getElementById("keyword");
const searchBtn = document.getElementById("search-btn");
const tbody = document.getElementById("inventory-list");


function renderInventory(productList) {
    tbody.innerHTML = "";
    if (productList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3">Không tìm thấy sản phẩm</td>
            </tr>
        `;
        return;
    }
    productList.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.stock}</td>
            </tr>
        `;
    });
}
renderInventory(Products);


searchBtn.addEventListener("click", searchInventory);
function searchInventory() {
    const keyword = searchInput.value.trim().toLowerCase();
    const result = Products.filter(product =>
        // filter theo ten hoac id 
        product.name.toLowerCase().includes(keyword) ||
        String(product.id).includes(keyword)
    );
    // in ra product
    renderInventory(result);
}

// ham cho phep dung enter de tim kiem
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchInventory();
    }
});