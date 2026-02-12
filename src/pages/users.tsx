import UsersTable from "../components/users-table";
import { Button } from "@mui/material";
import UserModal from "../components/user-modal";
import { useState, useEffect } from "react";
import { getUsers } from "../services/users";
// import DataCard from "../components/data-card";

export default function Users() {
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();                
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="flex flex-col">
            {/* <DataCard title="Total Users" value="123" className="ml-auto mr-4 mt-4" /> */}
            <Button variant="contained" className="w-40 my-4 mr-4 ml-auto" onClick={() => setUserModalOpen(true)}>Add User</Button>
            <UsersTable users={users} />
            <UserModal open={userModalOpen} handleClose={() => setUserModalOpen(false)} />
        </div>
    )
}