# Next.js Teslo-Shop
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d, significa __datached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

# MongoDB URL Local:
```
MONGO_URL:mongodb://localhost:27017/teslodb
```

# Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```

## Llenar la base de datos con instalación de pruebas
Llamara:
```
http://localhost:3000/api/seed
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
