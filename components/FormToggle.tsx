import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons"; // For icons like check/cross

export default function FormToggle({ control, name }: any) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View className="mb-6">
          <Text className="text-gray-800 text-base font-medium mb-2">
            Food Arrangement
          </Text>

          <View className="flex-row gap-4">
            {/* ✅ Food Provided */}
            <TouchableOpacity
              onPress={() => onChange(true)}
              className={`flex-1 flex-row items-center justify-center rounded-lg px-4 py-3 border transition-all duration-200 ${
                value === true
                  ? "bg-green-600 border-green-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <Ionicons
                name="fast-food"
                size={20}
                color={value === true ? "white" : "black"}
                className="mr-2"
              />
              <Text
                className={`font-semibold ${
                  value === true ? "text-white" : "text-gray-800"
                }`}
              >
                Food Provided
              </Text>
            </TouchableOpacity>

            {/* ❌ No Food */}
            <TouchableOpacity
              onPress={() => onChange(false)}
              className={`flex-1 flex-row items-center justify-center rounded-lg px-4 py-3 border transition-all duration-200 ${
                value === false
                  ? "bg-red-600 border-red-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={value === false ? "white" : "black"}
                className="mr-2"
              />
              <Text
                className={`font-semibold ${
                  value === false ? "text-white" : "text-gray-800"
                }`}
              >
                No Food
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
