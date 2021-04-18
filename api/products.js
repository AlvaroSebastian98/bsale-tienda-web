const productContent = document.getElementById('products-list');
const paginationContent = document.getElementById('pagination-content');

let publicIdPage;
let publicCategoryId;
let publicProductName;
let publicEvent;

const getAllProducts = async (numberPage = 1) => {

    const title = document.getElementById('category-title');
    title.innerHTML = 'Últimos';

    const res = await fetch(urlApi + '/products?page=' + numberPage, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    const json = await res.json();

    if(json.success) {
        const pages = Math.ceil(json.total / 9);

        productContent.innerHTML = '';
        paginationContent.innerHTML = '';

        (json.data || []).forEach(product => {
            drawProducts(product);
        });

        for (let page = 1; page <= pages; page++) {
            drawPagination(page, 'all');
        }
    }

}

const filterByCategory = async (categoryId, numberPage) => {

    publicCategoryId = categoryId

    const res = await fetch(urlApi + '/products?page=' + numberPage, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_id: categoryId })
    });

    const json = await res.json();

    if(json.success) {

        const pages = Math.ceil(json.total / 9);

        productContent.innerHTML = '';
        paginationContent.innerHTML = '';

        (json.data || []).forEach(product => {
            drawProducts(product);
        });

        for (let page = 1; page <= pages; page++) {
            drawPagination(page, 'category');
        }

    }

}

const filterByName = async (e, page) => {

    e.preventDefault();

    const publicProductName = document.getElementById('product-name').value;
    const title = document.getElementById('category-title');
    title.innerHTML = publicProductName;

    publicEvent = e;

    const res = await fetch(urlApi + '/products/filter?page=' + page, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: publicProductName })
    });

    const json = await res.json();
    const pages = Math.ceil(json.total / 9);

    productContent.innerHTML = '';
    paginationContent.innerHTML = '';

    (json.data || []).forEach(product => {
        drawProducts(product);
    })

    for (let page = 1; page <= pages; page++) {
        drawPagination(page, 'name');
    }

}

const drawProducts = p => {
    const imageUrl = p.url_image || 'assets/images/no-image.svg';

    const categoryHTML = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <a href="#"><img class="card-img-top" src="${imageUrl}" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="#">${p.name}</a>
                    </h4>
                    <h5>$${p.price}</h5>
                    <!-- <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p> -->
                </div>
                <div class="card-footer position-relative">
                    ${p.discount > 0 ? (
                        `
                        <span class="position-absolute top-0 start-10 translate-middle badge bg-danger">
                            $${p.discount} desc.
                        <span class="visually-hidden">unread messages</span></span>
                        `
                    ) : ''}
                    <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                </div>
            </div>
        </div>
    `;
    productContent.insertAdjacentHTML('beforeEnd', categoryHTML);
}

const drawPagination = (page, type) => {

    const paginationHTML = `
        <li id="${type}-page-${page}" class="page-item"><a class="page-link" href="#">${page}</a></li>
    `;

    paginationContent.insertAdjacentHTML('beforeEnd', paginationHTML);

    if(publicIdPage === `${type}-page-${page}`) {
        let itemPage = document.getElementById(publicIdPage);
        itemPage.classList.add("active");
    }

    document.getElementById(`${type}-page-${page}`).addEventListener("click", (e) => {

        e.preventDefault();
        publicIdPage = `${type}-page-${page}`;

        let method;

        switch (type) {
            case 'all':
                method = getAllProducts(page);
                break;

            case 'category':
                method = filterByCategory(publicCategoryId, page);
                break;

            case 'name':
                method = filterByName(publicEvent, page);
                break;

            default:
                method = getAllProducts(page);
                break;
        }

        window.scroll({ top: 'auto', behavior: 'smooth' });

        return method;

    });

}

getAllProducts();