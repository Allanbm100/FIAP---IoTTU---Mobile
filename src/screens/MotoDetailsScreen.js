import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function MotoDetailsScreen({ route }) {
    const { moto } = route.params;
    const [obs, setObs] = useState('');
    const [obsSalva, setObsSalva] = useState('');
    const [status, setStatus] = useState(moto.status || 'Disponível');

    useEffect(() => {
        const carregarDados = async () => {
            try {
                // Carrega observação
                const dadosObs = await AsyncStorage.getItem(`obs-${moto.id}`);
                if (dadosObs) {
                    const { observacao } = JSON.parse(dadosObs);
                    setObsSalva(observacao);
                }

                // Carrega status
                const statusSalvo = await AsyncStorage.getItem(`status-${moto.id}`);
                if (statusSalvo) {
                    setStatus(statusSalvo);
                }
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar dados.');
            }
        };

        carregarDados();
    }, []);

    const salvarObservacao = async () => {
        const dados = {
            motoId: moto.id,
            observacao: obs,
            data: new Date().toISOString(),
        };

        try {
            await AsyncStorage.setItem(`obs-${moto.id}`, JSON.stringify(dados));
            setObsSalva(obs);
            setObs('');
            Alert.alert('Sucesso', 'Observação salva!');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar observação.');
        }
    };

    const alterarStatus = async (novoStatus) => {
        setStatus(novoStatus);
        try {
            await AsyncStorage.setItem(`status-${moto.id}`, novoStatus);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar o status.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Moto ID: {moto.id}</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Status atual:</Text>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => alterarStatus(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#00ff99"
                >
                    <Picker.Item label="Disponível" value="Disponível" />
                    <Picker.Item label="Em Manutenção" value="Em Manutenção" />
                    <Picker.Item label="Indisponível" value="Indisponível" />
                </Picker>

                <Text style={styles.label}>Zona: {moto.zona}</Text>
                <Text style={styles.label}>Distância: {moto.distancia} m</Text>
            </View>

            {obsSalva ? (
                <View style={styles.obsBox}>
                    <Text style={styles.obsLabel}>Última observação:</Text>
                    <Text style={styles.obsText}>{obsSalva}</Text>
                </View>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Digite uma nova observação..."
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
    picker: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        marginBottom: 12,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    pickerInline: {
        flex: 1,
        color: '#fff',
        backgroundColor: '#1e1e1e',
        marginLeft: 8,
    },
    obsBox: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderRadius: 12,
        borderColor: '#00ff99',
        borderWidth: 1,
        marginBottom: 16,
    },
    obsLabel: {
        color: '#00ff99',
        fontSize: 16,
        marginBottom: 6,
        fontWeight: 'bold',
    },
    obsText: {
        color: '#fff',
        fontSize: 15,
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
