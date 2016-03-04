http.set_option("auto_cookie_handling", true)

-- auth0
util.dns_remap("satpara.showtps.com:443", "137.135.46.81")
--mock facebook
util.dns_remap("facebook.com:443", "104.42.127.98")
util.dns_remap("graph.facebook.com:443", "104.42.127.98")

local url = "https://satpara.showtps.com/authorize"..
			"?client_id=tPKsiils4Lk5osvIe6Xbi78CFaAe5cbH"..
			"&response_type=code"..
			"&connection=facebook"..
			"&redirect_uri=http://zamd.southeastasia.cloudapp.azure.com"..
			"&prompt=consent"

-- Custom auto-redirect: as dns_remap doesn't work auto-redirect & `www` base domain 
repeat
    local res = http.get({url=url, auto_redirect=false})
    if res.status_code==302 then
        url = res.headers['location'][1]
        --  remove 'www' prefix
        url = string.gsub(url, "://www.", "://")
    end
until(res.status_code~=302)
