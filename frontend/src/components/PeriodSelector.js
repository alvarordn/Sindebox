import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container, InputGroup } from 'react-bootstrap';

function PeriodSelector({ startDate, endDate, onDateChange }) {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className="btn btn-outline-secondary rounded text-truncate"
            onClick={onClick}
            ref={ref}
            style={{ minWidth: '120px' }}
        >
            {value}
        </button>
    ));

    return (
        <Container className="d-flex justify-content-center align-items-center p-0">
            <InputGroup>
            
                
                <DatePicker
                selected={startDate}
                onChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd/MM/yyyy"
                customInput={<ExampleCustomInput />}
                />
                    
            </InputGroup>
        </Container>
);
}

export default PeriodSelector;
