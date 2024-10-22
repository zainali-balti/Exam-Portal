package com.exam.config;


import com.exam.service.Impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestHeaderToken = request.getHeader("Authorization");
        String userName =null ;
        String jwtToken = null;

        if (requestHeaderToken!=null && requestHeaderToken.startsWith("Bearer ")){

            jwtToken = requestHeaderToken.substring(7);
            try{
                userName = this.jwtUtils.extractUsername(jwtToken);
            }
            catch (ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("Token is expired!");
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        else {
            System.out.println("Bearer Not Work");
        }
        if (userName!= null && SecurityContextHolder.getContext().getAuthentication()==null){
          final UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);
          if (this.jwtUtils.validateToken(jwtToken,userDetails)){

              UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new
                      UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
              usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
          }
        }
        else {
            System.out.println("Token is Not Valid!");
        }

        filterChain.doFilter(request,response);

    }
}



