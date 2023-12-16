import CatItem from "./CatItem";

const Favorites = ({ savedCat }) => {
    return (
        <ul className="favorites">
            {savedCat.map(elem => <CatItem img={elem} key={elem}></CatItem>)}
        </ul>
    );
}

export default Favorites;