class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :url, null: false
      t.string :title, null: false
      t.text :description
      t.string :address
      t.string :city
      t.string :event_id
      t.string :latitude, precision: 7
      t.string :longitude, precision: 7
      t.string :venue
      t.string :artist
      t.time :time
      t.date :date
      t.text :logo_url

      t.timestamps null: false
    end
  end
end
