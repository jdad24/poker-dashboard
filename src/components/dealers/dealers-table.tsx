import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"

interface Dealer {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: boolean
  notes: string;
}

export default function DealersTable({ dealers, className = "" }: { dealers: Dealer[], className?: string }) {
  const renderDealers = dealers.map((dealer: Dealer) => {
    return (
      <TableRow key={dealer.id}>
        <TableCell>{dealer.id}</TableCell>
        <TableCell>{dealer.name}</TableCell>
        <TableCell>{dealer.phone}</TableCell>
        <TableCell>{dealer.email}</TableCell>
        <TableCell>{dealer.status ? "Active" : "Inactive"}</TableCell>        
        <TableCell>{dealer.notes}</TableCell>
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
            <TableCell className="font-bold">Status</TableCell>            
            <TableCell className="font-bold">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderDealers}
        </TableBody>
      </Table>
    </TableContainer>
  )
}