const modal = document.getElementById('cart-modal');
const items = document.getElementById('cart-items');
const avisoEndereco = document.getElementById('address-warn');
const fecharCart = document.getElementById('close-modal-btn');
const contador = document.getElementById('contador');
const inputEndereco = document.getElementById('address');
const total = document.getElementById('cart-total');
const ativarCartBtn = document.getElementById('ativar-cart');
let numero = 0;
let cart = [];

ativarCartBtn.addEventListener("click", function () {
    modal.style.display = "flex";
});

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

fecharCart.addEventListener("click", function () {
    modal.style.display = "none";
});

document.addEventListener("click", function (event) {
    const botaoAdd = event.target.closest(".btn-comprar");
    if (botaoAdd) {
        const nome = botaoAdd.getAttribute("data-name");
        const preco = parseFloat(botaoAdd.getAttribute("data-price"));

        let item = null;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === nome) {
                item = cart[i];
                break;
            }
        }

        if (item) {
            item.quantity += 1;
            contador.innerText = `(${++numero})`;
        } else {
            item = {
                name: nome,
                price: preco,
                quantity: 1
            };
            cart.push(item);
            contador.innerText = `(${++numero})`;
        }

        adicionar(item);
        atualizarTotal();
    }
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const nome = event.target.getAttribute('data-name');

        let itemIndex = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === nome) {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex !== -1) {
            const item = cart[itemIndex];
            item.quantity--;
            contador.innerText = `(${--numero})`;

            if (item.quantity > 0) {
                const elementoCarrinho = items.querySelector(`[data-name="${item.name}"]`);
                elementoCarrinho.parentElement.querySelector('p:nth-child(2)').textContent = `Qtd: ${item.quantity}`;
            } else {
                cart.splice(itemIndex, 1);
                const elementoCarrinho = items.querySelector(`[data-name="${item.name}"]`);
                elementoCarrinho.parentElement.parentElement.remove();
            }

            atualizarTotal();
        }
    }
});

function adicionar(item) {
    const elementoExistente = items.querySelector(`[data-name="${item.name}"]`);

    if (elementoExistente) {
        elementoExistente.parentElement.querySelector('p:nth-child(2)').textContent = `Qtd: ${item.quantity}`;
    } else {
        const criarElemento = document.createElement('div');
        criarElemento.innerHTML = `
        <div class="container-item">
            <div>
                <p>${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        </div>
        `;
        items.appendChild(criarElemento);
    }
}

function atualizarTotal() {
    let totalCart = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCart += cart[i].price * cart[i].quantity;
    }
    total.textContent = totalCart.toFixed(2);
}
