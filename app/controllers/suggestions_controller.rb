class SuggestionsController < ApplicationController

  def index
  end

  def share
    @sug = Suggestion.find_by(token: params[:token])
  end

  def suggest

    sug = Suggestion.find_or_create_by({text: params["sentence"]})
    
    if !sug.data
      suggestion_url = Rails.application.secrets.jefflator_base_url + "/suggestion/suggest"
      response = HTTParty.get(
        suggestion_url,
        query: params.to_hash
      )

      sug.data = response["difficult_words"]
      sug.save!
    end

    render json: { 
      difficult_words: sug.data,
      share_url: root_url + sug.url
    }
  end

end