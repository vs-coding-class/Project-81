import * as React from 'react';
import { Modal, Image, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: '',
            isVisible: false,
        }
    }

    showModal = () => {
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isVisible}>

            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder={'First'}
                    onChangeText={(text) => {
                        this.setState({ firstName: text });
                    }}
                    value={this.state.firstName}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Last name'}
                    onChangeText={(text) => {
                        this.setState({ lastName: text });
                    }}
                    value={this.state.lastName}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Phone number'}
                    onChangeText={(text) => {
                        this.setState({ phoneNumber: text });
                    }}
                    value={this.state.phoneNumber}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Address'}
                    onChangeText={(text) => {
                        this.setState({ address: text });
                    }}
                    value={this.state.address}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                    onChangeText={(text) => {
                        this.setState({ email: text });
                    }}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({ password: text });
                    }}
                    value={this.state.password}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder={'Confirm password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({ confirmPassword: text });
                    }}
                    value={this.state.confirmPassword}
                />

                <TouchableOpacity
                    style={styles.signup}
                    onPress={() => { this.userSignUp(this.state.email, this.state.password); }}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => {
                        this.setState({
                            isVisible: false,
                        });
                    }}>
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    }

    userLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('ExchangeScreen', { username: this.state.email });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
    }

    userSignUp = (email, password) => {
        if (this.state.password === this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    db.collection('users').add({
                        ['contact']: this.state.phoneNumber,
                        ['name']: this.state.firstName,
                        ['address']: this.state.address,
                        ['email']: email,
                        ['lastName']: this.state.lastName,
                    });
                    return Alert.alert("Successful signup. Please login with your credentials.");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage);
                });

            db.collection('users').add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
            });
        }
        else {
            Alert.alert("Your passwords don't match.");
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'orange' }}>
                <View>
                    <Image
                        style={styles.image}
                        source={require('../assets/barter.jpeg')}
                    />
                    <Text style={styles.titleText}> Barter System </Text>
                </View>

                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Please enter your email...'}
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            this.setState({ email: text });
                        }}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Please enter your password...'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                        }}
                        value={this.state.password}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => { this.userLogin(this.state.email, this.state.password); }}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signup}
                        onPress={() => {
                            this.setState({
                                isVisible: true,
                            });
                            this.showModal();
                        }}>
                        <Text style={styles.text}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 2,
        borderColor: '#0A1045',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    text: {
        fontSize: 15,
        color: '#F13030',
    },
    titleText: {
        color: '#38686A',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 50,
        marginBottom: 100,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    login: {
        width: '20%',
        height: '100',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 100,
        padding: 50,
        backgroundColor: '#1E555C',
        marginLeft: '20%',
    },
    signup: {
        width: '20%',
        height: '100',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 100,
        padding: 50,
        backgroundColor: '#1E555C',
        marginLeft: '60%',
        marginTop: '-9.4%',
        marginBottom: '4.25%',
    }
});