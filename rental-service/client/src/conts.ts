const Setting={
    rentalOffersCount:312,
} as const;

const AppRoute={
    Main : '/',
    Login: '/login',
    Favorites: '/favorites',
    Offer: '/offer'
}

const AuthorizationStatus={
    Auth:"AUTH",
    NoAuth:"NO_AUTH",
    UnknownAuth:"UNKNOWN",
}

export {Setting};
export {AppRoute};
export {AuthorizationStatus};
