## Setting Up

### This project is tested on node v16.20.2 with npm 8.19.4

1. **Install Dependencies:**

   Install the project's dependencies, including both runtime and development dependencies. Run the following command:

   ```bash
   npm install
   ```

   This command will install all the required Node.js packages specified in the project's `package.json` file.

4. **Create a PostgreSQL Database:**

   Ensure you have PostgreSQL installed and running on your machine. You can download and install it from the official PostgreSQL website: [PostgreSQL Downloads](https://www.postgresql.org/download/).

   Create taskdb in the local postgres instance 

   ```bash
   psql postgres
   createdb taskdb
   ```

5. **Set Environment Variables:**
   Either set the env values in the terminal or update the default values present in the config.ts file

   ```bash
   export DB_HOST=localhost
   export DB_USER=postgres
   export DB_PASSWORD=''
   export DB_NAME=taskdb
   ```

7. **Run the Project:**

   ```bash
   npm run dev
   ```

   This command will start the application, which should connect to the PostgreSQL database using the environment variables you configured or using the default values present in the config.ts file

8. **Access Your Application:**

   Application should be up on localhost:3000