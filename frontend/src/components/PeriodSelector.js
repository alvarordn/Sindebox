import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

function PeriodSelector({ startDate, endDate, onDateChange }) {

    return (
        <div>
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
