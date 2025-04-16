import "../css/NotFoundPage.css";
import { Link } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

function NotFoundPage() {
    return (
        <>
            <div className="main-notfound">
                <div className="notfound-content">
                    <h3 className="notfound-header">
                        Oups...something went wrong
                    </h3>
                    <h4 className="notfound-link">
                        Go back to{" "}
                        <Link className="link" to="/">
                            HOMEPAGE
                        </Link>
                    </h4>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default NotFoundPage;
