import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import UserViewArt from './UserViewArt';

const UserDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div>
            <UserNavbar setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} />
            <UserViewArt searchTerm={searchTerm} searchResults={searchResults} />
        </div>
    );
};

export default UserDashboard;
