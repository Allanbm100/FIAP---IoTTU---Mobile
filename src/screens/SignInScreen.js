import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation, setIsLogged }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem('usuario');
            if (userData) {
                const user = JSON.parse(userData);
                if (email === user.email && senha === user.senha) {
                    setIsLogged(true);
                } else {
                    Alert.alert('Erro', 'Email ou senha incorretos.');
                }
            } else {
                Alert.alert('Erro', 'Nenhuma conta cadastrada.');
            }
        } catch (error) {
            Alert.alert('Erro ao fazer login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                <Text style={styles.logoHighlight}>IOT</Text>TU
            </Text>

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
                secureTextEntry
                placeholderTextColor="#aaa"
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                <Text style={styles.link}>Criar conta</Text>
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
