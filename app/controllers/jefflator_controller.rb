class JefflatorController < ApplicationController

  def index
  end

  def jefflate
    response = HTTParty.get(
      'https://jefflator.herokuapp.com/jefflator/jefflate',
      query: params.to_hash
    )
    puts response
    render json: { translated: response["translated"] }
  end

end