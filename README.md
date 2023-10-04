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

# Basic command
    1. kubectl version: Get the version of k8s
    2. kubectl get nodes: Get node list
    3. kubectl get pods: Get pod list
    4. kubectl apply -f <yaml_config_file>: Apply resource for k8s
    5. kubectl proxy: Serve proxy for dashboard
    6. kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}'): Generate token to login
    7. kubectl logs -f <pod_name>: Get logs of pod realtime
    8. kubectl port-forward pod/<pod_name> 3002:3002: Expose port from local cluster to external
    9. kubectl get pod --show-labels: Get pod list with label
    10. kubectl get ns: Get namespace list
    11. kubectl create ns <namespace_name>: Create new namespace
    12. kubectl get svc: Get service list
    
# Fix error when execute .sh file (then run again)
    sed -i -e 's/\r$//' scriptname.sh
    
# Other links
1. https://kubernetes.io/blog/2020/05/21/wsl-docker-kubernetes-on-the-windows-desktop/
2. https://viblo.asia/p/kubernetes-series-bai-1-kubernetes-la-gi-ORNZqnDql0n
3. https://kind.sigs.k8s.io/docs/user/local-registry/