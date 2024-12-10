import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllUsers } from '../services/api';

const Container = styled.div`
    background-color: #121212;
    color: #f1f1f1;
    min-height: 100vh;
    padding: 20px;
`;

const Heading = styled.h2`
    color: #fff;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #1e1e1e;
`;

const TableHeader = styled.th`
    padding: 10px;
    background-color: #333;
    color: #fff;
    border-bottom: 2px solid #444;
    text-align: center;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #333;
`;

const TableData = styled.td`
    padding: 10px;
    color: #f1f1f1;
    text-align: center;
`;

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p style={{ color: '#f1f1f1' }}>Loading users...</p>;
    if (error) return <p style={{ color: '#f1f1f1' }}>Error: {error}</p>;

    return (
        <Container>
            <Heading>All Users</Heading>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Status</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableData>{user.id}</TableData>
                                <TableData>{user.name}</TableData>
                                <TableData>{user.email}</TableData>
                                <TableData>{user.active ? "Active" : "Inactive"}</TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default GetAllUsers;
