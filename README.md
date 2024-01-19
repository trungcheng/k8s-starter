# Installation
    1. Run docker desktop
    2. Enable k8s feature
    3. Install kinD for create cluster:
        - curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.7.0/kind-linux-amd64
        - chmod +x ./kind
        - sudo mv ./kind /usr/local/bin/
        - kind create cluster --name <cluster-name>
    4. Install Nginx Ingress Controller
        - kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.49.3/deploy/static/provider/cloud/deploy.yaml
    5. Port fowarding for access ingress locally
        - kubectl port-forward service/ingress-nginx-controller 80:80 -n ingress-nginx
    6. Define custom virtual server name for nginx ingress controller:
        - For window: Add `127.0.0.1 <your-hostname>` (c:\Windows\System32\Drivers\etc\hosts)
        - For linux: Add `127.0.0.1 <your-hostname>` (/etc/hosts)
        - Make sure that <your-hostname> is same with host in /infra/k8s-dev/ingress.yaml
    7. Run ./deploy-dev.sh to apply k8s resources. (all resources are in default namespace)
    8. Open browser then access http://<your-hostname>