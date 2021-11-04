# Digisecurity DevOps


- Create an Ubuntu VM (droplet) on Digital Ocean with 2GB RAM save the IP address
- Create or reuse a keypair: do-privatekey
- Ensure you have a gitlab digisecurity deploy key: digisecurity-gitlab-deploy
- Ensure you have the db-init.sql database initialization script

```bash
# Host - Save Droplet IP address
IPADDR=xxx.xxx.xxx.xxx
```

```bash
# Host - Copy gitlab deploykey, db-init.sql script
scp -i do-privatekey digisecurity-gitlab-deploy root@$IPADDR:.ssh
scp -i do-privatekey db-init.sql root@$IPADDR:
```

```bash
# Host - Log into server as root
ssh -i do-privatekey root@$IPADDR
```

```bash
# root@VM - Create ubuntu user and copy authorized keys, then exit
adduser --gecos '' ubuntu # Set and remember password
usermod -aG sudo ubuntu
rsync --archive --chown=ubuntu: ~/.ssh /home/ubuntu
cp ~/db-init.sql ~/.ssh/digisecurity-gitlab-deploy /home/ubuntu/
chown ubuntu: /home/ubuntu/db-init.sql /home/ubuntu/digisecurity-gitlab-deploy
exit
```


```bash
# Host - Log into server as ubuntu
ssh -i do-privatekey ubuntu@$IPADDR
```

```bash
# ubuntu@VM - Edit ~/.ssh/config
	Host gitlab.com
	  IdentityFile ~/.ssh/digisecurity-gitlab-deploy
	  StrictHostKeyChecking no
```
	
```bash
# ubuntu@VM - Clone devops repo
git clone git@gitlab.com:sri-ait-ie/ei/iv/digisecurity/digisecurity-devops.git
```

```bash
# ubuntu@VM - Copy files into repo
cp ~/db-init.sql digisecurity-devops/secret/db/
cp ~/.ssh/digisecurity-gitlab-deploy digisecurity-devops/secret/gitlab-deploy-key/gitlab-deploy-key
```

```bash
# ubuntu@VM - Run bootstrap code to install and start server
digisecurity-devops/bootstrap.sh
```

- Test server by accessing http://$IPADDR
- Configure floating IP to point to new server and verify http://www.cyberguardian.ie works

```bash
# Host - Log into server as ubuntu
ssh -i do-privatekey ubuntu@$IPADDR
```

```bash
# ubuntu@VM - Run SSL setup script to install certificates and enable https - change to your email address
digisecurity-devops/configssl.sh dns-admin@example.com cyberguardian.ie 
```

- Server is now fully deployed
- Test server by accessing https://www.cyberguardian.ie
