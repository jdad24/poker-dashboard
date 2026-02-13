import { Card } from "@mui/material"

export default function DataCard({ title, value, className = "" }: { title: string, value: string, className?: string }) {
    return (
        <Card variant="outlined" className={`flex flex-col w-70 h-20 bg-blue-500 text-white ${className}`}>
            <h2 className="text-lg font-bold ml-2 mb-2">{title}</h2>
            <p className="text-3xl mx-auto font-bold">{value}</p>
        </Card>
    )
}