import axios from 'axios';
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '34753335-3933287afdbc470ab56c125bb';

// function fetchData(value, page) {
//     return fetch(`https://pixabay.com/api/?key=34753335-3933287afdbc470ab56c125bb&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${page}`)
//         .then(res => res.json())
// }

//! async await
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34753335-3933287afdbc470ab56c125bb';

async function fetchData(value, page) {
    const response = await axios.get(`https://pixabay.com/api/?key=34753335-3933287afdbc470ab56c125bb&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=9&page=${page}`);
    return response.data;
}

export {fetchData}