import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

import InputPersonalizado from '../components/InputPersonalizado';

function TelaCadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [errors, setErrors] = useState([]);

    // Função para lidar com o cadastro
    const efetuarCadastro = () => {
        // Lógica de cadastro aqui

        let erros = []; // Cria um array para armazenar erros
        
        // Valida os dados antes de enviar
        if (senha !== confirmarSenha) {
            erros.push('As senhas não coincidem.');
        }

        // Comprova se a senha tem exatamente 6 caracteres
        if (senha.length !== 6) {
            erros.push('A senha deve ter exatamente 6 caracteres.');
        }

        if (nome.trim() === '' || email.trim() === '') {
            erros.push('Nome e email não podem estar vazios.');
        }

        setErrors(erros);

        if (erros.length > 0) {
            return; // Não prossegue se houver erros
        }

        try {
            const resposta = axios.post("http://10.0.8.58:3000/api/usuarios",
                {
                    nome: nome,
                    email: email,
                    senha: senha
                }
            );

            console.log('Cadastro realizado com sucesso:', resposta.data);

        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    }

    return (
        <View>
            <Text>Tela de Cadastro</Text>

            {errors.length > 0 && (
                <View>
                    {errors.map((erro, index) => (
                        <Text key={index} style={{ color: 'red' }}>{erro}</Text>
                    ))}
                </View>
            )}

            <InputPersonalizado 
                legenda="Qual seu nome?"
                textoTemporario="Ex: Lucas Santos"
                valor={nome}
                aoAlterarValor={setNome}
            />

            <InputPersonalizado 
                legenda="Qual seu melhor email?"
                textoTemporario="Ex: email@email.com"
                valor={email}
                aoAlterarValor={setEmail}
            />

            <InputPersonalizado 
                legenda="Crie uma senha"
                textoTemporario="No mínimo 6 caracteres"
                valor={senha}
                aoAlterarValor={setSenha}
                ehSenha={true}
            />

            <InputPersonalizado 
                legenda="Confirme sua senha"
                textoTemporario="Digite sua senha novamente"
                valor={confirmarSenha}
                aoAlterarValor={setConfirmarSenha}
                ehSenha={true}
            />

            <Button 
                title="Cadastrar" 
                onPress={() => efetuarCadastro()} 
            />

            <Button 
                title="Cancelar" 
                onPress={() => navigation.navigate('Login')} 
            />
        </View>
    );
}

export default TelaCadastro;