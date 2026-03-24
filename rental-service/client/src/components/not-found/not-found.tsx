import { Link } from 'react-router-dom';
import {AppRoute} from "../../conts.ts";
import {Header} from "../header/header.tsx";


function NotFound() {
    return (
        <div>
            <Header />
            <h1>Page not found</h1>
            <Link to={AppRoute.Main}>Перейдите на главную страницу</Link>
        </div>
    );
}

export { NotFound };