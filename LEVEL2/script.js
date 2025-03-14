
let products = [];

// Function to add a product
function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;

    if (!name || !description || !price) {
        alert("Please fill out all fields.");
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        likes: 0,
        comments: [],
        messages: []
    };

    products.push(newProduct);
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';

    renderProducts();
}

// Function to render all products
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <div class="product-actions">
                <button class="like" onclick="likeProduct(${product.id})">Like (${product.likes})</button>
                <button class="comment" onclick="toggleCommentSection(${product.id})">Comment</button>
                <button class="message" onclick="sendMessage(${product.id})">Send Message</button>
            </div>
            <div class="comment-section" id="commentSection-${product.id}" style="display:none;">
                <input type="text" id="commentInput-${product.id}" placeholder="Add a comment">
                <button onclick="addComment(${product.id})">Add Comment</button>
                <ul id="commentsList-${product.id}">
                    ${product.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
            </div>
            <div class="message-section" id="messageSection-${product.id}" style="display:none;">
                <input type="text" id="messageInput-${product.id}" placeholder="Send a message to the seller">
                <button onclick="sendProductMessage(${product.id})">Send Message</button>
                <ul id="messageList-${product.id}">
                    ${product.messages.map(message => `<li>${message}</li>`).join('')}
                </ul>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

// Function to like a product
function likeProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.likes++;
        renderProducts();
    }
}

// Function to toggle the comment section visibility
function toggleCommentSection(id) {
    const commentSection = document.getElementById(`commentSection-${id}`);
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

// Function to add a comment to a product
function addComment(id) {
    const commentInput = document.getElementById(`commentInput-${id}`);
    const comment = commentInput.value.trim();

    if (comment) {
        const product = products.find(p => p.id === id);
        if (product) {
            product.comments.push(comment);
            commentInput.value = '';
            renderProducts();
        }
    } else {
        alert("Please enter a comment.");
    }
}

// Function to send a message to the seller
function sendMessage(id) {
    const messageSection = document.getElementById(`messageSection-${id}`);
    messageSection.style.display = messageSection.style.display === 'none' ? 'block' : 'none';
}

// Function to send a product message
function sendProductMessage(id) {
    const messageInput = document.getElementById(`messageInput-${id}`);
    const message = messageInput.value.trim();

    if (message) {
        const product = products.find(p => p.id === id);
        if (product) {
            product.messages.push(message);
            messageInput.value = '';
            renderProducts();
        }
    } else {
        alert("Please enter a message.");
    }
}

// Initial render when the page loads
window.onload = renderProducts;