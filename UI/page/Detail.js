import React,{useState, useEffect}from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import clock from '../../assets/clock.png';
import food from '../../assets/food.png';
import pf from '../../assets/pf.png';

const Detail = ({ route, navigation }) => {
  const { itemKey} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectRecipe,setRecipe] = useState(null);

  const fetchData = async() => {
    try{
      const resp = await fetch(`https://masak-apa-tomorisakura.vercel.app/api/recipe/${itemKey}`);
      const data = await resp.json();
      setData(data.results);
      setLoading(false);
    }
    catch (error){
      this.setState({setLoading:false})
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: data.thumb }} style={styles.image}></Image>
          <View style={styles.content}>
          <Text style={styles.H1}>{data.title}</Text>
          <View style={styles.tagInfo}>
            <View style={styles.tagInfo_detail}>
              <Image source={clock}></Image>
              <Text style={{fontSize:16}}>{data.times}</Text>
            </View>
            <View style={styles.tagInfo_detail}>
              <Image source={food}></Image>
              <Text style={{fontSize:16}}>{data.servings}</Text>
            </View>
            <View style={styles.tagInfo_detail}>
              <Image source={pf}></Image>
              <Text style={{fontSize:16}}>{data.dificulty}</Text>
            </View>
          </View>
          

          <View style={styles.card}>
            <Text style={styles.h3}>Deskripsi</Text>
            <Text style={styles.p}>{data.desc}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.h3}>Alat dan Bahan</Text>
            {data?.ingredient?.map(ing => <Text>{ing}</Text>)}
          </View>

          <View style={styles.card}>
            <Text style={styles.h3}>Langkah-Langkah</Text>
            {data?.step?.map(step => <Text>{step}</Text>)}
          </View>
          </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F6EF',
  },
  H1:{
    fontSize:20,
    fontWeight:'bold',
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
  tagInfo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    marginBottom:30,
  },
  tagInfo_detail:{
    alignItems:'center',
  },
  content:{
    marginLeft:20,
    marginRight:20,
  },
  card:{
    backgroundColor:'#fff',
    padding: 30,
    borderRadius:20,
    marginBottom:30,
  },
  h3:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10,
  },
  p:{
    fontSize:16,
    textAlign:'justify',
  },
  image:{
    width:'100%',
    height:200,
    marginBottom:20,
  }
});

export default Detail;