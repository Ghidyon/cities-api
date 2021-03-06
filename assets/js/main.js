const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch() returns a promise
fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

console.log(cities);

// Function for finding matches of states and cities
function findMatches(wordToMatch, data = cities) {

    // Returns an array of matched items
    return data.filter(item => {
        const regex = new RegExp(wordToMatch, 'gi'); // g stands for global search, i stands for case insensitive search

        // Filters whenever the city or state matches the searched word
        return item.city.match(regex) || item.state.match(regex);
    });
}

// Function to add commas to numbers
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to display matched items after search
function displayMatches() {
    const matchArray = findMatches(this.value);

    // Map through match array and display get city and state
    const listItems = matchArray.map(item => {

        // Highlight a yellow background-color on matched word
        const regex = new RegExp(this.value, 'gi');
        const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = item.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return  `<li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(item.population)}</span>
                </li>`;
            
    }).join(''); // because .map() would return an array, we use join() to join multiple arrays to become string.

    suggestions.innerHTML = listItems;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Listen when user presses a key on the input
searchInput.addEventListener('keyup', displayMatches);