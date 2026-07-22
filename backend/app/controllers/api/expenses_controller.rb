class Api::ExpensesController < ApplicationController
  DEFAULT_PER_PAGE = 10
  MAX_PER_PAGE = 100

  def index
    expenses = Expense.includes(:category).order(date: :desc, created_at: :desc)

    if params[:year].present? && params[:month].present?
      year = params[:year].to_i
      month = params[:month].to_i

      start_date = Date.new(year, month, 1)
      end_date = start_date.end_of_month

      expenses = expenses.where(date: start_date.beginning_of_day..end_date.end_of_day)
    end

    page = params[:page].to_i.positive? ? params[:page].to_i : 1
    per_page = params[:per_page].to_i.clamp(DEFAULT_PER_PAGE, MAX_PER_PAGE)

    pagy, paginated_expenses = pagy(:offset, expenses, page: page, limit: per_page)

    render json: {
      expenses: paginated_expenses.map { |expense| ExpenseSerializer.new(expense).as_json },
      meta: {
        current_page: pagy.page,
        per_page: pagy.limit,
        total_pages: pagy.pages,
        total_count: pagy.count
      }
    }
  end

  def create
    expense = Expense.new(expense_params)

    if expense.save
      render json: ExpenseSerializer.new(expense).as_json, status: :created
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    expense = Expense.find(params[:id])

    if expense.update(expense_params)
      render json: ExpenseSerializer.new(expense).as_json
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
    head :no_content
  end

  private

  def expense_params
    params.require(:expense).permit(:description, :amount, :category_id, :date)
  end
end
