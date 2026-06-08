const createRd = document.querySelector(".create-btn");
createRd.addEventListener('click',()=>{
    window.location.href="../SupplierDetail/";
})

const userName = document.querySelector(".userName");
userName.textContent = currentUser.fullName;

const getSup = JSON.parse(localStorage.getItem("Suppliers"));
const tbody = document.getElementById("supplier-list")
function renderProducts(supplierList){
    tbody.innerHTML = "";
    supplierList.forEach(supplier => {
        tbody.innerHTML += `
            <tr data-id = "${supplier.id}">
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.pn}</td>
                <td>${supplier.address}</td>
            </tr>
        `;
    });
}
renderProducts(getSup)


function productRedirec() {
    const body = document.getElementById("supplier-list")
    body.addEventListener('click',(e)=>{
        const getrow = e.target.closest("tr");
        if(getrow){
            const supplierId = getrow.dataset.id
            window.location.href =`../SupplierDetail/?id=${supplierId}`
        }
    });
}
productRedirec();


const search = document.getElementById("search");
const btnSearch = document.getElementById("search-btn");

btnSearch.addEventListener('click',searching);

function searching() {
    const keyValue = search.value.trim().toLowerCase();
    const result = getSup.filter(supplier =>
      supplier.name.toLowerCase().includes(keyValue)||
      String(supplier.id).toLowerCase().includes(keyValue)  
    );
    renderProducts(result);
}