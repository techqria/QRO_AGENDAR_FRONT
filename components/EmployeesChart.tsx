import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const data = [
    { name: 'Cardiologia', valor: 150, fill: '#FFB200' },
    { name: 'Endocrinologia', valor: 100, fill: '#FF3A29' },
    { name: 'Hematologia', valor: 80, fill: '#4339F2' },
    { name: 'Clínico Geral', valor: 200, fill: '#34B53A' },
    { name: 'Odontologia', valor: 50, fill: '#02A0FC' },
];

const HEIGHT_CHART = 200

const EmployeesChart = () => (
    <ResponsiveContainer width="50%" height={HEIGHT_CHART}>
        <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="25%"
            outerRadius="100%"
            barSize={20}
            data={data}
        >
            <RadialBar
                label={{ position: 'insideStart', fill: '#000000', fontSize: 10 }}
                background
                dataKey="valor"
            />
            <Legend
                iconSize={10}
                iconType="circle"
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ width: '100%', textAlign: 'center', fontSize: 12 }}
                height={HEIGHT_CHART / 20}
            />
        </RadialBarChart>
    </ResponsiveContainer>
);

export default EmployeesChart;
