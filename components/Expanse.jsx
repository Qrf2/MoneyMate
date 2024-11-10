import {Text, View,TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Eat = () => {
  return (
    <SafeAreaView>
      <View className="h-full">
      <View className="items-center"> 
        <Text  className="font-bold text-2xl">New Expanse</Text>
      </View>
      <View>
        <TextInput
                  className="bg-gray-200 rounded-lg p-3 w-96  h-14 m-5 justify-center"
                  style={{ color: "black" }}
                  selectionColor={"black"}
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  placeholderTextColor="gray"
                />
                </View>
                 <TextInput
                  className="bg-gray-200 rounded-lg p-3 w-96  h-14 m-5 justify-center"
                  style={{ color: "black" }}
                  selectionColor={"black"}
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  placeholderTextColor="gray"
              
                />
                 <TextInput
                  className="bg-gray-200 rounded-lg p-3 w-96  h-14 m-5 justify-center"
                  style={{ color: "black" }}
                  selectionColor={"black"}
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  placeholderTextColor="gray"
                  
                />
                 <TextInput
                  className="bg-gray-200 rounded-lg p-3 w-96  h-14 m-5 justify-center"
                  style={{ color: "black" }}
                  selectionColor={"black"}
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  placeholderTextColor="gray"
                  
                />
      </View>
    </SafeAreaView>
  )
}

export default Eat