import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import RegisterItem from './RegisterItem';
import { deleteRegister, getRegisters } from '../api';

const RegisterList = () => {
    const [registers, setRegisters] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    const isFocused = useIsFocused()

    const loadRegisters = async () => {
        const data = await getRegisters();
        setRegisters(data);
    }

    useEffect(() => {
        loadRegisters();
    }, [isFocused])

    const handleDelete = async (id) => {
        await deleteRegister(id)
        await loadRegisters()
    }
    
    const renderItem = ({ item }) => {
        return <RegisterItem register={item} handleDelete={handleDelete} />;
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await loadRegisters(); 
        setRefreshing(false);
    }) 

    return (
        <FlatList
            style={{ width: '100%' }}
            data={registers}
            keyExtractor={(item) => item.id + ''}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                colors={["#78e08f"]} 
                    onRefresh={onRefresh}
                    progressBackgroundColor='#0a3d62'
                />
            }
        />
    );
};

export default RegisterList;