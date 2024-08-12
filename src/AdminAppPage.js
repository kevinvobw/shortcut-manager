import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppPage = () => {
    const [shortcuts, setShortcuts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/shortcuts')
            .then(response => {
                setShortcuts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the shortcuts!', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-4 mt-20">
            <h1 className="text-2xl font-bold text-center mb-8">Application Shortcuts</h1>
            <div className="flex flex-wrap justify-center">
                {shortcuts.map(shortcut => (
                    <a
                        key={shortcut.id}
                        href={`https://${shortcut.url}`}
                        className="bg-blue-500 text-white py-2 px-4 rounded m-2 transition duration-300 hover:bg-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {shortcut.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AdminAppPage;
