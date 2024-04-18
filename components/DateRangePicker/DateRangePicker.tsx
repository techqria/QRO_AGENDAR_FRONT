import ReactDatePicker from "react-datepicker";

import { registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBR)

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { changeFinalDate, changeStartDate } from "../../store/slices/date-filter.slice";
import CalendarIcon from "./CalendarIcon";


interface DatePickerProps {
    startDate: Date,
    finalDate: Date,
}

const DateRangePicker = ({ startDate, finalDate }: DatePickerProps) => {

    const dispatch = useDispatch()

    return (
        <div className="d-flex gap-2">
            <ReactDatePicker dateFormat="dd/MM/yyyy" showIcon icon={<CalendarIcon />} locale="pt-BR" selected={startDate} onChange={value => dispatch(changeStartDate(value))} />
            <ReactDatePicker dateFormat="dd/MM/yyyy" showIcon icon={<CalendarIcon />} locale="pt-BR" selected={finalDate} onChange={value => dispatch(changeFinalDate(value))} />
        </div>
    )
}

export default DateRangePicker