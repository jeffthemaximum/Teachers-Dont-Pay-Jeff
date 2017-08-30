class Suggestion < ApplicationRecord

  before_create :generate_token

  def generate_token
    begin
      self.token = SecureRandom.base64(4).gsub("/","").gsub(/[=+$]/,"")
    end while Suggestion.where("lower(token) = lower(?)", self.token).exists?
  end

  def url
    's/' + token
  end
end
