import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function PeriodSelector({ startDate, endDate, onDateChange }) {

    return (
        <div className="container mt-3">
            <span>Selecciona un periodo </span>
            <DatePicker
                selected={startDate}
                onChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default PeriodSelector;
