import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"

interface Player {
  id: number;
  name: string;
  phone: string;
  email: string;
  isBanned: boolean;
  hasLoan: boolean;
  notes: string;
}

export default function PlayersTable({ players, className = "" }: { players: Player[], className?: string }) {
  const renderPlayers = players.map((player: Player) => {
    return (
      <TableRow key={player.id}>
        <TableCell>{player.id}</TableCell>
        <TableCell>{player.name}</TableCell>
        <TableCell>{player.phone}</TableCell>
        <TableCell>{player.email}</TableCell>
        <TableCell>{player.isBanned ? "Yes" : "No"}</TableCell>
        <TableCell>{player.hasLoan ? "Yes" : "No"}</TableCell>
        <TableCell>{player.notes}</TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">ID</TableCell>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Phone Number</TableCell>
            <TableCell className="font-bold">Email</TableCell>
            <TableCell className="font-bold">Ban?</TableCell>
            <TableCell className="font-bold">Loan?</TableCell>
            <TableCell className="font-bold">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderPlayers}
        </TableBody>
      </Table>
    </TableContainer>
  )
}