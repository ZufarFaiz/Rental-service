import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {LoadingScreen} from "../components/loading-screen/loading-screen.tsx";

describe('LoadingPage', () => {
    it('отображает текст загрузки', () => {
        render(<LoadingScreen />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('компонент рендерится без ошибок', () => {
        const { container } = render(<LoadingScreen />);

        expect(container).toBeInTheDocument();
    });
});