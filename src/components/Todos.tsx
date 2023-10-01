import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CONSTANT = 'http://localhost:3333';

const Todos = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('at');

    const [data, setData] = useState<any>([]);
    const [todo, setTodo] = useState<string>('');
    const [toggle, setToggle] = useState<boolean>(false);
    const [update, setUpdate] = useState<string>('');

    useEffect(() => {
        if (!token || token === null || token === undefined) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const handleChange = async () => {
            try {
                const response = await fetch(`${CONSTANT}/tasks/alltasks`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                });

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log('Error: Something went wrong');
            }
        };
        handleChange();
    }, [update, todo, data, toggle]);

    const handleDelete = async (taskId: number) => {
        console.log(taskId);
        try {
            const response = await fetch(`${CONSTANT}/tasks/delete/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            });

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log('Error: Something went wrong');
        }
    };

    const handleAdd = async () => {
        if (!todo) {
            return;
        }

        try {
            const response = await fetch(`${CONSTANT}/tasks/addtask`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    task: todo,
                }),
            });

            const data: JSON = await response.json();
            console.log(data);
            setTodo('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateSubmit = async (taskId: number) => {
        if (!update) {
            return;
        }

        try {
            const response = await fetch(`${CONSTANT}/tasks/update/${taskId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    update,
                }),
            });

            const data: JSON = await response.json();
            console.log(data);
            setUpdate('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="todos-app">
            <h1 style={styles.header}>TODO Application</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Create a todo"
                    name="todo"
                    value={todo}
                    onChange={(e: any) => {
                        setTodo(e.target.value);
                    }}
                    onKeyPress={handleKeyPress} // Add this event handler
                    style={styles.input}
                />
            </div>
            {data.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.work}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
                                            Delete
                                        </button>
                                        {!toggle && (
                                            <button onClick={() => setToggle(!toggle)} style={styles.updateButton}>
                                                Update Task
                                            </button>
                                        )}
                                        {toggle && (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={update}
                                                    onChange={(e) => {
                                                        setUpdate(e.target.value);
                                                    }}
                                                    style={styles.updateInput}
                                                />
                                                <button
                                                    onClick={() => {
                                                        handleUpdateSubmit(item.id);
                                                        setToggle(!toggle);
                                                    }}
                                                    style={styles.updateButton}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div style={styles.noElement}>No elements in the todo</div>
            )}
        </div>
    );
};

const styles = {
    header: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    input: {
        width: "70%",
        padding: "10px",
        marginBottom: "10px",
        fontSize: "16px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
    },
    tableHead: {
        backgroundColor: "#007bff",
        color: "white",
    },
    tableCell: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        textAlign: "left",
    },
    addButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        fontSize: "18px",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "10px", // Add margin to separate the button from the input
    },
    listItem: {
        fontSize: "16px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        color: "white",
        padding: "5px 10px",
        fontSize: "14px",
        borderRadius: "3px",
        cursor: "pointer",
        marginLeft: "10px",
    },
    updateButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "5px 10px",
        fontSize: "14px",
        borderRadius: "3px",
        cursor: "pointer",
    },
    updateInput: {
        width: "60%",
        padding: "5px",
        fontSize: "14px",
        marginRight: "10px",
    },
    noElement: {
        fontSize: "16px",
        color: "#777",
    },
};

export default Todos;
