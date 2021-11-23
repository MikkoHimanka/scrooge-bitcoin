import React, { useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const DateSelector = (props) => {
    const [show, toggleShow] = useState(false)

    return (
        <>
            <Button onClick={() => toggleShow(true)}>{props.text}</Button>
            <Modal
                dialogClassName="modal-fit"
                show={show}
                onClose={() => toggleShow(false)}
                onHide={() => toggleShow(false)}
                >
                <Modal.Header closeButton>Please select date</Modal.Header>
                <Modal.Body>
                    <Calendar
                        onChange={props.changeFunction}
                        value={props.date}
                        maxDate={props.maxDate}
                        minDate={props.minDate}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DateSelector