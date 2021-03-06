class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string   :title,                     null: false
      t.integer  :list_id,                   null: false
      t.text     :description
      t.float    :ord,         default: 0.0, null: false

      t.timestamps null: false
    end
  end
end
