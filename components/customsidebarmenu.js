import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer'

import firebase from 'firebase';

export default class SideBarMenu extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: 'orange', flex: 1, }}>
                <View>
                    <DrawerItems {...this.props} />
                </View>

                <View>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: '100%',
                            justifyContent: 'center',
                            padding: 10
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('SignUpLoginScreen');
                            firebase.auth().signOut();
                        }}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}