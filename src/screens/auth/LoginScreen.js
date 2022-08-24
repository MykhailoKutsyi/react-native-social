import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  // Platform,
  // KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  // Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { logIn } from '../../redux/session/session-operations';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    // setState(initialState);
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log('state', state);
    await dispatch(logIn(state));
    // resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {console.log('render')}
        <ImageBackground
          style={styles.image}
          source={require('../../assets/images/mountains.jpg')}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 40 : 144,
            }}
          >
            <View style={styles.title}>
              <Text style={styles.headerTitle}>Log in</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={'Email'}
                onSubmitEditing={Keyboard.dismiss}
                value={state.email}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={styles.inputPasswordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder={'Password'}
                secureTextEntry={passwordShown ? false : true}
                onSubmitEditing={Keyboard.dismiss}
                value={state.password}
                onChangeText={value =>
                  setState(prevState => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <Pressable onPress={togglePassword} style={styles.showPassword}>
                <Text>{passwordShown ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={{
                ...styles.btn,
                display: isShowKeyboard ? 'none' : 'flex',
              }}
            >
              <Text style={styles.btnTitle}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.registerLink,
                display: isShowKeyboard ? 'none' : 'flex',
              }}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLinkTitle}>
                Don’t have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  form: {
    backgroundColor: '#fff',
    width: 375,

    // minWidth: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    marginBottom: 33,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 40,
    fontFamily: 'Roboto-Medium',
  },

  inputPasswordContainer: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 55,

    height: 50,
    // maxWidth: "100%",

    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "green",
    // justifyContent: "space-between",

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },

  inputPassword: {
    // backgroundColor: "red",
    width: '100%',
  },

  showPassword: {
    marginLeft: 10,
  },

  input: {
    // backgroundColor: "red",

    padding: 16,
    height: 50,

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },

  btn: {
    marginTop: 40,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },

  btnTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#fff',
  },

  registerLink: {
    alignItems: 'center',
  },

  registerLinkTitle: {
    marginTop: 16,

    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#1B4371',
  },
});
