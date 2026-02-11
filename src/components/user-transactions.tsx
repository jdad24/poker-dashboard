import { Table, TableContainer, TableHead, TableRow, TableCell } from "@mui/material"

export default function UserTransactionsTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">ID</TableCell>
            <TableCell className="font-bold">User</TableCell>
            <TableCell className="font-bold">Buy-In Amount</TableCell>
            <TableCell className="font-bold">Buy-In Method</TableCell>
            <TableCell className="font-bold">Rebuy Amount</TableCell>
            <TableCell className="font-bold">Rebuy Method</TableCell>
            <TableCell className="font-bold">Cashout Amount</TableCell>
            <TableCell className="font-bold">Cashout Method</TableCell>
            <TableCell className="font-bold">Time</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  )
}