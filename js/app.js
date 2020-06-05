let employees  =[];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const body = document.querySelector("body");
let index = 0;

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
                    <h2 class="cardName">${name.first} ${name.last}</h2>
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

function displayModal() {
    if (!employees[index]) {
        return;
    }
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="modalName">${name.first} ${name.last}</h2>
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
    console.log(index);

    // =================================== //
    //   Alternative option to .innerHTML  //
    // =================================== //

    // const modal = new DocumentFragment();
    
    // const avatar = document.createElement('img');
    // avatar.classList.add('avatar');
    // avatar.src = picture.large;
    // modal.appendChild(avatar);

    // ... add all other elements here ... WITH TEXTCONTENT!!!
    
    // create email element
    // const emailEl = document.createElement('p');
    // emailEl.classList.add('email');
    // emailEl.textContent = email;
    // modal.appendChild(emailEl);

    // remove current modal and append new modal to DOM
    // modalContainer.innerHTML = '';
    // modalContainer.appendChild(modal);
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    
        // select the card element based on its proximity to actual element clicked
        const cardIndex = e.target.closest(".card");
        index = parseInt(cardIndex.getAttribute('data-index'));
        if(typeof index !== "number") {
            return; 
        }
    
        displayModal(index);
    }
});

// ================================= //
//  Navigate between cards in modal  //
// ================================= //

function displayPrev() {
    index -= 1;
    if (index < 0) {
        index = employees.length - 1;
    }
    displayModal(index);
}

function displayNext() {
    index += 1;
    if (index > employees.length - 1) {
        index = 0;
    }
    displayModal(index);
}

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

leftArrow.addEventListener("click", displayPrev);
rightArrow.addEventListener("click", displayNext);

function closeModal() {
    overlay.classList.add("hidden");
    body.classList.remove("gray");
}

modalClose.addEventListener('click', closeModal);

// ========== //
//   Search   //
// ========== //

let search = document.getElementById('search');

search.addEventListener('keyup', () => {
    let cards = document.getElementsByClassName('card');
    let empNames = document.getElementsByClassName('cardName');
    console.log(cards);
    console.log(empNames);
    const input = search.value.toLowerCase();

    for (let i = 0; i < empNames.length; i += 1) {
        if (empNames[i].textContent.toLowerCase().indexOf(input) > -1) {
            cards[i].style.display = "";
            } else {
            cards[i].style.display = "none";
            }
    }
});

search.addEventListener('search', () => {
    let cards = document.getElementsByClassName('card');
    if (event.target.value === '') {
      for (let i = 0; i < cards.length; i += 1) {
        cards[i].style.display = "";
      }
    }
});
