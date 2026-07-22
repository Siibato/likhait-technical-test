class ExpenseSerializer
  def initialize(expense)
    @expense = expense
  end

  def as_json(*)
    {
      id: @expense.id,
      description: @expense.description,
      amount: @expense.amount.to_f,
      category_id: @expense.category_id,
      category: @expense.category.name,
      date: @expense.date.to_s,
      created_at: @expense.created_at,
      updated_at: @expense.updated_at
    }
  end
end
