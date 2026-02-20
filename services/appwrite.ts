import {Client, Databases, ID, Query, TablesDB} from 'react-native-appwrite'


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const tableDB = new TablesDB(client)

export const updateSearchCount = async ( movie: MovieToTrending) => {
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