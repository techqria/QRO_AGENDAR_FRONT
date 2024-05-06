import ReactDatePicker from "react-datepicker";

import { registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR)

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFinalDate, changeStartDate } from "../../store/slices/date-filter.slice";
import CalendarIcon from "./CalendarIcon";
import { useState } from "react";
import { IStore } from "../../store/types/types";

const DateRangePicker = () => {

    const dispatch = useDispatch()

    const { startDate, finalDate } = useSelector((store: IStore) => store.dateFilter)

    const [dateRange, setDateRange] = useState({ startDate, finalDate });

    function filterDateRange() {
        dispatch(changeStartDate(dateRange.startDate))
        dispatch(changeFinalDate(dateRange.finalDate))
    }

    return (
        <div className="d-flex gap-2 align-items-center">
            <ReactDatePicker dateFormat="dd/MM/yyyy" showIcon icon={<CalendarIcon />} locale="pt-BR" selected={dateRange.startDate} onChange={value => setDateRange({ ...dateRange, startDate: value })} />
            <ReactDatePicker dateFormat="dd/MM/yyyy" showIcon icon={<CalendarIcon />} locale="pt-BR" selected={dateRange.finalDate} onChange={value => setDateRange({ ...dateRange, finalDate: value })} />
            <button onClick={filterDateRange} className="btn btn-orange">Filtrar</button>
        </div>
    )
}

export default DateRangePicker