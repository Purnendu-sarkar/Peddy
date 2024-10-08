// document.addEventListener("DOMContentLoaded", async function() {
//     const apiUrl = 'https://openapi.programming-hero.com/api/peddy/pets'; //API URL

//     // Fetch and display data when the DOM is loaded
//     await fetchData(apiUrl);
// });
const loadAllCetegories = async() => {
    document.getElementById("spiner").style.display="none";
    const apiUrl = 'https://openapi.programming-hero.com/api/peddy/pets';
    
    // Fetch and display data when the DOM is loaded
    await fetchData(apiUrl);
}
// Function to fetch data from the API
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayData(data.pets); // Call display function with the fetched pets data
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError(); // Call function to display error message
    }
}
// Like Button
const loadPicture = async (picture) => {
    // console.log(picture);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${picture}`;
    try {
        const response = await fetch(uri);
        const data = await response.json();
        console.log(data.petData);
        if (data.petData) {
            displayPicture(data.petData);
        } else {
            console.error('No pet data found');
        }
    } catch (error) {
        console.error('Failed to load picture', error);
    }
}
const displayPicture = (picture) => {
    console.log(picture);
    const likeContainer = document.getElementById("image-content");
    if (!likeContainer) {
        console.error('No container found with id "image-content"');
        return;
    }
    const likeCard = document.createElement('div');
    likeCard.className = "w-full h-24 object-cover rounded-xl gap-5";
    likeCard.innerHTML = `
    <img class="rounded-xl" src="${picture.image}" alt="Pet Image">
    `;
    likeContainer.appendChild(likeCard);
}
// Adopt Button
function handleAdoptButton(buttonElement) {
    let countdown = 3;
    buttonElement.disabled = true;

    // Show modal
    openAdoptModal();

    const interval = setInterval(() => {
        if (countdown > 0) {
            buttonElement.innerText = countdown;
            countdown--;
        } else {
            buttonElement.innerText = "Adopted";
            clearInterval(interval);
            buttonElement.classList.add('opacity-50', 'cursor-not-allowed');
            closeAdoptModal();
        }
    }, 800);
}

function openAdoptModal() {
    const modal = document.getElementById('adoptModal');
    modal.classList.remove('hidden');
    let countdown = 3;
    const closeModalButton = document.getElementById('closeModalButton');
    closeModalButton.innerText = `${countdown}`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            closeModalButton.innerText = `${countdown}`;
        } else {
            clearInterval(interval);
            closeAdoptModal(); 
        }
    }, 1000);
}


function closeAdoptModal() {
    const modal = document.getElementById('adoptModal');
    modal.classList.add('hidden');
}


// details button
const loadDetails = async (petId) => {
    // console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const response = await fetch(uri);
    const data = await response.json();
    displayDetails(data.petData);
}
const displayDetails = (petData) => {
    // console.log(petData);
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML=`
    <div class="pet-card">
      <img src="${petData.image}" alt="Cute kitten" class="pet-image w-full">
      <h2 class="text-2xl font-black">${petData.pet_name}</h2>
     <ul class="grid grid-cols-2">
        <li><i class="fas fa-th"></i> Breed: ${petData.breed || 'N/A'}</li>
        <li><i class="fas fa-transgender"></i> Gender: ${petData.gender || 'N/A'}</li>
        <li><i class="fas fa-calendar"></i> Birth:${petData.date_of_birth || 'N/A'}</li>
        <li><i class="fas fa-dollar-sign"></i> Price:${petData.price || 'N/A'}$</li>
        <li><i class="fas fa-transgender"></i> Vaccinated status:${petData.vaccinated_status || 'N/A'}</li>
  </ul>
   <div class="divider"></div>
  <div class="details">
    <h3 class=" text-xl font-extrabold">Details Information:</h3>
    <p>${petData.pet_details}</p>
  </div>
  
 </div>

    `
    // Show
    document.getElementById("customModal").showModal();

}
// Function to display the fetched data
function displayData(pets) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';
    // console.log(pets);

    if(pets == 0) {
        dataContainer.classList.remove("grid");
        dataContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center bg-error_div rounded-3xl gap-6 py-24">
        <img class="w-36" src="./images/error.webp" alt="">
        <h3 class="font-bold text-3xl text-text_01">No Information Available</h3>
        <p class="font-normal w-9/12 text-center text-text_03">
            No information available at this time. Please check back later for updates or more details on the subject. We apologize for any inconvenience and appreciate your understanding as we work to provide further details.
        </p>
     </div>
        `;
        return;

    } else{
        dataContainer.classList.add("grid");
    }

    pets.forEach(pet => {
        //  console.log(pet)
        const petCard = document.createElement('div');
        petCard.className = "card box-border border bg-white rounded-xl shadow-lg overflow-hidden p-4";
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name} Image" class="rounded-lg object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg">${pet.pet_name}</h3>
                <p class="text-sm text-gray-600"><i class="fas fa-th"></i> Breed: ${pet.breed || 'N/A'}</p>
                <p class="text-sm text-gray-600"><i class="fas fa-calendar"></i> Birth: ${pet.date_of_birth || 'N/A'}</p>
                <p class="text-sm text-gray-600"><i class="fas fa-transgender"></i> Gender: ${pet.gender}</p>
                <p class="text-sm text-gray-600"><i class="fas fa-dollar-sign"></i> Price: $${pet.price || 'N/A'}</p>
                <!-- Buttons -->
                <div class="flex items-center justify-between space-x-2">
                    <!-- Like Button -->
                    <button onclick="loadPicture('${pet.
                        petId
                        }')" class="flex justify-center items-center border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <!-- Adopt Button -->
                    <button onclick="handleAdoptButton(this)" class="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        Adopt
                    </button>
                    <!-- Details Button -->
                    <button onclick="loadDetails('${pet.
                        petId
                        }')" class="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        Details
                    </button>
                </div>
            </div>
        `;
        dataContainer.appendChild(petCard);
    });
}

// // Function to display error message
// function displayError() {
//     const dataContainer = document.getElementById('data-container');
//     dataContainer.innerHTML = '<p class="text-red-500">Error loading data.</p>';
// }
function displayError() {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center bg-red-100 text-red-600 p-4 rounded">
            <p>Error loading data. Please check your internet connection or try again later.</p>
            <button class="btn bg-btn_colors text-white mt-2" onclick="loadAllCetegories()">Retry</button>
        </div>
    `;
}

const removeActiveClass=()=>{
    const buttons = document.getElementsByClassName("category-btn");
    for (let button of buttons) {
        button.classList.remove("active");
    }
}

const loadAllCetegory = async() => {
    const apiUrl2 = 'https://openapi.programming-hero.com/api/peddy/categories';
    
    // Fetch and display data when the DOM is loaded
    await fetchData2(apiUrl2);
}
async function fetchData2(apiUrl2) {
    try {
        const response = await fetch(apiUrl2);
        const data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError(); // Call function to display error message
    }
}

const loadCetegoryPets = (category) => {
    //alert(category);
    document.getElementById("spiner").style.display="none";
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((response) => response.json())
    .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`)
        activeBtn.classList.add("active");
        displayData(data.data);
    })
    .catch((error) => console.log(error));
}

const displayCategories = (data) => {
    const catagoryContainer = document.getElementById("catagory");

    data.forEach((item) => {
        // create a Button
        const buttonContainer = document.createElement("div")
        // buttonContainer.classList = "btn";
        buttonContainer.innerHTML =`
        <button id="btn-${item.category}" onclick="handleSurch2('${item.category}')" class="btn category-btn text-center justify-center">
         <img class="h-1/2" src="${item.category_icon}" alt="${item.category} Icon">
            <div class="text-center mt-2">
                <h3 class="font-bold text-lg">${item.category}</h3>
            </div>
        </button>    
        `;
        // add button to catagory caontainer
        catagoryContainer.append(buttonContainer);
    });
}
const handleSurch2 = (aca) => {
    document.getElementById("spiner").style.display="block";

    setTimeout(function () {
        loadCetegoryPets(aca)
    },3000)
}
const handleSurch = () => {
    document.getElementById("spiner").style.display="block";

    setTimeout(function () {
        loadAllCetegories()
    },3000)
}
handleSurch()
loadAllCetegory()