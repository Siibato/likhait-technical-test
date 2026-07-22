require 'rails_helper'

RSpec.describe "Api::Expenses", type: :request do
  let!(:food_category) { Category.create!(name: "Food") }
  let!(:transport_category) { Category.create!(name: "Transport") }

  describe "GET /api/expenses" do
    let!(:expense1) { Expense.create!(description: "Lunch", amount: 100.00, category: food_category, date: Date.today - 1) }
    let!(:expense2) { Expense.create!(description: "Taxi", amount: 50.00, category: transport_category, date: Date.today) }

    it "returns paginated expenses with category information" do
      get "/api/expenses"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json).to have_key("expenses")
      expect(json).to have_key("meta")
      expect(json["expenses"].length).to eq(2)
      expect(json["meta"]["total_count"]).to eq(2)
    end

    it "returns expenses in descending order by date" do
      get "/api/expenses"

      json = JSON.parse(response.body)
      expect(json["expenses"].first["id"]).to eq(expense2.id)
      expect(json["expenses"].last["id"]).to eq(expense1.id)
    end

    it "returns same-date expenses ordered by created_at descending" do
      expense3 = Expense.create!(description: "Coffee", amount: 5.00, category: food_category, date: Date.today)

      get "/api/expenses"

      json = JSON.parse(response.body)
      expect(json["expenses"].first["id"]).to eq(expense3.id)
      expect(json["expenses"].second["id"]).to eq(expense2.id)
    end

    it "paginates results using page and per_page" do
      15.times do |i|
        Expense.create!(description: "Expense #{i}", amount: 10.00, category: food_category, date: Date.today)
      end

      get "/api/expenses", params: { page: 1, per_page: 10 }

      json = JSON.parse(response.body)
      expect(json["expenses"].length).to eq(10)
      expect(json["meta"]["current_page"]).to eq(1)
      expect(json["meta"]["per_page"]).to eq(10)
      expect(json["meta"]["total_pages"]).to eq(2)
      expect(json["meta"]["total_count"]).to eq(17)
    end

    it "defaults to page 1 and per_page 10" do
      get "/api/expenses"

      json = JSON.parse(response.body)
      expect(json["meta"]["current_page"]).to eq(1)
      expect(json["meta"]["per_page"]).to eq(10)
    end

    it "returns a full-month summary regardless of the current page" do
      Expense.create!(description: "Breakfast", amount: 10.00, category: food_category, date: Date.today)
      Expense.create!(description: "Snack", amount: 5.00, category: food_category, date: Date.today)
      Expense.create!(description: "Bus", amount: 20.00, category: transport_category, date: Date.today)

      get "/api/expenses", params: { page: 1, per_page: 1, year: Date.today.year, month: Date.today.month }

      json = JSON.parse(response.body)
      summary = json["meta"]["summary"]
      expect(summary["total_amount"]).to eq(185.0) # 100 + 50 + 10 + 5 + 20
      expect(summary["total_count"]).to eq(5)
      expect(summary["categories"].map { |c| c["category"] }).to contain_exactly("Food", "Transport")
      expect(summary["categories"].first["category"]).to eq("Food")
      expect(summary["categories"].first["amount"]).to eq(115.0)
      expect(summary["categories"].first["count"]).to eq(3)
      expect(summary["categories"].last["category"]).to eq("Transport")
      expect(summary["categories"].last["amount"]).to eq(70.0)
    end
  end

  describe "POST /api/expenses" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          expense: {
            description: "Team Lunch",
            amount: 150.50,
            category_id: food_category.id,
            date: Date.today
          }
        }
      end

      it "creates a new expense" do
        expect {
          post "/api/expenses", params: valid_params, as: :json
        }.to change(Expense, :count).by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["description"]).to eq("Team Lunch")
        expect(json["amount"]).to eq(150.5)
      end
    end

    context "with invalid parameters" do
      it "with negative amounts" do
        invalid_params = {
          expense: {
            description: "Invalid expense",
            amount: -100.00,
            category_id: food_category.id,
            date: Date.today
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.not_to change(Expense, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "with zero amounts" do
        invalid_params = {
          expense: {
            description: "Invalid expense",
            amount: 0,
            category_id: food_category.id,
            date: Date.today
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.not_to change(Expense, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "with empty descriptions" do
        invalid_params = {
          expense: {
            description: "",
            amount: 100.00,
            category_id: food_category.id,
            date: Date.today
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.not_to change(Expense, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "with future date" do
        invalid_params = {
          expense: {
            description: "Future expense",
            amount: 100.00,
            category_id: food_category.id,
            date: Date.today + 1
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.not_to change(Expense, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to include("Date cannot be in the future")
      end
    end
  end

  describe "PATCH /api/expenses/:id" do
    let!(:expense) { Expense.create!(description: "Lunch", amount: 50.00, category: food_category, date: Date.today) }

    it "rejects updating to a future date" do
      patch "/api/expenses/#{expense.id}", params: {
        expense: { date: Date.today + 1 }
      }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Date cannot be in the future")
    end

    it "returns 404 for a non-existent expense" do
      patch "/api/expenses/999999", params: {
        expense: { description: "Updated" }
      }, as: :json

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Resource not found")
    end
  end

  describe "DELETE /api/expenses/:id" do
    let!(:expense) { Expense.create!(description: "Lunch", amount: 50.00, category: food_category, date: Date.today) }

    it "deletes the expense" do
      expect {
        delete "/api/expenses/#{expense.id}"
      }.to change(Expense, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end

    it "returns 404 for a non-existent expense" do
      delete "/api/expenses/999999"

      expect(response).to have_http_status(:not_found)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Resource not found")
    end
  end
end
