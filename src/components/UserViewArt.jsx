import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getArtById, addToWishlist,addToCart } from '../services/api'; 
import { getSession } from '../utils/cookieUtils'; // Import getSession utility
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import ShoppingCartIcon

const UserViewArt = () => {
    const { artId } = useParams(); 
    const [art, setArt] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate(); 
    const userId = getSession('userId'); // Retrieve userId from cookies

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

    const handleAddToCart = async () => {
        try {
            if (!userId) {
                alert("User not logged in. Please log in to add items to your cart.");
                navigate('/login'); // Redirect to login if userId is missing
                return;
            }
    
            const quantity = 1; // or get this from a state or input
            await addToCart(userId, art.id, quantity); // Include quantity
            alert(`${art.artTitle} has been added to your cart.`);
            navigate('/cart'); // Navigate to the cart after adding
        } catch (error) {
            console.error("Error adding to cart", error);
            alert("Failed to add to cart. Please try again.");
        }
    };
    

    const handleAddToWishlist = async () => {
        try {
            if (!userId) {
                alert("User not logged in. Please log in to add items to your wishlist.");
                navigate('/login'); // Redirect to login if userId is missing
                return;
            }

            await addToWishlist(userId, art.id); // Pass userId and artId to addToWishlist
            alert(`${art.artTitle} has been added to your wishlist.`);
            navigate('/wishlist');
        } catch (error) {
            console.error("Error adding to wishlist", error);
            alert("Failed to add to wishlist. Please try again.");
        }
    };

    if (!art) return <p>Loading...</p>;

    return (
        <div className="view-art-container">
            {/* Your existing styles and layout */}
            <style>{`
                body {
                    background-color: #1e1e1e;
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
                    .wishlist-icon:hover {
    background-color: #F95454; /* Lighter red for hover */
}
            `}</style>
            <div className="image-section">
                <img src={currentImage} alt={art.artTitle} />
                <div className="image-icons">
                    {art.pictureUrl1 && (
                        <img src={art.pictureUrl1} alt="Thumbnail 1" onClick={() => setCurrentImage(art.pictureUrl1)} />
                    )}
                    {art.pictureUrl2 && (
                        <img src={art.pictureUrl2} alt="Thumbnail 2" onClick={() => setCurrentImage(art.pictureUrl2)} />
                    )}
                    {art.pictureUrl3 && (
                        <img src={art.pictureUrl3} alt="Thumbnail 3" onClick={() => setCurrentImage(art.pictureUrl3)} />
                    )}
                    {art.pictureUrl4 && (
                        <img src={art.pictureUrl4} alt="Thumbnail 4" onClick={() => setCurrentImage(art.pictureUrl4)} />
                    )}
                </div>
            </div>

            <div className="art-details">
                <h2>{art.artTitle}</h2>
                <p>{art.description}</p>
                <p>Category: {art.category}</p>
                <p>Price: ${art.price ? art.price.toFixed(2) : 'N/A'}</p>
                <div className="buttons">
                    <IconButton onClick={handleAddToCart} color="primary">
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton className="wishlist-icon"  onClick={handleAddToWishlist} color="secondary">
                        <FavoriteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default UserViewArt;
