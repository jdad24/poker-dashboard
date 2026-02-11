import UsersTable from "../components/users-table";
import { Button } from "@mui/material";
import UserModal from "../components/user-modal";
import { useState } from "react";

export default function Users() {
    const [userModalOpen, setUserModalOpen] = useState(false);

    const showUserModal = () => {
        setUserModalOpen(true);
    }

    return (
        <div>
            <Button variant="contained" className="my-4 mr-4 float-right" onClick={showUserModal}>Add User</Button>
            <UsersTable />
            <UserModal open={userModalOpen} handleClose={() => setUserModalOpen(false)} />
        </div>
    )
}