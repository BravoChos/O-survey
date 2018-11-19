#!/bin/bash
# make sure you have execute permissions:
# cd /path/to/project
# chmod +x ./sendgrid_webhook.sh
# to run, type ./sendgrid_webhook.sh in the terminal


#forget about above methon use serveo
#ssh -R yourRandomSubdomain:80:localhost:5000 serveo.net


function localtunnel {
lt -s alskdjfhg --port 5000
}

until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
