import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CitiesCard } from '../components/cities-card/cities-card';
import { renderWithProviders } from './render-with-providers';

import { AppRoute } from '../conts';
import {makeFakeOffer} from "./mock.ts";

describe('CitiesCard', () => {
    const mockOffer = makeFakeOffer();

    it('заголовок объявления отображается на карточке', () => {
        renderWithProviders(<CitiesCard {...mockOffer} />);
        expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    });

    it('цена объявления присутствует в разметке', () => {
        renderWithProviders(<CitiesCard {...mockOffer} />);
        expect(screen.getByText(/€/i)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockOffer.price.toString()))).toBeInTheDocument();
    });

    it('метка "Premium" отображается когда isPremium = true', () => {
        renderWithProviders(<CitiesCard {...mockOffer} isPremium={true} />);
        expect(screen.getByText(/premium/i)).toBeInTheDocument();
    });

    it('метка "Premium" отсутствует когда isPremium = false', () => {
        renderWithProviders(<CitiesCard {...mockOffer} isPremium={false} />);
        expect(screen.queryByText(/premium/i)).not.toBeInTheDocument();
    });

    it('ссылка на страницу объявления содержит id в href', () => {
        renderWithProviders(<CitiesCard {...mockOffer} />);

        // Берём вторую ссылку (на заголовке)
        const links = screen.getAllByRole('link', { name: mockOffer.title });
        const titleLink = links[1]; // ссылка на заголовке
        expect(titleLink).toHaveAttribute('href', `${AppRoute.Offer.replace(':id', mockOffer.id)}`);
    });
});