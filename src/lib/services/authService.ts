/**
 * Authentication Service
 * 
 * This service handles all authentication-related operations including:
 * - User registration (signup)
 * - User login
 * - Current user retrieval
 * - Token management
 */

const BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:s7IzlYOb';
const TIMEOUT = 5000; // 5 seconds timeout

// Types
export interface User {
  id: number;
  created_at: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  authToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Helper function to handle fetch with timeout
const fetchWithTimeout = async (url: string, options: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.');
    }
    throw error;
  }
};

// Token Management
const getStoredToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const setStoredToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

const removeStoredToken = (): void => {
  localStorage.removeItem('authToken');
};

// API Calls
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const { authToken } = await response.json() as AuthResponse;
    setStoredToken(authToken);

    // Fetch user details
    return getCurrentUser();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('Login failed: An unknown error occurred');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const { authToken } = await response.json() as AuthResponse;
    setStoredToken(authToken);

    // Fetch user details
    return getCurrentUser();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error('Registration failed: An unknown error occurred');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const token = getStoredToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await fetchWithTimeout(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeStoredToken();
      }
      throw new Error('Failed to get user details');
    }

    return response.json() as Promise<User>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get user details: ${error.message}`);
    }
    throw new Error('Failed to get user details: An unknown error occurred');
  }
};

export const logout = (): void => {
  removeStoredToken();
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

// Helper function to get auth headers for API calls
export const getAuthHeaders = (): HeadersInit => {
  const token = getStoredToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };
}; 