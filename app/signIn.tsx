import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContext";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Extract auth context
  const { login } = useAuth();

  // Updated timestamp
  const currentDateTime = "2025-05-13 07:45:35";
  const currentUserLogin = "Zaheer87";

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters.");
      return;
    }

    console.log(`[${currentDateTime}] Attempting login for: ${username}`);

    try {
      setLoading(true);

      // Reset form validation errors
      const trimmedUsername = username.trim();
      
      // Call login with username (not email) based on your API requirements
      const response = await login(trimmedUsername, password);
      
      if (response.success) {
        console.log(`[${currentDateTime}] Login successful for user: ${trimmedUsername}`);
        // Success message is optional - layout navigation will handle redirection
        // No Alert.alert here to avoid delaying navigation
      } else {
        console.log(`[${currentDateTime}] Login failed: ${response.msg}`);
        
        // Show appropriate error based on error message
        if (response.msg?.includes('401') || response.msg?.includes('Invalid')) {
          Alert.alert("Authentication Failed", "Invalid username or password. Please try again.");
        } else if (response.msg?.includes('timeout') || response.msg?.includes('unreachable')) {
          Alert.alert("Connection Error", "Server is unreachable. Please check your internet connection and try again.");
        } else {
          Alert.alert("Login Failed", response.msg || "Could not complete login. Please try again.");
        }
      }
    } catch (error: any) {
      console.error(`[${currentDateTime}] Login error:`, error);
      Alert.alert(
        "Login Error", 
        error.message || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ 
          paddingTop: hp(8), 
          paddingHorizontal: wp(5),
          minHeight: hp(100) // Ensure minimum height to push footer down
        }}
        className="flex-1 gap-5"
      >
        {/* Sign-in image */}
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        {/* Title */}
        <View>
          <Text className="text-3xl font-bold text-center text-gray-800">
            Sign In
          </Text>
          <Text className="text-center text-gray-500 mt-1">
            Welcome back to EventNest
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          {/* Username Input */}
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
            <Octicons name="person" size={20} color="#999" />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#999"
              autoCapitalize="none"
              className="ml-3 flex-1 text-base"
              value={formData.username}
              onChangeText={(value) => handleChange("username", value)}
              testID="username-input"
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
            <Octicons name="lock" size={20} color="#999" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              autoCapitalize="none"
              className="ml-3 flex-1 text-base"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              testID="password-input"
            />
          </View>

          <Pressable className="">
            <Text className="text-blue-500 text-wrap text-right">Forgot password?</Text>
          </Pressable>
        </View>

        {/* Submit */}
        <View>
          {loading ? (
            <View className="justify-center items-center mb-4">
              <ActivityIndicator
                size="large"
                color="#6366f1"
                style={{ height: hp(6) }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-indigo-500 py-4 rounded-xl"
              testID="login-button"
            >
              <Text className="text-center text-white font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Footer */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Don't have an account? </Text>
          <Pressable 
            onPress={() => {
              console.log(`[${currentDateTime}] Navigating to Sign Up page`);
              router.push("/signUp");
            }}
            testID="signup-link"
          >
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </Pressable>
        </View>

        {/* Spacer to push footer to bottom */}
        <View style={{ flex: 1 }} />

        {/* Current date and user info */}
        <View className="mb-5">
          <Text className="text-xs text-gray-400 text-center">
            {currentDateTime} • User: {currentUserLogin} • v1.0.3
          </Text>
        </View>
      </View>
    </CustomKeyboardView>
  );
}