import UserTransactionsTable from "../components/user-transactions-table"
import TransactionsModal from "../components/transactions-modal";
import { Button } from "@mui/material"
import { useState, useEffect } from "react";
import { getTransactions } from "../services/transactions";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [transactionModalOpen, setTransactionModalOpen] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();                
                setTransactions(data);                
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="flex flex-col w-[90%] mx-auto">
            <Button variant="contained" className="w-50 my-4 mr-4 ml-auto" onClick={() => setTransactionModalOpen(true)}>Add Transaction</Button>
            <UserTransactionsTable transactions={transactions} />
            <TransactionsModal open={transactionModalOpen} handleClose={() => setTransactionModalOpen(false)} />
        </div>
    )
}