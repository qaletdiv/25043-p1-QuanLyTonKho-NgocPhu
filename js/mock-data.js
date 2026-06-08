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
        unit: "cái",
        create_at: "2026-05-20",
        create_by: "Admin",
        stock: 10,
        supplierId:1,
    },

    {
        id: 2,
        name: "iPhone 16 Pro Max",
        price: 42000000,
        unit: "Chiếc",
        create_at: "2026-05-20",
        create_by: "Admin",
        stock: 10,
        supplierId:2,
    },

    {
        id: 3,
        name: "Samsung SSD 1TB",
        price: 2800000,
        unit: "cai",
        create_at: "2026-05-20",
        create_by: "warehouse01",
        stock: 10,
        supplierId:2,
    }
];



export const ImportOrders = [
    {
        Id: 1,
        products: [{productId:1,amounts:5 ,price: 1200}],
        amounts: 5,
        supplierId: 3,
        cost: 175000000,
        comment:"",
        status: "Confirmed",
        create_at: "2026-05-20",
        create_by: "Admin",
        update_at: "2026-05-20",
        update_by: "Admin"
    },
    {
        Id: 2,
        products: [{productId:2,amounts:3,price: 10000}],
        amounts: 3,
        supplierId: 2,
        cost: 175000000,
        comment:"",
        status: "Draft",
        create_at: "2026-05-20",
        create_by: "Admin",
        update_at: "2026-05-20",
        update_by: "Admin"
    },
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




if (!localStorage.getItem("ImportOrders")) {
    localStorage.setItem(
        "ImportOrders",
        JSON.stringify(ImportOrders)
    );
}

if (!localStorage.getItem("Suppliers")) {
    localStorage.setItem("Suppliers",JSON.stringify(Suppliers));
}

if(!localStorage.getItem("Products")){
    localStorage.setItem("Products",JSON.stringify(Products));
}