import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

const ChatList = ({eventlist} : {eventlist:any}) => {
  return (
    <View className='flex-1 bg-white'>
      <FlatList
        data={eventlist}
        contentContainerStyle={{flex:1, paddingVertical: 25}}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem item={item} />} 
      
      />
    </View>
  )
}

export default ChatList