FROM node:20 as build-stage
WORKDIR /app
COPY . .
RUN npm ci
# Set default args. Override them at build time if needed
ARG FRONTEND_PORT="80"
ARG NODE_ENV="api"  # 'api' is the default production url
ARG RESERVATION_API="http://localhost:8080/${NODE_ENV}"
# Set environment variables needed for the build
ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV VITE_ENV=${NODE_ENV}
ENV VITE_RESERVATION_API=${RESERVATION_API}
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE ${FRONTEND_PORT}
CMD ["nginx", "-g", "daemon off;"] 
