# Etapa 1: Construcción del código TypeScript
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Etapa 2: Configuración de la imagen final
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar las dependencias instaladas y el código compilado desde la etapa de construcción
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Exponer el puerto en el que correrá el servicio
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "dist/index.js"]
