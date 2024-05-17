// Isso aqui vai ser semelhando ao Models.py de uma aplicação django

import { executeTransation } from "../database/SQLiteDatabase";
import { StringBuilder } from "../utils/StringBuilderUtils";

export type Aluno = {
    id?: number,
    nome: string,
    cpf: string,
    idade: number
}

export default class AlunoRepository {
    private tableName: string = "aluno";

    constructor() {
        this.up();
    }

    private async up(): Promise<void> { // Agora vamos criar a nossa entidade (Comando de DB)
        const sb: StringBuilder = new StringBuilder(); // Instanciando a classe
        sb.append(`CREATE TABLE IF NOT EXISTS ${this.tableName} (`);
        sb.append("id INTEGER PRIMARY KEY AUTOINCREMENT, ");
        sb.append("nome TEXT NOT NULL, ");
        sb.append("cpf TEXT NOT NULL, ");
        sb.append("idade INTEGER NOT NULL );");
        const sql: string = sb.toString();
        await executeTransation(sql);
    }

    private async down(): Promise<void> {
        await executeTransation(`DROP DATABASE ${this.tableName}`);
    }

    public async create(aluno: Aluno): Promise<number | undefined> {
        const sql: string = `INSERT INTO ${this.tableName} (nome, cpf, idade)  VALUES (?, ?, ?)`;
        const args = [
            aluno.nome,
            aluno.cpf,
            aluno.idade
        ];
        const resultado = await executeTransation(sql, args);
        return resultado.insertId;
    }

    public async listarAlunos(): Promise<Aluno[]> {

        const alunos: Aluno[] = [];

        const sql: string = `SELECT * FROM ${this.tableName}`;
        const consulta = await executeTransation(sql);

        for (let i = 0; i < consulta.rows.length; i++) {
            const aluno = consulta.rows.item(i);
            alunos.push({
                id: aluno.id,
                nome: aluno.nome,
                cpf: aluno.cpf,
                idade: aluno.idade
            })
        }

        return alunos;
    }

    
}