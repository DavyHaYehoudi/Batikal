# BATIKAL

![Logo Batikal](https://user-images.githubusercontent.com/104354236/165095580-98acd76b-156f-4245-a28c-433b22dd3fd6.svg)
<br/>  

## .env

### BACKEND  
DB_URL = mongodb+srv://DDW:107@cluster0.11ly9.mongodb.net/?retryWrites=true&w=majority    
<br/>  
TOKEN_SECRET = 
<br/>
### FRONTEND
Plugin `env.cmd` pour switcher sur 2 environnements (local-prod) lors de `npm run build`  


## Launch

### BACKEND      
Chemin dans VSC :  
`cd webApp/cd backapp`      
En environnement local :   
<br/>
*Serveur Express :       
REACT_APP_API_URI = "http://localhost:5000"   
`nodemon server` / `node server`     
<br/>
*Emulator de firebase :  
REACT_APP_API_URI = "http://127.0.0.1:5001/batikal-dev/us-central1/api"    
`npm start` (=> `npm run serve`)   

### FRONTEND      
Chemin dans VSC :  
`cd webApp/cd webapp`   
<br/>
REACT  
`npm start`   
<hr/>

### HEBERGEMENT  
[KIWEEKOTE](https://batikal-dev.web.app/)
