import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MotoDetailsScreen({ route }) {
    const { moto } = route.params;
    const [obs, setObs] = useState('');

    const salvarObservacao = async () => {
        const dados = {
            motoId: moto.id,
            observacao: obs,
            data: new Date().toISOString(),
        };

        try {
            await AsyncStorage.setItem(`obs-${moto.id}`, JSON.stringify(dados));
            Alert.alert('Sucesso', 'Observação salva!');
            setObs('');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar observação.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{moto.id}</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Status: {moto.status}</Text>
                <Text style={styles.label}>Zona: {moto.zona}</Text>
                <Text style={styles.label}>Distância: {moto.distancia} m</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Digite uma observação..."
                placeholderTextColor="#aaa"
                value={obs}
                onChangeText={setObs}
            />

            <TouchableOpacity style={styles.button} onPress={salvarObservacao}>
                <Text style={styles.buttonText}>Salvar Observação</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        color: '#00ff99',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#00ff99',

        shadowColor: '#00ff99',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#00ff99',
        width: '100%',
        padding: 14,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#00ff99',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',

        shadowColor: '#00ff99',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
