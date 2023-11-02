let base_URL = "https://northwind.vercel.app/api/categories";
let table = document.getElementById("table");
let data = []; 

async function FetchData(params) {
    try {
        const response = await axios.get(base_URL);
        data = response.data;
        responseData();
    } catch (error) {
        console.log(error);
    }
}

const responseData = () => {
    table.innerHTML = '';
    data.forEach(item => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.userId}</td>
        `;
        table.appendChild(newRow);
    });
}

async function createButton(params) {
    let nameInput = document.getElementById("Name").value;
    let idInput = document.getElementById("ID").value;
    try {
        await axios.post(base_URL, {
            name: nameInput,
            id: idInput
        });
        FetchData();
    } catch (error) {
        console.log(error);
    }
}


FetchData();
