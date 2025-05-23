import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const motos = [
    { id: 'moto-001', status: 'Ligada', zona: 'A2', distancia: 1.98 },
    { id: 'moto-002', status: 'Manutenção', zona: 'B1', distancia: 12.5 },
    { id: 'moto-003', status: 'Desligada', zona: 'C1', distancia: 4.2 },
];

export default function FleetScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={motos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => navigation.navigate('MotoDetails', { moto: item })}
                    >
                        <Text style={styles.listTitle}>{item.id}</Text>
                        <Text style={styles.listDetail}>Status: {item.status}</Text>
                        <Text style={styles.listDetail}>Zona: {item.zona}</Text>
                        <Text style={styles.listDetail}>Distância: {item.distancia} m</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    listContainer: {
        padding: 16,
    },
    listItem: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#00ff99',

        shadowColor: '#00ff99',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    listTitle: {
        color: '#00ff99',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listDetail: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 4,
    },
});
