import { FC } from "react";
import { Search } from "../../interfaces";
import { Category } from "../../pages/search";

type IPick = Pick<Search, "category">;

interface ICategories extends IPick {
    handleChangeCategory: (category: Category) => void;
}

const Categories: FC<ICategories> = ({ category, handleChangeCategory }) => {
    return (
        <aside className="search__category">
            <button
                className={`search__category-btn ${
                    category === "story" ? "active" : ""
                }`}
                onClick={() => {
                    handleChangeCategory("story");
                }}
            >
                Stories
            </button>
            <button
                className={`search__category-btn ${
                    category === "username" ? "active" : ""
                }`}
                onClick={() => {
                    handleChangeCategory("username");
                }}
            >
                Users
            </button>
        </aside>
    );
};

export default Categories;
