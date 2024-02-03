# simplify kubectl commands

# load image from docker hub
all: env frontend database backend

all-rebuild: image-ci clear all

all-local-rebuild: build load-image clear all

restart: frontend-restart backend-restart

frontend-restart: clear-frontend frontend

backend-restart: clear-backend backend

env: namespace secrets

namespace:
	kubectl apply -f namespace.yaml

secrets:
	kubectl apply -f secrets.yaml

frontend:
	kubectl apply -f frontend/deployment.yaml
	kubectl apply -f frontend/service.yaml

database:
	kubectl apply -f database/statefulset.yaml
	kubectl apply -f database/service.yaml

backend:
	kubectl apply -f backend/deployment.yaml
	kubectl apply -f backend/service.yaml


clear: clear-frontend clear-backend clear-database clear-env

clear-env: clear-namespace clear-secrets

clear-namespace:
	kubectl delete -f namespace.yaml

clear-secrets:
	kubectl delete -f secrets.yaml

clear-database:
	kubectl delete -f database/statefulset.yaml
	kubectl delete -f database/service.yaml

clear-backend:
	kubectl delete -f backend/deployment.yaml
	kubectl delete -f backend/service.yaml

clear-frontend:
	kubectl delete -f frontend/deployment.yaml
	kubectl delete -f frontend/service.yaml


image-ci: build push

push-frontend:
	docker push jasonbigcow/oauth2-vue3-nginx:linux
	
push-backend:
	docker push jasonbigcow/oauth2-fastapi:linux

build: build-frontend build-backend

build-frontend:
	cd .. && docker build --platform linux/amd64 -t jasonbigcow/oauth2-vue3-nginx:linux  -f Dockerfile.k8s .
build-backend:
	cd ../backend && docker build --platform linux/amd64 --no-cache -t jasonbigcow/oauth2-fastapi:linux .

# local k8s cluster ( using minikube )
local-ci: build load-image

load-image: load-image-frontend load-image-backend

load-image-frontend:
	minikube image load jasonbigcow/oauth2-vue3-nginx:linux

load-image-backend:
	minikube image load jasonbigcow/oauth2-fastapi:linux

.PHONY: all all-rebuild all-local-rebuild restart frontend-restart backend-restart env namespace secrets frontend database backend clear clear-frontend clear-backend clear-database clear-env clear-namespace clear-secrets image-ci push-frontend push-backend build build-frontend build-backend local-ci load-image load-image-frontend load-image-backend