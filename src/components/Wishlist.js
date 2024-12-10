import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWishlist, removeFromWishlist, clearWishlist } from '../services/api';
import { IconButton, Button, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSession } from '../utils/cookieUtils';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRefs = useRef({});
    const [scrollVisibility, setScrollVisibility] = useState({});
    const navigate = useNavigate();
    const userId = getSession('userId'); // Retrieve userId from cookies

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getUserWishlist(userId);
                setWishlist(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [userId]);

    const handleRemoveFromWishlist = async (wishlistItemId) => {
        try {
            await removeFromWishlist(wishlistItemId);
            setWishlist(wishlist.filter(item => item.id !== wishlistItemId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClearWishlist = async () => {
        try {
            await clearWishlist(userId);
            setWishlist([]);
        } catch (err) {
            setError(err.message);
        }
    };

    const onScroll = (category) => {
        const scrollContainer = scrollRefs.current[category];
        if (scrollContainer) {
            const isAtStart = scrollContainer.scrollLeft === 0;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;

            setScrollVisibility((prev) => ({
                ...prev,
                [category]: {
                    showLeft: !isAtStart,
                    showRight: !isAtEnd,
                },
            }));
        }
    };

    const scrollLeft = (category) => {
        scrollRefs.current[category].scrollBy({
            top: 0,
            left: -300,
            behavior: 'smooth',
        });
    };

    const scrollRight = (category) => {
        scrollRefs.current[category].scrollBy({
            top: 0,
            left: 300,
            behavior: 'smooth',
        });
    };

    const goToArtDetail = (artId) => {
        navigate(`/art/${artId}`);
    };

    if (loading) return <CircularProgress color="secondary" />;
    if (error) return <Typography color="error">Error: {error}</Typography>;

    const groupedWishlist = wishlist.reduce((acc, item) => {
        const category = item.art?.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    return (
        <div style={styles.container}>
            <Typography variant="h4" gutterBottom style={styles.title}>
                Your Wishlist
            </Typography>
            {wishlist.length === 0 ? (
                <Typography variant="body1" style={styles.noItemsText}>
                    No items in your wishlist.
                </Typography>
            ) : (
                Object.entries(groupedWishlist).map(([category, items]) => (
                    <div key={category} style={{ marginBottom: '30px' }}>
                        <Typography variant="h5" style={styles.categoryTitle}>
                            {category}
                        </Typography>
                        <div style={styles.sliderWrapper}>
                            {scrollVisibility[category]?.showLeft && (
                                <IconButton onClick={() => scrollLeft(category)} style={{ ...styles.scrollButton, left: 0 }}>
                                    <ArrowBackIcon style={styles.icon} />
                                </IconButton>
                            )}
                            <div
                                ref={(el) => (scrollRefs.current[category] = el)}
                                onScroll={() => onScroll(category)}
                                style={styles.wishlistSlider}
                            >
                                {items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        style={styles.cardWrapper}
                                        onClick={() => goToArtDetail(item.art.id)}
                                    >
                                        <Card style={styles.card}>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={item.art?.pictureUrl1 || 'default.jpg'}
                                                alt={item.art?.artTitle || 'Artwork'}
                                                style={styles.cardImage}
                                            />
                                            <CardContent style={styles.cardContent}>
                                                <Typography variant="h6" style={styles.artTitle}>
                                                    {item.art?.artTitle || 'N/A'}
                                                </Typography>
                                                <Typography variant="body2" style={styles.description}>
                                                    {item.art?.description || 'No description available'}
                                                </Typography>
                                                <Typography variant="body2" style={styles.category}>
                                                    Category: {item.art?.category || 'N/A'}
                                                </Typography>
                                                <Typography variant="body1" style={styles.price}>
                                                    Price: ${item.art?.price ? item.art.price.toFixed(2) : 'N/A'}
                                                </Typography>
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveFromWishlist(item.id);
                                                    }}
                                                    style={styles.deleteButton}
                                                >
                                                    <DeleteIcon /> Remove
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            {scrollVisibility[category]?.showRight && (
                                <IconButton onClick={() => scrollRight(category)} style={{ ...styles.scrollButton, right: 0 }}>
                                    <ArrowForwardIcon style={styles.icon} />
                                </IconButton>
                            )}
                        </div>
                    </div>
                ))
            )}
            <Button
                onClick={handleClearWishlist}
                variant="contained"
                startIcon={<ClearAllIcon />}
                style={styles.clearButton}
                disabled={wishlist.length === 0}
            >
                Clear Wishlist
            </Button>
        </div>
    );
};

// Inline CSS styles for Wishlist Component
const styles = {
    container: {
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px',
        background: 'linear-gradient(135deg, #1b1b2f 30%, #2c2c47)',
        color: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    },
    title: {
        color: '#FFD700',
        fontWeight: 'bold',
    },
    noItemsText: {
        color: '#b3b3b3',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    categoryTitle: {
        color: '#FFD700',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    sliderWrapper: {
        position: 'relative',
        overflow: 'hidden',
    },
    wishlistSlider: {
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        padding: '20px 0',
        scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For IE and Edge
    },
    cardWrapper: {
        display: 'inline-block',
        minWidth: '300px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    card: {
        backgroundColor: '#2e2e3d',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
        width: '300px',
        transition: 'transform 0.2s',
    },
    cardImage: {
        borderRadius: '15px 15px 0 0',
        objectFit: 'cover',
    },
    cardContent: {
        color: '#d1d1e9',
        padding: '16px',
    },
    artTitle: {
        color: '#FFD700',
        fontWeight: 'bold',
    },
    description: {
        color: '#b3b3b3',
        marginTop: '8px',
    },
    category: {
        marginTop: '10px',
        color: '#b3b3b3',
    },
    price: {
        fontWeight: 'bold',
        marginTop: '5px',
        color: '#FFD700',
    },
    deleteButton: {
        marginTop: '15px',
        color: '#FFD700',
    },
    scrollButton: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#333',
    },
    icon: {
        color: '#FFD700',
    },
    clearButton: {
        marginTop: '20px',
        backgroundColor: '#FFD700',
        color: '#1b1b2f',
        borderRadius: '25px',
        padding: '10px 20px',
        fontWeight: 'bold',
        width: '100%',
    },
};

export default Wishlist;
