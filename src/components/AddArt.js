import React, { useState } from 'react';
import { addArt } from '../services/api'; 
import AdminNavbar from './AdminNavbar';

const AddArt = () => {
    const [formData, setFormData] = useState({
        artTitle: '',
        description: '',
        category: '',
        price: '',
        file1: null,
        file2: null,
        file3: null,
        file4: null,
    });
    const [fileNames, setFileNames] = useState({
        file1: '',
        file2: '',
        file3: '',
        file4: '',
    });

    const [message, setMessage] = useState('');

    // const handleChange = (e) => {
    //     const { name, files } = e.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: files[0],
    //     }));
    // };
    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
    
        if (type === "file") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
            setFileNames((prevNames) => ({
                ...prevNames,
                [name]: files[0]?.name || '', 
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('artTitle', formData.artTitle);
        newFormData.append('description', formData.description);
        newFormData.append('category', formData.category);
        newFormData.append('price', formData.price);
        newFormData.append('file1', formData.file1);
        newFormData.append('file2', formData.file2);
        newFormData.append('file3', formData.file3);
        newFormData.append('file4', formData.file4);

        try {
            const response = await addArt(newFormData);
            setMessage('Art item added successfully!');
            console.log('Added art:', response);
        } catch (error) {
            setMessage('Error adding art item');
            console.error('Error adding art item:', error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="add-art-container">
                <style>{`
                    body {
                        background-color: #000;
                        font-family: 'Arial', sans-serif;
                    }

                    .add-art-container {
                        max-width: 500px;
                        margin: 50px auto;
                        background-color: #FF6500;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 8px 16px rgba(255, 101, 0, 0.3); /* Lightened shadow */
                        color: #fff;
                    }

                    h2 {
                        text-align: center;
                        color: #fff;
                        font-family: 'Arial', sans-serif;
                        font-size: 26px;
                        margin-bottom: 25px;
                    }

                    form {
                        display: flex;
                        flex-direction: column;
                    }

                    input[type="text"],
                    input[type="number"] {
                        padding: 12px;
                        margin-bottom: 20px;
                        border: 1px solid #FF804D; /* Slightly darker orange */
                        border-radius: 5px;
                        background-color: #FF944C; /* Lighter orange for input background */
                        color: #fff;
                        font-size: 16px;
                    }

                    input[type="text"]:focus,
                    input[type="number"]:focus {
                        outline: none;
                        border-color: #FFAD66; /* Lighter border color on focus */
                        background-color: #FF804D;
                    }

                    .file-upload {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #FF804D;
                        border: 1px solid #FF944C;
                        color: #fff;
                        font-size: 16px;
                        padding: 10px;
                        margin-bottom: 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        position: relative;
                        height: 38px; /* Decreased height */
                        transition: background-color 0.3s ease;
                    }

                    .file-upload:hover {
                        background-color: #FF944C;
                    }

                    .file-upload input[type="file"] {
                        display: none;
                    }

                    .file-upload span {
                        font-size: 18px;
                        margin-left: 10px;
                    }

                    .plus-icon {
                        background-color: #28a745;
                        color: white;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 20px;
                        line-height: 20px;
                        cursor: pointer;
                    }

                    button {
                        padding: 12px;
                        background-color: #FF944C; /* Orange button color */
                        color: white;
                        font-size: 18px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    button:hover {
                        background-color: #FF804D;
                    }

                    p {
                        text-align: center;
                        margin-top: 15px;
                        color: #28a745;
                        font-weight: bold;
                        font-family: 'Arial', sans-serif;
                    }

                    p.error {
                        color: #dc3545;
                    }
                `}</style>

                <h2>Add Art</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="artTitle"
                        placeholder="Art Title"
                        value={formData.artTitle}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="ArtistName"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <label className="file-upload">
                        <div className="plus-icon">+</div>
                        <span>Upload Image 1</span>
                        <input
                            type="file"
                            name="file1"
                            onChange={handleChange}
                            required
                        />
                        
                        <div className="file-name">{fileNames.file1 || "  No file chosen"}</div>
                    </label>

                    <label className="file-upload">
                        <div className="plus-icon">+</div>
                        <span>Upload Image 2</span>
                        <input
                            type="file"
                            name="file2"
                            onChange={handleChange}
                            required
                        />                  
                         <div className="file-name">{fileNames.file2 || "No file chosen"}</div>

                    </label>

                    <label className="file-upload">
                        <div className="plus-icon">+</div>
                        <span>Upload Image 3</span>
                        <input
                            type="file"
                            name="file3"
                            onChange={handleChange}
                            required
                        />
                    <div className="file-name">{fileNames.file3 || "No file chosen"}</div>

                    </label>

                    <label className="file-upload">
                        <div className="plus-icon">+</div>
                        <span>Upload Image 4</span>
                        <input
                            type="file"
                            name="file4"
                            onChange={handleChange}
                            required
                        />
                    <div className="file-name">{fileNames.file4 || "No file chosen"}</div>

                    </label>

                    <button type="submit">Add Art</button>
                </form>
                {message && <p className={message.includes('Error') ? 'error' : ''}>{message}</p>}
            </div>
        </>
    );
};

export default AddArt;
