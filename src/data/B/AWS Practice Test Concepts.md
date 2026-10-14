# AWS Practice Test Concepts

## Messaging and Event Processing

- Amazon SQS FIFO queues // Preserve message order; use when processing order matters
  - Batching // Multiple messages per API operation increases throughput; size batches to meet the required rate while respecting the queue's current throughput quota
- Amazon SQS standard queues // High-throughput queues with best-effort ordering and at-least-once delivery
- Amazon SQS buffering // Decouple producers from slower consumers; messages remain queued during traffic spikes or consumer outages and can be retried
- Amazon SQS dead-letter queue (DLQ) // Isolate messages that fail processing repeatedly for diagnosis or later handling
- SQS queue-based Auto Scaling // Scale consumers using backlog per instance, such as visible messages divided by the number of InService instances; target tracking can maintain an acceptable backlog
- Multi-stage SQS workflow // Use a separate queue between independently scalable processing stages; scale each worker fleet from its own queue depth
- AWS Lambda SQS event source mapping // Polls a queue and invokes a function with messages in batches; useful for serverless processing
- Amazon SNS // Push-based pub/sub and fan-out messaging; consumers do not poll an SNS topic
- Amazon Kinesis Data Streams // Durable, replayable real-time stream for multiple independent consumers and event processing
  - On-demand capacity // Automatically adapts stream capacity to variable traffic without manual shard provisioning
  - Enhanced fan-out // Gives registered consumers dedicated per-shard read throughput when multiple consumers read in parallel
  - Producer batching // Send records in batches to reduce API-call overhead and throughput exceptions
- Amazon Kinesis Data Firehose // Managed delivery and optional transformation of streaming data to supported destinations; not a general multi-consumer stream
- AWS DMS S3-to-Kinesis integration // Stream existing S3 data and ongoing changes to Kinesis without building a custom bridge

## IAM and Application Security

- IAM permissions boundary // Sets the maximum permissions a user or role can receive; effective permissions are the intersection of the boundary and attached permission policies
- IAM least privilege // Grant only the required actions on the narrowest resource ARN; for S3, bucket actions such as ListBucket use the bucket ARN, while object actions such as DeleteObject use `bucket-name/*`
- Cross-account IAM role // A principal assumes a role in the resource account for temporary credentials; the role's permissions and the resource policy (such as an S3 bucket policy) must both allow cross-account access
- IAM policy `aws:SourceIp` condition // Evaluates the caller's source IP, not the public or private IP assigned to a resource being created
- IAM groups // Attach a policy once to a group and manage access by adding or removing users
- API Gateway resource policy // Restrict API invocation by principal, source IP range, or other supported conditions; API Gateway itself is not placed in a customer subnet or protected by a security group
- Cross-account access credentials // Prefer assumed roles and short-lived credentials over sharing long-term IAM user keys
- Amazon Comprehend custom entity recognition // Managed NLP for extracting domain-specific entities from text without operating a custom ML model
- AWS WAF rate-based rule // Limit or block web requests that exceed a configured request rate; WAF can protect supported resources including CloudFront, ALB, and API Gateway

## VPC and Hybrid Networking

- Internet Gateway connectivity // An internet-facing instance needs a route to an Internet Gateway, a public address, and network controls that permit the traffic
- Security groups and network ACLs // Security groups are stateful; network ACLs are stateless and need rules for both request and return traffic, including ephemeral ports where applicable
- PrivateLink // Consumer-initiated private access to a supported service through an interface endpoint; avoids broad VPC-to-VPC network exposure
- S3 gateway VPC endpoint // Route VPC-to-S3 traffic privately without an internet or NAT gateway; associate it with route tables and restrict access with endpoint, IAM, or bucket policies
- NAT Gateway high availability // Place a public NAT Gateway in each AZ used by private workloads and route each AZ to its local gateway
- VPC peering // Direct connectivity between two VPCs; peering is non-transitive, so a hub-and-spoke peering layout does not provide spoke-to-spoke routing
- AWS Transit Gateway // Scalable hub for connecting many VPCs and on-premises networks; supports transitive routing subject to route-table configuration
- AWS Resource Access Manager (RAM) subnet sharing // Share subnets across accounts in an organization so resources can be deployed into a centrally managed VPC
- AWS Direct Connect Gateway // Associate multiple regional virtual private gateways with Direct Connect for hybrid connectivity across regions
- Direct Connect public VIF // Reach public AWS service endpoints, such as S3, from on-premises over Direct Connect
- Direct Connect private VIF // Connect to a VPC through a virtual private gateway; it is not a direct association to an arbitrary VPC in another region
- Transit Gateway VPN ECMP // Multiple dynamic Site-to-Site VPN tunnels can provide aggregate throughput beyond a single tunnel's limit
- Private IP for same-VPC/AZ workloads // Prefer private addresses for internal instance-to-instance traffic to avoid unnecessary public-path data transfer
- AWS Global Accelerator // Uses static anycast IPs and the AWS edge/global network to improve access to regional endpoints; useful for TCP/UDP, real-time APIs, and non-cacheable traffic
- Amazon CloudFront // CDN for cacheable and dynamic HTTP(S) content; it is not a general UDP accelerator
- Route 53 private hosted zone prerequisites // Enable VPC DNS resolution (`enableDnsSupport`) and DNS hostnames (`enableDnsHostnames`) for associated VPCs

## EC2, Load Balancing, and Scaling

- EC2 Instance Store // Host-attached temporary block storage; cannot be detached and attached elsewhere, is cleared on stop/hibernate/termination, and is not preserved in an AMI
- EC2 user data // Bootstrap scripts or cloud-init directives run on first launch by default
- EC2 reboot alarm action // CloudWatch can reboot an instance after an instance status-check failure; recover actions are for system status-check failures
- EC2 Auto Scaling Standby // Temporarily remove an instance from service for maintenance while keeping it in the group, then return it to service
- Auto Scaling `ReplaceUnhealthy` process // Suspend replacement during maintenance if appropriate; after resuming, unhealthy instances may be replaced
- Auto Scaling health checks // Grace periods delay replacement after launch; configure ELB health checks if the group should act on load-balancer health status
- Predictive scaling // Forecast recurring demand from historical patterns; combine with dynamic target tracking to handle unexpected real-time changes
- Target tracking vs. step/scheduled scaling // Target tracking adjusts capacity to maintain a metric target; step scaling responds in increments to alarm breaches; scheduled scaling handles known time-based changes
- Multi-AZ minimum capacity // Place enough instances across AZs to retain required capacity after an AZ failure; use the smallest safe baseline and scale out as demand rises
- Spot request types // Persistent requests reopen after interruption; stopping a Spot Instance does not reopen the request until it is started
- Canceling a Spot request // Cancelling the request does not automatically terminate its running instance
- Spot Fleet // Can maintain target capacity by replacing terminated Spot Instances
- Application Load Balancer (ALB) path routing // Route HTTP(S) requests to target groups based on URL paths; also supports host, header, method, query-string, and source-IP conditions
- Network Load Balancer (NLB) // Layer 4 TCP/UDP load balancer with static IP addresses; useful for protocols such as SSH and workloads that require fixed IPs
- Cross-zone load balancing // When enabled, distribute traffic across targets in all enabled AZs; when disabled, each load-balancer node routes only to targets in its AZ
- ECS Service Auto Scaling // Scale task count using service metrics such as average CPU or memory utilization
- ECS/EKS with Fargate // Run containerized workloads without managing EC2 worker instances
- EC2 tenancy // Dedicated tenancy can be selected on the launch template or inherited from the VPC; either setting to dedicated results in dedicated instances
- EC2 cluster placement group // Place instances close together within one AZ for low-latency, high-throughput inter-node communication
- EC2 Elastic Fabric Adapter (EFA) // Enhanced networking for tightly coupled HPC and ML workloads, including OS-bypass communication
- Detailed CloudWatch monitoring // EC2 detailed monitoring publishes metrics at 1-minute intervals rather than the 5-minute basic interval

## Storage, Backup, and Data Protection

- Amazon EFS mount targets // Create a mount target in each AZ where clients run and mount through the local-AZ target to reduce latency and cross-AZ traffic
- EFS throughput modes // Burst mode uses credits for intermittent spikes; provisioned throughput suits sustained demand. Throughput mode is separate from the EFS storage class
- EFS Infrequent Access // Lower-cost file storage for rarely accessed files; retains EFS file-system semantics, unlike S3 object storage
- Amazon FSx for Windows File Server // Managed Windows file storage with native SMB support and Active Directory integration
- AWS DataSync // Managed, accelerated data transfer for large datasets between on-premises storage and AWS services such as S3, EFS, and FSx
- DataSync to EFS over Direct Connect // Use an on-premises DataSync agent and a private interface endpoint for EFS API access; schedule recurring transfers as needed
- AWS Storage Gateway File Gateway // Hybrid SMB/NFS access to S3 with local caching for on-premises applications
- AWS Snowball Edge // Physical transfer for large offline data migrations; ingest into S3, then use lifecycle rules to transition objects to archive classes
- S3 multipart upload // Upload large objects in parallel parts and retry failed parts independently; generally consider for objects around 100 MB or larger
- S3 byte-range GET // Retrieve only a specified byte range of an object, such as a small header, without downloading the entire object
- S3 Transfer Acceleration // Speed up long-distance uploads to S3 through AWS edge locations; pair with CloudFront for faster global downloads
- S3 lifecycle rules // Transition objects between storage classes or expire them according to age; lifecycle rules alone do not make data immutable
- S3 Standard-IA // Infrequently accessed data that still requires millisecond retrieval and multi-AZ resilience; retrieval charges and minimum storage duration apply
- S3 Glacier retrieval classes // Instant Retrieval supports immediate access; Flexible Retrieval and Deep Archive are for data that can tolerate restore delays
- S3 replication // Requires versioning on source and destination; live replication handles new objects, while Batch Replication can copy eligible existing objects
- One-time S3 bucket copy // Use `aws s3 sync` for large copies; S3 Batch Replication is another option for existing objects when replication semantics are desired
- S3 Object Lock Compliance mode // WORM retention that prevents overwrite or deletion during the retention period, including by the account root user
- S3 Object Lock Governance mode // Allows authorized users with the bypass permission to override retention in supported cases
- S3 Glacier Vault Lock // Enforce immutable vault policies for long-term archives; distinct from S3 Object Lock and unsuitable when immediate access is required
- S3 SSE-KMS Bucket Keys // Reduce KMS request traffic and costs while retaining SSE-KMS encryption
- KMS multi-Region keys // Related regional keys share key material and key ID, allowing encryption/decryption in multiple regions; each regional replica remains a regional KMS resource
- RDS encryption at rest // Cannot be enabled in place on an unencrypted DB instance; snapshot, copy the snapshot with encryption, restore, migrate clients, then retire the old instance
- RDS SSL/TLS // Encrypt database connections in transit; encryption at rest and IAM authentication solve different security needs
- RDS and Aurora Multi-AZ // Primarily availability/failover; traditional RDS Multi-AZ standby replication is synchronous and is not a read-scaling endpoint
- RDS read replicas // Asynchronous replication for read scaling or cross-AZ/Region DR; can be promoted, but promotion generally requires failover procedures
- Aurora Global Database // Cross-Region replication with low lag and managed recovery/failover options for regional DR
- DynamoDB point-in-time recovery (PITR) // Continuous backups support restoring a table to a selected time within the retention window
- DynamoDB deletion protection // Prevents accidental table deletion; use alongside PITR, which enables recovery but does not itself prevent deletion
- DynamoDB global tables // Managed multi-Region replication for local reads and writes and regional resilience
- Amazon S3 Object Lock and Glacier Vault Lock // Select the lock mechanism based on storage service, required retrieval time, and whether administrators must be unable to bypass retention

## Databases, Analytics, and Migration

- Amazon ElastiCache for Redis // In-memory cache/store for low-latency, read-heavy, real-time workloads such as leaderboards, sessions, and geospatial lookups
- ElastiCache Multi-AZ with automatic failover // Improve cache-layer availability and reduce recovery time; read replicas alone primarily add read capacity
- DynamoDB Accelerator (DAX) // Managed in-memory cache for DynamoDB read workloads; not a general-purpose cache for relational databases
- Amazon Athena // Serverless SQL queries directly against data in S3; suitable for ad hoc checks and occasional analysis without a cluster
- Amazon Neptune // Managed graph database for highly connected data and relationship traversals
- Aurora Serverless // Automatically scales relational Aurora capacity for variable or intermittent workloads
- AWS DMS Serverless // Automatically provisions and scales replication compute for database migration and ongoing change data capture
- AWS SCT and DMS // Convert schemas and migrate data when moving between database engines
- Babelfish for Aurora PostgreSQL // Supports portions of SQL Server T-SQL and wire protocol to reduce application changes during SQL Server migration
- IAM database authentication // Uses short-lived tokens for supported RDS engines; grant the Lambda execution role the required database-connect permissions
- Amazon Redshift cold-data offload // Move infrequently queried data to S3 storage and query it with Athena when immediate ad hoc SQL access is needed

## Serverless Web and Content Delivery

- S3 static website plus CloudFront // Host static files in S3 and cache globally at CloudFront edge locations; Route 53 can alias the custom domain to CloudFront
- CloudFront ACM certificate // CloudFront distributions require ACM certificates to be requested or imported in `us-east-1`
- CloudFront Origin Access Control (OAC) // Restrict a private S3 origin to CloudFront; supports signed origin requests and S3 operations permitted by policy
- CloudFront signed URLs and signed cookies // Restrict private content to authorized viewers; URLs suit individual files, cookies suit groups of files without changing URLs
- Lambda and API Gateway // Serverless HTTP/API compute; API Gateway exposes Lambda functions, while Lambda scales with requests and supports provisioned concurrency to reduce cold-start impact
- EventBridge scheduled rule // Invoke serverless code on a recurring rate or cron schedule
- Lambda layers // Package reusable libraries and dependencies for use by multiple functions
- VPC-enabled Lambda internet access // A Lambda function attached to private VPC subnets needs a route through a NAT Gateway for public internet access; use VPC endpoints for supported private AWS service access
- Lambda monitoring // Alarm on concurrency and invocation metrics to detect unexpected spikes and manage cost
- AWS CloudFormation StackSets // Deploy and manage a common CloudFormation template across multiple accounts and regions

## Cost and Operations

- Compute Savings Plans // Flexible compute discounts across eligible EC2, Fargate, and Lambda usage
- SageMaker Savings Plans // Separate commitment-based discounts for eligible SageMaker usage
- AWS Budgets Savings Plans coverage budget // Alert when the percentage of eligible usage covered by Savings Plans falls below a threshold
- AWS CloudFormation // Infrastructure as code; CloudFormation itself has no additional charge, but provisioned resources incur their normal charges
- EBS volume selection // General Purpose SSD suits broad workloads with burstable performance; Provisioned IOPS SSD suits sustained, I/O-intensive workloads; HDD types suit throughput-oriented or cold data
- Cost of data egress // Keep chatty components such as analytics tools near their data source when practical, reducing large response transfers out of AWS
