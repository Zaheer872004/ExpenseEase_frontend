import React, { useState } from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { Controller } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  control: any;
  multiline?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
};

export default function FormInput({
  label,
  name,
  placeholder,
  control,
  multiline = false,
  keyboardType = "default",
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-gray-800 mb-2">{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`px-4 py-3 rounded-xl text-[16px] bg-white ${
              isFocused
                ? "border-[2px] border-blue-500"
                : "border border-gray-300"
            }`}
            placeholder={placeholder}
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              // fallback style in case tailwind classes fail
              borderWidth: isFocused ? 2 : 1,
              borderColor: isFocused ? 'green' : '#d1d5db',
            }}
          />
        )}
      />
    </View>
  );
}
