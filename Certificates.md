
###Commands 

*Clone [wsfed repo](https://github.com/zamd/wsfedidp) to get [openssl.cnfg](https://github.com/zamd/wsfedidp/blob/master/openssl.cnfg) file used in following commands*

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout FabrikamRootCA.key -out FabrikamRootCA.cer -config openssl.cnfg -extensions v3_ca -sha256`

`sudo openssl genrsa -out fabrikam.inter.key 2048`

`sudo openssl req -new -key fabrikam.inter.key -out fabrikam.inter.csr -config openssl.cnfg -extensions v3_ca -days 365 -sha256`

`sudo openssl x509 -req -in fabrikam.inter.csr -CA FabrikamRootCA.cer -CAkey FabrikamRootCA.key -CAcreateserial  -out fabrikam.inter.cer -extfile openssl.cnfg -extensions v3_ca -days 365 -sha256`

`sudo openssl genrsa -out facebook.com.key 2048`

`sudo openssl req -new -key facebook.com.key -out facebook.com.csr -config openssl.cnfg -extensions server_cert -days 365 -sha256`

`sudo openssl x509 -req -in facebook.com.csr -CA fabrikam.inter.cer -CAkey fabrikam.inter.key -CAcreateserial  -out facebook.com.cer -extfile openssl.cnfg -extensions server_cert -sha256`

`cat facebook.com.cer fabrikam.inter.cer FabrikamRootCA.crt > facebook-bundle.pem`
