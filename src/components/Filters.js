import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Offcanvas, Button } from "react-bootstrap";
import "../css/Filters.css";

function Filters({ filters, setFilters, handleChange, handleReset }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="menu pt-5 container">
                <div className="filter-buttons row ml-3 d-flex">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex mt-3 ps-2">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                <ImSearch />
                            </span>
                            <input
                                className="form-control me-2 border-none"
                                id="search-input"
                                name="search"
                                type="text"
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value
                                    })
                                }
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="d-flex mt-3 ps-2">
                            <label className="input-group-text" htmlFor="sort">
                                <i className="fas fa-sort"></i>Sort by
                            </label>
                            <select
                                name="sort"
                                id="sort"
                                className="form-select border-none"
                                value={filters.sort}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        sort: e.target.value
                                    })
                                }
                            >
                                <option value="none">Recommended</option>
                                <option value="asc">Ascending price</option>
                                <option value="desc">Descending price</option>
                            </select>
                        </div>
                        <div className="mt-3 text-center ps-2">
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                className="me-2"
                            >
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h3>Filters</h3>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form action="/books" id="filter-form" method="get">
                        <fieldset
                            id="filter-category"
                            className="filter-category"
                        >
                            <h4>Category:</h4>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Uganda"
                                    name="category"
                                    value="Uganda"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Uganda"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Uganda</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Kenya"
                                    name="category"
                                    value="Kenya"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Kenya"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Kenya</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Rwanda"
                                    name="category"
                                    value="Rwanda"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Rwanda"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Rwanda</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Tanzania"
                                    name="category"
                                    value="Tanzania"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Tanzania") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Tanzania</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Burundi"
                                    name="category"
                                    value="Burundi"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Burundi") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Burundi</label>
                            </div>
 
                        </fieldset>
                        <fieldset
                            id="filter-price"
                            className="mt-2 filter-price"
                        >
                            <h4>Price:</h4>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_0_30000"
                                    value="0_30000"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "0_30000"
                                            ? true
                                            : false
                                    }
                                />
                                <label> 0-30000 /=</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_30000_60000"
                                    value="30000_60000"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "30000_60000"
                                            ? true
                                            : false
                                    }
                                />
                                <label> 30000-60000 /=</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_60000_"
                                    value="60000"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "60000"
                                            ? true
                                            : false
                                    }
                                />
                                <label> Above 60000 /=</label>
                            </div>
                        </fieldset>
                        <fieldset id="filter-rating" className="mt-2">
                            <h4>Minimum rating:</h4>
                            <div className="filter-item">
                                <input
                                    type="number"
                                    value={filters.minimum_rating}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            minimum_rating: e.target.value
                                        })
                                    }
                                    name="minimum_rating"
                                    id="minimum_rating"
                                    min="0"
                                    max="5"
                                />
                            </div>
                        </fieldset>
                        <fieldset id="filter-os" className="mt-2 filter-os">
                            <h4>Publishing house:</h4>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Penguin"
                                    name="publishing_house"
                                    value="Penguin"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Penguin"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Penguin</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Vintage"
                                    name="publishing_house"
                                    value="Vintage"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Vintage"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Vintage</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Bloomsbury"
                                    name="publishing_house"
                                    value="Bloomsbury"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Bloomsbury"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Bloomsbury</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Orion"
                                    name="publishing_house"
                                    value="Orion"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Orion"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Orion</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Cornerstone"
                                    name="publishing_house"
                                    value="Cornerstone"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Cornerstone"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Cornerstone</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Dorling"
                                    name="publishing_house"
                                    value="Dorling"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Dorling"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Dorling</label>
                            </div>
                        </fieldset>
                        <fieldset id="filter-stock" className="mt-2">
                            <h4>In stock:</h4>
                            <input
                                className="filter-item"
                                type="checkbox"
                                name="stock_yes"
                                id="stock_yes"
                                value="true"
                                onChange={handleChange}
                                defaultChecked={filters.stock_yes}
                            />
                            <label>Yes</label>
                        </fieldset>
                        <div className="filter-form-buttons d-flex justify-content-between">
                            <input
                                type="reset"
                                id="reset"
                                className="mt-3 reset-input"
                                value="Reset filters"
                                onClick={handleReset}
                            />
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Filters;
