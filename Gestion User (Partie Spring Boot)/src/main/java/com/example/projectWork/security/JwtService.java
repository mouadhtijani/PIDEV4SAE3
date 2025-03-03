package com.example.projectWork.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    
    private String SECRET_KEY="73a11bb5b5aac495f4d9352eb573375434185d402bdd820bc7c70be5b6448162efe100d727ff7f7c6067702a87297264d2abc22a3aa2a9d6b92a69ec9833723cc55508a3be06c125104bded11f1067daf3f3b96caabf8bf42a649a8d854aa9202415812cd4ccf9402919c69826d8348a697dc35383216bd403e98c6de006dc2422f950d22c46c76efbd8548d23af7e91924e5ef5da4060217e59417e5cfc8bdb005ca09ac62dbf04d2717172428bc0c5f00bcf265e0fcef9097b1b41850752688d38d6d7c981a43f8459db54bbe3c0b2192c2a6f491090b01ee1b7850251c171dd94f02c7b04d378c64fec229e7ca04ac83beea90755aee675e414465db412ca";
    public String generateToken(Map<String,Object> claims, UserDetails userDetails){
          return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000 * 60 * 24))
                .signWith(getSigninKey())
                .compact();
    }
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigninKey())
                .build().parseClaimsJws(token)
                .getBody();
    }

    private Key getSigninKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public boolean isTokenValid(String token , UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()))&& !isTokenExpired(token) ;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token , Claims::getExpiration);
    }


}
