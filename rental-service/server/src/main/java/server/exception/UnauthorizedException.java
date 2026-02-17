package server.exception;

import org.springframework.http.HttpStatus;
import server.exception.base.ApiException;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED.value(), message);
    }
}