import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, InputGroup } from 'react-bootstrap';

function DaySelector({ selectedDate, onDateChange }) {
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

    const adjustDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
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
                    dateFormat="dd/MM/yyyy"
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

export default DaySelector;
