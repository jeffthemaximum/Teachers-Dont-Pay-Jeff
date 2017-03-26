class GenerateUploadUrl

  attr_reader :content_type, :filename, :url

  # @note It is important to have a single source of truth (Rails) for content-type, as
  #   clients may return mismatched content-types versus what Rails deduces, resulting in s3 signature errors.
  #
  # @example
  #   generate_upload_url_service = GenerateUploadUrl.new(filename)
  #   generate_upload_url_service.call
  #
  # @param filename [String]
  #
  def initialize(filename)
    @filename     = filename
    @content_type = MIME::Types.type_for(filename).first.content_type
  end

  # @return [Boolean] Generation successful
  def call
    # obj = AWS::S3.new.
    #   buckets[Rails.application.secrets.aws['s3_bucket_name']].
    #   objects["uploads/#{SecureRandom.uuid}/#{@filename}"]
    # @url = obj.url_for(:write, content_type: @content_type, acl: :public_read).to_s
    # true

    # @url = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    # true

    # obj = AWS::S3::S3Object.url_for(
    #   "uploads/#{SecureRandom.uuid}/#{@filename}",
    #   Rails.application.secrets.aws['s3_bucket_name'],
    #   :expires_in => 60 * 60
    # )
    
    s3 = Aws::S3::Resource.new
    obj = s3.bucket(Rails.application.secrets.aws['s3_bucket_name']).object("uploads/#{SecureRandom.uuid}/#{@filename}")
    @url = obj.presigned_url(:put, acl: 'public-read', expires_in: 3600 * 24)
    puts @url
    true
  end

end