require 'rails_helper'

RSpec.describe Expense, type: :model do
  let(:category) { Category.create!(name: "Food") }

  it "is valid with today's date" do
    expense = Expense.new(description: "Lunch", amount: 10.00, category: category, date: Date.today)
    expect(expense).to be_valid
  end

  it "is valid with a past date" do
    expense = Expense.new(description: "Lunch", amount: 10.00, category: category, date: Date.today - 5)
    expect(expense).to be_valid
  end

  it "is invalid with a future date" do
    expense = Expense.new(description: "Lunch", amount: 10.00, category: category, date: Date.today + 1)
    expect(expense).not_to be_valid
    expect(expense.errors[:date]).to include("cannot be in the future")
  end

  it "is invalid with a non-positive amount" do
    expense = Expense.new(description: "Lunch", amount: -10.00, category: category, date: Date.today)
    expect(expense).not_to be_valid
    expect(expense.errors[:amount]).to include("must be greater than 0")
  end

  it "is invalid with a zero amount" do
    expense = Expense.new(description: "Lunch", amount: 0, category: category, date: Date.today)
    expect(expense).not_to be_valid
    expect(expense.errors[:amount]).to include("must be greater than 0")
  end

  it "is invalid with a blank description" do
    expense = Expense.new(description: "", amount: 10.00, category: category, date: Date.today)
    expect(expense).not_to be_valid
    expect(expense.errors[:description]).to include("can't be blank")
  end

  it "is invalid with a whitespace-only description" do
    expense = Expense.new(description: "   ", amount: 10.00, category: category, date: Date.today)
    expect(expense).not_to be_valid
    expect(expense.errors[:description]).to include("can't be blank")
  end

  it "is invalid with a blank date" do
    expense = Expense.new(description: "Lunch", amount: 10.00, category: category, date: nil)
    expect(expense).not_to be_valid
    expect(expense.errors[:date]).to include("can't be blank")
  end
end
