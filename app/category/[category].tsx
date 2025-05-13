// app/category/[category].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventItem from "@/components/EventItem";

const allEvents = [
  {
    id: "1",
    conductedBy: "Google Developers",
    eventDetails:
      "A hands-on workshop focused on building scalable web apps with Firebase and Flutter.",
    place: "Bangalore, India",
    date: "2025-01-15",
    category: "Tech", // Already matches "Tech"
  },
  {
    id: "2",
    conductedBy: "TEDxYouth",
    eventDetails:
      "A series of talks by young innovators and change-makers inspiring the next generation.",
    place: "Delhi, India",
    date: "2025-02-10",
    category: "Education", // Best match from given list
  },
  {
    id: "4",
    conductedBy: "Women Who Code",
    eventDetails:
      "A celebration of women in tech with panels, coding challenges, and mentoring sessions.",
    place: "Berlin, Germany",
    date: "2025-03-20",
    category: "Tech", // Closest match, though Empowerment isn’t in the list
  },
  {
    id: "5",
    conductedBy: "PyCon Community",
    eventDetails:
      "Annual gathering for the Python community with workshops and lightning talks.",
    place: "Chicago, USA",
    date: "2025-05-12",
    category: "Tech", // Programming Conference -> Tech
  },
  {
    id: "6",
    conductedBy: "UN Climate Action",
    eventDetails:
      "A global summit addressing sustainable practices and climate change action plans.",
    place: "Geneva, Switzerland",
    date: "2025-04-25",
    category: "Education", // Environment -> Education is the closest
  },
  {
    id: "7",
    conductedBy: "Startup India",
    eventDetails:
      "A pitch and networking event for emerging startups to showcase innovation.",
    place: "Mumbai, India",
    date: "2025-02-28",
    category: "Tech", // Startup / Business -> closest to Tech
  },
  {
    id: "8",
    conductedBy: "Hack The Future",
    eventDetails: "48-hour hackathon on AI/ML, Web3, and social impact ideas.",
    place: "Singapore",
    date: "2025-03-30",
    category: "Tech", // Hackathon -> Tech
  },
  {
    id: "9",
    conductedBy: "Art for Change Foundation",
    eventDetails:
      "An art exhibition and workshop for youth to explore creativity through storytelling.",
    place: "Melbourne, Australia",
    date: "2025-01-22",
    category: "Art", // Art & Culture -> Art
  },
  {
    id: "10",
    conductedBy: "TEDxYouth",
    eventDetails:
      "A series of talks by young innovators and change-makers inspiring the next generation.",
    place: "Delhi, India",
    date: "2025-02-10",
    category: "Education", // Conference -> Education fits best
  },
];

export default function CategoryPage() {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const filteredEvents = allEvents.filter(
    (event) =>
      event.category.toLowerCase() === String(category).toLowerCase()
  );

  const handleEventPress = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-2">
      <Text className="text-xl font-bold mb-4 text-gray-800">
        Events: {category}
      </Text>
      <FlatList
        data={filteredEvents}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <EventItem
            item={item}
            onPress={() => handleEventPress(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No events found in this category.
          </Text>
        }
      />
    </SafeAreaView>
  );
}