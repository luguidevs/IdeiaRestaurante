const modal = document.getElementById('cart-modal')
const items = document.getElementById('cart-items')
const avisoEndereco = document.getElementById('address-warn')
const fecharCart = document.getElementById('close-modal-btn')
const contador = document.getElementById('contador')
const inputEndereco = document.getElementById('address')
const total = document.getElementById('cart-total')
const ativarCartBtn = document.getElementById('ativar-cart')
let numero = 0
let cart = []

ativarCartBtn.addEventListener("click", function () {
    modal.style.display = "flex"
})

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none"
    }
})

fecharCart.addEventListener("click", function () {
    modal.style.display = "none"
})



document.addEventListener("click", function (event) {
    let botaoAdd = event.target.closest(".btn-comprar")
    if(botaoAdd) {
        const nome = botaoAdd.getAttribute("data-name")
        const preco = parseFloat(botaoAdd.getAttribute("data-price"))

        let item = cart.find(i => i.name === nome)

        if (item) {
            item.quantity += 1
            contador.innerText = `(${numero++})`
        } else {
            item = {
                name: nome,
                price: preco,
                quantity: 1
            }
            cart.push(item)
        }
        adicionar(item)
        atualizarTotal()
    }
})
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const nome = event.target.getAttribute('data-name');
        
        
        const itemIndex = cart.findIndex(item => item.name === nome);
        
        if (itemIndex !== -1) {
            const item = cart[itemIndex];
            
            
            item.quantity--;
            contador.innerText = `(${numero--})`

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

function atualizarTotal() {
    let totalCarrinho = 0;
    cart.forEach(item => {
        totalCarrinho += item.price * item.quantity;
    });
    total.textContent = totalCarrinho.toFixed(2);
}

function adicionar(item) {
    
    const elementoExistente = items.querySelector(`[data-name="${item.name}"]`)
    
    if (elementoExistente) {
        
        elementoExistente.parentElement.querySelector('p:nth-child(2)').textContent = `Qtd: ${item.quantity}`
    } else {
        
        const criarElemento = document.createElement('div')
        criarElemento.innerHTML = `
        <div class="container-item">
            <div>
                <p>${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        </div>
        `
        items.appendChild(criarElemento)
    }
}

function atualizarTotal() {
    let totalCart = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    total.textContent = totalCart.toFixed(2)
}



