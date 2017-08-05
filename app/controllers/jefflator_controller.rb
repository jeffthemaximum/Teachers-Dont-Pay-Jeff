class JefflatorController < ApplicationController

  def index
  end

  def jefflate
    jefflator_url = Rails.application.secrets.jefflator_base_url + "/jefflator/jefflate"
    response = HTTParty.get(
      jefflator_url,
      query: params.to_hash
    )
    puts response
    render json: { translated: response["translated"] }
  end

end