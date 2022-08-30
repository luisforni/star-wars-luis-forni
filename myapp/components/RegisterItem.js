import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

const RegisterItem = ({ register, handleDelete }) => {
    
    const navigation = useNavigation()
    
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterFormScreen', { id: register.id })}>
                <Text style={styles.itemTitle}>{register.first_name}</Text>
                <Text style={styles.itemTitle}>{register.last_name}</Text>
                <Text style={styles.itemTitle}>{register.date_birth}</Text>
                <Text style={styles.itemTitle}>{register.phone}</Text>
                <Text style={styles.itemTitle}>{register.country}</Text>
                <Text style={styles.itemTitle}>{register.email}</Text>
                <Text style={styles.itemTitle}>{register.star_wars}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{backgroundColor: '#ee5253', padding: 7, borderRadius: 5 }}
                onPress={() => handleDelete(register.id)}
            >
                <Text style={{color: '#fff'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#333333",
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        color: '#ffffff'
    }
});

export default RegisterItem