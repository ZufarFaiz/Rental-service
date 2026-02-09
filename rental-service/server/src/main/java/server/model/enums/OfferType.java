package server.model.enums;

public enum OfferType {
    APARTMENT("apartment"),
    HOUSE("house"),
    ROOM("room"),
    HOTEL("hotel");

    private final String value;

    OfferType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static OfferType fromString(String text) {
        for (OfferType type : OfferType.values()) {
            if (type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown offer type: " + text);
    }
}