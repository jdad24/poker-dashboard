import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

interface DealerSession {
    id: number;
    dealer: string;
    startTime: string;
    endTime: string;
    downNumber: number;
    tableNumber: number;
    totalTips: number;
    gameCost: number;
    notes?: string;
}

export default function DealerSessionsTable({ sessions, className }: { sessions: DealerSession[], className?: string }) {
    const renderSessionRows = () => {
        return sessions.map((session) => (
            <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{session.dealer}</TableCell>
                <TableCell>{session.downNumber}</TableCell>
                <TableCell>{session.tableNumber}</TableCell>
                <TableCell>${session.totalTips.toFixed(2)}</TableCell>
                <TableCell>${session.gameCost.toFixed(2)}</TableCell>
                <TableCell>{new Date(session.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(session.endTime).toLocaleString()}</TableCell>
                <TableCell>{session.notes}</TableCell>
            </TableRow>
        ));
    }
    return (
        <TableContainer className={className} component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell className="font-bold">ID</TableCell>
                        <TableCell className="font-bold">Dealer</TableCell>
                        <TableCell className="font-bold">Down Number</TableCell>
                        <TableCell className="font-bold">Table Number</TableCell>
                        <TableCell className="font-bold">Total Tips</TableCell>
                        <TableCell className="font-bold">Game Cost</TableCell>
                        <TableCell className="font-bold">Start Time</TableCell>
                        <TableCell className="font-bold">End Time</TableCell>
                        <TableCell className="font-bold">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderSessionRows()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}