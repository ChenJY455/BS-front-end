FROM nginx
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# docker run -d -p 8080:80 purweb-front:1.0