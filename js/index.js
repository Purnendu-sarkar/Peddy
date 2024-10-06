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
