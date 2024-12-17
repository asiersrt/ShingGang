const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo_list');
const titleInput = document.getElementById('title-input');
const priceInput = document.getElementById('price-input');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const itemName = titleInput.value;
    const itemPrice = priceInput.value;

    if (!itemName || !itemPrice) return; // Ensure both fields are filled

    try {
        // Send POST request to add new receipt
        const response = await fetch('http://localhost:5000/receipts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: itemName,
                price: parseFloat(itemPrice),
            }),
        });

        const newReceipt = await response.json();

        // Add new receipt to the UI
        const receiptItem = document.createElement('div');
        receiptItem.classList.add('receipt-item');

        const itemNameElement = document.createElement('span');
        itemNameElement.classList.add('receipt-item-name');
        itemNameElement.textContent = newReceipt.name;

        const itemPriceElement = document.createElement('span');
        itemPriceElement.classList.add('receipt-item-price');
        itemPriceElement.textContent = `$${newReceipt.price.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteReceipt(newReceipt._id, receiptItem));

        receiptItem.appendChild(itemNameElement);
        receiptItem.appendChild(itemPriceElement);
        receiptItem.appendChild(deleteButton);
        todoList.appendChild(receiptItem);

        titleInput.value = '';
        priceInput.value = '';
    } catch (error) {
        console.error('Error adding receipt:', error);
    }
});

async function fetchReceipts() {
    try {
        const response = await fetch('http://localhost:5000/receipts');
        const receipts = await response.json();

        // Display receipts
        todoList.innerHTML = ''; // Clear existing list
        receipts.forEach(receipt => {
            const receiptItem = document.createElement('div');
            receiptItem.classList.add('receipt-item');

            const itemNameElement = document.createElement('span');
            itemNameElement.classList.add('receipt-item-name');
            itemNameElement.textContent = receipt.name;

            const itemPriceElement = document.createElement('span');
            itemPriceElement.classList.add('receipt-item-price');
            itemPriceElement.textContent = `$${receipt.price.toFixed(2)}`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteReceipt(receipt._id, receiptItem));

            receiptItem.appendChild(itemNameElement);
            receiptItem.appendChild(itemPriceElement);
            receiptItem.appendChild(deleteButton);
            todoList.appendChild(receiptItem);
        });
    } catch (error) {
        console.error('Error fetching receipts:', error);
    }
}

async function deleteReceipt(id, receiptItem) {
    try {
        // Send DELETE request to remove receipt from backend
        await fetch(`http://localhost:5000/receipts/${id}`, {
            method: 'DELETE',
        });

        // Remove the receipt from the UI
        todoList.removeChild(receiptItem);
    } catch (error) {
        console.error('Error deleting receipt:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchReceipts();
});

// Additional code for the flag counter and jumpscare
const flag = document.getElementById('flag');
const clickCount = document.getElementById('click-count');
const jumpscare = document.getElementById('jumpscare');

let count = 0;

flag.addEventListener('click', () => {
    count++;
    clickCount.textContent = count;

    if (count === 15) {
        jumpscare.classList.add('visible');

        setTimeout(() => {
            jumpscare.classList.remove('visible');
        }, 3000);
    }
});
