import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../conts';
import {fakeUserInfo} from "./mock.ts";


describe('Header --- неавторизованный пользователь', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });

        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('не отображает Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });

        expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });

    it('не отображает email пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });

        expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
    });
});

describe('Header --- авторизованный пользователь', () => {
    it('отображает email пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                user: fakeUserInfo,
                offers: [],
            },
        });

        expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });

    it('отображает кнопку Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                user: fakeUserInfo,
            },
        });

        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });
});

describe('Header --- статус Unknown', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Unknown,
            },
        });

        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });
});