import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons"; 
import { useAuth } from "@/context/authContext";

// Updated constants for tracking
const LAST_UPDATED = "2025-05-13 07:38:44"; 
const CURRENT_USER = "Zaheer87";

interface ListItem {
  label: string;
  icon: any;
  route: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const list: ListItem[] = [
    { label: "My Events", icon: icons.event, route: "/myEvents" },
    { label: "Settings", icon: icons.settings, route: "/setting" },
  ];

  const handleLogout = async () => {
    try {
      console.log(`[${LAST_UPDATED}] Logout initiated for user: ${user?.username || CURRENT_USER}`);
      
      const result = await logout();
      
      if (result.success) {
        console.log(`[${LAST_UPDATED}] Logout successful, navigating to sign-in`);
        
        // Don't use router.replace here as it can interfere with auth state management
        // Instead, let the auth context handle navigation through its useEffect in _layout.tsx
        
      } else {
        console.error(`[${LAST_UPDATED}] Logout failed: ${result.msg}`);
        Alert.alert("Logout Failed", result.msg || "Could not complete logout");
      }
    } catch (error) {
      console.error(`[${LAST_UPDATED}] Logout error:`, error);
      Alert.alert("Logout Error", "An unexpected error occurred during logout");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-10">
      {/* Profile Header */}
      <View className="items-center mb-8">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-lg font-semibold text-gray-800">{user?.username || "John Doe"}</Text>

        <Pressable
          onPress={() => router.push("/editProfile")}
          className="mt-4 px-5 py-2 rounded-full bg-orange-400"
        >
          <Text className="text-white font-medium text-sm">Edit Profile</Text>
        </Pressable>
      </View>

      {/* Option List */}
      <View className="space-y-4 ">
        {list.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(item.route as any)}
            className="flex-row items-center mb-2 bg-gray-100 p-4 rounded-xl"
          >
            <Image
              source={item.icon}
              style={{ width: 24, height: 24, marginRight: 12 }}
              resizeMode="contain"
            />
            <Text className="text-gray-700 text-base font-medium">
              {item.label}
            </Text>
          </Pressable>
        ))}

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center bg-red-100 p-4 rounded-xl mt-2"
        >
          <Image
            source={icons.logout}
            style={{ width: 24, height: 24, marginRight: 12 }}
            resizeMode="contain"
          />
          <Text className="text-red-500 text-base font-medium">Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}