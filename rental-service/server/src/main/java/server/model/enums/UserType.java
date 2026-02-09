package server.model.enums;

import lombok.Getter;

@Getter
public enum UserType {
    NORMAL("normal"),
    PRO("pro");

    private final String value;

    UserType(String value) {
        this.value = value;
    }

    public static UserType fromString(String text) {
        for (UserType type : UserType.values()) {
            if (type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown user type: " + text);
    }
}
