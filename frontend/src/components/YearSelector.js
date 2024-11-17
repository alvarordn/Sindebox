import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function YearSelector({ selectedDate, onDateChange }) {
    return (
        <div className="container mt-3">
            <span>Seleccione un año </span>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange} 
                dateFormat="yyyy"
                className="form-control"
                showYearPicker
            />
        </div>
    );
}

export default YearSelector;