// ============================section1============================
let element = document.getElementById("firstsectionClose");
element.addEventListener("click", remove);

function remove() {
    document
        .getElementById("firstsection")
        .classList.toggle("removeFirstsection");
}
// ============================section2============================
function ShowClose() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("main-sidebar").classList.toggle("active-cart");
    document.body.classList.toggle("scrollBady-none");
}
let scrollCart = document.getElementById("scroll-cart");
scrollCart.addEventListener("click", ShowClose);

let cart = document.getElementById("snap-cart");
cart.addEventListener("click", ShowClose);

let closeCart = document.getElementById("main-sidebar");
closeCart.addEventListener("click", ShowClose);

let closeCartplguin = document.getElementById("colse-plguin1");
closeCartplguin.addEventListener("click", ShowClose);

let cartplguin = {
    cartArea: document.getElementById("product-cart"),
    cartCount: document.getElementById("cartCount"),
    scrollCartCount: document.getElementById("scrollCartCount"),
    totalCount: document.getElementById("totalCount"),
    subTotal: document.getElementById("subTotal"),
    init: function() {
        let cartBtns = document.querySelectorAll(".add-to-cart");
        cartBtns.forEach(function(tag) {
            tag.addEventListener("click", function(event) {
                cartplguin.add(event);
            });
        });
    },
    add: function(e, quantity = 1) {
        let target = e.target;
        let parent = target.closest(".card");
        let productId = parent.getAttribute("id");
        let img = parent.querySelector(".img img");
        let title = parent.querySelector(".card-name");
        let price = parent.querySelector(".card-price");
        // Chek Product Exist
        if (this.cartArea.querySelector(`.${productId}`) == null) {
            this.append(
                productId,
                img.getAttribute("src"),
                title.innerText,
                price.getAttribute("date-price")
            );
        } else {
            this.update(
                productId,
                img.getAttribute("src"),
                title.innerText,
                price.getAttribute("date-price"),
                quantity
            );
        }
    },
    append: function(id, img, title, price, quantity = 1) {
        this.cartArea.innerHTML += this.template(id, img, title, price, quantity);
        this.cartCount.innerText = parseInt(this.cartCount.innerText) + quantity;
        this.scrollCartCount.innerText =
            parseInt(this.scrollCartCount.innerText) + quantity;
        this.totalCount.innerText = parseInt(this.totalCount.innerText) + quantity;
        // let totalamount = quantity * price;
        this.subTotal.innerText =
            parseInt(this.subTotal.innerText) + parseInt(price);
    },
    template: function(id, img, name, price, quantity) {
        let html = `<div class="product ${id}">
            <div class="img-product">
                <div class="img-box">
                    <img src="${img}" alt="${name}">
                </div>
            </div>
            <div class="text-product">
                <div class="text">
                    <span>${name}</span>
                </div>
                <div class="data">
                    <div class="sale-price">
                        <div class="sale">
                            <label>٪15</label>
                            <small>53,850</small>
                        </div>
                        <div class="price">
                            <strong claas="product-price" data-price="${price}">${price}</strong>
                            <small>تومان</small>
                        </div>
                    </div>
                    <div class="remove-add"><span id="remove" class="remove" onclick="cartplguin.destory(event)"><button><svg fill="#2446f5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 128" width="16px" height="16px"><path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"/></svg></button></span><span class="qty" data-quantity="${quantity}">${quantity}</span></div>
                </div>
            </div>
        </div>`;
        return html;
    },
    update: function(id, img, name, price, newQuantity) {
        let product = document.querySelector(`.${id}`);
        let oldQuantityTag = product.querySelector(".qty");
        let newQty =
            parseInt(oldQuantityTag.getAttribute("data-quantity")) + newQuantity;

        oldQuantityTag.innerText = newQty;
        oldQuantityTag.setAttribute("data-quantity", newQty);

        this.cartCount.innerText = parseInt(this.cartCount.innerText) + newQuantity;
        this.scrollCartCount.innerText =
            parseInt(this.scrollCartCount.innerText) + newQuantity;
        this.totalCount.innerText =
            parseInt(this.totalCount.innerText) + newQuantity;
        // let totalamount = newQuantity * price;
        this.subTotal.innerText =
            parseInt(this.subTotal.innerText) + parseInt(price);
    },
    destory: function(event) {
        let element = event.target;
        let parent = element.closest(".product");
        let price = parent.querySelector(".price strong");
        let pricevalue = parseInt(price.getAttribute("data-price"));
        let qty = parent.querySelector(".remove-add .qty");
        let qtyvalue = parseInt(qty.getAttribute("data-quantity"));

        let total = pricevalue * qtyvalue;

        this.cartCount.innerText = parseInt(this.cartCount.innerText) - qtyvalue;
        this.scrollCartCount.innerText =
            parseInt(this.scrollCartCount.innerText) - qtyvalue;
        this.totalCount.innerText = parseInt(this.totalCount.innerText) - qtyvalue;
        this.subTotal.innerText = parseInt(this.subTotal.innerText) - total;

        parent.remove();
    },
};
cartplguin.init();

// ============================section scrollnav============================

const scrollnav = document.getElementById("scrollnavsection");
window.addEventListener("scroll", scrolly);

function scrolly(event) {
    let scroll = window.scrollY;
    if (scroll >= 310) {
        scrollnav.style.display = "block";
    } else {
        scrollnav.style.display = "none";
    }
}

// ============================section modal============================

const modal = document.getElementById("myModal");
const sweet = document.getElementById("snap-login");
const sweetScrollnav = document.getElementById("scrollnav-login");
const closeButton = document.getElementById("close-button");
const modalContent = document.getElementById("modalContent");

function sweetalert() {
    console.log("modal");
    modal.style.display = "flex";
    document.body.classList.toggle("scrollBady-none");
}
sweet.addEventListener("click", sweetalert);
sweetScrollnav.addEventListener("click", sweetalert);

const removeModal = (e) => {
    e.stopPropagation();
    modal.style.display = "none";
    document.body.classList.toggle("scrollBady-none");
};
closeButton.addEventListener("click", removeModal);
modal.addEventListener("click", removeModal);
modalContent.addEventListener("click",(e)=>e.stopPropagation());
