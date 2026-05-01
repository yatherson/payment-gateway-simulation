#!/bin/sh
# Floci initialization hook — runs once on container startup
# Add bucket/queue/table creation here as the project grows

awslocal s3 mb s3://payment-gateway-documents
