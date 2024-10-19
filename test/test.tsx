'use client'

// import React from 'react';
// import styles from './test.module.css';

// export default function test (): JSX.Element {
// // Your Test Starts Here
//     return (
//         <div className={styles.container}>
            
//         </div>
//     );
// };


import React, { useState } from "react";
import styles from "./test.module.css";

// Define the structure for each Todo item (id, text, and whether it's in edit mode)
interface TodoItem {
    id: number;
    text: string;
    isEditing: boolean;
}

const Todo = () => {
    // State to manage the list of todo items
    const [todos, setTodos] = useState<TodoItem[]>([]);
    
    // State for the new todo item input field
    const [newTodo, setNewTodo] = useState<string>("");

    // State for temporary error messages (e.g., if no input is provided)
    const [error, setError] = useState<string>("");

    // State to track the currently edited task text
    const [editText, setEditText] = useState<string>("");

    // Function to add a new todo item
    const handleAddTodo = () => {
        // Validate input: Check if the input is empty or just whitespace
        if (!newTodo.trim()) {
            setError("Please enter a valid todo item.");
            return;
        }

        // Create a new todo item and add it to the state
        setTodos([...todos, { id: Date.now(), text: newTodo, isEditing: false }]);

        // Clear the input field and error
        setNewTodo("");
        setError("");
    };

    // Function to delete a todo item by its id
    const handleDeleteTodo = (id: number) => {
        // Filter out the todo item with the matching id
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Function to enable/disable edit mode for a todo item
    const toggleEditTodo = (id: number, currentText: string) => {
        // Set the current task's text to the editText state for editing
        setEditText(currentText);

        // Toggle the editing mode of the selected task
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    // Function to save the edited text for a todo item
    const handleSaveTodo = (id: number) => {
        // Update the text of the todo item and disable the edit mode
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText, isEditing: false } : todo
            )
        );

        // Clear the temporary edit text state
        setEditText("");
    };

    return (
        <div className={styles.todoContainer}>
            {/* Page title */}
            <h2 className={styles.todoHeading}>Abel Okoh Todo List</h2>

            {/* Input and button to add new tasks */}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handleAddTodo} className={styles.addButton}>
                    Add
                </button>
            </div>

            {/* Display error message when input is invalid */}
            {error && <p className={styles.error}>{error}</p>}

            {/* List of todo items */}
            <ul className={styles.todoList}>
                {todos.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                        {todo.isEditing ? (
                            // Input field to edit the task text when in edit mode
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className={styles.editInput}
                            />
                        ) : (
                            // Display the task text when not in edit mode
                            <span>{todo.text}</span>
                        )}

                        {/* Button to toggle edit mode or save the edited task */}
                        {todo.isEditing ? (
                            <button
                                onClick={() => handleSaveTodo(todo.id)}
                                className={styles.editButton}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => toggleEditTodo(todo.id, todo.text)}
                                className={styles.editButton}
                            >
                                Edit
                            </button>
                        )}

                        {/* Button to delete the task */}
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
