import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Current date and user information
const LAST_UPDATED = "2025-05-13 07:49:01";
const CURRENT_USER = "Zaheer87";

// Define User type
interface User {
  username: string;
}

// Auth response from your backend
interface AuthResponse {
  username: string | null;
  password: string | null;
  accessToken: string;
  token: string; // This is the refresh token
}

// Define types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean | undefined;
  login: (username: string, password: string) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => Promise<{ success: boolean; msg?: string }>;
  refreshToken: () => Promise<{ success: boolean; msg?: string }>;
  lastUpdated: string;
  currentUser: string;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// IMPORTANT: This is your computer's IP address on your local network
// Your Android phone will connect to this IP address
const API_URL = Platform.select({
  android: 'http://192.168.74.13:8000', // Your computer's IP on the network
  ios: 'http://localhost:8000',
  web: 'http://localhost:8000',
  default: 'http://localhost:8000',
});

console.log(`API URL: ${API_URL} | Platform: ${Platform.OS} | Date: ${LAST_UPDATED} | User: ${CURRENT_USER}`);

// Helper functions for storage
const storeAuthData = async (key: string, value: string) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

const getAuthData = async (key: string): Promise<string | null> => {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

const removeAuthData = async (key: string) => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};

// Provider component
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  // When the component mounts, check if the user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const username = await getAuthData("username");
        const accessToken = await getAuthData("accessToken");
        const refreshToken = await getAuthData("token");
        
        if (username && accessToken && refreshToken) {
          setUser({ username });
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log(`[${LAST_UPDATED}] Attempting login for ${username} to ${API_URL}/auth/v1/login`);
      
      // Clean up any previous auth data before attempting login
      await removeAuthData("accessToken");
      await removeAuthData("token");
      await removeAuthData("username");
      
      // Reset the authentication state
      setIsAuthenticated(false);
      setUser(null);
      
      // Simple fetch with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      // Debug the request
      console.log(`[${LAST_UPDATED}] Sending login request for username: ${username}`);
      
      const response = await fetch(`${API_URL}/auth/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log(`[${LAST_UPDATED}] Response status: ${response.status}`);
      
      if (!response.ok) {
        // Try to get response text for better debugging
        let errorText = "";
        try {
          errorText = await response.text();
          console.log(`[${LAST_UPDATED}] Error response body: ${errorText}`);
        } catch (e) {
          console.log(`[${LAST_UPDATED}] Could not read error response body`);
        }
        
        console.log(`[${LAST_UPDATED}] Login failed with status: ${response.status}`);
        
        if (response.status === 401) {
          return { 
            success: false, 
            msg: "Invalid username or password" 
          };
        }
        
        return { 
          success: false, 
          msg: `Login failed (${response.status})${errorText ? ': ' + errorText : ''}` 
        };
      }
      
      const data: AuthResponse = await response.json();
      console.log(`[${LAST_UPDATED}] Login successful for ${username}, received tokens`);
      
      if (!data.accessToken || !data.token) {
        console.log(`[${LAST_UPDATED}] Missing tokens in response:`, JSON.stringify(data));
        return { success: false, msg: "Invalid server response (missing tokens)" };
      }
      
      // Store auth data in secure storage
      await storeAuthData("accessToken", data.accessToken);
      await storeAuthData("token", data.token); // This is the refresh token
      await storeAuthData("username", username);
      
      // Update auth state only after storage is successful
      setUser({ username });
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      console.error(`[${LAST_UPDATED}] Login error:`, error);
      return { 
        success: false, 
        msg: error.name === 'AbortError' 
          ? "Request timed out. Server might be unreachable."
          : error.message || "An error occurred during login" 
      };
    }
  };

  const logout = async () => {
    try {
      console.log(`[${LAST_UPDATED}] Attempting logout`);
      
      // Set auth state to undefined during logout process
      setIsAuthenticated(undefined);
      
      // Get the refresh token (required for logout)
      const token = await getAuthData("token");
      
      if (!token) {
        console.log(`[${LAST_UPDATED}] No token found for logout`);
        // Clean up anyway
        await removeAuthData("accessToken");
        await removeAuthData("token");
        await removeAuthData("username");
        setUser(null);
        setIsAuthenticated(false);
        return { success: false, msg: "No active session to logout" };
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_URL}/auth/v1/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Important: Ensure we clear all data regardless of server response
      await removeAuthData("accessToken");
      await removeAuthData("token");
      await removeAuthData("username");
      
      // Wait a small amount of time to ensure storage is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Finally update state
      setUser(null);
      setIsAuthenticated(false);
      
      if (!response.ok) {
        console.log(`[${LAST_UPDATED}] Logout failed with status: ${response.status}`);
        return { success: false, msg: `Logout failed on server (${response.status})` };
      }
      
      console.log(`[${LAST_UPDATED}] Logout successful`);
      return { success: true };
    } catch (error: any) {
      console.error(`[${LAST_UPDATED}] Logout error:`, error);
      
      // Clean up local storage even if request fails
      await removeAuthData("accessToken");
      await removeAuthData("token");
      await removeAuthData("username");
      
      // Wait a small amount of time to ensure storage is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setUser(null);
      setIsAuthenticated(false);
      
      return { 
        success: false, 
        msg: error.name === 'AbortError' 
          ? "Request timed out. Server might be unreachable."
          : error.message || "An error occurred during logout" 
      };
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) => {
    try {
      console.log(`[${LAST_UPDATED}] Attempting registration for ${username}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          phoneNumber
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.log(`[${LAST_UPDATED}] Registration failed with status: ${response.status}`);
        return { success: false, msg: `Registration failed (${response.status})` };
      }
      
      const data: AuthResponse = await response.json();
      console.log(`[${LAST_UPDATED}] Registration successful for ${username}`);
      
      // Store auth data in secure storage
      await storeAuthData("accessToken", data.accessToken);
      await storeAuthData("token", data.token); // This is the refresh token
      await storeAuthData("username", data.username || username);
      
      setUser({ username: data.username || username });
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      console.error(`[${LAST_UPDATED}] Registration error:`, error);
      return { 
        success: false, 
        msg: error.name === 'AbortError' 
          ? "Request timed out. Server might be unreachable."
          : error.message || "An error occurred during registration" 
      };
    }
  };
  
  const refreshToken = async () => {
    try {
      console.log(`[${LAST_UPDATED}] Attempting to refresh token`);
      
      // Get the refresh token
      const token = await getAuthData("token");
      
      if (!token) {
        console.log(`[${LAST_UPDATED}] No refresh token found`);
        setIsAuthenticated(false);
        return { success: false, msg: "No refresh token available" };
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_URL}/auth/v1/refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.log(`[${LAST_UPDATED}] Token refresh failed with status: ${response.status}`);
        
        // If refresh token is invalid or expired, logout the user
        if (response.status === 401 || response.status === 403) {
          await logout();
        }
        
        return { success: false, msg: `Token refresh failed (${response.status})` };
      }
      
      const data: AuthResponse = await response.json();
      console.log(`[${LAST_UPDATED}] Token refresh successful`);
      
      // Update the access token
      await storeAuthData("accessToken", data.accessToken);
      
      // Get current username in case it's not in the response
      const username = await getAuthData("username");
      
      if (username) {
        setUser({ username });
        setIsAuthenticated(true);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error(`[${LAST_UPDATED}] Token refresh error:`, error);
      
      // If we can't refresh the token, log the user out
      if (error.name !== 'AbortError') {
        await logout();
      }
      
      return { 
        success: false, 
        msg: error.name === 'AbortError' 
          ? "Request timed out. Server might be unreachable."
          : error.message || "An error occurred during token refresh" 
      };
    }
  };

  // Setup automatic token refresh
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null;
    
    if (isAuthenticated) {
      // Refresh token every 23 hours (tokens seem to be valid for 24 hours)
      // This ensures the token is refreshed before it expires
      refreshInterval = setInterval(async () => {
        await refreshToken();
      }, 23 * 60 * 60 * 1000); // 23 hours in milliseconds
    }
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout, 
        register,
        refreshToken,
        lastUpdated: LAST_UPDATED,
        currentUser: CURRENT_USER
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};