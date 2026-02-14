import PlayersTable from "../components/players/players-table";
import { Button } from "@mui/material";
import PlayerModal from "../components/players/new-player-modal";
import { useState, useEffect } from "react";
import { getPlayers } from "../services/players";
// import DataCard from "../components/data-card";

export default function Players() {
    const [playerModalOpen, setPlayerModalOpen] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getPlayers();                
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);
    return (
        <div className="flex flex-col w-[90%] mx-auto">
            {/* <DataCard title="Total Players" value="123" className="ml-auto mr-4 mt-4" /> */}
            <Button variant="contained" className="w-50 my-4 mr-4 ml-auto" onClick={() => setPlayerModalOpen(true)}>Add Player</Button>
            <PlayersTable players={players} />
            <PlayerModal open={playerModalOpen} handleClose={() => setPlayerModalOpen(false)} />
        </div>
    )
}