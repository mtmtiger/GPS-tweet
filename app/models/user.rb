class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :articles, dependent: :destroy
  has_many :nices, dependent: :destroy
  has_many :niced_articles, through: :nices, source: :article
  def already_niced?(article)
    self.nices.exists?(article_id: article.id)
  end
  has_one_attached :image
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :passive_relationships, class_name:  "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower

    # ユーザーをフォローする
    def follow(other_user)
      active_relationships.create(followed_id: other_user.id)
    end
   
    # ユーザーをアンフォローする
    def unfollow(other_user)
      active_relationships.find_by(followed_id: other_user.id).destroy
    end
   
    # 現在のユーザーがフォローしていたらtrueを返す
    def following?(other_user)
      following.include?(other_user)
    end

  enum age: {
    "---": nil,
    "〜１０代": 0,
    "２０代": 1,
    "３０代": 2,
    "４０代": 3,
    "５０代": 4,
    "６０代〜": 5
  }, _prefix: true
    
  enum sex: {
    "---": nil,
    "男性": 0,
    "女性": 1,
    "その他": 2
  }, _prefix: true
end
