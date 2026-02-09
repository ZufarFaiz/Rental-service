package server.model.enums;

public enum City {
    PARIS("Paris"),
    COLOGNE("Cologne"),
    BRUSSELS("Brussels"),
    AMSTERDAM("Amsterdam"),
    HAMBURG("Hamburg"),
    DUSSELDORF("Dusseldorf");

    private final String displayName;

    City(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
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