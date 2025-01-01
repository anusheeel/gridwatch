import { useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { wsService } from "../services/websocket/WebSocketService";
import { WebSocketConfig } from "../types/monitoring";

export function useWebSocketData() {
  const queryClient = useQueryClient();
  const mounted = useRef(false);

  const handleMessage = useCallback((message: WebSocketMessage) => {
    const queryKey = [`sensor-${message.payload.id}`];
    queryClient.setQueryData(queryKey, message.payload);
  }, [queryClient]);

  useEffect(() => {
    mounted.current = true;
    
    if (!wsService.isConnected()) {
      wsService.connect();
    }
    
    const unsubscribe = wsService.subscribe(handleMessage);
    
    return () => {
      mounted.current = false;
      unsubscribe();
      if (!document.hidden) {
        wsService.disconnect();
      }
    };
  }, [handleMessage]);
}
