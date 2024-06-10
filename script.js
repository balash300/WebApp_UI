const saveButton = document.querySelector("#saveButton");
const nameInput = document.querySelector("#categoryName");
// const productInput = document.querySelector("#categoryProduct");
const descriptionInput = document.querySelector("#description");
const categoriesContainer = document.querySelector("#web_container");
const deleteButton = document.querySelector("#deleteButton");

function clearCategory() {
    nameInput.value = '';
    descriptionInput.value = '';
    deleteButton.classList.add("hidden");
}

function displayCategoryInForm(category) {
    nameInput.value = category.name;
    descriptionInput.value = category.description;
    deleteButton.classList.remove("hidden");
    deleteButton.dataset.id = category.id;
    saveButton.dataset.id = category.id;
}

async function getCategory(id) {
    try {
        const response = await fetch(`https://localhost:7210/api/Categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        displayCategoryInForm(data);
    } catch (error) {
        console.error(error);
    }
}

function populateCategory(id) {
    getCategory(id)
}

async function saveCategory(name, description) {
    const body = {
        name: name,
        description: description,
        products: null
    };

    try {
        const response = await fetch('https://localhost:7210/api/Categories', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);
        clearCategory();
        getAllCategories();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function displayCategories(categories) {
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('content');
        categoryElement.setAttribute("data-id", category.id);

        const categoryName = document.createElement('h3');
        categoryName.textContent = category.name;

        const categoryDescription = document.createElement('p');
        categoryDescription.textContent = category.description;

        categoryElement.appendChild(categoryName);
        categoryElement.appendChild(categoryDescription);

        categoriesContainer.appendChild(categoryElement);
    });

    document.querySelectorAll(".content").forEach(x => {
        x.addEventListener("click", function() {
            populateCategory(x.dataset.id);
        });
    })
}


async function getAllCategories() {
    try {
        const response = await fetch('https://localhost:7210/api/Categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        
        if (data && Array.isArray(data.$values)) {
            displayCategories(data.$values);
        } else {
            console.error('Expected an array in $values but got:', data);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

getAllCategories();

async function updateCategory(id, name, description) {
    const body = {
        id: id,
        name: name,
        description: description,
        products: null
    };

    try {
        const response = await fetch(`https://localhost:7210/api/Categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        clearCategory();
        getAllCategories();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

saveButton.addEventListener('click', function() {
    const id = saveButton.dataset.id;

    if (id) {
        updateCategory(id, nameInput.value, descriptionInput.value);
    } else {
        saveCategory(nameInput.value, descriptionInput.value);
    }
})

async function deleteCategory(id) {
    try {
        const response = await fetch(`https://localhost:7210/api/Categories/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        clearCategory();
        getAllCategories();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


deleteButton.addEventListener('click', function() {
    const id = deleteButton.dataset.id;
    deleteCategory(id);
});