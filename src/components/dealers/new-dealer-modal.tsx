import { Modal, TextField, Button } from "@mui/material"
import { Person } from "@mui/icons-material"

export default function NewDealerModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); //prevents page refresh on submit

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const notes = formData.get("notes") as string;

        console.log({ name, email, phone, notes });
        console.log("Form submission occurred.")
    }

    return (
        <Modal className="flex flex-row justify-center items-center" open={open}>
            <div className="bg-white w-200 h-150 rounded-2xl">
                <h1 className="text-2xl font-bold m-4">New Dealer <Person /></h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <TextField className="m-4" required label="Name" name="name" variant="outlined" />
                    <TextField className="m-4" required label="Email" name="email" variant="outlined" />
                    <TextField className="m-4" required label="Phone Number" name="phone" variant="outlined" />
                    <TextField className="m-4" label="Notes" name="notes" variant="outlined" />
                    <Button className="m-4" type="submit" variant="contained">Submit</Button>
                    <Button className="m-4" type="button" variant="contained" onClick={handleClose}>Close</Button>
                </form>
            </div>
        </Modal>
    )
}