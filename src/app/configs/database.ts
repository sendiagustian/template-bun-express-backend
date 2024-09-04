import { type Connection, createPool, type ResultSetHeader } from "mysql2/promise";

async function connectToDatabase(): Promise<Connection> {
    const connection = createPool({
        connectionLimit: 5,
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!
    });
    return connection;
}

// FOR SELECT QUERY DATABASE
export async function getQuery(arg: { query: string; type: "list" | "object"; params?: any[] }): Promise<any> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        const response = rows as any;
        if (arg.type === "list") {
            return response;
        } else {
            return response[0];
        }
    } catch (error) {
        console.error("Gagal menjalankan get query:", error);
        return new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// FOR INSERT, UPDATE, DELETE QUERY DATABASE
export async function exeQuery(arg: { query: string; params?: any[] }): Promise<ResultSetHeader | Error> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        return rows as ResultSetHeader;
    } catch (error) {
        console.error("Gagal menjalankan exequery:", error);
        return new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// export const checkQuerySleep = async (): Promise<void> => {
//     try {
//         const ids = await exeQuery(
//             "SELECT ID FROM INFORMATION_SCHEMA.PROCESSLIST WHERE USER = 'root' AND COMMAND = 'Sleep'"
//         );

//         if (ids instanceof Array && ids.length > 0) {
//             for (let i = 0; i < ids.length; i++) {
//                 const id = ids[i] as { ID: number };
//                 await exeQuery(`KILL ${id.ID}`);
//             }
//         } else {
//             // Tidak ada query yang sedang berjalan
//             logger.info("No query is running");
//         }
//     } catch (error) {
//         logger.error("Error checking query running status:", error);
//     }
// };
