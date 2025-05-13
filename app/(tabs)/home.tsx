import { useRouter } from "expo-router";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import SearchBar from "@/components/SearchBar";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryList from "@/components/CategoryList";
import CreateEventCard from "@/components/CreateEventCard";
import EventItem from "@/components/EventItem";
import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";


const events = [
  {
    id: "1",
    conductedBy: "Google Developers",
    eventDetails:
      "A hands-on workshop focused on building scalable web apps with Firebase and Flutter.",
    place: "Bangalore, India",
    date: "2025-01-15",
    category: "Tech Workshop",
  },
  {
    id: "2",
    conductedBy: "TEDxYouth",
    eventDetails:
      "A series of talks by young innovators and change-makers inspiring the next generation.",
    place: "Delhi, India",
    date: "2025-02-10",
    category: "Conference",
  },
  {
    id: "3",
    conductedBy: "Amazon Web Services",
    eventDetails:
      "An interactive bootcamp on cloud computing, DevOps, and serverless architecture.",
    place: "Seattle, USA",
    date: "2025-03-05",
    category: "Cloud Computing",
  },
  {
    id: "4",
    conductedBy: "Behance Community",
    eventDetails:
      "Creative professionals sharing portfolios, networking, and design trends.",
    place: "Paris, France",
    date: "2025-04-01",
    category: "Design Meetup",
  },
  {
    id: "5",
    conductedBy: "Women Who Code",
    eventDetails:
      "A celebration of women in tech with panels, coding challenges, and mentoring sessions.",
    place: "Berlin, Germany",
    date: "2025-03-20",
    category: "Empowerment / Tech",
  },
  {
    id: "6",
    conductedBy: "PyCon Community",
    eventDetails:
      "Annual gathering for the Python community with workshops and lightning talks.",
    place: "Chicago, USA",
    date: "2025-05-12",
    category: "Programming Conference",
  },
  {
    id: "7",
    conductedBy: "UN Climate Action",
    eventDetails:
      "A global summit addressing sustainable practices and climate change action plans.",
    place: "Geneva, Switzerland",
    date: "2025-04-25",
    category: "Environment",
  },
  {
    id: "8",
    conductedBy: "Startup India",
    eventDetails:
      "A pitch and networking event for emerging startups to showcase innovation.",
    place: "Mumbai, India",
    date: "2025-02-28",
    category: "Startup / Business",
  },
  {
    id: "9",
    conductedBy: "Hack The Future",
    eventDetails: "48-hour hackathon on AI/ML, Web3, and social impact ideas.",
    place: "Singapore",
    date: "2025-03-30",
    category: "Hackathon",
  },
  {
    id: "10",
    conductedBy: "Art for Change Foundation",
    eventDetails:
      "An art exhibition and workshop for youth to explore creativity through storytelling.",
    place: "Melbourne, Australia",
    date: "2025-01-22",
    category: "Art & Culture",
  },
];

export default function Index() {
  const router = useRouter();

//   const events = useSelector((state:RootState) => state.events.events);


  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <FlatList
        data={events}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <View className="px-4">
            {/* Search */}
            {/* <View className="flex-row items-center justify-between mt-4">
              <SearchBar placeholder="Search events..." />
            </View> */}

            {/* Trending */}
            <Text className="text-lg font-semibold mt-6 text-gray-800">
              Trending Events
            </Text>
            <BannerCarousel />

            {/* Categories */}
            <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800">
              Categories
            </Text>
            <CategoryList />

            {/* Events Button */}
            <View className="absolute flex right-0 bottom-0 px-4">
              <CreateEventCard />
            </View>

            {/* Latest */}
            <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800">
              Events
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <EventItem
            item={item}
            // onPress={() => router.push(`/event/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
