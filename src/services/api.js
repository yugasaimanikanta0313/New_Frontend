import axios from 'axios';
import { getSession } from '../utils/cookieUtils'; 

// Base API instance
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
    baseURL: BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle API errors
const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred');
    } else {
        console.error('API Error:', error.message);
        throw new Error('Network error: ' + error.message);
    }
};

// API functions
export const resetPassword = async (data) => {
    const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        try {
            const errorData = await response.json(); // Attempt to parse error details from JSON
            throw new Error(errorData.message || 'Failed to reset password');
        } catch (error) {
            throw new Error('Failed to reset password: ' + response.statusText); // Fallback for non-JSON response
        }
    }

    const responseData = await response.json(); // Always expect valid JSON response here
    return { success: responseData.success, message: responseData.message };
};

export const forgotPassword = async (data) => {
    try {
        const response = await api.post('/forgot-password', data);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const userProfileUpdate = async (userId, formData) => {
    try {
        const response = await api.put(`/users/update/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Register a new user
export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.response) {
            throw new Error(error.response?.data?.message || 'Error registering user');
        } else if (error.request) {
            throw new Error('No response from server. Please try again.');
        } else {
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
};

// Log in a user
export const login = async (loginData) => {
    try {
        const response = await api.post('/login', loginData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Verify account with OTP
export const verifyAccount = async (email, otp) => {
    try {
        const response = await axios.put(`${BASE_URL}/verify`, { email, otp });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error verifying account';
    }
};

// Regenerate OTP
export const regenerateOtp = async (email) => {
    try {
        const response = await axios.put(`${BASE_URL}/regenerate-otp`, null, {
            params: { email },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Error regenerating OTP';
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Add art
export const addArt = async (formData) => {
    try {
        const response = await api.post('/arts/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Fetch all art items
export const getArts = async () => {
    try {
        const response = await api.get('/arts/all');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Get categories
export const getCategories = async () => {
    try {
        const response = await api.get('/arts/categories');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Get art by ID
export const getArtById = async (id) => {
    try {
        const response = await api.get(`/arts/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Delete art by ID
export const deleteArtById = async (id) => {
    try {
        await api.delete(`/arts/${id}`);
    } catch (error) {
        handleApiError(error);
    }
};

export const searchArts = async (query) => {
    try {
        const response = await api.get('/arts/search', {
            params: { q: query }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Update art by ID
export const updateArtById = async (id, updatedData) => {
    try {
        const response = await api.put(`/arts/update/${id}`, updatedData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure multipart for files
            },
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Wishlist functions
export const addToWishlist = async (userId, artId) => {
    try {
        const response = await fetch(`/wishlist/add/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: artId }) // Sending the artId in the request body as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to add to wishlist');
        }

        const data = await response.json(); // Parse the response JSON
        return data; // Return newly added wishlist item
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

export const getUserWishlist = async () => {
    try {
        const userId = getSession('userId'); // Retrieve userId from cookies
        if (!userId) throw new Error("User not logged in.");

        console.log("Fetching wishlist for user ID:", userId); // Log the userId
        const response = await api.get(`/wishlist/user/${userId}`);
        console.log("Response from wishlist API:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const removeFromWishlist = async (wishlistItemId) => {
    try {
        await api.delete(`/wishlist/remove/${wishlistItemId}`);
    } catch (error) {
        handleApiError(error);
    }
};

export const clearWishlist = async (userId) => {
    try {
        await api.delete(`/wishlist/clear/${userId}`);
    } catch (error) {
        handleApiError(error);
    }
};

// Cart functions
export const addToCart = async (userId, artId, quantity) => {
    try {
        const response = await api.post(`/cart/add/${userId}/${artId}`, null, {
            params: { quantity }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Get user's cart items
export const getUserCart = async () => {
    try {
        const userId = getSession('userId');
        if (!userId) throw new Error("User not logged in.");
        const response = await api.get(`/cart/user/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
    try {
        await api.delete(`/cart/remove/${cartItemId}`);
    } catch (error) {
        handleApiError(error);
    }
};

// Clear user's cart
export const clearUserCart = async (userId) => {
    try {
        await api.delete(`/cart/clear/${userId}`);
    } catch (error) {
        handleApiError(error);
    }
};

// Update cart item quantity
export const updateCartItem = async (userId, cartItemId, quantity) => {
    try {
        const response = await api.put(`/cart/update/${userId}/${cartItemId}`, { quantity });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export default api;


// import axios from 'axios';
// import { getSession } from '../utils/cookieUtils'; 
// // Base API instance
// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
// console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

// const api = axios.create({
//     baseURL: BASE_URL, 
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Function to handle API errors
// const handleApiError = (error) => {
//     if (error.response) {
//         console.error('API Error:', error.response.data);
//         throw new Error(error.response.data.message || 'An error occurred');
//     } else {
//         console.error('API Error:', error.message);
//         throw new Error('Network error: ' + error.message);
//     }
// };

// // Base URLs for specific resources
// const ARTS_URL = '/arts';
// const WISHLIST_URL = '/wishlist';
// const CART_URL = '/cart';
// const USER_URL = '/users';

// // API functions
// export const resetPassword = async (data) => {
//     const response = await fetch('/reset-password', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//         try {
//             const errorData = await response.json(); // Attempt to parse error details from JSON
//             throw new Error(errorData.message || 'Failed to reset password');
//         } catch (error) {
//             throw new Error('Failed to reset password: ' + response.statusText); // Fallback for non-JSON response
//         }
//     }

//     const responseData = await response.json(); // Always expect valid JSON response here
//     return { success: responseData.success, message: responseData.message };
// };


// export const forgotPassword = async (data) => {
//     try {
//         const response = await api.post('/forgot-password', data);
//         return response.data; // Assuming the response contains a message
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// export const userProfileUpdate = async (userId, formData) => {
//     try {
//         const response = await api.put(`${USER_URL}/update/${userId}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// // Register a new user
// export const registerUser = async (formData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/register`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error during registration:', error);
//       if (error.response) {
//         throw new Error(error.response?.data?.message || 'Error registering user');
//       } else if (error.request) {
//         throw new Error('No response from server. Please try again.');
//       } else {
//         throw new Error('An unexpected error occurred. Please try again.');
//       }
//     }
//   };
  

// // Log in a user
// export const login = async (loginData) => {
//     try {
//         const response = await api.post('/login', loginData);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Verify account with OTP
// export const verifyAccount = async (email, otp) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/verify`, { email, otp });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || 'Error verifying account';
//     }
//   };

// // Regenerate OTP
// export const regenerateOtp = async (email) => {
//     try {
//       const response = await axios.put(`${BASE_URL}/regenerate-otp`, null, {
//         params: { email },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || 'Error regenerating OTP';
//     }
//   };
// export const getAllUsers = async () => {
//     try {
//         const response = await api.get('/users');
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Add art
// export const addArt = async (formData) => {
//     try {
//         const response = await api.post(`${ARTS_URL}/add`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Fetch all art items
// export const getArts = async () => {
//     try {
//         const response = await api.get(`${ARTS_URL}/all`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Get categories
// export const getCategories = async () => {
//     try {
//         const response = await api.get(`${ARTS_URL}/categories`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Get art by ID
// export const getArtById = async (id) => {
//     try {
//         const response = await api.get(`${ARTS_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Delete art by ID
// export const deleteArtById = async (id) => {
//     try {
//         await api.delete(`${ARTS_URL}/${id}`);
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// export const searchArts = async (query) => {
//     try {
//         const response = await api.get(`${ARTS_URL}/search`, {
//             params: { q: query } // Pass the search term as a query parameter
//         });
//         return response.data; // Return the search results
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// // Update art by ID
// // export const updateArtById = async (id, updatedData) => {
// //     try {
// //         const response = await api.put(`${ARTS_URL}/update/${id}`, updatedData, {
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //         });
// //         return response.data;
// //     } catch (error) {
// //         handleApiError(error);
// //     }
// // };
// export const updateArtById = async (id, updatedData) => {
//     try {
//         const response = await api.put(`${ARTS_URL}/update/${id}`, updatedData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', // Ensure multipart for files
//             },
//         });
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Wishlist functions
// // export const addToWishlist = async ( artId) => {
// //     try {
// //         const response = await api.post(`${WISHLIST_URL}/add`, {
// //             id: artId
            
// //         });
// //         return response.data;
// //     } catch (error) {
// //         handleApiError(error);
// //     }
// //     //alert(userId);
// //     alert(artId);
// // };
// export const addToWishlist = async (userId, artId) => {
//     try {
//         const response = await fetch(`${WISHLIST_URL}/add/${userId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id: artId }) // Sending the artId in the request body as JSON
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add to wishlist');
//         }

//         const data = await response.json(); // Parse the response JSON
//         return data; // Return newly added wishlist item
//     } catch (error) {
//         console.error('Error adding to wishlist:', error);
//         throw error;
//     }
// };

// // export const getUserWishlist = async (userId) => {
// //     try {
// //         const response = await api.get(`${WISHLIST_URL}/user/${userId}`,{id:userId});
// //         return response.data;
// //     } catch (error) {
// //         handleApiError(error);
// //     }
// // };

// // Usage example for functions needing userId
// // export const getUserWishlist = async () => {
// //     try {
// //         const userId = getSession('userId'); // Retrieve userId from cookies
// //         if (!userId) throw new Error("User not logged in.");
        
// //         const response = await api.get(`${WISHLIST_URL}/user/${userId}`);
// //         return response.data;
// //     } catch (error) {
// //         handleApiError(error);
// //     }
// // };
// export const getUserWishlist = async () => {
//     try {
//         const userId = getSession('userId'); // Retrieve userId from cookies
//         if (!userId) throw new Error("User not logged in.");

//         console.log("Fetching wishlist for user ID:", userId); // Log the userId
//         const response = await api.get(`${WISHLIST_URL}/user/${userId}`);
//         console.log("Response from wishlist API:", response.data); // Log the response data
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };


// export const removeFromWishlist = async (wishlistItemId) => {
//     try {
//         await api.delete(`${WISHLIST_URL}/remove/${wishlistItemId}`);
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// export const clearWishlist = async (userId) => {
//     try {
//         await api.delete(`${WISHLIST_URL}/clear/${userId}`);
//     } catch (error) {
//         handleApiError(error);
//     }
// };


// //cart:
// // Add item to cart
// // export const addToCart = async (userId, artId, quantity) => {
// //     try {
// //         const response = await api.post(`${CART_URL}/add/${userId}/${artId}`, { quantity });
// //         return response.data;
// //     } catch (error) {
// //         handleApiError(error);
// //     }
// // };
// export const addToCart = async (userId, artId, quantity) => {
//     try {
//         const response = await api.post(`${CART_URL}/add/${userId}/${artId}`, null, {
//             params: { quantity } // Pass quantity as a request parameter
//         });
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };


// // Get user's cart items
// export const getUserCart = async () => {
//     try {
//         const userId = getSession('userId');
//         if (!userId) throw new Error("User not logged in.");
//         const response = await api.get(`${CART_URL}/user/${userId}`);
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Remove item from cart
// export const removeFromCart = async (cartItemId) => {
//     try {
//         await api.delete(`${CART_URL}/remove/${cartItemId}`);
//     } catch (error) {
//         handleApiError(error);
//     }
// };

// // Clear user's cart
// export const clearUserCart = async (userId) => {
//     try {
//         await api.delete(`${CART_URL}/clear/${userId}`);
//     } catch (error) {
//         handleApiError(error);
//     }
// };
// // Update cart item quantity
// export const updateCartItem = async (userId, cartItemId, quantity) => {
//     try {
//         const response = await api.put(`${CART_URL}/update/${userId}/${cartItemId}`, { quantity });
//         return response.data;
//     } catch (error) {
//         handleApiError(error);
//     }
// };


// export default api;

