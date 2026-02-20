import PlayersTable from "../components/players/players-table"
import PlayerTransactionsTable from "../components/players/player-transactions-table"
import { useState, useEffect } from "react"
import { getPlayers, getPlayerTransactions } from "../services/players"
import { getDealers, getDealerSessions } from "../services/dealers"
import { Button } from "@mui/material"
import NewPlayerModal from "../components/players/new-player-modal"
import PlayerTransactionModal from "../components/players/player-transaction-modal"
import { Add } from "@mui/icons-material"
import DataCard from "../components/data-card"
import { Tabs, Tab } from "@mui/material"
import DealersTable from "../components/dealers/dealers-table"
import DealerSessionsTable from "../components/dealers/dealer-sessions-table"
import DealerSessionsModal from "../components/dealers/session-modal"
import NewDealerModal from "../components/dealers/new-dealer-modal"
import { OpenInFull } from "@mui/icons-material"

export default function AdminPage() {
    const [players, setPlayers] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [playerTransactions, setPlayerTransactions] = useState([]);
    const [dealerSessions, setDealerSessions] = useState([]);

    const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
    const [newDealerModalOpen, setNewDealerModalOpen] = useState(false);
    const [newPlayerTransactionModalOpen, setNewPlayerTransactionModalOpen] = useState(false);
    const [newDealerSessionModalOpen, setNewDealerSessionModalOpen] = useState(false);

    const [playerTab, setPlayerTab] = useState(0);
    const [dealerTab, setDealerTab] = useState(0);

    const [playerTabExpanded, setPlayerTabExpanded] = useState(true);
    const [dealerTabExpanded, setDealerTabExpanded] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPlayers(await getPlayers());
                setDealers(await getDealers());
                setPlayerTransactions(await getPlayerTransactions());
                setDealerSessions(await getDealerSessions());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePlayerTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        // Handle tab change logic here
        setPlayerTab(newValue);
    }

     const handleDealerTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        // Handle tab change logic here
        setDealerTab(newValue);
    }
        
    const renderPlayerTabContent = () => {
        switch (playerTab) {
            case 0:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewPlayerModalOpen(true)}>Add Player <Add className="ml-2" /></Button>
                        <PlayersTable players={players} className="max-h-100 shadow-sm shadow-black" />
                    </>
                )
            case 1:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewPlayerTransactionModalOpen(true)}>Add Transaction <Add className="ml-2" /></Button>
                        <PlayerTransactionsTable transactions={playerTransactions} className="max-h-100 shadow-sm shadow-black" />
                    </>
                )
            default:
                return null;
        }
    }

    const renderDealerTabContent = () => {
        switch (dealerTab) {
            case 0:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewDealerModalOpen(true)}>Add Dealer <Add className="ml-2" /></Button>
                        <DealersTable dealers={dealers} className="max-h-100 shadow-sm shadow-black" />
                    </>
                )
            case 1:
                return (
                    <>
                        <Button size="small" variant="contained" className="w-50 my-4 mr-4 ml-auto float-right" onClick={() => setNewDealerSessionModalOpen(true)}>Add Session <Add className="ml-2" /></Button>
                        <DealerSessionsTable sessions={dealerSessions} className="max-h-100 shadow-sm shadow-black" />
                    </>
                )
            default:
                return null;
        }
    }
    return (
        <div className="flex flex-col w-[95%] h-auto min-h-screen mx-auto">
            <div className="flex flex-row justify-between mt-4 mb-12 ">
                <DataCard className="m-4 shadow-md shadow-black" title="Total Players" value={String(players.length)} />
                <DataCard className="m-4 shadow-md shadow-black" title="Total Dealers" value={String(dealers.length)} />
                <DataCard className="m-4 shadow-md shadow-black" title="Total Player Transactions" value={String(playerTransactions.length)} />
                <DataCard className="m-4 shadow-md shadow-black" title="Total Dealer Sessions" value={String(dealerSessions.length)} />
            </div>
            <div className="flex flex-col space-y-15">
                <div className={`bg-blue-400/20 pt-4 pb-8 px-8 rounded-lg shadow-sm shadow-black ${playerTabExpanded ? 'h-auto' : 'h-20'} overflow-hidden`}>
                    <div className="flex flex-row justify-between">
                        <Tabs onChange={handlePlayerTabChange} className="mb-4" value={playerTab}>
                            <Tab className="font-bold" label="Players" value={0} />
                            <Tab className="font-bold" label="Transactions" value={1} />
                        </Tabs>
                        <OpenInFull className="ml-auto hover:scale-125 cursor-pointer" onClick={() => setPlayerTabExpanded(!playerTabExpanded)} />
                    </div>
                    {renderPlayerTabContent()}
                </div>
              <div className={`bg-blue-400/20 pt-4 pb-8 px-8 rounded-lg shadow-sm shadow-black ${dealerTabExpanded ? 'h-auto' : 'h-20'} overflow-hidden`}>
                    <div className="flex flex-row justify-between">
                        <Tabs onChange={handleDealerTabChange} className="mb-4" value={dealerTab}>
                            <Tab className="font-bold" label="Dealers" value={0} />
                            <Tab className="font-bold" label="Sessions" value={1} />
                        </Tabs>
                        <OpenInFull className="ml-auto hover:scale-125 cursor-pointer" onClick={() => setDealerTabExpanded(!dealerTabExpanded)} />
                    </div>
                    {renderDealerTabContent()}
                    </div>
            </div>
            <NewPlayerModal open={newPlayerModalOpen} handleClose={() => setNewPlayerModalOpen(false)} />
            <NewDealerModal open={newDealerModalOpen} handleClose={() => setNewDealerModalOpen(false)} />
            <PlayerTransactionModal open={newPlayerTransactionModalOpen} handleClose={() => setNewPlayerTransactionModalOpen(false)} />
            <DealerSessionsModal open={newDealerSessionModalOpen} handleClose={() => setNewDealerSessionModalOpen(false)} />
        </div>
    )
}