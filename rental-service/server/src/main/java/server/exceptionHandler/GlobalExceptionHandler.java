package server.exceptionHandler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import server.exception.base.ApiException;

import java.io.IOException;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String,String>>handleApiException(ApiException ex){
        return ResponseEntity.status(ex.getStatus())
                .body(Map.of("message:",ex.getMessage()));
    }

    @ExceptionHandler
    public ResponseEntity<Map<String,String>> handleException(Exception ex){
        return ResponseEntity.status(500)
                .body(Map.of("message","Непредвиденная ошибка"+ex.getMessage()));
    }
}
