const urlApi = 'http://localhost:3000';

const categoryContent = document.getElementById('categories-list');

const getCategories = async (url) => {
    const res = await fetch(url + '/categories');
    const json = await res.json();

    json.data.forEach(category => {
        drawCategories(category);
    })

    console.log(json);
}

const drawCategories = c => {
    const categoryName = c.name[0].toUpperCase() + c.name.substr(1, c.name.length);
    const categoryHTML = `<a id=${c.id} href="#" class="list-group-item">${categoryName}</a>`;
    categoryContent.insertAdjacentHTML('beforeEnd', categoryHTML);

    filterByCategory(c.id, categoryName);
}

const filterByCategory = (id, categoryName) => {

    const title = document.getElementById('category-title');

    document.getElementById(id).addEventListener("click", (event) => {
        event.preventDefault();
        title.innerHTML = categoryName;
    }, false);

    // Filter data
    
}

getCategories(urlApi);