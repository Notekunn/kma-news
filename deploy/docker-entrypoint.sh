#!/bin/sh
echo "Starting the application"
certbot certonly --webroot -d kma-news.tech --email info@kma-news.tech -w /var/www/_letsencrypt -n --agree-tos --force-renewal
certbot certonly --webroot -d api.kma-news.tech --email info@api.kma-news.tech -w /var/www/_letsencrypt -n --agree-tos --force-renewal
certbot certonly --webroot -d admin.kma-news.tech --email info@admin.kma-news.tech -w /var/www/_letsencrypt -n --agree-tos --force-renewal