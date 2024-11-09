#!/bin/bash

# Set variables
IMAGE_NAME="thanhlp188/whale-project"
IMAGE_TAG="v2_amd64"
PLATFORM="linux/amd64"


# Ensure Docker Buildx is set up
docker buildx create --use || true
docker buildx inspect --bootstrap

# Build the Docker image for the specified platform
docker buildx build --platform $PLATFORM -t $IMAGE_NAME:$IMAGE_TAG --load .

# Optionally, push the image to Docker Hub
# Uncomment the following line to push the image
# docker buildx build --platform $PLATFORM -t $IMAGE_NAME:$IMAGE_TAG --push .