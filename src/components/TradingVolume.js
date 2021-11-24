const TradingVolume = ({volume}) => {
    return (
        <>
        {volume &&
            <p>
                Highest trading volume: {volume[1].toLocaleString()} €
                on {new Date(volume[0]).toLocaleDateString()}<br />
            </p>
        }
        </>
    )
}

export default TradingVolume