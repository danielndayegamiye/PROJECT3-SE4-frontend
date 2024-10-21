Project Setup

Clone the project into your XAMPP/xamppfiles/htdocs directory.

    `git clone https://github.com/IReveles/PROJECT3-SE4-frontend.git`

Install the project.
   
    `npm install`

 Make sure Apache is running.
    We recommend using XAMPP to serve this project.
    In XAMPP, make sure that Apache is running.

  Add a local .env file and make sure the client ID and client secret are the values you have registered with Google.

        VITE_CLIENT_ID = 'your-google-client-id'
        VITE_CLIENT_URL = 'http://localhost:8081'
        VITE_API_URL = 'https://accounts.google.com/gsi/client'

Compile and run the project locally.

    npm run build
