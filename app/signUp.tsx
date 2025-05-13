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
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContext";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);

  // Extract lastUpdated and currentUser from useAuth
  const { register, lastUpdated, currentUser } = useAuth();

  // Hardcoded values in case the context values are not available
  const currentDateTime = "2025-05-13 06:20:36";
  const currentUserLogin = "Zaheer87";

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async () => {
    const { firstName, lastName, email, password, username, phoneNumber } = formData;

    if (!firstName || !lastName || !email || !password || !username || !phoneNumber) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    console.log(`[${currentDateTime}] Attempting registration for user: ${username}`);

    try {
      setLoading(true);

      // Call the register function from our auth context
      const response = await register(
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber
      );

      setLoading(false);

      if (response.success) {
        console.log(`[${currentDateTime}] Registration successful for user: ${username}`);
        Alert.alert("Success", "Account created successfully!");
        // No need to navigate here, as MainLayout will handle this
      } else {
        console.log(`[${currentDateTime}] Registration failed: ${response.msg}`);
        Alert.alert("Registration Failed", response.msg || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(`[${currentDateTime}] Error during registration:`, error);
      Alert.alert("Sign Up Failed", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View
          style={{ 
            paddingTop: hp(4), 
            paddingHorizontal: wp(5), 
            paddingBottom: hp(4),
            minHeight: hp(100) // Ensure minimum height to push footer down
          }}
          className="flex-1 gap-2"
        >
          {/* Image */}
          <View className="items-center">
            <Image
              style={{ height: hp(15) }}
              resizeMode="contain"
              source={require("../assets/images/register.png")}
            />
          </View>

          {/* Title */}
          <View className="mb-1">
            <Text className="text-3xl font-bold text-center text-gray-800">
              Sign Up
            </Text>
            <Text className="text-center text-gray-500">
              Create an account to continue
            </Text>
          </View>

          {/* Form */}
          <View className="gap-3">
            {/* First Name Input */}
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
              <Feather name="user" size={20} color="#999" />
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#999"
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.firstName}
                onChangeText={(value) => handleChange("firstName", value)}
              />
            </View>

            {/* Last Name Input */}
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
              <Feather name="user" size={20} color="#999" />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#999"
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.lastName}
                onChangeText={(value) => handleChange("lastName", value)}
              />
            </View>

            {/* Username Input */}
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
              <Feather name="at-sign" size={20} color="#999" />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#999"
                autoCapitalize="none"
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.username}
                onChangeText={(value) => handleChange("username", value)}
              />
            </View>

            {/* Email Input */}
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
              <Octicons name="mail" size={20} color="#999" />
              <TextInput
                placeholder="Email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>

            {/* Phone Number Input */}
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
              <Feather name="phone" size={20} color="#999" />
              <TextInput
                placeholder="Phone Number (10 digits)"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.phoneNumber}
                onChangeText={(value) => handleChange("phoneNumber", value)}
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
                style={{ fontSize: hp(2) }}
                className="ml-3 flex-1 text-base"
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
              />
            </View>
          </View>

          {/* Submit Button */}
          <View className="mt-2">
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
                onPress={handleRegister}
                className="bg-indigo-500 py-4 rounded-xl"
              >
                <Text className="text-center text-white font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-3">
            <Text className="text-gray-500">Already have an account? </Text>
            <Pressable onPress={() => router.push("/signIn")}>
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </Pressable>
          </View>

          {/* Spacer to push footer to bottom */}
          <View style={{ flex: 1, minHeight: hp(5) }} />

          {/* Current date and user info - UPDATED with hardcoded values */}
          <View className="mb-5">
            <Text className="text-xs text-gray-400 text-center">
              {currentDateTime} • User: {currentUserLogin} • v1.0.3
            </Text>
          </View>
        </View>
      </ScrollView>
    </CustomKeyboardView>
  );
}