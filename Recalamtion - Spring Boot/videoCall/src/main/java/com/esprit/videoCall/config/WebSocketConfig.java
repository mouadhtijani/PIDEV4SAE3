package com.esprit.videoCall.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final VideoCallHandler videoCallHandler;

    public WebSocketConfig(VideoCallHandler videoCallHandler) {
        this.videoCallHandler = videoCallHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(videoCallHandler, "/video-call").setAllowedOrigins("*");
    }
}
