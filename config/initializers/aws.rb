# AWS.config(
#   access_key_id:      Rails.application.secrets.aws['access_key_id'],
#   secret_access_key:  Rails.application.secrets.aws['secret_access_key'],
#   bucket:             Rails.application.secrets.aws['s3_bucket_name']
# )

Aws.config.update({
  region: 'us-east-2',
  credentials: Aws::Credentials.new(Rails.application.secrets.aws['access_key_id'], Rails.application.secrets.aws['secret_access_key'])
})

S3_BUCKET = Aws::S3::Resource.new.bucket(Rails.application.secrets.aws['s3_bucket_name'])