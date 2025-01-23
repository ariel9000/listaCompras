const shoppingList = [];

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const priceInput = document.getElementById('priceInput');
    const itemName = itemInput.value.trim();
    const itemPrice = parseFloat(priceInput.value);

    if (itemName !== '' && !isNaN(itemPrice) && itemPrice > 0) {
        shoppingList.push({ name: itemName, price: itemPrice });
        itemInput.value = '';
        priceInput.value = '';
        renderList();
    } else {
        alert('Por favor, ingresa un nombre válido y un precio mayor a 0.');
    }
}

function removeItem(index) {
    shoppingList.splice(index, 1);
    renderList();
}

function renderList() {
    const list = document.getElementById('shoppingList');
    const totalPriceElement = document.getElementById('totalPrice');
    const budgetInput = document.getElementById('budgetInput');
    const budgetMessage = document.getElementById('budgetMessage');

    list.innerHTML = '';
    let totalPrice = 0;

    shoppingList.forEach((item, index) => {
    totalPrice += item.price;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Eliminar</button>
    `;
    list.appendChild(listItem);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    const budget = parseFloat(budgetInput.value);
    if (!isNaN(budget)) {
        if (totalPrice > budget) {
            budgetMessage.textContent = '¡Estás por encima de tu presupuesto!';
            budgetMessage.className = 'over-budget';
        } else {
            budgetMessage.textContent = 'Estás dentro de tu presupuesto.';
            budgetMessage.className = '';
        }
    } else {
        budgetMessage.textContent = '';
    }
}

document.getElementById('budgetInput').addEventListener('input', renderList);