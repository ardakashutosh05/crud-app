function createTable() {
    fetch('/createTable')
        .then(res => res.text())
        .then(data => showMessage(data));
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
        .then(data => showMessage(data));
}

function getItems() {
    fetch('/getItems')
        .then(res => res.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (!data.length) {
                showMessage("No items found.");
                return;
            }

            // Create table
            let table = `<table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>`;
            data.forEach(item => {
                table += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                </tr>`;
            });
            table += "</tbody></table>";
            resultDiv.innerHTML = table;
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
        .then(data => showMessage(data));
}

function deleteItem() {
    const id = prompt('Enter item ID to delete:');
    if (!id) return;
    fetch(`/deleteItem/${id}`, { method: 'DELETE' })
        .then(res => res.text())
        .then(data => showMessage(data));
}

function showMessage(message) {
    document.getElementById('result').innerHTML = `<p>${message}</p>`;
}

