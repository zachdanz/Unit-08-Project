let employees  =[];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const body = document.querySelector("body");

// ====================== //
//   Fetch data from API  //
// ====================== //

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

// ================ //
//   Display Modal  //
// ================ //

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
                ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    body.classList.add("gray");
    modalContainer.innerHTML = modalHTML;


}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
    
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    body.classList.remove("gray");
});

if (!overlay.classList.contains("hidden")) {
    overlay.addEventListener('click', () => {
        overlay.classList.add("hidden");
        body.classList.remove("gray");
    });
}

// ================================= //
//  Navigate between cards in modal  //
// ================================= //

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

leftArrow.addEventListener("click", () => {
    
});

// ========== //
//   Search   //
// ========== //

let search = document.getElementById('search');
let card = document.getElementsByClassName('card');
let empName = document.getElementsByClassName('name');

search.addEventListener('keyup', () => {
    const input = search.value.toLowerCase();

    for (let i = 0; i < empName.length; i += 1) {
        if (empName[i].textContent.toLowerCase().indexOf(input) > -1) {
            card[i].style.display = "";
            } else {
            card[i].style.display = "none";
            }
    }
});

search.addEventListener('search', () => {
    if (event.target.value === '') {
      for (let i = 0; i < card.length; i += 1) {
        card[i].style.display = "";
      }
    }
  });