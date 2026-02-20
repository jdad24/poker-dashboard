import { Modal, TextField, Button } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function DealerSessionModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); //prevents page refresh on submit

        const formData = new FormData(event.currentTarget);
        const dealer = formData.get("dealer") as string;
        const downNumber = formData.get("downNumber") as string;
        const tableNumber = formData.get("tableNumber") as string;
        const handsDealt = formData.get("handsDealt") as string;
        const totalTips = formData.get("totalTips") as string;
        const gameCost = formData.get("gameCost") as string;
        const startTime = formData.get("startTime") as string;
        const endTime = formData.get("endTime") as string;

        console.log({ dealer, downNumber, tableNumber, handsDealt, totalTips, gameCost, startTime, endTime });
        console.log("Form submission occurred.")
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <div className="bg-white w-200 h-150 rounded-2xl overflow-scroll">
                <h1 className="text-2xl font-bold m-4">New Session <ReceiptIcon /></h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <TextField className="m-4 w-100" required label="Dealer" name="dealer" variant="outlined" />
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Down Number" name="downNumber" variant="outlined" />
                        <TextField className="m-4" required label="Table Number" name="tableNumber" variant="outlined" />
                    </div>
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Hands Dealt" name="handsDealt" variant="outlined" />
                        <TextField className="m-4" required label="Total Tips" name="totalTips" variant="outlined" />
                        <TextField className="m-4" required label="Game Cost" name="gameCost" variant="outlined" />
                    </div>
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Start Time" name="startTime" variant="outlined" />
                        <TextField className="m-4" required label="End Time" name="endTime" variant="outlined" />
                    </div>
                    <Button className="m-4" type="submit" variant="contained">Submit</Button>
                    <Button className="m-4" type="button" variant="contained" onClick={handleClose}>Close</Button>
                </form>
            </div>
        </Modal>
    )
}