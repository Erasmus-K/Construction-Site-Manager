# AI Agent Integration Guide

## Architecture Overview

```
Frontend (React) → API Gateway → Lambda → Bedrock → AI Response
                ↓
            Mock AI Server (Development)
```

## Components Added

### 1. Frontend Components
- **AIAssistant.js**: Floating chat widget available on all pages
- **AIInsights.js**: Dashboard widget showing AI-generated insights
- **useAI.js**: React hook for AI API calls

### 2. Backend Infrastructure
- **Lambda Function**: Processes AI requests using Bedrock
- **API Gateway**: Exposes AI endpoints
- **CloudFormation**: Infrastructure as Code

### 3. Development Setup
- **mock-ai-server.js**: Local AI simulation for development

## Quick Start

### Development Mode
```bash
npm install
npm start  # Runs frontend, backend, and mock AI server
```

### Production Deployment
```bash
# 1. Configure AWS CLI
aws configure

# 2. Create S3 bucket for deployments
aws s3 mb s3://your-deployment-bucket

# 3. Deploy infrastructure
cd aws-infrastructure
chmod +x deploy.sh
./deploy.sh

# 4. Update environment variables
export REACT_APP_AI_API_ENDPOINT=https://your-api-gateway-url/prod
```

## AI Features

### 1. Real-time Analysis
- Budget variance detection
- Equipment utilization monitoring
- Timeline risk assessment
- Quality control insights

### 2. Interactive Chat
- Natural language queries about projects
- Context-aware responses using site data
- Actionable recommendations

### 3. Automated Insights
- Daily KPI monitoring
- Anomaly detection
- Predictive maintenance alerts
- Cost optimization suggestions

## API Endpoints

### POST /ai
```json
{
  "action": "analyze|chat|insights",
  "query": "user question (for chat)",
  "siteData": {
    "works": [...],
    "finances": [...],
    "equipment": [...],
    "labourLogs": [...],
    "siteVisits": [...]
  }
}
```

## Security & Performance

### Security
- IAM roles with minimal permissions
- API Gateway throttling
- Input validation and sanitization
- No sensitive data in prompts

### Performance
- Lambda cold start optimization
- Response caching
- Async processing for large datasets
- Connection pooling

### Cost Optimization
- Bedrock model selection (Claude 3 Sonnet)
- Request batching
- Smart caching strategies
- Usage monitoring

## Monitoring & Learning

### CloudWatch Metrics
- Request latency
- Error rates
- Token usage
- Cost tracking

### Continuous Learning
- User feedback collection
- Query pattern analysis
- Model performance monitoring
- Regular prompt optimization

## Usage Examples

### Chat Queries
- "What's the budget status for Foundation Work?"
- "Which equipment is underutilized?"
- "Are there any project delays?"
- "Show me cost trends this week"

### Automated Insights
- Budget overrun warnings
- Equipment maintenance alerts
- Quality control reminders
- Timeline risk notifications

## Environment Variables

```bash
# Development
REACT_APP_AI_API_ENDPOINT=http://localhost:3002

# Production
REACT_APP_AI_API_ENDPOINT=https://your-api-gateway-url/prod
AWS_REGION=us-east-1
```

## Troubleshooting

### Common Issues
1. **CORS errors**: Check API Gateway CORS configuration
2. **Lambda timeouts**: Increase timeout for complex analyses
3. **Bedrock access**: Verify IAM permissions
4. **High costs**: Implement request caching

### Debug Mode
Enable detailed logging by setting:
```bash
export DEBUG_AI=true
```