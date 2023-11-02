let base_URL = "http://localhost:3000/posts";
let table = document.getElementById("table");
let data = [];
let currentEditPostId = null;

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
            <td><button class="editButton" data-id="${element.id}">Edit</button></td>
            <td><button class="deleteButton" data-id="${element.id}">Delete</button></td>
        `;
        table.appendChild(newRow);
    });

    const editButtons = document.querySelectorAll(".editButton");
    const deleteButtons = document.querySelectorAll(".deleteButton");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const postId = button.getAttribute("data-id");
            EditPost(postId);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const postId = button.getAttribute("data-id");
            deletePost(postId);
        });
    });
    
    
}
const updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", function (e) {
    e.preventDefault();
    updatePost(); 
    FetchData(); 
});


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

async function EditPost(postId) {
    currentEditPostId = postId;
    try {
        const response = await axios.get(`${base_URL}/${postId}`)
        const post = response.data

        document.getElementById("Name").value = post.title
        document.getElementById("ID").value = post.body

    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    if (currentEditPostId !== null) {
        let titleInput = document.getElementById("Name").value;
        let bodyInput = document.getElementById("ID").value;

        try {
            await axios.put(`${base_URL}/${currentEditPostId}`, {
                title: titleInput,
                body: bodyInput
            });
        } catch (error) {
            console.log(error);
        }

        currentEditPostId = null; 
    }
}

async function deletePost(postId) {
    try {
        await axios.delete(`${base_URL}/${postId}`);
        FetchData();
    } catch (error) {
        console.log(error);
    }
}

FetchData();
