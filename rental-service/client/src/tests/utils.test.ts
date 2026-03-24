import { describe, it, expect } from 'vitest';
import { getOffersByCity, sortOffersByType } from '../util';
import { SortOffersType } from '../conts';
import {makeFakeOffer} from "./mock.ts";

describe('getOffersByCity', () => {
    it('возвращает только объявления указанного города', () => {
        const parisOffer = makeFakeOffer();
        const cologneOffer = makeFakeOffer();

        // Меняем города у офферов
        const parisOfferWithCity = {
            ...parisOffer,
            city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } }
        };
        const cologneOfferWithCity = {
            ...cologneOffer,
            city: { name: 'Cologne', location: { latitude: 50.9375, longitude: 6.9603, zoom: 13 } }
        };

        const result = getOffersByCity('Paris', [parisOfferWithCity, cologneOfferWithCity]);

        expect(result).toHaveLength(1);
        expect(result[0].city.name).toBe('Paris');
    });

    it('возвращает пустой массив, если город не найден', () => {
        const offers = [makeFakeOffer(), makeFakeOffer()];
        expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
    });

    it('возвращает пустой массив при пустом списке предложений', () => {
        expect(getOffersByCity('Paris', [])).toEqual([]);
    });
});

describe('sortOffersByType', () => {
    it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 300 },
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];

        const result = sortOffersByType([...offers], SortOffersType.PriceToHigh);

        expect(result[0].price).toBe(100);
        expect(result[2].price).toBe(300);
    });

    it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 300 },
        ];

        const result = sortOffersByType([...offers], SortOffersType.PriceToLow);

        expect(result[0].price).toBe(300);
    });

    it('сортирует по рейтингу (TopRated)', () => {
        const offers = [
            { ...makeFakeOffer(), rating: 3 },
            { ...makeFakeOffer(), rating: 5 },
            { ...makeFakeOffer(), rating: 4 },
        ];

        const result = sortOffersByType([...offers], SortOffersType.TopRated);

        expect(result[0].rating).toBe(5);
    });

    it('не изменяет исходный массив', () => {
        const offers = [
            { ...makeFakeOffer(), price: 100 },
            { ...makeFakeOffer(), price: 200 },
        ];
        const copy = [...offers];

        sortOffersByType(offers, SortOffersType.PriceToHigh);

        expect(offers).toEqual(copy);
    });

    it('корректно работает с пустым массивом', () => {
        expect(sortOffersByType([], SortOffersType.PriceToHigh)).toEqual([]);
    });
});