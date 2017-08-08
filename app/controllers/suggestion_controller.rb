class SuggestionController < ApplicationController

  def index
  end

  def suggest
    suggestion_url = Rails.application.secrets.jefflator_base_url + "/suggestion/suggest"
    response = HTTParty.get(
      suggestion_url,
      query: params.to_hash
    )
    puts response
    render json: { difficult_words: response["difficult_words"] }
  end

end