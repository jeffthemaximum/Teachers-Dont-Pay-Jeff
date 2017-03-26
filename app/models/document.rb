class Document < ApplicationRecord
  # DIRECT_UPLOAD_URL_FORMAT = %r{
  #   \A
  #   https:\/\/
  #   #{Rails.application.secrets.aws['s3_bucket_name']}\.s3\.amazonaws\.com\/
  #   (?<path>uploads\/.+\/(?<filename>.+))
  #   \z
  # }x.freeze

  # https://jeffline.s3.us-east-2.amazonaws.com/uploads/910ed18e-8989-474b-b77f-92765df74b75/Screen%20Shot%202017-03-24%20at%201.25.47%20PM.png

  enum status: { unprocessed: 0, processed: 1 }

  has_attached_file :upload

  # validates :direct_upload_url, presence: true, format: { with: DIRECT_UPLOAD_URL_FORMAT }
  do_not_validate_attachment_file_type :upload
end
