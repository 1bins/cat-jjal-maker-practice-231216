const MainCard = ({ mainCat, onHeartClick, onChangeHeart }) => {
    const heartIcon = onChangeHeart ? "💖" : "🤍";
    return (
        <div className="main-card">
            <img
                src={mainCat}
                alt="고양이"
                width="400"
            />
            <button onClick={onHeartClick}>{heartIcon}</button>
        </div>
    );
}

export default MainCard;