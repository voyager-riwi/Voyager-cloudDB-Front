# Etapa 1: construir la app
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm ci

# Copiar código fuente y archivo .env
COPY . .

# Build con las variables de entorno
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine

# Copiar archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de nginx para Vue Router (SPA) en puerto 3011
RUN echo 'server { \
    listen 3011; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header X-Content-Type-Options "nosniff" always; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3011
CMD ["nginx", "-g", "daemon off;"]

