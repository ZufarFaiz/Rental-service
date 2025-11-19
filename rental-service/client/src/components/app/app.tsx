import {MainPage} from "../../pages/main-page/main-page.tsx";

type AppMainPageProps = {rentalOffersCount: number}

function App({rentalOffersCount}: AppMainPageProps) {
    return (
        <MainPage rentalOffersCount={rentalOffersCount}/>
    )
}

export {App};