const productContent = document.getElementById('products-list');

const getAllProducts = async () => {
    const res = await fetch(urlApi + '/products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    const json = await res.json();

    productContent.innerHTML = '';

    json.data.forEach(product => {
        drawProducts(product);
    })

    console.log(json);
}

const filterByCategory = async (categoryId) => {

    const res = await fetch(urlApi + '/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_id: categoryId })
    });

    const json = await res.json();

    productContent.innerHTML = '';

    json.data.forEach(product => {
        drawProducts(product);
    })

}

const drawProducts = p=> {
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

getAllProducts();