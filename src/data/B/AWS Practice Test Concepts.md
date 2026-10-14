# AWS SAA-C03 Concepts — aligned to the exam guide

The four section names follow the exam guide's design domains (Secure 30%, Resilient 26%, High-Performing 24%, Cost-Optimized 20%). The study repository's service-family modules are source material; concepts are summarized and placed under the closest exam task.

## Content Domain 2: Design Resilient Architectures

### Messaging and Event Processing — Task 2.1

- Amazon SQS FIFO queues // Preserve message order; use when processing order matters
  - Batching // Multiple messages per API operation increases throughput; size batches to meet the required rate while respecting the queue's current throughput quota
- Amazon SQS standard queues // High-throughput queues with best-effort ordering and at-least-once delivery
- Amazon SQS buffering // Decouple producers from slower consumers; messages remain queued during traffic spikes or consumer outages and can be retried
- Amazon SQS dead-letter queue (DLQ) // Isolate messages that fail processing repeatedly for diagnosis or later handling
- SQS queue-based Auto Scaling // Scale consumers using backlog per instance, such as visible messages divided by the number of InService instances; target tracking can maintain an acceptable backlog
- Multi-stage SQS workflow // Use a separate queue between independently scalable processing stages; scale each worker fleet from its own queue depth
- AWS Lambda SQS event source mapping // Polls a queue and invokes a function with messages in batches; useful for serverless processing
- Amazon SNS // Push-based pub/sub and fan-out messaging; consumers do not poll an SNS topic

## Content Domain 1: Design Secure Architectures

### IAM and Application Security — Tasks 1.1–1.3

- IAM permissions boundary // Sets the maximum permissions a user or role can receive; effective permissions are the intersection of the boundary and attached permission policies
- IAM least privilege // Grant only the required actions on the narrowest resource ARN; for S3, bucket actions such as ListBucket use the bucket ARN, while object actions such as DeleteObject use `bucket-name/*`
- Cross-account IAM role // A principal assumes a role in the resource account for temporary credentials; the role's permissions and the resource policy (such as an S3 bucket policy) must both allow cross-account access
- IAM policy `aws:SourceIp` condition // Evaluates the caller's source IP, not the public or private IP assigned to a resource being created
- IAM groups // Attach a policy once to a group and manage access by adding or removing users
- API Gateway resource policy // Restrict API invocation by principal, source IP range, or other supported conditions; API Gateway itself is not placed in a customer subnet or protected by a security group
- Cross-account access credentials // Prefer assumed roles and short-lived credentials over sharing long-term IAM user keys
- IAM database authentication // Use short-lived authentication tokens for supported RDS engines and grant the workload role the required database-connect permission
- AWS WAF rate-based rule // Limit or block web requests that exceed a configured request rate; WAF can protect supported resources including CloudFront, ALB, and API Gateway

## Content Domain 3: Design High-Performing Architectures

### VPC and Hybrid Networking — Task 3.4

- Internet Gateway connectivity // An internet-facing instance needs a route to an Internet Gateway, a public address, and network controls that permit the traffic
- PrivateLink // Consumer-initiated private access to a supported service through an interface endpoint; avoids broad VPC-to-VPC network exposure
- S3 gateway VPC endpoint // Route VPC-to-S3 traffic privately without an internet or NAT gateway; associate it with route tables and restrict access with endpoint, IAM, or bucket policies
- NAT Gateway high availability // Place a public NAT Gateway in each AZ used by private workloads and route each AZ to its local gateway
- VPC peering // Direct connectivity between two VPCs; peering is non-transitive, so a hub-and-spoke peering layout does not provide spoke-to-spoke routing
- AWS Transit Gateway // Scalable hub for connecting many VPCs and on-premises networks; supports transitive routing subject to route-table configuration
- AWS Global Accelerator // Use static anycast IPs and the AWS global network to improve access to regional TCP/UDP endpoints, including non-cacheable traffic
- AWS Resource Access Manager (RAM) subnet sharing // Share subnets across accounts in an organization so resources can be deployed into a centrally managed VPC
- AWS Direct Connect Gateway // Associate multiple regional virtual private gateways with Direct Connect for hybrid connectivity across regions
- Direct Connect public VIF // Reach public AWS service endpoints, such as S3, from on-premises over Direct Connect
- Direct Connect private VIF // Connect to a VPC through a virtual private gateway; it is not a direct association to an arbitrary VPC in another region
- Transit Gateway VPN ECMP // Multiple dynamic Site-to-Site VPN tunnels can provide aggregate throughput beyond a single tunnel's limit
- Private IP for same-VPC/AZ workloads // Prefer private addresses for internal instance-to-instance traffic to avoid unnecessary public-path data transfer
- Amazon CloudFront // CDN for cacheable and dynamic HTTP(S) content; it is not a general UDP accelerator
- Route 53 private hosted zone prerequisites // Enable VPC DNS resolution (`enableDnsSupport`) and DNS hostnames (`enableDnsHostnames`) for associated VPCs

## Content Domain 3: Design High-Performing Architectures

### EC2, Load Balancing, and Scaling — Task 3.2

- EC2 Instance Store // Host-attached temporary block storage; cannot be detached and attached elsewhere, is cleared on stop/hibernate/termination, and is not preserved in an AMI
- EC2 user data // Bootstrap scripts or cloud-init directives run on first launch by default
- EC2 reboot alarm action // CloudWatch can reboot an instance after an instance status-check failure; recover actions are for system status-check failures
- EC2 Auto Scaling Standby // Temporarily remove an instance from service for maintenance while keeping it in the group, then return it to service
- Auto Scaling `ReplaceUnhealthy` process // Suspend replacement during maintenance if appropriate; after resuming, unhealthy instances may be replaced
- Auto Scaling health checks // Grace periods delay replacement after launch; configure ELB health checks if the group should act on load-balancer health status
- Predictive scaling // Forecast recurring demand from historical patterns; combine with dynamic target tracking to handle unexpected real-time changes
- Target tracking vs. step/scheduled scaling // Target tracking adjusts capacity to maintain a metric target; step scaling responds in increments to alarm breaches; scheduled scaling handles known time-based changes
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

## Content Domain 4: Design Cost-Optimized Architectures

### Storage, Backup, and Data Protection — Task 4.1

- EFS Infrequent Access // Lower-cost file storage for rarely accessed files; retains EFS file-system semantics, unlike S3 object storage
- Amazon FSx for Windows File Server // Managed Windows file storage with native SMB support and Active Directory integration
- AWS Storage Gateway File Gateway // Hybrid SMB/NFS access to S3 with local caching for on-premises applications
- AWS Snowball Edge // Physical transfer for large offline data migrations; ingest into S3, then use lifecycle rules to transition objects to archive classes
- S3 lifecycle rules // Transition objects between storage classes or expire them according to age; lifecycle rules alone do not make data immutable
- S3 Standard-IA // Infrequently accessed data that still requires millisecond retrieval and multi-AZ resilience; retrieval charges and minimum storage duration apply
- S3 Glacier retrieval classes // Instant Retrieval supports immediate access; Flexible Retrieval and Deep Archive are for data that can tolerate restore delays
- One-time S3 bucket copy // Use `aws s3 sync` for large copies; S3 Batch Replication is another option for existing objects when replication semantics are desired

## Content Domain 3: Design High-Performing Architectures

### Databases, Analytics, and Migration — Tasks 3.3 and 3.5

- Amazon ElastiCache for Redis // In-memory cache/store for low-latency, read-heavy, real-time workloads such as leaderboards, sessions, and geospatial lookups
- DynamoDB Accelerator (DAX) // Managed in-memory cache for DynamoDB read workloads; not a general-purpose cache for relational databases
- Amazon Athena // Run serverless SQL queries on S3 for ad hoc analysis; partitioning, compression, and columnar formats reduce data scanned
- Amazon Neptune // Managed graph database for highly connected data and relationship traversals
- Aurora Serverless // Automatically scales relational Aurora capacity for variable or intermittent workloads
- AWS DMS Serverless // Automatically provisions and scales replication compute for database migration and ongoing change data capture
- AWS SCT and DMS // Convert schemas and migrate data when moving between database engines
- Babelfish for Aurora PostgreSQL // Supports portions of SQL Server T-SQL and wire protocol to reduce application changes during SQL Server migration
- Amazon Redshift cold-data offload // Move infrequently queried data to S3 storage and query it with Athena when immediate ad hoc SQL access is needed

## Content Domain 2: Design Resilient Architectures

### Serverless Web and Content Delivery — Task 2.1

- Lambda and API Gateway // Serverless HTTP/API compute; API Gateway exposes Lambda functions, while Lambda scales with requests and supports provisioned concurrency to reduce cold-start impact
- EventBridge scheduled rule // Invoke serverless code on a recurring rate or cron schedule
- Lambda layers // Package reusable libraries and dependencies for use by multiple functions
- VPC-enabled Lambda internet access // A Lambda function attached to private VPC subnets needs a route through a NAT Gateway for public internet access; use VPC endpoints for supported private AWS service access
- Lambda monitoring // Alarm on concurrency and invocation metrics to detect unexpected spikes and manage cost

## Content Domain 4: Design Cost-Optimized Architectures

### Cost and Operations — Tasks 4.1–4.4

- Compute Savings Plans // Flexible compute discounts across eligible EC2, Fargate, and Lambda usage
- SageMaker Savings Plans // Separate commitment-based discounts for eligible SageMaker usage
- AWS Budgets Savings Plans coverage budget // Alert when the percentage of eligible usage covered by Savings Plans falls below a threshold
- AWS CloudFormation // Infrastructure as code; CloudFormation itself has no additional charge, but provisioned resources incur their normal charges
- EBS volume selection // General Purpose SSD suits broad workloads with burstable performance; Provisioned IOPS SSD suits sustained, I/O-intensive workloads; HDD types suit throughput-oriented or cold data
- Cost of data egress // Keep chatty components such as analytics tools near their data source when practical, reducing large response transfers out of AWS

## Content Domain 1: Design Secure Architectures

### Multi-account governance and secure workloads — Tasks 1.1–1.2

- Service Control Policies (SCPs) // Set maximum permissions for member accounts; they do not grant permissions and do not restrict the management account
- SCP and IAM evaluation // A member-account action must be allowed by both IAM permissions and the applicable SCP, with explicit denies taking precedence
- AWS Control Tower // Establish a governed multi-account landing zone with account provisioning and preventive/detective guardrails
- AWS CloudFormation StackSets // Deploy a common CloudFormation template across multiple accounts and Regions for centrally managed infrastructure
- IAM policy evaluation // An explicit deny overrides an allow; absent an applicable allow, access is implicitly denied
- AWS shared responsibility model // AWS secures the cloud infrastructure; customers remain responsible for in-cloud identities, data, configurations, and workload controls according to service type
- IAM role for an AWS workload // Use temporary role credentials for EC2, Lambda, and cross-account access instead of embedding long-lived keys
- Root user protection // Enable MFA, avoid routine use, and reserve root credentials for tasks that require them
- IAM Identity Center federation // Provide workforce single sign-on and centrally assign access across AWS accounts and applications
- Security groups and network ACLs // Security groups are stateful instance-level allow lists; network ACLs are stateless subnet-level allow/deny lists and need return-path rules
- AWS WAF and Shield // Use WAF rules for HTTP(S) request filtering and rate limiting; Shield provides managed DDoS protection at the network and application edge
- AWS Firewall Manager // Centrally manage supported WAF, Shield Advanced, Network Firewall, and security-group policies across an organization
- AWS Systems Manager Session Manager // Obtain auditable shell access to managed instances without opening inbound SSH or maintaining bastion hosts
- IAM Access Advisor and credential report // Access Advisor shows service-last-accessed information for least-privilege reviews; the credential report audits account IAM credential status
- AWS Secrets Manager versus Parameter Store // Use Secrets Manager when managed secret rotation is required; Parameter Store is suited to hierarchical configuration and SecureString parameters

### Data security controls — Task 1.3

- AWS KMS envelope encryption // Encrypt bulk data with a data key and protect that data key with a KMS key; KMS direct encryption is for small payloads
- AWS KMS versus CloudHSM // KMS provides managed key operations; CloudHSM offers dedicated, customer-controlled HSM hardware for workloads requiring that control model
- S3 Object Lock Compliance mode // Enforce retention that cannot be bypassed, including by the account root user, for the locked retention period
- S3 Object Lock Governance mode // Permit specially authorized users to bypass retention when the request and policy allow it
- AWS Backup Vault Lock // Enforce immutable backup retention controls on a backup vault, distinct from S3 Object Lock and Glacier Vault Lock
- S3 Glacier Vault Lock // Enforce an immutable vault policy for long-term Glacier archives; it is separate from S3 Object Lock and AWS Backup Vault Lock
- S3 SSE-KMS Bucket Keys // Reduce S3-to-KMS request volume and associated KMS costs while retaining SSE-KMS encryption
- KMS multi-Region keys // Related regional KMS keys share key material and key ID for multi-Region encryption workflows, while each key remains a regional resource
- RDS encryption at rest // To encrypt an unencrypted DB instance, create and encrypt a snapshot copy, restore a new instance, then migrate clients
- RDS SSL/TLS // Encrypt database connections in transit; this does not replace encryption at rest or database authorization
- CloudFront Origin Access Control (OAC) // Restrict a private S3 origin so CloudFront can access it through signed origin requests authorized by the bucket policy
- CloudFront signed URLs and signed cookies // Grant time-limited access to private content; use URLs for individual files or cookies for groups of files
- AWS Certificate Manager and CloudFront // A certificate attached to a CloudFront distribution must be available in `us-east-1`
- Amazon Macie // Discover and classify sensitive data in S3 and generate findings for investigation
- Amazon GuardDuty // Detect suspicious activity using sources such as CloudTrail events, VPC Flow Logs, and DNS logs
- Amazon Inspector // Assess supported compute resources and container images for software vulnerabilities and exposure
- AWS Security Hub // Aggregate security findings and security-standard checks from services such as GuardDuty, Inspector, and Macie
- CloudTrail versus CloudWatch versus Config // CloudTrail records API activity, CloudWatch observes metrics/logs, and Config tracks resource configuration and compliance

## Content Domain 2: Design Resilient Architectures

### Availability, backup, and disaster recovery — Task 2.2

- Recovery Time Objective (RTO) // The maximum acceptable time to restore a workload after disruption
- Recovery Point Objective (RPO) // The maximum acceptable amount of data loss measured as time since the last recoverable point
- Backup and restore DR // Lowest-cost approach when longer recovery times are acceptable; restore infrastructure and data after an incident
- Pilot light DR // Keep core data or services replicated and ready, then provision the rest of the stack during recovery
- Warm standby DR // Keep a reduced-capacity copy of the complete workload running and scale it up during recovery
- Multi-site active-active DR // Run production capacity in multiple sites and route users to healthy sites for the lowest recovery time at the highest cost
- AWS Backup plans and vaults // Centrally schedule supported-resource backups with retention, lifecycle, and copy actions
- AWS Backup service selection // Use AWS Backup for centralized cross-service policy and copy management; service-native backups can suit isolated workloads
- Cross-account and cross-Region backup // Copy recovery points to a separate account or Region to reduce the impact of account compromise or regional failure
- AWS Backup policies with Organizations // Centrally apply backup plans to selected organization accounts and resources
- S3 replication // Replication requires versioning on source and destination; live replication covers new objects, while Batch Replication can copy eligible existing objects
- RDS Multi-AZ deployment // Provide managed high availability and failover; a traditional standby is not a read-scaling endpoint
- Aurora Global Database // Replicate Aurora data across Regions for low-lag regional disaster recovery and managed failover options
- DynamoDB point-in-time recovery (PITR) // Restore a table to a selected point within the configured backup retention window
- DynamoDB deletion protection // Block accidental table deletion; enable PITR separately for recoverability
- DynamoDB global tables // Replicate table data across Regions to support local access and regional resilience
- AWS Step Functions // Orchestrate multi-step serverless workflows with task, choice, parallel, wait, and retry behavior
- Step Functions Standard versus Express // Standard workflows suit long-running auditable executions; Express workflows suit short-duration, high-volume processing
- ElastiCache Multi-AZ failover // Use Multi-AZ and automatic failover to improve cache availability; read replicas alone primarily add read capacity
- Availability Zone capacity planning // Distribute sufficient baseline capacity across AZs to meet minimum service needs during an AZ outage
- Multi-AZ minimum capacity // Place enough instances across AZs to retain required capacity after an AZ failure; use the smallest safe baseline and scale out as demand rises

## Content Domain 3: Design High-Performing Architectures

### Elastic compute and storage — Tasks 3.1–3.2

- EC2 instance family selection // Match compute-, memory-, storage-, or accelerator-optimized families to the workload bottleneck
- EC2 purchasing options // Use On-Demand for flexible short-term capacity, commitments for steady usage, and interruptible Spot capacity for fault-tolerant work
- EC2 placement groups // Use cluster placement for low-latency communication, spread for isolated critical instances, or partition for large distributed systems
- EC2 Auto Scaling policy selection // Target tracking maintains a metric target, step scaling reacts to alarm breaches, and scheduled scaling handles known demand patterns
- EC2 Auto Scaling health checks // Configure load-balancer health checks when unhealthy targets should be replaced; use grace periods to avoid premature replacement
- Application Load Balancer versus Network Load Balancer // ALB routes HTTP(S) at Layer 7 using request attributes; NLB handles Layer 4 TCP/UDP and supports static IPs
- ECS, EKS, and Fargate // ECS and EKS orchestrate containers; Fargate runs supported container tasks without managing EC2 worker instances
- AWS Batch // Schedule batch jobs and provision compute capacity appropriate to queued workloads
- EFS mount targets // Create mount targets in the AZs where clients run and prefer the local-AZ target to reduce latency and cross-AZ transfer
- EFS throughput modes // Choose bursting for variable workloads or provisioned/elastic throughput for sustained or changing throughput needs
- S3 multipart upload // Upload large objects in parallel parts and retry failed parts independently to improve throughput and resilience
- S3 byte-range GET // Fetch only a requested portion of an object, enabling parallel or partial reads
- S3 Transfer Acceleration // Use AWS edge networking to speed long-distance uploads to S3 when the extra transfer charge is justified
- Amazon CloudFront caching // Cache HTTP(S) content near viewers to reduce origin load and improve global delivery performance
- Amazon S3 and CloudFront static delivery // Store static assets in S3 and cache them globally with CloudFront to reduce origin load and viewer latency
- AWS Outposts and Wavelength // Use Outposts for AWS infrastructure in customer facilities and Wavelength Zones for eligible low-latency 5G edge workloads

### Scalable network architectures — Task 3.4

- AWS Site-to-Site VPN versus Direct Connect // VPN provides encrypted connectivity over the internet quickly; Direct Connect provides a private dedicated path with longer provisioning lead time
- AWS Transit Gateway versus VPC peering // Transit Gateway supports hub-and-spoke transitive routing; VPC peering is direct and non-transitive
- VPC endpoint selection // Gateway endpoints provide private S3/DynamoDB routes through route tables; interface endpoints use private ENIs and PrivateLink
- Route 53 failover routing // Pair primary/secondary records with health checks to direct DNS responses toward healthy endpoints
- Route 53 latency routing // Direct users to the Region with the lowest measured latency when that best meets the workload requirement

### Database and data-ingestion performance — Tasks 3.3 and 3.5
- RDS read replicas // Use asynchronous replicas to scale read-heavy relational workloads; promotion is possible but requires a failover plan

- Amazon Kinesis Data Streams // Retain ordered streaming records for independent consumers that need real-time processing or replay
- Kinesis on-demand capacity // Let a stream adapt capacity to variable traffic without manual shard management
- Kinesis enhanced fan-out // Give registered stream consumers dedicated per-shard read throughput when multiple consumers process records concurrently
- Kinesis producer batching // Batch records to reduce request overhead and improve producer throughput efficiency
- Amazon Data Firehose // Buffer, optionally transform, and deliver streaming data to supported destinations without managing stream shards
- Kinesis Data Analytics // Process streaming records with managed analytics when near-real-time transformation or insights are required
- AWS DMS S3-to-Kinesis integration // Feed existing S3 data and ongoing changes into a stream when building a custom bridge is unnecessary
- Amazon DataSync // Automate accelerated transfers among on-premises storage and supported AWS storage services; schedule recurring jobs when needed
- DataSync to EFS over Direct Connect // Use an on-premises DataSync agent and private connectivity for recurring transfers into EFS
- AWS Transfer Family // Provide managed SFTP, FTPS, or FTP endpoints backed by services such as S3 or EFS
- AWS Database Migration Service (DMS) // Migrate databases while the source remains available and replicate ongoing changes when configured for CDC
- AWS Application Migration Service (MGN) // Rehost supported server workloads to AWS using continuous block-level replication and a controlled cutover
- AWS Schema Conversion Tool (SCT) // Convert schemas for heterogeneous database-engine migrations; homogeneous migrations generally do not require engine conversion
- Six migration strategies (6 Rs) // Rehost, replatform, repurchase, refactor/re-architect, retain, and retire describe common application migration choices
- AWS Glue and Data Catalog // Discover schemas and run managed ETL while maintaining metadata used by analytics services
- AWS Lake Formation // Simplify data-lake setup and apply centralized, fine-grained data permissions
- Amazon EMR // Run managed big-data frameworks such as Spark for distributed data processing
- Amazon Redshift and Spectrum // Use Redshift for analytical warehousing and Spectrum to query supported data in S3 without first loading it
- Amazon OpenSearch Service // Support managed search, log analytics, and operational search use cases
- Amazon Quick // Use managed business-intelligence capabilities to build visualizations from supported data sources
- Amazon Comprehend custom entity recognition // Use managed NLP to identify domain-specific entities in text rather than operating a custom model
- Database read scaling and caching // Use read replicas for supported relational read workloads, ElastiCache for general-purpose low-latency caching, and DAX for DynamoDB reads

## Content Domain 4: Design Cost-Optimized Architectures

### Cost-aware storage, compute, and network choices — Tasks 4.1–4.4

- S3 Intelligent-Tiering // Automatically move eligible objects between access tiers when access patterns are uncertain and monitoring cost is justified
- EBS General Purpose SSD versus Provisioned IOPS SSD // Select general-purpose volumes for broad workloads and provisioned IOPS for sustained, I/O-intensive requirements
- EC2 Savings Plans versus Reserved Instances // Compare commitment flexibility and eligible usage coverage against workload stability and required discount
- Spot Instances // Use discounted interruptible capacity for flexible workloads designed to checkpoint, retry, or tolerate interruption
- AWS Cost Explorer // Explore historical and forecast costs and review commitment purchase recommendations
- AWS Budgets // Set cost, usage, or commitment thresholds and send alerts when actual or forecast values cross them
- AWS Cost and Usage Report // Export detailed billing and usage data for deeper analysis, commonly stored in S3 for Athena queries
- Cost allocation tags // Apply and activate consistent project, team, or environment tags to attribute costs
- AWS Compute Optimizer // Use utilization analysis and recommendations to right-size supported compute and storage resources
- VPC endpoint and NAT cost tradeoff // Evaluate endpoint charges against NAT processing and data-transfer charges for private AWS-service access
- AWS Organizations consolidated billing // Combine eligible account usage on one bill; eligible volume pricing and commitment benefits may be shared across accounts
- EC2 and Auto Scaling right-sizing // Use workload metrics to select instance size and minimum capacity rather than paying for idle headroom
