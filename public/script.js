function createTable() {
    fetch('/createTable')
        .then(res => res.text())
        .then(data => showResult(data));
}

function addItem() {
    const name = prompt('Enter item name:');
    if (!name) return;
    fetch('/addItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(res => res.text())
    .then(data => showResult(data));
}

function getItems() {
    fetch('/getItems')
        .then(res => res.json())
        .then(data => {
            if (!data.length) {
                showResult("No items found.");
                return;
            }
            const itemsList = data.map(item =>
                `ID: ${item.id} | Name: ${item.name}`
            ).join("\n");
            showResult(itemsList);
        });
}

function updateItem() {
    const id = prompt('Enter item ID to update:');
    const name = prompt('Enter new item name:');
    if (!id || !name) return;
    fetch(`/updateItem/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(res => res.text())
    .then(data => showResult(data));
}

function deleteItem() {
    const id = prompt('Enter item ID to delete:');
    if (!id) return;
    fetch(`/deleteItem/${id}`, { method: 'DELETE' })
        .then(res => res.text())
        .then(data => showResult(data));
}

function showResult(message) {
    document.getElementById('result').innerText = message;
}

