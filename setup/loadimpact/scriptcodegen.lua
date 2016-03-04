-- This scripts generates a fake authorization code and by-passes calling mock facebook.
-- This is not required any more as dns_remap can enable full end to end scenario

local charset = {}

for i = 48,  57 do table.insert(charset, string.char(i)) end
for i = 65,  90 do table.insert(charset, string.char(i)) end
for i = 97, 122 do table.insert(charset, string.char(i)) end

function genCode(length)
  math.randomseed(os.time())
  if length > 0 then
    return genCode(length - 1) .. charset[math.random(1, #charset)]
  else
    return ""
  end
end

function getParam(url,p) 
    local param = p..'='
    local len = string.len(param)
    local index = string.find(url,param) 
    local sub = string.sub(url,index+len)
    index = string.find(sub, '&') 
    local v = string.sub(sub,0,index-1) 
    return v 
end

function formatUrl(baseUrl, qs)
    return baseUrl.."?"..url.build_query_string(qs)
end


http.set_option("auto_cookie_handling", true)
util.dns_remap("satpara.showtps.com:443", "137.135.46.81")

local baseUrl = "https://satpara.showtps.com"
local qs = 	{}
qs["client_id"] = "tPKsiils4Lk5osvIe6Xbi78CFaAe5cbH"
qs["response_type"] = "code"
qs["prompt"] = "consent"
qs["redirect_uri"] = "http://zamd.southeastasia.cloudapp.azure.com"
qs["connection"] = "facebook"


local url = formatUrl(baseUrl.."/authorize", qs)
local res = http.get({url=url, auto_redirect=false})
log.info(url);
if res.status_code==302 then
  local redirectUrl = res.headers['location'][1]
  qs = {}
  qs["state"]=getParam(redirectUrl,"state")
  qs["code"] = genCode(24)
  
  url = formatUrl(baseUrl.."/login/callback",qs)
    
  log.info(url)
  
  res = http.get({url=url, auto_redirect=true})
  
  log.info(res.status_code)
  
  if res.status_code==200 then
--    log.info(res.body_size)
--    log.info(res.body)
  end

end