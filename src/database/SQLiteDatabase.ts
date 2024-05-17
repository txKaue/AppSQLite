import * as SQLite from "expo-sqlite/legacy";

export const db = SQLite.openDatabase("database.sqlite", "1.0"); // Isso aqui cria o banco

export const executeTransation = (
    sql: string,
    values?: (string | number | null)[]
) => {
        return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
            db.transaction( (tx) => {
                tx.executeSql(
                    sql,
                    values,
                    (_, resultSet) => {
                        resolve(resultSet);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                )
            });
        });
    }