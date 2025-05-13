// app/index.tsx
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

const categories = [
  "Music",
  "Art",
  "Tech",
  "Sports",
  "Food",
  "Travel",
  "Gaming",
  "Education",
];

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <Text className="text-2xl font-bold px-4 pt-4 text-indigo-700">Browse Categories</Text> */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{  paddingVertical: 12, display: "flex", flexDirection: "row", gap: 5 }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(category)}
            className="bg-green-300 px-4 py-2 mr-3 rounded-full border border-indigo-300"
            activeOpacity={0.8}
          >
            <Text className="text-indigo-800 text-[15px] font-semibold">{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
