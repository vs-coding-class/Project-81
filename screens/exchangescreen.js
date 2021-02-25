import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { openDrawer } from 'react-navigation-drawer';

import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            item: '',
            number: '',
            reason: '',
        }
    }

    addItem = () => {
        db.collection('requests').add({
            ['username']: this.props.navigation.getParam('username'),
            ['name']: this.state.item,
            ['number']: this.state.number,
            ['reason']: this.state.reason,
        });

        this.setState({
            item: '',
            number: '',
            reason: '',
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#6F732F' }}>
                <View>
                    <Icon
                        name='bars'
                        type='font-awesome'
                        color='#123ABC'
                        onPress={() => this.props.navigation.toggleDrawer()} />

                    <TextInput
                        style={styles.item}
                        placeholder={"Please enter the item that you need..."}
                        onChangeText={(text) => {
                            this.setState({
                                item: text
                            });
                        }}
                        value={this.state.item} />

                    <TextInput
                        style={styles.number}
                        placeholder={"How many of the item do you need..."}
                        keyboardType={'numeric'}
                        maxLength={5}
                        onChangeText={(text) => {
                            this.setState({
                                number: text
                            });
                        }}
                        value={this.state.number} />

                    <TextInput
                        style={styles.reason}
                        placeholder={"Why do you need the item..."}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                reason: text
                            });
                        }}
                        value={this.state.reason} />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => { this.addItem(); }}>
                        <Text style={styles.text}>Submit Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 50,
        width: '80%',
        height: 40,
        borderWidth: 2,
        backgroundColor: '#B38A58',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30,
    },
    reason: {
        alignSelf: 'center',
        marginBottom: 100,
        width: '80%',
        height: 100,
        borderWidth: 2,
        backgroundColor: '#B38A58',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    number: {
        alignSelf: 'center',
        marginBottom: 50,
        width: '80%',
        height: 35,
        borderWidth: 2,
        backgroundColor: '#B38A58',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    text: {
        fontSize: 30,
        color: '#5448C8',
    },
    submit: {
        width: '40%',
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
        padding: 50,
        backgroundColor: '#FFFECB',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 150,
    },
});