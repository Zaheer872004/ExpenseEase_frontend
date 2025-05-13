import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';


const ChatItem = ({ item }: { item: any }) => {

    const router = useRouter();


  return (
    <TouchableOpacity
        onPress={() => router.push(`/chatRoom/${item.id}`)}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 bg-white"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB', // neutral-200
      }}
    >
      {/* Profile Image */}
      <Image
        source={require('../assets/images/chatLogo.png')}
        style={{
          height: hp(6.5),
          width: hp(6.5),
          borderRadius: 100,
          backgroundColor: '#f0f0f0',
          borderWidth: 1,
          borderColor: '#e0e0e0',
          marginRight: wp(3),
        }}
      />

      {/* Name and last message */}
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-center mb-1">
          <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">
            Zaheer
          </Text>
          <Text style={{ fontSize: hp(1.5) }} className="text-neutral-500">
            3:45 PM 
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.6) }} className="text-neutral-500">
          Last message here...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
