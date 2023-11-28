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

.PHONY: all frontend backend database secrets namespace clear