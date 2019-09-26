class Article < ApplicationRecord
  belongs_to :user, optional: true
  has_many_attached :images
  has_many :nices, dependent: :destroy
  has_many :niced_users, through: :nices, source: :user
end
