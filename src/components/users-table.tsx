import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  isBanned: boolean;
  hasLoan: boolean;
  notes: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  const renderUsers = users.map((user: User) => {
    return (
      <TableRow key={user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.isBanned ? "Yes" : "No"}</TableCell>
        <TableCell>{user.hasLoan ? "Yes" : "No"}</TableCell>
        <TableCell>{user.notes}</TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer>
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
          {renderUsers}
        </TableBody>
      </Table>
    </TableContainer>
  )
}