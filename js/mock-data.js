export const Users = [
    { 
        userID: 0,
        Username: "Admin",
        password: "Admin@123",
        profileImg: "",
        fullName: "Phune",
        gender: "Male",
        phoneNumber: "123456789123",
        Role:"Admin"
    },
]

export const Products = [
    {
        id: 1,
        name: "Laptop Dell XPS 15",
        price: 35000000,
        unit: "Chiếc",
        amounts: 15,
        create_at: "2026-05-20",
        create_by: "Admin"
    },

    {
        id: 2,
        name: "iPhone 16 Pro Max",
        price: 42000000,
        unit: "Chiếc",
        amounts: 10,
        create_at: "2026-05-20",
        create_by: "Admin"
    },

    {
        id: 3,
        name: "Samsung SSD 1TB",
        price: 2800000,
        unit: "Ổ",
        amounts: 30,
        create_at: "2026-05-20",
        create_by: "warehouse01"
    }
];



export const Images = [
    {
        id: 1,
        productId: 1,
        image_body: "../assets/images/dell-xps.png"
    },

    {
        id: 2,
        productId: 2,
        image_body: "../assets/images/iphone16.png"
    },

    {
        id: 3,
        productId: 3,
        image_body: "../assets/images/ssd.png"
    }
];




export const ImportOrders = [
    {
        Id: "PO001",
        productId: 1,
        amounts: 5,
        supplierId: 3,
        cost: 175000000,
        status: "Confirmed",
        create_at: "2026-05-20",
        create_by: "Admin",
        update_at: "2026-05-20",
        update_by: "Admin"
    },
    {
        Id: "PO002",
        productId: 2,
        amounts: 3,
        supplierId: 2,
        cost: 175000000,
        status: "Draft",
        create_at: "2026-05-20",
        create_by: "Admin",
        update_at: "2026-05-20",
        update_by: "Admin"
    },
];



export const ExportOrders = [
    {
        Id: "EX001",
        productId: 1,
        amount: 2,
        total_price: 70000000,
        status: "Completed",
        create_at: "2026-05-21",
        create_by: "warehouse01"
    }
];


export const Suppliers = [
    {
        id: 1,
        name: "Samsung Việt Nam",
        address: "Hồ Chí Minh",
        pn: "0909000111"
    },

    {
        id: 2,
        name: "Apple Việt Nam",
        address: "Hà Nội",
        pn: "0909222333"
    },

    {
        id: 3,
        name: "Dell Distributor",
        address: "Đà Nẵng",
        pn: "0909444555"
    }
];


export const ExportOrderDetails = [
    {
        Id: 1,
        exportorderId: "EX001",
        productId: 1,
        amount: 2,
        price: 35000000
    }
];


if (!localStorage.getItem("ImportOrders")) {
    localStorage.setItem(
        "ImportOrders",
        JSON.stringify(ImportOrders)
    );
}

if (!localStorage.getItem("Suppliers")) {
    localStorage.setItem("Suppliers",JSON.stringify(Suppliers));
}