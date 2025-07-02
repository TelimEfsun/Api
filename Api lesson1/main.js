const cardList = document.getElementById("cardList");
const selectBox = document.getElementById("selectBox");

// Sayt açıldıqda bütün məhsulları göstər
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    displayProducts(data);
  });

// Kateqoriya seçiləndə filtr et
selectBox.addEventListener("change", function () {
  const selectedCategory = this.value;

  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      const filtered = data.filter(item => item.category === selectedCategory);
      displayProducts(filtered);
    });
});

// Ümumi məhsul göstərmə funksiyası
function displayProducts(products) {
  let html = '';
  products.forEach(item => {
    html += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${item.image}" height="300px" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5> 
            <h6>${item.category}</h6>
            <p><strong>$${item.price}</strong></p>        
            <a href="#" class="btn btn-primary">Buy Now</a>
          </div>
        </div>
      </div>
    `;
  });

  cardList.innerHTML = html;
}
