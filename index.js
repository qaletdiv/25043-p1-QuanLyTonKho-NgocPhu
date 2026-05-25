const fName = document.querySelector(".user-name");
fName.textContent = currentUser.fullName;

const uRole = document.querySelector(".user-role");
uRole.textContent = currentUser.Role;
console.log(uRole)


const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "./login/";
});


const createbtn = document.querySelector(".create-btn");
createbtn.addEventListener("click", () => {
    window.location.href = "./create/";
})


const tbody = document.getElementById("purchase-order-list");
tbody.addEventListener("click", (e) => {
    //lấy hàng tr  gần nhất với index 
    const row = e.target.closest("tr");
    if(row){
        const orderId = row.dataset.id; // ko biet dung sai
        window.location.href = `./ImportOrders/?id=${orderId}`;
    }
});

