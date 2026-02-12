import { Card } from "@mui/material"

export default function DataCard({ title, value, className = "" }: { title: string, value: string, className?: string }) {
    return (
        <Card variant="outlined" className={`flex flex-col w-200 h-20 bg-gray-300 ${className}`}>
            <h2 className="text-lg font-bold ml-2 mb-2">{title}</h2>
            <p className="text-2xl mx-auto">{value}</p>
        </Card>
    )
}