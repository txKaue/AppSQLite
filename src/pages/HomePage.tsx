import React, { useState } from "react";
import AlunoRepository, { Aluno } from "../repository/AlunoRepository";
import { Button, Text, View } from "react-native";

const repository = new AlunoRepository;

const HomePage: React.FC = () => {

    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const CriarAluno = async () => {
        const alunoId = await repository.create(
            {
                nome: "Nome de Teste",
                cpf: "99999999999",
                idade : Math.floor(Math.random() * (100 - 11)) + 10
            }
        );
        console.log("Aluno criado: " + alunoId);
    }

    const ListarAlunos = async () => {
        const alunos: Aluno[] = await repository.listarAlunos();
        setAlunos(alunos);
        console.log(alunos);
    }

    return(
        <View>
            <Button onPress={() => {CriarAluno}} title="Criar"/>
            <Button onPress={() => {ListarAlunos}} title="Listar"/>
            {
                alunos.map( aluno => (
                    <View key={`aluno-item-${aluno.id}`}>
                        <Text>`${aluno.id} - ${aluno.nome} - ${aluno.cpf}`</Text>
                    </View>

                ))
            }
        </View>
    );

}

export default HomePage;