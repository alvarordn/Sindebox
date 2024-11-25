import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, InputGroup } from 'react-bootstrap';

function YearSelector({ selectedDate, onDateChange }) {
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

    const adjustDate = (years) => {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newDate.getFullYear() + years); // Ajustamos el año
        onDateChange(newDate);
    };
    
    return (
        <Container className="d-flex justify-content-center align-items-center p-0">
            <InputGroup>
            
                <Button
                    variant="outline-secondary"
                    onClick={() => adjustDate(-1)}
                    className="rounded"
                >
                    -
                </Button>
                
                <DatePicker
                selected={selectedDate}
                onChange={onDateChange} 
                dateFormat="yyyy"
                className="form-control"
                showYearPicker
                customInput={<ExampleCustomInput />}
                />
                    
                <Button
                    variant="outline-secondary"
                    onClick={() => adjustDate(1)}
                    className="rounded"
                >
                    +
            </Button>
        </InputGroup>
    </Container>
);
}

export default YearSelector;