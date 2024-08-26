### README

# Web App - Category Management

This is a simple web application that allows users to manage categories. Users can create, view, update, and delete categories, which are fetched and updated via a REST API.

## Features
- **Create**: Add new categories with a name and description.
- **Read**: View a list of categories.
- **Update**: Edit existing categories by selecting them from the list.
- **Delete**: Remove categories.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/web-app.git
    cd web-app
    ```

2. Run the application by opening `index.html` in your browser.

3. Make sure the backend API is running locally at `https://localhost:7210/api/Categories`.

## Project Structure

- **HTML**: Provides the structure and form for category management.
- **CSS**: Styles the layout, including the sidebar and category display.
- **JavaScript**: Handles fetching categories from the API and updating the DOM based on user actions.

## Technologies Used
- HTML
- CSS
- JavaScript
- REST API (running at `https://localhost:7210/api/Categories`)

## Usage
- Enter a category name and description in the sidebar form.
- Click **Save** to add or update a category.
- Click on a category in the list to edit or delete it.

This app dynamically updates the list of categories and interacts with the backend to manage the data.
