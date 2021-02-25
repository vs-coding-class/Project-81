import * as React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            docId: '',
        }
    }

    getInfo() {
        var requestRef = db.collection("users")
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    var data = [];
                    data.push(doc.data());

                    var user = firebase.auth().currentUser;

                    for (var i in data) {
                        if (data[i].email === user.email) {
                            this.setState({
                                firstName: data[i].name,
                                lastName: data[i].lastName,
                                contact: data[i].contact,
                                address: data[i].address,
                                docId: doc.id,
                            })

                            console.log(this.state.firstName);
                            console.log(this.state.lastName);
                            console.log(this.state.contact);
                            console.log(this.state.address);
                        }
                    }
                });
            });

    }

    componentDidMount() {
        this.getInfo();
    }

    replaceInfo = () => {

        db.collection('users').doc(this.state.docId).update({
            name: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
        });
    }

    render() {
        return (
            <ScrollView>
                <Icon
                    name='bars'
                    type='font-awesome'
                    color='#123ABC'
                    onPress={() => this.props.navigation.toggleDrawer()} />

                <View>
                    <TextInput
                        style={styles.inputs}
                        placeholder={"First name"}
                        onChangeText={(text) => {
                            this.setState({
                                firstName: text
                            });
                        }}
                        value={this.state.firstName} />

                    <TextInput
                        style={styles.inputs}
                        placeholder={"Last name"}
                        onChangeText={(text) => {
                            this.setState({
                                lastName: text
                            });
                        }}
                        value={this.state.lastName} />

                    <TextInput
                        style={styles.inputs}
                        placeholder={"Contact"}
                        onChangeText={(text) => {
                            this.setState({
                                contact: text
                            });
                        }}
                        value={this.state.contact} />

                    <TextInput
                        style={styles.inputs}
                        placeholder={"Address"}
                        onChangeText={(text) => {
                            this.setState({
                                address: text
                            });
                        }}
                        value={this.state.address} />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.save}
                        onPress={() => { this.replaceInfo(); }}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    inputs: {
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 50,
        width: '80%',
        height: 40,
        borderWidth: 2,
        backgroundColor: '#B38A58',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
    },
    text: {
        fontSize: 30,
        color: '#5448C8',
    },
    save: {
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