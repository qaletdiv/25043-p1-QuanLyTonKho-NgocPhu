import { Users} from '../js/mock-data.js';

//neu user chua co tren local storage thi set item de lay du lieu
if (!localStorage.getItem('Users')) {
    localStorage.setItem('Users',JSON.stringify(Users));
}

//handle for login function
document.getElementById('input-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const userName = document.getElementById('Username').value; // lay tai khoan va mat khau
        const passWord = document.getElementById('Password').value;

        // lay user trong mock-data
        const storageAccounts = JSON.parse(localStorage.getItem('Users')) || [];
        console.log('storageAccounts:', storageAccounts);
        //so sanh 
        const account = storageAccounts.find(a => a.Username === userName && a.password === passWord);

        if (account) {
            localStorage.setItem('currentUser', JSON.stringify(account));
            console.log('Current user:', account);
            window.location.href = "../index.html";
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });