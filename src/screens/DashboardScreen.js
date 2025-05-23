import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                <Text style={styles.logoHighlight}>IOT</Text>TU
            </Text>

            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Ionicons name="person-circle-outline" size={42} color="#000" />
                    <Text style={styles.cardText}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Fleet')}
                >
                    <Ionicons name="bicycle-outline" size={42} color="#000" />
                    <Text style={styles.cardText}>Motos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        justifyContent: 'center',
    },
    logo: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 50,
    },
    logoHighlight: {
        color: '#00ff99',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: '#00ff99',
        padding: 24,
        borderRadius: 16,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#00ff99',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    cardText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 12,
        textAlign: 'center',
    },
});
