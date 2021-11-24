const DateLabel = ({date}) => {
    return (
        <div style={{textAlign: 'center'}}>
            {date ? 
                <p> { date.toLocaleDateString() } </p>
                :
                <p> Please select date. </p>
            }
        </div>
    )
}

export default DateLabel