# Common flow
    Cluster (master node + worker nodes) -> Nodes -> Pods -> Docker containers
    
# Detail common flow
    1. Cluster: Include 1 master node and multiple worker nodes
    2. Master node:
        - API Server
        - Controller Manager: Create pod, create deployment...v.v
        - Scheduler: Scheduler app to node
        - Etcd: An database save cluster status and cluster resource
    3. Worker node: Run app
        - Container Runtime: Run containers
        - Kubelet: Communicate with API Server and manage container in a worker node
        - Kubenetes Service Proxy (kube-proxy): Manage the network and traffic of apps in worker node

# The main components
    1. ReplicationControllers: create and manage, monitor pods in worker node, even worker node die, always keep the number of replica even delete pod
        - Label selector: Define which the pod
        - Replica count: Number of pods
        - Pod template: Pod config
    2. ReplicaSets: Similar to replication controller but more flexible in label selector, deploy multiple pods in node, 1 pod can deploy in any nodes
    3. DaemonSets: Similar to ReplicaSets but can deploy only 1 pod to each node, don't have replica property, usually used to monitoring and logging. We want have only 1 monitoring pod on each node.
    4. Services: An resource endpoint between client and pod group, each service have 1 IP address and port, client will connect to service then service connect to pod through label selectors, it have 4 types:
        - ClusterIP: Create an IP and local DNS that can access to internal cluster, cannot access from external, used to internal pods communication.
        - NodePort: Expose pod to external client can access, use port of Worker Node to client access (port range from 30000 - 32767).
        - LoadBalancer: When you run k8s on cloud (Amazon EKS), it will create an public IP used to client access.
        - Ingress resource: Expose HTTP and HTTPS routes from external cluster to internal cluster service, assign an domain with service in cluster, we can mapping multiple services with one domain.
    5. Deployment: An resource of k8s which help us update new version for application easily, prevent downtime and increase high available ability. It will create replica set, then replica set create pod, then pod run container.
    6. Volume: Disk storage of container, an mount point from file server system to internal container. It have serveral types such as:
        - emptyDir: Share data between containers, save data temporary. It usually use for save logs.
        - gitRepo: deprecated in version 1.25.
        - hostPath: access filesystem of worker node, create an mount point from pod to out of node filesystem. It used to save persistent data, just exist on one worker node, exists event if the pod is deleted.
        - cloud storage: gcePersistentDisk, awsElasticBlockStore, azureDisk
        - PersistentVolume: An storage architecture which split pod to individual, used for cluster administrator.
        - PersistentVolumeClaim: Used for developer, need to deploy pod and need to use volume to store persistent data.
    7. StorageClass: auto create persistent volume
    8. ConfigMap: Pass configuration of application to container. (key/value)
    9. Secret: Same with config map, used to store sensitive data using cli not config file.
    10. StatefulSets: An resource which help us run multiple pods with same template, but difference with ReplicaSet that pod of StatefulSet will be identified index (not random like ReplicaSet) and each pod will have a stable network identity and storage. (auto scale new pod with same name and same hostname with old pod).
    11. Downward API: It is the way to pass Pod metadata information to container.

# Basic command
    1. kubectl version: Get the version of k8s
    2. kubectl get nodes: Get node list
    3. kubectl get pods: Get pod list
    4. kubectl apply -f <yaml_config_file>: Apply resource for k8s
    5. kubectl proxy: Serve proxy for dashboard
    6. kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}'): Generate token to login
    7. kubectl logs -f <pod_name>: Get logs of pod realtime
    8. kubectl port-forward pod/<pod_name> 3002:3002: Expose port of pod from local cluster to external
    9. kubectl get pod --show-labels: Get pod list with label
    10. kubectl get ns: Get namespace list
    11. kubectl create ns <namespace_name>: Create new namespace
    12. kubectl delete ns <namespace_name>: Delete namespace
    13. kubectl get svc: Get service list
    14. kubectl get rc: Get replica controller list
    15. kubectl get rs: Get replica set list
    16. kubectl set image deployment <deployment-name> <container-name>=<new-image>: Update lại pod với image mới bằng deployment.
    17. kubectl rollout status deploy <deployment-name>: Kiểm tra trạng thái update deployment.
    18. kubectl rollout history deploy <deployment-name>: Kiểm tra lịch sử các lần application được update.
    19. kubectl rollout undo deployment <deployment-name> --to-revision=2: Undo application to revision number.
    20. kubectl get pv: Get persistent volume list.
    21. kubectl get pvc: Get persistent volume claim list.
    22. kubectl get sc: Get storage class list.
    23. kubectl create secret generic postgres-config --from-literal=DB=postgres --from-literal=USER=postgres --from-literal=PASSWORD=postgres: Create secret to store sensitive data.
    
# Install kinD with k8s on docker desktop and create cluster: 
    curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.7.0/kind-linux-amd64
    chmod +x ./kind
    sudo mv ./kind /usr/local/bin/
    kind create cluster --name wslkind
    kubectl cluster-info

# Run k8s with local registry (using docker image from local registry)
    ./kind-registry.sh

# Fix error when execute .sh file (then run again)
    sed -i -e 's/\r$//' scriptname.sh
    
# Other links
1. https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/
2. https://viblo.asia/p/kubernetes-series-bai-1-kubernetes-la-gi-ORNZqnDql0n
3. https://kind.sigs.k8s.io/docs/user/local-registry/