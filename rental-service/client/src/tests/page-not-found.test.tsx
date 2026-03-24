import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../conts';
import {NotFound} from "../components/not-found/not-found.tsx";

describe('PageNotFound', () => {
    const renderPage = () => render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );

    it('отображает заголовок PAGE NOT FOUND', () => {
        renderPage();

        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });

    it('ссылка на главную страницу присутствует', () => {
        renderPage();

        expect(
            screen.getByRole('link', { name: /главную/i })
        ).toBeInTheDocument();
    });

    it('ссылка ведет на "/"', () => {
        renderPage();

        const link = screen.getByRole('link', { name: /главную/i });
        expect(link).toHaveAttribute('href', AppRoute.Main);
    });
});