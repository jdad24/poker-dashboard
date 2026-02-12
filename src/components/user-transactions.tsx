import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

interface Transactions {
    id: number;
    user: string;
    buyInAmount: number;
    buyInMethod: string;
    rebuyAmount: number;
    rebuyMethod: string;
    cashoutAmount: number;
    cashoutMethod: string;
    time: string;
}

export default function UserTransactionsTable({transactions} : {transactions: Transactions[]}) {
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
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.user}</TableCell>
              <TableCell>{transaction.buyInAmount}</TableCell>
              <TableCell>{transaction.buyInMethod}</TableCell>
              <TableCell>{transaction.rebuyAmount}</TableCell>
              <TableCell>{transaction.rebuyMethod}</TableCell>
              <TableCell>{transaction.cashoutAmount}</TableCell>
              <TableCell>{transaction.cashoutMethod}</TableCell>
              <TableCell>{new Date(transaction.time).toLocaleString()}</TableCell>
            </TableRow>
          ))}   
        </TableBody>
      </Table>
    </TableContainer>
  )
}