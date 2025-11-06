import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

import InputPersonalizado from '../components/InputPersonalizado';

function TelaLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View>
            <Text>Tela de Login</Text>

            <InputPersonalizado 
                legenda="Email"
                textoTemporario="Digite seu email"
                valor={email}
                aoAlterarValor={setEmail}
            />

            <InputPersonalizado 
                legenda="Senha"
                textoTemporario="Digite sua senha"
                valor={senha}
                aoAlterarValor={setSenha}
                ehSenha={true}
            />

            <Button 
                title="Ir para Cadastro" 
                onPress={() => navigation.navigate('Cadastro')} 
            />

            <Button 
                title="Ir para Descobrir" 
                onPress={() => navigation.navigate('Descobrir')} 
            />
        </View>
    );
}

export default TelaLogin;