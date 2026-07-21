require 'rails_helper'

RSpec.describe Category, type: :model do
  describe 'validations' do
    it 'is valid with a unique name' do
      expect(FactoryBot.build(:category)).to be_valid
    end

    it 'is invalid without a name' do
      category = FactoryBot.build(:category, name: nil)
      expect(category).not_to be_valid
      expect(category.errors[:name]).to include("can't be blank")
    end

    it 'is invalid with a duplicate name (case-insensitive)' do
      FactoryBot.create(:category, name: 'Food')
      duplicate = FactoryBot.build(:category, name: 'food')
      expect(duplicate).not_to be_valid
      expect(duplicate.errors[:name]).to include('has already been taken')
    end
  end
end
