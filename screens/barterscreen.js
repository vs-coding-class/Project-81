import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'

import db from '../config';
import firebase from 'firebase';

export default class BarterScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            allRequests: [],
        };

        this.requestRef = null;
    }

    getRequests = () => {
        this.requestRef = db.collection("requests")
            .onSnapshot((snapshot) => {
                var requests = [];

                snapshot.forEach((doc) => {
                    requests.push(doc.data());

                    //console.log(requests);

                    this.setState({
                        allRequests: requests,
                    });

                    //console.log(this.state.allRequests)
                });
            });
    }

    componentDidMount() {
        this.getRequests();
    }

    componentWillUnmount() {
        this.requestRef;
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.name}
                subtitle={item.reason}
                titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 45, }}
                bottomDivider>

                <ListItem.Title>
                    {item.name}
                </ListItem.Title>

                <ListItem.Subtitle>
                    {item.reason}
                </ListItem.Subtitle>

                <ListItem.Content>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: '#982012' }}>Exchange</Text>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
        )
    }

    render() {
        return (
            <View>
                <View>
                    <Icon
                        name='bars'
                        type='font-awesome'
                        color='#696969'
                        onPress={() => props.navigation.openDrawer()} />

                    {
                        this.state.allRequests.length === 0 ? (
                            <View style={{ flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>List of all Barters</Text>
                            </View>) : (
                                <FlatList
                                    data={this.state.allRequests}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatList: {
        alignSelf: 'right',
        height: 10,
        width: '5%',
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#827838',
    },
    button: {
        width: '10%',
        height: 50,
        alignSelf: 'right',
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#FFFECB',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});