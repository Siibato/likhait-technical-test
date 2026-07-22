require "pagy"

class ApplicationController < ActionController::API
  include Pagy::Method
end
