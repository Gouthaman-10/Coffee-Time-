        const products = [
            {
                id: 1,
                name: "Espresso",
                category: "hot",
                price: 119.99,
                img: "./images/Hot_Coffee-1.jpg",
                desc: "Strong & rich shot of pure coffee."
            },
            {
                id: 2,
                name: "Americano",
                category: "hot",
                price: 119.99,
                img: "./images/Hot_Coffee-2.jpg",
                desc: "Smooth espresso diluted with hot water"
            },
            {
                id: 3,
                name: "Cappuccino",
                category: "hot",
                price: 119.99,
                img: "./images/Hot_Coffee-3.jpg",
                desc: "Espresso blended with steamed milk and thick foam."
            },
            {
                id: 4,
                name: "Latte",
                category: "hot",
                price: 119.99,
                img: "./images/Hot_Coffee-4.jpg",
                desc: "Espresso with steamed milk and a thin layer of foam."
            },
            {
                id: 5,
                name: "Filter Coffee",
                category: "hot",
                price: 119.99,
                img: "./images/Hot_Coffee-5.jpg",
                desc: "Traditional brewed coffee, rich and aromatic."
            },
            {
                id: 6,
                name: "Classic Cold Coffee",
                category: "cold",
                price: 124.99,
                img: "./images/Cold_Coffee-1.jpg",
                desc: "Refreshing chilled coffee blended with milk and sugar."
            },
            {
                id: 7,
                name: "Cold Coffee with Ice Cream",
                category: "cold",
                price: 124.99,
                img: "./images/Cold_Coffee-2.jpg",
                desc: "Creamy cold coffee topped with a scoop of ice cream."
            },
            {
                id: 8,
                name: "Iced Americano",
                category: "cold",
                price: 124.99,
                img: "./images/Cold_Coffee-3.jpg",
                desc: "Strong espresso served over chilled water and ice."
            },
            {
                id: 9,
                name: "Oreo Cold Coffee",
                category: "cold",
                price: 124.99,
                img: "./images/Cold_Coffee-4.jpg",
                desc: "Cold coffee blended with Oreo biscuits for a chocolaty twist."
            },
            {
                id: 10,
                name: "Saffron Coffee",
                category: "signature",
                price: 199.99,
                img: "./images/Signature_Coffee-1.jpg",
                desc: "Aromatic coffee infused with rich saffron flavor."
            },
            {
                id: 11,
                name: "Butterscotch Cold Coffee",
                category: "signature",
                price: 199.99,
                img: "./images/Signature_Coffee-2.jpg",
                desc: "Chilled coffee blended with sweet butterscotch syrup."
            },
            {
                id: 12,
                name: "Coconut Cold Brew",
                category: "signature",
                price: 199.99,
                img: "./images/Signature_Coffee-3.jpg",
                desc: "Smooth cold brew with a refreshing coconut twist."
            },
            {
                id: 13,
                name: "Chocolate Mint Mocha",
                category: "signature",
                price: 199.99,
                img: "./images/Signature_Coffee-4.jpg",
                desc: "Espresso with chocolate and a cool minty finish."
            },
            {
                id: 14,
                name: "Affogato",
                category: "dessert",
                price: 149.99,
                img: "./images/Indulgent_Coffee-1.jpg",
                desc: "A shot of hot espresso poured over creamy vanilla ice cream."
            },
            {
                id: 15,
                name: "Coffee Float",
                category: "dessert",
                price: 149.99,
                img: "./images/Indulgent_Coffee-2.jpg",
                desc: "Chilled coffee served with a scoop of ice cream floating on top."
            },
            {
                id: 16,
                name: "Mocha Shake",
                category: "dessert",
                price: 149.99,
                img: "./images/Indulgent_Coffee-3.jpg",
                desc: "A rich blend of coffee, milk, chocolate, and ice cream."
            },
            {
                id: 17,
                name: "Espresso Shot",
                category: "vegan",
                price: 99.99,
                img: "./images/intro-5.jpg",
                desc: "A small, strong, and concentrated serving of pure coffee, rich in flavor and aroma"
            },
            {
                id: 18,
                name: "Classic Cappuccino",
                category: "seasonal",
                price: 199.99,
                img: "./images/intro-6.jpg",
                desc: "A perfect balance of espresso, steamed milk, and a thick layer of frothy foam."
            }
        ];

        // DOM Elements
        const productsGrid = document.getElementById('products__grid');
        const filterChips = document.querySelectorAll('.filter__chip');
        const cartModal = document.getElementById('cart-modal');
        const floatingCart = document.getElementById('floating-cart');
        const cartBtn = document.getElementById('cart-btn');
        const closeCart = document.getElementById('close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart__count');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Cart array
        let cart = [];

        // Render products
        function renderProducts(category = 'all') {
            productsGrid.innerHTML = '';

            const filteredProducts = category === 'all'
                ? products
                : products.filter(product => product.category === category);

            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = `<p class="empty-cart">No products found in this category</p>`;
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product__card';
                productCard.innerHTML = `
          <img src="${product.img}" alt="${product.name}" class="product__image">
          <div class="product__info">
            <h3 class="product__name">${product.name}</h3>
            <p class="product__desc">${product.desc}</p>
            <div class="product__footer">
              <span class="product__price">₹${product.price}</span>
              <button class="add-to-cart" data-id="${product.id}">+</button>
            </div>
          </div>
        `;
                productsGrid.appendChild(productCard);
            });
        }

        // Update cart UI
        function updateCart() {
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <i class="ri-emotion-sad-line" style="font-size: 3rem;"></i>
            <p>Your cart is empty</p>
          </div>
        `;
                cartTotal.textContent = '₹ 0.00';
                cartCount.textContent = '0';
                return;
            }

            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
          <div class="item-info">
            <h4 class="item-name">${item.name}</h4>
            <div class="item-price">₹${item.price} x ${item.quantity}</div>
          </div>
          <div class="item-controls">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
            <button class="remove-item" data-id="${item.id}">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        `;
                cartItemsContainer.appendChild(cartItem);
            });

            cartTotal.textContent = `₹ ${total.toFixed(2)}`;
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        // Event Listeners
        // Filter chips
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                renderProducts(chip.dataset.filter);
            });
        });

        // Add to cart
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === productId);
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }

                updateCart();

                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.textContent = `${product.name} added to cart!`;
                confirmation.style.position = 'fixed';
                confirmation.style.bottom = '20px';
                confirmation.style.left = '50%';
                confirmation.style.transform = 'translateX(-50%)';
                confirmation.style.backgroundColor = '#4CAF50';
                confirmation.style.color = 'white';
                confirmation.style.padding = '10px 20px';
                confirmation.style.borderRadius = '30px';
                confirmation.style.zIndex = '1000';
                confirmation.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                document.body.appendChild(confirmation);

                setTimeout(() => {
                    document.body.removeChild(confirmation);
                }, 2000);
            }
        });

        // Cart item controls
        cartItemsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.quantity-btn, .remove-item');
            if (!btn) return;

            const productId = parseInt(btn.dataset.id);
            const item = cart.find(item => item.id === productId);

            if (btn.classList.contains('increase')) {
                item.quantity += 1;
            } else if (btn.classList.contains('decrease')) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    cart = cart.filter(i => i.id !== productId);
                }
            } else if (btn.classList.contains('remove-item')) {
                cart = cart.filter(i => i.id !== productId);
            }

            updateCart();
        });

        // Cart modal controls
        floatingCart.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            alert('Thank you for your order! Redirecting to checkout...');
            cart = [];
            updateCart();
            cartModal.classList.remove('active');
        });

        // Close modal when clicking outside
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });

        // Initialize
        renderProducts();
        updateCart();