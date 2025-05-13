// components/EventItem.tsx
import { View, Text, TouchableOpacity } from "react-native";

interface EventItemProps {
  item: {
    conductedBy: string;
    eventDetails: string;
    place: string;
    date: string;
    category: string;
  };
  onPress?: () => void;
}

export default function EventItem({ item, onPress }: EventItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-sm"
      style={{ elevation: 4 }}
    >
      {/* Conducted by */}
      <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
        {item.conductedBy}
      </Text>

      {/* Category */}
      <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
        {item.category}
      </Text>

      {/* Date and Place */}
      <Text className="text-xs text-gray-400 mt-1" numberOfLines={2}>
        {item.date} • {item.place}
      </Text>
    </TouchableOpacity>
  );
}
