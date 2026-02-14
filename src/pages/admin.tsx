import PlayersTable from "../components/players/players-table"
import PlayerTransactionsTable from "../components/players/player-transactions-table"
import { useState, useEffect } from "react"
import { getTransactions } from "../services/transactions"
import { getPlayers } from "../services/players"
import {getDealers} from "../services/dealers"
import { Button } from "@mui/material"
import NewPlayerModal from "../components/players/new-player-modal"
import NewTransactionsModal from "../components/new-transactions-modal"
import { Add } from "@mui/icons-material"
import DataCard from "../components/data-card"
import { Tabs, Tab } from "@mui/material"
import DealersTable from "../components/dealers/dealers-table"
import NewDealerModal from "../components/dealers/new-dealer-modal"

export default function AdminPage() {
    const [players, setPlayers] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
    const [newDealerModalOpen, setNewDealerModalOpen] = useState(false);
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);    

    const [personnelTab, setPersonnelTab] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {                
                setPlayers(await getPlayers());
                setDealers(await getDealers());
                setTransactions(await getTransactions());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePersonnelTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        // Handle tab change logic here
        setPersonnelTab(newValue);
    }

    const renderPeronnelTabContent = () => {
        switch (personnelTab) {
            case 0:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewPlayerModalOpen(true)}>Add Player <Add className="ml-2" /></Button>
                        <PlayersTable players={players} className="max-h-100" />
                    </>
                )
            case 1:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewDealerModalOpen(true)}>Add Dealer <Add className="ml-2" /></Button>
                        <DealersTable dealers={dealers} className="max-h-100" />
                    </>
                )
            default:
                return null;
        }
    }
    return (
        <div className="flex flex-col w-[95%] mx-auto">
            <div className="flex flex-row justify-between mb-12 ">
                <DataCard className="m-4 shadow-md shadow-black" title="Total Players" value={String(players.length)} />
                <DataCard className="m-4 shadow-md shadow-black" title="Total Dealers" value={String(dealers.length)} />
                <DataCard className="m-4 shadow-md shadow-black" title="Total Transactions" value={String(transactions.length)} />
            </div>
            <div className="flex flex-col space-y-10">
                <div className="bg-blue-400/20 p-4 rounded-lg shadow-md shadow-black">
                    <Tabs onChange={handlePersonnelTabChange} className="mb-4" value={personnelTab}>
                        <Tab className="font-bold" label="Players" value={0} />
                        <Tab className="font-bold" label="Dealers" value={1} />
                    </Tabs>
                    {renderPeronnelTabContent()}
                </div>
                <div className="bg-blue-400/20 p-4 rounded-lg shadow-md shadow-black">
                    <div className="text-xl font-semibold flex flex-row items-center justify-between">
                        <p className="text-xl">Transactions</p>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto" onClick={() => setNewTransactionModalOpen(true)}>Add Transaction <Add className="ml-2" /></Button>
                    </div>
                    <PlayerTransactionsTable transactions={transactions} className="max-h-100" />
                </div>
            </div>
            <NewPlayerModal open={newPlayerModalOpen} handleClose={() => setNewPlayerModalOpen(false)} />
            <NewDealerModal open={newDealerModalOpen} handleClose={() => setNewDealerModalOpen(false)} />
            <NewTransactionsModal open={newTransactionModalOpen} handleClose={() => setNewTransactionModalOpen(false)} />
        </div>
    )
}