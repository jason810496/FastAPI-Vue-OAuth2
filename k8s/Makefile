# simplify kubectl commands

all:
	kubectl apply -f namespace.yaml
	kubectl apply -f secrets.yaml
	kubectl apply -f frontend/deployment.yaml
	kubectl apply -f frontend/service.yaml
	kubectl apply -f backend/deployment.yaml
	kubectl apply -f backend/service.yaml
	kubectl apply -f database/statefulset.yaml
	kubectl apply -f database/service.yaml

frontend:
	kubectl apply -f frontend/deployment.yaml
	kubectl apply -f frontend/service.yaml

backend:
	kubectl apply -f backend/deployment.yaml
	kubectl apply -f backend/service.yaml

database:
	kubectl apply -f database/statefulset.yaml
	kubectl apply -f database/service.yaml

secrets:
	kubectl apply -f secrets.yaml

namespace:
	kubectl apply -f namespace.yaml

clear:
	kubectl delete -f namespace.yaml

clear-backend:
	kubectl delete -f backend/deployment.yaml
	kubectl delete -f backend/service.yaml
clear-frontend:
	kubectl delete -f frontend/deployment.yaml
	kubectl delete -f frontend/service.yaml
clear-database:
	kubectl delete -f database/statefulset.yaml
	kubectl delete -f database/service.yaml

test-clear:
	# kubectl delete -f frontend/deployment.yaml
	# kubectl delete -f frontend/service.yaml
	kubectl delete -f backend/deployment.yaml
	kubectl delete -f backend/service.yaml
test:
	# kubectl apply -f frontend/deployment.yaml
	# kubectl apply -f frontend/service.yaml
	kubectl apply -f backend/deployment.yaml
	kubectl apply -f backend/service.yaml

backend-all: clear-backend backend-docker backend

backend-restart: clear-backend backend

backend-docker: build-backend push-backend

image: build push

b-i-a: build-backend push-backend 

push: push-frontend push-backend

push-frontend:
	docker push jasonbigcow/oauth2-vue3-nginx:linux
	
push-backend:
	docker push jasonbigcow/oauth2-fastapi:linux

push-test:
	docker push jasonbigcow/oauth2-fastapi:linux

build:
	cd .. && docker build --platform linux/amd64 -t jasonbigcow/oauth2-vue3-nginx:linux .
	cd ../backend && docker build --platform linux/amd64 -t jasonbigcow/oauth2-fastapi:linux .

build-frontend:
	cd .. && docker build --platform linux/amd64 -t jasonbigcow/oauth2-vue3-nginx:linux .
build-backend:
	cd ../backend && docker build --platform linux/amd64 -t jasonbigcow/oauth2-fastapi:linux .
build-test:
	cd ../backend && docker build --platform linux/amd64 -t jasonbigcow/oauth2-fastapi:linux -f TestDockerfile .

.PHONY: all frontend backend database secrets namespace clear test-clear test image push build build-frontend build-backend clear-backend clear-frontend clear-database backend-all clear-backend backend-restart backend-build-push push-frontend push-backend push-test b-i-a