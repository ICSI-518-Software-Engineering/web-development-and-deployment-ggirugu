import React, { useState } from "react";
import "./Catalog.css"; // Ensure this CSS file is included
import { FaTrash, FaSave, FaEdit, FaTimes } from 'react-icons/fa';

const Catalog = () => {
    const PUBLIC_URL = process.env.PUBLIC_URL;

    const [items, setItems] = useState([
        { id: 1, name: "Item 1", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat1.jpg' },
        { id: 2, name: "Item 2", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat2.jpg' },
        { id: 3, name: "Item 3", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat3.jpg' },
        { id: 4, name: "Item 4", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat4.jpg' },
        { id: 5, name: "Item 5", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat5.jpg' },
        { id: 6, name: "Item 6", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat6.jpg' },
        { id: 7, name: "Item 7", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat7.jpg' },
        { id: 8, name: "Item 1", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat1.jpg' },
        { id: 9, name: "Item 2", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat2.jpg' },
        { id: 10, name: "Item 3", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat3.jpg' },
        { id: 11, name: "Item 4", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat4.jpg' },
        { id: 12, name: "Item 5", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat5.jpg' },
        { id: 13, name: "Item 6", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat6.jpg' },
        { id: 14, name: "Item 7", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat7.jpg' }// Your inventory items
    ]);
    const [editItemId, setEditItemId] = useState(null);
    const [tempItem, setTempItem] = useState({ quantity: 0, price: 0 });

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleEdit = (item) => {
        setEditItemId(item.id);
        setTempItem({ quantity: item.quantity, price: item.price });
    };

    const handleSave = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, ...tempItem } : item));
        setEditItemId(null);
    };

    const handleCancel = () => {
        setEditItemId(null);
    };

    const handleChange = (e, field) => {
        setTempItem({ ...tempItem, [field]: e.target.value });
    };

    return (
        <div className="catalog">
            <h1 className="catalog-heading">Bouquet Catalog</h1>
            <div className="catalog-grid">
                {items.map(item => (
                    <div key={item.id} className="catalog-item">
                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                            <FaTrash />
                        </button>
                        <img src={item.imageUrl} alt={item.name} />
                        <h2>{item.name}</h2>
                        {editItemId === item.id ? (
                            <div>
                                <input type="number" value={tempItem.quantity} onChange={(e) => handleChange(e, 'quantity')} />
                                <input type="number" value={tempItem.price} onChange={(e) => handleChange(e, 'price')} />
                                <button className="save-btn" onClick={() => handleSave(item.id)}><FaSave /></button>
                                <button className="cancel-btn" onClick={handleCancel}><FaTimes /></button>
                            </div>
                        ) : (
                            <div>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                                <button className="edit-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;





