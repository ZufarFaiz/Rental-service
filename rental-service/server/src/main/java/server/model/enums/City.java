package server.model.enums;

import lombok.Getter;
import server.model.dto.response.Location;

@Getter
public enum City {
    PARIS("Paris", 48.8566, 2.3522, 13),
    COLOGNE("Cologne", 50.9375, 6.9603, 13),
    BRUSSELS("Brussels", 50.8503, 4.3517, 13),
    AMSTERDAM("Amsterdam", 52.3676, 4.9041, 13),
    HAMBURG("Hamburg", 53.5511, 9.9937, 13),
    DUSSELDORF("Dusseldorf", 51.2277, 6.7735, 13);

    private final String displayName;
    private final Location location;

    City(String displayName, double latitude, double longitude, int zoom) {
        this.displayName = displayName;
        this.location = new Location(latitude, longitude, zoom);
    }

    public static City fromString(String text) {
        for (City city : City.values()) {
            if (city.displayName.equalsIgnoreCase(text)) {
                return city;
            }
        }
        throw new IllegalArgumentException("Unknown city: " + text);
    }
}