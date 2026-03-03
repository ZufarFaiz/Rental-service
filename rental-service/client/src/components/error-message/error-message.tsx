import './error-message.css';
import {useAppSelector} from "../../hooks";

function ErrorMessage(){
    const error = useAppSelector((state) => state.error);

    return (error)
        ? <div className='error-message'>{ error }</div>
        : null;
}

export { ErrorMessage };