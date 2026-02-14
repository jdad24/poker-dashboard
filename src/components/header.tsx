import { AppBar,
    //  Button 
    } from "@mui/material"
// import { Link } from "react-router-dom"

export default function Header() {

    return (
        <AppBar position="sticky" className="flex flex-row justify-center items-center h-10">
            {/* <Link to="/players">
                <Button className="text-white font-bold">Players</Button>
            </Link>
            <Link to="/transactions">
                <Button className="text-white font-bold">Transactions</Button>
            </Link> */}
            <div className="text-white text-xl font-bold">Administration</div>
        </AppBar>
    )
}