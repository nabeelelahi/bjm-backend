# nginx.Dockerfile - For NGINX Reverse Proxy
FROM nginx:alpine

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
