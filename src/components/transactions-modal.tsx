import { Modal, TextField, Button } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function TransactionsModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); //prevents page refresh on submit

        const formData = new FormData(event.currentTarget);
        const user = formData.get("user") as string;
        const buyInAmount = formData.get("buyInAmount") as string;
        const buyInMethod = formData.get("buyInMethod") as string;
        const rebuyAmount = formData.get("rebuyAmount") as string;
        const rebuyMethod = formData.get("rebuyMethod") as string;
        const cashoutAmount = formData.get("cashoutAmount") as string;
        const cashoutMethod = formData.get("cashoutMethod") as string;

        console.log({ user, buyInAmount, buyInMethod, rebuyAmount, rebuyMethod, cashoutAmount, cashoutMethod });
        console.log("Form submission occurred.")
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <div className="bg-white w-200 h-150 rounded-2xl overflow-scroll">
                <h1 className="text-2xl font-bold m-4">New Transaction <ReceiptIcon /></h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <TextField className="m-4 w-100" required label="User" name="user" variant="outlined" />
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Buy-In Amount" name="buyInAmount" variant="outlined" />
                        <TextField className="m-4" required label="Buy-In Method" name="buyInMethod" variant="outlined" />
                    </div>
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Rebuy Amount" name="rebuyAmount" variant="outlined" />
                        <TextField className="m-4" required label="Rebuy Method" name="rebuyMethod" variant="outlined" />
                    </div>
                    <div className="flex flex-row">
                        <TextField className="m-4" required label="Cashout Amount" name="cashoutAmount" variant="outlined" />
                        <TextField className="m-4" required label="Cashout Method" name="cashoutMethod" variant="outlined" />
                    </div>
                    <Button className="m-4" type="submit" variant="contained">Submit</Button>
                    <Button className="m-4" type="button" variant="contained" onClick={handleClose}>Close</Button>
                </form>
            </div>
        </Modal>
    )
}