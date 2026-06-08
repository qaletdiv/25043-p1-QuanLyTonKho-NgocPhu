const params = new URLSearchParams(window.location.search);
const supplierId = Number(params.get("id"));


const suppliers = JSON.parse(localStorage.getItem("Suppliers")) || [];
const currentSupplier = suppliers.find(supplier => supplier.id === supplierId);
const savebtn = document.getElementById("save-btn");
const cancelbtn = document.getElementById("cancel-btn");


function loadSupplierDetail() {
    if (!currentSupplier) return;
    document.getElementById("supplier-name").value = currentSupplier.name;
    document.getElementById("supplier-phone").value = currentSupplier.pn;
    document.getElementById("supplier-address").value = currentSupplier.address;
}
loadSupplierDetail();


function saveBtn() {
    savebtn.addEventListener('click', () => {
        const name = document.getElementById("supplier-name").value.trim();
        const pn = Number(document.getElementById("supplier-phone").value);
        const address = document.getElementById("supplier-address").value.trim();

        if (!name || !pn || !address) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const existedsupplier = suppliers.find(
            s => s.name.toLowerCase() === name.toLowerCase() && s.id != supplierId
        );
        if (existedsupplier) {
            alert("nhà cung cấp đã tồn tại");
            return;
        }

        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(supplierPhone)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }

        if (currentSupplier) {
            currentSupplier.name = name;
            currentSupplier.pn = pn;
            currentSupplier.address = address;
            localStorage.setItem("Suppliers", JSON.stringify(suppliers));
            alert("Cập nhật nhà cung cấp thành công");
            window.location.href = "../Supplier/";
            return;

        } else {
            // tạo obj new vallue
            const newSupplier = {
                id: Date.now(),
                name: name,
                address,
                pn
            };
            suppliers.push(newSupplier);
        }
        // lưu vào local storage
        localStorage.setItem("Suppliers", JSON.stringify(suppliers));
        alert("Thêm nhà cung cấp thành công");
        window.location.href = "../Supplier/";
    })

}
saveBtn()

cancelbtn.addEventListener("click", () => {
    const isConfirm = confirm(
        "Bạn có chắc muốn hủy? Mọi thay đổi chưa lưu sẽ bị mất."
    );

    if (isConfirm) {
        window.location.href = "../Supplier/";
    }
});