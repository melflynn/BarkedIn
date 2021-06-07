class Connection < ApplicationRecord
  validates_presence_of :user_id1, :user_id2
  validates :status, inclusion: {in: ['pending_user1', 'pending_user2', 'connected']}
  validate :user_id_order
  validates_uniqueness_of :user_id1, scope: :user_id2

  # belongs_to :user,
  #   foreign_key: :user_id2,
  #   class_name: :User

  # belongs_to :connection,
  #   foreign_key: :user_id1,
  #   class_name: :User

  private

  def user_id_order
    errors.add(:user_id1, "must be less than user_id2") if self.user_id1 && self.user_id2 && self.user_id1 > self.user_id2
  end
end
