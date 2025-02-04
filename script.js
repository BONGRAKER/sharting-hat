const houses = [
    {
        name: 'Fagyndor',
        description: 'Where dwell the gay at heart. Their queerness and faggotry set Fagyndors apart.',
        class: 'gryffindor',
        crest: 'gryffindor-crest.png',
        bgClass: 'gryffindor-bg'
    },
    {
        name: 'Shitterin',
        description: 'Those cunning folk use any means to shit their pants.',
        class: 'slytherin',
        crest: 'slytherin-crest.png',
        bgClass: 'slytherin-bg'
    },
    {
        name: 'Huffingpiss',
        description: 'Where they are just and loyal, those patient Hufflepuffs are true and unafraid of pant soil.',
        class: 'hufflepuff',
        crest: 'hufflepuff-crest.png',
        bgClass: 'hufflepuff-bg'
    },
    {
        name: 'Retardclaw',
        description: 'Retardation beyond measure is man\'s greatest treasure.',
        class: 'ravenclaw',
        crest: 'ravenclaw-crest.png',
        bgClass: 'ravenclaw-bg'
    }
];

const sortingSound = document.getElementById('sorting-sound');
const resultSound = document.getElementById('result-sound');
const sortingHat = document.getElementById('sorting-hat');
const container = document.querySelector('.container');

async function sortingCeremony() {
    // Hide sort button and show animation
    document.getElementById('sort-button').style.display = 'none';
    document.getElementById('result').classList.add('hidden');
    sortingHat.classList.add('thinking');
    
    // Play sorting sound
    sortingSound.play();
    
    // Wait for "thinking" animation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Random sorting
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    
    // Update the display
    const houseNameElement = document.getElementById('house-name');
    const houseDescElement = document.getElementById('house-description');
    const houseCrest = document.getElementById('house-crest');
    
    // Remove any existing house classes
    houses.forEach(house => {
        houseNameElement.classList.remove(house.class);
        container.classList.remove(house.bgClass);
    });
    
    // Add new house class and update content
    houseNameElement.classList.add(randomHouse.class);
    container.classList.add(randomHouse.bgClass);
    houseNameElement.textContent = randomHouse.name;
    houseDescElement.textContent = randomHouse.description;
    houseCrest.src = randomHouse.crest;
    
    // Stop animation and show result
    sortingHat.classList.remove('thinking');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('sort-again').classList.remove('hidden');
    
    // Play result sound
    sortingSound.pause();
    sortingSound.currentTime = 0;
    resultSound.play();
    
    // Save to local storage
    localStorage.setItem('hogwartsHouse', randomHouse.name);
}

document.getElementById('sort-button').addEventListener('click', sortingCeremony);
document.getElementById('sort-again').addEventListener('click', sortingCeremony);

// Check if user was previously sorted
window.addEventListener('load', () => {
    const previousHouse = localStorage.getItem('hogwartsHouse');
    if (previousHouse) {
        document.getElementById('sort-button').textContent = 'Get Sorted Again!';
    }
}); 