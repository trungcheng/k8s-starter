#!/bin/bash

SERVICE="auth products orders"

for service in $SERVICE
do
   cd $service
   docker build -t trungdn2/node-k8s-$service-service .
   docker push trungdn2/node-k8s-$service-service
   cd ..
done

kubectl delete -f infra/k8s-dev
kubectl apply -f infra/k8s-dev