import React from 'react';
//import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import fishGif from '../Gifs/background.gif'; // Import the GIF

function AdminHome() {
    return (
        <div style={styles.page}>
            <AdminNavbar />
            {/* You can add other components or content here */}
        </div>
    );
}

const styles = {
    page: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${fishGif})`, // Use the imported GIF
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
};

export default AdminHome;
