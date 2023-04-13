# Basic command
    1. `kubectl version`
    2. `kubectl get nodes`
    3. `kubectl get pods`
    4. `kubectl apply -f <yaml config file>`
    5. `kubectl proxy`
    6. `kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')`
    7. `kubectl logs -f <podName>`
    8. `kubectl port-forward pod/kube-starter 3002:3002`
    
# Start a local registry container:
    `docker run -d -p 5000:5000 --restart=always --name registry registry:2`

# Do docker images to find out the REPOSITORY and TAG of your local image. Then create a new tag for your local image :
    `docker tag <local-image-repository>:<local-image-tag> localhost:5000/<local-image-name>`

# If TAG for your local image is None, you can simply do:
    `docker tag <local-image-repository> localhost:5000/<local-image-name>`

# Push to local registry:
    `docker push localhost:5000/<local-image-name>`
    
# Fix error when execute .sh file (then run again)
    `sed -i -e 's/\r$//' scriptname.sh`
    
# Other links
1. https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/
2. https://viblo.asia/p/kubernetes-series-bai-1-kubernetes-la-gi-ORNZqnDql0n
3. https://kind.sigs.k8s.io/docs/user/local-registry/