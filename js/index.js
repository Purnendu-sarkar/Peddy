document.addEventListener("DOMContentLoaded", async function() {
    const apiUrl = 'https://openapi.programming-hero.com/api/peddy/pets'; //API URL

    // Fetch and display data when the DOM is loaded
    await fetchData(apiUrl);
});

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

// Function to display the fetched data
function displayData(pets) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

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
        const petCard = document.createElement('div');
        petCard.className = "card box-border border bg-white rounded-xl shadow-lg overflow-hidden p-4";
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name} Image" class="rounded-lg object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg">${pet.pet_name}</h3>
                <p class="text-sm text-gray-600">Breed: ${pet.breed || 'N/A'}</p>
                <p class="text-sm text-gray-600">Birth: ${pet.date_of_birth || 'N/A'}</p>
                <p class="text-sm text-gray-600">Gender: ${pet.gender}</p>
                <p class="text-sm text-gray-600">Price: $${pet.price || 'N/A'}</p>
                <!-- Buttons -->
                <div class="flex items-center justify-between space-x-2">
                    <!-- Like Button -->
                    <button class="flex justify-center items-center border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <!-- Adopt Button -->
                    <button class="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        Adopt
                    </button>
                    <!-- Details Button -->
                    <button class="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white">
                        Details
                    </button>
                </div>
            </div>
        `;
        dataContainer.appendChild(petCard);
    });
}

// Function to display error message
function displayError() {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<p class="text-red-500">Error loading data.</p>';
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
        <button id="btn-${item.category}" onclick="loadCetegoryPets('${item.category}')" class="btn category-btn text-center justify-center">
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


loadAllCetegory()