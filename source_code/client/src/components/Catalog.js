import React, { useState, useEffect } from "react";
import "./Catalog.css"; // Ensure your CSS file is imported
import { FaTrash, FaSave, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const Catalog = () => {
    const [items, setItems] = useState([]); // Initialize with an empty array or your items
    const [editItemId, setEditItemId] = useState(null);
    const [tempItem, setTempItem] = useState({ quantity: 0, price: 0 });
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '', imageUrl: null });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);


    const openDeleteModal = (id) => {
        setDeleteItemId(id);
        setDeleteModalVisible(true);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://ec2-35-171-185-33.compute-1.amazonaws.com:9000/products'); // Adjust the URL to match your backend API endpoint
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setErrorMessage('Error fetching products');
            }
        };
        fetchProducts();
    }, []);



    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://ec2-35-171-185-33.compute-1.amazonaws.com:9000/products/${id}`);
            setItems(items.filter(item => item._id !== id));
            setDeleteModalVisible(false);
            setSuccessMessage('Product deleted successfully.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error deleting product:', error);
            setErrorMessage('Error deleting product');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    const handleEdit = (item) => {
        setEditItemId(item._id);
        setTempItem({ name: item.name, quantity: item.quantity, price: item.price });
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://ec2-35-171-185-33.compute-1.amazonaws.com:9000/product/${id}`, {
                name: tempItem.name,
                quantity: tempItem.quantity,
                price: tempItem.price
            });
            setItems(items.map(item => item._id === id ? { ...item, ...tempItem } : item));
            setEditItemId(null);
            setSuccessMessage('Product updated successfully.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating product:', error);
            setErrorMessage('Error updating product');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
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

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            try {
                const response = await axios.post('http://ec2-35-171-185-33.compute-1.amazonaws.com:9000/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setNewProduct({ ...newProduct, imageUrl: response.data.imageUrl });
            } catch (error) {
                console.error('Error uploading image:', error);
                setErrorMessage('Error uploading image');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://ec2-35-171-185-33.compute-1.amazonaws.com:9000/add-product', newProduct);
            const addedProduct = response.data;
            setItems([...items, addedProduct]);
            setNewProduct({ name: '', quantity: '', price: '', imageUrl: null });
            toggleModal();
            setSuccessMessage('Product added successfully.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Error adding product');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <div className="catalog">
            <div className={`success-message ${successMessage ? 'show' : ''}`}>{successMessage}</div>
            <div className={`error-message ${errorMessage ? 'show' : ''}`}>{errorMessage}</div>
            <div class="catalog-heading-container">
                <h2 class="catalog-heading">Bouquet Catalog</h2>
                <button className="add-product-button" onClick={toggleModal}><FaPlus /> Add Product</button>
            </div>
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
            {deleteModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={() => handleDelete(deleteItemId)}>Yes, Delete</button>
                        <button onClick={() => setDeleteModalVisible(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {items.length === 0 && (
                <div className="empty-inventory-message">Inventory is empty</div>
            )}
            <div className="catalog-grid">
                {items.map(item => (
                    <div key={item._id} className="catalog-item">
                        <button className="delete-btn" onClick={() => openDeleteModal(item._id)}>
                            <FaTrash />
                        </button>
                        <img src={item.imageUrl || 'placeholder.png'} alt={item.name} />

                        {editItemId === item._id ? (
                            <div>
                                <input type="text" value={tempItem.name} onChange={(e) => handleChange(e, 'name')} />
                                <input type="number" value={tempItem.quantity} onChange={(e) => handleChange(e, 'quantity')} />
                                <input type="number" value={tempItem.price} onChange={(e) => handleChange(e, 'price')} />
                                <button className="save-btn" onClick={() => handleSave(item._id)}><FaSave /></button>
                                <button className="cancel-btn" onClick={handleCancel}><FaTimes /></button>
                            </div>
                        ) : (
                            <div>
                                <h2>{item.name}</h2>
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
