const Bearish = ({number: bearish}) => {
    return (
        <>
        { bearish ?
            <p>
            Longest bearish trend: {bearish} d.
            </p>
            :
            <></>
        }
        </>
    )
}

export default Bearish