import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getArtById, deleteArtById } from '../services/api'; 

const ViewArt = () => {
    const { artId } = useParams(); 
    const [art, setArt] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const artData = await getArtById(artId); 
                setArt(artData);
                setCurrentImage(artData.pictureUrl1); 
            } catch (error) {
                console.error('Error fetching art details:', error);
            }
        };

        fetchArt();
    }, [artId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this art?");
        if (confirmed) {
            try {
                await deleteArtById(artId);
                navigate('/view-art'); 
            } catch (error) {
                console.error('Error deleting art:', error);
                alert('Failed to delete art.');
            }
        }
    };

    const handleUpdate = () => {
        navigate(`/arts/update/${artId}`);
    };

    if (!art) return <p>Loading...</p>;

    return (
        <div className="view-art-container">
           <style>{`
            body {
                background-color: #1e1e1e; /* Dark background for the entire page */
                color: #f0f0f0;
                font-family: 'Arial', sans-serif;
            }

            .view-art-container {
                display: flex;
                padding: 30px;
                background-color: #2c2c2c;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
                margin: 30px auto;
                max-width: 1200px;
            }

            .image-section {
                flex: 1;
                padding-right: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .image-section img {
                width: 100%;
                height: 400px;
                object-fit: contain;
                border-radius: 15px;
                box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
                transition: transform 0.3s ease-in-out;
            }

            .image-section img:hover {
                transform: scale(1.05);
            }

            .image-icons {
                display: flex;
                margin-top: 20px;
                justify-content: center;
            }

            .image-icons img {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 10px;
                margin-right: 10px;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.3s;
                box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
            }

            .image-icons img:hover {
                border-color: #ff6f61;
                transform: scale(1.1);
            }

            .art-details {
                flex: 1;
                padding-left: 20px;
                background: #333;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1);
            }

            .art-details h2 {
                font-size: 32px;
                margin-bottom: 20px;
                color: #f0f0f0;
            }

            .art-details p {
                font-size: 18px;
                color: #ddd;
                line-height: 1.5;
                margin-bottom: 10px;
            }

            .buttons {
                display: flex;
                justify-content: flex-start;
                gap: 15px;
                margin-top: 20px;
            }

            .buttons button {
                padding: 10px 20px;
                font-size: 16px;
                border-radius: 25px;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s ease;
                box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
            }

            .buttons button:first-child {
                background-color: #ff6f61;
                color: white;
            }

            .buttons button:first-child:hover {
                background-color: #ff4a3b;
            }

            .buttons button:last-child {
                background-color: #007bff;
                color: white;
            }

            .buttons button:last-child:hover {
                background-color: #0056b3;
            }
        `}</style>

            <div className="image-section">
                <img src={currentImage} alt={art.artTitle} />
                <div className="image-icons">
                    <img src={art.pictureUrl1} alt="Thumbnail 1" onClick={() => setCurrentImage(art.pictureUrl1)} />
                    <img src={art.pictureUrl2} alt="Thumbnail 2" onClick={() => setCurrentImage(art.pictureUrl2)} />
                    <img src={art.pictureUrl3} alt="Thumbnail 3" onClick={() => setCurrentImage(art.pictureUrl3)} />
                    <img src={art.pictureUrl4} alt="Thumbnail 4" onClick={() => setCurrentImage(art.pictureUrl4)} />
                </div>
            </div>

            <div className="art-details">
                <h2>{art.artTitle}</h2>
                <p>{art.description}</p>
                <p>Category: {art.category}</p>
                <p>Price: ${art.price ? art.price.toFixed(2) : 'N/A'}</p>
                <div className="buttons">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default ViewArt;
