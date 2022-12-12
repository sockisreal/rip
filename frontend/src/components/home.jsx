import CategoryList from "./categoryList";
import FindCategory from "./findProduct";

const Component = () => {
    return (
        <div className="mb-5" style={{justifyContent:'center', textAlign:'center'}}>
            <h1>Цветочный магазин La Fleur</h1>
            <CategoryList/>
            <hr className="my-5"/>
            <FindCategory/>
        </div>
    );
};

export default Component;
