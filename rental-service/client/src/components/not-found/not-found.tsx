import { Link } from 'react-router-dom';
import {AppRoute} from "../../conts.ts";


function NotFound() {
    return (
        <div>
            <h1>Page not found</h1>
            <Link to={AppRoute.Main}>Перейдите на главную страницу</Link>
        </div>
    );
}

export { NotFound };