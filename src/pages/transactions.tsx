import UserTransactionsTable from "../components/user-transactions"
import TransactionsModal from "../components/transactions-modal";
import { Button } from "@mui/material"
import { useState } from "react";

export default function Transactions() {
    const [userModalOpen, setUserModalOpen] = useState(false);

    const showTransactionsModal = () => {
        setUserModalOpen(true);
    }
    return (
        <div>
            <Button variant="contained" className="my-4 mr-4 float-right" onClick={showTransactionsModal}>Add Transaction</Button>
            <UserTransactionsTable />
            <TransactionsModal open={userModalOpen} handleClose={() => setUserModalOpen(false)} />
        </div>
    )
}