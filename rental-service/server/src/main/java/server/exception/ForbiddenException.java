package server.exception;

import org.springframework.http.HttpStatus;
import server.exception.base.ApiException;

public class ForbiddenException extends ApiException {
    public ForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN.value(), message);
    }
}