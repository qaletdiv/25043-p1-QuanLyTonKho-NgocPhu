const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));


const productS = JSON.parse(localStorage.getItem("Suppliers")) || [];
const Suppliers = document.getElementById("product-supplier");
const savebtn = document.getElementById("save-btn");
const getP = JSON.parse(localStorage.getItem("Products")) || [];
const currentProduct = getP.find(product => product.id === productId);
const cancelbtn = document.getElementById("cancel-btn");
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];


function renderSupplier(supplierList) {
    Suppliers.innerHTML = `
        <option value="">
            Chọn nhà cung cấp
        </option>`;
    if (supplierList.length === 0) {
        Suppliers.innerHTML += `
            <option disabled>
                Không có nhà cung cấp
            </option>
        `;
        return;
    }

    supplierList.forEach(supplier => {
        Suppliers.innerHTML += `
            <option value="${supplier.id}">
                ${supplier.name}
            </option>
        `
    });
}
renderSupplier(productS);


function createProduct() {
    savebtn.addEventListener("click", () => {
        const productName = document.getElementById("product-name").value.trim();
        const supplierId = Number(document.getElementById("product-supplier").value);
        const unit = document.getElementById("product-unit").value.trim();
        const price = Number(document.getElementById("product-price").value);

        if (!productName || !supplierId || !unit || price <= 0 || isNaN(price)) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const existedProduct = getP.find( 
            product => product.name.toLowerCase() === productName.toLowerCase() && product.id != productId
        );

        if (existedProduct) {
            alert("Tên sản phẩm đã tồn tại");
            return;
        }

        if (currentProduct) {
            currentProduct.name = productName;
            currentProduct.supplierId = supplierId;
            currentProduct.unit = unit;
            currentProduct.price = price;
            localStorage.setItem("Products", JSON.stringify(getP));
            alert("Cập nhật sản phẩm thành công");
            window.location.href = "../ProductPage/";
            return;

        } else {
            // tạo obj new vallue
            const newProduct = {
                id: Date.now(),
                name: productName,
                supplierId,
                unit,
                price,
                stock: 0,
                create_at: new Date().toLocaleDateString("vi-VN"),
                create_by: currentUser.fullName,

            };
            getP.push(newProduct);
        }
        // lưu vào local storage
        localStorage.setItem("Products", JSON.stringify(getP));
        alert("Thêm sản phẩm thành công");
        window.location.href = "../ProductPage/";
    });
}
createProduct()



function loadProductDetail() {
    if (!currentProduct) {
        return;
    }
    document.getElementById("product-name").value = currentProduct.name;
    document.getElementById("product-supplier").value = currentProduct.supplierId;
    document.getElementById("product-unit").value = currentProduct.unit;
    document.getElementById("product-price").value = currentProduct.price;
}
loadProductDetail();



cancelbtn.addEventListener("click", () => {
    const isConfirm = confirm(
        "Bạn có chắc muốn hủy? Mọi thay đổi chưa lưu sẽ bị mất."
    );

    if (isConfirm) {
        window.location.href = "../ProductPage/";
    }
});


