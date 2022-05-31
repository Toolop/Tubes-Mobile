import {StatusBar} from 'expo-status-bar';
import React,{useState, useEffect}from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity,TextInput} from 'react-native';

import clock from '../../assets/clock.png';
import food from '../../assets/food.png';
import pf from '../../assets/pf.png';

const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectRecipe,setRecipe] = useState(null);
    const [text, onChangeText] = useState("");

    const handleDeskripsi = (desc) => {
      return desc.substring(0, 120);
    };

    const fetchData = async() => {
      const resp = await fetch("https://masak-apa.tomorisakura.vercel.app/api/recipes-length/?limit=10");
      const data = await resp.json();
      setData(data.results);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return(
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.boxHijau}></View>
        <View style={styles.content}>
        <View style={styles.boxSearch}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              onChangeText(text);
            }}
            onKeyPress={() => {}}
            value={text}
            placeholder="Mau Masak Apa Hari Ini ?"
          />
      </View>
          <FlatList
            data={data}
            keyExtractor={item => item.key}
            renderItem = {({item}) => {
              return(
                  <TouchableOpacity style={styles.kotak} onPress={() => {
                                                      navigation.navigate('Detail', {
                                                        itemKey: item.key,
                                                      });
                                                    }}>
                    <Image source={{ uri: item.thumb }} style={styles.image}></Image>
                    <View style={styles.desc}>
                      <Text style={styles.judul}>{item.key.replace('resep', '').replace('-','')}</Text>
                      <View style={styles.tagInfo_detail}>
                        <Image source={clock} style={styles.img_tag}></Image>
                        <Text style={{fontSize:16,marginLeft:10}}>{item.times}</Text>
                      </View>
                      <View style={styles.tagInfo_detail}>
                        <Image source={food} style={styles.img_tag}></Image>
                        <Text style={{fontSize:16,marginLeft:10}}>{item.portion}</Text>
                      </View>
                      <View style={styles.tagInfo_detail}>
                        <Image source={pf} style={styles.img_tag}></Image>
                        <Text style={{fontSize:16,marginLeft:10}}>{item.dificulty}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
              )
            }}
          />
          </View>
      </View>)
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: "#E7F6EF",
    },
    content:{
      marginTop:30,
    },
    H1:{
      marginTop:50,
      fontSize:20,
    },
    kotak: {
      backgroundColor: "#fff",
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 22,
      flexDirection: "row",
      borderRadius: 12,
      elevation: 3,
    },
    newRecipe:{
      flexDirection:'row',
      marginBottom:10,
    },
    image:{
      marginTop:10,
      width: 90,
      height: 90,
    },
    boxHijau: {
      backgroundColor: "#3ABD8F",
      width: '100%',
      height: 160,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      position: "absolute",
    },
    boxSearch: {
      width: "auto",
      height: 50,
      marginHorizontal: 16,
      backgroundColor: "#FFF",
      marginBottom: 18,
      marginTop: 25,
      borderRadius: 10,
      flexDirection: "row",
      padding: 10,
      paddingLeft: 20,
    },
    input: {
      marginLeft: 10,
      fontSize: 15,
    },
    desc:{
      marginLeft:10,
      width:'70%',
    },
    deskripsi: {
      fontSize: 12,
      textAlign: "justify",
      color: "#443C3C",
    },
    judul: {
      fontSize: 16,
      fontWeight: "bold",
    },
    tagInfo_detail:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:5,
    },
    img_tag:{
      width: 20,
      height:20,
    }
  });

  export default Home;