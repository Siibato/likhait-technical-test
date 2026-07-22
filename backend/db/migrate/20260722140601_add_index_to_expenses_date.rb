class AddIndexToExpensesDate < ActiveRecord::Migration[7.2]
  def change
    add_index :expenses, :date
    add_index :expenses, [ :date, :category_id ]
  end
end
