/**
 * Django REST Framework API Client for Reflect & Evolve DTT.
 * Connects all frontend components directly to Django backend endpoints.
 * Includes offline caching fallback and JWT session management.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  is_active?: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: AuthUser;
}

class DjangoApiClient {
  private getAccessToken(): string | null {
    return localStorage.getItem('dtt_access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('dtt_refresh_token');
  }

  public setTokens(access: string, refresh: string, user?: AuthUser): void {
    localStorage.setItem('dtt_access_token', access);
    localStorage.setItem('dtt_refresh_token', refresh);
    if (user) {
      localStorage.setItem('dtt_user', JSON.stringify(user));
    }
  }

  public clearTokens(): void {
    localStorage.removeItem('dtt_access_token');
    localStorage.removeItem('dtt_refresh_token');
    localStorage.removeItem('dtt_user');
  }

  public getStoredUser(): AuthUser | null {
    const raw = localStorage.getItem('dtt_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  public async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const token = this.getAccessToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized token refresh attempt
      if (response.status === 401 && this.getRefreshToken() && !endpoint.includes('/auth/token/refresh/')) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
          const retryResponse = await fetch(url, { ...options, headers });
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
      }

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch {
          errData = { detail: response.statusText };
        }
        throw new Error(errData.detail || errData.error || errData.message || `API request failed with status ${response.status}`);
      }

      // Check if response has content
      const text = await response.text();
      return text ? (JSON.parse(text) as T) : ({} as T);
    } catch (err: any) {
      // In offline / network disconnect mode, pass through error so caller can use cached data
      throw err;
    }
  }

  // --- Auth APIs ---
  public async login(email: string, password: string): Promise<AuthTokens> {
    const data = await this.request<AuthTokens>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setTokens(data.access, data.refresh, data.user);
    return data;
  }

  public async register(email: string, password: string, fullName?: string): Promise<AuthTokens> {
    const data = await this.request<AuthTokens>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        password_confirm: password,
        full_name: fullName || email.split('@')[0],
      }),
    });
    this.setTokens(data.access, data.refresh, data.user);
    return data;
  }

  public async getMe(): Promise<AuthUser> {
    const user = await this.request<AuthUser>('/auth/me/');
    localStorage.setItem('dtt_user', JSON.stringify(user));
    return user;
  }

  public async logout(): Promise<void> {
    const refresh = this.getRefreshToken();
    if (refresh) {
      try {
        await this.request('/auth/logout/', {
          method: 'POST',
          body: JSON.stringify({ refresh }),
        });
      } catch {
        // Proceed with local logout regardless of server state
      }
    }
    this.clearTokens();
  }

  public async refreshToken(): Promise<boolean> {
    const refresh = this.getRefreshToken();
    if (!refresh) return false;
    try {
      const data = await this.request<{ access: string }>('/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({ refresh }),
      });
      if (data?.access) {
        localStorage.setItem('dtt_access_token', data.access);
        return true;
      }
      return false;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  // --- Football Management APIs ---
  public async getFootballClubs(): Promise<any[]> {
    return this.request('/football/clubs/');
  }

  public async createFootballClub(data: any): Promise<any> {
    return this.request('/football/clubs/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async updateFootballClub(id: string, data: any): Promise<any> {
    return this.request(`/football/clubs/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  public async deleteFootballClub(id: string): Promise<any> {
    return this.request(`/football/clubs/${id}/`, {
      method: 'DELETE',
    });
  }

  // --- Personal Tracker APIs ---
  public async analyzeVoiceTone(payload: { pitch: number; volume: number; tempo: number; notes?: string }): Promise<any> {
    return this.request('/personal/voice-analysis/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async getPersonalGoals(): Promise<any[]> {
    return this.request('/personal/goals/');
  }

  public async getHabits(): Promise<any[]> {
    return this.request('/personal/habits/');
  }

  public async logHabit(habitId: string, payload: { date: string; count?: number; note?: string }): Promise<any> {
    return this.request(`/personal/habits/${habitId}/log/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // --- Subscriptions & Payments ---
  public async getSubscriptionPlans(): Promise<any> {
    return this.request('/finance/subscriptions/plans/');
  }

  public async createStripeCheckout(planId: string, billing: string): Promise<any> {
    return this.request('/finance/payments/stripe/checkout/', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId, billing }),
    });
  }

  public async sendMpesaStkPush(phoneNumber: string, planId: string, amount: number): Promise<any> {
    return this.request('/finance/payments/mpesa/stkpush/', {
      method: 'POST',
      body: JSON.stringify({ phone_number: phoneNumber, plan_id: planId, amount }),
    });
  }
}

export const djangoApi = new DjangoApiClient();
