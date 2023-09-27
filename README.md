## Setting Up

### This project is tested on node v16.20.2 with npm 8.19.4

1. **Install Dependencies:**

   Install the project's dependencies, including both runtime and development dependencies. Run the following command:

   ```bash
   npm install
   ```

   This command will install all the required Node.js packages specified in the project's `package.json` file.

2. **Create a PostgreSQL Database:**

   Ensure you have PostgreSQL installed and running on your machine. You can download and install it from the official PostgreSQL website: [PostgreSQL Downloads](https://www.postgresql.org/download/).

   Create taskdb in the local postgres instance 

   ```bash
   psql postgres
   createdb taskdb
   ```

3. **Set Environment Variables:**
   Either set the env values in the terminal or update the default values present in the config.ts file

   ```bash
   export DB_HOST=localhost
   export DB_USER=postgres
   export DB_PASSWORD=''
   export DB_NAME=taskdb
   ```

4. **Run the Project:**

   ```bash
   npm run dev
   ```

   This command will start the application, which should connect to the PostgreSQL database using the environment variables you configured or using the default values present in the config.ts file

5. **Access Your Application:**

   Application should be up on localhost:3000


### Request Response Samples

1. Create Task 

```bash
curl --location 'http://localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "8 First Task",
    "description" : "This is my first task"
}'
```

```json
{
    "id": 10,
    "title": "8 First Task",
    "description": "This is my first task",
    "status": "TODO",
    "createdAt": "2023-09-27T03:15:21.123Z"
}
```

2. Update Task

```bash
curl --location --request PUT 'http://localhost:3000/tasks/10' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "updated title",
    "status" : "DONE"
}
'
```

```json
{
    "id": 10,
    "title": "updated title",
    "description": "This is my first task",
    "status": "DONE",
    "createdAt": "2023-09-27T03:15:21.123Z"
}
```

3. List Task 

```bash
curl --location 'http://localhost:3000/tasks?page=3&pageSize=2'
```

```json
{
    "prev": "http://localhost:3000/tasks?page=2&pageSize=2",
    "next": "http://localhost:3000/tasks?page=4&pageSize=2",
    "data": [
        {
            "id": 7,
            "title": "6 First Task",
            "description": "This is my first task",
            "status": "TODO",
            "createdAt": "2023-09-25T18:42:34.229Z"
        },
        {
            "id": 3,
            "title": "2 First Task",
            "description": "This is my first task",
            "status": "TODO",
            "createdAt": "2023-07-25T18:42:26.633Z"
        }
    ]
}
```

4. Show Metrics

```bash
curl --location 'http://localhost:3000/metrics'
```

```json
{
    "status": {
        "ongoing_tasks": 2,
        "open_tasks": 7,
        "completed_tasks": 1
    },
    "timeline": [
        {
            "date": "August 2023",
            "metrics": {
                "ongoing_tasks": 1
            }
        },
        {
            "date": "July 2023",
            "metrics": {
                "open_tasks": 1
            }
        },
        {
            "date": "September 2023",
            "metrics": {
                "ongoing_tasks": 1,
                "open_tasks": 6,
                "completed_tasks": 1
            }
        }
    ]
}
```