import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getArts } from '../services/api';
import { getSession } from '../utils/cookieUtils';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#121212',
        color: 'white',
        minHeight: '100vh',
    },
    sliderWrapper: {
        width: '80%',
        maxWidth: '800px',
        position: 'relative',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    slide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        transition: 'transform 0.5s ease, opacity 0.5s ease',
        transform: 'scale(0.9)',
        opacity: 0.7,
    },
    activeSlide: {
        transform: 'scale(1.1)',
        opacity: 1,
    },
    card: {
        width: '80%',
        height: '450px',
        padding: '20px',
        backgroundColor: '#1c1c1c',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: '350px',
        objectFit: 'contain',
        borderRadius: '10px',
    },
    title: {
        marginTop: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    price: {
        marginTop: '5px',
        fontSize: '16px',
        color: '#f0ad4e',
    },
    customArrow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
        transition: 'background-color 0.3s ease',
    },
    prevArrow: {
        left: '10px',
    },
    nextArrow: {
        right: '10px',
    },
    customDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        margin: '0 5px',
        cursor: 'pointer',
    },
};

const Arrow = ({ direction, onClick }) => (
    <div
        onClick={onClick}
        style={{
            ...styles.customArrow,
            ...(direction === 'prev' ? styles.prevArrow : styles.nextArrow),
            border: '2px solid #FF6500',
        }}
    >
        {direction === 'prev' ? (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                    d="M15 18l-6-6 6-6"
                    stroke="#FF6500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                    d="M9 6l6 6-6 6"
                    stroke="#FF6500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
    </div>
);

const Shop = () => {
    const [arts, setArts] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const artsData = await getArts();
                const artDetails = artsData.map((art) => ({
                    id: art.id,
                    url: art.pictureUrl1,
                    artTitle: art.artTitle,
                    price: art.price,
                }));
                setArts(artDetails);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    const handleCardClick = (artId) => {
        const userId = getSession('userId');
        if (!userId) {
            navigate('/login');
        } else {
            navigate(`/art/${artId}`);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        centerMode: true,
        centerPadding: '0px',
        arrows: true,
        prevArrow: <Arrow direction="prev" />,
        nextArrow: <Arrow direction="next" />,
        beforeChange: (current, next) => setActiveSlide(next),
        customPaging: (i) => (
            <div
                style={{
                    ...styles.customDot,
                    backgroundColor: i === activeSlide ? '#FF6500' : '#6439FF',
                }}
            />
        ),
        dotsClass: 'slick-dots custom-dots',
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Shop</h2>
            <div style={styles.sliderWrapper}>
                <Slider {...sliderSettings}>
                    {arts.map((art, index) => (
                        <div key={art.id} style={{ ...styles.slide, ...(index === activeSlide ? styles.activeSlide : {}) }}>
                            <div
                                onClick={() => handleCardClick(art.id)}
                                style={{
                                    ...styles.card,
                                    transform: index === activeSlide ? 'scale(1.1)' : 'scale(0.9)',
                                    opacity: index === activeSlide ? 1 : 0.7,
                                }}
                            >
                                <img
                                    src={art.url}
                                    alt={`Art ${index + 1}`}
                                    style={styles.image}
                                />
                                <div style={styles.title}>{art.artTitle}</div>
                                <div style={styles.price}>${art.price}</div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Shop;
