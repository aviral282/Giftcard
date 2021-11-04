curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install v14.17.3
npm install -g pm2

APPS_DIR=$(mkdir $HOME/apps && cd $HOME/apps && pwd)
mkdir -p $APPS_DIR/backend $APPS_DIR/frontend
git clone git@gitlab.com:sri-ait-ie/ei/iv/digisecurity/digisecurityapi.git $APPS_DIR/backend
git clone git@gitlab.com:sri-ait-ie/ei/iv/digisecurity/digisecurity-frontend.git $APPS_DIR/frontend

HOME_BACKEND=$APPS_DIR/backend/code/digi
HOME_FRONTEND=$APPS_DIR/frontend/digiui

# Add server port and Stripe params
cp $SCRIPTPATH/env/env $HOME_BACKEND/.env

echo '### npm install FRONTEND'

cd $HOME_FRONTEND

npm install

echo '### npm install FRONTEND DONE!'
echo '### npm install BACKEND'

cd $HOME_BACKEND

npm install

echo '### npm install BACKEND DONE!'

cd $HOME_FRONTEND
npm run buildprod
# Copy to BACKEND if combining deployments

cd $HOME_BACKEND
npm run prebuild && npm run build
pm2 start dist/main.js

# Copy to nginx site if required
sudo rm /var/www/html/index.nginx-debian.html
sudo rm -rf /var/www/html/*
sudo rsync -a $HOME_FRONTEND/dist/digiui/ /var/www/html/
