package server.exception;

import org.springframework.http.HttpStatus;
import server.exception.base.ApiException;

public class NotFoundException extends ApiException{
  public NotFoundException(String message) {
    super(HttpStatus.NOT_FOUND.value(),message);
  }
}
