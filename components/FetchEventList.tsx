import React, { useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { fetchEvents, deleteEvent } from "@/store/features/eventsSlice";
import { RootState } from "@/store";

export default function FetchEvents({ navigation }: any) {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents()); // No more TypeScript error
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteEvent(id)), // No more TypeScript error
      },
    ]);
  };

  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.description}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditEvent", { event: item })}
            style={{ marginTop: 5 }}
          >
            <Text style={{ color: "blue" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id!)}
            style={{ marginTop: 5 }}
          >
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}