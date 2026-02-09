package server.model.enums;

public enum Feature {
    BREAKFAST("Breakfast"),
    AIR_CONDITIONING("Air conditioning"),
    LAPTOP_FRIENDLY_WORKSPACE("Laptop friendly workspace"),
    BABY_SEAT("Baby seat"),
    WASHER("Washer"),
    TOWELS("Towels"),
    FRIDGE("Fridge");

    private final String displayName;

    Feature(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Feature fromString(String text) {
        for (Feature feature : Feature.values()) {
            if (feature.displayName.equalsIgnoreCase(text)) {
                return feature;
            }
        }
        throw new IllegalArgumentException("Unknown feature: " + text);
    }
}