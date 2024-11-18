import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DaySelector({ selectedDate, onDateChange }) {
    return (
        <div className="container mt-3">
            <span>Seleccione un día </span>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange} 
                dateFormat="dd/MM/yyyy"
                className="form-control"
            />
        </div>
    );
}

export default DaySelector;
