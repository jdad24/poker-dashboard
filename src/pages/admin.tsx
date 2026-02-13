import UsersTable from "../components/users-table"
import UserTransactionsTable from "../components/user-transactions-table"
import { useState, useEffect } from "react"
import { getTransactions } from "../services/transactions"
import { getUsers } from "../services/users"
import { Button } from "@mui/material"
import UserModal from "../components/user-modal"
import TransactionsModal from "../components/transactions-modal"
import { Add } from "@mui/icons-material"
import DataCard from "../components/data-card"

export default function AdminPage() {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);

    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);
    const [newUserModalOpen, setNewUserModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTransactions(await getTransactions());
                setUsers(await getUsers());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col w-[95%] mx-auto">
            <div className="flex flex-row justify-between mb-12">
                <DataCard className="m-4" title="Total Users" value={String(users.length)} />
                <DataCard className="m-4" title="Total Transactions" value={String(transactions.length)} />
            </div>
            <div className="flex flex-col space-y-5">
                <div className="bg-blue-400/20 p-4 rounded-lg">
                    <div className="text-xl font-semibold flex flex-row items-center justify-between">
                        <p className="text-xl">Users</p>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto" onClick={() => setNewUserModalOpen(true)}>Add User <Add className="ml-2" /></Button>
                    </div>
                    <UsersTable users={users} className="max-h-100" />
                </div>
                <div className="bg-blue-400/20 p-4 rounded-lg">
                    <div className="text-xl font-semibold flex flex-row items-center justify-between">
                        <p className="text-xl">Transactions</p>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto" onClick={() => setNewTransactionModalOpen(true)}>Add Transaction <Add className="ml-2" /></Button>
                    </div>
                    <UserTransactionsTable transactions={transactions} className="max-h-100" />
                </div>
            </div>
            <UserModal open={newUserModalOpen} handleClose={() => setNewUserModalOpen(false)} />
            <TransactionsModal open={newTransactionModalOpen} handleClose={() => setNewTransactionModalOpen(false)} />
        </div>
    )
}