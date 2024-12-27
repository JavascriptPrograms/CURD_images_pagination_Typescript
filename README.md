# CURD_images_pagination_Typescript
Use Express or Typescripts with EJS template Engine with node js or Mysql Database . Use bootstrap 5 pagination for maintaine database data.
# To use Express.js with TypeScript, you'll need to set up your Node.js project to work with TypeScript. Here's a step-by-step guide to help you get started:
# 1. Initialize the Project
First, create a new directory for your project and initialize it:
mkdir express-typescript-app
cd express-typescript-app
npm init 
# 2. Install Dependencies
Install Express.js and its types for TypeScript:
npm install express
npm install --save-dev typescript @types/node @types/express 
# 3. Set Up TypeScript Configuration
Create a tsconfig.json file to configure TypeScript:
npx tsc --init
Update your tsconfig.json file to include these settings:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

# 4. Create the Project Structure
Create the necessary directories and files:
mkdir src
touch src/app.ts
# 5. Write the Express Application Code
In the src/app.ts file, write a simple Express application:
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
# 6. Compile and Run the Application
First, compile the TypeScript code:
npx tsc
This will create a dist folder with the compiled JavaScript files. Now, run the compiled JavaScript code:
Copy code
node dist/app.js
# 7. Use ts-node for Development (Optional)
To avoid manually compiling TypeScript each time, you can use ts-node for development:
npm install --save-dev ts-node @types/multer
npm install multer mysql2 
Then, modify your package.json scripts:

{
  "scripts": {
    "start": "node dist/app.js",
    "dev": "ts-node src/app.ts"
  }
}
-::or::- 
"scripts": {
    "start": "nodemon  dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts -e js,ejs,css"
  },
Now you can run your application directly in TypeScript with:
npm run dev
# 8. Additional Tools (Optional)
Nodemon: Automatically restart the server on changes.
ESLint: For linting TypeScript code.
To install Nodemon and set it up:
npm install --save-dev nodemon
Update package.json to include a development script with Nodemon:

{
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon --exec ts-node src/app.ts"
  }
}
# 9. Input Field transfor to the server with add EJS template engine
install the package for node js
npm install body-parser ejs
add the middleware for body-parser configure :

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

add the middleware for EJS Cnfig:

app.set('view engine','ejs');

# 10. flash message with session of the express js 
npm install express-flash express-session
npm install --save--dev @types/express-flash @types/express-session
config the middleware in project:
app.use(flash())

app.use(session({
    cookie:{maxAge:2000},
    secret:'secret',
    resave:false,
    saveUninitialized: true,
}));

Now, use npm run dev to start the development server with live reload.

That's it!
You've now set up an Express.js project using TypeScript!

# Search student Page -1
![image alt](https://github.com/JavascriptPrograms/CURD_images_pagination_Typescript/blob/d1de33630d3c5445f89434a2f2d572bf9fe70d51/images/Screenshot%20(6).png)
# Get the Student Details Page-2
![image alt](https://github.com/JavascriptPrograms/CURD_images_pagination_Typescript/blob/4932e0c2ede645f8463cd176a3c2b8ebaa3c58a4/images/Screenshot%20(11).png)
# Add Student Page - 3
![image alt](https://github.com/JavascriptPrograms/CURD_images_pagination_Typescript/blob/4932e0c2ede645f8463cd176a3c2b8ebaa3c58a4/images/Screenshot%20(7).png)
# Show Student Page - 4
![image alt](https://github.com/JavascriptPrograms/CURD_images_pagination_Typescript/blob/4932e0c2ede645f8463cd176a3c2b8ebaa3c58a4/images/Screenshot%20(8).png)
# Edit Student Page - 5
![image alt](https://github.com/JavascriptPrograms/CURD_images_pagination_Typescript/blob/4932e0c2ede645f8463cd176a3c2b8ebaa3c58a4/images/Screenshot%20(9).png)
