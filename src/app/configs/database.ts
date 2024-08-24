import { Connection, createPool, ResultSetHeader } from "mysql2/promise";
import { logger } from "../utils/logging";

async function connectToDatabase(): Promise<Connection> {
    try {
        const connection = createPool({
            connectionLimit: 5,
            host: process.env.DB_HOST!,
            port: parseInt(process.env.DB_PORT!),
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME!
        });
        return connection;
    } catch (error) {
        console.error("Gagal terhubung ke database:", error);
        throw error;
    }
}

// FOR SELECT QUERY DATABASE
export async function getQuery(query: string, type: "list" | "object", params?: any[]): Promise<any> {
    let connection;
    const valueParams = params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(query, valueParams);
        const response = rows as any;
        if (type === "list") {
            return response;
        } else {
            return response[0];
        }
    } catch (error) {
        console.error("Gagal menjalankan query:", error);
        throw new Error(`${error}`.replace("db_tong_nyampah", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// FOR INSERT, UPDATE, DELETE QUERY DATABASE
export async function exeQuery(query: string, params?: any[]): Promise<ResultSetHeader> {
    let connection;
    const valueParams = params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(query, valueParams);
        return rows as ResultSetHeader;
    } catch (error) {
        console.error("Gagal menjalankan query:", error);
        throw new Error(`${error}`.replace("api_template", "database"));
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
