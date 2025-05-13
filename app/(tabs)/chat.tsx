import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "@/components/ChatList";
import { useAuth } from "@/context/authContext";
import { eventRef } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";

const chat = () => {

  const {logout, user} = useAuth();
  /*
   similar to make an useEventList and fetch all the events
   
   check if eventlist contains and userId then user will show
    if not then show no events

   */

  const [eventlist, setEventlist] = useState([1, 2, 3]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchEventList();
    if(user?.uid){
      getEventList();
    }
  },[]);

  const getEventList = async () => {
    // fetch the eventList from the firebase store
    // const q = query(eventRef, where("eventlist.userId", "==", user?.uid)); 

    // const querySnapshot = await getDocs(q);
    // let data:any = [];
    // querySnapshot.forEach((doc:any) => {
    //   data.push(...doc.data());
    // });

    // // console.log("got users eventlist", data);
    // setEventlist(data); 
    

  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {eventlist.length > 0 ? (
        <ChatList eventlist={eventlist} />
      ) : (
        <View
          className="flex-1 items-center"
          style={{
            top: hp(30),
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default chat;
