import type {OffersList} from "../../types/offer.ts";
import {CitiesCard} from "../cities-card/cities-card.tsx";

type CitiesCardListProps = {
    offersList: OffersList[];
};

function CitiesCardList({ offersList }: CitiesCardListProps){
    return(
        <div className="cities_places-list places_list tabs_content">
            {Array.from(offersList, (item) =>
                <CitiesCard
                    key={ item.id }
                    id={ item.id }
                    title={ item.title }
                    type={ item.type }
                    price={ item.price }
                    previewImage={ item.previewImage }
                    isPremium={ item.isPremium }
                    rating={ item.rating } />)}
        </div>
    );
}

export { CitiesCardList };
