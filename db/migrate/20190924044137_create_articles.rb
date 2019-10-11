class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string  :title,        null: false
      t.text    :text,         null: false
      t.text    :address
      t.float :lat
      t.float :lng
      t.references :user,      null: false
      t.timestamps
    end
  end
end
