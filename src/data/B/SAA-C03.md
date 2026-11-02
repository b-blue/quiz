# AWS SAA-C03 Concepts — aligned to the exam guide

The four section names follow the exam guide's design domains (Secure 30%, Resilient 26%, High-Performing 24%, Cost-Optimized 20%). The study repository's service-family modules are source material; concepts are summarized and placed under the closest exam task.

## Content Domain 2: Design Resilient Architectures

### Messaging and Event Processing — Task 2.1

- Amazon SQS FIFO queues // Preserve order within each mandatory Message Group ID and deduplicate sends; throughput is limited to 300 messages/second without batching or 3,000 with batching.
  - Batching // Multiple messages per API operation increases throughput; size batches to meet the required rate while respecting the queue's current throughput quota
- Amazon SQS standard queues // Provide unlimited throughput with at-least-once delivery and best-effort ordering; messages can be up to 1,024 KB and are retained for 4 days by default, up to 14 days.
- Amazon SQS buffering // Decouple producers from slower consumers; messages remain queued during traffic spikes or consumer outages and can be retried
- Amazon SQS dead-letter queue (DLQ) // Isolate messages that fail processing repeatedly for diagnosis or later handling
- SQS queue-based Auto Scaling // Scale consumers using backlog per instance, such as visible messages divided by the number of InService instances; target tracking can maintain an acceptable backlog
- Multi-stage SQS workflow // Use a separate queue between independently scalable processing stages; scale each worker fleet from its own queue depth
- AWS Lambda SQS event source mapping // Polls a queue and invokes a function with messages in batches; useful for serverless processing
- Amazon SNS // Publish once to a topic and push to many subscribers; per-subscription JSON filter policies can select which messages each subscriber receives.
- S3 EventBridge notifications // Send S3 bucket events to EventBridge for JSON-rule filtering, multiple destinations, archiving, replay, and reliable delivery.
- SQS message visibility timeout // Hide a received message from other consumers while it is processed; delete it on success or extend its timeout, and it becomes available again if processing outlasts the timeout.
- DynamoDB Streams // Provide an ordered feed of item-level creates, updates, and deletes retained for 24 hours; invoke Lambda or use the Kinesis adapter, while Kinesis Data Streams suits longer retention and more consumers.
- CloudWatch Logs subscriptions // Forward filtered log events in real or near-real time to Kinesis Data Streams, Data Firehose, or Lambda for processing; cross-account delivery uses a destination access policy and role.
- EventBridge archive and replay // Archive all or filtered events delivered to an event bus for a chosen period or indefinitely, then replay them to the bus for reprocessing.
- S3 Event Notifications versus EventBridge // Send object events directly to Lambda, SQS, or SNS with optional key-name filtering; choose EventBridge for all bucket events, JSON filtering, more destinations, and archive/replay.
- SQS long polling // Wait 1–20 seconds for messages when polling an empty queue, reducing API calls and improving efficiency; the slides recommend the 20-second wait over short polling.

## Content Domain 1: Design Secure Architectures

### IAM and Application Security — Tasks 1.1–1.3

- IAM permissions boundary // A managed policy sets the maximum permissions a user or role can receive (not groups); effective permissions are limited by both the boundary and the entity's permission policies.
- IAM least privilege // Grant only the required actions on the narrowest resource ARN; for S3, bucket actions such as ListBucket use the bucket ARN, while object actions such as DeleteObject use `bucket-name/*`
- Cross-account IAM role // Let a trusted principal assume a role in the resource account; unlike access through a resource-based policy, assuming the role replaces the principal's original permissions with the role's permissions.
- IAM policy `aws:SourceIp` condition // Evaluates the caller's source IP, not the public or private IP assigned to a resource being created
- IAM groups // Attach a policy once to a group and manage access by adding or removing users
- API Gateway resource policy // Restrict API invocation by principal, source IP range, or other supported conditions; API Gateway itself is not placed in a customer subnet or protected by a security group
- Cross-account access credentials // Prefer assumed roles and short-lived credentials over sharing long-term IAM user keys
- IAM database authentication // Use short-lived authentication tokens for supported RDS engines and grant the workload role the required database-connect permission
- AWS WAF rate-based rule // Limit or block web requests that exceed a configured request rate; WAF can protect supported resources including CloudFront, ALB, and API Gateway
- Amazon Cognito // User Pools provide app sign-in, MFA, and federation; Identity Pools exchange user identities for temporary AWS credentials that can authorize direct access to AWS resources.
- AWS Directory Services selection // Use AWS Managed Microsoft AD for a managed domain that can trust on-premises AD, AD Connector as a proxy to an existing directory, or Simple AD for an AWS-hosted compatible directory that cannot join on-premises AD.

## Content Domain 3: Design High-Performing Architectures

### VPC and Hybrid Networking — Task 3.4

- Internet Gateway connectivity // An internet-facing instance needs a route to an Internet Gateway, a public address, and network controls that permit the traffic
- PrivateLink // Expose a service privately to consumers through PrivateLink: consumers use interface endpoint ENIs, while providers use a Network Load Balancer; no VPC peering or internet route is needed.
- S3 gateway VPC endpoint // Route VPC-to-S3 traffic privately without an internet or NAT gateway; associate it with route tables and restrict access with endpoint, IAM, or bucket policies
- NAT Gateway high availability // Place a public NAT Gateway in each AZ used by private workloads and route each AZ to its local gateway
- VPC peering // Direct connectivity between two VPCs; peering is non-transitive, so a hub-and-spoke peering layout does not provide spoke-to-spoke routing
- AWS Transit Gateway // Scalable hub for connecting many VPCs and on-premises networks; supports transitive routing subject to route-table configuration
- AWS Global Accelerator // Route TCP/UDP traffic over AWS's global network using two static anycast IPs; health checks enable regional failover in under a minute without changing the client-facing IPs.
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

- EC2 Instance Store // High-performance host-attached block storage for cache, buffers, or scratch data; it is ephemeral and can be lost when an instance stops or host fails, so backups and replication are your responsibility.
- EC2 user data // Bootstrap scripts run as root only on the instance's first start by default, for tasks such as installing software and configuring the host.
- EC2 reboot alarm action // CloudWatch can reboot an instance after an instance status-check failure; recover actions are for system status-check failures
- EC2 Auto Scaling Standby // Temporarily remove an instance from service for maintenance while keeping it in the group, then return it to service
- Auto Scaling `ReplaceUnhealthy` process // Suspend replacement during maintenance if appropriate; after resuming, unhealthy instances may be replaced
- Auto Scaling health checks // Configure load-balancer checks when unhealthy targets should trigger replacement; an HTTP check that returns anything other than 200 marks a target unhealthy, while grace periods avoid premature replacement after launch.
- Predictive scaling // Forecast recurring demand from historical patterns; combine with dynamic target tracking to handle unexpected real-time changes
- Target tracking vs. step/scheduled scaling // Target tracking adjusts capacity to maintain a metric target; step scaling responds in increments to alarm breaches; scheduled scaling handles known time-based changes, while predictive scaling forecasts load and schedules capacity ahead.
- Spot request types // Persistent requests reopen after interruption; stopping a Spot Instance does not reopen the request until it is started
- Canceling a Spot request // Cancelling the request does not automatically terminate its running instance
- Spot Fleet // Can maintain target capacity by replacing terminated Spot Instances
- Application Load Balancer (ALB) path routing // Route HTTP(S) requests to target groups based on URL paths; also supports host, header, method, query-string, and source-IP conditions
- Network Load Balancer (NLB) // Layer 4 TCP/UDP load balancer with static IP addresses; useful for protocols such as SSH and workloads that require fixed IPs
- Cross-zone load balancing // Distributes requests across targets in all enabled AZs; ALB enables it by default without inter-AZ data charges, while NLB, GWLB, and CLB disable it by default (NLB/GWLB incur inter-AZ charges if enabled).
- ECS Service Auto Scaling // Scale task count using service metrics such as average CPU or memory utilization
- ECS/EKS with Fargate // Run containerized workloads without managing EC2 worker instances
- EC2 tenancy // Dedicated tenancy can be selected on the launch template or inherited from the VPC; either setting to dedicated results in dedicated instances
- EC2 cluster placement group // Place instances close together within one AZ for low-latency, high-throughput inter-node communication
- EC2 Elastic Fabric Adapter (EFA) // Enhanced networking for tightly coupled HPC and ML workloads, including OS-bypass communication
- Detailed CloudWatch monitoring // EC2 detailed monitoring publishes metrics at 1-minute intervals rather than the 5-minute basic interval

## Content Domain 4: Design Cost-Optimized Architectures

### Storage, Backup, and Data Protection — Task 4.1

- EFS Infrequent Access // Lower-cost EFS file storage for rarely accessed data that still needs immediate, POSIX/NFS file access; unlike S3, it remains a shared file system.
- Amazon FSx for Windows File Server // Managed Windows file shares with native SMB support and Active Directory integration.
- AWS Storage Gateway File Gateway // Hybrid file access for on-premises applications: expose S3-backed files over NFS or SMB and cache frequently accessed data locally.
- AWS Snowball Edge // Use a shipped device for large offline transfers when network transfer would take over a week, or run EC2 instances and Lambda functions at remote edge sites with limited connectivity; archive imports through S3 lifecycle rules.
- S3 lifecycle rules // Automatically transition objects between supported storage classes or expire them by age or other configured criteria; lifecycle rules alone do not make data immutable.
- S3 Standard-IA // For infrequently accessed data needing millisecond retrieval and multi-AZ resilience; retrieval charges and a 30-day minimum storage duration apply.
- S3 Glacier retrieval classes // Glacier Instant Retrieval provides millisecond reads (90-day minimum); Flexible Retrieval restores in 1–5 minutes expedited, 3–5 hours standard, or 5–12 hours bulk (90-day minimum), while Deep Archive takes 12 or 48 hours and has a 180-day minimum.
- One-time S3 bucket copy // Use `aws s3 sync` for a one-time bulk copy; S3 Batch Replication is an option when existing objects need replication semantics.

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

- Lambda and API Gateway // Expose functions as serverless APIs; Lambda runs on demand for up to 15 minutes, has a regional concurrency quota of 1,000 executions that can be raised, and provisioned concurrency pre-initializes environments to reduce cold starts.
- EventBridge scheduled rule // Invoke serverless code on a recurring rate or cron schedule
- Lambda layers // Package reusable libraries and dependencies for use by multiple functions
- VPC-enabled Lambda internet access // A Lambda function attached to private VPC subnets needs a route through a NAT Gateway for public internet access; use VPC endpoints for supported private AWS service access
- Lambda monitoring // Alarm on concurrency and invocation metrics to detect unexpected spikes and manage cost

## Content Domain 4: Design Cost-Optimized Architectures

### Cost and Operations — Tasks 4.1–4.4

- Compute Savings Plans // Commit to an hourly spend for discounts across eligible EC2, Fargate, and Lambda usage, with more flexibility than EC2 Instance Savings Plans.
- SageMaker Savings Plans // Commitment-based discounts apply to eligible SageMaker machine-learning usage, separately from Compute Savings Plans.
- AWS Budgets Savings Plans coverage budget // Alert when the percentage of eligible usage covered by Savings Plans falls below a configured threshold.
- AWS CloudFormation // Infrastructure as code provisions and updates AWS resources from templates; the service adds no charge, but provisioned resources incur their normal charges.
- EBS volume selection // Use gp2 for general workloads with size-linked IOPS and burst capability; gp3 has a 3,000-IOPS/125-MiB/s baseline with independently provisioned performance; choose io1/io2 for sustained high IOPS, st1 for throughput, and sc1 for infrequent data; HDD volumes cannot boot.
- Cost of data egress // Co-locate chatty analytics clients with their data source when practical, avoiding transfer charges on large query results crossing Direct Connect or internet links.

## Content Domain 1: Design Secure Architectures

### Multi-account governance and secure workloads — Tasks 1.1–1.2

- Service Control Policies (SCPs) // Set maximum permissions for member accounts; they do not grant permissions and do not restrict the management account
- SCP and IAM evaluation // In a member account, an action must be allowed by IAM and by every SCP along the root-to-account path; SCPs set limits but grant no permissions, and an explicit deny overrides an allow.
- AWS Control Tower // Set up and govern a multi-account landing zone with ongoing guardrails: preventive controls use SCPs, while detective controls use AWS Config and can drive remediation.
- AWS CloudFormation StackSets // Deploy a common CloudFormation template across multiple accounts and Regions for centrally managed infrastructure
- IAM policy evaluation // An explicit deny overrides an allow; absent an applicable allow, access is implicitly denied
- AWS shared responsibility model // AWS secures the cloud infrastructure; customers remain responsible for in-cloud identities, data, configurations, and workload controls according to service type
- IAM role for an AWS workload // Use temporary role credentials for EC2, Lambda, and cross-account access instead of embedding long-lived keys
- Root user protection // Enable MFA, avoid routine use, and reserve root credentials for tasks that require them
- IAM Identity Center federation // Provide workforce SSO across organization accounts and supported applications by assigning permission sets (collections of IAM policies) to users or groups; ABAC can base access on identity attributes.
- Security groups and network ACLs // Security groups are stateful instance-level allow lists; NACLs are stateless subnet-level allow/deny lists, evaluated in ascending rule number with the first match winning, so return traffic and ephemeral ports must be allowed explicitly.
- AWS WAF and Shield // Use WAF web ACLs to filter HTTP(S) requests on supported endpoints; Shield Standard provides baseline Layer 3/4 DDoS protection, while Shield Advanced adds response support and automated WAF-based Layer 7 mitigation.
- AWS Firewall Manager // Centrally manage supported WAF, Shield Advanced, Network Firewall, and security-group policies across an organization
- AWS Systems Manager Session Manager // Obtain auditable shell access to managed instances without opening inbound SSH or maintaining bastion hosts
- IAM Access Advisor and credential report // Access Advisor shows service-last-accessed information for least-privilege reviews; the credential report audits account IAM credential status
- AWS Secrets Manager versus Parameter Store // Use Secrets Manager for managed secret rotation and RDS integration; Parameter Store provides hierarchical, versioned configuration and SecureString values, with advanced-tier policies for expiration or no-change notifications.
- ECS task role // Assign each ECS task a role in its task definition so that the task has workload-specific permissions, separate from the EC2 instance profile used by the ECS agent.
- CloudTrail data events // Enable high-volume resource-level activity such as S3 object reads/writes or Lambda invocations when it must be audited; these events are not logged by default.
- IAM `aws:RequestedRegion` condition // Use this IAM condition key to restrict the AWS Region in which API calls may be made.
- AWS Network Firewall // Managed Layer 3–7 inspection for VPC ingress, egress, east-west, and hybrid traffic; rules can be centrally managed across VPCs with Firewall Manager.
- VPC Flow Logs // Record network-flow metadata at VPC, subnet, or ENI scope, including managed interfaces; send it to S3, CloudWatch Logs, or Firehose for IP/port analysis and ACCEPT/REJECT troubleshooting.
- VPC Traffic Mirroring // Copy selected inbound or outbound packets from source ENIs to an ENI or Network Load Balancer target for inspection; sources and targets can be in peered VPCs.
- CloudFormation service role // Let CloudFormation create, update, or delete stack resources through an IAM service role, so stack users need not hold those resource permissions but must have iam:PassRole.

### Data security controls — Task 1.3

- AWS KMS envelope encryption // Encrypt bulk data with a data key and protect that data key with a KMS key; KMS direct encryption is for small payloads
- AWS KMS versus CloudHSM // KMS provides managed key operations; CloudHSM offers dedicated, customer-controlled HSM hardware for workloads requiring that control model
- S3 Object Lock Compliance mode // Enforce retention that cannot be bypassed, including by the account root user, for the locked retention period
- S3 Object Lock Governance mode // Permit specially authorized users to bypass retention when the request and policy allow it
- AWS Backup Vault Lock // Enforce WORM retention for backup recovery points so they cannot be deleted or have retention shortened, even by the root user while the lock is enabled.
- S3 Glacier Vault Lock // Enforce an immutable vault policy for long-term Glacier archives; it is separate from S3 Object Lock and AWS Backup Vault Lock
- S3 SSE-KMS Bucket Keys // Reduce S3-to-KMS requests and associated KMS request costs, potentially by up to 99%, while retaining SSE-KMS encryption.
- KMS multi-Region keys // A primary key and regional replicas share key material and key ID, allowing ciphertext to be decrypted in another Region without re-encryption or cross-Region KMS calls; each remains a separately managed regional key.
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
- Load balancer Server Name Indication (SNI) // ALB and NLB listeners, and CloudFront, can use the hostname supplied in the TLS handshake to select a matching certificate; CLB supports only one certificate and not this feature.
- S3 SSE-S3 encryption // Encrypt objects server-side with an AWS-owned AES-256 key; this is enabled by default for new buckets and objects.
- S3 DSSE-KMS encryption // Apply two server-side encryption layers, one using a KMS key and one using an S3-managed key, for compliance requiring dual-layer encryption; it costs more and adds latency than SSE-KMS.
- S3 SSE-C encryption // Encrypt server-side with a customer-managed key kept outside AWS; provide the key in HTTPS headers on every request because S3 does not store it.
- S3 CORS configuration // Allow browser requests from specified origins by configuring the bucket's CORS response headers for the required origin; a wildcard can allow all origins.
- Amazon S3 presigned URLs // Grant temporary GET or PUT access to a private object using the permissions of the principal that generated the URL; access is bounded by the URL expiration.

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
- S3 replication // Replication requires versioning on source and destination; for SSE-KMS objects, enable replication, authorize source-key decrypt and destination-key encrypt, and select the destination key—S3 still decrypts and re-encrypts objects even with multi-Region keys.
- RDS Multi-AZ deployment // Provide managed high availability and failover; a traditional standby is not a read-scaling endpoint
- Aurora Global Database // Replicate Aurora data across Regions for low-lag regional disaster recovery and managed failover options
- DynamoDB point-in-time recovery (PITR) // Restore a table to a selected point within the configured backup retention window
- DynamoDB deletion protection // Block accidental table deletion; enable PITR separately for recoverability
- DynamoDB global tables // Replicate a table active-active across Regions so applications can read and write locally; DynamoDB Streams must be enabled as a prerequisite.
- AWS Step Functions // Orchestrate multi-step serverless workflows with task, choice, parallel, wait, and retry behavior
- Step Functions Standard versus Express // Standard workflows suit long-running auditable executions; Express workflows suit short-duration, high-volume processing
- ElastiCache Multi-AZ failover // Use Multi-AZ and automatic failover to improve cache availability; read replicas alone primarily add read capacity
- Availability Zone capacity planning // Distribute sufficient baseline capacity across AZs to meet minimum service needs during an AZ outage
- Multi-AZ minimum capacity // Place enough instances across AZs to retain required capacity after an AZ failure; use the smallest safe baseline and scale out as demand rises
- EBS snapshots // Capture a point-in-time EBS volume backup; copy it across AZs or Regions to recreate a volume elsewhere, and use the archive tier only when a 24–72-hour restore is acceptable.
- EC2 Capacity Reservations // Reserve On-Demand instance capacity in a specific AZ for any duration; pay On-Demand rates even when unused, with no discount, though Reserved Instances or Savings Plans can provide billing discounts.
- Elastic Network Interfaces (ENI) // An independently attachable virtual network card with private IPv4 addresses, security groups, and a MAC address; it is AZ-bound and can move to another instance for failover.
- RDS Multi-AZ standby // Synchronously replicate to a standby behind one DB DNS name for automatic failover and higher availability; the standby is not used to scale reads.
- RDS and Aurora automated backups and snapshots // RDS automated backups retain 1–35 days (0 disables them) and support point-in-time restore to within five minutes; Aurora retains automated backups for 1–35 days and cannot disable them. Manual snapshots are user-triggered and kept until deleted; restoring a backup or snapshot creates a new database.
- Route 53 health checks for private endpoints // External Route 53 checkers cannot reach private endpoints; publish a metric to CloudWatch and configure a health check to evaluate its alarm for DNS failover decisions.
- S3 replication (CRR/SRR) // Asynchronously copy new objects between versioned source and destination buckets in the same or different Regions; existing objects need S3 Batch Replication, and deletes with a version ID are not replicated.
- Secrets Manager multi-Region secrets // Replicate a secret to other Regions with read replicas kept in sync with the primary, and promote a replica to a standalone secret when needed.
- AWS Elastic Disaster Recovery (DRS) // Continuously replicate servers at block level into low-cost AWS staging resources, then launch recovered EC2 instances and EBS volumes for failover; supports failback.

## Content Domain 3: Design High-Performing Architectures

### Elastic compute and storage — Tasks 3.1–3.2

- EC2 instance family selection // Match compute-, memory-, storage-, or accelerator-optimized families to the workload bottleneck
- EC2 purchasing options // Use On-Demand for flexible short-term capacity, Reserved Instances or Savings Plans for steady use, and Spot for interruption-tolerant work; choose Dedicated Hosts for host-level placement or server-bound licenses, and Dedicated Instances for dedicated hardware without placement control.
- EC2 placement groups // Choose cluster for low-latency, high-throughput instances in one AZ; spread for isolating critical instances across hardware (at most 7 per AZ); or partition for large distributed systems across rack-isolated partitions that can span AZs.
- EC2 Auto Scaling policy selection // Target tracking maintains a metric target, step scaling reacts to alarm breaches, and scheduled scaling handles known demand patterns
- EC2 Auto Scaling health checks // Configure load-balancer health checks when unhealthy targets should be replaced; use grace periods to avoid premature replacement
- Application Load Balancer versus Network Load Balancer // ALB routes HTTP(S) at Layer 7 using request attributes; NLB handles Layer 4 TCP/UDP and supports static IPs
- ECS, EKS, and Fargate // ECS and EKS orchestrate containers; Fargate runs supported container tasks without managing EC2 worker instances
- AWS Batch // Schedule batch jobs and provision compute capacity appropriate to queued workloads
- EFS mount targets // Create mount targets in the AZs where clients run and prefer the local-AZ target to reduce latency and cross-AZ transfer
- EFS throughput modes // Use bursting for workloads tied to stored data, provisioned for a set throughput, or elastic for automatically scaling throughput.
- S3 multipart upload // Upload large objects in parallel parts and retry failed parts independently; it is recommended above 100 MB and required above 5 GB.
- S3 byte-range GET // Fetch only a requested portion of an object, enabling parallel or partial reads
- S3 Transfer Acceleration // Use AWS edge networking to speed long-distance uploads to S3 when the extra transfer charge is justified
- Amazon CloudFront caching // Cache HTTP(S) content near viewers to reduce origin load and improve global delivery performance
- Amazon S3 and CloudFront static delivery // Store static assets in S3 and cache them with CloudFront to reduce origin requests and viewer latency; the slide's pricing comparison also shows free S3-to-CloudFront transfer and slightly cheaper internet delivery.
- AWS Outposts and Wavelength // Use Outposts for AWS infrastructure in customer facilities and Wavelength Zones for eligible low-latency 5G edge workloads
- EBS Multi-Attach // Attach one io1/io2 volume as shared read/write storage to up to 16 instances in one AZ; applications must coordinate writes and use a cluster-aware file system.
- EFS performance modes // Choose General Purpose at creation for latency-sensitive applications; choose Max I/O when highly parallel throughput matters more than latency.
- Auto Scaling cooldown // After a scaling activity, pause additional instance launches or terminations while metrics stabilize; the default cooldown is 300 seconds.
- S3 Express One Zone // High-performance object storage in a single-AZ directory bucket, designed for very high request rates and single-digit-millisecond latency; colocating compute in that AZ reduces latency.
- Elastic Beanstalk // A managed application deployment service that provisions and operates resources such as EC2, Auto Scaling, and load balancing while developers supply application code; the service is free, but its underlying resources are billed.
- Amazon ECR // Store and manage Docker images in private or public repositories; IAM controls access, and image scanning, tags, versioning, and lifecycle features support container deployment workflows.
- CloudWatch Unified Agent // Run on EC2 or on-premises servers to send logs and guest system metrics such as RAM, disk, network, and process data; its configuration can be centralized in Systems Manager Parameter Store.

### Scalable network architectures — Task 3.4

- AWS Site-to-Site VPN versus Direct Connect // Site-to-Site VPN encrypts traffic over the public internet and is quick to establish; Direct Connect provides a dedicated private path with longer provisioning but no transit encryption, so combine it with VPN when encryption is required.
- AWS Transit Gateway versus VPC peering // Transit Gateway supports hub-and-spoke transitive routing; VPC peering is direct and non-transitive
- VPC endpoint selection // Use free gateway endpoints for S3 or DynamoDB through route tables; interface endpoints use private ENIs and security groups, cost per hour and per GB, and suit access from on-premises, another VPC, or another Region.
- Route 53 failover routing // Pair primary/secondary records with health checks to direct DNS responses toward healthy endpoints
- Route 53 latency routing // Direct users to the Region with the lowest measured latency when that best meets the workload requirement
- Gateway Load Balancer (GWLB) // Transparently insert and scale third-party network appliances; it operates at Layer 3 on IP packets, combining a network gateway with load distribution and using GENEVE on port 6081.
- Elastic Load Balancer stickiness // Use cookie-based affinity to keep a client on the same backend across requests; supported by CLB, ALB, and NLB, but it can skew load across targets.
- Route 53 alias records // Map a DNS name, including the zone apex, to supported AWS resources; answers are A/AAAA, follow changing resource IPs, and have no configurable TTL. They cannot target an EC2 DNS name.
- Route 53 geolocation routing // Choose DNS answers from the user's location (continent, country, or US state), not measured latency; create a default record for unmatched locations, and health checks are supported.
- Route 53 weighted routing // Return DNS records in proportion to relative weights, which need not total 100, for traffic distribution or version testing; weight zero suppresses a record unless every record has weight zero, in which case all are returned equally.
- API Gateway endpoint types // Edge-optimized endpoints route global clients through CloudFront while the API remains in one Region; regional endpoints serve regional clients, and private endpoints are reachable from a VPC through an interface endpoint.
- CloudFront Functions vs. Lambda@Edge // Use lightweight JavaScript for sub-millisecond viewer request/response changes; use Node.js or Python for viewer or origin events that need longer execution, network or filesystem access, or request-body access.
- VPC subnet usable IPv4 capacity // AWS reserves the first four and last IPv4 addresses in each subnet, leaving five fewer usable addresses than the CIDR's total; size the subnet using the remaining capacity.
- Regional NAT Gateway // A VPC-associated NAT service shares outbound translation across Availability Zones, maintains its own route tables, and automatically expands as resources use new zones without requiring per-zone public subnets.
- Egress-only Internet Gateway // IPv6-only gateway that lets VPC instances initiate outbound internet connections while blocking internet-initiated inbound connections; route ::/0 through it.
- AWS VPN CloudHub // Low-cost hub-and-spoke connectivity among multiple sites using Site-to-Site VPNs on one VGW; configure dynamic routing and route tables, with traffic traversing the public internet.

### Database and data-ingestion performance — Tasks 3.3 and 3.5
- RDS read replicas // Use up to 15 asynchronously replicated, eventually consistent replicas (within an AZ, cross-AZ, or cross-Region) to scale SELECT reads; applications must route reads to them, and a replica can be promoted to its own database.

- Amazon Kinesis Data Streams // Retain ordered streaming records for real-time processing and replay, with one-year retention and support for many independent consumers.
- Kinesis on-demand capacity // Let a stream adapt capacity to variable traffic without manual shard management
- Kinesis enhanced fan-out // Give registered stream consumers dedicated per-shard read throughput when multiple consumers process records concurrently
- Kinesis producer batching // Batch records to reduce request overhead and improve producer throughput efficiency
- Amazon Data Firehose // Buffer, optionally transform, and deliver streaming data to supported destinations without managing stream shards
- Kinesis Data Analytics // Run managed Apache Flink applications for streaming transformations from Kinesis Data Streams or MSK; it uses provisioned compute and does not read from Data Firehose.
- AWS DMS S3-to-Kinesis integration // Feed existing S3 data and ongoing changes into a stream when building a custom bridge is unnecessary
- Amazon DataSync // Automate scheduled transfers among on-premises and AWS storage while preserving file metadata; on-premises or other-cloud transfers need an agent, but AWS-to-AWS transfers do not.
- DataSync to EFS over Direct Connect // Use an on-premises DataSync agent and private connectivity for recurring transfers into EFS
- AWS Transfer Family // Provide managed SFTP, FTPS, or FTP endpoints backed by services such as S3 or EFS
- AWS Database Migration Service (DMS) // Create a replication instance for migration tasks while the source remains available; use CDC for ongoing changes, and Multi-AZ for a synchronous standby in another AZ.
- AWS Application Migration Service (MGN) // Rehost supported server workloads to AWS using continuous block-level replication and a controlled cutover
- AWS Schema Conversion Tool (SCT) // Convert schemas for heterogeneous database-engine migrations; homogeneous migrations generally do not require engine conversion
- Six migration strategies (6 Rs) // Rehost, replatform, repurchase, refactor/re-architect, retain, and retire describe common application migration choices
- AWS Glue and Data Catalog // Discover schemas and run managed ETL while maintaining metadata used by analytics services
- AWS Lake Formation // Simplify data-lake setup and apply centralized, fine-grained data permissions
- Amazon EMR // Run managed big-data frameworks such as Spark for distributed data processing
- Amazon Redshift and Spectrum // Use Redshift as a columnar, parallel OLAP warehouse for SQL analytics and joins; Spectrum queries S3 data without loading it but still requires an available Redshift cluster.
- Amazon OpenSearch Service // Complement an operational database with full-text or partial-match searches across fields; unlike DynamoDB, searches are not limited to primary keys or indexes.
- Amazon Quick // Use managed business-intelligence capabilities to build visualizations from supported data sources
- Amazon Comprehend custom entity recognition // Use managed NLP to identify domain-specific entities in text rather than operating a custom model
- Database read scaling and caching // Use read replicas for supported relational read workloads, ElastiCache for general-purpose low-latency caching, and DAX for DynamoDB reads
- ElastiCache Redis vs. Memcached // Redis supports Multi-AZ failover, read replicas, persistence, and sorted sets; Memcached is nonpersistent and multi-threaded, and supports sharding but not replication-based high availability.

## Content Domain 4: Design Cost-Optimized Architectures

### Cost-aware storage, compute, and network choices — Tasks 4.1–4.4

- S3 Intelligent-Tiering // Automatically moves objects by access pattern (infrequent at 30 days, archive instant at 90 days); it has a small monitoring fee but no retrieval charges, while optional archive tiers require restore requests.
- EBS General Purpose SSD versus Provisioned IOPS SSD // Use general-purpose SSD for broad workloads; choose Provisioned IOPS SSD when sustained, I/O-intensive performance justifies its higher cost.
- EC2 Savings Plans versus Reserved Instances // Compare the broader eligible-usage flexibility of Compute Savings Plans with EC2-only Reserved Instance discounts; match the commitment to predictable workload and required discount.
- Spot Instances // Use discounted spare EC2 capacity for workloads that can checkpoint, retry, or tolerate interruption; interruption notices are typically provided two minutes ahead when possible.
- AWS Cost Explorer // Explore historical and forecasted costs and review commitment purchase recommendations.
- AWS Budgets // Set cost, usage, or commitment thresholds and alert or take configured actions when actual or forecasted values cross them.
- AWS Cost and Usage Report // Export detailed billing and usage records, commonly to S3, for granular analysis with tools such as Athena.
- Cost allocation tags // Apply consistent project, team, or environment tags to resources and activate them for cost attribution in billing tools.
- AWS Compute Optimizer // Analyze utilization metrics to recommend right-sizing for supported compute and storage resources; it does not itself change resources.
- VPC endpoint and NAT cost tradeoff // For private AWS-service access, compare endpoint hourly and data-processing charges with NAT Gateway processing and transfer charges at expected traffic volume.
- AWS Organizations consolidated billing // Consolidate member-account bills; eligible volume pricing and Savings Plans or Reserved Instance benefits may be shared across accounts, subject to benefit-sharing settings.
- EC2 and Auto Scaling right-sizing // Use workload metrics to choose instance sizes and minimum capacity that meet demand and failure requirements without paying for idle headroom.
- EFS storage classes // Use Standard for multi-AZ production files and One Zone for lower-cost single-AZ data; lifecycle policies move cold files to IA or Archive, where retrieval charges apply and Archive suits rare access. One Zone backup is enabled by default.
- S3 Requester Pays // Make authenticated requesters pay for request and download charges while the bucket owner continues to pay storage costs; anonymous access is not supported.
- AWS Storage Gateway stored volumes // Present iSCSI block volumes to on-premises applications while keeping the full dataset on premises and scheduling backups to S3 as EBS snapshots.
- AWS Storage Gateway Tape Gateway // Expose a virtual tape library over iSCSI for existing tape-based backup software, with virtual tapes stored in S3 and archived tapes in Glacier.
- DynamoDB time to live (TTL) // Automatically delete items after their per-item expiry timestamp, reducing retained data and supporting uses such as session expiration.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.2

- Route 53 Resolver inbound and outbound endpoints // Use inbound endpoints for on-premises DNS queries into a VPC and outbound endpoints with forwarding rules for VPC queries to on-premises DNS.
- AWS WAF geographic match rule // Use a geographic match statement in a web ACL to allow or block web requests based on the country of origin.
- Amazon Security Lake // Automatically centralize security data from AWS, on-premises, and third-party sources in an S3-based data lake normalized to OCSF.
- AWS Organizations tag policy // Standardize tag keys and allowed values across an organization and report compliance; supported tagging operations can reject noncompliant tags, but the policy has no effect on resources that have no tags.
- AWS Config managed rules // Evaluate recorded resource configurations on change and/or periodically; rules detect noncompliance but do not block actions, while configured remediation can use Systems Manager Automation documents.
- Amazon S3 Access Points // Give applications or groups separate DNS names and policies for a shared bucket; a VPC-origin access point requires a VPC endpoint whose policy permits the bucket and access point.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.3

- AWS IAM Access Analyzer // Analyze resource-based policies to identify access granted to principals outside an account or organization and generate findings.
- S3 SSE-KMS encryption // Encrypt objects server-side with a KMS key for auditable key use and key control; each upload or download calls KMS, so KMS request quotas can constrain throughput.

## Content Domain 1: Design Secure Architectures

### Practice-test additions — Task 1.1

- IAM Roles for Service Accounts (IRSA) // Associate a Kubernetes service account with an IAM role so Pods receive temporary AWS credentials with permissions scoped to that workload.

## Content Domain 2: Design Resilient Architectures

### Practice-test additions — Task 2.1

- Amazon MQ // Use a managed broker for applications built on open messaging protocols when re-engineering to SQS/SNS is undesirable; it supports queue/topic patterns and Multi-AZ failover but scales less than those cloud-native services.
- SQS delay queues // Delay queues postpone when newly sent messages become visible to consumers, for up to 15 minutes; visibility timeout starts after a message is received.

## Content Domain 2: Design Resilient Architectures

### Practice-test additions — Task 2.2

- Amazon RDS storage autoscaling // Increase allocated storage automatically up to a configured maximum when free space stays below 10% for at least 5 minutes and 6 hours have elapsed since the previous storage change.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.2

- EC2 hibernation // Save RAM to an encrypted EBS root volume and restore running processes on start; requires a supported non-bare-metal instance, under 150 GB RAM, and hibernation for no more than 60 days.
- Auto Scaling AZ rebalancing // When an Auto Scaling group is uneven across Availability Zones, it launches replacement capacity before terminating instances to rebalance distribution.
- Auto Scaling on SQS backlog // Scale worker capacity using backlog per instance, commonly ApproximateNumberOfMessages divided by the number of running instances.
- EBS Fast Snapshot Restore // Force-initialize snapshot-backed volumes to full provisioned performance on first use, avoiding lazy-load latency at additional cost.
- EBS Fast Snapshot Restore // Make volumes created from a snapshot fully initialized at provisioned performance immediately after creation.
- S3 per-prefix request performance // Spread object requests across key prefixes to scale S3 throughput; each prefix supports at least 3,500 write-class or 5,500 GET/HEAD requests per second.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.4

- NAT instance capabilities // A self-managed EC2 NAT instance can support port forwarding and security groups and can be used as a bastion, but requires customer-managed availability and scaling.
- Availability Zone IDs // AZ IDs identify the same physical Availability Zone consistently across accounts; AZ names can map to different physical zones in different accounts.
- Route 53 geoproximity routing // Route 53 geoproximity routes based on resource and user locations; a bias expands or shrinks the geographic area serving a resource.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.3

- Amazon RDS Proxy // Pool and share database connections to prevent Lambda traffic spikes from exhausting database connections; the proxy is private, so Lambda must be VPC-attached, and IAM authentication or Secrets Manager credentials can be used.
- Aurora Replicas // Share Aurora cluster storage and provide read scaling with sub-10-ms lag, up to 15 replicas, and a reader endpoint; replicas can scale automatically, and writer failover completes in under 30 seconds.
- Amazon Aurora Global Database // Use one read/write primary Region and up to 10 read-only secondary Regions with replication under 1 second; it supports local reads and cross-Region recovery with an RTO under 1 minute when promoting another Region.
- Amazon RDS Proxy // Pool and reuse database connections to improve application scalability and resilience for supported relational databases.
- Amazon Aurora Replicas // Scale Aurora reads with replicas that share the cluster volume and can be added automatically as demand changes.
- Amazon Redshift Serverless // Run and scale a Redshift data warehouse without provisioning or managing a fixed cluster.
- Aurora I/O-Optimized // Choose Aurora storage pricing without per-I/O charges for applications with high or unpredictable database I/O.
- DynamoDB on-demand capacity mode // Pay per request and let capacity scale without planning for unpredictable workloads or sudden spikes; it typically costs more than provisioned capacity for steady, predictable traffic.

## Content Domain 3: Design High-Performing Architectures

### Practice-test additions — Task 3.1

- Amazon FSx for Lustre // Provide a parallel file system for HPC workloads; scratch is temporary and unreplicated with burst performance, while persistent storage replicates within one AZ and replaces failed files.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Task 4.1

- S3 Standard // General-purpose object storage for frequently accessed data; no retrieval charge or minimum storage duration applies.
- S3 One Zone-IA // Lower-cost S3 storage for infrequently accessed, noncritical or recreatable data kept in one Availability Zone; it is less resilient than multi-AZ classes.
- AWS Storage Gateway cached volumes // Present iSCSI block volumes to on-premises applications, keep frequently accessed data in a local cache, and store primary volume data in S3.
- S3 Storage Class Analysis // Use access-pattern reports to guide transitions from S3 Standard to Standard-IA; it does not transition objects and does not analyze One Zone-IA or Glacier.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Tasks 4.2–4.4

- AWS Cost Anomaly Detection // Use machine learning to identify unusual spending patterns and alert stakeholders without requiring a fixed spend threshold.
- AWS Cost Optimization Hub // Consolidate and prioritize cost-saving recommendations from AWS services and accounts, including rightsizing and idle-resource opportunities.

## Content Domain 4: Design Cost-Optimized Architectures

### Practice-test additions — Task 4.2

- EC2 Dedicated Hosts // Reserve a physical EC2 server for one customer to gain host-level visibility and support eligible server-bound software licenses.
