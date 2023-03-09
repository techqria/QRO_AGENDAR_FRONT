import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

const data = [
    { name: 'Consulta', quantidade: 25 },
    { name: 'Exame', quantidade: 12 },
    { name: 'Cirurgia', quantidade: 8 },
    { name: 'Banho', quantidade: 20 },
    { name: 'Tosa', quantidade: 15 },
];

const TypeOfServiceChart = () => {
    return (
        <ResponsiveContainer width="50%" aspect={2}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default TypeOfServiceChart;
