import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text,
    Button,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from 'react-native';

import axios from 'axios';

const { width: larguraTela } = Dimensions.get('window');

function TelaDescobrir() {
    const [usuarios, setUsuarios] = useState([]);
    const flatListRef = useRef(null);
    const [index, setIndex] = useState(0);

    // Vai executar quando o componente for montado (a tela for aberta)
    useEffect(() => {
        buscaUsuarios();
    }, []);

    // Busca os usuários cadastrados
    const buscaUsuarios = async () => {
        try {
            // Conectar no servidor para buscar os usuários
            const resposta = await axios.get("http://10.0.8.58:3000/api/usuarios");

            // Atualiza o estado com os usuários recebidos
            setUsuarios(resposta.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }

    // Função para navegar entre os cartões
    const irPara = (novoIndex) => () => {
        if (novoIndex >= 0 && novoIndex < usuarios.length) {
            // Muda o índice e rola a FlatList para o cartão correspondente
            flatListRef.current.scrollToIndex({ index: novoIndex, animated: true });
            
            // Atualiza o estado do índice atual
            setIndex(novoIndex);
        }
    }

    // Item que vai ser renderizado na FlatList (cartão de usuário)
    const cartaoUsuario = ({ item }) => {
        return(
            <View style={[styles.card, { width: larguraTela * 0.9 }]}>
                <Text style={styles.titulo}>{item.nome}</Text>
                <Text>{item.email}</Text>
            </View>
        )    
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={usuarios}
                ref={flatListRef}
                keyExtractor={(item) => item.id.toString()}
                renderItem={cartaoUsuario}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const novoIndex = Math.round(event.nativeEvent.contentOffset.x / larguraTela);
                    setIndex(novoIndex);
                }}
            />

            <View style={styles.botoes}>
                <Button 
                    title="🔙 Voltar" 
                    disabled={index === 0} 
                    onPress={irPara(index - 1)} 
                />

                <Text style={styles.indicador}>
                    {index + 1} / {usuarios.length}
                </Text>

                <Button 
                    title="Avançar 🔜" 
                    disabled={index === usuarios.length - 1} 
                    onPress={irPara(index + 1)} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f0f0f0' 
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: larguraTela * 0.05,
        elevation: 3,
    },
    titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    botoes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    indicador: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TelaDescobrir;