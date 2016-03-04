#!/bin/bash
ssl_dir="/etc/nginx/ssl"
nginx="/etc/nginx/nginx.conf"
nginx_back="/etc/nginx/nginx.conf.back"
if [ ! -d $ssl_dir ]; then
	mkdir $ssl_dir
fi 

cp -a ./certs/. $ssl_dir/.

mv $nginx $nginx_back

cp ./nginx.conf $nginx

sudo service nginx restart 
