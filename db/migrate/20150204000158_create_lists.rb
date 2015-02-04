class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.integer :board_id, null: false
      t.float :ord, default: 0.0
      t.timestamps null: false
    end
  end
end
