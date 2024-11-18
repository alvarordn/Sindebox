import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function MonthSelector({ selectedDate, onDateChange }) {
    return (
        <div className="container mt-3">
            <span>Seleccione un mes </span>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange} 
                dateFormat="MM/yyyy"
                className="form-control"
                showMonthYearPicker
            />
        </div>
    );
}

export default MonthSelector;