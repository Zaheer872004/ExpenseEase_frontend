import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  control: any;
  name: string;
  label?: string;
};

export default function FormDatePicker({ control, name, label = "Event Date" }: Props) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View className="mb-5">
          <Text className="text-base font-medium text-gray-800 mb-2">{label}</Text>
          <TouchableOpacity
            onPress={() => setShow(true)}
            className="px-4 py-3 rounded-xl py-2 bg-gray-100 border border-gray-300 shadow-sm transition duration-200 active:opacity-90"
          >
            <Text className="text-gray-800">
              {value ? value.toDateString() : "Select a date"}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(_, selectedDate) => {
                setShow(false);
                if (selectedDate) onChange(selectedDate);
              }}
            />
          )}
        </View>
      )}
    />
  );
}
