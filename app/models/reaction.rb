class Reaction < ApplicationRecord
  validates :reaction_type, inclusion: {in: ['wag', 'high five', 'throw a bone']}
  validates_uniqueness_of :liker_id, scope: :post_id, message: "has already reacted to this post"

  belongs_to :post

  belongs_to :liker, 
    foreign_key: :liker_id,
    class_name: :User

end
