const Profit = ({profit}) => {
    return (
        <>
            { profit ?
                (profit[0] !== -1) ?
                    <p>
                    You should buy on {new Date(profit[0]).toLocaleDateString()} and
                    sell on {new Date(profit[1]).toLocaleDateString()}.
                    </p>
                    :
                    <p>
                    You should neither buy or sell.
                    </p>
                :
                <></>
            }
        </>
    )
}

export default Profit