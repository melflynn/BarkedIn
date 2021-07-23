# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
  validates_presence_of :author_id, :body

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :reactions

  has_many :likers,
    through: :reactions,
    source: :liker

  has_many :comments
    # foreign_key: :post_id,
    # class_name: :Comment

end
