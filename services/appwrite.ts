import {Client, ID, Query, TablesDB, Account} from 'react-native-appwrite'
import {User} from "@supabase/auth-js";
import {Session} from "node:sqlite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const tableDB = new TablesDB(client)

const account = new Account(client)

export const updateSearchCount = async (movie: MovieToTrending) => {
    try {
        const result = await tableDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal('movie_id', movie.movie_id)]
        })

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0]

            await tableDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1
                }
            })
        } else {
            await tableDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    movie_id: movie.movie_id,
                    count: 1,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            })
        }


    } catch (e) {
        console.error(e)
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await tableDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.limit(5),
                Query.orderDesc('count')
            ]
        })

        return result.rows as unknown as TrendingMovie[]

    } catch (e) {
        console.error(e)
        return undefined
    }
}

export const isLoggedIn = async() : Promise<boolean> => {
    try{
        await account.get()
        return true
    } catch (e: any) {
        if (e.code === 401 ){
            return false
        } else {
            console.error(e)
            return false
        }
    }
}

const getCurrentSession = async (): Promise<boolean> => {
    try{
        await account.getSession({
            sessionId: 'current'
        })
        return true

    } catch {
        return false
    }
}

export const login = async(email: string, password: string) : Promise<void> => {
    try{
        const hasSession = await getCurrentSession()
        if (hasSession) {
            await account.deleteSession({
                sessionId: 'current',
            })
        }
        await account.createEmailPasswordSession({
            email: email,
            password: password,
        })
    } catch (e: any) {
        console.error(e.message)
        throw e
    }
}
