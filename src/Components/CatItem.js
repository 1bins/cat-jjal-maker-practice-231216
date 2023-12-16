const CatItem = ({ img }) => {
    return (
        <li>
            <img
                src={img}
                alt="고양이"
                style={{ width: '150px' }}
            />
        </li>
    );
};

export default CatItem;