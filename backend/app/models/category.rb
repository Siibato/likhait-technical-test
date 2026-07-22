class Category < ApplicationRecord
  has_many :expenses, dependent: :restrict_with_error

  validates :name, presence: true
  validate :name_must_be_unique

  before_validation :strip_name

  private

  def strip_name
    self.name = name&.strip
  end

  def name_must_be_unique
    return if name.blank?

    if Category.where("LOWER(name) = LOWER(?)", name).where.not(id: id).exists?
      errors.add(:name, "Category '#{name}' already exists")
    end
  end
end
