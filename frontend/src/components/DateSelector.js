import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ selectedDate, onDateChange }) {
    return (
        <div className="container mt-3">
            <h4>Selecciona una fecha</h4>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange} // Llama a la función de HomeScreen cuando se cambia la fecha
                dateFormat="dd/MM/yyyy"
                className="form-control"
            />
        </div>
    );
}

export default DateSelector;
