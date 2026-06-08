function logout() {
    const logoutBtn = document.querySelector(".logout-item");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "../login/";
    });
}
logout();

const createRd = document.querySelector(".create-btn");
createRd.addEventListener('click',()=>{
    window.location.href="../ProductDetail/";
})

const uName = document.querySelector(".userName");
uName.textContent = currentUser.fullName;

const products = JSON.parse(localStorage.getItem("Products")) || [];
const trbody = document.getElementById("product-list")
function renderProducts(productList){
    trbody.innerHTML = "";
    if(productList.length === 0){
        trbody.innerHTML = `<tr>
                            <td colspan="6">Không tìm sản phẩm nào</td>
                        </tr>`;
        return;
    }
    productList.forEach(product => {
        trbody.innerHTML += `
            <tr data-id = "${product.id}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString()}đ</td>
                <td>${product.stock}</td>
            </tr>
        `;
    });
}
renderProducts(products)

function productRedirec() {
    const body = document.getElementById("product-list")
    body.addEventListener('click',(e)=>{
        const getrow = e.target.closest("tr");
        if(getrow){
            const productId = getrow.dataset.id
            window.location.href =`../ProductDetail/?id=${productId}`
        }
    });
}
productRedirec();


let searchKey = document.getElementById("search-box");
const searchbtn = document.getElementById("search-btn");

searchbtn.addEventListener('click',searchProducts);
function searchProducts() {
    const getKeyword = searchKey.value.toLowerCase().trim();
    const result = products.filter(product => product.name.toLowerCase().includes(getKeyword)||
                        String(product.id).includes(getKeyword));
    renderProducts(result);
}