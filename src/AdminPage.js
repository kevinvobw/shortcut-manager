import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [shortcuts, setShortcuts] = useState([]);
    const [newShortcut, setNewShortcut] = useState({ name: '', url: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/shortcuts')
            .then(response => {
                setShortcuts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the shortcuts!', error);
            });
    }, []);

    const handleAddShortcut = () => {
        axios.post('http://localhost:5000/shortcuts', newShortcut)
            .then(() => {
                setShortcuts([...shortcuts, newShortcut]);
                setNewShortcut({ name: '', url: '' });
            })
            .catch(error => {
                console.error('There was an error adding the shortcut!', error);
            });
    };

    const handleDeleteShortcut = (id) => {
        axios.delete(`http://localhost:5000/shortcuts/${id}`)
            .then(() => {
                setShortcuts(shortcuts.filter(shortcut => shortcut.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the shortcut!', error);
            });
    };

    const handleUpdateShortcut = (id, updatedShortcut) => {
        axios.put(`http://localhost:5000/shortcuts/${id}`, updatedShortcut)
            .then(() => {
                setShortcuts(shortcuts.map(shortcut => shortcut.id === id ? updatedShortcut : shortcut));
            })
            .catch(error => {
                console.error('There was an error updating the shortcut!', error);
            });
    };

    return (
        <div className="container mx-auto p-4 mt-20">
            <h1 className="text-2xl font-bold text-center mb-8">Admin Panel</h1>
            <div className="mb-8">
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Application Name"
                    value={newShortcut.name}
                    onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })}
                />
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Application URL"
                    value={newShortcut.url}
                    onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
                />
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                    onClick={handleAddShortcut}
                >
                    Add Shortcut
                </button>
            </div>

            <ul className="space-y-4">
                {shortcuts.map(shortcut => (
                    <li key={shortcut.id} className="flex justify-between items-center p-4 border rounded">
                        <span>{shortcut.name}</span>
                        <div>
                            <button
                                className="bg-yellow-500 text-white py-1 px-2 rounded mx-2 hover:bg-yellow-600 transition duration-300"
                                onClick={() => handleUpdateShortcut(shortcut.id, shortcut)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteShortcut(shortcut.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
