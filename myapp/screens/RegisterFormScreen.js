import { View, Text, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import 'react-datepicker/dist/react-datepicker.css'

import SelectList from 'react-native-dropdown-select-list';

import Layout from '../components/Layout';
import { Button, TouchableOpacity } from 'react-native-web';

import { saveRegister, getRegister, updateRegister } from '../api';

import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterFormScreen = ({ navigation, route }) => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate)

        console.log(fDate)

    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    
    const [selected, setSelected] = React.useState("");

    const [register, setRegister] = useState({
        first_name: '',
        last_name: '',
        date_birth: '',
        phone: '',
        country: '',
        email: '',
        star_wars: '',
    });

    const [people, setPeople] = useState([]);

    const [editing, setEditing] = useState(false);

    const handleChange = (name, value) => setRegister({...register, [name]: value});

    const handleSubmit = async () => {
        try {
            if (!editing) {
                if (register.first_name == '' || register.last_name == '' || register.date_birth == '' || register.phone == '' || register.country == '' || register.email == '' || register.star_wars == '') {
                    console.log('Data NULL');
                } else {
                    let currentDate = new Date();
                    let currentYear = parseInt(currentDate.getFullYear());
                    let currentMonth = parseInt(currentDate.getMonth()) + 1;
                    let currentDay = parseInt(currentDate.getDate());

                    let yearBirth = parseInt(String(register.date_birth).substring(0,4))
                    let monthBirth = parseInt(String(register.date_birth).substring(5,7))
                    let dayBirth = parseInt(String(register.date_birth).substring(8,10))

                    let years = currentYear - yearBirth;

                    if (currentMonth < monthBirth) {
                        years--;
                    } else if (currentMonth === monthBirth ) {
                        if (currentDay < dayBirth) {
                            years--;
                        }
                    }

                    if (years < 18) {
                        alert('Wait a few years, only for adults');
                        console.log('Years:', years);
                    } else {
                        if (register.country == 'Spain') {
                            await saveRegister(register);
                            navigation.navigate('HomeScreen');
                        } else {
                            alert('Valid only for Spanish users');
                            console.log('Country:', register.country);
                        }
                    }
                }
            } else {             
                if (register.first_name == '' || register.last_name == '' || register.date_birth == '' || register.phone == '' || register.country == '' || register.email == '' || register.star_wars == '') {
                    console.log('Data NULL');
                } else {
                    let currentDate = new Date();
                    let currentYear = parseInt(currentDate.getFullYear());
                    let currentMonth = parseInt(currentDate.getMonth()) + 1;
                    let currentDay = parseInt(currentDate.getDate());

                    let yearBirth = parseInt(String(register.date_birth).substring(0,4))
                    let monthBirth = parseInt(String(register.date_birth).substring(5,7))
                    let dayBirth = parseInt(String(register.date_birth).substring(8,10))

                    let years = currentYear - yearBirth;
                    
                    if (currentMonth < monthBirth) {
                        years--;
                    } else if (currentMonth === monthBirth ) {
                        if (currentDay < dayBirth) {
                            years--;
                        }
                    }

                    if (years < 18) {
                        alert('Wait a few years, only for adults');
                        console.log('Years:', years);
                    } else {
                        if (register.country == 'Spain') {
                            await updateRegister(route.params.id, register);
                            navigation.navigate('HomeScreen');
                        } else {
                            alert('Valid only for Spanish users');
                            console.log('Country:', register.country);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const [data,setData] = React.useState([]);

    useEffect(() => {

        if (route.params && route.params.id) {
            navigation.setOptions({ headerTitle: 'Updating a Register' });
            setEditing(true);
            
            (async () => {
                const register = await getRegister(route.params.id);
                setRegister({
                    first_name: register.first_name,
                    last_name: register.last_name,
                    date_birth: register.date_birth,
                    phone: register.phone,
                    country: register.country,
                    email: register.email,
                    star_wars: register.star_wars,
                })
            })();
        }

        async function fetchPeople() {
            let res = await fetch('https://swapi.dev/api/people/?format=json');
            let data = await res.json();
            setPeople(data.results);
        }
        fetchPeople();

    }, []);

    console.log("DATA", people);
    console.log("STAR", register.star_wars);

    return (
        <>
            <Layout>

                <SelectList 
                    placeholder='Select a Star Wars Character'
                    style={{color: "#ffffff"}}
                    setSelected={setSelected} 
                    value={register.star_wars} 
                    data={people.map((people, i) => {
                        return (
                            <Text
                                style={{color: "#ffffff"}}
                                key={i}>
                                    {people.name}
                            </Text>
                        )
                    })}
                    onSelect={(text) => handleChange('star_wars', selected)} 
                />
                {!register.star_wars && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>}
                
                <TextInput 
                    style={styles.input}
                    placeholder='Write a first name (Juan)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('first_name', text)}
                    value={register.first_name}
                />
                {!register.first_name && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>}
                <TextInput 
                    style={styles.input}
                    placeholder='Write a last name (Perez)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('last_name', text)}
                    value={register.last_name}
                />
                {!register.last_name && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>}
                <TextInput 
                    style={styles.input}
                    placeholder='Write a phone. (341112223344)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('phone', text)}
                    value={register.phone}
                />

                {
                !register.phone ? (
                    !register.phone && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>
                    ): (
                        (register.phone.length < 12) && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Enter 10 digits</Text>
                    )
                }
                <TextInput 
                    style={styles.input}
                    placeholder='Write a country (Spain)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('country', text)}
                    value={register.country}
                />
                {
                !register.country ? (
                    !register.country && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>
                    ): (
                        (register.country != "Spain") && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Only users from Spain are allowed</Text>
                    )
                }

                <TextInput 
                    style={styles.input}
                    placeholder='Write a email (juanperez@starwars.com)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('email', text)}
                    value={register.email}
                />
                {!register.email && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>}

                <TextInput 
                    style={styles.input}
                    type={'datetime'}
                    placeholder='Write a date of birth (2000-12-31)'
                    placeholderTextColor='#546574'
                    onChangeText={(text) => handleChange('date_birth', text)}
                    value={register.date_birth}
                />               
                {!register.date_birth && <Text style={{color: '#ff0000', padding: 5, marginBottom: 5 }}>* Obligatory field</Text>}

                {
                    !editing ? (
                        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}> 
                            <Text style={styles.buttonText}>Save Register</Text>
                        </TouchableOpacity>
                    ): (
                        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}> 
                            <Text style={styles.buttonText}>Update Register</Text>
                        </TouchableOpacity>
                    )
                }

            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '90%',
        marginBottom: 7,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 35,
        color: '#ffffff',
        textAlign: 'center',
        padding: 4,
        borderRadius: 5,
    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#10ac84',
        width: '90%'
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    buttonUpdate: {
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: "#e58e26",
        width: '90%',
    }
})

export default RegisterFormScreen;