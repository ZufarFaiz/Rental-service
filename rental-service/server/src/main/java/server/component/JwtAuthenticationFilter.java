package server.component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import server.service.impl.JwtService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        // Не фильтруем OPTIONS запросы
        if (method.equals("OPTIONS")) {
            return true;
        }

        // Не фильтруем публичные эндпоинты
        if (path.startsWith("/api/users/login") ||
                path.startsWith("/api/users/register") ||
                path.startsWith("/api/users/check") ||
                path.startsWith("/static/") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/v3/api-docs") ||
                path.startsWith("/api-docs") ||
                path.startsWith("/webjars")) {
            return true;
        }

        // GET /api/offers — публичный
        if (path.equals("/api/offers") && method.equals("GET")) {
            return true;
        }

        // Всё остальное — защищённое
        return false;

    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("🔥🔥🔥 JwtAuthenticationFilter ВХОД! Path: " + request.getServletPath());
        System.out.println("Authorization header: " + request.getHeader("Authorization"));

        // ✅ 1. СНАЧАЛА проверяем, нужно ли фильтровать
        if (shouldNotFilter(request)) {
            System.out.println("🔓 Публичный эндпоинт - пропускаем: " + request.getServletPath());
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("🔒 Защищенный эндпоинт - проверяем токен: " + request.getServletPath());

        // ✅ 2. Дальше только для защищенных эндпоинтов
        try {
            final String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("❌ Токен не предоставлен или неверный формат");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"Токен не предоставлен\"}");
                return;
            }

            final String token = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(token);
            System.out.println("Email из токена: " + userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                System.out.println("UserDetails загружен: " + (userDetails != null));

                if (jwtService.isTokenValid(token, userDetails)) {
                    System.out.println("✅ Токен валидный");
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    request.setAttribute("user", userDetails.getUsername());
                    System.out.println("✅ Аутентификация установлена для: " + userDetails.getUsername());
                } else {
                    System.out.println("❌ Токен невалидный");
                }
            }

            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException | MalformedJwtException | SignatureException e) {
            System.out.println("❌ Ошибка JWT: " + e.getClass().getSimpleName());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"Недействительный токен\"}");
        }

        System.out.println("=== Конец фильтра ===\n");
    }
}