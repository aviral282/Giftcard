sudo apt-get update
sudo apt-get -y install software-properties-common dirmngr apt-transport-https
sudo apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
sudo add-apt-repository 'deb [arch=amd64,arm64,ppc64el] https://ftp.heanet.ie/mirrors/mariadb/repo/10.3/ubuntu bionic main'

sudo apt-get update
sudo sh -c 'DEBIAN_FRONTEND=noninteractive apt-get -y install mariadb-server'

sudo mysql < $SCRIPTPATH/db/db-auth.sql
sudo mysql < $SCRIPTPATH/db/db-create.sql
sudo mysql digisecurity < $SCRIPTPATH/secret/db/db-init.sql

cp $SCRIPTPATH/db/my.cnf ~/.my.cnf
