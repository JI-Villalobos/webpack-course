const fs = require('fs')

//la variable de entorno se asigna en el despliegue
fs.writeFileSync('./.env', `API=${process.env.API}\n`)