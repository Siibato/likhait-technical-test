class Api::CategoriesController < ApplicationController
  def index
    categories = Category.order(:name)
    render json: categories
  end

  def create
    name = category_params[:name]

    if name.blank?
      render json: { errors: [ "Name can't be blank" ] }, status: :unprocessable_entity
      return
    end

    if Category.where("LOWER(name) = LOWER(?)", name).exists?
      render json: { errors: [ "Category '#{name.strip}' already exists" ] }, status: :unprocessable_entity
      return
    end

    category = Category.new(category_params)

    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
