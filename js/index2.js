
async function sortPrices() {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await response.json();
        
        // Ensure the correct property is being accessed
        const pets = data.pets; // assuming data has a property 'pets'
        
        // Sort the pets by price in ascending order
        const sortedData = pets.sort((a, b) => b.price - a.price);

        displayData(sortedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

