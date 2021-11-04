sudo apt-get update
sudo apt-get install -y nginx

# Append or replace site config
sudo cp $SCRIPTPATH/nginx/default /etc/nginx/sites-available/
sudo chown root: /etc/nginx/sites-available/default
sudo chmod 644 /etc/nginx/sites-available/default

# Restart nginx to read site config
sudo systemctl restart nginx
