const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.querySelector(".cart-items");
const totalElement = document.querySelector(".total");
const whatsappButton = document.querySelector(".whatsapp-button");
const pixButton = document.querySelector(".pix-button");
const cartContainer = document.querySelector(".cart-container");
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", addToCart);
});

whatsappButton.addEventListener("click", sendWhatsAppMessage);
pixButton.addEventListener("click", payWithPix);

function updateTotal() {
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    if (total === 0) {
        cartContainer.style.display = "none"; // Esconde o carrinho quando não há itens
    } else {
        cartContainer.style.display = "block"; // Exibe o carrinho quando há itens
    }
}

function addToCart(event) {
    const product = event.target.parentElement;
    const productName = product.querySelector("h3").textContent;
    const productPrice = parseFloat(product.querySelector("p").textContent.replace("Preço: R$ ", ""));

    const cartItem = document.createElement("li");
    cartItem.textContent = `${productName} - R$ ${productPrice.toFixed(2)}`;

    // Criar o botão de excluir item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function (event) {
        removeFromCart(cartItem, productPrice);
    });

    cartItem.appendChild(deleteButton);
    cartItemsList.appendChild(cartItem);

    total += productPrice;
    updateTotal();
}

function removeFromCart(cartItem, productPrice) {
    // Remover o item do carrinho
    cartItemsList.removeChild(cartItem);

    total -= productPrice;
    updateTotal();
}

function sendWhatsAppMessage() {
    const cartItemsText = cartItemsList.innerText;
    const totalText = totalElement.innerText;

    const orderText = "Pedido:\n" + cartItemsText + "\n" + totalText;

    const phoneNumber = "5547996901109"; // Substitua pelo número de telefone desejado
    const encodedOrderText = encodeURIComponent(orderText);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedOrderText}`;

    window.open(whatsappURL, '_blank');
}

function payWithPix() {
    const cartItemsText = cartItemsList.innerText;
    const totalText = totalElement.innerText;

    const orderText = "Pedido:\n" + cartItemsText + "\n" + totalText;

    const pixKey = "CHAVE_DO_DESTINATÁRIO"; // Substitua pela chave PIX da sua conta
    const pixAmount = total.toFixed(2); // Valor total do pedido

    // Gerar código de pagamento PIX
    const pixPayload = `00020126580014BR.GOV.BCB.PIX0117${pixKey}5204000053039865802BR5913NOME DO DESTINATÁRIO6009SAO PAULO62070503***63042A56`; // Exemplo, mas você precisa gerar o payload corretamente

    // Exibir código de pagamento PIX para o usuário (pode ser por meio de um modal)
    console.log("Código de pagamento PIX:", pixPayload);
}
const minimizeButton = document.querySelector(".minimize-button");
minimizeButton.addEventListener("click", minimizeCart);

function minimizeCart() {
    cartContainer.classList.toggle("minimized");
}
