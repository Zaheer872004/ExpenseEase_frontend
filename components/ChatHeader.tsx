import { View, Text, Platform } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '@/utils/common';
import { useAuth } from '@/context/authContext';

const android = Platform.OS === "android";

const ChatHeader = () => {

  const { top } = useSafeAreaInsets();
  const { user } = useAuth();


  return (
    <View
      style={{
        paddingTop: android ? top + 10 : top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#6366F1', // indigo-400
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <View>
      <Text 
      style={{ color: 'white', fontSize: 20, fontWeight: '600' }}
      className='text-white text-2xl font-semibold'
      >Chats</Text>
      </View>

      <View>
      <Image
        style={{height: hp(4.3), aspectRatio:1, borderRadius: 100}}   
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        transition={500}
      />
      </View>
      
    </View>
  )
}
 
export default ChatHeader
