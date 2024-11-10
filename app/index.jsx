import {
    Text,
    View,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    Image,
  } from "react-native";
  import React, { useState, useEffect, memo } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import axios from "axios";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  import Entypo from "@expo/vector-icons/Entypo";
  import Flagapi from "../app/Flagapi";
  import LottieView from 'lottie-react-native';
  import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Expanse from "../components/Expanse"
  import Setting from "../components/Setting"
  import * as Icon from "react-native-feather";
  
  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
  
  const CountryItem = memo(({ item, onSelect }) => (
    <TouchableOpacity
      className="p-2 border-b border-gray-500"
      onPress={() => onSelect(item.code)} // Set selected currency code
    >
      <View className="flex-row border-2 border-gray-400  items-center rounded-full m-3 p-3">
        <Image source={{ uri: item.flag }} style={styles.image} />
        <View className="ml-11">
          <Text className="text-white font-bold text-xl">{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));
  
  const DashBoard = () => {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
  
    const onCountrySelect = (currencyCode) => {
      if (selectedField === "from") {
        setFromCurrency(currencyCode);
      } else if (selectedField === "to") {
        setToCurrency(currencyCode);
      }
      setCountryPickerVisible(false); // Close the modal
    };
  
    useEffect(() => {
      const fetchExchangeRates = async () => {
        try {
          const response = await axios.get(API_URL);
          setRates(response.data.rates);
        } catch (error) {
          console.error("Error fetching exchange rates: ", error);
        }
      };
  
      fetchExchangeRates();
    }, []);
  
    const convertCurrency = () => {
      if (rates[fromCurrency] && rates[toCurrency]) {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        const conversionRate = toRate / fromRate;
        setConvertedAmount(amount * conversionRate);
      }
    };
    return (
      <ImageBackground
        blurRadius={60}
        source={require("../assets/images/bg.jpeg")}
      >
        <SafeAreaView className="flex-1 relative" style={styles.root}>
          <View className="h-full p-3 ">
            {/**DashBoard */}
  
            <View className="items-center p-4 flex-row">
            <FontAwesome5 name="flipboard" size={24} color="white" />
              <Text className="text-3xl text-white font-serif font-thin ml-4">
                  DashBoard
              </Text>
            </View>
  <View className="border border-white"></View>
  
            {/**Exchanger Header */}
  
            <View className="h-80 w-full rounded-2xl bg-black">
              <View className="flex-row p-1">
                <Text className=" text-2xl text-white"> Currency Exchanger</Text>
              </View>
  
              {/**Exchanger */}
  
              {/**from */}
              <View className="p-3">
                <View className="flex-row">
                  <View className="border border-white rounded-lg p-3 m-2 w-40 flex-row">
                    <TextInput
                      style={{ color: "white" }}
                      selectionColor={"white"}
                      placeholder="From"
                      placeholderTextColor="white"
                      value={fromCurrency}
                      onChangeText={setFromCurrency}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedField("from"); // Set field to "from" for this TouchableOpacity
                        setCountryPickerVisible(true); // Show the modal
                      }}
                    >
                      <Entypo
                        name="select-arrows"
                        size={24}
                        color="white"
                        className="ml-16"
                      />
                    </TouchableOpacity>
                  </View>
  
                  <Text className="text-white align-middle m-2 text-xl font-bold">
                    To
                  </Text>
  
                  {/**To */}
  
                  <View className="border border-white rounded-lg p-3 m-2 w-40 flex-row">
                    <TextInput
                      style={{ color: "white" }}
                      selectionColor={"white"}
                      placeholder="To"
                      placeholderTextColor="white"
                      value={toCurrency}
                      onChangeText={setToCurrency}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedField("to"); // Set field to "to" for this TouchableOpacity
                        setCountryPickerVisible(true); // Show the modal
                      }}
                    >
                      <Entypo
                        name="select-arrows"
                        size={24}
                        color="white"
                        className="ml-20"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
  
                {/* Custom Country Picker Modal list */}
  
                <Modal
                  transparent={true}
                  visible={isCountryPickerVisible}
                  animationType="slide"
                  onRequestClose={() => setCountryPickerVisible(false)}
                >
                  <View className="flex-1 bg-black opacity-95">
                    <View className="p-3 ">
                      {/* FlatList to display country options */}
                      <FlatList
                        data={Flagapi} // Country list from Flagapi
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                          <CountryItem item={item} onSelect={onCountrySelect} />
                        )}
                      />
                    </View>
                  </View>
                </Modal>
  
                {/* Amount */}
  
                <View className="flex-row mt-5">
                  <TextInput
                    className="border border-white rounded-lg p-3 m-3 w-32 relative h-16"
                    style={{ color: "white" }}
                    selectionColor={"white"}
                    keyboardType="numeric"
                    placeholder="Enter Amount"
                    placeholderTextColor="white"
                    value={amount}
                    onChangeText={setAmount}
                  />
                  <FontAwesome5
                    name="exchange-alt"
                    size={17}
                    color="white"
                    className="align-middle m-6"
                  />
                  {/* Converted */}
  
                  <View className="w-40 h-20 flex-row items-center justify-center">
                    <Text className="text-white text-xl">
                      = {convertedAmount.toFixed(2)} {toCurrency}
                    </Text>
                  </View>
                </View>
  
                {/* Convert Button */}
  
                <View className="items-center "> 
                    <TouchableOpacity onPress={convertCurrency} className="">
                    <View className="bg-white h-12 w-56 items-center mt-6 rounded-xl justify-center">
                      <Text className="text-black font-bold text-xl ">
                        Convert
                      </Text>
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
  
            {/*New Transaction */}
            <View className="mt-5"> 
              <TouchableOpacity>
              <View className="border border-gray-600 bg-black opacity-70 rounded-xl h-28 w-full p-3">
                <View className="flex-row p-1">
              <MaterialCommunityIcons name="open-in-new" size={24} color="white" />
                <Text className="text-white text-2xl font-semibold">   Add New Transaction </Text>
                </View>
                <View className="mt-5">
                <Text className="text-gray-400 text-base font-semibold"> Spent $20K this month  /   Earned $60K this month</Text>
                </View>
                </View>
              </TouchableOpacity>
            </View>
  
            {/*Recent Transactions */}
            <View className="mt-3 ml-2">
              <Text  className="text-white text-xl font-semibold bg-black w-52 rounded-md p-1"> Recent Transactions </Text>
              <View className="items-center">
              <LottieView 
              source={require("../assets/Animation - 1729940350519.json")}
              autoPlay loop
            style={{height:180, width:180}}
              />
              <Text className="font-semibold">No transactions!</Text>
              </View>
            </View>
            {/*END */}
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };
  
  
  const styles = StyleSheet.create({
    root: {
      color: "white",
    },
    Button: {
      color: "black",
      backgroundColor: "white",
    },
    image: {
      width: 35,
      height: 35,
    },
  });
  
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer independent={true} >
        <Tab.Navigator
        screenOptions={{
          tabBarStyle : {backgroundColor:"black",},
          tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray', 
        }}
        >
          <Tab.Screen name="DashBoard" component={DashBoard} 
         options={{
          tabBarIcon: () => <Icon.DollarSign color={"white"} width={20} height={20}/> ,
          headerShown: false,
          tabBarLabel : "",
         
         }} 
          />
          <Tab.Screen name="Expanse" component={Expanse} 
          options={{
            tabBarIcon: () => <Icon.Pocket color={"white"} width={20} height={20}/> ,
            headerShown: false,
            tabBarLabel : ""
           }}
          />
          <Tab.Screen name="Settings" component={Setting} 
          options={{
            tabBarIcon: () => <Icon.Settings color={"white"} width={20} height={20}/> ,
            headerShown: false,
            tabBarLabel : ""
           }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }