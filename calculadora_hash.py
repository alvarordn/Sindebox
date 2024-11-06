import hashlib

user = "admin"
realm = "shellyproem50-08f9e0e68234"  
password = "macarena"  

# Calcula ha1
ha1_input = f"{user}:{realm}:{password}"
ha1 = hashlib.sha256(ha1_input.encode()).hexdigest()
print("ha1:", ha1)

import hmac
from django.utils.encoding import force_bytes
hmac.new(
        force_bytes('macarena'),
        msg=force_bytes("hola"),
        digestmod=hashlib.sha256
    ).hexdigest()