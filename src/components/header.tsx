import { AppBar,
    //  Button 
    } from "@mui/material"
// import { Link } from "react-router-dom"

export default function Header() {

    return (
        <AppBar position="static" className="flex flex-row justify-center items-center h-10">
            {/* <Link to="/users">
                <Button className="text-white font-bold">Users</Button>
            </Link>
            <Link to="/transactions">
                <Button className="text-white font-bold">Transactions</Button>
            </Link> */}
            <div className="text-white font-bold">Admin Portal</div>
        </AppBar>
    )
}