import { useEffect, useState } from 'react';
import { UserTable } from './components/UserTable'
import { UserDetails } from './components/UserDetails'
import { ModalCrearUsuarios } from './components/ModalCrearUsuarios';

export const UserAdminPanelPage = () => {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [modo, setModo] = useState("")

    const getUsers = async () => {
        try {

            const response = await fetch("http://localhost:3000/api/v1/admin");
            const data = await response.json();
            if (data.code === 200) {
                setUsers(data.data);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                await getUsers();
            } catch (error) {
                console.log(error);
            }
        };
        getAllUsers();
    }, []);

    return (
        <>
            <UserDetails />
            <UserTable setIsOpen={setIsOpen} users={users} setModo={setModo} />
            {isOpen && <ModalCrearUsuarios modo={modo} setIsOpen={setIsOpen} />}
        </>
    )
}