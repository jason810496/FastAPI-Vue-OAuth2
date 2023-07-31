# Note for Full-stack App

## requirement 

- pip list 
    - backend framework : 
        - fastapi
    - authentication : 
        - passlib ( handle password hashed )
        - python-jose ( python JWT package )
## Backend

### structure
- split controller with router
- restful 
- routers
- [FastAPI : type hint with metadata annotation ](https://fastapi.tiangolo.com/python-types/#type-hints-with-metadata-annotations))

### tech stack 
- FastAPI
- docker
    - docker-compose
- PostgreSQL

### FastAPI + SqlAlchemy structure
- [ : csdn ](https://blog.csdn.net/ashtyukjhf/article/details/121885667)

### package 
pip list : 
```
pip install fastapi
pip install passlib
pip install python-jose
```


### Authentication 
- OAuth : 
    - a Authorization pattern
    - can be used in no only sign-in 
    - roles : 
        - resource ( server side )
        - client


### store password in databases 

OWASP Guidelines : 
- add salt
- hashing algorithm
    - bcrypt , MD5 , SHA-1
- hashed 
    -  hash( password + salt ) 


### FastAPI Auth + JWT 
- [Explain JWT iThome](https://ithelp.ithome.com.tw/articles/10289553)
- [FastAPI doc](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [FastAPI JWT Auth example](https://www.freecodecamp.org/news/how-to-add-jwt-authentication-in-fastapi/)

### FastAPI + Modern Frontend Example 
- [FastAPI / Vue / Docker-Compose](https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs/)

## Frontend 
### techstack 
- react 
- boostwrap


## Testing 
### Packages 
- `httpx`
### Reference 
- [FastAPI doc for testing](https://fastapi.tiangolo.com/tutorial/testing/)