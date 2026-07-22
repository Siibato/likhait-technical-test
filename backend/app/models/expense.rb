class Expense < ApplicationRecord
  belongs_to :category

  validates :description, presence: true
  validates :amount, numericality: { greater_than: 0 }
  validates :category_id, presence: true
  validate :date_cannot_be_in_future

  before_validation :strip_description

  private

  def strip_description
    self.description = description&.strip
  end

  def date_cannot_be_in_future
    if date.present? && date > Date.today
      errors.add(:date, "cannot be in the future")
    end
  end
end
