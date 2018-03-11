class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :description
      t.belongs_to :user, index: true
    end
  end
end
