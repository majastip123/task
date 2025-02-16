import React, { useEffect, useState } from "react";
import { getTodos } from "../services/api";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ToDoList = () => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [completed, setCompleted] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTodos();
                setList(data);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        const savedList = JSON.parse(localStorage.getItem('list')) || [];
        const savedCompleted = JSON.parse(localStorage.getItem('completed')) || [];
        setList(savedList);
        setCompleted(savedCompleted);

        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        localStorage.setItem('completed', JSON.stringify(completed));
    }, [completed]);

    const removeTask = (val) => {
        setList(list.filter(item => item.id !== val));
    };

    const addTask = () => {
        if (newTask.trim() === "") return;

        const newTaskObj = {
            id: list.length ? list[list.length - 1].id + 1 : 1,
            title: newTask,
            completed: false
        };

        setList([...list, newTaskObj]);
        setNewTask("");
    };

    const handleTask = (val) => {
        if (completed.includes(val)) {
            setCompleted(completed.filter(item => item !== val));
        } else {
            setCompleted([...completed, val]);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>To Do List</h1>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', alignItems: 'center' }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => { e.preventDefault(); addTask(); }}
            >
                <TextField
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new Task"
                    variant="outlined"
                    sx={{ height: '56px' }}
                />
                <Button
                    variant="contained"
                    sx={{ height: '56px' }}
                    onClick={addTask}
                >
                    Add
                </Button>
            </Box>
            <br />
            <List sx={{ width: '100%', maxWidth: 500 }}>
                {list.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItem
                            key={value.id}
                            secondaryAction={
                                <Button
                                    variant="outlined"
                                    onClick={() => removeTask(value.id)}
                                >
                                    Delete
                                </Button>
                            }
                            disablePadding
                        >
                            <ListItemButton
                                role={'button'}
                                onClick={() => handleTask(value)}
                                dense
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={completed.includes(value)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={value.title}
                                    sx={{ marginRight: 2, maxWidth: 300 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};

export default ToDoList;