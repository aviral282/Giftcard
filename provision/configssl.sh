if [ "$#" -ne 2 ]; then
    echo "Usage:   $0 <email> <domain>"
    echo "Example: $0 dns-admin@example.com example.com"
    exit 1
fi

CERTBOT_EMAIL=$1
CERTBOT_DOMAIN=$2
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot -n --agree-tos --nginx --email $CERTBOT_EMAIL -d $CERTBOT_DOMAIN -d www.$CERTBOT_DOMAIN
