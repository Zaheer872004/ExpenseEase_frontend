import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DeviceEventEmitter, PermissionsAndroid, Platform } from 'react-native';

// Updated timestamp information
const LAST_UPDATED = "2025-05-13 10:33:08";
const CURRENT_USER = "Zaheer87";

// API endpoint for sending SMS data
const API_URL = Platform.select({
  android: 'http://192.168.74.13:8000', // Your computer's IP on the network
  ios: 'http://localhost:8000',
  web: 'http://localhost:8000',
  default: 'http://localhost:8000',
});

// Define the context types
interface SmsContextType {
  isListening: boolean;
  requestSmsPermission: () => Promise<void>;
}

// Create the context
const SmsContext = createContext<SmsContextType | undefined>(undefined);

// Provider props interface
interface SmsProviderProps {
  children: ReactNode;
}

// Provider component
export const SmsProvider: React.FC<SmsProviderProps> = ({ children }) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  // Send SMS to server
  const sendSmsToServer = async (message: string): Promise<boolean> => {
    try {
      console.log(`[${LAST_UPDATED}] Sending SMS to server | User: ${CURRENT_USER}`);
      
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGFkYWJraGFuIiwiaWF0IjoxNzQ3MDQ2ODQ2LCJleHAiOjE3NDcxMzMyNDZ9.8awq6M29L3pAcFpazM6oO7CyYFhNgNirw6b50vxCuzQ';
      
      const response = await fetch(`${API_URL}/v1/ds/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: message
        })
      });
      
      if (!response.ok) {
        console.error(`[${LAST_UPDATED}] Server response error: ${response.status} | User: ${CURRENT_USER}`);
        return false;
      }
      
      const data = await response.json();
      console.log(`[${LAST_UPDATED}] Server response: ${JSON.stringify(data)} | User: ${CURRENT_USER}`);
      return true;
    } catch (error) {
      console.error(`[${LAST_UPDATED}] Error sending SMS to server: ${error} | User: ${CURRENT_USER}`);
      return false;
    }
  };

  // Request SMS permission
  const requestSmsPermission = async () => {
    try {
      console.log(`[${LAST_UPDATED}] Requesting SMS permission | User: ${CURRENT_USER}`);
      
      if (Platform.OS !== 'android') {
        console.log(`[${LAST_UPDATED}] SMS listening is only available on Android | User: ${CURRENT_USER}`);
        return;
      }
      
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        {
          title: "Receive SMS Permission",
          message: "This app needs access to receive SMS messages.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      const readPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Read SMS Permission",
          message: "This app needs access to read SMS messages.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if (permission === PermissionsAndroid.RESULTS.GRANTED && 
          readPermission === PermissionsAndroid.RESULTS.GRANTED) {
        setIsListening(true);
        console.log(`[${LAST_UPDATED}] SMS permissions granted | User: ${CURRENT_USER}`);
      } else {
        console.log(`[${LAST_UPDATED}] SMS permissions denied | User: ${CURRENT_USER}`);
      }
    } catch (err) {
      console.error(`[${LAST_UPDATED}] Error requesting SMS permission: ${err} | User: ${CURRENT_USER}`);
    }
  };

  // Listen for incoming SMS messages
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    
    console.log(`[${LAST_UPDATED}] Setting up SMS listener | User: ${CURRENT_USER}`);
    
    const subscriber = DeviceEventEmitter.addListener(
      'onSMSReceived',
      (message) => {
        try {
          console.log(`[${LAST_UPDATED}] Raw SMS received: ${message} | User: ${CURRENT_USER}`);
          const parsedMessage = JSON.parse(message);
          const { messageBody } = parsedMessage;
          
          // Automatically send to server
          sendSmsToServer(messageBody)
            .then(success => {
              if (success) {
                console.log(`[${LAST_UPDATED}] SMS successfully sent to server | User: ${CURRENT_USER}`);
              } else {
                console.log(`[${LAST_UPDATED}] Failed to send SMS to server | User: ${CURRENT_USER}`);
              }
            });
        } catch (error) {
          console.error(`[${LAST_UPDATED}] Error parsing SMS message: ${error} | User: ${CURRENT_USER}`);
        }
      }
    );

    // Request permission when the component mounts
    requestSmsPermission();

    return () => {
      console.log(`[${LAST_UPDATED}] Cleaning up SMS listener | User: ${CURRENT_USER}`);
      subscriber.remove();
    };
  }, []);

  return (
    <SmsContext.Provider
      value={{
        isListening,
        requestSmsPermission
      }}
    >
      {children}
    </SmsContext.Provider>
  );
};

// Custom hook to use the SMS context
export const useSms = () => {
  const context = useContext(SmsContext);
  if (context === undefined) {
    throw new Error('useSms must be used within an SmsProvider');
  }
  return context;
};