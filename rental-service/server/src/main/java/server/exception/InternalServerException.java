package server.exception;

import server.exception.base.ApiException;

public class InternalServerException extends ApiException {
    public InternalServerException(String message) {
        super(500, message);
    }
}