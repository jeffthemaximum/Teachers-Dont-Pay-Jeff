class ContactRequestsController < ApplicationController
  def create
    @cr = ContactRequest.create(contact_params)
    @cr_json = @cr.attributes
    @cr_json[:code] = 0
    render status: 200, json:@cr_json.to_json
  end

  private
    def contact_params
      params.require(:contact_request).permit(:name, :email, :message)
    end
end
