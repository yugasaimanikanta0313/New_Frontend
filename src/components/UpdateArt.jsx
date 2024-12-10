import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtById, updateArtById } from '../services/api'; // Assuming this API exists

const UpdateArt = () => {
    const { artId } = useParams(); 
    const navigate = useNavigate();
    const [art, setArt] = useState({
        artTitle: '',
        description: '',
        category: '',
        price: '',
        pictureFile1: null,
        pictureFile2: null,
        pictureFile3: null,
        pictureFile4: null,
    });

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const artData = await getArtById(artId);
                setArt({
                    ...artData,
                    pictureFile1: artData.picture1 || null,
                    pictureFile2: artData.picture2 || null,
                    pictureFile3: artData.picture3 || null,
                    pictureFile4: artData.picture4 || null,
                });
            } catch (error) {
                console.error('Error fetching art:', error);
            }
        };
        fetchArt();
    }, [artId]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setArt((prevArt) => ({
            ...prevArt,
            [name]: files ? files[0] : value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('artTitle', art.artTitle);
        formData.append('description', art.description);
        formData.append('category', art.category);
        formData.append('price', art.price);
        
        // Append images if selected
        ['pictureFile1', 'pictureFile2', 'pictureFile3', 'pictureFile4'].forEach((file, index) => {
            if (art[file]) formData.append(`picture${index + 1}`, art[file]);
        });

        try {
            await updateArtById(artId, formData); 
            alert("Art updated successfully");
            navigate('/art-gallery'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating art:', error);
        }
    };

    const styles = {
        container: {
            backgroundColor: '#121212',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        form: {
            maxWidth: '600px',
            width: '100%',
            padding: '30px',
            backgroundColor: '#1f1f1f',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
            color: '#fff',
        },
        heading: {
            textAlign: 'center',
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#ff5722',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            backgroundColor: '#333',
            border: '1px solid #555',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
        },
        textarea: {
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            backgroundColor: '#333',
            border: '1px solid #555',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            height: '120px',
            resize: 'vertical',
        },
        button: {
            width: '100%',
            padding: '14px',
            fontSize: '1.2rem',
            color: '#fff',
            backgroundColor: '#ff5722',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: 'bold',
            marginTop: '10px',
        },
        fileInputWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px',
        },
        fileLabel: {
            backgroundColor: '#ff5722',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
        },
        fileName: {
            color: '#bdbdbd',
            fontStyle: 'italic',
        },
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleUpdate} encType="multipart/form-data" style={styles.form}>
                <h2 style={styles.heading}>Update Art</h2>
                <input
                    type="text"
                    name="artTitle"
                    value={art.artTitle}
                    onChange={handleInputChange}
                    placeholder="Title"
                    style={styles.input}
                />
                <textarea
                    name="description"
                    value={art.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    style={styles.textarea}
                />
                <input
                    type="text"
                    name="category"
                    value={art.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    style={styles.input}
                />
                <input
                    type="number"
                    name="price"
                    value={art.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    style={styles.input}
                />

                {[1, 2, 3, 4].map((index) => (
                    <div key={index} style={styles.fileInputWrapper}>
                        <label
                            htmlFor={`pictureFile${index}`}
                            style={styles.fileLabel}
                        >
                            Upload Image {index}
                        </label>
                        <span style={styles.fileName}>
                            {art[`pictureFile${index}`] ? art[`pictureFile${index}`].name : 'No file chosen'}
                        </span>
                        <input
                            id={`pictureFile${index}`}
                            type="file"
                            name={`pictureFile${index}`}
                            onChange={handleInputChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                ))}

                <button type="submit" style={styles.button}>
                    Update Art
                </button>
            </form>
        </div>
    );
};

export default UpdateArt;
