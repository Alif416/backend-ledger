const app = require("./src/app");
const database = require("./src/config/database");
const config = require("./src/config/env");

class Server {
    async start() {
        await database.connect();

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }
}

new Server().start();
