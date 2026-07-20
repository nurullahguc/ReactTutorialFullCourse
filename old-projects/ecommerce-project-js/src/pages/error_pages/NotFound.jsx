import { Header } from "../../components/Header";

export function NotFound({ cart }) {
    return (
        <>
            <title>404 | Page Not Found</title>
            <Header cart={cart} />

            <div className="container">
                <br />
                <br />
                <h1>404</h1>
                <h3>Page not found!</h3>
            </div>
        </>
    );
}