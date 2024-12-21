# Build
FROM node:22 AS build
WORKDIR /build
COPY . .
RUN yarn install

ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
RUN yarn run build

# Run
FROM nginx
COPY --from=build /build/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]