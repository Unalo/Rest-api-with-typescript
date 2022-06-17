// database connections
import mongoose from 'mongoose'
import config from 'config';

async function connect() {
    try {
        const dbUri = config.get<string>('dbUri')
        await mongoose.connect(dbUri)
        console.log("App connected to DB");
    } catch (error) {
        console.error("did not connect to DB");
        process.exit(1);
    }
}

export default connect