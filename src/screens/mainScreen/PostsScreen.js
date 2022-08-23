import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  // console.log('route.params', route.params);
  // useEffect(() => {
  //   setPosts(prevState => [
  //     ...prevState,
  //     {
  //       capturedImage:
  //         'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact-native-social-88056920-b8f1-4384-9bd3-35e2c7c68776/Camera/831c0a90-7794-492e-895f-c5bec9144eaa.jpg',
  //       state: { location: 'location', name: 'name', photochka: '' },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  // console.log('posts', posts);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          console.log('item', item),
          (
            <>
              <View
                style={{
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: item.capturedImage }}
                  style={{ width: 350, height: 200 }}
                />
              </View>

              <View
                style={{
                  marginLeft: 15,
                  marginBottom: 10,
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}
              >
                <Text>{item.state.name}</Text>
              </View>

              <TouchableOpacity
                // onPress={preStartCamera}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#BDBDBD',
                    fontWeight: 'bold',
                  }}
                >
                  Comments
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={preStartCamera}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#BDBDBD',
                    fontWeight: 'bold',
                  }}
                >
                  {item.state.location}
                </Text>
              </TouchableOpacity>
            </>
          )
        )}
      />
      <Button title="go to map" onPress={() => navigation.navigate('Map')} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate('Comments')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DefaultScreenPosts;
