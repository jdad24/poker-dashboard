import { AppBar, Menu, MenuItem } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | SVGElement>(null);

    const renderMenu = (e: React.MouseEvent<SVGElement>) => {
        // Logic to render the menu goes here
        // This could involve setting state to open a dropdown or modal
        setMenuAnchorEl(e.currentTarget);
    }

    return (
        <AppBar position="sticky" className="flex flex-row justify-center items-center h-10">
            <div className="text-white text-xl font-bold">Administration</div>
            <MenuIcon className="fill-black absolute right-4 hover:cursor-pointer hover:scale-125" onClick={(e) => renderMenu(e)} />
            <Menu
                id="menu-appbar"
                anchorEl={menuAnchorEl}
                open={menuAnchorEl !== null}
                onClose={() => setMenuAnchorEl(null)}
            >
                <MenuItem className="font-bold"><Link to="/create-account">Create Account</Link></MenuItem>
                <MenuItem className="font-bold"><Link to="/login">Login</Link></MenuItem>
            </Menu>
        </AppBar>
    )
}