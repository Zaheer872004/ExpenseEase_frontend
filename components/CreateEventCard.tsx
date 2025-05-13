import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons"; // ensure icons.event is a valid image

export default function CreateEventCard({ className = "" }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/createEventPage")}
      android_ripple={{ color: "#ffedd5", borderless: false }}
      className={`flex-row items-center gap-3  border-orange-400 rounded-full bg-white ${className}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text className="text-gray-700 text-sm font-semibold ">
        Create New Event
      </Text>
      <View className="bg-white/20 p-2 rounded-full">
        <Image
          source={icons.event}
          style={{ width: 28, height: 28 }}
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}
