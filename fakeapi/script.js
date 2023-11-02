let base_URL = "http://localhost:3000/posts";
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
    data.forEach(element => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.body}</td>
        `;
        table.appendChild(newRow);
    });
}

async function createButton() {
    let nameInput = document.getElementById("Name").value;
    let idInput = document.getElementById("ID").value;
    try {
        await axios.post(base_URL, {
            title: nameInput,
            body: idInput
        });
        FetchData();
    } catch (error) {
        console.log(error);
    }
    console.log("salam");
}


FetchData();
