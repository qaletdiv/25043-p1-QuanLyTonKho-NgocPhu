const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    alert("vui long dang nhap")
    window.location.href = "../login/";
}

const avatarBtn = document.getElementById("userAvatar");
const dropdown = document.getElementById("dropdownMenu");

if (avatarBtn) {
    avatarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });
    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });
}

function renderGlobalHeader() {

    const header = document.getElementById("global-header");

    if (!header) return;

    header.innerHTML = `
        <header class="global-header">
            <div class="header-left">
                <a class="logohrf" href="../">
                <div class="brand">
                    <img src="../assets/images/logo.png" alt="logo" class="logo">
                    <h2>SMP Store</h2>
                </div>
                </a>
            </div>
            <div class="header-mid">
                <h2>Hệ thống quản lý mua hàng & tồn kho</h2>
            </div>
        </header>
    `;
}


function renderSidebar() {
    const sidebar = document.getElementById("global-sidebar");
    if (!sidebar) return;
    sidebar.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-top">
                <nav class="nav-links">
                    <a href="/ImportOrders/" class="nav-item">
                        Đơn mua hàng
                    </a>
                    <a href="/ProductPage/" class="nav-item">
                        Sản phẩm
                    </a>
                    <a href="/Supplier/" class="nav-item">
                        Nhà cung cấp
                    </a>
                    <a href="/inventory/" class="nav-item">
                        Tồn kho
                    </a>
                </nav>
            </div>
        </aside>
    `;
}
function setActiveMenu() {
    //lay path tu window => xac dinh dang o trang nao
    const currentPath = window.location.pathname;
    document.querySelectorAll(".nav-item").forEach(link => {

        const href = link.getAttribute("href");
        if (currentPath.includes(href.replace("/", ""))) {
            link.classList.add("active");
        }

    });
}



function renderFooter() {
    const footer = document.getElementById("global-footer");

    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            Designed & Developed by @Phú Nguyễn
        </footer>
    `;
}



document.addEventListener("DOMContentLoaded", () => {
    renderGlobalHeader();
    renderFooter();
    renderSidebar()
});

