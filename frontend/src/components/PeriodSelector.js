// DateRangePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

function PeriodSelector({ selectedDate, onDateChange }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const formatDate = (date) => date ? format(date, 'dd/MM/yyyy') : '';

    return (
        <div>
            <h3>Selecciona un rango de fechas</h3>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Selecciona un rango de fechas"
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default PeriodSelector;
