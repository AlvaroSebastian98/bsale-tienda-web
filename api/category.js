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
    const categoryHTML = `<a id=${c.id} href="#" class="list-group-item" onclick="filterByCategory(${c.id})">${categoryName}</a>`;
    categoryContent.insertAdjacentHTML('beforeEnd', categoryHTML);

    changeTitle(c.id, categoryName);
}

const changeTitle = (id, categoryName) => {

    const title = document.getElementById('category-title');

    document.getElementById(id).addEventListener("click", (event) => {
        event.preventDefault();
        title.innerHTML = categoryName;
    }, false);
}

getCategories(urlApi);