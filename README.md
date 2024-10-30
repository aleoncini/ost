# OST - Openshift Sizing Tool

This tool is a community  project developed with the purpose of providing a quick and simple sizing 
utility for OpenShift, the hybrid cloud platform built by Red Hat around Linux containers orchestrated and managed by Kubernetes.

## Build Instructions
The following example shows how to build a local image of the application.
```
git clone gihub.com/aleoncini/ost && cd ost
$ podman build -t ost .
```

The image is built on `registry.access.redhat.com/ubi9/nginx-124`, which uses the Source-to-Image framework. The final image is OpenShift-ready.

## Run Instructions
To run locally for development purposes:
```
$ podman run -p 8080:8080 ost
```
This example forwards traffic from port 8080/TCP on the local machine. The service is available at `http://localhost:8080`.

## Run on OpenShift
The OST tool can be deployed on OpenShift using CLI or Console or GitOps solutions like ArgoCD. The simpler
way is to deploy using the `oc` command line utlity:
```
$ oc apply -f manifests/
```

The command above creates the Deployment, Service and Route necessary to expose the application.