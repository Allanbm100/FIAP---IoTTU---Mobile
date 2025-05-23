import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation, setIsLogged }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        const usuario = { nome, email, senha };

        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            setIsLogged(true);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar os dados.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                <Text style={styles.logoHighlight}>IOT</Text>TU
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaa"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
                <Text style={styles.link}>Já tem uma conta? Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    logoHighlight: {
        color: '#00ff99',
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#00ff99',
        width: '100%',
        padding: 14,
        marginBottom: 14,
        borderRadius: 12,
        fontSize: 16,
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
        marginVertical: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17,
    },
    link: {
        color: '#00ff99',
        marginTop: 10,
    },
});
