const menuItem = [
    {
        name: "Hot Coffee",
        image: "./images/product-1.png",
        category: "HOT",
        decription: "Start your day with the rich aroma and deep taste of freshly brewed hot coffee",
        price: "₹ 19.99",
        rating: "★★★★★"
    },
    {
        name: "Cold Coffee",
        image: "./images/product-2.png",
        category: "COLD",
        decription: "Chilled cold coffee, smooth and refreshing, a perfect boost for your mood",
        price: "₹ 124.99",
        rating: "★★★★☆"
    },
    {
        name: "Signature & Fusion",
        image: "./images/product-3.png",
        category: "PREMIUM",
        decription: "Experience the perfect harmony of tradition and innovation with our Signature & Fusion Coffee.",
        price: "₹ 199.99",
        rating: "★★★★☆"
    },
    {
        name: "Indulgent & Dessert",
        image: "./images/product-4.png",
        category: "DESSART",
        decription: "A sweet, creamy coffee experience that satisfies your dessert cravings in every sip",
        price: "₹ 149.99",
        rating: "★★★★★"
    },
    {
        name: "Vegan & Healthy",
        image: "./images/intro-5.jpg",
        category: "HEALTHY",
        decription: "A wholesome, plant-based coffee crafted for a healthy, guilt-free indulgence",
        price: "₹ 99.99",
        rating: "★★★★★"
    },
    {
        name: "Seasonal Specials",
        image: "./images/intro-6.jpg",
        category: "LIMITED-TIME",
        decription: "Exclusive coffee creations inspired by the flavors of the season",
        price: "₹ 199.99",
        rating: "★★★★☆"
    }
];

// Function to create menu cards
function createMenuCard() {
    const menuContainer = document.getElementById('menu__container');
    const next = "./menu.html";

    menuItem.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu__card';

        card.innerHTML = `
                    <div class="card__img">
                        <img src="${item.image}" alt="">
                        <span class="category__tag">${item.category}</span>
                    </div>
                    <div class="card__content">
                        <h3>${item.name}</h3>
                        <p>${item.decription}</p>
                        <div class="rating">${item.rating}</div>
                        <div class="price__add">
                            <div class="price">${item.price}</div>
                            <button class="next__menu" onclick="window.location.href='${next}'">
                                <i class="ri-arrow-right-circle-line"></i> View
                            </button>
                        </div>
                    </div>
                `;
        menuContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createMenuCard);
