const form = document.getElementById('todo-form');
        const todoList = document.getElementById('todo_list');
        const titleInput = document.getElementById('title-input');
        const priceInput = document.getElementById('price-input');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const itemName = titleInput.value;
            const itemPrice = priceInput.value;

            if (!itemName) return; 

            const receiptItem = document.createElement('div');
            receiptItem.classList.add('receipt-item');

            const itemNameElement = document.createElement('span');
            itemNameElement.classList.add('receipt-item-name');
            itemNameElement.textContent = itemName;

            const itemPriceElement = document.createElement('span');
            itemPriceElement.classList.add('receipt-item-price');
            itemPriceElement.textContent = itemPrice ? `$${parseFloat(itemPrice).toFixed(2)}` : ''; 

            const deleteButton = document.createElement('delete-button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                todoList.removeChild(receiptItem);
            });

            receiptItem.appendChild(itemNameElement);
            receiptItem.appendChild(itemPriceElement);
            receiptItem.appendChild(deleteButton);
            todoList.appendChild(receiptItem);

            titleInput.value = '';
            priceInput.value = '';
        });

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
