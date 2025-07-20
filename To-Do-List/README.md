# To-Do List App

A modern, responsive To-Do List application built with React and TypeScript. This app allows users to manage their daily tasks efficiently, with features like filtering, persistent storage, and API integration.

## Features

- Add, complete, and delete tasks
- Filter tasks by all, completed, or pending
- Data persistence using localStorage
- API integration for fetching, adding, and deleting tasks (DummyJSON)
- Loading indicators for data fetching, adding, and deleting
- Confirmation modal for deleting tasks
- Toast notifications for user
- Responsive and clean UI

## Tech Stack

- React
- TypeScript
- Tailwind CSS (for styling)
- DummyJSON API (for backend simulation)
- react-hot-toast (for notifications)

## Usage

- **Add Task:** Enter a task in the input field and click "Add".
- **Complete Task:** Click on a task to toggle its completion status.
- **Delete Task:** Click the delete icon, confirm in the modal.
- **Filter Tasks:** Use the filter buttons to view all, completed, or pending tasks.

## API Reference

This app uses [DummyJSON](https://dummyjson.com/) for simulating backend operations:
- Fetch tasks: `GET https://dummyjson.com/todos`
- Add task: `POST https://dummyjson.com/todos/add`
- Delete task: `DELETE https://dummyjson.com/todos/{id}`

## Customization
- You can modify the UI and logic in the `src/components` directory.
- API logic is abstracted in `src/services/todoService.ts`.

## License

This project is open source and available under the [MIT License](LICENSE).
