export const WS_CONFIG = {
  WS_URL: 'ws://localhost:8080',
  MAX_RETRIES: 5,
  RETRY_INTERVAL: 3000,
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private retryCount = 0;
  private listeners: Array<(message: any) => void> = [];
  private reconnectTimer: number | null = null;

  connect() {
    if (this.ws?.readyState === WebSocket.CONNECTING) return;
    
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    console.log('Connecting to WebSocket...');
    this.ws = new WebSocket(WS_CONFIG.WS_URL);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.retryCount = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
      } catch (error) {
        console.error('Message parsing error:', error);
      }
    };

    this.ws.onclose = () => {
      if (this.retryCount < WS_CONFIG.MAX_RETRIES) {
        this.handleReconnect();
      }
    };

    this.ws.onerror = () => {
      if (this.ws?.readyState !== WebSocket.CLOSED) {
        this.ws?.close();
      }
    };
  }

  private handleReconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }

    this.retryCount++;
    console.log(`Reconnecting (${this.retryCount}/${WS_CONFIG.MAX_RETRIES})...`);
    
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, WS_CONFIG.RETRY_INTERVAL);
  }

  subscribe(callback: (message: any) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  disconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }
    
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      this.ws.onopen = null;
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const wsService = new WebSocketService();