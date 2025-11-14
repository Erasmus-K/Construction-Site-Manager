#!/bin/bash

# Deploy Construction Site AI Agent Infrastructure

echo "Deploying AI Agent Infrastructure..."

# Package Lambda function
cd lambda/ai-agent
zip -r ai-agent.zip index.js package.json
aws s3 cp ai-agent.zip s3://your-deployment-bucket/ai-agent.zip

# Deploy CloudFormation stack
cd ../../
aws cloudformation deploy \
  --template-file cloudformation.yaml \
  --stack-name construction-ai-agent \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    LambdaCodeBucket=your-deployment-bucket \
    LambdaCodeKey=ai-agent.zip

# Get API endpoint
API_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name construction-ai-agent \
  --query 'Stacks[0].Outputs[?OutputKey==`APIEndpoint`].OutputValue' \
  --output text)

echo "Deployment complete!"
echo "API Endpoint: $API_ENDPOINT"
echo "Update your React app's REACT_APP_AI_API_ENDPOINT environment variable"