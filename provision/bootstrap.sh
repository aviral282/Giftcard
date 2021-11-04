export SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cp $SCRIPTPATH/secret/gitlab-deploy-key/gitlab-deploy-key ~/.ssh/
chmod 600 ~/.ssh/gitlab-deploy-key

cp $SCRIPTPATH/ssh/config ~/.ssh/
chmod 600 ~/.ssh/config

cp $SCRIPTPATH/provision/*.sh ~
chmod +x ~/*.sh

~/provision-db.sh | tee $SCRIPTPATH/logs/provision-db.log
~/provision-nginx.sh | tee $SCRIPTPATH/logs/provision-nginx.log
~/provision.sh | tee $SCRIPTPATH/logs/provision.log
