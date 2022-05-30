import {StatusBar} from 'expo-status-bar';
import react,{useState, useEffect}from 'react';
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity} from 'react-native';


const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectRecipe,setRecipe] = useState(null)
  
    const fetchData = async() => {
      const resp = await fetch("https://masak-apa.tomorisakura.vercel.app/api/recipes");
      const data = await resp.json();
      setData(data.results);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return(
    <View style={styles.container}>
        <Text style={styles.H1}>Resepku</Text>
        <StatusBar style="auto" />
        <Text>Resep Terbaru</Text>
        <View style={styles.newRecipe}>
          <FlatList
            data={data}
            keyExtractor={item => item.key}
            renderItem = { ({item}) => {
              return(
                <TouchableOpacity onPress={() => navigation.navigate("Detail",)}>
                  <Image source={{ uri: item.thumb }} style={styles.image}></Image>
                  <Text>{item.key}</Text>
                  <Text>{item.times}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>)
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginLeft:10,
    },
    H1:{
      marginTop:50,
      fontSize:20,
    },
    newRecipe:{
      width:'100%',
      height:'100%',
    },
    image:{
      marginTop:10,
      width:200,
      height:200,
    }
  });

  export default Home;