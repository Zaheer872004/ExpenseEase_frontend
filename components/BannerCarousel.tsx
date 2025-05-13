import { ScrollView, View, Image, Text } from "react-native";

const eventData = [
  {
    banner: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eventName: "Tech Conference 2025",
    place: "San Francisco, CA",
    date: "2025-03-21"
  },
  {
    banner: "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D",
    eventName: "Startup Pitch Day",
    place: "New York, NY",
    date: "2025-01-18"
  },
  {
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eventName: "Design Meetup",
    place: "Berlin, Germany",
    date: "2025-02-05"
  },
  {
    banner: "https://images.unsplash.com/photo-1620735692151-26a7e0748429?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eventName: "AI & ML Summit",
    place: "Tokyo, Japan",
    date: "2025-04-02"
  },
  {
    banner: "https://plus.unsplash.com/premium_photo-1664790560117-6c50d64c49b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnQlMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D",
    eventName: "Blockchain Expo",
    place: "London, UK",
    date: "2025-03-10"
  }
];

export default function BannerCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {eventData.map((event, index) => (
        <View key={index} style={{ marginRight: 10 }}>
          <Image
            source={{ uri: event.banner }}
            style={{ width: 200, height: 150, borderRadius: 10 }}
          />
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>{event.eventName}</Text>
          <Text>{event.place}</Text>
          <Text>{event.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
