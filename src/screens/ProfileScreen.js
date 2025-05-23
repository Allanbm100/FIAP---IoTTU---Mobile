import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [editandoNome, setEditandoNome] = useState(false);
    const [editandoEmail, setEditandoEmail] = useState(false);
    const [editandoSenha, setEditandoSenha] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const dados = await AsyncStorage.getItem('usuario');
                if (dados) {
                    const user = JSON.parse(dados);
                    setNome(user.nome);
                    setEmail(user.email);
                    setSenha(user.senha);
                }
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar dados do usuário.');
            }
        };
        carregarDados();
    }, []);

    const salvarDados = async () => {
        const user = { nome, email, senha };
        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(user));
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            setEditandoNome(false);
            setEditandoEmail(false);
            setEditandoSenha(false);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar dados.');
        }
    };

    const sairConta = () => {
        Alert.alert('Sair da conta?', 'Você será redirecionado para o login.', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Sair',
                onPress: async () => {
                    await AsyncStorage.removeItem('usuario');
                    setIsLogged(false);
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <Text style={styles.label}>Nome:</Text>
                {!editandoNome ? (
                    <>
                        <Text style={styles.text}>{nome}</Text>
                        <TouchableOpacity onPress={() => setEditandoNome(true)}>
                            <Text style={styles.edit}>Editar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TouchableOpacity onPress={salvarDados}>
                            <Text style={styles.save}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                {!editandoEmail ? (
                    <>
                        <Text style={styles.text}>{email}</Text>
                        <TouchableOpacity onPress={() => setEditandoEmail(true)}>
                            <Text style={styles.edit}>Editar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TouchableOpacity onPress={salvarDados}>
                            <Text style={styles.save}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Senha:</Text>
                {!editandoSenha ? (
                    <>
                        <Text style={styles.text}>•••••••</Text>
                        <TouchableOpacity onPress={() => setEditandoSenha(true)}>
                            <Text style={styles.edit}>Editar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={senha}
                            secureTextEntry
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity onPress={salvarDados}>
                            <Text style={styles.save}>Salvar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={sairConta}>
                <Text style={styles.logoutText}>Sair da Conta</Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00ff99',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        flex: 1,
    },
    edit: {
        color: '#00ff99',
        marginLeft: 8,
    },
    save: {
        color: '#00ff99',
        marginLeft: 8,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#00ff99',
        borderRadius: 12,
        padding: 8,
        flex: 1,
        fontSize: 16,
    },
    row: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 40,

        shadowColor: '#ff4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
