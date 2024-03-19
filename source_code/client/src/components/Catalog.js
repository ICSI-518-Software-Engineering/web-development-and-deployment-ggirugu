import React, { useState } from "react";
import "./Catalog.css"; // Ensure your CSS file is imported
import { FaTrash, FaSave, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

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
    ]); // Initialize with an empty array or your items
    const [editItemId, setEditItemId] = useState(null);
    const [tempItem, setTempItem] = useState({ quantity: 0, price: 0 });
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '', imageUrl: null });

    const [showModal, setShowModal] = useState(false);


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

    const toggleModal = () => setShowModal(!showModal);

    const handleNewProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (event) => {
                setNewProduct({ ...newProduct, imageUrl: event.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        setItems([...items, { ...newProduct, id: newId }]);
        setNewProduct({ name: '', quantity: '', price: '', imageUrl: null });
        toggleModal();
    };

    return (
        <div className="catalog">
            <h1 className="catalog-heading">Bouquet Catalog</h1>
            <button className="add-product-button" onClick={toggleModal}><FaPlus /> Add Product</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}><FaTimes /></span>
                        <form onSubmit={handleAddProduct}>
                            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleNewProductChange} required />
                            <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleNewProductChange} required />
                            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleNewProductChange} required />
                            <input type="file" onChange={handleImageChange} required />
                            <button type="submit" className="submit-btn">Add Product</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="catalog-grid">
                {items.map(item => (
                    <div key={item.id} className="catalog-item">
                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                            <FaTrash />
                        </button>
                        <img src={item.imageUrl || 'placeholder.png'} alt={item.name} />
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







// const [items, setItems] = useState([
//     { id: 1, name: "Item 1", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat1.jpg' },
//     { id: 2, name: "Item 2", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat2.jpg' },
//     { id: 3, name: "Item 3", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat3.jpg' },
//     { id: 4, name: "Item 4", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat4.jpg' },
//     { id: 5, name: "Item 5", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat5.jpg' },
//     { id: 6, name: "Item 6", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat6.jpg' },
//     { id: 7, name: "Item 7", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat7.jpg' },
//     { id: 8, name: "Item 1", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat1.jpg' },
//     { id: 9, name: "Item 2", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat2.jpg' },
//     { id: 10, name: "Item 3", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat3.jpg' },
//     { id: 11, name: "Item 4", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat4.jpg' },
//     { id: 12, name: "Item 5", quantity: 5, price: 100, imageUrl: PUBLIC_URL + '/cat5.jpg' },
//     { id: 13, name: "Item 6", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat6.jpg' },
//     { id: 14, name: "Item 7", quantity: 3, price: 150, imageUrl: PUBLIC_URL + '/cat7.jpg' }// Your inventory items
// ]);