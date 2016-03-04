# social auth mock


`git clone https://github.com/zamd/somok.git`

`cd somok`

`sudo ./setup/setup.sh`

Make sure `nginx.conf` is copied to `/etc/nginx` folder and certs are copied to `/etc/nginx/ssl` folder

`nave use stable`

`node .` 

To see debugging output use following:

`DEBUG=somok node .`

The mock facebook authorization server should be running and fronted by nginx 

On all appliance nodes add the root certificate in `trusted roots`

Edit the `/etc/hosts` and map `facebook.com/graph.facebook.com` to this mock authorization server. 

Set up subscription in `loadImpact.com`. 

Copy `/loadimpact/loadscript.lua` to a loadimpact scenario to run the load test
